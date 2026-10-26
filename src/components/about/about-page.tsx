"use client";


import { LocalizedContent } from "@/components/localization/localized-content";
import Link from "next/link";
import Image from "@/components/ui/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Children,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { plusJakartaSans } from "@/lib/fonts";
import type { CmsHomePage } from "@/types/cms";
import { AnimatedStatNumber } from "@/components/landing/animated-stat-number";
import { NewsBlogsSection } from "@/components/landing/news-blogs-section";
import { PreFooterBanner } from "@/components/shared/pre-footer-banner";
import { MediaCoverageSection as LandingMediaCoverageSection } from "@/components/landing/media-coverage-section";
import { ContactActionCards } from "@/components/contact-us/contact-action-cards";

import styles from "./about-page.module.css";

type CarouselProps = {
  ariaLabel: string;
  children: ReactNode;
  autoplayMs?: number;
  className?: string;
  controls?: boolean;
  dots?: boolean;
  labels?: string[];
};

type TimelineItem = {
  year: string;
  title: string;
  image: string;
  imageAlt: string;
};

type ImageSlide = {
  src: string;
  alt: string;
};

const BRAND_LOGOS = [
  {
    src: "/images/fast-channel/abhijat-marathi-ott-logo.webp",
    alt: "Abhijat Marathi OTT",
    label: "अभिजात मराठी “ओटीटी”",
  },
  {
    src: "/images/fast-channel/suman-bhakti-logo.webp",
    alt: "Suman Bhakti",
    label: "सुमन म्यूजिक भक्ति",
  },
  {
    src: "/images/fast-channel/abhijat-marathi-vishesh-logo.webp",
    alt: "Abhijat Marathi Vishesh",
    label: "अभिजात मराठी “विशेष”",
  },
  {
    src: "/images/fast-channel/adlibs-production-logo.webp",
    alt: "Adlibs Production",
    label: "एडलिब्स प्रोडक्शन",
  },
  {
    src: "/images/fast-channel/adidev-bhakti-logo.webp",
    alt: "Adidev Bhakti",
    label: "आदिदेव भक्ति",
  },
  {
    src: "/images/fast-channel/abhijat-marathi-filmy-logo.webp",
    alt: "Abhijat Marathi Filmy",
    label: "अभिजात मराठी “फिल्मी”",
  },
  {
    src: "/images/fast-channel/suman-music-marathi-logo.webp",
    alt: "Suman Music Marathi",
    label: "सुमन म्यूजिक मराठी",
  },
  {
    src: "/images/fast-channel/suman-music-bhakti-logo.webp",
    alt: "Suman Music Bhakti",
    label: "सुमन म्यूजिक भक्ति",
  },
];

