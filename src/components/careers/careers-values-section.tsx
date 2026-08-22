"use client";

import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { Exo_2, Inter } from "next/font/google";
import type { CmsCareersCulture } from "@/types/cms";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const FALLBACK_CULTURE_SLIDES = [
  {
    _key: "local-culture-01",
    title: "Curious nature",
    description: "Keep learning. Keep questioning.",
    imageUrl: "/images/careers/slideimg1.jpg",
    imageAlt: "A thoughtful young creative",
  },
  {
    _key: "local-culture-02",
    title: "Work ownership",
    description: "Take ideas from insight to impact.",
    imageUrl: "/images/careers/slideimg2.jpg",
    imageAlt: "A team member taking ownership of their work",
  },
  {
    _key: "local-culture-03",
    title: "Open collaboration",
    description: "Build with trust. Win together.",
    imageUrl: "/images/careers/slideimg3.jpg",
    imageAlt: "Colleagues collaborating openly",
  },
  {
    _key: "local-culture-04",
    title: "Creative courage",
    description: "Challenge convention. Move ideas forward.",
    imageUrl: "/images/careers/slideimg4.jpg",
    imageAlt: "A team turning creative ideas into action",
  },
] as const;

const SLIDE_PANEL_COLORS = [
  "#FFF9E8",
  "#E4F3FF",
  "#EAF8EF",
  "#F4ECFF",
] as const;

const rowClassName =
  "flex items-center justify-center gap-2 sm:gap-4 lg:gap-8 xl:gap-[3.5rem]";

function BlueCircle() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      fill="none"
      className="h-7 w-7 shrink-0 sm:h-12 sm:w-12 lg:h-20 lg:w-20 xl:h-[7.5rem] xl:w-[7.5rem]"
    >
      <circle cx="60" cy="60" r="60" fill="#006BFF" />
    </svg>
  );
}

function YellowSquare() {
  return (
    <span
      aria-hidden="true"
      className="h-7 w-7 shrink-0 rounded-[0.375rem] bg-[#FFDD15] sm:h-12 sm:w-12 sm:rounded-[0.625rem] lg:h-20 lg:w-20 lg:rounded-2xl xl:h-[7.5rem] xl:w-[7.5rem] xl:rounded-[1.4375rem]"
    />
  );
}

function OrangeTriangle() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 148 113"
      fill="none"
      className="h-7 w-9 shrink-0 sm:h-12 sm:w-16 lg:h-20 lg:w-28 xl:h-[7.5rem] xl:w-[10.375rem]"
    >
      <path
        d="M1.784 96.7448L65.4988 4.32399C69.4661 -1.43074 77.9626 -1.44377 81.9475 4.29876L146.081 96.7195C150.683 103.351 145.937 112.421 137.866 112.421H10.0171C1.95946 112.421 -2.78945 103.379 1.784 96.7448Z"
        fill="#FF8047"
      />
    </svg>
  );
}

function GreenStar() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 138 130"
      fill="none"
      className="h-[2.125rem] w-9 shrink-0 sm:h-[3.75rem] sm:w-16 lg:h-[7.5rem] lg:w-[7.75rem] xl:h-[11.5rem] xl:w-[11.875rem]"
    >
      <path
        d="M59.2977 6.81916C62.3483 -2.27299 75.2084 -2.273 78.2589 6.81915L87.8192 35.3136C89.1861 39.3875 93.0028 42.1327 97.2998 42.1327H127.538C137.303 42.1327 141.278 54.6922 133.292 60.3112L109.387 77.1309C105.769 79.6764 104.254 84.2964 105.661 88.4902L114.921 116.09C117.993 125.247 107.585 133.008 99.6861 127.45L74.5327 109.752C71.0808 107.323 66.4758 107.323 63.024 109.752L37.8705 127.45C29.9713 133.008 19.5633 125.247 22.6356 116.09L31.8958 88.4902C33.3029 84.2964 31.7874 79.6764 28.1696 77.1309L4.26435 60.3112C-3.72173 54.6922 0.253942 42.1327 10.0187 42.1327H40.2568C44.5539 42.1327 48.3706 39.3875 49.7374 35.3136L59.2977 6.81916Z"
        fill="#25C16F"
      />
    </svg>
  );
}

type CareersValuesSectionProps = {
  cmsCulture?: CmsCareersCulture | null;
};

