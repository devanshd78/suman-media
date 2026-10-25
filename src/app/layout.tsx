import { localizeMetadata } from "@/i18n/server";
import { TranslationProvider } from "@/components/localization/localized-content";
import { getLocale } from "next-intl/server";
import type { Metadata, Viewport } from "next";

import { siteConfig } from "@/config/site";
import { inter, plusJakartaSans, notoSansDevanagari } from "@/lib/fonts";

import { PageTransitionLoader } from "@/components/states/page-transition-loader";
import "./globals.css";

const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  robots: siteConfig.allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await localizeMetadata(baseMetadata);
  delete metadata.alternates;
  return metadata;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={`${plusJakartaSans.variable} ${inter.variable} ${notoSansDevanagari.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-zinc-950">
        <TranslationProvider locale={locale}><PageTransitionLoader />{children}</TranslationProvider>
      </body>
    </html>
  );
}
