import { defineQuery } from "next-sanity";

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0]{
    _id,
    _updatedAt,
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
      cta{label, href, style}
    },
    aboutEyebrow,
    aboutHeading,
    aboutDescription,
    aboutCta{label, href, style},
    clientsEyebrow,
    clientsHeading,
    servicesEyebrow,
    servicesHeading,
    industriesEyebrow,
    industriesHeading,
    industriesDescription,
    industriesCta{label, href, style},
    insightsEyebrow,
    insightsHeading,
    insightsCta{label, href, style},
    stats[]{_key, value, prefix, suffix, label},
    "featuredCompanies": select(
      count(coalesce(featuredCompanies, [])) > 0 => featuredCompanies[]->{
        _id, name, "slug": slug.current, shortDescription,
        "logoUrl": logo.asset->url, "logoAlt": logo.alt,
        "imageUrl": featuredImage.asset->url, "imageAlt": featuredImage.alt,
        websiteUrl,
        "hasDetailPage": defined(description) || count(coalesce(body, [])) > 0
      },
      *[_type == "company" && coalesce(featured, false) == true && defined(logo.asset)]
        | order(name asc)[0...8]{
          _id, name, "slug": slug.current, shortDescription,
          "logoUrl": logo.asset->url, "logoAlt": logo.alt,
          "imageUrl": featuredImage.asset->url, "imageAlt": featuredImage.alt,
          websiteUrl,
          "hasDetailPage": defined(description) || count(coalesce(body, [])) > 0
        }
    ),
    "featuredServices": select(
      count(coalesce(featuredServices, [])) > 0 => featuredServices[]->{
        _id, title, "slug": slug.current, shortDescription,
        "imageUrl": featuredImage.asset->url, "imageAlt": featuredImage.alt
      },
      *[_type == "service" && coalesce(featured, false) == true && defined(featuredImage.asset)]
        | order(title asc)[0...8]{
          _id, title, "slug": slug.current, shortDescription,
          "imageUrl": featuredImage.asset->url, "imageAlt": featuredImage.alt
        }
    ),
    "featuredIndustries": select(
      count(coalesce(featuredIndustries, [])) > 0 => featuredIndustries[]->{
        _id, title, "slug": slug.current, shortDescription,
        "imageUrl": featuredImage.asset->url, "imageAlt": featuredImage.alt
      },
      *[_type == "industry" && coalesce(featured, false) == true && defined(featuredImage.asset)]
        | order(title asc)[0...12]{
          _id, title, "slug": slug.current, shortDescription,
          "imageUrl": featuredImage.asset->url, "imageAlt": featuredImage.alt
        }
    ),
    "featuredProjects": select(
      count(coalesce(featuredProjects, [])) > 0 => featuredProjects[]->{
        _id, title, "slug": slug.current, client, shortDescription,
        "imageUrl": featuredImage.asset->url, "imageAlt": featuredImage.alt, projectDate
      },
      *[_type == "project" && coalesce(featured, false) == true && defined(featuredImage.asset)]
        | order(projectDate desc)[0...8]{
          _id, title, "slug": slug.current, client, shortDescription,
          "imageUrl": featuredImage.asset->url, "imageAlt": featuredImage.alt, projectDate
        }
    ),
    "featuredInsights": select(
      count(coalesce(featuredInsights, [])) > 0 => featuredInsights[]->{
        _id, title, "slug": slug.current, excerpt,
        "imageUrl": featuredImage.asset->url, "imageAlt": featuredImage.alt,
        publishedAt, "authorName": author->name, "category": categories[0]->title
      },
      *[_type == "post" && coalesce(featured, false) == true && defined(slug.current) && defined(publishedAt) && defined(featuredImage.asset)]
        | order(publishedAt desc)[0...6]{
          _id, title, "slug": slug.current, excerpt,
          "imageUrl": featuredImage.asset->url, "imageAlt": featuredImage.alt,
          publishedAt, "authorName": author->name, "category": categories[0]->title
        }
    ),
"achievement": {
  "eyebrow": achievementEyebrow,
  "heading": achievementHeading,
  "description": achievementDescription,

  "departmentEmblemUrl":
    achievementDepartmentEmblem.asset->url,
  "departmentEmblemAlt":
    select(
      achievementDepartmentEmblem.decorative == true => "",
      achievementDepartmentEmblem.alt
    ),

  "governmentSealUrl":
    achievementGovernmentSeal.asset->url,
  "governmentSealAlt":
    select(
      achievementGovernmentSeal.decorative == true => "",
      achievementGovernmentSeal.alt
    ),

  "bottomArtworkUrl":
    achievementBottomArtwork.asset->url,
  "bottomArtworkAlt":
    select(
      achievementBottomArtwork.decorative == true => "",
      achievementBottomArtwork.alt
    ),

  "cta": {
    "label": achievementCta.label,
    "href": achievementCta.href,
    "style": achievementCta.style
  }
},
    "partnerSection": partnerSection{
      heading,
      description,
      benefits[]{_key, title, href},
      eventHeading,
      "eventImageUrl": eventImage.asset->url,
      "eventImageAlt": eventImage.alt,
      "eventBadgeUrl": eventBadge.asset->url,
      "eventBadgeAlt": eventBadge.alt,
      eventCta{label, href, style}
    },
    "testimonialSection": testimonialSection{
      quote,
      personName,
      personRole,
      companyName,
      "companyLogoUrl": companyLogo.asset->url,
      "companyLogoAlt": companyLogo.alt,
      "partnerLogos": partnerLogos[]{
        _key,
        label,
        "imageUrl": image.asset->url,
        "imageAlt": image.alt
      }
    },
    "storyBanner": storyBanner{
      eyebrow,
      heading,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      "badgeUrl": badge.asset->url,
      "badgeAlt": badge.alt,
      cta{label, href, style}
    },
    "mediaCoverage": mediaCoverage{
      eyebrow,
      heading,
      "items": items[]{
        _key,
        title,
        source,
        href,
        "imageUrl": image.asset->url,
        "imageAlt": image.alt
      }
    },
    "founderLetter": founderLetter{
      eyebrow,
      heading,
      body,
      founderName,
      founderRole,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    },
    "faqSection": faqSection{
      eyebrow,
      heading,
      contactText,
      contactEmail,
      items[]{_key, question, answer}
    },
    "careersCta": careersCta{
      eyebrow,
      heading,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      cta{label, href, style}
    },
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


export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    _id,
    _updatedAt,
    brandName,
    legalName,
    description,
    "logoUrl": logo.asset->url,
    "logoAlt": logo.alt,
    "logoDarkUrl": logoDark.asset->url,
    "logoDarkAlt": logoDark.alt,
    email,
    phone,
    address,
    socialLinks[]{_key, platform, url},
    defaultMetaTitle,
    defaultMetaDescription,
    "defaultSocialImageUrl": defaultSocialImage.asset->url,
    "defaultSocialImageAlt": defaultSocialImage.alt
  }
`);

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
        href,
        style
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

export const CAREERS_PARTNER_CTA_QUERY = defineQuery(`
  *[_type == "careersPage"][0]{
    "heading": partnerCtaHeading,
    "imageUrl": partnerCtaImage.asset->url,
    "imageAlt": partnerCtaImage.alt
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
    websiteUrl,
    "hasDetailPage": defined(description) || count(coalesce(body, [])) > 0
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
