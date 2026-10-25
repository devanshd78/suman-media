import "server-only";
import { cache } from "react";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { sanityClient } from "@/sanity/lib/client";
import { localizedPath } from "./routing";
import { normalizeMessage, translateText, type TranslationDictionary } from "./translate";

export const getEditorialTranslations = cache(async (): Promise<TranslationDictionary> => {
  if (!sanityClient) return {};
  try {
    const entries = await sanityClient.fetch<Array<{ english: string; marathi: string }>>(
      '*[_type == "siteTranslation" && !(_id in path("drafts.**"))]{english, marathi}',
      {}, { next: { revalidate: 60, tags: ["siteTranslation"] } },
    );
    return Object.fromEntries(entries.filter((entry) => entry.english?.trim() && entry.marathi?.trim()).map((entry) => [normalizeMessage(entry.english), entry.marathi]));
  } catch {
    return {};
  }
});

export async function localizeMetadata(metadata: Metadata): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getEditorialTranslations();
  const t = (text: string) => translateText(text, locale, dictionary);
  const localizeImages = <T,>(images: T): T => {
    if (Array.isArray(images)) return images.map(localizeImages) as T;
    if (images && typeof images === "object" && "alt" in images && typeof images.alt === "string") {
      return { ...images, alt: t(images.alt) };
    }
    return images;
  };
  const canonical = String(metadata.alternates?.canonical ?? "/");
  const path = canonical.startsWith("http") ? new URL(canonical).pathname : canonical;
  const title = typeof metadata.title === "string" ? t(metadata.title) : metadata.title ? Object.fromEntries(Object.entries(metadata.title).map(([key, value]) => [key, typeof value === "string" ? t(value) : value])) as Metadata["title"] : metadata.title;
  return {
    ...metadata, title,
    description: metadata.description ? t(metadata.description) : metadata.description,
    alternates: { ...metadata.alternates, canonical: localizedPath(path, locale), languages: { en: localizedPath(path, "en"), mr: localizedPath(path, "mr"), "x-default": localizedPath(path, "mr") } },
    openGraph: metadata.openGraph ? { ...metadata.openGraph, images: localizeImages(metadata.openGraph.images), siteName: metadata.openGraph.siteName ? t(metadata.openGraph.siteName) : undefined, title: typeof metadata.openGraph.title === "string" ? t(metadata.openGraph.title) : metadata.openGraph.title, description: metadata.openGraph.description ? t(metadata.openGraph.description) : undefined, url: localizedPath(path, locale), locale: locale === "mr" ? "mr_IN" : "en_IN", alternateLocale: locale === "mr" ? "en_IN" : "mr_IN" } : undefined,
    twitter: metadata.twitter ? { ...metadata.twitter, images: localizeImages(metadata.twitter.images), title: typeof metadata.twitter.title === "string" ? t(metadata.twitter.title) : metadata.twitter.title, description: metadata.twitter.description ? t(metadata.twitter.description) : undefined } : undefined,
  };
}
