"use client";

import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { mainDocuments, locations } from "./src/sanity/presentation/resolve";
import { singletonTypes, structure } from "./src/sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const previewUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

if (!projectId || !dataset) {
  throw new Error(
    "Sanity Studio requires NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.",
  );
}

const previewOrigin = new URL(previewUrl).origin;
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "sumanMedia",
  title: "Suman Media CMS",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        initial: previewUrl,
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
      allowOrigins: [previewOrigin, "http://localhost:*"],
      resolve: { locations, mainDocuments },
    }),
  ],
  schema: { types: schemaTypes },
  document: {
    newDocumentOptions: (options, { creationContext }) =>
      creationContext.type === "global"
        ? options.filter((option) => !singletonTypes.has(option.templateId))
        : options,
    actions: (actions, context) =>
      singletonTypes.has(context.schemaType)
        ? actions.filter(
            (action) => action.action && singletonActions.has(action.action),
          )
        : actions,
  },
});
