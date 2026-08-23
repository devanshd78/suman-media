import { defineArrayMember, defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  groups: [
    { name: "cards", title: "Contact cards", default: true },
    { name: "form", title: "Contact form" },
    { name: "connectedWorld", title: "Connected world section" },
    { name: "careersCta", title: "Careers CTA" },
  ],
  fields: [
    defineField({
      name: "contactCards",
      title: "Contact cards",
      type: "array",
      group: "cards",
      description:
        "Add up to three contact routes. If this list is empty, the website uses its local fallback cards.",
      of: [
        defineArrayMember({
          name: "contactCard",
          title: "Contact card",
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
              title: "Hover description",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required().max(220),
            }),
            defineField({
              name: "image",
              title: "Background image",
              type: "mediaImage",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "Destination",
              type: "string",
              description:
                "Use an internal path such as /contact/form?type=investor or a full URL.",
              validation: (rule) => rule.required().max(500),
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
              subtitle: "description",
              media: "image",
              enabled: "enabled",
            },
            prepare: ({ title, subtitle, media, enabled }) => ({
              title: title || "Contact card",
              subtitle: `${enabled === false ? "Disabled · " : ""}${subtitle || ""}`,
              media,
            }),
          },
        }),
      ],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "generalFormCategories",
      title: "General enquiry categories",
      type: "array",
      group: "form",
      description: "Buttons shown above the standard contact form.",
      initialValue: ["Services", "Abhijat Marathi", "Solutions", "Products"],
      of: [
        defineArrayMember({
          type: "string",
          validation: (rule) => rule.required().max(80),
        }),
      ],
      validation: (rule) => rule.unique().max(8),
    }),
    defineField({
      name: "partnerFormCategories",
      title: "Partner categories",
      type: "array",
      group: "form",
      description:
        "Buttons and dropdown options shown when a visitor chooses Join as a partner.",
      initialValue: ["Story", "Production", "Music", "Others"],
      of: [
        defineArrayMember({
          type: "string",
          validation: (rule) => rule.required().max(80),
        }),
      ],
      validation: (rule) => rule.unique().max(12),
    }),
    defineField({
      name: "connectedWorldHeading",
      title: "Heading",
      type: "string",
      group: "connectedWorld",
      initialValue: "Connecting the world",
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: "connectedWorldDescription",
      title: "Description",
      type: "text",
      rows: 3,
      group: "connectedWorld",
      initialValue:
        "What begins in Maharashtra travels through content, technology and partnerships to audiences and markets around the world.",
      validation: (rule) => rule.max(320),
    }),
    defineField({
      name: "connectedWorldImage",
      title: "Background image",
      type: "mediaImage",
      group: "connectedWorld",
      description:
        "If empty, the website uses the local connected-world artwork.",
    }),
    defineField({
      name: "careersCtaHeading",
      title: "Heading",
      type: "string",
      group: "careersCta",
      initialValue:
        "Join us to start a New Chapter in Media and Entertainment",
      validation: (rule) => rule.max(140),
    }),
    defineField({
      name: "careersCtaButtonLabel",
      title: "Button label",
      type: "string",
      group: "careersCta",
      initialValue: "View Open Roles",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "careersCtaHref",
      title: "Button destination",
      type: "string",
      group: "careersCta",
      initialValue: "/careers",
      description: "Use an internal path or a full URL.",
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: "careersCtaImage",
      title: "Background image",
      type: "mediaImage",
      group: "careersCta",
      description: "If empty, the website uses the local image3.png image.",
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Contact Page",
      subtitle: "Contact pathways and connected-world content",
    }),
  },
});
