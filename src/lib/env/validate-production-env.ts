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
  "SANITY_REVALIDATE_SECRET",
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

  const databaseUrl = process.env.DATABASE_URL!;
  if (!databaseUrl.startsWith("postgresql://") && !databaseUrl.startsWith("postgres://")) {
    throw new Error("DATABASE_URL must be a PostgreSQL connection URL");
  }

  for (const secretName of ["SANITY_REVALIDATE_SECRET", "IP_HASH_SECRET"] as const) {
    if ((process.env[secretName]?.length ?? 0) < 24) {
      throw new Error(`${secretName} must contain at least 24 characters`);
    }
  }
}
