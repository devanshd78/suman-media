import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata(
  "Portfolio",
  "Explore selected work and projects from Suman Media & Entertainment.",
  "/portfolio",
);

export default function PortfolioPage() {
  return (
    <PagePlaceholder
      title="Portfolio"
      description="Developers should build the portfolio and project components here."
    />
  );
}
