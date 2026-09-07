"use client";

import Link from "next/link";
import { plusJakartaSans } from "@/lib/fonts";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { CmsCta } from "@/types/cms";
import {
  EntertainmentArtwork, EnterprisesArtwork, BrandsArtwork, InvestorsArtwork,
  PublicSectorArtwork, CreatorsArtwork, GovernmentArtwork,
} from "./industry-artwork";
import styles from "./industries-section.module.css";

type IndustryItem = {
  key: string;
  number: string;
  title: string;
  slug: string;
  background: string;
  artwork: ReactNode;
};

type IndustriesSectionProps = {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cta?: CmsCta | null;
};

const SCROLL_SPRING = { stiffness: 120, damping: 30, mass: 0.55, restDelta: 0.001 } as const;

const INDUSTRIES: IndustryItem[] = [
  {
    key: "entertainment",
    number: "01",
    title: "Entertainment",
    slug: "entertainment",
    background:
      "radial-gradient(circle at 93% 7%, rgba(49,211,239,0.95) 0%, rgba(49,211,239,0) 41%), radial-gradient(circle at 1% 95%, rgba(255,183,67,0.98) 0%, rgba(255,183,67,0) 43%), linear-gradient(137deg,#877BDD 0%,#F58EBB 54%,#54CAE6 100%)",
    artwork: <EntertainmentArtwork />,
  },
  {
    key: "enterprises",
    number: "02",
    title: "Enterprises",
    slug: "enterprises",
    background:
      "radial-gradient(circle at 89% 92%, rgba(251,184,128,0.98) 0%, rgba(251,184,128,0) 45%), radial-gradient(circle at 2% 2%, rgba(108,105,208,0.72) 0%, rgba(108,105,208,0) 47%), linear-gradient(139deg,#7971C7 0%,#EC86C1 50%,#F7AE82 100%)",
    artwork: <EnterprisesArtwork />,
  },
  {
    key: "brands",
    number: "03",
    title: "Brands",
    slug: "brands",
    background:
      "radial-gradient(circle at 3% 96%, rgba(251,197,87,1) 0%, rgba(251,197,87,0) 42%), radial-gradient(circle at 98% 100%, rgba(124,151,239,0.9) 0%, rgba(124,151,239,0) 41%), linear-gradient(139deg,#FF476A 3%,#FF6C82 45%,#FDB14B 100%)",
    artwork: <BrandsArtwork />,
  },
  {
    key: "investors",
    number: "04",
    title: "Investors",
    slug: "investors",
    background:
      "radial-gradient(circle at 7% 96%, rgba(255,249,226,0.98) 0%, rgba(255,249,226,0) 40%), radial-gradient(circle at 97% 94%, rgba(64,162,246,0.9) 0%, rgba(64,162,246,0) 42%), linear-gradient(134deg,#171640 0%,#40345E 42%,#E88E7A 74%,#61B5F0 100%)",
    artwork: <InvestorsArtwork />,
  },
  {
    key: "public-sector",
    number: "05",
    title: "Public Sector",
    slug: "public-sector",
    background:
      "radial-gradient(circle at 2% 8%, rgba(255,110,64,0.98) 0%, rgba(255,110,64,0) 47%), radial-gradient(circle at 98% 90%, rgba(99,151,216,0.9) 0%, rgba(99,151,216,0) 47%), linear-gradient(125deg,#FF7952 0%,#E7A276 48%,#789FD1 100%)",
    artwork: <PublicSectorArtwork />,
  },
  {
    key: "creators",
    number: "06",
    title: "Creators",
    slug: "creators",
    background:
      "radial-gradient(circle at 4% 4%, rgba(226,244,247,0.96) 0%, rgba(226,244,247,0) 44%), radial-gradient(circle at 97% 98%, rgba(255,100,60,0.97) 0%, rgba(255,100,60,0) 43%), linear-gradient(135deg,#D9EFF3 0%,#E36ECE 48%,#FF6943 100%)",
    artwork: <CreatorsArtwork />,
  },
  {
    key: "government",
    number: "07",
    title: "Government",
    slug: "government",
    background:
      "radial-gradient(circle at 7% 90%, rgba(105,197,231,0.85) 0%, rgba(105,197,231,0) 41%), radial-gradient(circle at 93% 9%, rgba(224,164,215,0.92) 0%, rgba(224,164,215,0) 43%), linear-gradient(134deg,#84CBE6 0%,#DCBEE9 51%,#CA88D2 100%)",
    artwork: <GovernmentArtwork />,
  },
];

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="none"><path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function IndustryCard({ industry, onFocus }: { industry: IndustryItem; onFocus: (card: HTMLAnchorElement) => void }) {
  return (
    <Link href={`/services?industry=${encodeURIComponent(industry.slug)}`} data-industry-card className={styles.card} onFocus={(event) => onFocus(event.currentTarget)}>
      <div className={styles.visual} style={{ background: industry.background }}>
        <span className={styles.number}>{industry.number}</span>
        <div aria-hidden="true" className={styles.bloom} />
        <div aria-hidden="true" className={styles.noise} />
        <div aria-hidden="true" data-industry-artwork={industry.key} className={styles.artwork}>{industry.artwork}</div>
      </div>
      <h3 className={styles.cardTitle}>{industry.title}</h3>
    </Link>
  );
}

