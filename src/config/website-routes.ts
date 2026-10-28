import pages from "./website-pages.json";

export { pages as websitePages };
export type WebsitePageId = keyof typeof pages;
export const websitePageList = Object.values(pages);
const aliases = new Map(websitePageList.flatMap(page => page.aliases.map(alias => [alias, page.path] as const)));

/** Resolve old CMS/internal URLs without losing the query or section anchor. */
export function canonicalWebsitePath(href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const [pathname] = href.split(/[?#]/);
  if (pathname === "/services") {
    const url = new URL(href, "https://website.local");
    const industry = url.searchParams.get("industry");
    if (industry) return industryDestination(industry);
    return "/" + url.search + (url.hash || "#capabilities");
  }
  const suffix = href.slice(pathname.length);
  return (aliases.get(pathname) ?? pathname) + suffix;
}

export function pageLink(id: WebsitePageId) {
  const page = pages[id];
  return { label: page.label, href: page.path };
}

/** Industry cards point to the relevant published capability, not a placeholder. */
export function industryDestination(industry: string): string {
  const destinations: Record<string, string> = {
    entertainment: pages.media.path,
    enterprises: pages.marketing.path,
    brands: pages.brand.path,
    investors: pages.capital.path,
    "public-sector": pages.government.path,
    creators: pages.creators.path,
    government: pages.government.path,
  };
  return destinations[industry] ?? "/#capabilities";
}
