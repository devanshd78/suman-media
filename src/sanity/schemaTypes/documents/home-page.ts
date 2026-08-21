import { defineArrayMember, defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "content", title: "Content" },
    { name: "featured", title: "Featured content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "heroSlides",
      title: "Hero slides",
      type: "array",
      group: "hero",
      description: "Homepage hero carousel. Drag items to change the slide order.",
      of: [
        defineArrayMember({
          name: "heroSlide",
          title: "Hero slide",
          type: "object",
          fields: [
            defineField({
              name: "internalName",
              title: "Internal name",
              type: "string",
              description: "Only used inside Sanity Studio to identify the slide.",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "eyebrow",
              title: "Category / eyebrow",
              type: "string",
              description: "Example: Digital Entertainment & Platform. The slide number is added by the frontend.",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              validation: (rule) => rule.required().max(120),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required().max(360),
            }),
            defineField({
              name: "image",
              title: "Desktop image",
              type: "mediaImage",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "mobileImage",
              title: "Mobile image",
              type: "mediaImage",
              description: "Optional. Leave empty to use the desktop image on smaller screens.",
            }),
            defineField({
              name: "cta",
              title: "Button",
              type: "cta",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "enabled",
              title: "Enabled",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: "internalName",
              subtitle: "heading",
              media: "image",
              enabled: "enabled",
            },
            prepare: ({ title, subtitle, media, enabled }) => ({
              title: title || "Hero slide",
              subtitle: `${enabled === false ? "Disabled · " : ""}${subtitle || ""}`,
              media,
            }),
          },
        }),
      ],
      validation: (rule) => rule.required().min(1).max(5),
    }),
    // Legacy single-hero fields are kept hidden for backwards compatibility.
    defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "string", group: "hero", hidden: true, validation: (rule) => rule.max(60) }),
    defineField({
      name: "heroHeading",
      title: "Hero heading",
      type: "string",
      group: "hero",
      description: "This is the homepage H1. Keep it company-first and descriptive.",
      validation: (rule) => rule.max(100),
      hidden: true,
    }),
    defineField({ name: "heroDescription", title: "Hero description", type: "text", rows: 4, group: "hero", hidden: true, validation: (rule) => rule.max(320) }),
    defineField({ name: "heroImage", title: "Hero image", type: "mediaImage", group: "hero", hidden: true }),
    defineField({ name: "heroCtas", title: "Hero calls to action", type: "array", group: "hero", hidden: true, of: [defineArrayMember({ type: "cta" })], validation: (rule) => rule.max(2) }),
    defineField({ name: "aboutEyebrow", title: "About eyebrow", type: "string", group: "content" }),
    defineField({ name: "aboutHeading", title: "About heading", type: "string", group: "content", validation: (rule) => rule.max(100) }),
    defineField({ name: "aboutDescription", title: "About description", type: "text", rows: 5, group: "content" }),
    defineField({ name: "aboutCta", title: "About call to action", type: "cta", group: "content" }),
    defineField({
      name: "stats",
      title: "Verified statistics",
      type: "array",
      group: "content",
      description: "Only publish figures that the company can verify.",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", title: "Value", type: "number", validation: (rule) => rule.required().min(0) }),
            defineField({ name: "prefix", title: "Prefix", type: "string", validation: (rule) => rule.max(10) }),
            defineField({ name: "suffix", title: "Suffix", type: "string", validation: (rule) => rule.max(10) }),
            defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required().max(80) }),
          ],
          preview: {
            select: { title: "label", value: "value", prefix: "prefix", suffix: "suffix" },
            prepare: ({ title, value, prefix, suffix }) => ({ title, subtitle: `${prefix ?? ""}${value ?? ""}${suffix ?? ""}` }),
          },
        }),
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({ name: "featuredCompanies", title: "Featured companies", type: "array", group: "featured", of: [defineArrayMember({ type: "reference", to: [{ type: "company" }] })], validation: (rule) => rule.unique().max(8) }),
    defineField({ name: "featuredServices", title: "Featured services", type: "array", group: "featured", of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })], validation: (rule) => rule.unique().max(8) }),
    defineField({ name: "featuredIndustries", title: "Featured industries", type: "array", group: "featured", of: [defineArrayMember({ type: "reference", to: [{ type: "industry" }] })], validation: (rule) => rule.unique().max(12) }),
    defineField({ name: "featuredProjects", title: "Featured projects", type: "array", group: "featured", of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })], validation: (rule) => rule.unique().max(8) }),
    defineField({ name: "featuredInsights", title: "Featured insights", type: "array", group: "featured", of: [defineArrayMember({ type: "reference", to: [{ type: "post" }] })], validation: (rule) => rule.unique().max(6) }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page", subtitle: "Homepage content and featured items" }),
  },
});
