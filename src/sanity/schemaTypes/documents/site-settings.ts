import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand", default: true },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social" },
    { name: "seo", title: "SEO defaults" },
  ],
  fields: [
    defineField({
      name: "brandName",
      title: "Brand name",
      type: "string",
      group: "brand",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "legalName",
      title: "Legal company name",
      type: "string",
      group: "brand",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "description",
      title: "Default site description",
      type: "text",
      rows: 3,
      group: "brand",
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "logo",
      title: "Primary logo",
      type: "mediaImage",
      group: "brand",
    }),
    defineField({
      name: "logoDark",
      title: "Logo for dark backgrounds",
      type: "mediaImage",
      group: "brand",
    }),
    defineField({
      name: "email",
      title: "Public email",
      type: "string",
      group: "contact",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "phone",
      title: "Public phone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "address",
      title: "Office address",
      type: "text",
      rows: 3,
      group: "contact",
    }),
    defineField({
      name: "socialLinks",
      title: "Social profiles",
      type: "array",
      group: "social",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "platform", title: "Platform", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "url", title: "URL", type: "url", validation: (rule) => rule.required().uri({ scheme: ["https"] }) }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        },
      ],
    }),
    defineField({
      name: "defaultMetaTitle",
      title: "Default meta title",
      type: "string",
      group: "seo",
      description: "Fallback title for pages without a specific SEO title.",
      validation: (rule) => rule.max(60).warning("Keep the default search title at about 60 characters or fewer."),
    }),
    defineField({
      name: "defaultMetaDescription",
      title: "Default meta description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (rule) => rule.max(160).warning("Keep the default search description at about 160 characters or fewer."),
    }),
    defineField({
      name: "defaultSocialImage",
      title: "Default social image",
      type: "seoImage",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings", subtitle: "Global brand, contact and SEO defaults" }),
  },
});
