import { HeadObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { ApiError } from "@/lib/http/api-error";

let client: S3Client | undefined;

export function getS3Client(): S3Client {
  if (client) return client;

  const region = process.env.AWS_REGION;
  if (!region) {
    throw new ApiError({
      status: 503,
      code: "STORAGE_NOT_CONFIGURED",
      message: "Storage is not configured",
    });
  }

  client = new S3Client({
    region,
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });
  return client;
}

export function getPrivateBucket(): string {
  const bucket = process.env.AWS_S3_PRIVATE_BUCKET;
  if (!bucket) {
    throw new ApiError({
      status: 503,
      code: "STORAGE_NOT_CONFIGURED",
      message: "Storage is not configured",
    });
  }
  return bucket;
}

function statusCodeFromUnknown(error: unknown): number | undefined {
  if (!error || typeof error !== "object") return undefined;
  const metadata = "$metadata" in error ? error.$metadata : undefined;
  if (!metadata || typeof metadata !== "object") return undefined;
  const status = "httpStatusCode" in metadata ? metadata.httpStatusCode : undefined;
  return typeof status === "number" ? status : undefined;
}

export async function requireResumeObject(key: string): Promise<void> {
  try {
    await getS3Client().send(
      new HeadObjectCommand({ Bucket: getPrivateBucket(), Key: key }),
    );
  } catch (error) {
    const status = statusCodeFromUnknown(error);
    if (status === 404) {
      throw new ApiError({
        status: 422,
        code: "STORAGE_OBJECT_NOT_FOUND",
        message: "The uploaded resume could not be verified",
      });
    }

    throw new ApiError({
      status: 503,
      code: "SERVICE_UNAVAILABLE",
      message: "File storage is temporarily unavailable",
    });
  }
}
