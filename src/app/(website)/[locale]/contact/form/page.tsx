import { localizeMetadata } from "@/i18n/server";

import { LocalizedContent } from "@/components/localization/localized-server-content";
import ContactFormPage, {
  type ContactFormMode,
} from "@/components/contact-us/contact-form/contact-form";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getContactPageContent } from "@/sanity/lib/data";

export async function generateMetadata() { return localizeMetadata(createPageMetadata(
  "Start a Conversation",
  "Contact Suman Media & Entertainment about services, investment and partnership opportunities.",
  "/contact/form",
)); }

type ContactFormRouteProps = {
  searchParams: Promise<{
    type?: string | string[];
  }>;
};

function firstQueryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function contactFormMode(value: string | undefined): ContactFormMode {
  if (value === "partnership" || value === "partner") return "partnership";
  if (value === "investor") return "investor";
  return "general";
}

export default async function ContactFormRoute({
  searchParams,
}: ContactFormRouteProps) {
  const query = await searchParams;
  const mode = contactFormMode(firstQueryValue(query.type));
  const content = await getContactPageContent();

  return <LocalizedContent>{(
    <ContactFormPage
      mode={mode}
      email={content?.contactDetails?.email}
      phone={content?.contactDetails?.phone}
      generalCategories={content?.form?.generalCategories}
      partnerCategories={content?.form?.partnerCategories}
    />
  )}</LocalizedContent>;
}
