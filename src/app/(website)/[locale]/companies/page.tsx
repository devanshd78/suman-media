import { localizeMetadata } from "@/i18n/server";

import { LocalizedContent } from "@/components/localization/localized-server-content";
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() { return localizeMetadata(createPageMetadata(
  "Our Companies",
  "Explore the companies operating under Suman Media & Entertainment.",
  "/companies",
)); }

export default function CompaniesPage() {
  return <LocalizedContent>{(
    <PagePlaceholder
      title="Our Companies"
      description="Developers should build the subsidiary listing components here."
    />
  )}</LocalizedContent>;
}
