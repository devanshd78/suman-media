import type { CmsHomePage } from "@/types/cms";

import { AboutSection } from "./about-section";
import { AchievementRevealGrid } from "./achievement-reveal-grid";
import { CareersCtaSection } from "./careers-cta-section";
import { ClientsSection } from "./client-section";
import { FaqSection } from "./faq-section";
import { FilmSection } from "./film-section";
import { FounderLetterSection } from "./founder-letter-section";
import { HeroSection } from "./hero-section";
import { IndustriesSection } from "./industries-section";
import { InsightsSection } from "./insights-section";
import { LandingSectionObserver } from "./landing-section-observer";
import { MediaCoverageSection } from "./media-coverage-section";
import { PartnerSection } from "./partner-section";
import { ServicesSection } from "./services-section";
import { StatsSection } from "./stats-section";
import { TestimonialSection } from "./testimonial-section";

type LandingPageProps = {
  home: CmsHomePage | null;
};

export function LandingPage({
  home,
}: LandingPageProps) {
  return (
    <main
      className="
        relative
        mx-auto
        w-full
        max-w-full
        overflow-x-clip
        bg-black
      "
    >
      <LandingSectionObserver />

      <HeroSection
        slides={home?.heroSlides ?? []}
      />

      <AboutSection
        eyebrow={home?.aboutEyebrow}
        heading={home?.aboutHeading}
        description={home?.aboutDescription}
        cta={home?.aboutCta}
      />

      <ClientsSection />

      <ServicesSection
        eyebrow={home?.servicesEyebrow}
        heading={home?.servicesHeading}
        services={
          home?.featuredServices ?? []
        }
      />

      <AchievementRevealGrid
        content={home?.achievement}
      />

      <IndustriesSection
        eyebrow={home?.industriesEyebrow}
        heading={home?.industriesHeading}
        description={
          home?.industriesDescription
        }
        cta={home?.industriesCta}
        industries={
          home?.featuredIndustries ?? []
        }
      />

      {/* Thin animated statistics strip */}
      <StatsSection
        stats={home?.stats ?? []}
      />

      {/* Why Partner With us? + Cannes */}
      <PartnerSection
        content={home?.partnerSection}
      />

      <FilmSection />

      <TestimonialSection
        testimonial={
          home?.testimonialSection
        }
        story={home?.storyBanner}
      />

      <MediaCoverageSection
        content={home?.mediaCoverage}
      />

      <FounderLetterSection
        content={home?.founderLetter}
      />

      <InsightsSection
        eyebrow={home?.insightsEyebrow}
        heading={home?.insightsHeading}
        cta={home?.insightsCta}
        posts={
          home?.featuredInsights ?? []
        }
      />

      <FaqSection
        content={home?.faqSection}
      />

      <CareersCtaSection
        content={home?.careersCta}
      />
    </main>
  );
}
