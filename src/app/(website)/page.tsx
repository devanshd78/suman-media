import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  faqPageJsonLd,
  organizationJsonLd,
  serializeJsonLd,
  websiteJsonLd,
} from "@/lib/seo/structured-data";
import { getHomePage, getSiteSettings } from "@/sanity/lib/data";

/*
 * The homepage is editorial content, so ISR is the right default:
 * - fast, cacheable HTML for visitors and crawlers
 * - a one-hour safety refresh
 * - Sanity webhook revalidation publishes edits immediately
 */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [home, settings] = await Promise.all([getHomePage(true), getSiteSettings()]);
  const seo = home?.seo;

  const title =
    seo?.title?.trim() ||
    settings?.defaultMetaTitle?.trim() ||
    settings?.brandName?.trim() ||
    siteConfig.name;
  const description =
    seo?.description?.trim() ||
    settings?.defaultMetaDescription?.trim() ||
    settings?.description?.trim() ||
    siteConfig.description;

  const metadata = createPageMetadata(title, description, "/", {
    canonical: seo?.canonicalUrl,
    image: seo?.socialImageUrl || settings?.defaultSocialImageUrl,
    imageAlt: seo?.socialImageAlt || settings?.defaultSocialImageAlt,
    noIndex: Boolean(seo?.noIndex) || !siteConfig.allowIndexing,
  });

  // The homepage title is already the complete SERP title; do not append
  // the root layout's title template a second time.
  metadata.title = { absolute: title };

  return metadata;
}

export default async function HomePage() {
  const [home, cleanHome, settings] = await Promise.all([
    getHomePage(false),
    getHomePage(true),
    getSiteSettings(),
  ]);
  const faqs =
    cleanHome?.faqSection?.items?.filter(
      (item) => Boolean(item?.question?.trim() && item?.answer?.trim()),
    ) ?? [];

  const structuredData = [
    organizationJsonLd({
      name: settings?.brandName,
      legalName: settings?.legalName,
      logo: settings?.logoUrl,
      email: settings?.email,
      phone: settings?.phone,
      sameAs: settings?.socialLinks?.map((item) => item.url).filter(Boolean),
    }),
    websiteJsonLd({ name: settings?.brandName }),
    ...(faqs.length > 0 ? [faqPageJsonLd(faqs)] : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(structuredData),
        }}
      />
      <LandingPage home={home} />
    </>
  );
}
