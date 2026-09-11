import { defineQuery } from "next-sanity";

const INSIGHT_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "imageUrl": featuredImage.asset->url,
  "imageAlt": select(featuredImage.decorative == true => "", featuredImage.alt),
  "imageHotspotX": featuredImage.hotspot.x,
  "imageHotspotY": featuredImage.hotspot.y,
  publishedAt,
  featured,
  "authorName": author->name,
  "categories": categories[]->{
    title,
    "slug": slug.current
  }
`;

export const NEWS_BLOGS_LIST_QUERY = defineQuery(`
  *[
    _type == "post" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    defined(featuredImage.asset)
  ]
  | order(coalesce(featured, false) desc, publishedAt desc)
  [0...60]{
    ${INSIGHT_CARD_FIELDS}
  }
`);

export const NEWS_BLOG_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "post" &&
    slug.current == $slug
  ][0]{
    ${INSIGHT_CARD_FIELDS},
    _type,
    _updatedAt,
    "imageCredit": coalesce(imageCredit, featuredImage.caption),
    readingTimeMinutes,
    "author": author->{
      name,
      role,
      "imageUrl": image.asset->url,
      "imageAlt": select(image.decorative == true => "", image.alt)
    },
    body[]{
      ...,
      _type == "mediaImage" => {
        _key,
        _type,
        "imageUrl": asset->url,
        "imageAlt": select(decorative == true => "", alt),
        caption
      }
    },
    "relatedPosts": *[
      _type == "post" &&
      _id != ^._id &&
      defined(slug.current) &&
      defined(publishedAt) &&
      defined(featuredImage.asset) &&
      count(categories[@._ref in ^.categories[]._ref]) > 0
    ]
    | order(publishedAt desc)
    [0...3]{
      ${INSIGHT_CARD_FIELDS}
    },
    "previousPost": *[
      _type == "post" &&
      defined(slug.current) &&
      publishedAt < ^.publishedAt
    ]
    | order(publishedAt desc)
    [0]{ title, "slug": slug.current },
    "nextPost": *[
      _type == "post" &&
      defined(slug.current) &&
      publishedAt > ^.publishedAt
    ]
    | order(publishedAt asc)
    [0]{ title, "slug": slug.current },
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

export const NEWS_BLOGS_SHARED_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0]{
    "faqSection": faqSection{
      eyebrow,
      heading,
      contactText,
      contactEmail,
      items[]{
        _key,
        question,
        answer
      }
    },
    "careersCta": careersCta{
      eyebrow,
      heading,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": select(image.decorative == true => "", image.alt),
      cta{ label, href, style }
    }
  }
`);
