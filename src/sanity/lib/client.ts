import { createClient, type QueryParams } from "next-sanity";
import { isSanityConfigured, sanityEnv } from "@/sanity/env";

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: sanityEnv.projectId,
      dataset: sanityEnv.dataset,
      apiVersion: sanityEnv.apiVersion,
      useCdn: true,
      stega: {
        // Studio is embedded in this Next.js app at /studio.
        studioUrl: "/studio",
      },
    })
  : null;
