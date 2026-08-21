"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CmsHeroSlide } from "@/types/cms";

const FALLBACK_HERO_SLIDES: CmsHeroSlide[] = [
  {
    _key: "fallback-1",
    eyebrow: "Digital Entertainment & Platform",
    heading: "Abhijat Marathi OTT",
    description:
      "From India's dedicated Marathi OTT platform to AI-powered media technologies, original content production, government communications, live experiences, and strategic partnerships, we create, distribute, and scale entertainment for the digital era.",
    imageUrl: "/images/landing/hero/Image1.png",
    cta: {
      label: "Explore Abhijat Marathi",
      href: "#abhijat-marathi",
    },
  },
  {
    _key: "fallback-2",
    eyebrow: "Events & Experiences",
    heading: "Designing Experiences Beyond the Screen",
    description:
      "Delivering concerts, cultural festivals, corporate events, product launches, and large-scale public experiences that connect brands with audiences.",
    imageUrl: "/images/landing/hero/Image2.jpg",
    cta: {
      label: "Explore Experiences",
      href: "/services/live-experiences-events",
    },
  },
  {
    _key: "fallback-3",
    eyebrow: "Music & Audio Ecosystem",
    heading: "Building India's Next Music Library",
    description:
      "From original compositions and film soundtracks to digital publishing and royalty management, creating music that reaches audiences everywhere.",
    imageUrl: "/images/landing/hero/Image3.jpg",
    cta: {
      label: "Explore Music & Audio",
      href: "/services/music-audio-experiences",
    },
  },
  {
    _key: "fallback-4",
    eyebrow: "Content Creation",
    heading: "Creating Stories That Inspire Millions",
    description:
      "Producing feature films, web series, documentaries, branded content, and corporate communications with end-to-end production capabilities.",
    imageUrl: "/images/landing/hero/Image4.jpg",
    cta: {
      label: "Explore Content Production",
      href: "/services/media-content-production",
    },
  },
  {
    _key: "fallback-5",
    eyebrow: "Government & Strategic Communication",
    heading: "Empowering Public Communication at Scale",
    description:
      "Partnering with government institutions, public sector organizations, and enterprises to deliver impactful campaigns, citizen engagement, and strategic communication initiatives.",
    imageUrl: "/images/landing/hero/Image5.jpg",
    cta: {
      label: "Explore Strategic Communication",
      href: "/services/government-institutional-communications",
    },
  },
];

const SLIDE_INTERVAL_MS = 6000;

function PauseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
    >
      <path
        d="M8.5 6.5v11M15.5 6.5v11"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
    >
      <path
        d="m9 7 8 5-8 5V7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
    >
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

type HeroSectionProps = {
  slides?: CmsHeroSlide[];
};

