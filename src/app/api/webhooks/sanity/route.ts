import { revalidatePath } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { z } from "zod";
import { ApiError } from "@/lib/http/api-error";
import { withApiHandler } from "@/lib/http/handler";
import { methodNotAllowed } from "@/lib/http/method-not-allowed";
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

export const POST = withApiHandler(async (request, { requestId }) => {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    throw new ApiError({
      status: 500,
      code: "INTERNAL_ERROR",
      message: "Sanity webhook secret is not configured",
    });
  }

  const { isValidSignature, body } = await parseBody<unknown>(
    request,
    secret,
    true,
  );

  if (!isValidSignature) {
    throw new ApiError({
      status: 401,
      code: "UNAUTHORIZED",
      message: "Invalid Sanity webhook signature",
    });
  }

  const input = webhookSchema.parse(body);
  const paths = [...new Set(input.paths)];

  for (const path of paths) revalidatePath(path);

  return apiSuccess({
    requestId,
    message: "Content cache revalidated",
    data: { revalidated: paths },
  });
});

const unsupportedMethod = methodNotAllowed(["POST"]);
export const GET = unsupportedMethod;
export const PUT = unsupportedMethod;
export const PATCH = unsupportedMethod;
export const DELETE = unsupportedMethod;
export const HEAD = unsupportedMethod;
export const OPTIONS = unsupportedMethod;
