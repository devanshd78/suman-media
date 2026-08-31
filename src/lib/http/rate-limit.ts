import { ApiError } from "@/lib/http/api-error";
import { getClientIp } from "@/lib/http/request-context";

type Bucket = {
  count: number;
  resetAt: number;
};

const MAX_BUCKETS = 10_000;
const CLEANUP_INTERVAL_MS = 60_000;

const buckets = new Map<string, Bucket>();
let nextCleanupAt = 0;

function cleanupBuckets(now: number) {
  if (now < nextCleanupAt && buckets.size < MAX_BUCKETS) return;

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }

  nextCleanupAt = now + CLEANUP_INTERVAL_MS;
}

function makeRoomForNewBucket() {
  if (buckets.size < MAX_BUCKETS) return;

  /*
   * The limiter is intentionally process-local, but it should still remain
   * memory-bounded if a single process sees a large number of unique source
   * addresses. Evict the bucket that expires first rather than allowing an
   * unbounded Map to grow under abusive traffic.
   */
  let oldestKey: string | null = null;
  let oldestResetAt = Number.POSITIVE_INFINITY;

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < oldestResetAt) {
      oldestKey = key;
      oldestResetAt = bucket.resetAt;
    }
  }

  if (oldestKey) buckets.delete(oldestKey);
}

export function enforceRateLimit(
  request: Request,
  namespace: string,
  options: {
    limit: number;
    windowMs: number;
  },
) {
  const now = Date.now();
  cleanupBuckets(now);

  const key = `${namespace}:${getClientIp(request)}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    if (!current) makeRoomForNewBucket();

    const bucket = {
      count: 1,
      resetAt: now + options.windowMs,
    };

    buckets.set(key, bucket);
    return;
  }

  current.count += 1;

  if (current.count > options.limit) {
    const retryAfter = Math.max(
      1,
      Math.ceil((current.resetAt - now) / 1000),
    );

    throw new ApiError({
      status: 429,
      code: "RATE_LIMITED",
      message: "Too many requests. Please try again later.",
      details: { retryAfter },
      headers: { "Retry-After": String(retryAfter) },
    });
  }
}
