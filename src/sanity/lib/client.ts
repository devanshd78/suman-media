import { createClient, type QueryParams } from "next-sanity";
import { isSanityConfigured, sanityEnv } from "@/sanity/env";

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: sanityEnv.projectId,
      dataset: sanityEnv.dataset,
      apiVersion: sanityEnv.apiVersion,
      useCdn: true,
    })
  : null;

const metadataClient = sanityClient?.withConfig({ stega: false }) ?? null;

type SanityFetchOptions = {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  metadata?: boolean;
};

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 3600,
  metadata = false,
}: SanityFetchOptions): Promise<T | null> {
  const client = metadata ? metadataClient : sanityClient;
  if (!client) return null;

  return client.fetch<T>(query, params, {
    next: { revalidate },
  });
}
