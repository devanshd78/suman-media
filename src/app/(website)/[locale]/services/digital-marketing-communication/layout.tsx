import { localizeMetadata } from "@/i18n/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import React from "react";

export default function DigitalMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export async function generateMetadata() {
  return localizeMetadata(
    createPageMetadata(
      "Digital Marketing & Communications",
      "From social media and content marketing to performance campaigns and strategic communications, we help organisations communicate clearly and connect with their audiences across digital platforms.",
      "/services/digital-marketing-communication"
    )
  );
}