export function CareersValuesSection({
  cmsCulture = null,
}: CareersValuesSectionProps) {
  const slides =
    cmsCulture?.slides && cmsCulture.slides.length > 0
      ? cmsCulture.slides
      : FALLBACK_CULTURE_SLIDES;

  const [activeIndex, setActiveIndex] = useState(0);
  const safeActiveIndex = activeIndex % slides.length;
  const activeSlide = slides[safeActiveIndex];
  const hasMultipleSlides = slides.length > 1;

  const cultureEyebrow = cmsCulture?.eyebrow?.trim() || "CULTURE";
  const cultureHeading =
    cmsCulture?.heading?.trim() || "Ideas Are Meant to Move.";
  const cultureDescription =
    cmsCulture?.description?.trim() ||
    "We believe great work comes from curious people, open collaboration and the freedom to challenge what already exists.";

  function showPreviousSlide() {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  }

  function showNextSlide() {
    setActiveIndex((current) => (current + 1) % slides.length);
  }

  return (
    <>
      <section
        aria-label="Create, collaborate, experiment and grow"
        className="flex w-full items-center justify-center gap-[3.5rem] bg-[#F5F1EB] px-4 py-10 sm:px-8 sm:py-16 lg:px-[3.5rem] lg:py-[9.375rem]"
      >
        <div
          className={`${exo2.className} flex w-full flex-col items-center gap-2 text-center text-[1.625rem] font-semibold leading-[1.4] tracking-[-0.0625rem] text-black sm:gap-4 sm:text-[2.75rem] lg:gap-6 lg:text-[5rem] xl:gap-8 xl:text-[8.25rem]`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        >
          <div className={rowClassName}>
            <span>Create</span>
            <BlueCircle />
          </div>

          <div className={rowClassName}>
            <YellowSquare />
            <span>Collaborate</span>
          </div>

          <div className={rowClassName}>
            <span>Experiment</span>
            <OrangeTriangle />
          </div>

          <div className={rowClassName}>
            <GreenStar />
            <span>Grow</span>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="careers-culture-heading"
        className="flex w-full flex-col items-start gap-16 bg-white px-5 py-16 sm:px-8 lg:gap-[6.25rem] lg:px-[3.5rem] lg:py-[6.25rem]"
      >
        <div className="mx-auto flex w-full max-w-[83rem] flex-col items-start gap-8 lg:flex-row lg:gap-[3.5rem]">
          <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
            <p
              className={`${inter.className} w-full text-sm font-semibold leading-5 text-[rgba(0,9,51,0.65)]`}
              style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
            >
              {cultureEyebrow}
            </p>

            <h2
              id="careers-culture-heading"
              className={`${exo2.className} w-full text-[2rem] font-semibold leading-10 tracking-[-0.03125rem] text-black lg:text-[2.5rem] lg:leading-[3rem]`}
              style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
            >
              {cultureHeading}
            </h2>
          </div>

          <p
            className={`${inter.className} w-full text-base font-normal leading-6 text-[#969696] lg:w-[37.125rem] lg:flex-none`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            {cultureDescription}
          </p>
        </div>

        <div
          className="mx-auto flex w-full max-w-[83rem] flex-col items-center gap-0 lg:h-[38.75rem] lg:flex-row lg:gap-[2.5rem]"
          aria-live="polite"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={activeSlide._key}
            src={activeSlide.imageUrl}
            alt={activeSlide.imageAlt || activeSlide.title}
            draggable={false}
            className="aspect-[38/38.75] w-full shrink-0 select-none object-cover object-center lg:h-[38.75rem] lg:w-[38rem]"
          />

          <div
            className="flex min-h-[24rem] w-full min-w-0 flex-1 self-stretch flex-col items-start justify-between p-5 transition-colors duration-300 lg:min-h-0"
            style={{
              backgroundColor:
                SLIDE_PANEL_COLORS[
                  safeActiveIndex % SLIDE_PANEL_COLORS.length
                ],
            }}
          >
            <p
              className={`${exo2.className} text-[5rem] font-semibold leading-none tracking-[-0.0625rem] text-black sm:text-[6rem]`}
              aria-hidden="true"
            >
              {String(safeActiveIndex + 1).padStart(2, "0")}
            </p>

            <div className="flex w-full flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex min-w-0 flex-col items-start gap-3">
                <h3
                  className={`${inter.className} text-xl font-semibold leading-7 text-black`}
                  style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
                >
                  {activeSlide.title}
                </h3>
                <p
                  className={`${inter.className} text-base font-normal leading-6 text-black`}
                  style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
                >
                  {activeSlide.description}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={showPreviousSlide}
                  disabled={!hasMultipleSlides}
                  aria-label="Show previous culture slide"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black text-black transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeftIcon aria-hidden="true" size={20} weight="regular" />
                </button>
                <button
                  type="button"
                  onClick={showNextSlide}
                  disabled={!hasMultipleSlides}
                  aria-label="Show next culture slide"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black text-black transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowRightIcon aria-hidden="true" size={20} weight="regular" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
