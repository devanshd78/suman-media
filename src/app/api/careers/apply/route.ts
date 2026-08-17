import { getDb } from "@/lib/db";
import { withApiHandler } from "@/lib/http/handler";
import { methodNotAllowed } from "@/lib/http/method-not-allowed";
import { parseJsonBody } from "@/lib/http/parse-body";
import { enforceRateLimit } from "@/lib/http/rate-limit";
import { getClientIp, hashClientIp } from "@/lib/http/request-context";
import { apiSuccess } from "@/lib/http/responses";
import { requireTurnstile } from "@/lib/security/turnstile";
import { requireResumeObject } from "@/lib/storage/s3";
import { careerApplicationSchema, type CareerApplicationInput } from "@/lib/validation/career";

export const runtime = "nodejs";

export const POST = withApiHandler(async (request, { requestId }) => {
  enforceRateLimit(request, "career-application", {
    limit: 3,
    windowMs: 60 * 60_000,
  });

  const input = await parseJsonBody<CareerApplicationInput>(request, careerApplicationSchema);
  await requireTurnstile({
    token: input.turnstileToken,
    remoteIp: getClientIp(request),
    expectedAction: "career_apply",
  });
  await requireResumeObject(input.resumeKey);

  const application = await getDb().careerApplication.create({
    data: {
      requestId,
      jobReference: input.jobReference,
      applicantName: input.applicantName,
      email: input.email,
      phone: input.phone,
      resumeKey: input.resumeKey,
      resumeFileName: input.resumeFileName,
      coverLetter: input.coverLetter,
      ipHash: hashClientIp(request),
      userAgent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
    },
    select: { id: true },
  });

  return apiSuccess({
    requestId,
    status: 201,
    code: "CREATED",
    message: "Your application has been submitted",
    data: application,
  });
});

const unsupportedMethod = methodNotAllowed(["POST"]);
export const GET = unsupportedMethod;
export const PUT = unsupportedMethod;
export const PATCH = unsupportedMethod;
export const DELETE = unsupportedMethod;
export const HEAD = unsupportedMethod;
export const OPTIONS = unsupportedMethod;
