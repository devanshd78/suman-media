import { localizeMetadata } from "@/i18n/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import React from "react";

export default function DigitalMediaNetworksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export async function generateMetadata() {
  return localizeMetadata(
    createPageMetadata(
      "Digital Media Networks",
      "Building Digital Channels, Audiences & Content Networks.",
      "/services/digital-media-networks"
    )
  );
}
