import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/companies", "/services", "/portfolio", "/insights", "/careers", "/contact"];
  return paths.map((path) => ({
    url: new URL(path || "/", siteConfig.url).toString(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
