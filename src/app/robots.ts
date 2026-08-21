import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: siteConfig.allowIndexing
      ? [{ userAgent: "*", allow: "/", disallow: ["/api/", "/studio/"] }]
      : [{ userAgent: "*", disallow: "/" }],
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}
