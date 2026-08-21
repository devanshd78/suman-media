import { defineField, defineType } from "sanity";

export const jobType = defineType({
  name: "job",
  title: "Job",
  type: "document",
  groups: [
    { name: "content", title: "Role", default: true },
    { name: "publishing", title: "Publishing" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Job title", type: "string", group: "content", validation: (rule) => rule.required().max(100) }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "content", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "department", title: "Department", type: "string", group: "content", validation: (rule) => rule.required().max(80) }),
    defineField({ name: "employmentType", title: "Employment type", type: "string", group: "content", options: { list: ["Full-time", "Part-time", "Contract", "Internship", "Temporary"] }, validation: (rule) => rule.required() }),
    defineField({ name: "workplaceType", title: "Workplace type", type: "string", group: "content", options: { list: ["On-site", "Hybrid", "Remote"] }, validation: (rule) => rule.required() }),
    defineField({ name: "location", title: "Location", type: "string", group: "content", validation: (rule) => rule.required().max(120) }),
    defineField({ name: "experience", title: "Experience", type: "string", group: "content", validation: (rule) => rule.max(120) }),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 3, group: "content", validation: (rule) => rule.required().max(240) }),
    defineField({ name: "body", title: "Job description", type: "portableText", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "datePosted", title: "Date posted", type: "date", group: "publishing", initialValue: () => new Date().toISOString().slice(0, 10), validation: (rule) => rule.required() }),
    defineField({ name: "validThrough", title: "Applications close", type: "date", group: "publishing", validation: (rule) => rule.min(rule.valueOfField("datePosted")).warning("The closing date should not be before the posting date.") }),
    defineField({ name: "active", title: "Accepting applications", type: "boolean", group: "publishing", initialValue: true }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Date posted, newest", name: "datePostedDesc", by: [{ field: "datePosted", direction: "desc" }] }],
  preview: {
    select: { title: "title", department: "department", location: "location", active: "active" },
    prepare: ({ title, department, location, active }) => ({ title, subtitle: `${active ? "Open" : "Closed"} · ${department ?? ""} · ${location ?? ""}` }),
  },
});
