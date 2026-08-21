import { NextResponse } from "next/server";
import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { sanityClient } from "@/sanity/lib/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const token = process.env.SANITY_API_READ_TOKEN?.trim();

const enabledHandler =
  sanityClient && token
    ? defineEnableDraftMode({
        client: sanityClient.withConfig({ token }),
      }).GET
    : null;

export async function GET(request: Request) {
  if (!enabledHandler) {
    return NextResponse.json(
      { error: "Sanity Draft Mode is not configured." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  return enabledHandler(request);
}