export function IndustriesSection({ eyebrow, heading, description, cta }: IndustriesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [geometry, setGeometry] = useState({ distance: 0, height: 0, header: 160, pinned: false });

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const header = headerRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !sticky || !header || !viewport || !track) return;
    const desktop = matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let disposed = false;
    const measure = () => {
      frame = 0;
      if (disposed) return;
      const distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      const height = Math.ceil(sticky.getBoundingClientRect().height);
      const headerHeight = Math.ceil(header.getBoundingClientRect().height);
      // Never pin content that is taller than the window (short landscape,
      // enlarged text, browser zoom). All cards remain reachable natively.
      const pinned = desktop.matches && !reduced.matches && distance > 1 && height <= innerHeight + 1;
      if (pinned && viewport.scrollLeft !== 0) viewport.scrollLeft = 0;
      setGeometry((previous) =>
        previous.distance === distance && previous.height === height &&
        previous.header === headerHeight && previous.pinned === pinned
          ? previous : { distance, height, header: headerHeight, pinned },
      );
    };
    const schedule = () => { if (!disposed && !frame) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    [sticky, header, viewport, track].forEach((element) => observer.observe(element));
    desktop.addEventListener("change", schedule);
    reduced.addEventListener("change", schedule);
    window.addEventListener("resize", schedule);
    document.fonts.ready.then(schedule);
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      desktop.removeEventListener("change", schedule);
      reduced.removeEventListener("change", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Relative target offsets stay correct when sections above change height.
  // Unlike a cached document offset, this does not go stale after CMS/image load.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, SCROLL_SPRING);
  const travelRatio = geometry.distance / Math.max(1, geometry.height + geometry.distance);
  const x = useTransform([scrollYProgress, smoothProgress], ([raw, smoothed]) => {
    if (!geometry.pinned || travelRatio <= 0) return 0;
    const actual = Number(raw) / travelRatio;
    // Match the sticky release exactly rather than springing past its end.
    if (actual <= 0) return 0;
    if (actual >= 1) return -geometry.distance;
    const progress = Math.max(0, Math.min(1, Number(smoothed) / travelRatio));
    return -geometry.distance * progress;
  });
  const pinned = geometry.pinned && !reducedMotion;
  const style = {
    "--industry-header-height": `${geometry.header}px`,
    height: pinned ? geometry.height + geometry.distance : undefined,
  } as CSSProperties;

  // Keyboard navigation must also reveal cards clipped by the pinned rail.
  const revealFocusedCard = (card: HTMLAnchorElement) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!viewport || !track || !section) return;
    const cardRect = card.getBoundingClientRect();
    const viewportRect = viewport.getBoundingClientRect();
    if (cardRect.left >= viewportRect.left && cardRect.right <= viewportRect.right) return;
    const gutter = Number.parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const distance = Math.max(0, Math.min(geometry.distance,
      cardRect.left - track.getBoundingClientRect().left - gutter));
    if (pinned) {
      const start = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: start + distance, behavior: "instant" });
    } else {
      viewport.scrollTo({ left: distance, behavior: "instant" });
    }
  };

  return (
    <section ref={sectionRef} id="industries" aria-labelledby="industries-heading"
      data-motion-managed data-pinned={pinned} className={`${plusJakartaSans.className} ${styles.section}`} style={style}>
      <div ref={stickyRef} className={styles.sticky}>
        <div ref={headerRef} className={styles.header}>
          <div>
            <p className={styles.eyebrow}>{eyebrow?.trim() || "Industries we work with"}</p>
            <h2 id="industries-heading" className={styles.heading}>{heading?.trim() || "The Industries we work with?"}</h2>
          </div>
          <div className={styles.introduction}>
            <p className={styles.description}>{description?.trim() || "From creating original content and building digital platforms to strategic communications and global distribution, our integrated capabilities help businesses, creators, governments, and brands grow through media and technology."}</p>
            <Link href={cta?.href?.trim() || "/services"} className={styles.cta}>{cta?.label?.trim() || "Explore Capabilities"}<ArrowIcon /></Link>
          </div>
        </div>
        <div ref={viewportRef} className={styles.viewport} data-lenis-prevent={pinned ? undefined : true}
          role="region" aria-label="Industries" tabIndex={0}>
          <motion.div ref={trackRef} className={styles.track} style={{ x: pinned ? x : 0 }}>
            {INDUSTRIES.map((industry) => <IndustryCard key={industry.key} industry={industry} onFocus={revealFocusedCard} />)}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
