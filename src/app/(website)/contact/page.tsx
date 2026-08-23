import { ContactPageContent } from "@/components/contactus/caotact-page";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getContactPageContent } from "@/sanity/lib/data";

export const metadata = createPageMetadata(
  "Contact Us",
  "Contact Suman Media & Entertainment for business and general enquiries.",
  "/contact",
);

export default async function ContactPage() {
  const content = await getContactPageContent();

  return <ContactPageContent content={content} />;
}
