const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ?? "";
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-08-21";

export const sanityEnv = {
  projectId,
  dataset,
  apiVersion,
} as const;

export const isSanityConfigured = Boolean(projectId && dataset);
