import { localizeMetadata } from "@/i18n/server";

import { LocalizedContent } from "@/components/localization/localized-server-content";
import { GovernmentPage } from "@/components/solutions/government-institutional/government-institutional-page";
import { createPageMetadata } from "@/lib/seo/metadata";
export async function generateMetadata() { return localizeMetadata(createPageMetadata(
  "Government, PSU & Institutional Services",
  "Strategic communication, public awareness campaigns, tourism and heritage promotion, cultural documentation and institutional events.",
  "/solutions/government-institutional",
)); }
export default function Page() { return <LocalizedContent>{<GovernmentPage />}</LocalizedContent>; }
