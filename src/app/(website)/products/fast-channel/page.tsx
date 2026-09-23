import { FastChannelPage } from "@/components/products/fast-channel/fast-channel-page";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, serializeJsonLd } from "@/lib/seo/structured-data";

const title = "FAST Channel";
const description =
  "Explore Suman Entertainment & Media's always-on channel ecosystem across movies, music, Marathi culture, devotion and entertainment for connected TV and digital audiences.";

export const metadata = createPageMetadata(
  title,
  description,
  "/products/fast-channel",
  {
    image: "/images/fast-channel/abhijat-marathi-ott.webp",
    imageAlt: "Abhijat Marathi OTT channel artwork",
  },
);

export default function FastChannelRoute() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${title} | ${siteConfig.name}`,
    description,
    url: new URL("/products/fast-channel", siteConfig.url).toString(),
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
    { name: "FAST Channel", path: "/products/fast-channel" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([webPageJsonLd, breadcrumbs]),
        }}
      />
      <FastChannelPage />
    </>
  );
}
