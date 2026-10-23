import { defineField, defineType } from "sanity";

export const siteTranslationType = defineType({
  name: "siteTranslation", title: "English / Marathi Translation", type: "document",
  fields: [
    defineField({ name: "context", title: "Page or section", type: "string", description: "For editors, e.g. About / mission or an article title." }),
    defineField({ name: "english", title: "English source text", type: "text", description: "Copy the complete heading, paragraph, or rich-text span exactly as it appears in the English content.", validation: (rule) => rule.required() }),
    defineField({ name: "marathi", title: "Marathi translation", type: "text", validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "english", subtitle: "context" } },
});