function shuffleBrands(seed: number) {
  const items = [...BRAND_LOGOS];
  let state = seed >>> 0;

  for (let index = items.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const swapIndex = state % (index + 1);
    [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
  }

  return items;
}

// Two deliberately different, deterministic shuffles keep the layout visually
// random without causing a Next.js server/client hydration mismatch.
const BRAND_ROWS = [shuffleBrands(0x51a7), shuffleBrands(0x8dd3)];

const GLOBAL_REACH_IMAGES: ImageSlide[] = [
  {
    src: "/images/about/global-reach-press.webp",
    alt: "Suman Entertainment at the Bharat Pavilion media event",
  },
  {
    src: "/images/about/global-reach-launch.webp",
    alt: "Abhijat Marathi launch ceremony with Government of Maharashtra representatives",
  },
  {
    src: "/images/about/mission-01.webp",
    alt: "Suman Entertainment delegation at an international cultural event",
  },
  {
    src: "/images/about/mission-02.webp",
    alt: "Guests at an international media and cultural event",
  },
  {
    src: "/images/about/mission-03.webp",
    alt: "Suman Entertainment representatives at an international gathering",
  },
];

// SUMAN_MISSION_MARQUEE_20261025: one uninterrupted, CSS-driven loop (two identical halves).
const MISSION_GALLERY_IMAGES: ImageSlide[] = [
  { src: "/images/about/global-reach-press.webp", alt: "Suman Entertainment at an international media event" },
  { src: "/images/about/timeline-2025.webp", alt: "Abhijat Marathi OTT platform launch" },
  { src: "/images/about/mission-01.webp", alt: "Suman Entertainment cultural delegation" },
  { src: "/images/about/notable-01.webp", alt: "Artist featured by Suman Entertainment" },
  { src: "/images/about/global-reach-launch.webp", alt: "Abhijat Marathi launch celebration" },
  { src: "/images/about/mission-02.webp", alt: "Guests at a media and cultural event" },
  { src: "/images/about/timeline-2021.webp", alt: "Suman Entertainment office" },
  { src: "/images/about/notable-02.webp", alt: "Marathi entertainment personality" },
  { src: "/images/about/mission-03.webp", alt: "International media and cultural gathering" },
  { src: "/images/about/timeline-2022.webp", alt: "Suman Entertainment team at work" },
  { src: "/images/about/notable-03.webp", alt: "Artist featured by Suman Entertainment" },
  { src: "/images/about/mission-04.webp", alt: "Suman Entertainment company event" },
  { src: "/images/about/timeline-2026.webp", alt: "Marathi cultural delegation at Cannes" },
  { src: "/images/about/notable-04.webp", alt: "Marathi entertainment artist" },
  { src: "/images/about/timeline-intro-left.webp", alt: "Moment from Suman Entertainment history" },
];

const TIMELINE: TimelineItem[] = [
  {
    year: "2021",
    title: "Suman Entertainment & Media incorporated.",
    image: "/images/about/timeline-2021.webp",
    imageAlt: "Suman Entertainment office",
  },
  {
    year: "2022",
    title:
      "Built a full-stack digital marketing, content and reputation management business.",
    image: "/images/about/timeline-2022.webp",
    imageAlt: "Team working in a Suman Entertainment office",
  },
  {
    year: "2025",
    title:
      "Launched Abhijat Marathi OTT, a dedicated Marathi-language streaming platform.",
    image: "/images/about/timeline-2025.webp",
    imageAlt: "Abhijat Marathi platform launch event",
  },
  {
    year: "2026",
    title:
      "Abhijat Marathi Global Alpha Launch at Cannes, marking a major international positioning for Marathi cinema and culture.",
    image: "/images/about/timeline-2026.webp",
    imageAlt: "Marathi cultural delegation at Cannes",
  },
  {
    year: "2027",
    title: "Suman Entertainment is going public by 2027.",
    image: "/images/about/timeline-2027.webp",
    imageAlt: "Stock exchange listing concept for Suman Entertainment",
  },
  {
    year: "2029",
    title:
      "Began building a global Marathi diaspora strategy, with the ambition of creating a 1-crore-member Marathi family by 2029.",
    // The supplied 2027 and 2029 timeline references use the same exchange visual.
    // Reuse one optimized asset instead of shipping a duplicate file.
    image: "/images/about/timeline-2027.webp",
    imageAlt: "Suman Entertainment global growth roadmap",
  },
];

const NOTABLE_IMAGES = [
  { src: "/images/about/notable-01.webp", alt: "Ashok Saraf" },
  { src: "/images/about/notable-02.webp", alt: "Prajakta Mali" },
  { src: "/images/about/notable-03.webp", alt: "Nivedita Saraf" },
  { src: "/images/about/notable-04.webp", alt: "Sayali Sanjeev" },
  { src: "/images/about/ankita-walawalkar.webp", alt: "Ankita Walawalkar" },
  { src: "/images/about/deesha-katkar.webp", alt: "Deesha Katkar" },
  { src: "/images/about/jayanti-waghdhare.webp", alt: "Jayanti Waghdhare" },
];

const GOVERNMENT_IMAGES: ImageSlide[] = [
  {
    src: "/images/about/government-01.webp",
    alt: "Abhijat Marathi event with Government of Maharashtra representatives",
  },
  {
    src: "/images/about/global-reach-launch.webp",
    alt: "Abhijat Marathi launch ceremony",
  },
  {
    src: "/images/about/global-reach-press.webp",
    alt: "Suman Entertainment at a public cultural event",
  },
  {
    src: "/images/about/timeline-intro-left.webp",
    alt: "Suman Entertainment recognition moment",
  },
];

const ABOUT_MEDIA_COVERAGE = {
  eyebrow: "MEDIA COVERAGE",
  heading: "Featured media",
  items: [
    "ANI",
    "ThePrint",
    "ABP Majha",
    "Brut.",
    "REPUBLIC",
    "THE WIRE",
    "Sakal",
    "FORTUNE",
    "Business Standard",
    "The Tribune",
    "Pudhari",
    "Lokmat Filmy",
  ].map((title, index) => ({
    _key: `about-media-${index + 1}`,
    title,
  })),
};

const ABOUT_CONTACT_CARDS = [
  {
    key: "about-contact",
    imageUrl: "/images/about/contact-01.webp",
    imageAlt: "Suman Entertainment team conversation",
    title: "Contact us",
    description: "Start a conversation with our team.",
    href: "/contact",
  },
  {
    key: "about-partner",
    imageUrl: "/images/about/contact-02.webp",
    imageAlt: "Suman Entertainment partnership discussion",
    title: "Partner with us",
    description:
      "From films and music to technology and distribution, create, build and reach new audiences with us.",
    href: "/partners",
  },
  {
    key: "about-grow",
    imageUrl: "/images/about/contact-03.webp",
    imageAlt: "Suman Entertainment team and growth opportunities",
    title: "Grow with us",
    description:
      "Join a growing media ecosystem built around content, technology, regional IP and global opportunities.",
    href: "/careers",
  },
];

function ArrowIcon({ left = false }: { left?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={left ? styles.arrowIconLeft : styles.arrowIcon}
    >
      <path
        d="M7 4l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function useCarouselActiveIndex(
  railRef: RefObject<HTMLDivElement | null>,
  itemCount: number,
) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || itemCount < 2) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const center = rail.scrollLeft;
      const items = Array.from(
        rail.querySelectorAll<HTMLElement>("[data-carousel-item]"),
      );

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      items.forEach((item, index) => {
        const itemCenter = Math.min(item.offsetLeft - (items[0]?.offsetLeft ?? 0), rail.scrollWidth - rail.clientWidth);
        const distance = Math.abs(itemCenter - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex((current) =>
        current === closestIndex ? current : closestIndex,
      );
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    rail.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();

    return () => {
      window.cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [itemCount, railRef]);

  return [activeIndex, setActiveIndex] as const;
}

function DragCarousel({
  ariaLabel,
  children,
  autoplayMs,
  className = "",
  controls = true,
  dots = true,
  labels,
}: CarouselProps) {
  const items = useMemo(() => Children.toArray(children), [children]);
  const railRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() === true;
  const [activeIndex] = useCarouselActiveIndex(
    railRef,
    items.length,
  );
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(false);
  const paused = hovered || focused || dragging || !visible;
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);
  const pointerState = useRef({
    id: -1,
    startX: 0,
    startScrollLeft: 0,
  });

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const rail = railRef.current;
      if (!rail || items.length === 0) return;

      const normalized = ((index % items.length) + items.length) % items.length;
      const item = rail.querySelectorAll<HTMLElement>("[data-carousel-item]")[
        normalized
      ];
      if (!item) return;

      const first = rail.querySelector<HTMLElement>("[data-carousel-item]");
      rail.scrollTo({ left: item.offsetLeft - (first?.offsetLeft ?? 0), behavior: reducedMotion ? "instant" : behavior });
    },
    [items.length, reducedMotion],
  );

  useEffect(() => {
    if (!autoplayMs || autoplayMs < 1000 || reducedMotion || paused) return;
    if (items.length < 2) return;

    const timer = window.setInterval(() => {
      const rail = railRef.current;
      if (document.hidden || !rail) return;
      const atEnd = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2;
      scrollToIndex(atEnd ? 0 : activeIndex + 1);
    }, autoplayMs);

    return () => window.clearInterval(timer);
  }, [activeIndex, autoplayMs, items.length, paused, reducedMotion, scrollToIndex]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || event.button !== 0 || event.pointerType === "touch" || (event.target as HTMLElement).closest("button, a")) return;

    pointerState.current = {
      id: event.pointerId,
      startX: event.clientX,
      startScrollLeft: rail.scrollLeft,
    };

    rail.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    const pointer = pointerState.current;
    if (!rail || pointer.id !== event.pointerId) return;

    const delta = event.clientX - pointer.startX;
    rail.scrollLeft = pointer.startScrollLeft - delta;
  };

  const finishPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    const pointer = pointerState.current;
    if (!rail || pointer.id !== event.pointerId) return;

    if (rail.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }

    pointerState.current.id = -1;
    setDragging(false);
  };

  return <LocalizedContent>{(
    <div
      className={`${styles.carousel} ${className}`}
      onMouseEnter={() => {
        setHovered(true);
        const rail = railRef.current;
        rail?.scrollTo({ left: rail.scrollLeft, behavior: "instant" });
      }}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div
        ref={railRef}
        data-motion-managed
        className={styles.carouselRail}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        data-dragging={dragging}
        data-lenis-prevent-horizontal
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
        onTouchCancel={() => setHovered(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={finishPointer}
        onLostPointerCapture={finishPointer}
        onDragStart={(event) => event.preventDefault()}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollToIndex(activeIndex - 1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollToIndex(activeIndex + 1);
          }
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            data-carousel-item
            className={styles.carouselItem}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${items.length}`}
          >
            {labels ? <div className={styles.timelineDots} aria-label="Slide position">
              {items.map((_, position) => <button key={position} type="button" aria-label={`Go to slide ${position + 1}`} aria-current={activeIndex === position ? "step" : undefined} onClick={() => scrollToIndex(position)} />)}
            </div> : null}
            {item}
            {labels ? <div className={styles.timelineMarker}>
              <button type="button" aria-current={activeIndex === index ? "step" : undefined} onClick={() => scrollToIndex(index)}>{labels[index]}</button><span aria-hidden="true" />
            </div> : null}
          </div>
        ))}
      </div>


      {(controls || dots) && items.length > 1 ? (
        <div className={styles.carouselControls}>
          {dots ? (
            <div className={styles.carouselDots} aria-label="Slide position">
              {items.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={styles.carouselDot}
                  data-active={activeIndex === index}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  onClick={() => scrollToIndex(index)}
                />
              ))}
            </div>
          ) : (
            <span />
          )}
          {controls ? (
            <div className={styles.carouselArrows}>
              <button
                type="button"
                className={styles.carouselArrow}
                aria-label="Previous slide"
                onClick={() => scrollToIndex(activeIndex - 1)}
              >
                <ArrowIcon left />
              </button>
              <button
                type="button"
                className={styles.carouselArrow}
                aria-label="Next slide"
                onClick={() => scrollToIndex(activeIndex + 1)}
              >
                <ArrowIcon />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )}</LocalizedContent>;
}

function SectionEyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <LocalizedContent>{(
    <p className={styles.eyebrow} data-dark={dark}>
      {children}
    </p>
  )}</LocalizedContent>;
}

function AboutIntro() {
  return <LocalizedContent>{(
    <section className={`${styles.aboutIntro} site-section`}>
      <div className={styles.aboutIntroContent}>
        <SectionEyebrow>ABOUT SUMAN ENTERTAINMENT</SectionEyebrow>
        <h2 className={styles.aboutIntroHeading}>
          <strong>Suman Entertainment &amp; Media</strong>{" "}
          is building an integrated ecosystem across entertainment, content, digital platforms,
          technology and communications — rooted in Marathi culture and designed for a global
          audience.
        </h2>
      </div>

      <div
        className={styles.brandMarquee}
        aria-label="Suman Entertainment ecosystem brands"
        role="region"
      >
        {BRAND_ROWS.map((brands, rowIndex) => (
          <div
            className={styles.brandMarqueeRow}
            data-direction={rowIndex === 0 ? "left" : "right"}
            data-row={rowIndex + 1}
            aria-hidden={rowIndex === 1 ? true : undefined}
            key={`brand-row-${rowIndex + 1}`}
          >
            <div className={styles.brandMarqueeTrack}>
              {[0, 1].map((copyIndex) => (
                <div
                  className={styles.brandMarqueeGroup}
                  role={rowIndex === 0 && copyIndex === 0 ? "list" : undefined}
                  aria-hidden={copyIndex === 1 ? true : undefined}
                  key={`brand-copy-${copyIndex}`}
                >
                  {brands.map((brand, brandIndex) => (
                    <article
                      className={styles.brandCard}
                      role={rowIndex === 0 && copyIndex === 0 ? "listitem" : undefined}
                      key={`${copyIndex}-${brand.src}-${brandIndex}`}
                    >
                      <div className={styles.brandLogo}>
                        <Image
                          src={brand.src}
                          alt={copyIndex === 0 && rowIndex === 0 ? brand.alt : ""}
                          fill
                          sizes="56px"
                          className={styles.brandLogoImage}
                        />
                      </div>
                      <span className={styles.brandLabel}>{brand.label}</span>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )}</LocalizedContent>;
}

function StickyGlobalReach() {
  const stageRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion() === true;
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 92,
    damping: 32,
    restDelta: 0.001,
  });

  // Each image sequence moves only inside its clipped card viewport.
  const leftTrackY = useTransform(
    progress,
    [0, 0.16, 0.25, 0.36, 0.46, 0.6],
    ["0%", "0%", "-33.333333%", "-33.333333%", "-66.666667%", "-66.666667%"],
  );
  const rightTrackY = useTransform(
    progress,
    [0, 0.24, 0.34, 0.6],
    ["0%", "0%", "-50%", "-50%"],
  );

  // The whole white Global Reach composition stays sticky, then crossfades
  // into the muted cinematic video before the partner-logo strip.
  const whiteOpacity = useTransform(progress, [0, 0.6, 0.7], [1, 1, 0]);
  const whiteScale = useTransform(progress, [0, 0.62, 0.7], [1, 1, 0.992]);
  const videoOpacity = useTransform(progress, [0.64, 0.74], [0, 1]);
  const videoScale = useTransform(progress, [0.64, 1], [1.035, 1]);
  const videoTitleOpacity = useTransform(progress, [0.72, 0.82], [0, 1]);
  const videoTitleY = useTransform(progress, [0.72, 0.84], [18, 0]);

  useEffect(() => {
    const video = videoRef.current;
    const stage = stageRef.current;
    if (!video || !stage || reducedMotion) return;
    let inView = false;
    const syncPlayback = () => {
      if (inView && !document.hidden && progress.get() >= 0.62) {
        video.play().catch(() => undefined);
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(stage);
    const unsubscribe = progress.on("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    video.addEventListener("canplay", syncPlayback);
    return () => {
      observer.disconnect();
      unsubscribe();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.removeEventListener("canplay", syncPlayback);
      video.pause();
    };
  }, [progress, reducedMotion]);

  return <LocalizedContent>{(
    <section
      ref={stageRef}
      data-motion-managed
      className={styles.globalStage}
      aria-label="Global reach sticky-scroll image story"
    >
      <div className={styles.globalSticky}>
        <motion.div data-motion-managed
          className={styles.globalWhiteStage}
          style={
            reducedMotion
              ? undefined
              : { opacity: whiteOpacity, scale: whiteScale }
          }
        >
          <div className={`${styles.globalStickyHeader} site-gutter`}>
            <SectionEyebrow>GLOBAL REACH</SectionEyebrow>

            <div className={styles.globalHeaderCopy}>
              <h2 className={styles.globalReachTitle}>
                More than what we do.
                <br />
                It&apos;s why we do it.
              </h2>
              <p>
                Our work sits at the intersection of media expertise, innovation and human
                needs—helping us create solutions that are relevant today and built for tomorrow.
              </p>
            </div>
          </div>

          <div className={styles.globalGalleryArea}>
            <div className={`${styles.globalCardRow} site-gutter`}>
              <div className={styles.globalFixedCard} aria-label="Global reach image sequence one">
                <motion.div data-motion-managed
                  className={`${styles.globalCardTrack} ${styles.globalCardTrackThree}`}
                  style={reducedMotion ? undefined : { y: leftTrackY }}
                >
                  {[GLOBAL_REACH_IMAGES[0], GLOBAL_REACH_IMAGES[2], GLOBAL_REACH_IMAGES[4]].map(
                    (item) => (
                      <figure className={styles.globalCardSlide} key={item.src}>
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(min-width: 1024px) 44vw, 46vw"
                          className={styles.coverImage}
                        />
                      </figure>
                    ),
                  )}
                </motion.div>
              </div>

              <div
                className={`${styles.globalFixedCard} ${styles.globalFixedCardTall}`}
                aria-label="Global reach image sequence two"
              >
                <motion.div data-motion-managed
                  className={`${styles.globalCardTrack} ${styles.globalCardTrackTwo}`}
                  style={reducedMotion ? undefined : { y: rightTrackY }}
                >
                  {[GLOBAL_REACH_IMAGES[1], GLOBAL_REACH_IMAGES[3]].map((item) => (
                    <figure className={styles.globalCardSlide} key={item.src}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 48vw, 49vw"
                        className={styles.coverImage}
                      />
                    </figure>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div data-motion-managed
          className={styles.globalVideoStage}
          style={
            reducedMotion
              ? undefined
              : { opacity: videoOpacity, scale: videoScale }
          }
        >
          <video
            ref={videoRef}
            className={styles.globalVideo}
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/about/global-reach-story.webp"
            aria-hidden="true"
            tabIndex={-1}

          >
            <source src="/videos/abhijat-marathi-brand-film.mp4" type="video/mp4" />
          </video>
          <div className={styles.globalVideoShade} aria-hidden="true" />

          <motion.div data-motion-managed
            className={`${styles.globalVideoTitleWrap} site-gutter`}
            style={
              reducedMotion
                ? undefined
                : { opacity: videoTitleOpacity, y: videoTitleY }
            }
          >
            <h2 className={styles.globalVideoTitle}>
              More than what we do.
              <br />
              It&apos;s why we do it.
            </h2>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )}</LocalizedContent>;
}

function statRevealInitial() {
  return { opacity: 0, y: 22 };
}

function statRevealVisible() {
  return { opacity: 1, y: 0 };
}

function MissionSection() {
  const reducedMotion = useReducedMotion();
  const stats: Array<{ value: number; prefix?: string; suffix?: string; label: string }> = [
    { value: 100, suffix: "+", label: "Projects delivered" },
    { value: 50, suffix: "mn", label: "People reached" },
    { value: 10, suffix: "+", label: "Markets served" },
  ];

  return <LocalizedContent>{(
    <section className={styles.missionSection}>
      <div className={`${styles.missionCopy} site-gutter`}>
        <p className={styles.missionStatement}>
          <strong>At the heart of our mission is the vision</strong>{" "}
          <span>
            of taking the Marathi language to the world. We are dedicated to promoting,
            preserving, and expanding the reach of Marathi through technology, innovation,
            and meaningful digital experiences—connecting Marathi speakers globally and
            introducing the richness of the language to a wider audience.
          </span>
        </p>

        <dl data-motion-managed className={styles.statsGrid} aria-label="Suman Entertainment statistics">
          {stats.map((stat, index) => (
            <motion.div data-motion-managed
              className={styles.statItem}
              key={stat.label}
              initial={reducedMotion ? false : statRevealInitial()}
              whileInView={statRevealVisible()}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                duration: 0.55,
                delay: index * 0.13,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
            >
              <dd>
                <AnimatedStatNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  delay={index * 130}
                />
              </dd>
              <dt>{stat.label}</dt>
            </motion.div>
          ))}
        </dl>
      </div>
      <div className={styles.missionMarquee} role="region" aria-label="Suman Entertainment moments, continuously scrolling photo gallery">
        <div className={styles.missionMarqueeTrack}>
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className={styles.missionMarqueeGroup}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {MISSION_GALLERY_IMAGES.map((item, index) => (
                <figure className={styles.missionMarqueeCard} key={`${copy}-${index}-${item.src}`}>
                  <Image
                    src={item.src}
                    alt={copy === 0 ? item.alt : ""}
                    fill
                    sizes="(min-width: 1100px) 29vw, (min-width: 640px) 42vw, 80vw"
                    className={styles.coverImage}
                  />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )}</LocalizedContent>;
}

function TimelineSection() {
  return <LocalizedContent>{(
    <section id="our-journey" className={styles.timelineSection}>
      <DragCarousel
        ariaLabel="Suman Entertainment interactive timeline"
        autoplayMs={5600}
        className={styles.timelineCarousel}
        dots={false}
        controls={false}
        labels={["Start", ...TIMELINE.map((item) => item.year)]}
      >
        <article className={styles.timelineIntro}>
          <div className={styles.timelineIntroPhoto}><Image src="/images/about/timeline-intro-left.webp" alt="" fill sizes="20vw" className={styles.coverImage} /></div>
          <div><h2>From where we started to where we&apos;re going.</h2><p>Every milestone has shaped the organization we are today.</p></div>
          <div className={styles.timelineIntroPhoto}><Image src="/images/about/timeline-2026.webp" alt="" fill sizes="20vw" className={styles.coverImage} /></div>
        </article>
        {TIMELINE.map((item) => (
          <article className={styles.timelineSlide} key={item.year}>
            <div className={styles.timelineCopy}>
              <span className={styles.timelineYear}>{item.year.slice(2)}</span>
              <h3>{item.title}</h3>
            </div>
            <figure className={styles.timelineImage}>
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(min-width: 1024px) 48vw, 90vw"
                className={styles.coverImage}
              />
            </figure>
          </article>
        ))}
      </DragCarousel>
    </section>
  )}</LocalizedContent>;
}

function LeadershipSection() {
  return <LocalizedContent>{(
    <section id="leadership" className={`${styles.leadershipSection} site-section`}>
      <div className={styles.leadershipHeading}>
        <div>
          <h2 className={styles.darkHeading}>The people shaping our next chapter.</h2>
        </div>
        <p>
          Our leadership brings together experience, diverse perspectives and a shared
          ambition to move the organisation forward.
        </p>
      </div>

      <div className={styles.leadershipGrid}>
        <article className={styles.leaderCard}>
          <figure className={styles.leaderImage}>
            <Image
              src="/images/about/kedar-joshi.webp"
              alt="Kedar Joshi representing Suman Entertainment at an international media event"
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 52vw, 88vw"
              className={styles.leaderPortrait}
            />
          </figure>
          <div className={styles.leaderMeta}>
            <h3>Kedar Joshi</h3>
            <p>Founder and CEO</p>
            <Link className={styles.leaderLink} href="/contact">
              <span>Connect with us</span>
              <ArrowIcon />
            </Link>
          </div>
        </article>
        {Array.from({ length: 7 }, (_, index) => <article className={styles.leaderCard} key={index}>
          <div className={styles.leaderPlaceholder} aria-hidden="true"><svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="#ccc"/><circle cx="100" cy="78" r="34" fill="#999"/><path d="M40 166a60 60 0 0 1 120 0" fill="#999"/></svg></div>
          <div className={styles.leaderMeta}><h3>Leadership team</h3><p>Profile coming soon</p></div>
        </article>)}
      </div>
    </section>
  )}</LocalizedContent>;
}

function NotablePersonalitiesSection() {
  return <LocalizedContent>{(
    <section className={`${styles.notableSection} site-section`}>
      <div className={styles.sectionHeadingRow}>
        <div>
          <h2 className={styles.sectionHeading}>Notable personalities</h2>
        </div>
        <p>Selected moments from the Suman Entertainment archive.</p>
      </div>

      <DragCarousel
        ariaLabel="Notable personalities image gallery"
        controls={false}
        dots={false}
        className={styles.notableCarousel}
      >
        {NOTABLE_IMAGES.map((item) => (
          <figure className={styles.notableCard} key={item.src}>
            <div className={styles.notableImage}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 24vw, (min-width: 640px) 42vw, 76vw"
                className={styles.coverImage}
              />
            </div>
            <figcaption>{item.alt}</figcaption>
          </figure>
        ))}
      </DragCarousel>
    </section>
  )}</LocalizedContent>;
}

function GovernmentSection() {
  return <LocalizedContent>{(
    <section className={`${styles.governmentSection} site-section`}>
      <div className={styles.governmentHeading}>
        <SectionEyebrow>AWARDS AND RECOGNITIONS</SectionEyebrow>
        <h2 className={styles.sectionHeading}>
          Empaneled with the<br /> Government of Maharashtra
        </h2>
        <p>
          Abhijat Marathi OTT is Maharashtra&apos;s first dedicated regional streaming
          platform for Marathi cinema, theatre, and culture, launched officially by
          Chief Minister Devendra Fadnavis.
        </p>
      </div>

      <DragCarousel
        ariaLabel="Government of Maharashtra recognition slideshow"
        autoplayMs={4400}
        controls={false}
        dots
        className={styles.governmentCarousel}
      >
        {GOVERNMENT_IMAGES.map((item) => (
          <figure className={styles.governmentSlide} key={item.src}>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 92vw, 94vw"
              className={styles.coverImage}
            />
          </figure>
        ))}
      </DragCarousel>
    </section>
  )}</LocalizedContent>;
}

function ContactCardsSection() {
  return <LocalizedContent>{(
    <ContactActionCards
      cards={ABOUT_CONTACT_CARDS}
      compact
      ariaLabel="Ways to connect with Suman Entertainment"
    />
  )}</LocalizedContent>;
}

function AboutHero() {
  return <LocalizedContent>{(
    <section className={styles.hero} aria-labelledby="about-hero-title">
      <Image
        src="/images/about/hero-office.webp"
        alt="Suman Entertainment office interior"
        fill
        priority
        sizes="100vw"
        className={styles.heroImage}
      />
      <div className={styles.heroShade} aria-hidden="true" />
      <p className={`${styles.heroEyebrow} site-gutter`}>ABOUT US</p>
      <h1 id="about-hero-title" className={`${styles.heroTitle} site-gutter`}>
        <span>About</span>
        <span>us</span>
      </h1>
    </section>
  )}</LocalizedContent>;
}

export function AboutPageContent({
  home = null,
}: {
  home?: Pick<
    CmsHomePage,
    | "mediaCoverage"
    | "newsBlogsEyebrow"
    | "newsBlogsHeading"
    | "newsBlogsCta"
    | "featuredNewsBlogs"
    | "careersCta"
  > | null;
}) {
  return <LocalizedContent>{(
    <main className={`${styles.page} ${plusJakartaSans.className}`}>
      <AboutHero />
      <AboutIntro />
      <StickyGlobalReach />
      <div className={styles.partnersStrip}><Image src="/images/about/partners-strip.webp" alt="Laminar, AWS, Festival de Cannes, Zee Marathi and Government of Maharashtra" width={710} height={130} sizes="(min-width: 768px) 710px, 92vw" /></div>
      <MissionSection />
      <TimelineSection />
      <LeadershipSection />
      <NotablePersonalitiesSection />
      <GovernmentSection />
      <LandingMediaCoverageSection content={home?.mediaCoverage ?? ABOUT_MEDIA_COVERAGE} compact />
      <NewsBlogsSection
        eyebrow={home?.newsBlogsEyebrow}
        heading={home?.newsBlogsHeading}
        cta={home?.newsBlogsCta}
        articles={home?.featuredNewsBlogs}
      />
      <ContactCardsSection />
      <PreFooterBanner type={1} imagePosition="center top" />
    </main>
  )}</LocalizedContent>;
}
