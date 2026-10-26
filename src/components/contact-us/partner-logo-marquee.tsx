"use client";

import { LocalizedContent } from "@/components/localization/localized-content";
import Image from "@/components/ui/image";
import styles from "./contact-page.module.css";

const PARTNER_LOGOS = [
  { name: "Laminar", src: "/images/landing/partners/laminar-logo.svg", width: 190 },
  { name: "AWS", src: "/images/landing/partners/amazon-web-services-logo.svg", width: 112 },
  { name: "Abhijat Marathi", src: "/images/abhijat-logo.png", width: 130 },
  { name: "Zee Marathi", src: "/images/landing/partners/zee-marathi-logo.svg", width: 125 },
  { name: "Festival de Cannes", src: "/images/landing/partners/festival-de-cannes-logo.svg", width: 168 },
  { name: "Government of Maharashtra", src: "/images/landing/partners/government-of-maharashtra-logo.svg", width: 92 },
] as const;

function PartnerLogoRow({ duplicate = false }: { duplicate?: boolean }) {
  return <LocalizedContent>{(
    <div
      className={styles.logoRow}
      aria-hidden={duplicate ? "true" : undefined}
    >
      {PARTNER_LOGOS.map((logo) => (
        <div
          key={logo.name}
          className="relative h-[3.5625rem] shrink-0"
          style={{ width: `${logo.width}px` }}
        >
          <Image
            src={logo.src}
            alt={duplicate ? "" : logo.name}
            fill
            sizes={`${logo.width}px`}
            className="pointer-events-none select-none object-contain"
            style={logo.src.endsWith(".svg") ? { filter: "brightness(0.3)" } : undefined}
          />
        </div>
      ))}
    </div>
  )}</LocalizedContent>;
}

export function PartnerLogoMarquee() {
  return <LocalizedContent>{(
    <div className={`${styles.marquee} h-[6.25rem] w-full`}>
      <div className={styles.marqueeTrack}>
        <PartnerLogoRow />
        <PartnerLogoRow duplicate />
      </div>
    </div>
  )}</LocalizedContent>;
}
