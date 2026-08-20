"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const HERO_IMAGES = [
  "/images/landing/hero/Image1.png",
  "/images/landing/hero/Image2.jpg",
  "/images/landing/hero/Image3.jpg",
  "/images/landing/hero/Image4.jpg",
  "/images/landing/hero/Image5.jpg",
] as const;

const SLIDE_INTERVAL_MS = 6000;

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

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [isPlaying]);

  return (
    <section
      aria-label="Suman featured platform"
      className="relative mx-auto flex min-h-[46rem] w-full max-w-[90rem] flex-col items-center justify-end gap-10 overflow-hidden bg-[#110d08] p-6 sm:p-8 lg:h-[58.5rem] lg:p-[3.5rem]"
    >
      <div className="absolute inset-0" aria-hidden="true">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-out ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.18) 56%, rgba(0, 0, 0, 0.72) 100%), url("${image}")`,
            }}
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(101.5% 87.32% at 53.02% 2.59%, rgba(0, 0, 0, 0) 67.04%, rgba(0, 0, 0, 0.65) 88.52%)",
        }}
      />

      <button
        type="button"
        onClick={() => setIsPlaying((currentState) => !currentState)}
        aria-label={isPlaying ? "Pause hero slideshow" : "Play hero slideshow"}
        aria-pressed={!isPlaying}
        className="absolute right-4 top-[6.25rem] z-30 inline-flex items-start gap-2 rounded-[3rem] border-0 bg-[rgba(0,13,77,0.45)] p-3 text-white backdrop-blur-sm transition-colors hover:bg-[rgba(0,13,77,0.65)] sm:right-8"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      <div className="relative z-20 flex w-full flex-col items-start justify-end gap-4 pb-4 text-white sm:pb-6 lg:pb-10">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-white/90">
          01. Digital Entertainment &amp; Platform
        </p>

        <h1 className="max-w-4xl text-[2.25rem] font-medium leading-[1.02] tracking-[-0.035em] sm:text-[3rem] lg:text-[3.5rem]">
          Abhijat Marathi OTT
        </h1>

        <p className="max-w-[68rem] text-sm leading-6 text-white/75 sm:text-base">
          From India&apos;s dedicated Marathi OTT platform to AI-powered media technologies, original content production,
          government communications, live experiences, and strategic partnerships, we create, distribute, and scale
          entertainment for the digital era.
        </p>

        <Link
          href="#abhijat-marathi"
          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white transition-opacity hover:opacity-75"
        >
          <span>Explore Abhijat Marathi</span>
          <ArrowRightIcon />
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 z-30 flex w-full max-w-[90rem] flex-col items-start gap-4" aria-label="Hero slides">
        <div className="grid w-full grid-cols-5 gap-0">
          {HERO_IMAGES.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Show hero slide ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
              className="group relative h-3 w-full cursor-pointer"
            >
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/20" />
              <span
                className={`absolute inset-x-0 bottom-0 h-[2px] origin-left transition-transform duration-500 ${
                  activeSlide === index ? "scale-x-100 bg-[#d69d18]" : "scale-x-0 bg-white/70 group-hover:scale-x-100"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}