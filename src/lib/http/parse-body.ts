import type { ZodType } from "zod";
import { ApiError } from "@/lib/http/api-error";
import { readJson } from "@/lib/http/read-json";
import type { ApiFieldErrors } from "@/types/api";

export async function parseJsonBody<T>(
  request: Request,
  schema: ZodType<T>,
  maxBytes?: number,
): Promise<T> {
  const result = schema.safeParse(await readJson(request, maxBytes));

  if (!result.success) {
    throw new ApiError({
      status: 422,
      code: "VALIDATION_ERROR",
      message: "Please check the submitted fields",
      fieldErrors: result.error.flatten().fieldErrors as ApiFieldErrors,
    });
  }

  return result.data;
}
