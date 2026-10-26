import { SiteTextReveal } from "@/components/motion/site-text-reveal";
import { AppDownloadPanel } from "@/components/app-download/app-download-panel";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { TranslationProvider } from "@/components/localization/localized-content";
import { getEditorialTranslations } from "@/i18n/server";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import { SanityLive } from "@/sanity/lib/live";
import { getSiteSettings } from "@/sanity/lib/data";

export default async function WebsiteLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "mr") notFound();
  setRequestLocale(locale);
  const translations = locale === "mr" ? await getEditorialTranslations() : {};
  const [{ isEnabled }, settings] = await Promise.all([
    draftMode(),
    getSiteSettings(),
  ]);

  return (
    <TranslationProvider locale={locale} translations={translations}>
    <SmoothScrollProvider>
      <Header />
      <div data-website-content style={{ display: "contents" }}><SiteTextReveal />{children}</div>
      <Footer settings={settings} />
      <AppDownloadPanel />
      <SanityLive />
      {isEnabled ? <VisualEditing /> : null}
    </SmoothScrollProvider>
    </TranslationProvider>
  );
}
