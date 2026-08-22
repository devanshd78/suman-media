import { getHomeHeroSlides } from "@/sanity/lib/data";
import { Header } from "./header";
import { HeroSection } from "./hero-section";
import { AboutSection } from "./about-section";
import { CompaniesSection } from "./companies-section";
import { ClientsSection } from "./client-section";
import { ProjectsSection } from "./projects-section";
import { InsightsSection } from "./insights-section";
import { ServicesSection } from "./services-section";
import { AchievementRevealGrid } from "./achievement-reveal-grid";
import { IndustriesSection } from "./industries-section";
import { StatsSection } from "./stats-section";
import { PartnerSection } from "./partner-section";
import { Footer } from "./footer";

export async function LandingPage() {
    const heroSlides = await getHomeHeroSlides();

    // overflow-x-clip (not -hidden): hidden would make <main> a scroll
    // container and break position:sticky inside the services gallery.
    // Full-width shell: section backgrounds bleed edge-to-edge while each
    // section constrains its own content to max-w-[90rem].
    return (
        <>
        <main className="relative w-full overflow-x-clip bg-white">
            <Header />
            <HeroSection slides={heroSlides} />
            <AboutSection />
            <CompaniesSection />
            <ClientsSection />
            <ServicesSection />
            <AchievementRevealGrid />
            <ProjectsSection />
            <IndustriesSection />
            <StatsSection />
            <InsightsSection />
            <PartnerSection />
        </main>
        <Footer />
        </>
    );
}
