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

export const CAREERS_CULTURE_QUERY = defineQuery(`
  *[_type == "careersPage"][0]{
    "eyebrow": cultureEyebrow,
    "heading": cultureHeading,
    "description": cultureDescription,
    "slides": cultureSlides[
      defined(image.asset) &&
      defined(title) &&
      defined(description)
    ][0...4]{
      _key,
      title,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }
  }
`);

export const CAREERS_OPENINGS_QUERY = defineQuery(`
  *[_type == "careersPage"][0]{
    "openings": openings[coalesce(enabled, true) == true]{
      _key,
      title,
      location,
      description,
      responsibilities,
      requirements,
      applyUrl
    }
  }
`);

export const HOME_FEATURED_COMPANIES_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0].featuredCompanies[]->{
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    "logoUrl": logo.asset->url,
    "logoAlt": logo.alt,
    "imageUrl": featuredImage.asset->url,
    "imageAlt": featuredImage.alt,
    websiteUrl
  }
`);

export const COMPANIES_LIST_QUERY = defineQuery(`
  *[_type == "company" && defined(slug.current)]
    | order(coalesce(featured, false) desc, name asc)[0...8]{
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    "logoUrl": logo.asset->url,
    "logoAlt": logo.alt,
    "imageUrl": featuredImage.asset->url,
    "imageAlt": featuredImage.alt,
    websiteUrl
  }
`);

export const HOME_FEATURED_PROJECTS_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0].featuredProjects[]->{
    _id,
    title,
    "slug": slug.current,
    client,
    shortDescription,
    "imageUrl": featuredImage.asset->url,
    "imageAlt": featuredImage.alt,
    projectDate
  }
`);

export const PROJECTS_LIST_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)]
    | order(coalesce(featured, false) desc, projectDate desc)[0...6]{
    _id,
    title,
    "slug": slug.current,
    client,
    shortDescription,
    "imageUrl": featuredImage.asset->url,
    "imageAlt": featuredImage.alt,
    projectDate
  }
`);

export const HOME_FEATURED_INSIGHTS_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0].featuredInsights[]->{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "imageUrl": featuredImage.asset->url,
    "imageAlt": featuredImage.alt,
    publishedAt,
    "authorName": author->name,
    "category": categories[0]->title
  }
`);

export const INSIGHTS_LIST_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && defined(publishedAt)]
    | order(publishedAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "imageUrl": featuredImage.asset->url,
    "imageAlt": featuredImage.alt,
    publishedAt,
    "authorName": author->name,
    "category": categories[0]->title
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
