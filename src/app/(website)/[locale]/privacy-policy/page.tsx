import { LegalPage } from "@/components/legal/legal-page";
import { localizeMetadata } from "@/i18n/server";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() { return localizeMetadata(createPageMetadata("Privacy Policy", "How information is handled on the Suman Entertainment & Media website.", "/privacy-policy")); }
export default function Page() { return <LegalPage kind="privacy" />; }
