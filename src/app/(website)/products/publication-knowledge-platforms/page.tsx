import { ProductPage } from "@/components/products/knowledge-ip/product-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata(
  "Publications & Knowledge Platforms",
  "From digital publishing and research reports to industry insights and knowledge platforms, turn information into useful, accessible knowledge.",
  "/products/publication-knowledge-platforms",
);

export default function PublicationsPage() {
  return <ProductPage kind="publication" />;
}
