import { defineQuery } from "next-sanity";

export const HOME_PAGE_HERO_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0]{
    "heroSlides": heroSlides[coalesce(enabled, true) == true]{
      _key,
      internalName,
      eyebrow,
      heading,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      "mobileImageUrl": mobileImage.asset->url,
      "mobileImageAlt": mobileImage.alt,
      cta{
        label,
        href
      }
    }
  }
`);

export const SERVICE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0]{
    _id,
    _type,
    _updatedAt,
    title,
    "slug": slug.current,
    "description": coalesce(shortDescription, description),
    "seo": {
      "title": seo.metaTitle,
      "description": seo.metaDescription,
      "canonicalUrl": seo.canonicalUrl,
      "noIndex": coalesce(seo.noIndex, false),
      "socialImageUrl": seo.socialImage.asset->url,
      "socialImageAlt": seo.socialImage.alt
    }
  }
`);

export const COMPANY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "company" && slug.current == $slug][0]{
    _id,
    _type,
    _updatedAt,
    "title": coalesce(name, title),
    "slug": slug.current,
    "description": coalesce(shortDescription, description),
    "seo": {
      "title": seo.metaTitle,
      "description": seo.metaDescription,
      "canonicalUrl": seo.canonicalUrl,
      "noIndex": coalesce(seo.noIndex, false),
      "socialImageUrl": seo.socialImage.asset->url,
      "socialImageAlt": seo.socialImage.alt
    }
  }
`);

export const INSIGHT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    _type,
    _updatedAt,
    title,
    "slug": slug.current,
    "description": coalesce(excerpt, description),
    publishedAt,
    "seo": {
      "title": seo.metaTitle,
      "description": seo.metaDescription,
      "canonicalUrl": seo.canonicalUrl,
      "noIndex": coalesce(seo.noIndex, false),
      "socialImageUrl": seo.socialImage.asset->url,
      "socialImageAlt": seo.socialImage.alt
    }
  }
`);

export const SITEMAP_DOCUMENTS_QUERY = defineQuery(`
  *[
    _type in ["service", "company", "post"] &&
    defined(slug.current) &&
    coalesce(seo.noIndex, false) != true
  ]{
    _type,
    "slug": slug.current,
    _updatedAt
  }
`);
