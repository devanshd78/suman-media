import { ApiError } from "@/lib/http/api-error";

const DEFAULT_MAX_BYTES = 64 * 1024;

export async function readJson(
  request: Request,
  maxBytes = DEFAULT_MAX_BYTES,
): Promise<unknown> {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().includes("application/json")) {
    throw new ApiError({
      status: 415,
      code: "INVALID_CONTENT_TYPE",
      message: "Content-Type must be application/json",
    });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    throw new ApiError({
      status: 413,
      code: "PAYLOAD_TOO_LARGE",
      message: "The request body is too large",
    });
  }

  const text = await request.text();
  if (Buffer.byteLength(text, "utf8") > maxBytes) {
    throw new ApiError({
      status: 413,
      code: "PAYLOAD_TOO_LARGE",
      message: "The request body is too large",
    });
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new ApiError({
      status: 400,
      code: "INVALID_JSON",
      message: "The request body contains invalid JSON",
    });
  }
}
