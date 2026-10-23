import { localizeMetadata } from "@/i18n/server";

import { LocalizedContent } from "@/components/localization/localized-server-content";
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() { return localizeMetadata(createPageMetadata(
  "Portfolio",
  "Explore selected work and projects from Suman Media & Entertainment.",
  "/portfolio",
)); }

export default function PortfolioPage() {
  return <LocalizedContent>{(
    <PagePlaceholder
      title="Portfolio"
      description="Developers should build the portfolio and project components here."
    />
  )}</LocalizedContent>;
}
