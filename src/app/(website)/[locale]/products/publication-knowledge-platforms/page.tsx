import { localizeMetadata } from "@/i18n/server";

import { LocalizedContent } from "@/components/localization/localized-server-content";
import { ProductPage } from "@/components/products/publications-and-intellectual-property/publications-and-intellectual-property-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() { return localizeMetadata(createPageMetadata(
  "Publications & Knowledge Platforms",
  "From digital publishing and research reports to industry insights and knowledge platforms, turn information into useful, accessible knowledge.",
  "/products/publication-knowledge-platforms",
)); }

export default function PublicationsPage() {
  return <LocalizedContent>{<ProductPage kind="publication" />}</LocalizedContent>;
}
