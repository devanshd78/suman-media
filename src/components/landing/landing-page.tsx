import { Header } from "./header";
import { HeroSection } from "./hero-section";
import { AboutSection } from "./about-section";
import { ClientsSection } from "./client-section";
import { ServicesSection } from "./services-section";
import { AchievementRevealGrid } from "./achievement-reveal-grid";
import { IndustriesSection } from "./industries-section";
import { StatsSection } from "./stats-section";
import { PartnerSection } from "./partner-section";

export function LandingPage() {
    return (
        <main className="relative mx-auto w-full max-w-[90rem] overflow-x-hidden bg-black">
            <Header />
            <HeroSection />
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