export type CmsSeo = {
  title?: string | null;
  description?: string | null;
  canonicalUrl?: string | null;
  noIndex?: boolean | null;
  socialImageUrl?: string | null;
  socialImageAlt?: string | null;
};

export type CmsSiteSettings = {
  _id: string;
  _updatedAt: string;

  brandName?: string | null;
  legalName?: string | null;
  description?: string | null;

  logoUrl?: string | null;
  logoAlt?: string | null;

  logoDarkUrl?: string | null;
  logoDarkAlt?: string | null;

  email?: string | null;
  phone?: string | null;
  address?: string | null;

  socialLinks?: Array<{
    _key: string;
    platform: string;
    url: string;
  }> | null;

  footer?: {
    heading?: string | null;
    description?: string | null;
    contactCta?: CmsCta | null;
    partnerHeading?: string | null;
    partnerDescription?: string | null;
    partnerCta?: CmsCta | null;
    growHeading?: string | null;
    growDescription?: string | null;
    growCta?: CmsCta | null;
    marathiWordmark?: string | null;
    designCredit?: string | null;
  } | null;

  defaultMetaTitle?: string | null;

  defaultMetaDescription?:
    | string
    | null;

  defaultSocialImageUrl?:
    | string
    | null;

  defaultSocialImageAlt?:
    | string
    | null;
};

export type CmsCta = {
  label: string;
  href: string;

  style?:
    | "primary"
    | "secondary"
    | "text"
    | null;
};

export type CmsHero = {
  videoUrl?: string | null;

  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;

  learnMoreCta?: CmsCta | null;
  joinNowCta?: CmsCta | null;
};

export type CmsStat = {
  _key: string;

  value: number;

  prefix?: string | null;
  suffix?: string | null;

  label: string;
};

export type CmsFeaturedCompany = {
  _id: string;

  name: string;

  slug?: string | null;

  shortDescription?: string | null;

  logoUrl?: string | null;
  logoAlt?: string | null;

  imageUrl?: string | null;
  imageAlt?: string | null;

  websiteUrl?: string | null;

  hasDetailPage?:
    | boolean
    | null;
};

export type CmsFeaturedService = {
  _id: string;

  title: string;
  slug: string;

  shortDescription: string;

  imageUrl?: string | null;
  imageAlt?: string | null;
};

