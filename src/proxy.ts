import { NextResponse, type NextRequest } from "next/server";
import legacyPaths from "@/config/legacy-path-redirects.json";

// Exact, case-sensitive lookup avoids redirect loops for casing-only renames.
export function proxy(request: NextRequest) {
  let pathname: string;
  try {
    pathname = decodeURIComponent(request.nextUrl.pathname).replace(/\/$/, "");
  } catch {
    return NextResponse.next();
  }

  const destination = legacyPaths[pathname as keyof typeof legacyPaths];
  if (!destination) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = destination;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    "/images/:path*",
    "/videos/:path*",
    "/capitalmarket",
    "/contentAcquisition&distribution",
    "/creator-Ecosystem",
  ],
};
