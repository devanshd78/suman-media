import { withApiHandler } from "@/lib/http/handler";
import { apiFailure } from "@/lib/http/responses";

export function methodNotAllowed(allowedMethods: string[]) {
  return withApiHandler(async (request, { requestId }) => {
    void request;
    return apiFailure({
      requestId,
      status: 405,
      code: "METHOD_NOT_ALLOWED",
      message: "This HTTP method is not supported for this endpoint",
      headers: { Allow: allowedMethods.join(", ") },
    });
  });
}
