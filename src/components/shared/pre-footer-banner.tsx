"use client";

import { useId } from "react";
import Link from "next/link";
import Image from "@/components/ui/image";
import { LocalizedContent } from "@/components/localization/localized-content";
import { TextReveal } from "@/components/motion/text-reveal";
import { plusJakartaSans } from "@/lib/fonts";
import styles from "./pre-footer-banner.module.css";

/** 1: careers, 2: branded partnership, 3: partnership, 4: licensing,
 * 5: institutional communications, 6: content monetization. */
export type PreFooterBannerType = 1 | 2 | 3 | 4 | 5 | 6;

type BannerContent = {
  heading: string;
  imageUrl: string;
  cta: { label: string; href: string };
  eyebrow?: string;
  description?: string;
  imageAlt?: string;
  badgeUrl?: string;
  badgeAlt?: string;
};

const partnerHeading = "Have a story worth telling? Let's bring it to the world.";
const partnerCta = { label: "Join as a Partner", href: "/contact/form?type=partnership" };
const variants: Record<PreFooterBannerType, BannerContent> = {
  1: {
    heading: "Join us to start a New Chapter in Media and Entertainment",
    imageUrl: "/images/about/join-banner.webp",
    cta: { label: "View Open Roles", href: "/careers" },
  },
  2: {
    heading: partnerHeading,
    imageUrl: "/images/join-as-partner-background.png",
    cta: partnerCta,
    badgeUrl: "/images/abhijat-logo.png",
    badgeAlt: "Abhijat Marathi logo",
  },
  3: {
    heading: partnerHeading,
    imageUrl: "/images/join-as-partner-background.png",
    cta: partnerCta,
  },
  4: {
    heading: "Looking for Content or\nLicensing Opportunities?",
    imageUrl: "/images/brand-solutions-and-content-library/library-contact.jpg",
    cta: { label: "Contact us", href: "/contact/form" },
  },
  5: {
    heading: "Have a Market\nStory to Communicate?",
    imageUrl: "/images/brand-solutions-and-content-library/library-contact.jpg",
    cta: { label: "Contact us", href: "/contact/form" },
  },
  6: {
    heading: "Have Content?\nLet's Find Its Revenue Model.",
    imageUrl: "/images/monetization/monetization-gallery-12.jpg",
    cta: { label: "Contact us", href: "/contact" },
  },
};

export function PreFooterBanner({ type, content, imagePosition = "center", id }: {
  type: PreFooterBannerType;
  content?: Partial<BannerContent>;
  imagePosition?: string;
  id?: string;
}) {
  const headingId = useId();
  const banner = { ...variants[type], ...content };
  return <LocalizedContent><section id={id} aria-labelledby={headingId}
    data-pre-footer-type={type}
    className={`${styles.banner} ${plusJakartaSans.className} landing-section-transition`}>
    <div className={styles.media} data-landing-parallax-layer="media">
      <Image src={banner.imageUrl} alt={banner.imageAlt || ""} fill sizes="100vw"
        className={styles.image} style={{ objectPosition: imagePosition }} />
    </div>
    <div className={styles.shade} aria-hidden="true" />
    <div className={`${styles.content} site-gutter`}>
      <div className={styles.copy}>
        {banner.eyebrow ? <p className={styles.eyebrow}>{banner.eyebrow}</p> : null}
        <TextReveal as="h2" id={headingId} text={banner.heading} className={styles.heading} split="words" effect="rise" once />
        {banner.description ? <p className={styles.description}>{banner.description}</p> : null}
        <Link href={banner.cta.href} className={styles.action}>
          <span>{banner.cta.label}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
      {banner.badgeUrl ? <Image src={banner.badgeUrl} alt={banner.badgeAlt || ""} width={96} height={80} className={styles.badge} /> : null}
    </div>
  </section></LocalizedContent>;
}
