import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Insight",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "relations", title: "Taxonomy & related" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "content", validation: (rule) => rule.required().max(120) }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "content", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, group: "content", description: "Used on insight cards and as the SEO description fallback.", validation: (rule) => rule.required().max(240) }),
    defineField({ name: "featuredImage", title: "Featured image", type: "mediaImage", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "body", title: "Article body", type: "portableText", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime", group: "content", initialValue: () => new Date().toISOString(), validation: (rule) => rule.required() }),
    defineField({ name: "featured", title: "Featured insight", type: "boolean", group: "content", initialValue: false }),
    defineField({ name: "author", title: "Author", type: "reference", group: "relations", to: [{ type: "author" }], validation: (rule) => rule.required() }),
    defineField({ name: "categories", title: "Categories", type: "array", group: "relations", of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })], validation: (rule) => rule.required().min(1).unique() }),
    defineField({ name: "relatedServices", title: "Related services", type: "array", group: "relations", of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })], validation: (rule) => rule.unique() }),
    defineField({ name: "relatedProjects", title: "Related projects", type: "array", group: "relations", of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })], validation: (rule) => rule.unique() }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Published, newest", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", author: "author.name", media: "featuredImage", publishedAt: "publishedAt" },
    prepare: ({ title, author, media, publishedAt }) => ({
      title,
      media,
      subtitle: [author, publishedAt ? new Date(publishedAt).toLocaleDateString("en-IN") : null].filter(Boolean).join(" · "),
    }),
  },
});
