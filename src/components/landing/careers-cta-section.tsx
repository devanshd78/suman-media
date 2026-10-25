"use client";

import { PreFooterBanner } from "@/components/shared/pre-footer-banner";
import type { CmsCareersCta } from "@/types/cms";

export function CareersCtaSection({ content, imagePosition = "center" }: {
  content?: CmsCareersCta | null;
  imagePosition?: string;
}) {
  if (!content?.heading?.trim()) return null;
  return <PreFooterBanner type={1} id="careers" imagePosition={imagePosition} content={{
    heading: content.heading,
    eyebrow: content.eyebrow?.trim() || "CAREERS",
    description: content.description?.trim() || "",
    imageUrl: content.imageUrl || "/images/about/join-banner.webp",
    imageAlt: content.imageAlt || "",
    cta: content.cta?.label && content.cta.href ? content.cta : { label: "View Open Roles", href: "/careers" },
  }} />;
}
