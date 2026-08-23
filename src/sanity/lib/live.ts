import type { QueryParams } from "next-sanity";
import { defineLive } from "next-sanity/live";

import { sanityClient } from "@/sanity/lib/client";

const readToken = process.env.SANITY_API_READ_TOKEN?.trim() || false;

const live = sanityClient
  ? defineLive({
      client: sanityClient,
      // Viewer-only token. Required to read drafts in Presentation mode.
      serverToken: readToken,
      browserToken: readToken,
    })
  : null;

export const SanityLive =
  live?.SanityLive ??
  function SanityLiveDisabled() {
    return null;
  };

type SanityFetchOptions = {
  query: string;
  params?: QueryParams;
  // Retained so existing callers do not need to change. defineLive manages
  // Sanity cache invalidation/live updates itself.
  revalidate?: number | false;
  metadata?: boolean;
};

export async function sanityFetch<T>({
  query,
  params = {},
  metadata = false,
}: SanityFetchOptions): Promise<T | null> {
  if (!live) return null;

  const result = await live.sanityFetch({
    query,
    params,
    ...(metadata ? { stega: false as const } : {}),
  });

  return result.data as T;
}
