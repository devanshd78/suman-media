import { defineArrayMember, defineField, defineType } from "sanity";

export const companyType = defineType({
  name: "company",
  title: "Company / Platform",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "relations", title: "Related content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", group: "content", validation: (rule) => rule.required().max(100) }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "content", options: { source: "name", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 3, group: "content", validation: (rule) => rule.required().max(220) }),
    defineField({ name: "description", title: "Overview", type: "text", rows: 5, group: "content", validation: (rule) => rule.max(700) }),
    defineField({ name: "logo", title: "Logo", type: "mediaImage", group: "content" }),
    defineField({ name: "featuredImage", title: "Featured image", type: "mediaImage", group: "content" }),
    defineField({ name: "websiteUrl", title: "External website", type: "url", group: "content", validation: (rule) => rule.uri({ scheme: ["https"] }) }),
    defineField({ name: "body", title: "Page content", type: "portableText", group: "content" }),
    defineField({ name: "featured", title: "Featured company", type: "boolean", group: "content", initialValue: false }),
    defineField({ name: "services", title: "Services", type: "array", group: "relations", of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })], validation: (rule) => rule.unique() }),
    defineField({ name: "projects", title: "Projects", type: "array", group: "relations", of: [defineArrayMember({ type: "reference", to: [{ type: "project" }], options: { disableNew: true } })], validation: (rule) => rule.unique() }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    select: { title: "name", subtitle: "shortDescription", media: "logo" },
  },
});
