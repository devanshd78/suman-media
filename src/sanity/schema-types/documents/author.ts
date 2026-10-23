import { defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required().max(100) }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "role", title: "Role / title", type: "string", validation: (rule) => rule.max(100) }),
    defineField({ name: "image", title: "Profile image", type: "mediaImage" }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 4, validation: (rule) => rule.max(500) }),
    defineField({ name: "linkedinUrl", title: "LinkedIn", type: "url", validation: (rule) => rule.uri({ scheme: ["https"] }) }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "image" } },
});
