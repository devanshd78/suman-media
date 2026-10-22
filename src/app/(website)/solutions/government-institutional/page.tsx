import { GovernmentPage } from "@/components/government-institutional/page";
import { createPageMetadata } from "@/lib/seo/metadata";
export const metadata = createPageMetadata(
  "Government, PSU & Institutional Services",
  "Strategic communication, public awareness campaigns, tourism and heritage promotion, cultural documentation and institutional events.",
  "/solutions/government-institutional",
);
export default function Page() { return <GovernmentPage />; }
