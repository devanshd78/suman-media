"use client";

import Image from "@/components/ui/image";
import Link from "next/link";
import { AnimatedStatNumber } from "@/components/landing/animated-stat-number";
import { IntersectionReveal } from "@/components/motion/intersection-reveal";
import { inter, plusJakartaSans } from "@/lib/fonts";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Exo_2 } from "next/font/google";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

import styles from "./partner-page.module.css";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-exo-2",
  display: "swap",
});

type PartnerType = {
  number: string;
  title: string;
  description: string;
};

type Logo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type EcosystemHeaderProps = {
  title: string;
  description: string;
  href: string;
  tone?: "light" | "dark" | "warm";
  ctaLabel?: string;
};

type MediaRailProps = {
  items: readonly { src: string; alt: string }[];
  label: string;
  tone?: "light" | "warm";
  showOttControls?: boolean;
  showFilmyControls?: boolean;
};

const PARTNER_TYPES: readonly PartnerType[] = [
  {
    number: "01",
    title: "Writers",
    description: "Bring your script or original story.",
  },
  {
    number: "02",
    title: "Movie/music directors",
    description: "Bring your vision and creative voice.",
  },
  {
    number: "03",
    title: "Producers",
    description: "Explore co-production and content opportunities.",
  },
  {
    number: "04",
    title: "Musicians & artists",
    description: "Create, publish and distribute music.",
  },
  {
    number: "05",
    title: "Creators",
    description: "Build content and reach new audiences.",
  },
  {
    number: "06",
    title: "Strategic partners",
    description: "Explore distribution, investment and new ventures.",
  },
];

const PARTNER_LOGOS: readonly Logo[] = [
  {
    src: "/images/partners/company/image1.svg",
    alt: "AWS",
    width: 112,
    height: 64,
  },
  {
    src: "/images/partners/company/image2.svg",
    alt: "Government of Maharashtra",
    width: 92,
    height: 64,
  },
  {
    src: "/images/partners/company/image3.svg",
    alt: "Laminar",
    width: 216,
    height: 56,
  },
  {
    src: "/images/partners/company/image4.svg",
    alt: "Zee Marathi",
    width: 144,
    height: 64,
  },
  {
    src: "/images/partners/company/image5.svg",
    alt: "Festival de Cannes",
    width: 168,
    height: 64,
  },
];

const FILM_STRIP = [
  {
    src: "/images/landing/client/Image1.png",
    alt: "Live Marathi cultural performance",
  },
  {
    src: "/images/landing/client/Image3.png",
    alt: "Music recording session",
  },
  {
    src: "/images/landing/background2.png",
    alt: "Bharat Pavilion media event",
  },
  {
    src: "/images/landing/film/mumbai-gateway.png",
    alt: "Mumbai waterfront and Gateway of India",
  },
  {
    src: "/images/contactus/JoinAsPartner.png",
    alt: "Film professional on location",
  },
] as const;

const OTT_IMAGES = [
  {
    src: "youtube:E5WdHYaVGgo",
    alt: "Abhijat Marathi OTT YouTube video 1",
  },
  {
    src: "youtube:xFZXokVyOYY",
    alt: "Abhijat Marathi OTT YouTube video 2",
  },
  {
    src: "youtube:H4J1gJFDZQw",
    alt: "Abhijat Marathi OTT YouTube video 3",
  },
] as const;

const FILMY_IMAGES = [
  {
    src: "youtube:E5WdHYaVGgo",
    alt: "Abhijat Marathi Filmy YouTube video 1",
  },
  {
    src: "youtube:xFZXokVyOYY",
    alt: "Abhijat Marathi Filmy YouTube video 2",
  },
  {
    src: "youtube:H4J1gJFDZQw",
    alt: "Abhijat Marathi Filmy YouTube video 3",
  },
  {
    src: "youtube:j71RZBc8iYE",
    alt: "Abhijat Marathi Filmy YouTube video 4",
  },
  {
    src: "youtube:Zz5I0zSgzjs",
    alt: "Abhijat Marathi Filmy YouTube video 5",
  },
] as const;

function getYouTubeId(src: string) {
  return src.startsWith("youtube:") ? src.slice("youtube:".length) : null;
}

function getYouTubeThumbnail(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function getYouTubeEmbed(videoId: string) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
}

function ChevronRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path
        d="m7.5 4.5 5.5 5.5-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={styles.textLink}>
      <span>{children}</span>
      <ChevronRightIcon />
    </Link>
  );
}

function PillLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={styles.pillLink}>
      <span>{children}</span>
      <ChevronRightIcon />
    </Link>
  );
}

function PartnerLogos() {
  return (
    <div
      className={styles.partnerLogoStrip}
      aria-label="Selected ecosystem partners"
    >
      {PARTNER_LOGOS.map((logo) => (
        // Native img is appropriate for local SVG marks and preserves intrinsic aspect ratio.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={logo.src}
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          loading="lazy"
          decoding="async"
          className={styles.partnerLogo}
        />
      ))}
    </div>
  );
}

