import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata(
  "Contact Us",
  "Contact Suman Media & Entertainment for business and general enquiries.",
  "/contact",
);

export default function ContactPage() {
  return (
    <PagePlaceholder
      title="Contact Us"
      description="Developers should build the contact form using POST /api/contact."
    />
  );
}
