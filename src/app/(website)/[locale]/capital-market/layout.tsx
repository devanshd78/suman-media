import type { ReactNode } from "react";
import { localizeMetadata } from "@/i18n/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export async function generateMetadata() {
  return localizeMetadata(createPageMetadata("Capital Markets & Investor Communications", siteConfig.description, "/capital-market"));
}

export default function PageLayout({ children }: { children: ReactNode }) {
  return children;
}