export function HeroSection({ slides = [] }: HeroSectionProps) {
  const heroSlides =
    slides.length > 0 ? slides : FALLBACK_HERO_SLIDES;

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentSlide =
    heroSlides[activeSlide] ?? heroSlides[0];

  useEffect(() => {
    if (!isPlaying || heroSlides.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide(
        (currentSlideIndex) =>
          (currentSlideIndex + 1) % heroSlides.length,
      );
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [isPlaying, heroSlides.length]);

  useEffect(() => {
    if (activeSlide >= heroSlides.length) {
      setActiveSlide(0);
    }
  }, [activeSlide, heroSlides.length]);

  return (
    <section
      aria-label="Suman featured platform"
      className="
        relative
        flex
        min-h-[100svh]
        w-full
        flex-col
        items-center
        justify-end
        overflow-hidden
        bg-[#110d08]
        px-[clamp(1.5rem,3.8vw,5rem)]
        pb-[clamp(3rem,5vw,5.5rem)]
        pt-[clamp(7rem,10vh,9rem)]
      "
    >
      {/* Hero backgrounds */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
      >
        {heroSlides.map((slide, index) => (
          <div
            key={slide._key}
            className={`
              absolute
              inset-0
              bg-cover
              bg-center
              bg-no-repeat
              transition-opacity
              duration-700
              ease-out
              ${index === activeSlide
                ? "opacity-100"
                : "opacity-0"
              }
            `}
            style={{
              backgroundImage: `
                linear-gradient(
                  180deg,
                  rgba(0, 0, 0, 0.08) 0%,
                  rgba(0, 0, 0, 0.18) 56%,
                  rgba(0, 0, 0, 0.72) 100%
                ),
                url("${slide.imageUrl}")
              `,
            }}
          />
        ))}
      </div>

      {/* Additional vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(101.5% 87.32% at 53.02% 2.59%, rgba(0, 0, 0, 0) 67.04%, rgba(0, 0, 0, 0.65) 88.52%)",
        }}
      />

      {/* Pause / Play */}
      <button
        type="button"
        onClick={() =>
          setIsPlaying((currentState) => !currentState)
        }
        aria-label={
          isPlaying
            ? "Pause hero slideshow"
            : "Play hero slideshow"
        }
        aria-pressed={!isPlaying}
        className="
          absolute
          right-[clamp(1.5rem,3.8vw,5rem)]
          top-[clamp(6rem,10vh,8rem)]
          z-30
          inline-flex
          items-center
          justify-center
          rounded-full
          border-0
          bg-[rgba(0,13,77,0.45)]
          p-[clamp(0.65rem,0.8vw,0.85rem)]
          text-white
          backdrop-blur-sm
          transition-colors
          hover:bg-[rgba(0,13,77,0.65)]
        "
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      {/* Content */}
      <div
        className="
          relative
          z-20
          flex
          w-full
          flex-col
          items-start
          justify-end
          gap-[clamp(0.75rem,1.2vw,1rem)]
          text-white
        "
      >
        {/* Category */}
        <p
          className="
            text-[clamp(0.68rem,0.72vw,0.85rem)]
            font-semibold
            uppercase
            tracking-[0.04em]
            text-white/90
          "
        >
          {String(activeSlide + 1).padStart(2, "0")}.{" "}
          {currentSlide.eyebrow}
        </p>

        {/* Heading */}
        <h1
          className="
            max-w-[min(78rem,90vw)]
            text-[clamp(2.5rem,4vw,5rem)]
            font-medium
            leading-[0.98]
            tracking-[-0.035em]
          "
        >
          {currentSlide.heading}
        </h1>

        {/* Description */}
        <p
          className="
            max-w-[min(76rem,88vw)]
            text-[clamp(0.95rem,1.15vw,1.3rem)]
            leading-[1.55]
            text-white/75
          "
        >
          {currentSlide.description}
        </p>

        {/* CTA */}
        {currentSlide.cta?.label &&
          currentSlide.cta.href ? (
          <Link
            href={currentSlide.cta.href}
            className="
              mt-[clamp(0.5rem,1vw,1rem)]
              inline-flex
              items-center
              gap-2
              text-[clamp(0.9rem,1vw,1.15rem)]
              font-semibold
              text-white
              transition-opacity
              hover:opacity-75
            "
          >
            <span>{currentSlide.cta.label}</span>

            <ArrowRightIcon />
          </Link>
        ) : null}
      </div>

      {/* Slide navigation */}
      <div
        className="
          absolute
          bottom-0
          left-0
          z-30
          flex
          w-full
          flex-col
          items-start
        "
        aria-label="Hero slides"
      >
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: `repeat(${heroSlides.length}, minmax(0, 1fr))`,
          }}
        >
          {heroSlides.map((slide, index) => (
            <button
              key={slide._key}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Show hero slide ${index + 1}`}
              aria-current={
                activeSlide === index ? "true" : undefined
              }
              className="
                group
                relative
                h-3
                w-full
                cursor-pointer
              "
            >
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/20" />

              <span
                className={`
                  absolute
                  inset-x-0
                  bottom-0
                  h-[2px]
                  origin-left
                  transition-transform
                  duration-500
                  ${activeSlide === index
                    ? "scale-x-100 bg-[#d69d18]"
                    : "scale-x-0 bg-white/70 group-hover:scale-x-100"
                  }
                `}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}