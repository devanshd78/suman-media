import { websitePageList, canonicalWebsitePath } from "@/config/website-routes";
import { localizedPath } from "@/i18n/routing";
import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getSitemapDocuments } from "@/sanity/lib/data";
import type { CmsSitemapDocument } from "@/types/cms";

const staticPaths = websitePageList.map(page => page.path === "/" ? "" : page.path);

function documentPath(document: CmsSitemapDocument): string | null {
  switch (document._type) {
    case "service":
      return `/services/${document.slug}`;
    case "post":
      return `/news-and-blogs/${document.slug}`;
    default:
      return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cmsDocuments = await getSitemapDocuments();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: new URL(path || "/", siteConfig.url).toString(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  } as const));

  const dynamicEntries: MetadataRoute.Sitemap = cmsDocuments
    .map((document) => {
      const path = documentPath(document);
      if (!path) return null;
      return {
        url: new URL(path, siteConfig.url).toString(),
        lastModified: new Date(document._updatedAt),
        changeFrequency: document._type === "post" ? "weekly" : "monthly",
        priority: document._type === "post" ? 0.7 : 0.8,
      } as const;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  return Array.from(new Map([...staticEntries, ...dynamicEntries].map(entry => [canonicalWebsitePath(new URL(entry.url).pathname), entry])).values()).flatMap((entry) => {
    const path = canonicalWebsitePath(new URL(entry.url).pathname);
    const languages = Object.fromEntries(["en", "mr"].map((locale) => [locale, new URL(localizedPath(path, locale), siteConfig.url).toString()]));
    return ["en", "mr"].map((locale) => ({ ...entry, url: languages[locale], alternates: { languages } }));
  });
}
