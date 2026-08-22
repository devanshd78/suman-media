import { getHomeHeroSlides } from "@/sanity/lib/data";
import { HeroSection } from "./hero-section";
import { AboutSection } from "./about-section";
import { ClientsSection } from "./client-section";
import { ServicesSection } from "./services-section";
import { AchievementRevealGrid } from "./achievement-reveal-grid";
import { IndustriesSection } from "./industries-section";
import { StatsSection } from "./stats-section";
import { PartnerSection } from "./partner-section";

export async function LandingPage() {
    const heroSlides = await getHomeHeroSlides();

    return (
        <main className="relative mx-auto w-full max-w-[90rem] overflow-x-hidden bg-black">
            <HeroSection slides={heroSlides} />
            <AboutSection />
            <ClientsSection />
            <ServicesSection />
            <AchievementRevealGrid />
            <IndustriesSection />
            <StatsSection />
            <PartnerSection />
        </main>
    );
}
