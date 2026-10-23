import { localizeMetadata } from "@/i18n/server";

import { LocalizedContent } from "@/components/localization/localized-server-content";
import { ContactPageContent } from "@/components/contact-us/contact-page";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getContactPageContent } from "@/sanity/lib/data";

export async function generateMetadata() { return localizeMetadata(createPageMetadata(
  "Contact Us",
  "Contact Suman Media & Entertainment for business and general enquiries.",
  "/contact",
)); }

export default async function ContactPage() {
  const content = await getContactPageContent();

  return <LocalizedContent>{<ContactPageContent content={content} />}</LocalizedContent>;
}
