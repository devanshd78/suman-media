import { localizeMetadata } from "@/i18n/server";

import { LocalizedContent } from "@/components/localization/localized-server-content";
import { ProductPage } from "@/components/products/publications-and-intellectual-property/publications-and-intellectual-property-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() { return localizeMetadata(createPageMetadata(
  "Intellectual Property Development",
  "Develop original ideas, entertainment formats and creative properties across content, platforms, licensing and distribution.",
  "/products/intellectual-property-development",
)); }

export default function IntellectualPropertyPage() {
  return <LocalizedContent>{<ProductPage kind="ip" />}</LocalizedContent>;
}
