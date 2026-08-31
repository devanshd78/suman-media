import type { CmsHomePage } from "@/types/cms";

import { ParallaxBlackSection } from "@/components/motion/parallax-black-section";

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
import { LandingTextReveal } from "./landing-text-reveal";
import { MediaCoverageSection } from "./media-coverage-section";
import { PartnerSection } from "./partner-section";
import { ServicesSection } from "./services-section";
import { StatsSection } from "./stats-section";
import { TestimonialSection } from "./testimonial-section";

/* ============================================================
   TYPES
   ============================================================ */

type LandingPageProps = {
  home: CmsHomePage | null;
};

/* ============================================================
   LANDING PAGE
   ============================================================ */

export function LandingPage({
  home,
}: LandingPageProps) {
  return (
    <main
      data-landing-page
      className="
        relative
        mx-auto
        w-full
        max-w-full
        overflow-x-clip
        bg-black
      "
    >
      {/* =====================================================
          GLOBAL LANDING TEXT REVEAL
          ===================================================== */}

      <LandingTextReveal />

      {/* =====================================================
          HERO
          DARK → DARK
          No white-to-black transition needed.
          ===================================================== */}

      <HeroSection
        slides={home?.heroSlides ?? []}
      />

      {/* =====================================================
          ABOUT
          DARK
          ===================================================== */}

      <AboutSection
        eyebrow={home?.aboutEyebrow}
        heading={home?.aboutHeading}
        description={home?.aboutDescription}
        cta={home?.aboutCta}
      />

      {/* =====================================================
          CLIENTS
          WHITE
          ===================================================== */}

      <ClientsSection />

      {/* =====================================================
          WHITE → BLACK

          Clients
              ↓
          Services

          Apply premium parallax transition here.
          ===================================================== */}

      <ParallaxBlackSection>
        <ServicesSection
          eyebrow={home?.servicesEyebrow}
          heading={home?.servicesHeading}
          services={
            home?.featuredServices ?? []
          }
        />
      </ParallaxBlackSection>

      {/* =====================================================
          ACHIEVEMENT
          WARM / #FFEABF
          ===================================================== */}

      <AchievementRevealGrid
        content={home?.achievement}
      />

      {/* =====================================================
          INDUSTRIES
          WHITE
          ===================================================== */}

      <IndustriesSection
        eyebrow={home?.industriesEyebrow}
        heading={home?.industriesHeading}
        description={
          home?.industriesDescription
        }
        cta={home?.industriesCta}
      />

      {/* =====================================================
          PARTNER
          WARM / #FFEABF

          No white → black transition.
          ===================================================== */}

      <PartnerSection
        content={home?.partnerSection}
      />

      {/* =====================================================
          STATS
          WARM / #FFEABF
          ===================================================== */}

      <StatsSection
        stats={home?.stats ?? []}
      />

      {/* =====================================================
          FILM / CANNES
          DARK

          Previous section is #FFEABF rather than white,
          so leave this transition untouched.
          ===================================================== */}

      <FilmSection />

      {/* =====================================================
          TESTIMONIAL + STORY

          TestimonialSection controls its own internal
          white / dark composition.
          ===================================================== */}

      <TestimonialSection
        testimonial={
          home?.testimonialSection
        }
        story={home?.storyBanner}
      />

      {/* =====================================================
          MEDIA COVERAGE
          WHITE
          ===================================================== */}

      <MediaCoverageSection
        content={home?.mediaCoverage}
      />

      {/* =====================================================
          WHITE → BLACK

          Media Coverage
                ↓
          Founder Letter

          Apply parallax transition.
          ===================================================== */}

      <ParallaxBlackSection>
        <FounderLetterSection
          content={home?.founderLetter}
        />
      </ParallaxBlackSection>

      {/* =====================================================
          INSIGHTS
          WHITE
          ===================================================== */}

      <InsightsSection
        eyebrow={home?.insightsEyebrow}
        heading={home?.insightsHeading}
        cta={home?.insightsCta}
        posts={
          home?.featuredInsights ?? []
        }
      />

      {/* =====================================================
          FAQ
          WHITE
          ===================================================== */}

      <FaqSection
        content={home?.faqSection}
      />

      {/* =====================================================
          WHITE → BLACK

          FAQ
           ↓
          Careers

          Apply parallax transition.
          ===================================================== */}

      <ParallaxBlackSection>
        <CareersCtaSection
          content={home?.careersCta}
        />
      </ParallaxBlackSection>
    </main>
  );
}