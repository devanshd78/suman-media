import type { StructureResolver } from "sanity/structure";

export const singletonTypes = new Set(["siteSettings", "homePage"]);

const singletonItems = [
  { type: "siteSettings", id: "siteSettings", title: "Site Settings" },
  { type: "homePage", id: "homePage", title: "Home Page" },
] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Suman Media CMS")
    .items([
      ...singletonItems.map(({ type, id, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(type).documentId(id).title(title)),
      ),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("company").title("Companies & Platforms"),
      S.documentTypeListItem("industry").title("Industries"),
      S.documentTypeListItem("project").title("Portfolio Projects"),
      S.divider(),
      S.documentTypeListItem("post").title("Insights"),
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("category").title("Insight Categories"),
      S.divider(),
      S.documentTypeListItem("job").title("Jobs"),
    ]);
