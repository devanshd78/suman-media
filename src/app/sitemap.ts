import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getSitemapDocuments } from "@/sanity/lib/data";
import type { CmsSitemapDocument } from "@/types/cms";

const staticPaths = [
  "",
  "/about",
  "/companies",
  "/services",
  "/portfolio",
  "/insights",
  "/careers",
  "/contact",
] as const;

function documentPath(document: CmsSitemapDocument) {
  switch (document._type) {
    case "service":
      return `/services/${document.slug}`;
    case "company":
      return `/companies/${document.slug}`;
    case "post":
      return `/insights/${document.slug}`;
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

  return [...staticEntries, ...dynamicEntries];
}
