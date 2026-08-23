import { siteConfig } from "@/config/site";

export type JsonLd = Record<string, unknown>;

export function organizationJsonLd(input?: {
  name?: string | null;
  legalName?: string | null;
  logo?: string | null;
  email?: string | null;
  phone?: string | null;
  sameAs?: string[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input?.name?.trim() || siteConfig.name,
    legalName: input?.legalName?.trim() || siteConfig.legalName,
    url: siteConfig.url,
    ...(input?.logo ? { logo: new URL(input.logo, siteConfig.url).toString() } : {}),
    ...(input?.email ? { email: input.email } : {}),
    ...(input?.phone ? { telephone: input.phone } : {}),
    ...(input?.sameAs?.length ? { sameAs: input.sameAs } : {}),
  };
}

export function websiteJsonLd(input?: { name?: string | null }): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: input?.name?.trim() || siteConfig.name,
    url: siteConfig.url,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}

export function articleJsonLd(input: {
  headline: string;
  description?: string | null;
  path: string;
  image?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
  authorName?: string | null;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    url: new URL(input.path, siteConfig.url).toString(),
    ...(input.description ? { description: input.description } : {}),
    ...(input.image ? { image: [new URL(input.image, siteConfig.url).toString()] } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    ...(input.authorName
      ? { author: { "@type": "Person", name: input.authorName } }
      : {}),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function jobPostingJsonLd(input: {
  title: string;
  description: string;
  path: string;
  datePosted: string;
  validThrough?: string | null;
  employmentType?: string | null;
  location?: string | null;
  workplaceType?: string | null;
}): JsonLd {
  const remote = input.workplaceType?.toLowerCase() === "remote";

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: input.title,
    description: input.description,
    datePosted: input.datePosted,
    ...(input.validThrough ? { validThrough: input.validThrough } : {}),
    ...(input.employmentType ? { employmentType: input.employmentType.toUpperCase().replace(/[- ]/g, "_") } : {}),
    ...(remote
      ? { jobLocationType: "TELECOMMUTE" }
      : input.location
        ? {
            jobLocation: {
              "@type": "Place",
              address: { "@type": "PostalAddress", addressLocality: input.location },
            },
          }
        : {}),
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.legalName,
      sameAs: siteConfig.url,
    },
    url: new URL(input.path, siteConfig.url).toString(),
  };
}


export function faqPageJsonLd(items: Array<{ question: string; answer: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serializeJsonLd(data: JsonLd | JsonLd[]) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
