import { NextResponse, type NextRequest } from "next/server";
import legacyPaths from "@/config/legacy-path-redirects.json";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const internationalize = createMiddleware(routing);

// Exact, case-sensitive lookup avoids redirect loops for casing-only renames.
export function proxy(request: NextRequest) {
  let pathname: string;
  try {
    pathname = decodeURIComponent(request.nextUrl.pathname).replace(/\/$/, "");
  } catch {
    return NextResponse.next();
  }

  const prefix = pathname.match(/^\/(en|mr)(?=\/|$)/)?.[0] ?? "";
  const original = prefix ? pathname.slice(prefix.length) : pathname;
  const destination = legacyPaths[original as keyof typeof legacyPaths];
  if (!destination) {
    if (/^\/(api|studio|images|videos|cannes|_next)(\/|$)/.test(pathname) || /\.[a-z0-9]+$/i.test(pathname)) return NextResponse.next();
    return internationalize(request);
  }

  const url = request.nextUrl.clone();
  const target = new URL(destination, url.origin);
  const isAsset = /^\/(images|videos|cannes)\//.test(target.pathname);
  url.pathname = `${isAsset ? "" : prefix || "/mr"}${target.pathname}`;
  if (target.search) url.search = target.search;
  if (target.hash) url.hash = target.hash;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    "/((?!api|studio|_next|_vercel|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
