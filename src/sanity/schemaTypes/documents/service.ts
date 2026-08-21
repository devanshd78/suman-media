import { defineArrayMember, defineField, defineType } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "relations", title: "Related content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "content", validation: (rule) => rule.required().max(90) }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "content", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 3, group: "content", description: "Used on cards and as the SEO fallback.", validation: (rule) => rule.required().max(220) }),
    defineField({ name: "description", title: "Overview", type: "text", rows: 5, group: "content", validation: (rule) => rule.max(700) }),
    defineField({ name: "featuredImage", title: "Featured image", type: "mediaImage", group: "content" }),
    defineField({ name: "body", title: "Page content", type: "portableText", group: "content" }),
    defineField({ name: "featured", title: "Featured service", type: "boolean", group: "content", initialValue: false }),
    defineField({ name: "industries", title: "Related industries", type: "array", group: "relations", of: [defineArrayMember({ type: "reference", to: [{ type: "industry" }] })], validation: (rule) => rule.unique() }),
    defineField({ name: "projects", title: "Selected projects", type: "array", group: "relations", of: [defineArrayMember({ type: "reference", to: [{ type: "project" }], options: { disableNew: true } })], validation: (rule) => rule.unique() }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "shortDescription", media: "featuredImage" },
  },
});
