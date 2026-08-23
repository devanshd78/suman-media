"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CmsHeroSlide } from "@/types/cms";

/*
 * These local images are development-only safety content so the landing page
 * remains easy to work on before Sanity is populated. Production should be
 * driven by Home Page -> Hero slides in Sanity.
 */
const DEVELOPMENT_FALLBACK_SLIDES: CmsHeroSlide[] = [
  {
    _key: "fallback-1",
    eyebrow: "Digital Entertainment & Platform",
    heading: "Abhijat Marathi OTT",
    description:
      "From India's dedicated Marathi OTT platform to AI-powered media technologies, original content production, government communications, live experiences, and strategic partnerships, we create, distribute, and scale entertainment for the digital era.",
    imageUrl: "/images/landing/hero/Image1.png",
    cta: { label: "Explore Abhijat Marathi", href: "/companies" },
  },
  {
    _key: "fallback-2",
    eyebrow: "Events & Experiences",
    heading: "Designing Experiences Beyond the Screen",
    description:
      "Concerts, cultural festivals, corporate events, launches and public experiences built to connect brands, institutions and audiences.",
    imageUrl: "/images/landing/hero/Image2.jpg",
    cta: { label: "Explore Experiences", href: "/services" },
  },
  {
    _key: "fallback-3",
    eyebrow: "Music & Audio",
    heading: "Building a Connected Music Ecosystem",
    description:
      "Original songs, soundtracks, music videos, publishing, distribution and royalty management for the digital era.",
    imageUrl: "/images/landing/hero/Image3.jpg",
    cta: { label: "Explore Music & Audio", href: "/services" },
  },
];

const SLIDE_INTERVAL_MS = 6000;

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path d="M8.5 6.5v11M15.5 6.5v11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path d="m9 7 8 5-8 5V7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
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

type HeroSectionProps = {
  slides?: CmsHeroSlide[];
};

export function HeroSection({ slides = [] }: HeroSectionProps) {
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
          <h1 className="max-w-5xl text-[clamp(2.75rem,6vw,6rem)] font-semibold leading-[0.96] tracking-[-0.04em]">
            Building India&apos;s next generation media ecosystem
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Suman featured platforms and capabilities"
      className="landing-section-transition relative flex min-h-[100svh] w-full flex-col items-center justify-end overflow-hidden bg-[#110d08] px-[clamp(1.5rem,3.8vw,5rem)] pb-[clamp(3rem,5vw,5.5rem)] pt-[clamp(7rem,10vh,9rem)]"
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
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.18)_56%,rgba(0,0,0,0.76)_100%)]" />
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(101.5%_87.32%_at_53.02%_2.59%,rgba(0,0,0,0)_67.04%,rgba(0,0,0,0.65)_88.52%)]"
      />

      {heroSlides.length > 1 ? (
        <button
          type="button"
          onClick={() => setIsPlaying((state) => !state)}
          aria-label={isPlaying ? "Pause hero slideshow" : "Play hero slideshow"}
          aria-pressed={!isPlaying}
          className="absolute right-[clamp(1.5rem,3.8vw,5rem)] top-[clamp(6rem,10vh,8rem)] z-30 inline-flex items-center justify-center rounded-full bg-[rgba(0,13,77,0.45)] p-[clamp(0.65rem,0.8vw,0.85rem)] text-white backdrop-blur-sm transition-colors hover:bg-[rgba(0,13,77,0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      ) : null}

      <div className="relative z-20 mx-auto flex w-full max-w-[83rem] flex-col items-start justify-end gap-[clamp(0.75rem,1.2vw,1rem)] text-white">
        <p className="text-[clamp(0.68rem,0.72vw,0.85rem)] font-semibold uppercase tracking-[0.04em] text-white/90">
          {String(activeSlide + 1).padStart(2, "0")}. {currentSlide.eyebrow}
        </p>

        <h1 className="max-w-[min(78rem,90vw)] text-[clamp(2.5rem,4vw,5rem)] font-medium leading-[0.98] tracking-[-0.035em]">
          {currentSlide.heading}
        </h1>

        <p className="max-w-[min(76rem,88vw)] text-[clamp(0.95rem,1.15vw,1.3rem)] leading-[1.55] text-white/75">
          {currentSlide.description}
        </p>

        {currentSlide.cta?.label && currentSlide.cta.href ? (
          <Link
            href={currentSlide.cta.href}
            className="mt-[clamp(0.5rem,1vw,1rem)] inline-flex items-center gap-2 text-[clamp(0.9rem,1vw,1.15rem)] font-semibold text-white transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span>{currentSlide.cta.label}</span>
            <ArrowRightIcon />
          </Link>
        ) : null}
      </div>

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
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/20" />
                <span
                  className={`absolute inset-x-0 bottom-0 h-[2px] origin-left transition-transform duration-500 ${
                    activeSlide === index
                      ? "scale-x-100 bg-[#d69d18]"
                      : "scale-x-0 bg-white/70 group-hover:scale-x-100"
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
