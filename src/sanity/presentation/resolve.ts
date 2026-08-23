import { defineDocuments, defineLocations } from "sanity/presentation";

export const locations = {
  service: defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [
        ...(doc?.slug
          ? [{ title: doc.title || "Service", href: `/services/${doc.slug}` }]
          : []),
        { title: "All services", href: "/services" },
      ],
    }),
  }),
  company: defineLocations({
    select: { title: "name", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [
        ...(doc?.slug
          ? [{ title: doc.title || "Company", href: `/companies/${doc.slug}` }]
          : []),
        { title: "All companies", href: "/companies" },
      ],
    }),
  }),
  post: defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [
        ...(doc?.slug
          ? [{ title: doc.title || "Insight", href: `/insights/${doc.slug}` }]
          : []),
        { title: "All insights", href: "/insights" },
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
  { route: "/companies/:slug", filter: `_type == "company" && slug.current == $slug` },
  { route: "/insights/:slug", filter: `_type == "post" && slug.current == $slug` },
]);
