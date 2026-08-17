import { getDb } from "@/lib/db";
import { withApiHandler } from "@/lib/http/handler";
import { methodNotAllowed } from "@/lib/http/method-not-allowed";
import { apiSuccess } from "@/lib/http/responses";
import { ApiError } from "@/lib/http/api-error";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = withApiHandler(async (request, { requestId }) => {
  void request;
  try {
    await getDb().$queryRaw`SELECT 1`;
  } catch {
    throw new ApiError({
      status: 503,
      code: "DATABASE_UNAVAILABLE",
      message: "Database connection is unavailable",
    });
  }

  return apiSuccess({
    requestId,
    message: "Service is ready",
    data: {
      status: "ready",
      database: "connected",
      uptimeSeconds: Math.floor(process.uptime()),
    },
  });
});

const unsupportedMethod = methodNotAllowed(["GET", "HEAD"]);
export const POST = unsupportedMethod;
export const PUT = unsupportedMethod;
export const PATCH = unsupportedMethod;
export const DELETE = unsupportedMethod;
export const OPTIONS = unsupportedMethod;
