import { defineField, defineType } from "sanity";

export const ctaType = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Use a site path such as /contact or a full https:// URL.",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true;
          return value.startsWith("/") || /^https:\/\//i.test(value)
            ? true
            : "Use an internal path beginning with / or a full https:// URL.";
        }),
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Text link", value: "text" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
