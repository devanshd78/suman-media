
import { LocalizedContent } from "@/components/localization/localized-server-content";
import StreamingHeroSection from "@/components/abhijat-marathi/streaming-hero-section";
import EntertainmentSection from "@/components/abhijat-marathi/entertainment-section";
import StreamingContentSections from "@/components/abhijat-marathi/streaming-content-sections";
import StreamingEcosystemSection from "@/components/abhijat-marathi/streaming-ecosystem-section";
import { NewsBlogsSection } from "@/components/landing/news-blogs-section";

export default function AbhijatMarathiPage() {
  return <LocalizedContent>{(
    <main>
      <StreamingHeroSection />
      <EntertainmentSection />
      <StreamingContentSections />
      <StreamingEcosystemSection />
      <NewsBlogsSection revealText />
    </main>
  )}</LocalizedContent>;
}
