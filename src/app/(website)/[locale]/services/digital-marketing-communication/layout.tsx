import { localizeMetadata } from "@/i18n/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import React from "react";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--Font-family-Heading",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--Font-family-Body",
});

export default function DigitalMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${plusJakartaSans.variable} ${inter.variable}`}>
      {children}
    </div>
  );
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

