"use client";

import React, { useState } from "react";
import Image from "next/image";
import { NewsBlogsSection } from "@/components/landing/news-blogs-section";


/* =========================================================
   TYPES & DATA
   ========================================================= */

type ExperienceCardProps = {
    title: string;
    subtext: string;
    imageSrc: string;
    className?: string;
    extraDarkOverlay?: boolean;
};

type MomentItem = {
    id: number;
    title: string;
    year: string;
    category: string;
    imageSrc: string;
};

type ProcessStep = {
    id: number;
    title: string;
    description: string;
    iconSrc: string;
};

const MOMENTS_DATA: MomentItem[] = [
    {
        id: 1,
        title: "The GOAT | India Tour",
        year: "2026",
        category: "Event",
        imageSrc: "/images/event/Image10.jpg",
    },
    {
        id: 2,
        title: "Suman Cultural Utsav",
        year: "2026",
        category: "Culture",
        imageSrc: "/images/event/Image11.png",
    },
    {
        id: 3,
        title: "Sonic Nights Live",
        year: "2025",
        category: "Music",
        imageSrc: "/images/event/Image12.jpg",
    },
    {
        id: 4,
        title: "Global Leadership Summit",
        year: "2025",
        category: "Corporate",
        imageSrc: "/images/event/Image13.png",
    },
    {
        id: 5,
        title: "National Heritage Conclave",
        year: "2025",
        category: "Public Engagement",
        imageSrc: "/images/event/Image14.png",
    },
];

const PROCESS_STEPS: ProcessStep[] = [
    {
        id: 1,
        title: "Plan",
        description:
            "Understand the event's purpose, audience and requirements.",
        iconSrc: "/images/event/Brain.svg",
    },
    {
        id: 2,
        title: "Coordinate",
        description:
            "Align the people, partners and event details.",
        iconSrc: "/images/event/UsersFour.svg",
    },
    {
        id: 3,
        title: "Execute",
        description:
            "Deliver the planned event experience.",
        iconSrc: "/images/event/Truck.svg",
    },
    {
        id: 4,
        title: "Engage",
        description:
            "Create meaningful interactions with attendees and audiences.",
        iconSrc: "/images/event/Eyes.svg",
    },
];

/* =========================================================
   BENTO CARD COMPONENT (SECTION 2)
   ========================================================= */

