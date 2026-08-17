import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function createPageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: new URL(path, siteConfig.url).toString(),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
