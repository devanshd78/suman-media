import { ProductPage } from "@/components/products/knowledge-ip/product-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata(
  "Intellectual Property Development",
  "Develop original ideas, entertainment formats and creative properties across content, platforms, licensing and distribution.",
  "/products/intellectual-property-development",
);

export default function IntellectualPropertyPage() {
  return <ProductPage kind="ip" />;
}
