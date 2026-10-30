"use client";


import { PreFooterBanner } from "@/components/shared/pre-footer-banner";
import { TextReveal } from "@/components/motion/text-reveal";
import { LocalizedContent } from "@/components/localization/localized-content";
import Link from "@/components/navigation/website-link";
import React from "react";
import Image from "next/image";
import { NewsBlogsSection } from "@/components/landing/news-blogs-section";


/* =========================================================
   TYPES & DATA
   ========================================================= */


type ProcessStep = {
    id: number;
    title: string;
    description: string;
    iconSrc: string;
};

const PROCESS_STEPS: ProcessStep[] = [
    {
        id: 1,
        title: "Plan",
        description:
            "Understand the event's purpose, audience and requirements.",
        iconSrc: "/images/event-experience/planning.svg",
    },
    {
        id: 2,
        title: "Coordinate",
        description:
            "Align the people, partners and event details.",
        iconSrc: "/images/event-experience/coordination.svg",
    },
    {
        id: 3,
        title: "Execute",
        description:
            "Deliver the planned event experience.",
        iconSrc: "/images/event-experience/execution.svg",
    },
    {
        id: 4,
        title: "Engage",
        description:
            "Create meaningful interactions with attendees and audiences.",
        iconSrc: "/images/event-experience/engagement.svg",
    },
];

/* =========================================================
   MAIN PAGE COMPONENT
   ========================================================= */

export default function EventPage() {

    return <LocalizedContent>{(
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

            <TextReveal
              as="h1"
              text="Creating Experiences That Bring People Together."
              effect="mask"
              split="words"
              delay={0.15}
            />
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
            <Link href="/contact/form?type=general"
              
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
            </Link>
          </div>
        </div>

        {/* Full-Screen Hero Image Container */}
        <div className="relative flex w-screen items-center justify-center self-stretch overflow-hidden">
          <Image
            src="/images/event-experience/event-experience-gallery-1.png"
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

                    <TextReveal as="h2" text="From Planning to Experience." effect="mask" split="words" />
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
            url('/images/event-experience/event-experience-background.jpg')
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
                    <Link href="/contact/form?type=general"
                        
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
                    </Link>
                </div>
            </section>
            <NewsBlogsSection />
            <PreFooterBanner type={2} />
        </main>
    )}</LocalizedContent>;
}