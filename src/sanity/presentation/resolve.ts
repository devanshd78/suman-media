import {
  defineDocuments,
  defineLocations,
  type DocumentLocationResolvers,
} from "sanity/presentation";

export const locations: DocumentLocationResolvers = {
  service: defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [
        ...(doc?.slug
          ? [{ title: doc.title || "Service", href: `/services/${doc.slug}` }]
          : []),
        { title: "Home", href: "/" },
      ],
    }),
  }),
  company: defineLocations({
    select: { title: "name", slug: "slug.current" },
    resolve: () => ({
      locations: [{ title: "About us", href: "/about" }],
    }),
  }),
  post: defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [
        ...(doc?.slug
          ? [{ title: doc.title || "News & Blog Article", href: `/news-and-blogs/${doc.slug}` }]
          : []),
        { title: "All News & Blogs", href: "/news-and-blogs" },
      ],
    }),
  }),
  siteSettings: defineLocations({
    message: "Global settings are used across the website.",
    tone: "caution",
  }),
  homePage: defineLocations({
    message: "This document controls future CMS-driven homepage content.",
    tone: "positive",
  }),
  careersPage: defineLocations({
    locations: [{ title: "Careers", href: "/careers" }],
  }),
  contactPage: defineLocations({
    locations: [{ title: "Contact", href: "/contact" }],
  }),
};

export const mainDocuments = defineDocuments([
  { route: "/", filter: `_type == "homePage" && _id == "homePage"` },
  { route: "/careers", filter: `_type == "careersPage"` },
  { route: "/contact", filter: `_type == "contactPage"` },
  { route: "/services/:slug", filter: `_type == "service" && slug.current == $slug` },
  { route: "/news-and-blogs/:slug", filter: `_type == "post" && slug.current == $slug` },
]);
