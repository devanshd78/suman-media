import { cache } from "react";
import type {
  CmsDetailDocument,
  CmsFeaturedCompany,
  CmsFeaturedInsight,
  CmsFeaturedProject,
  CmsHomePage,
  CmsSitemapDocument,
  CmsSiteSettings,
  CmsCareerOpening,
  CmsCareersCulture,
  CmsCareersPartnerCta,
  CmsContactPage,
} from "@/types/cms";
import { sanityFetch } from "@/sanity/lib/live";
import {
  CAREERS_CULTURE_QUERY,
  CAREERS_OPENINGS_QUERY,
  CAREERS_PARTNER_CTA_QUERY,
  CONTACT_PAGE_QUERY,
  COMPANIES_LIST_QUERY,
  COMPANY_BY_SLUG_QUERY,
  HOME_FEATURED_COMPANIES_QUERY,
  HOME_FEATURED_INSIGHTS_QUERY,
  HOME_FEATURED_PROJECTS_QUERY,
  HOME_PAGE_METADATA_QUERY,
  HOME_PAGE_QUERY,
  INSIGHT_BY_SLUG_QUERY,
  INSIGHTS_LIST_QUERY,
  PROJECTS_LIST_QUERY,
  SERVICE_BY_SLUG_QUERY,
  SITE_SETTINGS_QUERY,
  SITEMAP_DOCUMENTS_QUERY,
} from "@/sanity/queries/content";

export async function getContactPageContent(): Promise<CmsContactPage | null> {
  try {
    return await sanityFetch<CmsContactPage>({
      query: CONTACT_PAGE_QUERY,
      revalidate: process.env.NODE_ENV === "development" ? 0 : 60,
    });
  } catch (error) {
    console.error("Failed to load Contact page content from Sanity", error);
    return null;
  }
}


const HOME_REVALIDATE = process.env.NODE_ENV === "development" ? 0 : 3600;

export const getHomePage = cache(async (): Promise<CmsHomePage | null> => {
  try {
    return await sanityFetch<CmsHomePage>({
      query: HOME_PAGE_QUERY,
      revalidate: HOME_REVALIDATE,
    });
  } catch (error) {
    console.error("Failed to load homepage from Sanity", error);
    return null;
  }
});

export const getHomePageMetadata = cache(
  async (): Promise<Pick<CmsHomePage, "seo" | "faqSection"> | null> => {
    try {
      return await sanityFetch<Pick<CmsHomePage, "seo" | "faqSection">>({
        query: HOME_PAGE_METADATA_QUERY,
        revalidate: HOME_REVALIDATE,
        metadata: true,
      });
    } catch (error) {
      console.error("Failed to load homepage metadata from Sanity", error);
      return null;
    }
  },
);

export const getSiteSettings = cache(async (): Promise<CmsSiteSettings | null> => {
  try {
    return await sanityFetch<CmsSiteSettings>({
      query: SITE_SETTINGS_QUERY,
      revalidate: HOME_REVALIDATE,
      metadata: true,
    });
  } catch (error) {
    console.error("Failed to load site settings from Sanity", error);
    return null;
  }
});

export async function getCareersPartnerCta(): Promise<CmsCareersPartnerCta | null> {
  try {
    return await sanityFetch<CmsCareersPartnerCta>({
      query: CAREERS_PARTNER_CTA_QUERY,
      revalidate: process.env.NODE_ENV === "development" ? 0 : 60,
    });
  } catch (error) {
    console.error("Failed to load Careers partner CTA from Sanity", error);
    return null;
  }
}

export async function getCareerOpenings(): Promise<CmsCareerOpening[]> {
  try {
    const result = await sanityFetch<{
      openings?: CmsCareerOpening[] | null;
    }>({
      query: CAREERS_OPENINGS_QUERY,
      revalidate: process.env.NODE_ENV === "development" ? 0 : 60,
    });

    return (
      result?.openings?.filter(
        (opening) =>
          Boolean(opening?.title && opening?.location && opening?.description),
      ) ?? []
    );
  } catch (error) {
    console.error("Failed to load career openings from Sanity", error);
    return [];
  }
}

export async function getCareersCulture(): Promise<CmsCareersCulture | null> {
  try {
    return await sanityFetch<CmsCareersCulture>({
      query: CAREERS_CULTURE_QUERY,
      revalidate: process.env.NODE_ENV === "development" ? 0 : 60,
    });
  } catch (error) {
    console.error("Failed to load Careers culture content from Sanity", error);
    return null;
  }
}

const LIST_REVALIDATE = process.env.NODE_ENV === "development" ? 0 : 3600;

/*
 * Shared shape for the homepage's featured-content lists:
 * editors' hand-picked references win; otherwise fall back
 * to a sensible listing query. Returns [] on any failure so
 * sections can decide their own fallback rendering.
 */
async function getFeaturedList<T>(
  pickedQuery: string,
  listQuery: string,
  isValid: (item: T) => boolean,
  label: string,
): Promise<T[]> {
  try {
    const picked = await sanityFetch<T[] | null>({
      query: pickedQuery,
      revalidate: LIST_REVALIDATE,
    });

    const valid = picked?.filter(isValid) ?? [];

    if (valid.length > 0) {
      return valid;
    }

    const listed = await sanityFetch<T[] | null>({
      query: listQuery,
      revalidate: LIST_REVALIDATE,
    });

    return listed?.filter(isValid) ?? [];
  } catch (error) {
    console.error(`Failed to load ${label} from Sanity`, error);
    return [];
  }
}

export function getFeaturedCompanies(): Promise<CmsFeaturedCompany[]> {
  return getFeaturedList<CmsFeaturedCompany>(
    HOME_FEATURED_COMPANIES_QUERY,
    COMPANIES_LIST_QUERY,
    (company) => Boolean(company?.name && company?.shortDescription),
    "featured companies",
  );
}

export function getFeaturedProjects(): Promise<CmsFeaturedProject[]> {
  return getFeaturedList<CmsFeaturedProject>(
    HOME_FEATURED_PROJECTS_QUERY,
    PROJECTS_LIST_QUERY,
    (project) => Boolean(project?.title && project?.imageUrl),
    "featured projects",
  );
}

export function getFeaturedInsights(): Promise<CmsFeaturedInsight[]> {
  return getFeaturedList<CmsFeaturedInsight>(
    HOME_FEATURED_INSIGHTS_QUERY,
    INSIGHTS_LIST_QUERY,
    (post) =>
      Boolean(post?.title && post?.slug && post?.imageUrl && post?.publishedAt),
    "featured insights",
  );
}

async function getDetailDocument(query: string, slug: string, metadata = false) {
  return sanityFetch<CmsDetailDocument>({
    query,
    params: { slug },
    revalidate: 3600,
    metadata,
  });
}

export function getServiceBySlug(slug: string, metadata = false) {
  return getDetailDocument(SERVICE_BY_SLUG_QUERY, slug, metadata);
}

export function getCompanyBySlug(slug: string, metadata = false) {
  return getDetailDocument(COMPANY_BY_SLUG_QUERY, slug, metadata);
}

export function getInsightBySlug(slug: string, metadata = false) {
  return getDetailDocument(INSIGHT_BY_SLUG_QUERY, slug, metadata);
}

export async function getSitemapDocuments(): Promise<CmsSitemapDocument[]> {
  return (
    (await sanityFetch<CmsSitemapDocument[]>({
      query: SITEMAP_DOCUMENTS_QUERY,
      revalidate: 3600,
      metadata: true,
    })) ?? []
  );
}
