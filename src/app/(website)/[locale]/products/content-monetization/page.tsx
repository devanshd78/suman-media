
import { PreFooterBanner } from "@/components/shared/pre-footer-banner";
import { LocalizedContent } from "@/components/localization/localized-server-content";
import MonetizationHeroSection from "@/components/products/content-monetization/monetization-hero-section";
import RevenueModelsSection from "@/components/products/content-monetization/revenue-models-section";
import ContentCapabilitiesSection from "@/components/products/content-monetization/content-capabilities-section";
import { NewsBlogsSection } from "@/components/landing/news-blogs-section";

export default function MonetisationPage() {
  return <LocalizedContent>{(
    <>
      <MonetizationHeroSection />
      <RevenueModelsSection />
      <ContentCapabilitiesSection />
      <NewsBlogsSection revealText />
      <PreFooterBanner type={6} />
    </>
  )}</LocalizedContent>;
}
