import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  description:
    "Optional search and social overrides. Leave fields empty to use the page's normal title, summary, and default social image.",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description: "Recommended: about 50-60 characters. Empty uses the document title.",
      validation: (rule) => rule.max(60).warning("Search titles are usually strongest at 60 characters or fewer."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Recommended: about 140-160 characters. Empty uses the document summary.",
      validation: (rule) => rule.max(160).warning("Search descriptions are usually strongest at 160 characters or fewer."),
    }),
    defineField({
      name: "socialImage",
      title: "Social sharing image",
      type: "seoImage",
      description: "Used by Open Graph and social cards when provided.",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL override",
      type: "url",
      description: "Advanced: leave empty unless this page should canonicalize to another absolute URL.",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      description: "Turn this on only when this published page should not appear in search results.",
      initialValue: false,
    }),
  ],
  options: { collapsible: true, collapsed: true },
});
