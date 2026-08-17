import { getDb } from "@/lib/db";
import { withApiHandler } from "@/lib/http/handler";
import { methodNotAllowed } from "@/lib/http/method-not-allowed";
import { parseJsonBody } from "@/lib/http/parse-body";
import { enforceRateLimit } from "@/lib/http/rate-limit";
import { getClientIp } from "@/lib/http/request-context";
import { apiSuccess } from "@/lib/http/responses";
import { requireTurnstile } from "@/lib/security/turnstile";
import { newsletterSchema, type NewsletterInput } from "@/lib/validation/newsletter";

export const runtime = "nodejs";

export const POST = withApiHandler(async (request, { requestId }) => {
  enforceRateLimit(request, "newsletter", { limit: 5, windowMs: 60 * 60_000 });

  const input = await parseJsonBody<NewsletterInput>(request, newsletterSchema);
  await requireTurnstile({
    token: input.turnstileToken,
    remoteIp: getClientIp(request),
    expectedAction: "newsletter",
  });

  const subscription = await getDb().newsletterSubscription.upsert({
    where: { email: input.email },
    update: { isActive: true, unsubscribedAt: null },
    create: { email: input.email },
    select: { id: true },
  });

  return apiSuccess({
    requestId,
    status: 201,
    code: "CREATED",
    message: "You have been subscribed",
    data: subscription,
  });
});

const unsupportedMethod = methodNotAllowed(["POST"]);
export const GET = unsupportedMethod;
export const PUT = unsupportedMethod;
export const PATCH = unsupportedMethod;
export const DELETE = unsupportedMethod;
export const HEAD = unsupportedMethod;
export const OPTIONS = unsupportedMethod;
