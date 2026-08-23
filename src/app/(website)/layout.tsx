import type { ReactNode } from "react";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import { SanityLive } from "@/sanity/lib/live";

export default async function WebsiteLayout({ children }: { children: ReactNode }) {
  const { isEnabled } = await draftMode();

  return (
    <SmoothScrollProvider>
      <Header />
      {children}
      <Footer />
      <SanityLive />
      {isEnabled ? <VisualEditing /> : null}
    </SmoothScrollProvider>
  );
}
