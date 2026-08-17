import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata(
  "Our Companies",
  "Explore the companies operating under Suman Media & Entertainment.",
  "/companies",
);

export default function CompaniesPage() {
  return (
    <PagePlaceholder
      title="Our Companies"
      description="Developers should build the subsidiary listing components here."
    />
  );
}
