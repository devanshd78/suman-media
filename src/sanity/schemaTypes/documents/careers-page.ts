import { defineArrayMember, defineField, defineType } from "sanity";

export const careersPageType = defineType({
  name: "careersPage",
  title: "Careers Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "gallery", title: "Life at Suman gallery" },
    { name: "culture", title: "Culture carousel" },
    { name: "openings", title: "Open positions" },
    { name: "partnerCta", title: "Partner CTA" },
  ],
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "mediaImage",
      group: "hero",
    }),
    defineField({
      name: "galleryImages",
      title: "Animated gallery images",
      type: "array",
      group: "gallery",
      of: [defineArrayMember({ type: "mediaImage" })],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "cultureEyebrow",
      title: "Culture eyebrow",
      type: "string",
      group: "culture",
      initialValue: "CULTURE",
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "cultureHeading",
      title: "Culture heading",
      type: "string",
      group: "culture",
      initialValue: "Ideas Are Meant to Move.",
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: "cultureDescription",
      title: "Culture description",
      type: "text",
      rows: 3,
      group: "culture",
      initialValue:
        "We believe great work comes from curious people, open collaboration and the freedom to challenge what already exists.",
      validation: (rule) => rule.max(320),
    }),
    defineField({
      name: "cultureSlides",
      title: "Culture slides",
      type: "array",
      group: "culture",
      description:
        "Add up to four slides. If this list is empty, the website uses its local fallback slides.",
      of: [
        defineArrayMember({
          name: "cultureSlide",
          title: "Culture slide",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              validation: (rule) => rule.required().max(180),
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "mediaImage",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              media: "image",
            },
          },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "openings",
      title: "Open positions",
      type: "array",
      group: "openings",
      description:
        "Published openings replace the website's local fallback positions.",
      of: [
        defineArrayMember({
          name: "careerOpening",
          title: "Career opening",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Job title",
              type: "string",
              validation: (rule) => rule.required().max(100),
            }),
            defineField({
              name: "location",
              title: "Location",
              type: "string",
              validation: (rule) => rule.required().max(100),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required().max(600),
            }),
            defineField({
              name: "responsibilities",
              title: "Responsibilities",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              validation: (rule) => rule.max(12),
            }),
            defineField({
              name: "requirements",
              title: "Requirements",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              validation: (rule) => rule.max(12),
            }),
            defineField({
              name: "applyUrl",
              title: "Apply link",
              type: "string",
              description:
                "Optional internal path or full URL. Defaults to the contact page.",
              validation: (rule) => rule.max(500),
            }),
            defineField({
              name: "enabled",
              title: "Published on website",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "location",
              enabled: "enabled",
            },
            prepare: ({ title, subtitle, enabled }) => ({
              title: title || "Career opening",
              subtitle: `${enabled === false ? "Disabled · " : ""}${subtitle || ""}`,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "partnerCtaHeading",
      title: "Partner CTA heading",
      type: "string",
      group: "partnerCta",
      description:
        "If empty, the website uses the default careers partnership headline.",
      initialValue:
        "Have a story worth telling? Let's bring it to the world.",
      validation: (rule) => rule.max(140),
    }),
    defineField({
      name: "partnerCtaImage",
      title: "Partner CTA background image",
      type: "mediaImage",
      group: "partnerCta",
      description:
        "If empty, the website uses the local background3.png image.",
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Careers Page",
      subtitle: "Careers imagery and culture carousel",
    }),
  },
});
