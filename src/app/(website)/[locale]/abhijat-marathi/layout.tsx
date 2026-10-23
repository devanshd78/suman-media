import type { ReactNode } from "react";
import { localizeMetadata } from "@/i18n/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export async function generateMetadata() {
  return localizeMetadata(createPageMetadata("Abhijat Marathi OTT", siteConfig.description, "/abhijat-marathi"));
}

export default function PageLayout({ children }: { children: ReactNode }) {
  return children;
}
