import { defineField, defineType } from "sanity";

export const mediaImageType = defineType({
  name: "mediaImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Required unless the image is purely decorative.",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { decorative?: boolean } | undefined;
          if (parent?.decorative || value) return true;
          return "Add alternative text or mark this image as decorative.";
        }),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "decorative",
      title: "Decorative image",
      type: "boolean",
      description: "Use only when the image adds no information and should be ignored by screen readers.",
      initialValue: false,
    }),
  ],
});
