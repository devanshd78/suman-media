import { defineField, defineType } from "sanity";

export const seoImageType = defineType({
  name: "seoImage",
  title: "SEO image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Describe the image for accessibility and social previews.",
      validation: (rule) => rule.required().max(180),
    }),
  ],
});
