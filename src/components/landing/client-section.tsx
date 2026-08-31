"use client";

import Image from "next/image";
import Link from "next/link";
import { plusJakartaSans as plusJakarta } from "@/lib/fonts";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  id: number;
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  watchHref?: string;
  learnHref?: string;
};

const SLIDES: Slide[] = [
  {
    id: 1,
    image: "/images/landing/client/Image1.png",
    eyebrow: "01. EVENT & EXPERIENCES",
    title: "Experiences Beyond the Screen",
    description:
      "Delivering concerts, cultural festivals, corporate events, product launches, and large-scale public experiences that connect brands with audiences.",
    watchHref: "#",
    learnHref: "#",
  },
  {
    id: 2,
    image: "/images/landing/client/Image2.png",
    eyebrow: "02. MEDIA & ENTERTAINMENT",
    title: "Stories Built for Every Screen",
    description:
      "Creating entertainment-led formats, campaigns, and media experiences designed to move seamlessly across platforms and audiences.",
    watchHref: "#",
    learnHref: "#",
  },
  {
    id: 3,
    image: "/images/landing/client/Image3.png",
    eyebrow: "03. DIGITAL & INTERACTIVE",
    title: "Interactive Experiences That Connect",
    description:
      "Building digital-first experiences that combine content, culture, technology, and participation to create stronger audience engagement.",
    watchHref: "#",
    learnHref: "#",
  },
];

const AUTOPLAY_MS = 5200;
const SLIDE_GAP_PX = 40;

function ArrowLeftIcon({ disabled = false }: { disabled?: boolean }) {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M15 18L9 12L15 6"
        stroke={disabled ? "rgba(143,108,26,0.35)" : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon({ disabled = false }: { disabled?: boolean }) {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M9 18L15 12L9 6"
        stroke={disabled ? "rgba(143,108,26,0.35)" : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmallArrowRight({ inverse = false }: { inverse?: boolean }) {
  return (
    <svg aria-hidden="true" width="8" height="14" viewBox="0 0 8 14" fill="none" className="h-3 w-1.5 shrink-0">
      <path
        d="M1 13L7 7L1 1"
        stroke={inverse ? "white" : "rgba(143,108,26,0.8)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect x="7.5" y="5.5" width="3" height="13" rx="1.5" fill="white" />
      <rect x="13.5" y="5.5" width="3" height="13" rx="1.5" fill="white" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M9 7.5L17 12L9 16.5V7.5Z" fill="white" />
    </svg>
  );
}

function HeaderText() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-w-0 flex-1">
      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="self-stretch text-[0.875rem] font-semibold leading-[1.25rem] text-[#B8B8B8] [font-feature-settings:'liga'_off,'clig'_off]"
      >
        BUSINESS ECOSYSTEM
      </motion.p>

      <motion.h2
        id="clients-heading"
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: 0.62, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="mt-1 self-stretch text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.03125rem] text-[#1A1A1A] md:text-[2.5rem] md:leading-[3rem]"
      >
        One platform, a universe of entertainment
      </motion.h2>
    </div>
  );
}

function Navigation({
  activeIndex,
  onPrevious,
  onNext,
}: {
  activeIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === SLIDES.length - 1;

  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirst}
        aria-label="Previous slide"
        className={[
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6C1A]/40",
          isFirst
            ? "cursor-not-allowed bg-[rgba(143,108,26,0.05)]"
            : "bg-[#8F6C1A] hover:bg-[#806016]",
        ].join(" ")}
      >
        {isFirst ? <ArrowLeftIcon disabled /> : <ArrowLeftIcon />}
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={isLast}
        aria-label="Next slide"
        className={[
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6C1A]/40",
          isLast
            ? "cursor-not-allowed bg-[rgba(143,108,26,0.05)]"
            : "bg-[#8F6C1A] hover:bg-[#806016]",
        ].join(" ")}
      >
        <ArrowRightIcon disabled={isLast} />
      </button>
    </div>
  );
}

