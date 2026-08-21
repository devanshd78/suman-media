import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const mode = await draftMode();
  mode.disable();

  const requestUrl = new URL(request.url);
  const redirect = requestUrl.searchParams.get("redirect");
  const safePath = redirect && redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/";

  return NextResponse.redirect(new URL(safePath, siteConfig.url));
}
