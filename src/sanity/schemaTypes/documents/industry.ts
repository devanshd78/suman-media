import { defineField, defineType } from "sanity";

export const industryType = defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "content", validation: (rule) => rule.required().max(90) }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "content", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 3, group: "content", validation: (rule) => rule.required().max(220) }),
    defineField({ name: "featuredImage", title: "Featured image", type: "mediaImage", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "body", title: "Page content", type: "portableText", group: "content" }),
    defineField({
      name: "featured",
      title: "Featured industry",
      type: "boolean",
      group: "content",
      description: "Used as the homepage fallback when Home Page → Featured industries has no manual selections.",
      initialValue: false,
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "shortDescription", media: "featuredImage" } },
});
