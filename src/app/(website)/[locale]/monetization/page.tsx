
import { LocalizedContent } from "@/components/localization/localized-server-content";
import MonetizationHeroSection from "@/components/monetization/monetization-hero-section";
import RevenueModelsSection from "@/components/monetization/revenue-models-section";
import ContentCapabilitiesSection from "@/components/monetization/content-capabilities-section";
import { NewsBlogsSection } from "@/components/landing/news-blogs-section";

export default function MonetisationPage() {
  return <LocalizedContent>{(
    <>
      <MonetizationHeroSection />
      <RevenueModelsSection />
      <ContentCapabilitiesSection />
      <NewsBlogsSection revealText />
    </>
  )}</LocalizedContent>;
}