export type CmsFeaturedIndustry = {
  _id: string;

  title: string;
  slug: string;

  shortDescription: string;

  imageUrl?: string | null;
  imageAlt?: string | null;
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

export type CmsAchievementSection = {
  eyebrow?: string | null;

  heading?: string | null;

  description?: string | null;

  departmentEmblemUrl?:
    | string
    | null;

  departmentEmblemAlt?:
    | string
    | null;

  governmentSealUrl?:
    | string
    | null;

  governmentSealAlt?:
    | string
    | null;

  bottomArtworkUrl?:
    | string
    | null;

  bottomArtworkAlt?:
    | string
    | null;

  cta?: {
    label?: string | null;

    href?: string | null;

    style?:
      | "primary"
      | "secondary"
      | "text";
  } | null;
};

export type CmsPartnerBenefit = {
  _key: string;

  title: string;

  href?: string | null;
};

export type CmsPartnerSection = {
  heading?: string | null;

  description?: string | null;

  cta?: CmsCta | null;

  benefits?:
    | CmsPartnerBenefit[]
    | null;

  eventHeading?: string | null;

  eventImageUrl?: string | null;
  eventImageAlt?: string | null;

  eventBadgeUrl?: string | null;
  eventBadgeAlt?: string | null;

  eventCta?: CmsCta | null;
};

export type CmsLogoItem = {
  _key: string;

  label: string;

  imageUrl: string;

  imageAlt?: string | null;
};

export type CmsTestimonialSection = {
  quote?: string | null;

  personName?: string | null;

  personRole?: string | null;

  companyName?: string | null;

  companyLogoUrl?: string | null;

  companyLogoAlt?: string | null;

  partnerLogos?:
    | CmsLogoItem[]
    | null;
};

export type CmsStoryBanner = {
  eyebrow?: string | null;

  heading?: string | null;

  imageUrl?: string | null;

  imageAlt?: string | null;

  badgeUrl?: string | null;

  badgeAlt?: string | null;

  cta?: CmsCta | null;
};

export type CmsMediaCoverageItem = {
  _key: string;

  title: string;

  source?: string | null;

  href?: string | null;

  imageUrl?: string | null;

  imageAlt?: string | null;
};

export type CmsMediaCoverageSection = {
  eyebrow?: string | null;

  heading?: string | null;

  items?:
    | CmsMediaCoverageItem[]
    | null;
};

export type CmsFounderLetter = {
  eyebrow?: string | null;

  heading?: string | null;

  body?: string | null;

  founderName?: string | null;

  founderRole?: string | null;

  imageUrl?: string | null;

  imageAlt?: string | null;

  signatureUrl?: string | null;

  signatureAlt?: string | null;
};

export type CmsFaqItem = {
  _key: string;

  question: string;

  answer: string;
};

export type CmsFaqSection = {
  eyebrow?: string | null;

  heading?: string | null;

  contactText?: string | null;

  contactEmail?: string | null;

  items?:
    | CmsFaqItem[]
    | null;
};

export type CmsCareersCta = {
  eyebrow?: string | null;

  heading?: string | null;

  description?: string | null;

  imageUrl?: string | null;

  imageAlt?: string | null;

  cta?: CmsCta | null;
};

export type CmsHomePage = {
  _id: string;

  _updatedAt: string;

  hero?: CmsHero | null;

  aboutEyebrow?: string | null;

  aboutHeading?: string | null;

  aboutDescription?:
    | string
    | null;

  aboutCta?: CmsCta | null;

  clientsEyebrow?: string | null;

  clientsHeading?: string | null;

  servicesEyebrow?: string | null;

  servicesHeading?: string | null;

  industriesEyebrow?:
    | string
    | null;

  industriesHeading?:
    | string
    | null;

  industriesDescription?:
    | string
    | null;

  industriesCta?: CmsCta | null;

  insightsEyebrow?: string | null;

  insightsHeading?: string | null;

  insightsCta?: CmsCta | null;

  stats?: CmsStat[] | null;

  featuredCompanies?:
    | CmsFeaturedCompany[]
    | null;

  featuredServices?:
    | CmsFeaturedService[]
    | null;

  featuredIndustries?:
    | CmsFeaturedIndustry[]
    | null;

  featuredProjects?:
    | CmsFeaturedProject[]
    | null;

  featuredInsights?:
    | CmsFeaturedInsight[]
    | null;

  achievement?:
    | CmsAchievementSection
    | null;

  partnerSection?:
    | CmsPartnerSection
    | null;

  testimonialSection?:
    | CmsTestimonialSection
    | null;

  storyBanner?:
    | CmsStoryBanner
    | null;

  mediaCoverage?:
    | CmsMediaCoverageSection
    | null;

  founderLetter?:
    | CmsFounderLetter
    | null;

  faqSection?:
    | CmsFaqSection
    | null;

  careersCta?:
    | CmsCareersCta
    | null;

  seo?: CmsSeo | null;
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

  slides?:
    | CmsCareersCultureSlide[]
    | null;
};

export type CmsCareerOpening = {
  _key: string;

  title: string;

  location: string;

  description: string;

  responsibilities?:
    | string[]
    | null;

  requirements?:
    | string[]
    | null;

  applyUrl?: string | null;
};

export type CmsCareersPartnerCta = {
  heading?: string | null;

  imageUrl?: string | null;

  imageAlt?: string | null;
};

export type CmsContactCard = {
  _key: string;

  title: string;

  description: string;

  imageUrl: string;

  imageAlt?: string | null;

  href: string;
};

export type CmsContactPage = {
  cards?:
    | CmsContactCard[]
    | null;

  connectedWorld?: {
    heading?: string | null;

    description?: string | null;

    imageUrl?: string | null;

    imageAlt?: string | null;
  } | null;

  contactDetails?: {
    email?: string | null;

    phone?: string | null;

    address?: string | null;

    socialLinks?: Array<{
      _key: string;

      platform: string;

      url: string;
    }> | null;
  } | null;

  form?: {
    generalCategories?:
      | string[]
      | null;

    partnerCategories?:
      | string[]
      | null;
  } | null;

  careersCta?: {
    heading?: string | null;

    buttonLabel?: string | null;

    href?: string | null;

    imageUrl?: string | null;

    imageAlt?: string | null;
  } | null;
};

export type CmsDetailDocument = {
  _id: string;

  _type:
    | "service"
    | "company"
    | "post";

  _updatedAt: string;

  title: string;

  slug: string;

  description?: string | null;

  publishedAt?: string | null;

  seo?: CmsSeo | null;
};

export type CmsSitemapDocument = {
  _type:
    CmsDetailDocument["_type"];

  slug: string;

  _updatedAt: string;
};
