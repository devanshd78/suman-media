"use client";

import { getImageProps } from "next/image";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Exo_2, Inter } from "next/font/google";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";

import { HeritageDepthField, Premium3DSurface } from "@/components/motion/premium-3d";
import type { CmsHeroSlide } from "@/types/cms";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["500", "600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

/* Development-only safety content. Sanity remains the source of truth. */
const DEVELOPMENT_FALLBACK_SLIDES: CmsHeroSlide[] = [
  {
    _key: "fallback-1",
    eyebrow: "DIGITAL ENTERTAINMENT & PLATFORM",
    heading: "Abhijat Marathi OTT",
    description:
      "From India's dedicated Marathi OTT platform to AI-powered media technologies, original content production, government communications, live experiences, and strategic partnerships, we create, distribute, and scale entertainment for the digital era.",
    imageUrl: "/images/landing/hero/Image1.png",
    badgeUrl: "/images/abhijat-logo.png",
    badgeAlt: "Abhijat Marathi OTT",
    downloadTitle: "Abhijat Marathi OTT",
    downloadCaption: "SCAN TO DOWNLOAD",
    cta: { label: "Explore Abhijat Marathi", href: "/companies", style: "text" },
  },
  {
    _key: "fallback-2",
    eyebrow: "EVENTS & EXPERIENCES",
    heading: "Designing Experiences Beyond the Screen",
    description:
      "Concerts, cultural festivals, corporate events, launches and public experiences built to connect brands, institutions and audiences.",
    imageUrl: "/images/landing/hero/Image2.jpg",
    cta: { label: "Explore Experiences", href: "/services", style: "text" },
  },
  {
    _key: "fallback-3",
    eyebrow: "MUSIC & AUDIO ECOSYSTEM",
    heading: "Building India's Next Music Library",
    description:
      "Original songs, soundtracks, music videos, publishing, distribution and royalty management for the digital era.",
    imageUrl: "/images/landing/hero/Image3.jpg",
    cta: { label: "Explore Music & Audio", href: "/services", style: "text" },
  },
];

const SLIDE_INTERVAL_MS = 6000;

const WebGLHeritageScene = dynamic(
  () =>
    import("@/components/motion/webgl-heritage-scene").then(
      (module) => module.WebGLHeritageScene,
    ),
  { ssr: false },
);

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={className} fill="none">
      <path
        d="M4 10h11M11 6l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none">
      <path d="M8.5 6.5v11M15.5 6.5v11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none">
      <path d="m9 7 8 5-8 5V7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
      <path d="m4.5 4.5 7 7M11.5 4.5l-7 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function HeroImage({ slide, eager }: { slide: CmsHeroSlide; eager: boolean }) {
  const desktop = getImageProps({
    src: slide.imageUrl,
    alt: "",
    width: 2400,
    height: 1350,
    sizes: "100vw",
    quality: 88,
    loading: eager ? "eager" : "lazy",
    fetchPriority: eager ? "high" : "auto",
  }).props;

  if (!slide.mobileImageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...desktop}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full select-none object-cover object-center"
      />
    );
  }

  const mobile = getImageProps({
    src: slide.mobileImageUrl,
    alt: "",
    width: 900,
    height: 1200,
    sizes: "100vw",
    quality: 84,
    loading: eager ? "eager" : "lazy",
    fetchPriority: eager ? "high" : "auto",
  }).props;

  return (
    <picture aria-hidden="true">
      <source media="(max-width: 767px)" srcSet={mobile.srcSet} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...desktop}
        alt=""
        className="absolute inset-0 h-full w-full select-none object-cover object-center"
      />
    </picture>
  );
}

