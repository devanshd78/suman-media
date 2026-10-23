import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project / Portfolio",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "relations", title: "Related content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Project title", type: "string", group: "content", validation: (rule) => rule.required().max(110) }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "content", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "client", title: "Client", type: "string", group: "content", validation: (rule) => rule.max(120) }),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 3, group: "content", validation: (rule) => rule.required().max(240) }),
    defineField({ name: "featuredImage", title: "Featured image", type: "mediaImage", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "gallery", title: "Gallery", type: "array", group: "content", of: [defineArrayMember({ type: "mediaImage" })] }),
    defineField({ name: "body", title: "Case study", type: "portableText", group: "content" }),
    defineField({ name: "projectDate", title: "Project date", type: "date", group: "content" }),
    defineField({ name: "featured", title: "Featured project", type: "boolean", group: "content", initialValue: false }),
    defineField({ name: "companies", title: "Companies / platforms", type: "array", group: "relations", of: [defineArrayMember({ type: "reference", to: [{ type: "company" }] })], validation: (rule) => rule.unique() }),
    defineField({ name: "services", title: "Services", type: "array", group: "relations", of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })], validation: (rule) => rule.unique() }),
    defineField({ name: "industries", title: "Industries", type: "array", group: "relations", of: [defineArrayMember({ type: "reference", to: [{ type: "industry" }] })], validation: (rule) => rule.unique() }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Project date, newest", name: "projectDateDesc", by: [{ field: "projectDate", direction: "desc" }] }],
  preview: {
    select: { title: "title", client: "client", media: "featuredImage", projectDate: "projectDate" },
    prepare: ({ title, client, media, projectDate }) => ({ title, media, subtitle: [client, projectDate].filter(Boolean).join(" · ") }),
  },
});
