import { randomUUID } from "node:crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { withApiHandler } from "@/lib/http/handler";
import { methodNotAllowed } from "@/lib/http/method-not-allowed";
import { parseJsonBody } from "@/lib/http/parse-body";
import { enforceRateLimit } from "@/lib/http/rate-limit";
import { getClientIp } from "@/lib/http/request-context";
import { apiSuccess } from "@/lib/http/responses";
import { requireTurnstile } from "@/lib/security/turnstile";
import { getPrivateBucket, getS3Client } from "@/lib/storage/s3";
import { uploadRequestSchema, type UploadRequestInput } from "@/lib/validation/upload";
import { ApiError } from "@/lib/http/api-error";

export const runtime = "nodejs";

const allowedResumeTypes = new Map([
  ["application/pdf", new Set(["pdf"])],
  ["application/msword", new Set(["doc"])],
  [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    new Set(["docx"]),
  ],
]);

function sanitizeFileName(value: string) {
  const cleaned = value
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "")
    .slice(0, 140);
  return cleaned || "resume";
}

export const POST = withApiHandler(async (request, { requestId }) => {
  enforceRateLimit(request, "resume-presign", { limit: 5, windowMs: 60 * 60_000 });

  const input = await parseJsonBody<UploadRequestInput>(request, uploadRequestSchema);
  await requireTurnstile({
    token: input.turnstileToken,
    remoteIp: getClientIp(request),
    expectedAction: "resume_upload",
  });

  const allowedExtensions = allowedResumeTypes.get(input.contentType);
  const extension = input.fileName.split(".").pop()?.toLowerCase();

  if (!allowedExtensions || !extension || !allowedExtensions.has(extension)) {
    throw new ApiError({
      status: 415,
      code: "UNSUPPORTED_FILE",
      message: "Only PDF, DOC, and DOCX resumes are allowed",
    });
  }

  const key = `resumes/${new Date().toISOString().slice(0, 10)}/${randomUUID()}-${sanitizeFileName(input.fileName)}`;
  const command = new PutObjectCommand({
    Bucket: getPrivateBucket(),
    Key: key,
    ContentType: input.contentType,
    ContentLength: input.size,
  });

  const uploadUrl = await getSignedUrl(getS3Client(), command, { expiresIn: 300 });

  return apiSuccess({
    requestId,
    message: "Upload URL created",
    data: { uploadUrl, key, expiresIn: 300 },
  });
});

const unsupportedMethod = methodNotAllowed(["POST"]);
export const GET = unsupportedMethod;
export const PUT = unsupportedMethod;
export const PATCH = unsupportedMethod;
export const DELETE = unsupportedMethod;
export const HEAD = unsupportedMethod;
export const OPTIONS = unsupportedMethod;
