
import { LocalizedContent } from "@/components/localization/localized-server-content";
import StreamingHeroSection from "@/components/products/ott-digital-streaming/streaming-hero-section";
import EntertainmentSection from "@/components/products/ott-digital-streaming/entertainment-section";
import StreamingContentSections from "@/components/products/ott-digital-streaming/streaming-content-sections";
import StreamingEcosystemSection from "@/components/products/ott-digital-streaming/streaming-ecosystem-section";
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
