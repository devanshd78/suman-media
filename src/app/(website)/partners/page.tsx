import { PartnerPageContent } from "@/components/partners/partner-page";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, serializeJsonLd } from "@/lib/seo/structured-data";

const title = "Become a Partner";
const description =
  "Partner with Suman Media & Entertainment across films, music, OTT, content, distribution, technology and strategic media opportunities.";

export const metadata = createPageMetadata(title, description, "/partners", {
  image: "/images/careers/slideimg4.jpg",
  imageAlt: "Film production team at work",
});

export default function PartnersPage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${title} | ${siteConfig.name}`,
    description,
    url: new URL("/partners", siteConfig.url).toString(),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Become a Partner", path: "/partners" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([webPageJsonLd, breadcrumbs]),
        }}
      />
      <PartnerPageContent />
    </>
  );
}
