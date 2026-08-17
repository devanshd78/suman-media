import { getDb } from "@/lib/db";
import { withApiHandler } from "@/lib/http/handler";
import { methodNotAllowed } from "@/lib/http/method-not-allowed";
import { parseJsonBody } from "@/lib/http/parse-body";
import { enforceRateLimit } from "@/lib/http/rate-limit";
import { getClientIp, hashClientIp } from "@/lib/http/request-context";
import { apiSuccess } from "@/lib/http/responses";
import { requireTurnstile } from "@/lib/security/turnstile";
import { contactSchema, type ContactInput } from "@/lib/validation/contact";

export const runtime = "nodejs";

export const POST = withApiHandler(async (request, { requestId }) => {
  enforceRateLimit(request, "contact", { limit: 5, windowMs: 10 * 60_000 });

  const input = await parseJsonBody<ContactInput>(request, contactSchema);
  await requireTurnstile({
    token: input.turnstileToken,
    remoteIp: getClientIp(request),
    expectedAction: "contact",
  });

  const submission = await getDb().contactSubmission.create({
    data: {
      requestId,
      name: input.name,
      email: input.email,
      phone: input.phone,
      company: input.company,
      subject: input.subject,
      message: input.message,
      sourceUrl: input.sourceUrl,
      ipHash: hashClientIp(request),
      userAgent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
    },
    select: { id: true },
  });

  return apiSuccess({
    requestId,
    status: 201,
    code: "CREATED",
    message: "Your enquiry has been submitted",
    data: submission,
  });
});

const unsupportedMethod = methodNotAllowed(["POST"]);
export const GET = unsupportedMethod;
export const PUT = unsupportedMethod;
export const PATCH = unsupportedMethod;
export const DELETE = unsupportedMethod;
export const HEAD = unsupportedMethod;
export const OPTIONS = unsupportedMethod;
