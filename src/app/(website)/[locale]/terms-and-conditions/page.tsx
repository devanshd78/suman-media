import { LegalPage } from "@/components/legal/legal-page";
import { localizeMetadata } from "@/i18n/server";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() { return localizeMetadata(createPageMetadata("Terms & Conditions", "Website terms for Suman Entertainment & Media.", "/terms-and-conditions")); }
export default function Page() { return <LegalPage kind="terms" />; }
