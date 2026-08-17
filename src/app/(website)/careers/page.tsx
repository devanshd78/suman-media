import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata(
  "Careers",
  "Explore career opportunities with Suman Media & Entertainment.",
  "/careers",
);

export default function CareersPage() {
  return (
    <PagePlaceholder
      title="Careers"
      description="Developers should build vacancies and the application form here."
    />
  );
}
