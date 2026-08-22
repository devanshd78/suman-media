import type { NextRequest } from "next/server";
import { ZodError } from "zod";
import { ApiError } from "@/lib/http/api-error";
import { getRequestId } from "@/lib/http/request-context";
import { apiFailure } from "@/lib/http/responses";

export type ApiHandler = (
  request: NextRequest,
  context: { requestId: string },
) => Promise<Response>;

function logError(requestId: string, request: Request, error: unknown) {
  const safeError =
    error instanceof Error
      ? { name: error.name, message: error.message, stack: error.stack }
      : { value: String(error) };

  console.error(
    JSON.stringify({
      level: "error",
      event: "api_request_failed",
      requestId,
      method: request.method,
      path: new URL(request.url).pathname,
      error: safeError,
      timestamp: new Date().toISOString(),
    }),
  );
}

export function withApiHandler(handler: ApiHandler): (request: NextRequest) => Promise<Response> {
  return async (request: NextRequest) => {
    const requestId = getRequestId(request);

    try {
      return await handler(request, { requestId });
    } catch (error) {
      if (error instanceof ApiError) {
        return apiFailure({
          requestId,
          status: error.status,
          code: error.code,
          message: error.message,
          fieldErrors: error.fieldErrors,
          details: error.details,
          headers: error.headers,
        });
      }

      if (error instanceof ZodError) {
        return apiFailure({
          requestId,
          status: 422,
          code: "VALIDATION_ERROR",
          message: "Please check the submitted fields",
          fieldErrors: error.flatten().fieldErrors as import("@/types/api").ApiFieldErrors,
        });
      }

      logError(requestId, request, error);

      return apiFailure({
        requestId,
        status: 500,
        code: "INTERNAL_ERROR",
        message: "An unexpected error occurred",
      });
    }
  };
}
