export type CmsSeo = {
  title?: string | null;
  description?: string | null;
  canonicalUrl?: string | null;
  noIndex?: boolean | null;
  socialImageUrl?: string | null;
  socialImageAlt?: string | null;
};

export type CmsHeroSlide = {
  _key: string;
  internalName?: string | null;
  eyebrow: string;
  heading: string;
  description: string;
  imageUrl: string;
  imageAlt?: string | null;
  mobileImageUrl?: string | null;
  mobileImageAlt?: string | null;
  cta?: {
    label: string;
    href: string;
  } | null;
};

export type CmsCareersCultureSlide = {
  _key: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt?: string | null;
};

export type CmsCareersCulture = {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  slides?: CmsCareersCultureSlide[] | null;
};

export type CmsCareerOpening = {
  _key: string;
  title: string;
  location: string;
  description: string;
  responsibilities?: string[] | null;
  requirements?: string[] | null;
  applyUrl?: string | null;
};

export type CmsCareersPartnerCta = {
  heading?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
};

export type CmsFeaturedCompany = {
  _id: string;
  name: string;
  slug?: string | null;
  shortDescription: string;
  logoUrl?: string | null;
  logoAlt?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  websiteUrl?: string | null;
};

export type CmsFeaturedProject = {
  _id: string;
  title: string;
  slug?: string | null;
  client?: string | null;
  shortDescription: string;
  imageUrl: string;
  imageAlt?: string | null;
  projectDate?: string | null;
};

export type CmsFeaturedInsight = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  imageAlt?: string | null;
  publishedAt: string;
  authorName?: string | null;
  category?: string | null;
};

export type CmsDetailDocument = {
  _id: string;
  _type: "service" | "company" | "post";
  _updatedAt: string;
  title: string;
  slug: string;
  description?: string | null;
  publishedAt?: string | null;
  seo?: CmsSeo | null;
};

export type CmsSitemapDocument = {
  _type: CmsDetailDocument["_type"];
  slug: string;
  _updatedAt: string;
};
