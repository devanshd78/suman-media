const fallbackUrl = "http://localhost:3000";

function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("NEXT_PUBLIC_SITE_URL is required in production");
    }

    return fallbackUrl;
  }

  try {
    const url = new URL(configuredUrl);
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error();
    return url.origin;
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a valid HTTP(S) URL");
  }
}

const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";

export const siteConfig = {
  name:
    process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "Suman Media & Entertainment",
  legalName:
    process.env.NEXT_PUBLIC_LEGAL_NAME?.trim() ||
    "Suman Entertainment & Media Pvt. Ltd.",
  url: getSiteUrl(),
  description:
    "Discover Suman Media & Entertainment, its companies, services, portfolio, insights and career opportunities.",
  allowIndexing,
} as const;
