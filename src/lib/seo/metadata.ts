import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { CmsDetailDocument } from "@/types/cms";

type PageMetadataOptions = {
  canonical?: string | null;
  image?: string | null;
  noIndex?: boolean | null;
  type?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string | null;
};

function absoluteUrl(value: string) {
  return new URL(value, siteConfig.url).toString();
}

export function createPageMetadata(
  title: string,
  description: string,
  path: string,
  options: PageMetadataOptions = {},
): Metadata {
  const canonical = options.canonical || path;
  const image = options.image ? absoluteUrl(options.image) : undefined;
  const isArticle = options.type === "article";

  return {
    title,
    description,
    alternates: { canonical },
    robots: options.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: isArticle ? "article" : "website",
      siteName: siteConfig.name,
      title,
      description,
      url: absoluteUrl(canonical),
      ...(image ? { images: [{ url: image }] } : {}),
      ...(isArticle
        ? {
            publishedTime: options.publishedTime || undefined,
            modifiedTime: options.modifiedTime || undefined,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function createCmsMetadata(
  document: CmsDetailDocument,
  path: string,
): Metadata {
  const title = document.seo?.title?.trim() || document.title;
  const description =
    document.seo?.description?.trim() ||
    document.description?.trim() ||
    siteConfig.description;

  return createPageMetadata(title, description, path, {
    canonical: document.seo?.canonicalUrl,
    image: document.seo?.socialImageUrl,
    noIndex: document.seo?.noIndex,
    type: document._type === "post" ? "article" : "website",
    publishedTime: document.publishedAt,
    modifiedTime: document._updatedAt,
  });
}

export function createNotFoundMetadata(title = "Page not found"): Metadata {
  return {
    title,
    robots: { index: false, follow: false },
  };
}