function SlideCard({
  slide,
  isActive,
  isPlaying,
  onTogglePlayback,
}: {
  slide: Slide;
  isActive: boolean;
  isPlaying: boolean;
  onTogglePlayback: () => void;
}) {
  return (
    <article aria-hidden={!isActive} className="w-full shrink-0 overflow-hidden rounded-[0.25rem] bg-white">
      <div className="flex w-full flex-col items-center gap-10">
        <div className="relative flex h-[24rem] w-full flex-col items-center justify-end overflow-hidden rounded-[0.25rem] bg-[#111] sm:h-[30rem] lg:h-[37.375rem]">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={slide.id === 1}
            sizes="(max-width: 768px) 92vw, 74.3125rem"
            className="object-cover"
          />

          <button
            type="button"
            onClick={onTogglePlayback}
            aria-label={isPlaying ? "Pause slider autoplay" : "Play slider autoplay"}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-white bg-black/5 backdrop-blur-[1px] transition-colors hover:bg-black/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:right-[2.53125rem] sm:top-[2.55981rem]"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>

        <div className="flex min-h-[12.5rem] w-full flex-col justify-center gap-8 px-4 pb-4 sm:px-0 lg:flex-row lg:items-center lg:gap-14">
          <div className="min-w-0 flex-1">
            <p className="text-[0.875rem] font-semibold leading-[1.25rem] text-[#B8B8B8] [font-feature-settings:'liga'_off,'clig'_off]">
              {slide.eyebrow}
            </p>

            <h3 className="mt-1 text-[1.75rem] font-bold leading-[2.25rem] text-[#1A1A1A] [font-feature-settings:'liga'_off,'clig'_off] md:text-[2rem] md:leading-[2.5rem]">
              {slide.title}
            </h3>

            <p className="mt-3 max-w-[47rem] text-[1rem] font-normal leading-[1.5rem] text-[#B8B8B8] [font-feature-settings:'liga'_off,'clig'_off] md:text-[1.25rem] md:leading-[1.75rem]">
              {slide.description}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {slide.watchHref && (
              <Link
                href={slide.watchHref}
                tabIndex={isActive ? 0 : -1}
                className="inline-flex items-center justify-center gap-1 rounded-lg bg-[#8F6C1A] px-4 py-4 text-[0.875rem] font-semibold leading-5 text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6C1A]/40"
              >
                Watch now
                <SmallArrowRight inverse />
              </Link>
            )}

            {slide.learnHref && (
              <Link
                href={slide.learnHref}
                tabIndex={isActive ? 0 : -1}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#ECECEC] bg-white px-4 py-4 text-[0.875rem] font-semibold leading-5 text-[#1A1A1A] transition-colors hover:bg-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6C1A]/30"
              >
                Learn more
                <SmallArrowRight />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function ClientsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dimensions, setDimensions] = useState({
    slideWidth: 0,
    viewportWidth: 0,
  });

  const viewportRef = useRef<HTMLDivElement>(null);
  const firstSlideRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const goPrevious = useCallback(() => {
    setActiveIndex((current) => Math.max(0, current - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((current) => Math.min(SLIDES.length - 1, current + 1));
  }, []);

  useEffect(() => {
    if (!isPlaying || reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [isPlaying, reduceMotion]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const firstSlide = firstSlideRef.current;
    if (!viewport || !firstSlide) return;

    let frame = 0;

    const measure = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const next = {
          viewportWidth: viewport.clientWidth,
          slideWidth: firstSlide.offsetWidth,
        };

        setDimensions((current) =>
          current.viewportWidth === next.viewportWidth &&
          current.slideWidth === next.slideWidth
            ? current
            : next,
        );
      });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(firstSlide);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const trackX = useMemo(() => {
    const { slideWidth, viewportWidth } = dimensions;
    if (!slideWidth || !viewportWidth) return 0;

    return viewportWidth / 2 - slideWidth / 2 - activeIndex * (slideWidth + SLIDE_GAP_PX);
  }, [activeIndex, dimensions]);

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className={`${plusJakarta.className} landing-section-transition flex w-full flex-col items-center justify-end gap-[6.25rem] overflow-hidden bg-white py-[6.25rem]`}
    >
      <div className="flex w-full max-w-[74.3125rem] items-end justify-between gap-6 px-4 sm:px-6 lg:px-0">
        <HeaderText />
        <Navigation activeIndex={activeIndex} onPrevious={goPrevious} onNext={goNext} />
      </div>

      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Business ecosystem"
      >
        <motion.div
          className="flex items-start gap-10 will-change-transform"
          animate={{ x: trackX }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 115, damping: 22, mass: 0.9 }
          }
        >
          {SLIDES.map((slide, index) => (
            <motion.div
              key={slide.id}
              ref={index === 0 ? firstSlideRef : undefined}
              className="w-[calc(100vw-2rem)] max-w-[74.3125rem] shrink-0 sm:w-[calc(100vw-7rem)] lg:w-[74.3125rem]"
              animate={{
                opacity: index === activeIndex ? 1 : 0.78,
                scale: index === activeIndex ? 1 : 0.985,
              }}
              transition={{ duration: reduceMotion ? 0 : 0.35 }}
            >
              <SlideCard
                slide={slide}
                isActive={index === activeIndex}
                isPlaying={isPlaying}
                onTogglePlayback={() => setIsPlaying((value) => !value)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="-mt-14 flex items-center gap-2 lg:hidden">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
            className={[
              "h-2 rounded-full transition-all",
              index === activeIndex ? "w-6 bg-[#8F6C1A]" : "w-2 bg-[#D9D9D9]",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
}