function ExperienceCard({
    title,
    subtext,
    imageSrc,
    className = "",
    extraDarkOverlay = false,
}: ExperienceCardProps) {
    return (
        <div
            className={`group relative flex flex-col justify-between items-end p-[2rem] rounded-[1rem] overflow-hidden cursor-pointer select-none ${className}`}
            style={{
                backgroundImage: extraDarkOverlay
                    ? `radial-gradient(101.5% 87.32% at 53.02% 2.59%, rgba(0, 0, 0, 0.00) 67.04%, rgba(0, 0, 0, 0.65) 88.52%), radial-gradient(101.5% 87.32% at 53.02% 2.59%, rgba(0, 0, 0, 0.00) 67.04%, rgba(0, 0, 0, 0.52) 88.52%), url('${imageSrc}')`
                    : `radial-gradient(101.5% 87.32% at 53.02% 2.59%, rgba(0, 0, 0, 0.00) 67.04%, rgba(0, 0, 0, 0.65) 88.52%), url('${imageSrc}')`,
                backgroundColor: "lightgray",
                backgroundPosition: "50%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Subtle bottom gradient boost on hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Top Right Arrow Button */}
            <div className="relative z-10 flex h-[3.75rem] w-[3.75rem] shrink-0 items-center justify-center rounded-[2.5rem] bg-white/50 p-[0.875rem] backdrop-blur-[2px] transition-all duration-300 group-hover:bg-white">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                    <path
                        d="M7 17L17 7M17 7H8M17 7V16"
                        stroke="#1A1A1A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* Bottom Left Heading & Hover Subtext */}
            <div className="relative z-10 flex w-full flex-col items-start self-stretch text-left">
                <h3
                    className="text-white"
                    style={{
                        fontFamily:
                            'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                        fontSize: "1.375rem",
                        fontWeight: 600,
                        lineHeight: "1.75rem",
                        fontFeatureSettings: "'liga' off, 'clig' off",
                    }}
                >
                    {title}
                </h3>

                <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-out group-hover:mt-1.5 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                    <div className="overflow-hidden">
                        <p
                            className="text-white/90"
                            style={{
                                fontFamily:
                                    'var(--Font-family-Body, "Plus Jakarta Sans", sans-serif)',
                                fontSize: "0.9375rem",
                                fontWeight: 400,
                                lineHeight: "1.375rem",
                                fontFeatureSettings: "'liga' off, 'clig' off",
                            }}
                        >
                            {subtext}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   MAIN PAGE COMPONENT
   ========================================================= */

export default function EventPage() {
    const [activeMomentIndex, setActiveMomentIndex] = useState<number>(0);

    return (
        <main className="relative min-h-screen w-full overflow-hidden bg-white">
            {/* =========================================================
          TOP BACKGROUND COLOR GRADING & GRAIN TEXTURE
          ========================================================= */}
            <div
                className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[540px]"
                style={{
                    background: `
            radial-gradient(55% 95% at 96% 12%, rgba(88, 70, 228, 0.78) 0%, rgba(138, 125, 245, 0.42) 48%, rgba(255, 255, 255, 0) 100%),
            radial-gradient(75% 85% at 20% 0%, rgba(202, 198, 252, 0.65) 0%, rgba(235, 233, 255, 0.35) 55%, rgba(255, 255, 255, 0) 95%),
            linear-gradient(180deg, #E2DFFF 0%, #F4F3FF 62%, #FFFFFF 100%)
          `,
                }}
            >
                <div
                    className="absolute inset-0 opacity-[0.28] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            {/* =========================================================
          SECTION 1: HERO SECTION
          ========================================================= */}
            {/* =========================================================
          SECTION 1: HERO SECTION
          ========================================================= */}
      <section className="relative z-10 flex w-full flex-col items-center gap-[2.5rem] self-stretch pt-[7rem] lg:gap-[3.5rem] lg:pt-[8.75rem]">
        {/* Header Split Row (keeps the 3.5rem side padding only on the text) */}
        <div className="flex w-full flex-col justify-between gap-8 px-6 md:px-10 lg:flex-row lg:items-start lg:px-[3.5rem]">
          {/* Left Side: Category + Main Heading */}
          <div className="flex max-w-[34rem] flex-col gap-[0.25rem]">
            <span
              style={{
                color: "var(--Light-Border-Text-Primary, #1A1A1A)",
                fontFeatureSettings: "'liga' off, 'clig' off",
                fontFamily:
                  'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                fontSize: "var(--Font-size-Tiny, 0.875rem)",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "var(--Line-height-Tiny, 1.25rem)",
                opacity: 0.65,
              }}
            >
              EVENT & EXPERIENCES
            </span>

            <h1
              style={{
                color: "var(--Light-Border-Selected, #1A1A1A)",
                fontFeatureSettings: "'liga' off, 'clig' off",
                fontFamily:
                  'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                fontSize: "var(--Font-size-Heading-1, 2.5rem)",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "var(--Line-height-Heading-1, 3rem)",
                letterSpacing: "-0.03125rem",
              }}
            >
              Creating Experiences That Bring People Together.
            </h1>
          </div>

          {/* Right Side: Description + Button */}
          <div className="flex max-w-[36rem] flex-col items-start gap-[1rem]">
            <p
              style={{
                color: "var(--Light-Border-Text-Primary, #1A1A1A)",
                fontFeatureSettings: "'liga' off, 'clig' off",
                fontFamily:
                  'var(--Font-family-Body, "Plus Jakarta Sans", sans-serif)',
                fontSize: "var(--Font-size-Small, 1rem)",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "var(--Line-height-Small, 1.5rem)",
                opacity: 0.75,
              }}
            >
              From concerts and cultural festivals to corporate gatherings and
              public engagement programs, we create opportunities for people,
              brands and communities to connect.
            </p>

            {/* Plan an Event Button */}
            <button
              type="button"
              className="px-5 py-3 shadow-sm transition-transform hover:bg-neutral-50 active:scale-95"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.375rem",
                borderRadius: "0.25rem",
                background: "#FFF",
              }}
            >
              <span
                style={{
                  color: "var(--Light-Border-Icon-Selected, #1A1A1A)",
                  textAlign: "center",
                  fontFeatureSettings: "'liga' off, 'clig' off",
                  fontFamily: "var(--Font-family-Body, Inter, sans-serif)",
                  fontSize: "var(--Font-size-Small, 1rem)",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "var(--Line-height-Small, 1.5rem)",
                }}
              >
                Plan an Event
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="var(--Light-Border-Icon-Selected, #1A1A1A)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Full-Screen Hero Image Container */}
        <div className="relative flex w-screen items-center justify-center self-stretch overflow-hidden">
          <Image
            src="/images/event/Image1.png"
            alt="Crowd enjoying an event"
            width={1920}
            height={960}
            sizes="100vw"
            priority
            unoptimized
            style={{ width: "100%", height: "auto" }}
            className="block w-full object-cover"
          />
        </div>
      </section>

            {/* =========================================================
          SECTION 2: EXPERIENCES FOR EVERY OCCASION BENTO GRID
          ========================================================= */}
            <section className="relative z-10 flex w-full flex-col items-center gap-[3.5rem] px-6 py-[4rem] md:px-10 lg:gap-[6.25rem] lg:px-[3.5rem] lg:py-[6.25rem]">
                {/* Section Heading Group */}
                <div className="flex flex-col items-center gap-[0.25rem]">
                    <span
                        style={{
                            color: "var(--Light-Border-Text-Secondary, #969696)",
                            textAlign: "center",
                            fontFeatureSettings: "'liga' off, 'clig' off",
                            fontFamily:
                                'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                            fontSize: "var(--Font-size-Tiny, 0.875rem)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-Tiny, 1.25rem)",
                        }}
                    >
                        THING WE DO ACROSS MUISC
                    </span>

                    <h2
                        style={{
                            color: "#000",
                            textAlign: "center",
                            fontFeatureSettings: "'liga' off, 'clig' off",
                            fontFamily:
                                'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                            fontSize: "var(--Font-size-Heading-1, 2.5rem)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-Heading-1, 3rem)",
                            letterSpacing: "-0.03125rem",
                        }}
                    >
                        Experiences for Every Occasion.
                    </h2>
                </div>

                {/* Full-Width Bento Grid Wrapper */}
                <div className="flex w-full flex-col gap-[1.875rem]">
                    {/* ROW 1 */}
                    <div className="flex w-full flex-col gap-[1.875rem] lg:flex-row">
                        <ExperienceCard
                            title="Concerts"
                            subtext="Live music and entertainment experiences for audiences."
                            imageSrc="/images/event/Image2.png"
                            className="h-[22rem] w-full lg:h-[26.25rem] lg:w-[63.1%]"
                        />
                        <ExperienceCard
                            title="Public Engagement Programs"
                            subtext="Community-driven initiatives and large-scale public gatherings."
                            imageSrc="/images/event/Image3.png"
                            className="h-[22rem] w-full lg:h-[26.25rem] lg:flex-1"
                        />
                    </div>

                    {/* ROW 2 */}
                    <div className="flex w-full flex-col gap-[1.875rem] lg:flex-row">
                        <ExperienceCard
                            title="Corporate Events"
                            subtext="Conferences, summits, and tailored corporate experiences."
                            imageSrc="/images/event/Image4.png"
                            className="h-[22rem] w-full lg:h-[26.25rem] lg:w-[34.8%]"
                        />
                        <ExperienceCard
                            title="Government Events"
                            subtext="Official conventions, institutional programs, and state summits."
                            imageSrc="/images/event/Image5.png"
                            className="h-[22rem] w-full lg:h-[26.25rem] lg:flex-1"
                        />
                    </div>

                    {/* ROW 3 & 4 COMBINED */}
                    <div className="flex w-full flex-col gap-[1.875rem] lg:flex-row">
                        <div className="flex w-full flex-col gap-[1.875rem] lg:flex-1">
                            <div className="flex w-full flex-col gap-[1.875rem] md:flex-row">
                                <ExperienceCard
                                    title="Award Functions"
                                    subtext="Grand gala nights celebrating excellence and achievements."
                                    imageSrc="/images/event/Image6.png"
                                    className="h-[22rem] w-full md:flex-1 lg:h-[26.25rem]"
                                />
                                <ExperienceCard
                                    title="Product Launches"
                                    subtext="High-impact brand reveals and immersive showcase events."
                                    imageSrc="/images/event/Image7.png"
                                    extraDarkOverlay
                                    className="h-[22rem] w-full md:flex-1 lg:h-[26.25rem]"
                                />
                            </div>

                            <ExperienceCard
                                title="Experiential Marketing"
                                subtext="Interactive brand activations that leave a lasting impression."
                                imageSrc="/images/event/Image9.png"
                                className="h-[19.125rem] w-full self-stretch"
                            />
                        </div>

                        <ExperienceCard
                            title="Cultural Events"
                            subtext="Vibrant festivals celebrating heritage, art, and traditions."
                            imageSrc="/images/event/Image8.png"
                            className="h-[28rem] w-full shrink-0 lg:h-[47.25rem] lg:w-[34.8%]"
                        />
                    </div>
                </div>
            </section>

            {/* =========================================================
          SECTION 3: MOMENTS THAT MAKE AN IMPACT (ACCORDION GALLERY)
          ========================================================= */}
            <section className="relative z-10 flex w-full flex-col items-center gap-[3.5rem] self-stretch bg-black px-6 py-[4rem] md:px-10 lg:gap-[6.25rem] lg:px-[3.5rem] lg:py-[6.25rem]">
                {/* Top Split-Color Heading */}
                <div className="w-full self-stretch text-left">
                    <h2
                        style={{
                            fontFamily:
                                'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                            fontSize: "var(--Font-size-Heading-1, 2.5rem)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-Heading-1, 3rem)",
                            letterSpacing: "-0.03125rem",
                            fontFeatureSettings: "'liga' off, 'clig' off",
                        }}
                    >
                        <span
                            style={{
                                color: "var(--Light-Border-Text-PrimaryInverse, #F9F9F9)",
                            }}
                        >
                            Moments That Make an Impact, Explore selected events and{" "}
                        </span>
                        <span style={{ color: "#969696" }}>
                            experiences across entertainment, culture, corporate gatherings and
                            public engagement.
                        </span>
                    </h2>
                </div>

                {/* Interactive 5-Image Accordion Container */}
                <div className="flex w-full flex-col gap-[1rem] self-stretch lg:h-[38.5rem] lg:flex-row lg:items-start lg:gap-[1.5rem]">
                    {MOMENTS_DATA.map((item, index) => {
                        const isActive = index === activeMomentIndex;

                        return (
                            <div
                                key={item.id}
                                onClick={() => setActiveMomentIndex(index)}
                                role="button"
                                tabIndex={0}
                                aria-expanded={isActive}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        setActiveMomentIndex(index);
                                    }
                                }}
                                className={`group flex cursor-pointer select-none flex-col transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive
                                        ? "w-full lg:flex-1"
                                        : "w-full opacity-80 hover:opacity-100 lg:w-[2.75rem] lg:shrink-0"
                                    }`}
                            >
                                {/* Image Strip / Expanded Panel */}
                                <div
                                    className={`relative w-full self-stretch overflow-hidden rounded-[0.5rem] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive
                                            ? "h-[22rem] sm:h-[28rem] lg:h-[35.75rem]"
                                            : "h-[4.5rem] lg:h-[35.75rem]"
                                        }`}
                                    style={{
                                        backgroundImage: `url('${item.imageSrc}')`,
                                        backgroundColor: "lightgray",
                                        backgroundPosition: "50%",
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div
                                        className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-500 ${isActive
                                                ? "opacity-0"
                                                : "opacity-25 group-hover:opacity-10"
                                            }`}
                                    />
                                </div>

                                {/* Bottom Caption Bar */}
                                <div
                                    className={`flex w-full items-center justify-between overflow-hidden transition-all duration-500 ${isActive
                                            ? "mt-4 max-h-12 opacity-100"
                                            : "pointer-events-none mt-0 max-h-0 opacity-0"
                                        }`}
                                >
                                    <span
                                        className="truncate pr-4 text-white"
                                        style={{
                                            fontFamily:
                                                'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                                            fontSize: "1.25rem",
                                            fontWeight: 600,
                                            lineHeight: "1.75rem",
                                            fontFeatureSettings: "'liga' off, 'clig' off",
                                        }}
                                    >
                                        {item.title}
                                    </span>

                                    <div
                                        className="flex shrink-0 items-center gap-3 text-[#969696]"
                                        style={{
                                            fontFamily:
                                                'var(--Font-family-Body, "Plus Jakarta Sans", sans-serif)',
                                            fontSize: "0.875rem",
                                            fontWeight: 400,
                                            lineHeight: "1.25rem",
                                        }}
                                    >
                                        <span>{item.year}</span>
                                        <span>{item.category}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* =========================================================
          SECTION 4: FROM PLANNING TO EXPERIENCE (4-COLUMN PROCESS)
          ========================================================= */}
            <section className="relative z-10 flex w-full flex-col items-center gap-[3.5rem] bg-white px-6 py-[4rem] md:px-10 lg:gap-[6.25rem] lg:px-[3.5rem] lg:py-[6.25rem]">
                {/* Section Heading */}
                <div className="flex flex-col items-center gap-[0.25rem]">
                    <span
                        style={{
                            color: "var(--Light-Border-Text-Secondary, #969696)",
                            textAlign: "center",
                            fontFeatureSettings: "'liga' off, 'clig' off",
                            fontFamily:
                                'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                            fontSize: "var(--Font-size-Tiny, 0.875rem)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-Tiny, 1.25rem)",
                        }}
                    >
                        HOW WE BRING EVENTS TO THE LIFE
                    </span>

                    <h2
                        style={{
                            color: "#000",
                            textAlign: "center",
                            fontFeatureSettings: "'liga' off, 'clig' off",
                            fontFamily:
                                'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                            fontSize: "var(--Font-size-Heading-1, 2.5rem)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-Heading-1, 3rem)",
                            letterSpacing: "-0.03125rem",
                        }}
                    >
                        From Planning to Experience.
                    </h2>
                </div>

                {/* 4-Column Cards Grid (2rem gap between cards matching Figma) */}
                <div className="grid w-full grid-cols-1 gap-[2rem] sm:grid-cols-2 lg:grid-cols-4">
                    {PROCESS_STEPS.map((step) => (
                        <div
                            key={step.id}
                            className="col-span-1 row-span-1 flex min-h-[14rem] flex-col items-start justify-between self-stretch justify-self-stretch pb-[0.75rem] lg:min-h-[16.5rem]"
                        >
                            {/* Top Left Icon (3.5rem x 3.5rem) */}
                            <div className="relative h-[3.5rem] w-[3.5rem] shrink-0">
                                <Image
                                    src={step.iconSrc}
                                    alt={step.title}
                                    width={56}
                                    height={56}
                                    className="h-[3.5rem] w-[3.5rem] object-contain"
                                />
                            </div>

                            {/* Bottom Text Group */}
                            <div className="mt-10 flex w-full flex-col items-start gap-[0.5rem] lg:mt-0">
                                <h3
                                    style={{
                                        color: "var(--Light-Border-Text-Primary, #1A1A1A)",
                                        fontFeatureSettings: "'liga' off, 'clig' off",
                                        fontFamily:
                                            'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                                        fontSize: "1.25rem",
                                        fontStyle: "normal",
                                        fontWeight: 600,
                                        lineHeight: "1.75rem",
                                    }}
                                >
                                    {step.title}
                                </h3>

                                <p
                                    style={{
                                        color: "var(--Light-Border-Text-Secondary, #969696)",
                                        fontFeatureSettings: "'liga' off, 'clig' off",
                                        fontFamily:
                                            'var(--Font-family-Body, "Plus Jakarta Sans", sans-serif)',
                                        fontSize: "var(--Font-size-Small, 1rem)",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "var(--Line-height-Small, 1.5rem)",
                                    }}
                                >
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* =========================================================
          SECTION 5: HAVE A SOUND OR STORY IN MIND? (CTA SECTION)
          ========================================================= */}
            <section
                className="relative z-10 flex h-[38rem] w-full flex-col items-start justify-between gap-8 px-6 py-[3.5rem] md:h-[46rem] md:px-10 lg:h-[57.0625rem] lg:flex-row lg:items-start lg:gap-[6.25rem] lg:px-[3.5rem] lg:py-[3.5rem]"
                style={{
                    backgroundImage: `
            linear-gradient(180deg, #FFF 4.39%, rgba(255, 255, 255, 0.90) 18.78%, rgba(255, 255, 255, 0.00) 60.69%),
            url('/images/event/766cb2ed3e0866c954f571e9b8d2eb8d64ab0fe0.jpg')
          `,
                    backgroundColor: "lightgray",
                    backgroundPosition: "50% 60%",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Top Row Wrapper for Heading + CTA Button */}
                <div className="flex w-full flex-col items-start justify-between gap-6 lg:flex-row lg:items-center lg:gap-[6.25rem]">
                    {/* Left Heading & Subtext */}
                    <div className="flex flex-1 flex-col items-start gap-[1rem]">
                        <h2
                            style={{
                                color: "#000",
                                fontFeatureSettings: "'liga' off, 'clig' off",
                                fontFamily:
                                    'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                                fontSize: "var(--Font-size-Heading-1, 2.5rem)",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-Heading-1, 3rem)",
                                letterSpacing: "-0.03125rem",
                            }}
                        >
                            Have a Sound or
                            <br />
                            Story in Mind?
                        </h2>

                        <p
                            style={{
                                color: "var(--Light-Border-Text-Secondary, #969696)",
                                fontFeatureSettings: "'liga' off, 'clig' off",
                                fontFamily:
                                    'var(--Font-family-Body, "Plus Jakarta Sans", sans-serif)',
                                fontSize: "var(--Font-size-Small, 1rem)",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "var(--Line-height-Small, 1.5rem)",
                            }}
                        >
                            Let&apos;s create something memorable through music, sound and
                            collaboration.
                        </p>
                    </div>

                    {/* Right Gold Button: Discuss an Event */}
                    <button
                        type="button"
                        className="shrink-0 px-6 transition-transform hover:opacity-95 active:scale-95"
                        style={{
                            display: "flex",
                            height: "3rem",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "0.5rem",
                            borderRadius: "var(--Corner-radius-4, 0.25rem)",
                            background:
                                "linear-gradient(0deg, var(--BrandPrimary-800, #8F6C1A) 0%, var(--BrandPrimary-800, #8F6C1A) 100%), var(--Fill-Warning-strong-2, #8F6C1A)",
                        }}
                    >
                        <span
                            style={{
                                color: "var(--Text-Inverse-strong, #FFF)",
                                textAlign: "center",
                                fontFeatureSettings: "'liga' off, 'clig' off",
                                fontFamily: "var(--Font-family-Body, Inter, sans-serif)",
                                fontSize: "var(--Font-size-Small, 1rem)",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-Small, 1.5rem)",
                            }}
                        >
                            Discuss an Event
                        </span>
                    </button>
                </div>
            </section>
            <NewsBlogsSection />
            <section className="w-full flex justify-center bg-white">
                <div
                    className="partner-banner-box flex flex-col justify-between items-end self-stretch w-full max-w-[90rem]"
                    style={{
                        minHeight: "24rem",
                        height: "clamp(22rem, 35vw, 30rem)",
                        padding: "clamp(1.5rem, 3.5vw, 2rem)",
                        borderRadius: "var(--Corner-radius-0, 0)",
                        background:
                            "radial-gradient(118.01% 73.86% at 57.53% 72.82%, rgba(0, 0, 0, 0.00) 42.15%, rgba(0, 0, 0, 0.76) 85.74%), url('/images/Join%20as.png') lightgray 50% / cover no-repeat",
                    }}
                >
                    {/* Top-Left Content: Heading & CTA Button */}
                    <div
                        className="flex flex-col items-start self-stretch"
                        style={{ gap: "1.5rem" }}
                    >
                        <h2
                            style={{
                                color: "var(--Text-Inverse-strong, #FFF)",
                                fontFeatureSettings: "'liga' off, 'clig' off",
                                fontFamily:
                                    'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "1.2",
                                letterSpacing: "-0.03125rem",
                            }}
                        >
                            Have a story worth telling? <br />
                            Let&apos;s bring it to the world.
                        </h2>

                        <button
                            type="button"
                            className="group cursor-pointer hover:opacity-85 transition-opacity"
                            style={{
                                display: "flex",
                                padding: "0 var(--Spacing-0, 0)",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "var(--Spacing-4, 0.25rem)",
                                borderRadius: "var(--Corner-radius-8, 0.5rem)",
                            }}
                        >
                            <span
                                style={{
                                    color: "var(--Text-Inverse-strong, #FFF)",
                                    textAlign: "center",
                                    fontFeatureSettings: "'liga' off, 'clig' off",
                                    fontFamily: 'var(--Font-family-Body, "Inter", sans-serif)',
                                    fontSize: "var(--Font-size-Small, 1rem)",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "var(--Line-height-Small, 1.5rem)",
                                }}
                            >
                                Join as a Partner
                            </span>

                            {/* Right Arrow Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                className="transition-transform duration-300 group-hover:translate-x-1"
                                style={{
                                    width: "1.25rem",
                                    height: "1.25rem",
                                    flexShrink: 0,
                                }}
                            >
                                <path
                                    d="M4.16669 10H15.8334"
                                    stroke="white"
                                    strokeWidth="1.67"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10.8333 5L15.8333 10L10.8333 15"
                                    stroke="white"
                                    strokeWidth="1.67"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Bottom-Right Logo */}
                    <img
                        src="/images/abhijat-logo.png"
                        alt="Abhijat Logo"
                        className="w-full h-16 object-contain shrink-0 select-none"
                        style={{
                            mixBlendMode: "luminosity",
                        }}
                    />
                </div>
            </section>
        </main>
    );
}