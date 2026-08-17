import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata(
  "Insights",
  "Read news, updates and insights from Suman Media & Entertainment.",
  "/insights",
);

export default function InsightsPage() {
  return (
    <PagePlaceholder
      title="Insights"
      description="Developers should build the article listing and filters here."
    />
  );
}
