import {
  Inter,
  Noto_Sans_Devanagari,
  Plus_Jakarta_Sans,
} from "next/font/google";

/**
 * Shared font instances.
 *
 * Keeping one Next.js font instance per family avoids generating duplicate
 * @font-face declarations and repeated font assets when the same family is
 * used across many route and landing-page components.
 */
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["700", "800"],
  display: "swap",
});
