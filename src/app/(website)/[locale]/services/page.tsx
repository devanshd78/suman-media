import { localizeMetadata } from "@/i18n/server";

import { LocalizedContent } from "@/components/localization/localized-server-content";
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() { return localizeMetadata(createPageMetadata(
  "Services",
  "Explore services offered by Suman Media & Entertainment and its group companies.",
  "/services",
)); }

export default function ServicesPage() {
  return <LocalizedContent>{(
    <PagePlaceholder
      title="Services"
      description="Developers should build the service listing components here."
    />
  )}</LocalizedContent>;
}
