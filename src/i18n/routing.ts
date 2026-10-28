import { canonicalWebsitePath } from "../config/website-routes";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "mr"],
  defaultLocale: "mr",
  localePrefix: "always",
  localeDetection: false,
  localeCookie: { maxAge: 60 * 60 * 24 * 365 },
});

export type Locale = "en" | "mr";

export function localizedPath(path: string, locale: string): string {
  if (!path.startsWith("/") || path.startsWith("//") || /^\/(api|studio|images|videos|cannes|_next)(\/|$)/.test(path) || /\.[a-z0-9]+(?:[?#]|$)/i.test(path)) return path;
  const unprefixed = canonicalWebsitePath(path.replace(/^\/(en|mr)(?=\/|[?#]|$)/, "") || "/");
  return `/${locale}${unprefixed === "/" ? "" : /^\/[?#]/.test(unprefixed) ? unprefixed.slice(1) : unprefixed}`;
}
