import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/lib/client";
import { sanityEnv } from "@/sanity/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!sanityClient) {
    return NextResponse.json(
      { status: "unavailable", cms: "sanity", configured: false },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const startedAt = Date.now();
    await sanityClient.fetch(`count(*[_id == "siteSettings"])`, {}, { cache: "no-store" });

    return NextResponse.json(
      {
        status: "ready",
        cms: "sanity",
        configured: true,
        dataset: sanityEnv.dataset,
        latencyMs: Date.now() - startedAt,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { status: "unavailable", cms: "sanity", configured: true },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
