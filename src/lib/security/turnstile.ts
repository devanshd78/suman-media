import { ApiError } from "@/lib/http/api-error";

type TurnstileResponse = {
  success: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
};

type TurnstileOptions = {
  token: string | undefined;
  remoteIp?: string;
  expectedAction?: string;
};

let cachedAllowedHostnamesRaw: string | null = null;
let cachedAllowedHostnames = new Set<string>();

function allowedHostnames(): Set<string> {
  const raw = process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? "";
  if (raw === cachedAllowedHostnamesRaw) return cachedAllowedHostnames;

  cachedAllowedHostnamesRaw = raw;
  cachedAllowedHostnames = new Set(
    raw
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean),
  );

  return cachedAllowedHostnames;
}

export async function requireTurnstile({
  token,
  remoteIp,
  expectedAction,
}: TurnstileOptions): Promise<void> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new ApiError({
        status: 503,
        code: "SERVICE_UNAVAILABLE",
        message: "Bot protection is not configured",
      });
    }
    return;
  }

  if (!token) {
    throw new ApiError({
      status: 403,
      code: "BOT_CHECK_FAILED",
      message: "Verification is required",
    });
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

  let response: Response;
  try {
    response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body,
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      },
    );
  } catch {
    throw new ApiError({
      status: 503,
      code: "SERVICE_UNAVAILABLE",
      message: "Verification service is temporarily unavailable",
    });
  }

  if (!response.ok) {
    throw new ApiError({
      status: 503,
      code: "SERVICE_UNAVAILABLE",
      message: "Verification service is temporarily unavailable",
    });
  }

  const result = (await response.json()) as TurnstileResponse;
  const hostnames = allowedHostnames();
  const invalidHostname =
    hostnames.size > 0 &&
    (!result.hostname || !hostnames.has(result.hostname.toLowerCase()));
  const invalidAction =
    expectedAction !== undefined && result.action !== expectedAction;

  if (!result.success || invalidHostname || invalidAction) {
    throw new ApiError({
      status: 403,
      code: "BOT_CHECK_FAILED",
      message: "Verification failed",
    });
  }
}
