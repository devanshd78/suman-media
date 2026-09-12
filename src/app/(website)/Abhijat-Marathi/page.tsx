import OttHeader from "@/components/Abhijat-Marathi/ott-header";
import Entertainment from "@/components/Abhijat-Marathi/entertainment";
import Section3 from "@/components/Abhijat-Marathi/section3";
import Ecosystem from "@/components/Abhijat-Marathi/ecosystem";
import { NewsBlogsSection } from "@/components/landing/news-blogs-section";

export default function OttPage() {
  return (
    <main>
      <OttHeader />
      <Entertainment />
      <Section3 />
      <Ecosystem />
      <NewsBlogsSection />
    </main>
  );
}