export function HeroSection({ slides = [] }: { slides?: CmsHeroSlide[] }) {
  const reduceMotion = useReducedMotion();
  const cmsSlides = slides.filter(
    (slide) => Boolean(slide?.heading?.trim() && slide?.imageUrl),
  );

  const heroSlides =
    cmsSlides.length > 0
      ? cmsSlides
      : process.env.NODE_ENV === "development"
        ? DEVELOPMENT_FALLBACK_SLIDES
        : [];

  const [rawActiveSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dismissedPromoKeys, setDismissedPromoKeys] = useState<string[]>([]);

  const activeSlide = rawActiveSlide < heroSlides.length ? rawActiveSlide : 0;
  const currentSlide = heroSlides[activeSlide];

  useEffect(() => {
    if (!isPlaying || heroSlides.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setActiveSlide((index) => (index + 1) % heroSlides.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [heroSlides.length, isPlaying]);

  if (!currentSlide) {
    return (
      <section className="landing-section-transition flex min-h-[72svh] items-end bg-[#110d08] px-5 pb-16 pt-32 text-white sm:px-8 lg:px-[3.5rem]">
        <div className="w-full">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
            Suman Entertainment &amp; Media
          </p>
          <h1 className={`${exo2.className} max-w-5xl text-[clamp(2.75rem,6vw,6rem)] font-semibold leading-[0.96] tracking-[-0.04em]`}>
            Building India&apos;s next generation media ecosystem
          </h1>
        </div>
      </section>
    );
  }

  const promoVisible =
    Boolean(currentSlide.qrCodeUrl) &&
    !dismissedPromoKeys.includes(currentSlide._key);
  const downloadHref = currentSlide.downloadHref?.trim() || null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Suman featured platforms and capabilities"
      className="landing-section-transition paithani-edge relative flex min-h-[100svh] w-full flex-col items-center justify-end overflow-hidden bg-[#090708] px-5 pb-[clamp(3.75rem,6vw,6rem)] pt-28 text-white sm:px-8 sm:pt-32 lg:px-[3.5rem]"
    >
      {/* CINEMATIC IMAGE DECK */}
      <div className="absolute inset-0" aria-hidden="true">
        {heroSlides.map((slide, index) => {
          const active = index === activeSlide;
          return (
            <motion.div
              key={slide._key}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: active ? 1 : 0,
                scale: reduceMotion ? 1 : active ? 1.015 : 1.075,
                x: reduceMotion ? 0 : active ? 0 : index % 2 === 0 ? 18 : -18,
              }}
              transition={{
                opacity: { duration: reduceMotion ? 0 : 0.9, ease: "easeOut" },
                scale: { duration: reduceMotion ? 0 : 6.2, ease: [0.22, 1, 0.36, 1] },
                x: { duration: reduceMotion ? 0 : 1.15, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <HeroImage slide={slide} eager={index === 0} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.05)_42%,rgba(0,0,0,0.86)_100%)]" />
              <div className="hero-heritage-grade absolute inset-0" />
            </motion.div>
          );
        })}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(105%_92%_at_52%_0%,rgba(0,0,0,0)_58%,rgba(0,0,0,0.62)_100%)]"
      />

      {/*
        REAL WEBGL DEPTH LAYER
        Three.js + React Three Fiber render the floating Maharashtra-inspired
        geometry. GSAP choreographs scene changes when the CMS hero slide changes.
      */}
      <WebGLHeritageScene
        activeSlide={activeSlide}
        reducedMotion={Boolean(reduceMotion)}
        className="z-[6] opacity-90"
      />

      {/* CSS/Framer fallback detail remains intentionally subtle. */}
      <HeritageDepthField className="z-[7] opacity-25" tone="dark" />
      <div aria-hidden="true" className="depth-horizon-grid z-[8]" />

      {/* Gold/Paithani-inspired threads: abstract cultural DNA, not literal decoration. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[6.5rem] z-10 hidden h-px lg:block">
        <motion.span
          key={`thread-${currentSlide._key}`}
          className="absolute left-[3.5rem] right-[3.5rem] h-px origin-left bg-[linear-gradient(90deg,rgba(226,187,95,0.72),rgba(226,187,95,0.08),transparent)]"
          initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.25, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div
        aria-hidden="true"
        className={`${inter.className} pointer-events-none absolute right-[1.1rem] top-1/2 z-10 hidden -translate-y-1/2 text-[0.52rem] font-semibold uppercase tracking-[0.32em] text-white/16 [writing-mode:vertical-rl] xl:block`}
      >
        महाराष्ट्र · कथा · संगीत · चित्र · तंत्रज्ञान
      </div>

      {currentSlide.badgeUrl ? (
        <Premium3DSurface
          className="absolute left-5 top-[5.75rem] z-20 h-[4.6rem] w-[4.6rem] sm:left-8 sm:top-[6.75rem] sm:h-[5.25rem] sm:w-[5.25rem] lg:left-[3.5rem] lg:top-[7.5rem]"
          surfaceClassName="rounded-[1.1rem]"
          intensity={7}
          lift={7}
          glare={false}
        >
          <motion.div
            key={`badge-${currentSlide._key}`}
            className="relative h-full w-full [transform:translateZ(44px)]"
            initial={reduceMotion ? false : { opacity: 0, y: -12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={currentSlide.badgeUrl}
              alt={currentSlide.badgeAlt?.trim() || ""}
              fill
              sizes="84px"
              className="object-contain object-left-top drop-shadow-[0_1rem_2rem_rgba(0,0,0,0.24)]"
            />
          </motion.div>
        </Premium3DSurface>
      ) : null}

      {heroSlides.length > 1 ? (
        <button
          type="button"
          onClick={() => setIsPlaying((state) => !state)}
          aria-label={isPlaying ? "Pause hero slideshow" : "Play hero slideshow"}
          aria-pressed={!isPlaying}
          className="premium-glass absolute right-5 top-[5.75rem] z-30 inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-105 hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8 sm:top-[6.75rem] sm:h-12 sm:w-12 lg:right-[3.5rem] lg:top-[7.5rem]"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      ) : null}

      {/* COPY DECK — layered in 3D without turning live text into graphics */}
      <div className="relative z-20 flex w-full flex-col items-start justify-end [perspective:1500px] [transform-style:preserve-3d]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentSlide._key}
            className="w-full"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 34, filter: "blur(10px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, y: -22, filter: "blur(6px)" }
            }
            transition={{ duration: reduceMotion ? 0 : 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className={`${inter.className} premium-3d-layer inline-flex w-fit items-center rounded-full border border-[#E2BB5F]/25 bg-black/20 px-3 py-1.5 text-[0.62rem] font-semibold uppercase leading-4 tracking-[0.09em] text-[#F2D28A] backdrop-blur-md sm:text-[0.68rem]`}
              initial={reduceMotion ? false : { opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.58, delay: 0.08 }}
            >
              {String(activeSlide + 1).padStart(2, "0")}. {currentSlide.eyebrow}
            </motion.p>

            <h1
              className={`${exo2.className} premium-display premium-3d-layer-deep mt-4 max-w-[74rem] overflow-hidden text-[clamp(2.6rem,5vw,5.3rem)] font-medium leading-[0.94] tracking-[-0.052em] [text-shadow:0_1.2rem_3.5rem_rgba(0,0,0,0.34)]`}
              style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
            >
              <motion.span
                className="inline-block"
                initial={reduceMotion ? false : { y: "105%", rotate: 1.2 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.86, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {currentSlide.heading}
              </motion.span>
            </h1>

            <motion.p
              className={`${inter.className} premium-3d-layer mt-5 max-w-[72rem] text-[clamp(0.9rem,1.05vw,1.12rem)] leading-[1.55] text-white/76 lg:pr-[17rem]`}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.72, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {currentSlide.description}
            </motion.p>

            {currentSlide.cta?.label && currentSlide.cta.href ? (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.32 }}
              >
                <Link
                  href={currentSlide.cta.href}
                  className={`${inter.className} kinetic-link group mt-6 inline-flex items-center gap-2 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-[0.95rem]`}
                >
                  <span>{currentSlide.cta.label}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    <ArrowRightIcon />
                  </span>
                </Link>
              </motion.div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {promoVisible ? (
        <Premium3DSurface
          className="absolute bottom-8 right-8 z-30 hidden md:block lg:bottom-10 lg:right-[3.5rem]"
          surfaceClassName="rounded-[1rem]"
          intensity={5}
          lift={9}
          perspective={1100}
        >
          <motion.div
            key={`promo-${currentSlide._key}`}
            initial={reduceMotion ? false : { opacity: 0, x: 24, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
          <div className="premium-3d-shadow relative flex min-h-[6.6rem] w-[15.5rem] items-center gap-3 rounded-[1rem] border border-[#E2BB5F]/30 bg-[#F8F1E5]/95 p-3 pr-4 text-[#21170F] backdrop-blur-md lg:w-[16.75rem] [transform-style:preserve-3d]">
            <div className="relative h-[5.1rem] w-[5.1rem] shrink-0 overflow-hidden bg-white">
              <Image
                src={currentSlide.qrCodeUrl!}
                alt={currentSlide.qrCodeAlt?.trim() || "Download QR code"}
                fill
                sizes="82px"
                className="object-contain"
              />
            </div>

            <div className={`${inter.className} min-w-0`}>
              <p className="text-[0.72rem] font-semibold leading-5">
                {currentSlide.downloadTitle?.trim() || currentSlide.heading}
              </p>
              <p className="mt-2 text-[0.62rem] font-medium uppercase leading-[0.9rem] tracking-[0.02em] text-[#6D5537]">
                {currentSlide.downloadCaption?.trim() || "SCAN TO DOWNLOAD"}
              </p>
              {downloadHref ? (
                <Link
                  href={downloadHref}
                  aria-label={`Open ${currentSlide.downloadTitle?.trim() || currentSlide.heading}`}
                  className="absolute inset-0 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                />
              ) : null}
            </div>

            <button
              type="button"
              aria-label="Dismiss download card"
              onClick={() =>
                setDismissedPromoKeys((keys) =>
                  keys.includes(currentSlide._key) ? keys : [...keys, currentSlide._key],
                )
              }
              className="absolute -right-2 -top-2 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F8F1E5] text-[#745637] shadow-md transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <CloseIcon />
            </button>
          </div>
          </motion.div>
        </Premium3DSurface>
      ) : null}

      {heroSlides.length > 1 ? (
        <div className="absolute bottom-0 left-0 z-30 w-full" role="group" aria-label="Hero slides">
          <div
            className="grid w-full"
            style={{ gridTemplateColumns: `repeat(${heroSlides.length}, minmax(0, 1fr))` }}
          >
            {heroSlides.map((slide, index) => (
              <button
                key={slide._key}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Show hero slide ${index + 1}: ${slide.heading}`}
                aria-current={activeSlide === index ? "true" : undefined}
                className="group relative h-4 w-full cursor-pointer"
              >
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/18" />
                {activeSlide === index ? (
                  <span
                    key={`${slide._key}-${activeSlide}`}
                    className="hero-progress absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#D4AA43]"
                    style={{
                      animationDuration: `${SLIDE_INTERVAL_MS}ms`,
                      animationPlayState: isPlaying ? "running" : "paused",
                    }}
                  />
                ) : (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-white/60 transition-transform duration-500 group-hover:scale-x-100" />
                )}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <style>{`
        @keyframes heroProgressFill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .hero-progress {
          animation-name: heroProgressFill;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-progress { animation: none !important; transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
