import { AboutPageContent } from "@/components/about/about-page";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getHomePage } from "@/sanity/lib/data";

export const metadata = createPageMetadata(
  "About Us",
  "Suman Entertainment & Media is building an integrated ecosystem across entertainment, content, digital platforms, technology and communications.",
  "/about",
  {
    image: "/images/about/hero-office.webp",
    imageAlt: "Suman Entertainment office interior",
  },
);

export default async function AboutPage() {
  const home = await getHomePage();

  return <AboutPageContent home={home} />;
}
