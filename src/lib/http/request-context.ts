import { createHash, randomUUID } from "node:crypto";

const REQUEST_ID_PATTERN = /^[a-zA-Z0-9._:-]+$/;

export function getRequestId(request: Request): string {
  const incoming = request.headers.get("x-request-id")?.trim();
  return incoming && incoming.length <= 100 && REQUEST_ID_PATTERN.test(incoming)
    ? incoming
    : randomUUID();
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export function hashClientIp(request: Request): string | null {
  const secret = process.env.IP_HASH_SECRET;
  const ip = getClientIp(request);

  if (!secret || ip === "unknown") return null;
  return createHash("sha256").update(`${secret}:${ip}`).digest("hex");
}
