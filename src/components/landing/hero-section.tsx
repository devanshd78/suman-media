"use client";

import { getImageProps } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";
import { useEffect, useState } from "react";

import type { CmsHeroSlide } from "@/types/cms";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["500", "600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

/*
 * Development-only safety content. Sanity remains the source of truth in
 * production, but keeping a local fallback makes the reference layout easy to
 * work on before the CMS is completely populated.
 */
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
        <div className="mx-auto w-full max-w-[83rem]">
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
      className="landing-section-transition relative flex min-h-[100svh] w-full flex-col items-center justify-end overflow-hidden bg-[#110d08] px-5 pb-[clamp(3.5rem,6vw,5.75rem)] pt-28 sm:px-8 sm:pt-32 lg:px-[3.5rem]"
    >
      <div className="absolute inset-0" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <div
            key={slide._key}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <HeroImage slide={slide} eager={index === 0} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.10)_50%,rgba(0,0,0,0.78)_100%)]" />
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(101.5%_87.32%_at_53.02%_2.59%,rgba(0,0,0,0)_64%,rgba(0,0,0,0.58)_100%)]"
      />

      {currentSlide.badgeUrl ? (
        <div className="absolute left-5 top-[5.75rem] z-20 h-[4.6rem] w-[4.6rem] sm:left-8 sm:top-[6.75rem] sm:h-[5.25rem] sm:w-[5.25rem] lg:left-[3.5rem] lg:top-[7.5rem]">
          <Image
            src={currentSlide.badgeUrl}
            alt={currentSlide.badgeAlt?.trim() || ""}
            fill
            sizes="84px"
            className="object-contain object-left-top"
          />
        </div>
      ) : null}

      {heroSlides.length > 1 ? (
        <button
          type="button"
          onClick={() => setIsPlaying((state) => !state)}
          aria-label={isPlaying ? "Pause hero slideshow" : "Play hero slideshow"}
          aria-pressed={!isPlaying}
          className="absolute right-5 top-[5.75rem] z-30 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8 sm:top-[6.75rem] sm:h-12 sm:w-12 lg:right-[3.5rem] lg:top-[7.5rem]"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      ) : null}

      <div className="relative z-20 mx-auto flex w-full max-w-[83rem] flex-col items-start justify-end text-white">
        <p className={`${inter.className} text-[0.66rem] font-semibold uppercase leading-4 tracking-[0.01em] text-white/92 sm:text-[0.72rem]`}>
          {String(activeSlide + 1).padStart(2, "0")}. {currentSlide.eyebrow}
        </p>

        <h1
          className={`${exo2.className} mt-3 max-w-[72rem] text-[clamp(2.5rem,4.3vw,4.35rem)] font-medium leading-[0.98] tracking-[-0.045em]`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        >
          {currentSlide.heading}
        </h1>

        <p className={`${inter.className} mt-5 max-w-[72rem] text-[clamp(0.9rem,1.05vw,1.12rem)] leading-[1.55] text-white/76 lg:pr-[16rem]`}>
          {currentSlide.description}
        </p>

        {currentSlide.cta?.label && currentSlide.cta.href ? (
          <Link
            href={currentSlide.cta.href}
            className={`${inter.className} group mt-6 inline-flex items-center gap-2 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-72 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-[0.95rem]`}
          >
            <span>{currentSlide.cta.label}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              <ArrowRightIcon />
            </span>
          </Link>
        ) : null}
      </div>

      {promoVisible ? (
        <div className="absolute bottom-8 right-8 z-30 hidden md:block lg:bottom-10 lg:right-[3.5rem]">
          <div className="relative flex min-h-[6.6rem] w-[15.5rem] items-center gap-3 rounded-xl bg-white p-3 pr-4 text-[#10182f] shadow-[0_1rem_2.5rem_rgba(0,0,0,0.22)] lg:w-[16.75rem]">
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
              <p className="mt-2 text-[0.62rem] font-medium uppercase leading-[0.9rem] tracking-[0.02em] text-[#34405f]">
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
              className="absolute -right-2 -top-2 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#69728a] shadow-md transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      ) : null}

      {heroSlides.length > 1 ? (
        <div className="absolute bottom-0 left-0 z-30 w-full" role="group" aria-label="Hero slides">
          <div
            className="mx-auto grid w-full max-w-[90rem]"
            style={{ gridTemplateColumns: `repeat(${heroSlides.length}, minmax(0, 1fr))` }}
          >
            {heroSlides.map((slide, index) => (
              <button
                key={slide._key}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Show hero slide ${index + 1}: ${slide.heading}`}
                aria-current={activeSlide === index ? "true" : undefined}
                className="group relative h-3 w-full cursor-pointer"
              >
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/18" />
                <span
                  className={`absolute inset-x-0 bottom-0 h-[2px] origin-left transition-transform duration-500 ${
                    activeSlide === index
                      ? "scale-x-100 bg-[#b68a16]"
                      : "scale-x-0 bg-white/65 group-hover:scale-x-100"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
