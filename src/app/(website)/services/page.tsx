import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata(
  "Services",
  "Explore services offered by Suman Media & Entertainment and its group companies.",
  "/services",
);

export default function ServicesPage() {
  return (
    <PagePlaceholder
      title="Services"
      description="Developers should build the service listing components here."
    />
  );
}
