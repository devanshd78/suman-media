import type { ReactNode } from "react";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import { SanityLive } from "@/sanity/lib/live";
import { getSiteSettings } from "@/sanity/lib/data";

export default async function WebsiteLayout({ children }: { children: ReactNode }) {
  const [{ isEnabled }, settings] = await Promise.all([
    draftMode(),
    getSiteSettings(),
  ]);

  return (
    <SmoothScrollProvider>
      <Header />
      {children}
      <Footer settings={settings} />
      <SanityLive />
      {isEnabled ? <VisualEditing /> : null}
    </SmoothScrollProvider>
  );
}
