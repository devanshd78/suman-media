const fallbackUrl = "http://localhost:3000";

export const siteConfig = {
  name:
    process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "Suman Media & Entertainment",
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackUrl,
  description:
    "Official website of Suman Media & Entertainment and its group companies.",
} as const;
