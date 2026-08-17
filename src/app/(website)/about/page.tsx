import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata(
  "About Us",
  "Learn about Suman Media & Entertainment and its group companies.",
  "/about",
);

export default function AboutPage() {
  return (
    <PagePlaceholder
      title="About Us"
      description="Developers should build the company overview and group story components here."
    />
  );
}