function EcosystemHeader({
  title,
  description,
  href,
  tone = "light",
  ctaLabel = "Explore",
}: EcosystemHeaderProps) {
  return (
    <div className={styles.ecosystemHeader} data-tone={tone}>
      <IntersectionReveal className={styles.ecosystemIdentity}>
        <Image
          src="/images/abhijat-logo.png"
          alt="Abhijat Marathi"
          width={75}
          height={80}
          loading="lazy"
          className={styles.ecosystemLogo}
        />
        <h3>{title}</h3>
      </IntersectionReveal>

      <IntersectionReveal className={styles.ecosystemIntro}>
        <p>{description}</p>
        <PillLink href={href}>{ctaLabel}</PillLink>
      </IntersectionReveal>
    </div>
  );
}


/* ============================================================
   ECOSYSTEM SCROLL STACK DECK

   Behaviour is inspired by the supplied Scroll Stack Deck reference:
   - one ecosystem card enters at a time from below
   - the current card settles into a sticky viewport stage
   - older cards remain layered behind with subtle depth scaling
   - the final card releases naturally into the next page section

   The global Lenis scroll remains the only smoothing layer.  We do not
   add another spring/damping system here, which keeps wheel/trackpad
   scrolling responsive and avoids the double-smoothing issue.
   ============================================================ */

const ECOSYSTEM_STACK_COUNT = 4;

function clampStack(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value: number) {
  const inverse = 1 - value;
  return 1 - inverse * inverse * inverse;
}

type EcosystemStackCardProps = {
  index: number;
  total: number;
  progress: MotionValue<number>;
  label: string;
  children: ReactNode;
};

function EcosystemStackCard({
  index,
  total,
  progress,
  label,
  children,
}: EcosystemStackCardProps) {
  const reduceMotion = useReducedMotion() === true;
  const segmentCount = Math.max(total - 1, 1);

  const y = useTransform(progress, (value) => {
    if (reduceMotion) return "0%";

    const deckPosition = value * segmentCount;

    /* Future cards live completely below the sticky stage. */
    if (index > 0 && deckPosition < index) {
      const entryProgress = clampStack(deckPosition - (index - 1), 0, 1);
      const eased = easeOutCubic(entryProgress);
      return `${(1 - eased) * 112}%`;
    }

    /* Cards already passed settle slightly upward behind the active card. */
    const depth = clampStack(deckPosition - index, 0, 3);
    return `${depth * -1.35}%`;
  });

  const scale = useTransform(progress, (value) => {
    if (reduceMotion) return 1;

    const deckPosition = value * segmentCount;
    const depth = clampStack(deckPosition - index, 0, 3);

    return 1 - depth * 0.0275;
  });

  return (
    <div
      className={styles.ecosystemStackLayer}
      style={{ zIndex: index + 1 }}
      data-stack-index={index}
      aria-label={label}
    >
      <motion.div
        className={styles.ecosystemStackCard}
        style={{ y, scale }}
        data-stack-card
      >
        {children}
      </motion.div>
    </div>
  );
}

