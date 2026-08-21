const requiredVariables = [
  "DATABASE_URL",
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "TURNSTILE_SECRET_KEY",
  "TURNSTILE_ALLOWED_HOSTNAMES",
  "AWS_REGION",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "AWS_S3_PRIVATE_BUCKET",
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_SANITY_API_VERSION",
  "NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL",
  "SANITY_REVALIDATE_SECRET",
  "SANITY_API_READ_TOKEN",
  "IP_HASH_SECRET",
] as const;

function requireValidUrl(name: string, value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error();
  } catch {
    throw new Error(`${name} must be a valid HTTP(S) URL`);
  }
}

function requireProductionHttps(name: string, value: string) {
  const url = new URL(value);
  if (url.protocol !== "https:") {
    throw new Error(`${name} must use HTTPS in production`);
  }
}

function requireSecretLength(name: string, minimum = 32) {
  if ((process.env[name]?.trim().length ?? 0) < minimum) {
    throw new Error(`${name} must contain at least ${minimum} characters`);
  }
}

export function validateProductionEnv() {
  if (
    process.env.NODE_ENV !== "production" ||
    process.env.ENFORCE_PRODUCTION_ENV !== "true"
  ) {
    return;
  }

  const missing = requiredVariables.filter((name) => !process.env[name]?.trim());
  if (missing.length > 0) {
    throw new Error(`Missing required production environment variables: ${missing.join(", ")}`);
  }

  requireValidUrl("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL!);
  requireProductionHttps("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL!);

  if (process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL) {
    requireValidUrl(
      "NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL",
      process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL,
    );
    requireProductionHttps(
      "NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL",
      process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL,
    );
  }

  const databaseUrl = process.env.DATABASE_URL!;
  if (!databaseUrl.startsWith("postgresql://") && !databaseUrl.startsWith("postgres://")) {
    throw new Error("DATABASE_URL must be a PostgreSQL connection URL");
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(process.env.NEXT_PUBLIC_SANITY_API_VERSION!)) {
    throw new Error("NEXT_PUBLIC_SANITY_API_VERSION must use YYYY-MM-DD format");
  }

  requireSecretLength("SANITY_REVALIDATE_SECRET");
  requireSecretLength("SANITY_API_READ_TOKEN", 20);
  requireSecretLength("IP_HASH_SECRET");

  if (process.env.TURNSTILE_ALLOWED_HOSTNAMES?.includes("localhost")) {
    throw new Error("TURNSTILE_ALLOWED_HOSTNAMES must not contain localhost in production");
  }
}
