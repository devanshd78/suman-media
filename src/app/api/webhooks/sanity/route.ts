import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ApiError } from "@/lib/http/api-error";
import { withApiHandler } from "@/lib/http/handler";
import { methodNotAllowed } from "@/lib/http/method-not-allowed";
import { parseJsonBody } from "@/lib/http/parse-body";
import { apiSuccess } from "@/lib/http/responses";

export const runtime = "nodejs";

const webhookSchema = z.object({
  paths: z
    .array(
      z
        .string()
        .max(500)
        .regex(/^\/(?!\/)(?!api(?:\/|$))[a-zA-Z0-9/_\-.]*$/),
    )
    .min(1)
    .max(25),
});

function secretsMatch(received: string | null, expected: string | undefined) {
  if (!received || !expected) return false;
  const left = Buffer.from(received);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export const POST = withApiHandler(async (request, { requestId }) => {
  if (!secretsMatch(request.headers.get("x-sanity-secret"), process.env.SANITY_REVALIDATE_SECRET)) {
    throw new ApiError({
      status: 401,
      code: "UNAUTHORIZED",
      message: "Invalid webhook credentials",
    });
  }

  const input = await parseJsonBody<{ paths: string[] }>(request, webhookSchema);
  for (const path of [...new Set(input.paths)]) revalidatePath(path);

  return apiSuccess({
    requestId,
    message: "Content cache revalidated",
    data: { revalidated: [...new Set(input.paths)] },
  });
});

const unsupportedMethod = methodNotAllowed(["POST"]);
export const GET = unsupportedMethod;
export const PUT = unsupportedMethod;
export const PATCH = unsupportedMethod;
export const DELETE = unsupportedMethod;
export const HEAD = unsupportedMethod;
export const OPTIONS = unsupportedMethod;
