import pages from "./website-pages.json";

export { pages as websitePages };
export type WebsitePageId = keyof typeof pages;
export const websitePageList = Object.values(pages);
const aliases = new Map(websitePageList.flatMap(page => page.aliases.map(alias => [alias, page.path] as const)));

/** Resolve old CMS/internal URLs without losing the query or section anchor. */
export function canonicalWebsitePath(href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const [pathname] = href.split(/[?#]/);
  const suffix = href.slice(pathname.length);
  return (aliases.get(pathname) ?? pathname) + suffix;
}

export function pageLink(id: WebsitePageId) {
  const page = pages[id];
  return { label: page.label, href: page.path };
}