function MediaRail({
  items,
  label,
  tone = "light",
  showOttControls = false,
  showFilmyControls = false,
}: MediaRailProps) {
  const reduceMotion = useReducedMotion() === true;
  const railRef = useRef<HTMLDivElement>(null);
  const [railIndex, setRailIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [activeYouTube, setActiveYouTube] = useState<Set<string>>(() => new Set());

  const dragStateRef = useRef({
    pointerId: null as number | null,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    moved: false,
    captured: false,
    suppressClick: false,
  });

  const scrollToMedia = useCallback(
    (nextIndex: number) => {
      const rail = railRef.current;
      if (!rail) return;

      const safeIndex = Math.max(0, Math.min(items.length - 1, nextIndex));
      const target = rail.querySelector<HTMLElement>(
        `[data-media-index="${safeIndex}"]`,
      );
      if (!target) return;

      const railStyles = window.getComputedStyle(rail);
      const leftPadding = Number.parseFloat(railStyles.paddingLeft) || 0;

      rail.scrollTo({
        left: Math.max(0, target.offsetLeft - leftPadding),
        behavior: reduceMotion ? "auto" : "smooth",
      });
      setRailIndex(safeIndex);
    },
    [items.length, reduceMotion],
  );

  useEffect(() => {
    if (!showOttControls && !showFilmyControls) return;

    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;

    const syncIndex = () => {
      frame = 0;

      const cards = Array.from(
        rail.querySelectorAll<HTMLElement>("[data-media-index]"),
      );
      if (!cards.length) return;

      const railStyles = window.getComputedStyle(rail);
      const leftPadding =
        Number.parseFloat(railStyles.paddingLeft) || 0;
      const currentLeft = rail.scrollLeft + leftPadding;

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const distance = Math.abs(
          card.offsetLeft - currentLeft,
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setRailIndex((current) =>
        current === closestIndex
          ? current
          : closestIndex,
      );
    };

    const scheduleSync = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(syncIndex);
      }
    };

    rail.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync, { passive: true });
    scheduleSync();

    return () => {
      window.cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
    };
  }, [showOttControls, showFilmyControls]);

  const handleRailPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const rail = railRef.current;
      if (!rail) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;

      const state = dragStateRef.current;
      state.pointerId = event.pointerId;
      state.startX = event.clientX;
      state.startY = event.clientY;
      state.startScrollLeft = rail.scrollLeft;
      state.moved = false;
      state.captured = false;
      state.suppressClick = false;
    },
    [],
  );

  const handleRailPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const rail = railRef.current;
      const state = dragStateRef.current;

      if (!rail || state.pointerId !== event.pointerId) return;

      const deltaX = event.clientX - state.startX;
      const deltaY = event.clientY - state.startY;

      if (!state.moved) {
        const horizontalIntent =
          Math.abs(deltaX) > 6 && Math.abs(deltaX) > Math.abs(deltaY);

        if (!horizontalIntent) return;

        state.moved = true;
        setDragging(true);

        try {
          rail.setPointerCapture(event.pointerId);
          state.captured = true;
        } catch {
          state.captured = false;
        }
      }

      rail.scrollLeft = state.startScrollLeft - deltaX;
      event.preventDefault();
    },
    [],
  );

  const finishRailPointer = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const rail = railRef.current;
      const state = dragStateRef.current;

      if (state.pointerId !== event.pointerId) return;

      state.suppressClick = state.moved;

      if (rail && state.captured) {
        try {
          rail.releasePointerCapture(event.pointerId);
        } catch {
          // Pointer capture may already have been released by the browser.
        }
      }

      state.pointerId = null;
      state.moved = false;
      state.captured = false;
      setDragging(false);
    },
    [],
  );

  const handleRailClickCapture = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      const state = dragStateRef.current;
      if (!state.suppressClick) return;

      state.suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
    },
    [],
  );

  const activateYouTube = useCallback((videoId: string) => {
    setActiveYouTube((current) => {
      if (current.has(videoId)) return current;
      const next = new Set(current);
      next.add(videoId);
      return next;
    });
  }, []);

  return (
    <div
      className={styles.mediaRailWrap}
      data-tone={tone}
      data-ott-layout={showOttControls ? "true" : "false"}
      data-filmy-layout={showFilmyControls ? "true" : "false"}
    >
      <div className={styles.mediaRailStage}>
        <div
          ref={railRef}
          className={styles.mediaRail}
          role="region"
          aria-label={label}
          tabIndex={0}
          data-lenis-prevent-horizontal
          data-dragging={dragging ? "true" : "false"}
          onPointerDown={handleRailPointerDown}
          onPointerMove={handleRailPointerMove}
          onPointerUp={finishRailPointer}
          onPointerCancel={finishRailPointer}
          onClickCapture={handleRailClickCapture}
        >
          {items.map((item, index) => {
            const youtubeId = getYouTubeId(item.src);
            const youtubeActive = youtubeId ? activeYouTube.has(youtubeId) : false;

            return (
              <figure
                key={`${item.src}-${index}`}
                className={styles.mediaCard}
                data-media-index={index}
                data-media-kind={youtubeId ? "youtube" : "image"}
              >
                {youtubeId ? (
                  youtubeActive ? (
                    <iframe
                      src={getYouTubeEmbed(youtubeId)}
                      title={item.alt}
                      className={styles.youtubeEmbed}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      className={styles.youtubeActivator}
                      aria-label={`Play ${item.alt}`}
                      onClick={() => activateYouTube(youtubeId)}
                    >
                      {/* Native img avoids requiring YouTube's thumbnail host in next/image config. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getYouTubeThumbnail(youtubeId)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className={styles.youtubeThumbnail}
                      />
                      <span className={styles.youtubeShade} aria-hidden="true" />
                      <span className={styles.youtubePlay} aria-hidden="true">
                        <svg viewBox="0 0 64 64" fill="none">
                          <circle cx="32" cy="32" r="31" fill="rgba(0,0,0,0.72)" />
                          <path d="M26 21.5L45 32L26 42.5V21.5Z" fill="white" />
                        </svg>
                      </span>
                    </button>
                  )
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    sizes={
                      showOttControls
                        ? "(max-width: 479px) 88vw, (max-width: 767px) 84vw, (max-width: 1023px) 68vw, 58vw"
                        : showFilmyControls
                          ? "(max-width: 479px) 88vw, (max-width: 767px) 84vw, (max-width: 1023px) 70vw, 46vw"
                          : "(max-width: 479px) 88vw, (max-width: 767px) 80vw, (max-width: 1023px) 58vw, 42vw"
                    }
                    className={styles.mediaCardImage}
                  />
                )}
              </figure>
            );
          })}
        </div>
      </div>

      {showOttControls ? (
        <div className={styles.ottMediaControls}>
          <div
            className={styles.ottSocials}
            role="group"
            aria-label="Abhijat Marathi social media"
          >
            <span className={styles.ottSocialIcon} title="Facebook" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <g clipPath="url(#ott-facebook-clip)">
                  <path d="M16 0C7.16352 0 0 7.16352 0 16C0 23.5034 5.16608 29.7997 12.135 31.529V20.8896H8.83584V16H12.135V13.8931C12.135 8.44736 14.5997 5.9232 19.9462 5.9232C20.96 5.9232 22.7091 6.12224 23.4246 6.32064V10.7526C23.047 10.713 22.391 10.6931 21.5763 10.6931C18.953 10.6931 17.9392 11.687 17.9392 14.2707V16H23.1654L22.2675 20.8896H17.9392V31.8829C25.8618 30.9261 32.0006 24.1805 32.0006 16C32 7.16352 24.8365 0 16 0Z" fill="black" />
                </g>
                <defs>
                  <clipPath id="ott-facebook-clip">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>

            <span className={styles.ottSocialIcon} title="Instagram" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21Z" stroke="black" strokeWidth="2" strokeMiterlimit="10" />
                <path d="M22 4H10C6.68629 4 4 6.68629 4 10V22C4 25.3137 6.68629 28 10 28H22C25.3137 28 28 25.3137 28 22V10C28 6.68629 25.3137 4 22 4Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22.5 11C23.3284 11 24 10.3284 24 9.5C24 8.67157 23.3284 8 22.5 8C21.6716 8 21 8.67157 21 9.5C21 10.3284 21.6716 11 22.5 11Z" fill="black" />
              </svg>
            </span>

            <span className={styles.ottSocialIcon} title="X" aria-label="X">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M6 5H12L26 27H20L6 5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.235 17.9414L6 27.0002" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M26.0006 5L17.7656 14.0588" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <div className={styles.ottDownload} aria-label="Download Abhijat Marathi">
            <span>Download now</span>
            <span className={styles.googlePlayMark} aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 24" fill="none">
                <path d="M9.60507 11.228L0.0878906 21.5573C0.0887845 21.5591 0.0887844 21.5619 0.0896783 21.5637C0.381978 22.6853 1.38313 23.5107 2.57199 23.5107C3.04754 23.5107 3.49359 23.3791 3.87617 23.1488L3.90656 23.1305L14.6189 16.8095L9.60507 11.228Z" fill="#EA4335" />
                <path d="M19.233 9.4693L19.2241 9.4629L14.5991 6.72152L9.38867 11.4629L14.6179 16.8086L19.2178 14.0946C20.0241 13.6486 20.572 12.7792 20.572 11.7774C20.572 10.781 20.0321 9.91629 19.233 9.4693Z" fill="#FBBC04" />
                <path d="M0.0876006 1.95247C0.030392 2.16819 0 2.39489 0 2.6289V20.8816C0 21.1156 0.030392 21.3423 0.0884944 21.5571L9.93194 11.492L0.0876006 1.95247Z" fill="#4285F4" />
                <path d="M9.67568 11.7554L14.601 6.7196L3.9012 0.375763C3.51236 0.137183 3.05826 6.96182e-05 2.57289 6.96182e-05C1.38402 6.96182e-05 0.381084 0.827328 0.088784 1.94984C0.088784 1.95075 0.0878906 1.95167 0.0878906 1.95258L9.67568 11.7554Z" fill="#34A853" />
              </svg>
            </span>
            <span className={styles.appleMark} aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none">
                <path d="M16.364 12.5031C16.3759 11.602 16.6211 10.7184 17.0767 9.93463C17.5324 9.15085 18.1837 8.49232 18.9701 8.02032C18.4705 7.32376 17.8114 6.75052 17.0453 6.34613C16.2791 5.94174 15.4269 5.71734 14.5563 5.69075C12.6993 5.50044 10.899 6.77563 9.95265 6.77563C8.98803 6.77563 7.53104 5.70965 5.9621 5.74116C4.94726 5.77317 3.95823 6.06128 3.09136 6.57742C2.22448 7.09357 1.50934 7.82014 1.0156 8.68634C-1.12311 12.3015 0.47218 17.6146 2.52092 20.5368C3.54596 21.9678 4.74393 23.5662 6.31146 23.5095C7.84538 23.4474 8.41827 22.5545 10.2698 22.5545C12.1042 22.5545 12.6417 23.5095 14.241 23.4735C15.887 23.4474 16.924 22.0362 17.9131 20.5917C18.6496 19.5721 19.2163 18.4452 19.5923 17.2528C18.636 16.8579 17.82 16.197 17.2459 15.3524C16.6718 14.5077 16.3651 13.5168 16.364 12.5031Z" fill="black" />
                <path d="M13.3432 3.76871C14.2407 2.71689 14.6828 1.36495 14.5757 0C13.2046 0.140594 11.9381 0.780358 11.0286 1.79182C10.5838 2.28595 10.2432 2.8608 10.0262 3.48352C9.80918 4.10624 9.72 4.76461 9.76375 5.421C10.4495 5.42789 11.128 5.28277 11.748 4.99656C12.368 4.71036 12.9135 4.29054 13.3432 3.76871Z" fill="black" />
              </svg>
            </span>
          </div>

          <div className={styles.ottRailNav} aria-label="OTT carousel controls">
            <button
              type="button"
              className={styles.ottRailButton}
              data-direction="previous"
              onClick={() => scrollToMedia(railIndex - 1)}
              disabled={railIndex === 0}
              aria-label="Previous OTT item"
            >
              <ChevronRightIcon />
            </button>
            <button
              type="button"
              className={styles.ottRailButton}
              data-direction="next"
              onClick={() => scrollToMedia(railIndex + 1)}
              disabled={railIndex === items.length - 1}
              aria-label="Next OTT item"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      ) : null}

      {showFilmyControls ? (
        <div className={styles.filmyMediaControls}>
          <div
            className={styles.filmySocials}
            role="group"
            aria-label="Abhijat Marathi Filmy social media"
          >
            <span className={styles.filmySocialIcon} title="Facebook" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M16 0C7.16352 0 0 7.16352 0 16C0 23.5034 5.16608 29.7997 12.135 31.529V20.8896H8.83584V16H12.135V13.8931C12.135 8.44736 14.5997 5.9232 19.9462 5.9232C20.96 5.9232 22.7091 6.12224 23.4246 6.32064V10.7526C23.047 10.713 22.391 10.6931 21.5763 10.6931C18.953 10.6931 17.9392 11.687 17.9392 14.2707V16H23.1654L22.2675 20.8896H17.9392V31.8829C25.8618 30.9261 32.0006 24.1805 32.0006 16C32 7.16352 24.8365 0 16 0Z" fill="black" />
              </svg>
            </span>

            <span className={styles.filmySocialIcon} title="Instagram" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21Z" stroke="black" strokeWidth="2" strokeMiterlimit="10" />
                <path d="M22 4H10C6.68629 4 4 6.68629 4 10V22C4 25.3137 6.68629 28 10 28H22C25.3137 28 28 25.3137 28 22V10C28 6.68629 25.3137 4 22 4Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22.5 11C23.3284 11 24 10.3284 24 9.5C24 8.67157 23.3284 8 22.5 8C21.6716 8 21 8.67157 21 9.5C21 10.3284 21.6716 11 22.5 11Z" fill="black" />
              </svg>
            </span>
          </div>

          <div className={styles.filmyRailNav} aria-label="Filmy carousel controls">
            <button
              type="button"
              className={styles.ottRailButton}
              data-direction="previous"
              onClick={() => scrollToMedia(railIndex - 1)}
              disabled={railIndex === 0}
              aria-label="Previous Filmy item"
            >
              <ChevronRightIcon />
            </button>
            <button
              type="button"
              className={styles.ottRailButton}
              data-direction="next"
              onClick={() => scrollToMedia(railIndex + 1)}
              disabled={railIndex === items.length - 1}
              aria-label="Next Filmy item"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function PartnerPageContent() {
  const reduceMotion = useReducedMotion() === true;
  const filmFeatureRef = useRef<HTMLElement>(null);
  const impactRef = useRef<HTMLElement>(null);
  const ecosystemStackRef = useRef<HTMLDivElement>(null);
  const studioRef = useRef<HTMLElement>(null);
  const finalCtaRef = useRef<HTMLElement>(null);
  const filmStripRef = useRef<HTMLDivElement>(null);
  const activeFilmIndexRef = useRef(0);

  const [activeFilmIndex, setActiveFilmIndex] = useState(0);
  const [filmDirection, setFilmDirection] = useState(1);

  const { scrollYProgress: filmFeatureProgress } = useScroll({
    target: filmFeatureRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: impactProgress } = useScroll({
    target: impactRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: ecosystemStackProgress } = useScroll({
    target: ecosystemStackRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: studioProgress } = useScroll({
    target: studioRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: ctaProgress } = useScroll({
    target: finalCtaRef,
    offset: ["start end", "end start"],
  });

  const filmBackdropY = useTransform(
    filmFeatureProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-28, 28],
  );

  const impactImageY = useTransform(
    impactProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-30, 30],
  );

  const impactImageScale = useTransform(
    impactProgress,
    [0, 0.5, 1],
    reduceMotion ? [1, 1, 1] : [1.06, 1.025, 1.06],
  );

  const studioPrimaryY = useTransform(
    studioProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [54, -48],
  );
  const studioSecondaryY = useTransform(
    studioProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-28, 46],
  );
  const studioHeadingY = useTransform(
    studioProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [24, -24],
  );

  const ctaScale = useTransform(
    ctaProgress,
    [0, 0.5, 1],
    reduceMotion ? [1, 1, 1] : [1.08, 1.01, 1.08],
  );

  const selectFilm = useCallback(
    (nextIndex: number, directionOverride?: 1 | -1) => {
      const safeIndex =
        ((nextIndex % FILM_STRIP.length) + FILM_STRIP.length) %
        FILM_STRIP.length;
      const previousIndex = activeFilmIndexRef.current;

      if (safeIndex === previousIndex) return;

      setFilmDirection(
        directionOverride ?? (safeIndex > previousIndex ? 1 : -1),
      );
      activeFilmIndexRef.current = safeIndex;
      setActiveFilmIndex(safeIndex);
    },
    [],
  );

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setTimeout(() => {
      selectFilm(activeFilmIndexRef.current + 1, 1);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [activeFilmIndex, reduceMotion, selectFilm]);

  useEffect(() => {
    const strip = filmStripRef.current;
    if (!strip) return;

    const activeThumb = strip.querySelector<HTMLElement>(
      `[data-film-index="${activeFilmIndex}"]`,
    );
    if (!activeThumb) return;

    const stripStyles = window.getComputedStyle(strip);
    const leftPadding = Number.parseFloat(stripStyles.paddingLeft) || 0;
    const leftAligned = activeThumb.offsetLeft - leftPadding;

    strip.scrollTo({
      left: Math.max(0, leftAligned),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeFilmIndex, reduceMotion]);

  const handleFilmClick = useCallback(
    (index: number) => {
      selectFilm(index);
    },
    [selectFilm],
  );

  const activeFilm = FILM_STRIP[activeFilmIndex];

  return (
    <main
      className={`${plusJakartaSans.className} ${plusJakartaSans.variable} ${inter.variable} ${exo2.variable} ${styles.page}`}
    >
      <section className={styles.hero} aria-labelledby="partner-page-heading">
        <div className={styles.heroInner}>
          <IntersectionReveal className={styles.heroTitleBlock}>
            <p className={styles.eyebrow}>BECOME A PARTNER</p>
            <h1 id="partner-page-heading">
              Bring Your Vision. We&apos;ll Help Take It Further.
            </h1>
          </IntersectionReveal>

          <IntersectionReveal className={styles.heroIntro}>
            <p>
              From stories and music to films, OTT, distribution and technology,
              Suman brings the ecosystem to help creators and partners turn ideas
              into opportunities.
            </p>
            <TextLink href="/contact?type=partnership">Join us</TextLink>
          </IntersectionReveal>
        </div>
      </section>

      <section ref={filmFeatureRef} className={styles.filmFeature} aria-labelledby="make-film-heading">
        <motion.div className={styles.filmBackdrop} style={{ y: filmBackdropY }} aria-hidden="true">
          <AnimatePresence initial={false} mode="sync" custom={filmDirection}>
            <motion.div
              key={activeFilm.src}
              className={styles.filmSlide}
              custom={filmDirection}
              initial={
                reduceMotion
                  ? false
                  : { x: filmDirection > 0 ? "100%" : "-100%" }
              }
              animate={{ x: 0 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { x: filmDirection > 0 ? "-100%" : "100%" }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.72,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Image
                src={activeFilm.src}
                alt=""
                fill
                priority={activeFilmIndex === 0}
                loading={activeFilmIndex === 0 ? undefined : "lazy"}
                sizes="100vw"
                className={styles.filmBackdropImage}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <div className={styles.filmShade} aria-hidden="true" />

        <IntersectionReveal className={styles.filmCopy}>
          <p className={styles.filmEyebrow}>
            01. MAKE THE IDEAS TO THE PEOPLES&apos;S HEART
          </p>
          <h2 id="make-film-heading">Make Your Film</h2>
          <p>
            Have a film idea or production you want to bring to screen? Partner
            with us to develop, produce and distribute it.
          </p>
          <TextLink href="/contact?type=partnership">Let&apos;s create</TextLink>
        </IntersectionReveal>

        <div
          ref={filmStripRef}
          className={styles.filmStrip}
          role="group"
          aria-label="Suman creative work carousel. Select an image to show it in the large frame."
          data-lenis-prevent-horizontal
        >
          {FILM_STRIP.map((item, index) => {
            const isActive = index === activeFilmIndex;

            return (
              <button
                key={item.src}
                type="button"
                className={styles.filmThumb}
                data-active={isActive ? "true" : "false"}
                data-film-index={index}
                aria-pressed={isActive}
                aria-label={`Show ${item.alt}`}
                onClick={() => handleFilmClick(index)}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(max-width: 639px) 48vw, (max-width: 767px) 38vw, 18vw"
                  className={styles.filmThumbImage}
                />
                <span className={styles.filmThumbIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <PartnerLogos />

      <section
        className={styles.whoSection}
        aria-labelledby="who-can-partner-heading"
      >
        <IntersectionReveal className={styles.centeredHeading}>
          <p className={styles.whoEyebrow}>PARTNERSHIP OPPORTUNITIES</p>
          <h2 id="who-can-partner-heading">Who Can Partner?</h2>
          <p className={styles.whoDescription}>
            Join a growing media, entertainment and technology ecosystem where
            ideas become stories, products, experiences and businesses.
          </p>
        </IntersectionReveal>

        <div className={styles.partnerTypeGrid}>
          {PARTNER_TYPES.map((item) => (
            <IntersectionReveal
              key={item.number}
              className={styles.partnerTypeReveal}
            >
              <article className={styles.partnerTypeCard}>
                <span className={styles.partnerNumber}>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            </IntersectionReveal>
          ))}
        </div>
      </section>

      <section
        ref={impactRef}
        className={styles.impactSection}
        aria-label="Suman partnership ecosystem in action"
      >
        <div className={styles.impactImageWrap}>
          <motion.div
            className={styles.impactParallax}
            style={{ y: impactImageY, scale: impactImageScale }}
            aria-hidden="true"
          >
            <Image
              src="/images/landing/background2.png"
              alt=""
              fill
              loading="lazy"
              sizes="100vw"
              className={styles.impactImage}
            />
          </motion.div>
          <div className={styles.impactShade} aria-hidden="true" />
          <span className={styles.srOnly}>
            Media and cultural leaders at the Bharat Pavilion
          </span>
        </div>

        <div className={styles.statsBand}>
          <IntersectionReveal className={styles.statsRow}>
            <div className={styles.statItem}>
              <strong>
                <AnimatedStatNumber value={300} suffix="+" />
              </strong>
              <span>Film Entertainment Content</span>
            </div>
            <div className={styles.statItem}>
              <strong>
                <AnimatedStatNumber value={2000} suffix="+" delay={130} />
              </strong>
              <span>Songs Library</span>
            </div>
            <div className={styles.statItem}>
              <strong>
                <AnimatedStatNumber value={600} suffix="m" delay={260} />
              </strong>
              <span>Short-video views</span>
            </div>
          </IntersectionReveal>
        </div>
      </section>

      <section className={styles.ecosystem} aria-labelledby="ecosystem-heading">
        <IntersectionReveal className={styles.ecosystemTitle}>
          <p className={styles.eyebrow}>FILM · ENTERTAINMENT · CONTENT</p>
          <h2 id="ecosystem-heading">Our Ecosystem</h2>
        </IntersectionReveal>

        <div
          ref={ecosystemStackRef}
          className={styles.ecosystemStack}
          style={{
            height: `${100 + (ECOSYSTEM_STACK_COUNT - 1) * 86}svh`,
          }}
          data-ecosystem-stack
        >
          <div className={styles.ecosystemStackStage}>
            {/* =================================================
                01 — ABHIJAT MARATHI OTT
                ================================================= */}
            <EcosystemStackCard
              index={0}
              total={ECOSYSTEM_STACK_COUNT}
              progress={ecosystemStackProgress}
              label="Abhijat Marathi OTT"
            >
              <div
                className={styles.ecosystemBlock}
                data-tone="light"
                data-section="ott"
              >
                <EcosystemHeader
                  title="Abhijat Marathi OTT"
                  description="A dedicated Marathi OTT platform bringing 300+ films, original programming and regional stories to audiences in India and around the world."
                  href="/companies"
                />
                <MediaRail
                  items={OTT_IMAGES}
                  label="Abhijat Marathi OTT highlights"
                  showOttControls
                />
              </div>
            </EcosystemStackCard>

            {/* =================================================
                02 — ABHIJAT MARATHI STUDIOS
                ================================================= */}
            <EcosystemStackCard
              index={1}
              total={ECOSYSTEM_STACK_COUNT}
              progress={ecosystemStackProgress}
              label="Abhijat Marathi Studios"
            >
              <div
                className={styles.ecosystemBlock}
                data-tone="dark"
                data-section="studios"
              >
                <EcosystemHeader
                  title="Abhijat Marathi Studios"
                  description="Established Abhijat Marathi Distribution Studio as a Marathi-focused distribution initiative."
                  href="/services"
                  tone="dark"
                />

                <section
                  ref={studioRef}
                  className={styles.studioShowcase}
                  aria-labelledby="connecting-dots-heading"
                >
                  <motion.figure
                    className={styles.studioPrimary}
                    style={{ y: studioPrimaryY }}
                    initial={reduceMotion ? false : { opacity: 0, x: -140 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.28 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Image
                      src="/images/careers/slideimg4.jpg"
                      alt="Film crew operating a cinema camera"
                      fill
                      loading="lazy"
                      sizes="(max-width: 767px) 78vw, 34vw"
                      className={styles.studioImage}
                    />
                  </motion.figure>

                  <div className={styles.studioHeadingPosition}>
                    <motion.div
                      className={styles.studioHeadingParallax}
                      style={{ y: studioHeadingY }}
                    >
                      <motion.h3
                        id="connecting-dots-heading"
                        initial={reduceMotion ? false : { opacity: 0, y: 96 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.82,
                          ease: [0.22, 1, 0.36, 1],
                          delay: reduceMotion ? 0 : 0.08,
                        }}
                      >
                        Connecting
                        <br />
                        the dots
                      </motion.h3>
                    </motion.div>
                  </div>

                  <motion.figure
                    className={styles.studioSecondary}
                    style={{ y: studioSecondaryY }}
                    initial={reduceMotion ? false : { opacity: 0, x: 140 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.28 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.9,
                      ease: [0.22, 1, 0.36, 1],
                      delay: reduceMotion ? 0 : 0.05,
                    }}
                  >
                    <Image
                      src="/images/landing/client/Image3.png"
                      alt="Singer recording music in a studio"
                      fill
                      loading="lazy"
                      sizes="(max-width: 767px) 42vw, 18vw"
                      className={styles.studioImage}
                    />
                  </motion.figure>
                </section>
              </div>
            </EcosystemStackCard>

            {/* =================================================
                03 — ABHIJAT MARATHI AI
                ================================================= */}
            <EcosystemStackCard
              index={2}
              total={ECOSYSTEM_STACK_COUNT}
              progress={ecosystemStackProgress}
              label="Abhijat Marathi AI"
            >
              <div
                className={styles.ecosystemBlock}
                data-tone="light"
                data-section="ai"
              >
                <EcosystemHeader
                  title="Abhijat Marathi AI"
                  description="Exploring AI-powered technologies for Marathi content, including discovery, translation, metadata, archiving and next-generation digital experiences. Announced technology/content collaborations involving Zee and Laminar AI."
                  href="/services"
                />

                <div className={styles.aiPartners}>
                  <IntersectionReveal className={styles.aiPartnerCard}>
                    <div className={styles.aiBrandLockup}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/landing/partners/abhijaat-marathi.png"
                        alt="Abhijat Marathi"
                        className={styles.aiAbhijatLogo}
                        loading="lazy"
                      />
                      <span
                        className={styles.aiBrandDivider}
                        aria-hidden="true"
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/landing/partners/z-marathi.png"
                        alt="Z Marathi"
                        className={styles.aiZMarathiLogo}
                        loading="lazy"
                      />
                    </div>
                    <p>Abhijat Marathi Partnered with Zee ecosystem.</p>
                  </IntersectionReveal>

                  <IntersectionReveal className={styles.aiPartnerCard}>
                    <div className={styles.aiBrandLockup}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/landing/partners/abhijaat-marathi.png"
                        alt="Abhijat Marathi"
                        className={styles.aiAbhijatLogo}
                        loading="lazy"
                      />
                      <span
                        className={styles.aiBrandDivider}
                        aria-hidden="true"
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/landing/partners/laminar.png"
                        alt="Laminar"
                        className={styles.aiLaminarLogo}
                        loading="lazy"
                      />
                    </div>
                    <p>Abhijat Marathi Partnered with Laminar AI ecosystem.</p>
                  </IntersectionReveal>
                </div>
              </div>
            </EcosystemStackCard>

            {/* =================================================
                04 — ABHIJAT MARATHI FILMY
                ================================================= */}
            <EcosystemStackCard
              index={3}
              total={ECOSYSTEM_STACK_COUNT}
              progress={ecosystemStackProgress}
              label="Abhijat Marathi Filmy"
            >
              <div
                className={styles.ecosystemBlock}
                data-tone="warm"
                data-section="filmy"
              >
                <EcosystemHeader
                  title="Abhijat Marathi Filmy"
                  description="A dedicated film-focused initiative bringing Marathi cinema, Filmy thoughts, stories, Celebrity bytes, Real talks and more — made for hearts that feel cinema."
                  href="/portfolio"
                  tone="warm"
                  ctaLabel="Watch"
                />
                <MediaRail
                  items={FILMY_IMAGES}
                  label="Abhijat Marathi Filmy highlights"
                  tone="warm"
                  showFilmyControls
                />
              </div>
            </EcosystemStackCard>
          </div>
        </div>
      </section>

      <section
        ref={finalCtaRef}
        className={styles.finalCta}
        aria-labelledby="partner-final-cta-heading"
      >
        <motion.div
          className={styles.finalCtaImageWrap}
          style={{ scale: ctaScale }}
          aria-hidden="true"
        >
          <Image
            src="/images/Join as.png"
            alt=""
            fill
            loading="lazy"
            sizes="100vw"
            className={styles.finalCtaImage}
          />
        </motion.div>
        <div className={styles.finalCtaShade} aria-hidden="true" />

        <IntersectionReveal className={styles.finalCtaCopy}>
          <h2 id="partner-final-cta-heading">
            Have a story worth telling? Let&apos;s bring it to the world.
          </h2>
          <TextLink href="/contact?type=partnership">Join as a Partner</TextLink>
        </IntersectionReveal>
      </section>
    </main>
  );
}
