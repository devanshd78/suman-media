import { ApiError } from "@/lib/http/api-error";
import { getClientIp } from "@/lib/http/request-context";

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function enforceRateLimit(
  request: Request,
  namespace: string,
  options: { limit: number; windowMs: number },
) {
  const now = Date.now();
  const key = `${namespace}:${getClientIp(request)}`;
  const current = buckets.get(key);
  const bucket = !current || current.resetAt <= now
    ? { count: 0, resetAt: now + options.windowMs }
    : current;

  bucket.count += 1;
  buckets.set(key, bucket);

  if (buckets.size > 10_000) {
    for (const [bucketKey, value] of buckets) {
      if (value.resetAt <= now) buckets.delete(bucketKey);
    }
  }

  if (bucket.count > options.limit) {
    const retryAfter = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
    throw new ApiError({
      status: 429,
      code: "RATE_LIMITED",
      message: "Too many requests. Please try again later.",
      details: { retryAfter },
      headers: { "Retry-After": String(retryAfter) },
    });
  }
}
