import { localizedPath } from "@/i18n/routing";
import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getSitemapDocuments } from "@/sanity/lib/data";
import type { CmsSitemapDocument } from "@/types/cms";

const staticPaths = ["", "/abhijat-marathi", "/ai-capibilities", "/degital-media-networks", "/about", "/business", "/capital-market", "/careers", "/companies", "/contact", "/contact/form", "/content-acquisition-and-distribution", "/creator-ecosystem", "/event-experience", "/media", "/monetization", "/music-audio", "/news-and-blogs", "/partners", "/portfolio", "/products/content-music-library", "/products/fast-channel", "/products/intellectual-property-development", "/products/publication-knowledge-platforms", "/services", "/services/brand-solutions-advertising", "/solutions/government-institutional"] as const;

function documentPath(document: CmsSitemapDocument) {
  switch (document._type) {
    case "service":
      return `/services/${document.slug}`;
    case "company":
      return `/companies/${document.slug}`;
    case "post":
      return `/news-and-blogs/${document.slug}`;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cmsDocuments = await getSitemapDocuments();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: new URL(path || "/", siteConfig.url).toString(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const dynamicEntries: MetadataRoute.Sitemap = cmsDocuments.map((document) => ({
    url: new URL(documentPath(document), siteConfig.url).toString(),
    lastModified: new Date(document._updatedAt),
    changeFrequency: document._type === "post" ? "weekly" : "monthly",
    priority: document._type === "post" ? 0.7 : 0.8,
  }));

  return [...staticEntries, ...dynamicEntries].flatMap((entry) => {
    const path = new URL(entry.url).pathname;
    const languages = Object.fromEntries(["en", "mr"].map((locale) => [locale, new URL(localizedPath(path, locale), siteConfig.url).toString()]));
    return ["en", "mr"].map((locale) => ({ ...entry, url: languages[locale], alternates: { languages } }));
  });
}
