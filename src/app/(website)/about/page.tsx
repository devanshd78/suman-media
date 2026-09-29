import { AboutPageContent } from "@/components/about/about-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata(
  "About Us",
  "Suman Entertainment & Media is building an integrated ecosystem across entertainment, content, digital platforms, technology and communications.",
  "/about",
  {
    image: "/images/about/hero-office.webp",
    imageAlt: "Suman Entertainment office interior",
  },
);

export default function AboutPage() {
  return <AboutPageContent />;
}
