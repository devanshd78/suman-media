import OttHeader from "@/components/abhijat-marathi/ott-header";
import Entertainment from "@/components/abhijat-marathi/entertainment";
import Section3 from "@/components/abhijat-marathi/section3";
import Ecosystem from "@/components/abhijat-marathi/ecosystem";
import { NewsBlogsSection } from "@/components/landing/news-blogs-section";

export default function OttPage() {
  return (
    <main>
      <OttHeader />
      <Entertainment />
      <Section3 />
      <Ecosystem />
      <NewsBlogsSection revealText />
    </main>
  );
}
