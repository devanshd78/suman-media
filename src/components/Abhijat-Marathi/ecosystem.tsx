"use client";

import { TextReveal } from "@/components/ui/scroll-text-reveal";

import Image from "next/image";
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from "framer-motion";
import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./ecosystem-scroll.module.css";

/* =========================================================
   ASSETS
========================================================= */

const VIDEO_SRC =
    "/videos/MediaVedio.mp4";

const TV_FRAME =
    "/images/ott/television/television2.png";

const MOBILE_FRAME =
    "/images/ott/mobile/mobile.png";

const TABLET_FRAME =
    "/images/ott/television/tablet.png";

/* =========================================================
   PARTNERSHIP
========================================================= */

const PARTNER_BACKGROUND =
    "/images/landing/background3.png";

const ABHIJAT_LOGO =
    "/images/abhijat-logo.png";

/* =========================================================
   STATS
========================================================= */

const STATS = [
    {
        value: "100+",
        label: "Film Entertainment Content",
    },
    {
        value: "10+",
        label: "Youtube Channels",
    },
    {
        value: "10mn",
        label: "Content views",
    },
    {
        value: "10+",
        label: "Years in Business",
    },
] as const;

/* =========================================================
   VIDEO
========================================================= */

function MediaVideo({
    className = "",
}: {
    className?: string;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const prefersReducedMotion = Boolean(useReducedMotion());

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const loadVideo = () => {
            if (video.getAttribute("src")) return;
            video.src = VIDEO_SRC;
            video.preload = "metadata";
            video.load();
        };

        const preloadObserver = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            loadVideo();
            preloadObserver.disconnect();
        }, { rootMargin: "400px" });

        // Assign the source near the scene; only visible devices play the video.
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                loadVideo();
                if (!prefersReducedMotion) void video.play().catch(() => {});
            } else {
                video.pause();
            }
        }, { threshold: 0.1 });

        preloadObserver.observe(video);
        observer.observe(video);
        return () => {
            preloadObserver.disconnect();
            observer.disconnect();
            video.pause();
        };
    }, [prefersReducedMotion]);

    return (
        <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            disablePictureInPicture
            className={`
        absolute
        inset-0
        h-full
        w-full
        object-cover
        ${className}
      `}
        />
    );
}

/* =========================================================
   HEADING
========================================================= */

function EcosystemHeading() {
    return (
        <div
            className="
        flex
        w-full
        shrink-0
        flex-col
        items-center
        gap-2
        px-4
        sm:px-6
      "
        >
            <h2
                className="
          w-full
          text-center
          font-semibold
          leading-[1.2]
          tracking-[-0.03125rem]
          text-black
        "
                style={{
                    fontFamily:
                        'var(--Font-family-Heading, "Plus Jakarta Sans")',
                    fontFeatureSettings:
                        "'liga' off, 'clig' off",
                }}
            >
              <TextReveal>
                One Ecosystem. Every Screen.
              </TextReveal>
            </h2>

            <p
                className="
          w-full
          max-w-[37.125rem]
          text-center
          text-[0.875rem]
          font-normal
          leading-[1.35rem]
          text-[#969696]
          sm:text-[1rem]
          sm:leading-[1.5rem]
        "
                style={{
                    fontFamily:
                        'var(--Font-family-Body, "Plus Jakarta Sans")',
                    fontFeatureSettings:
                        "'liga' off, 'clig' off",
                }}
            >
              <TextReveal>
                From the platform users open to the screens they
                watch on, we create the technology and experiences
                that connect content with audiences.
              </TextReveal>
            </p>
        </div>
    );
}

/* =========================================================
   STATUS BAR
========================================================= */

function StatusBar({ tablet = false }: { tablet?: boolean }) {
    return (
        <div
            aria-hidden="true"
            style={{
                position: "absolute",
                inset: "0 0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: tablet ? "2.5% 4%" : "2.5% 4.5%",
                color: "white",
                fontFamily: "Arial, sans-serif",
                fontSize: "clamp(0.45rem, 1.1cqw, 0.85rem)",
                fontWeight: 600,
                lineHeight: 1,
                pointerEvents: "none",
            }}
        >
            <span>9:41</span>
            <svg viewBox="0 0 76 16" fill="none" style={{ width: "12%", height: "auto" }}>
                <g fill="currentColor">
                    <rect x="0" y="10" width="3" height="5" rx="0.5" />
                    <rect x="5" y="7" width="3" height="8" rx="0.5" />
                    <rect x="10" y="4" width="3" height="11" rx="0.5" />
                    <rect x="15" y="1" width="3" height="14" rx="0.5" />
                </g>
                <path d="M27 5a13 13 0 0 1 18 0M30 8a9 9 0 0 1 12 0M33 11a4 4 0 0 1 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="36" cy="14" r="1" fill="currentColor" />
                <rect x="53" y="2" width="20" height="12" rx="2" stroke="currentColor" />
                <rect x="55" y="4" width="16" height="8" rx="1" fill="currentColor" />
                <path d="M75 6v4" stroke="currentColor" strokeWidth="2" />
            </svg>
        </div>
    );
}

/* =========================================================
   TELEVISION
========================================================= */

function Television() {
    return (
        <div className={styles.television}>
            {/* TV FRAME */}

            <Image loading="lazy"
                src={TV_FRAME}
                alt="Television entertainment setup"
                fill
                unoptimized

                sizes="96vw"
                className="
          pointer-events-none
          absolute
          inset-0
          z-10
          object-cover
        "
            />

            {/* VIDEO */}

            <div
                className="absolute z-20 overflow-hidden bg-black"
                style={{ top: "12%", left: "22.37%", width: "55.25%", height: "51%", borderRadius: "0.125rem" }}
            >
                <MediaVideo />
            </div>
        </div>
    );
}

/* =========================================================
   LANDSCAPE MOBILE
========================================================= */

function LandscapeMobile() {
    return (
        <div className={styles.phone}>
            {/* PHONE FRAME */}

            <Image loading="lazy"
                src={MOBILE_FRAME}
                alt="Landscape mobile"
                width={328}
                height={680}
                unoptimized
                className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-10
          max-w-none
          -translate-x-1/2
          -translate-y-1/2
          -rotate-90
          object-contain
        "
                style={{
                    height: "203.6%",
                    width: "auto",
                }}
            />

            {/* VIDEO */}

            <div
                className="absolute z-20 overflow-hidden bg-black"
                style={{ inset: "2.4% 1.2%", borderRadius: "clamp(1rem, 3.5cqw, 2.6rem)" }}
            >
                <MediaVideo />

                <StatusBar />
            </div>
        </div>
    );
}

/* =========================================================
   TABLET
========================================================= */

function Tablet() {
    return (
        <div className={styles.tablet}>
            {/* TABLET FRAME */}

            <Image loading="lazy"
                src={TABLET_FRAME}
                alt="Tablet"
                width={1008}
                height={698}
                unoptimized
                sizes="72vw"
                className={styles.tabletFrame}
            />

            {/* VIDEO */}

            <div
                className="absolute z-20 overflow-hidden bg-black"
                style={{ inset: "5.6% 3.3% 4.4%", borderRadius: "0.25rem" }}
            >
                <MediaVideo />

                <StatusBar tablet />
            </div>
        </div>
    );
}

/* =========================================================
   STATS
========================================================= */

function EcosystemStats() {
    return (
        <div
            className="
        grid
        w-full
        grid-cols-2
        gap-y-8
        px-4
        sm:px-6
        md:grid-cols-4
        md:gap-y-0
        lg:px-8
      "
        >
            {STATS.map(
                (
                    stat,
                    index,
                ) => (
                    <div
                        key={stat.label}
                        className={`
              relative
              flex
              min-w-0
              flex-col
              items-center
              justify-center
              px-2
              sm:px-4
              ${index <
                                STATS.length - 1
                                ? `
                      md:after:absolute
                      md:after:right-0
                      md:after:top-1/2
                      md:after:h-[3.25rem]
                      md:after:w-px
                      md:after:-translate-y-1/2
                      md:after:bg-[#E2E3E8]
                    `
                                : ""
                            }
            `}
                    >
                        {/* NUMBER */}

                        <p
                            className="
                text-center
                text-[clamp(2rem,5vw,3.5rem)]
                font-semibold
                leading-[1.15]
                tracking-[-0.0625rem]
                text-[rgba(0,6,38,0.90)]
              "
                            style={{
                                fontFamily:
                                    'var(--Font-family-Heading, "Plus Jakarta Sans")',
                                fontFeatureSettings:
                                    "'liga' off, 'clig' off",
                            }}
                        >
                          <TextReveal>
                            {stat.value}
                          </TextReveal>
                        </p>

                        {/* LABEL */}

                        <p
                            className="
                mt-2
                w-full
                text-center
                text-[0.75rem]
                font-normal
                leading-[1.1rem]
                text-[#1A1A1A]
                sm:text-[0.875rem]
                sm:leading-[1.25rem]
                lg:text-[1rem]
                lg:leading-[1.5rem]
              "
                            style={{
                                fontFamily:
                                    'var(--Font-family-Body, "Plus Jakarta Sans")',
                                fontFeatureSettings:
                                    "'liga' off, 'clig' off",
                            }}
                        >
                          <TextReveal>
                            {stat.label}
                          </TextReveal>
                        </p>
                    </div>
                ),
            )}
        </div>
    );
}

/* =========================================================
   DEVICE SCROLL
========================================================= */

const PANEL_GAP_RATIO = 0.07;
const FINAL_TRACK_OFFSET = -(2 * (1 + PANEL_GAP_RATIO) / (3 + 2 * PANEL_GAP_RATIO)) * 100;

function DeviceScrollShowcase() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = Boolean(useReducedMotion());
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end end"],
    });

    // One column preserves the spacing as TV, phone and tablet pass upward.
    // Only the final tablet rests before the page resumes scrolling.
    const trackY = useTransform(
        scrollYProgress,
        [0, 0.9, 1],
        ["0%", FINAL_TRACK_OFFSET + "%", FINAL_TRACK_OFFSET + "%"],
    );

    return (
        <div
            ref={scrollRef}
            className={styles.scrollTrack}
            style={{ "--panel-gap-ratio": PANEL_GAP_RATIO } as CSSProperties}
        >
            <div className={styles.stickyScene}>
                <div className={styles.heading}>
                    <EcosystemHeading />
                </div>

                <div className={styles.stage} aria-hidden="true">
                    <motion.div
                        className={styles.deviceTrack}
                        style={prefersReducedMotion ? undefined : { y: trackY }}
                    >
                        <div className={styles.deviceCanvas} data-device="television">
                            <Television />
                        </div>
                        <div className={styles.deviceCanvas} data-device="phone">
                            <LandscapeMobile />
                        </div>
                        <div className={styles.deviceCanvas} data-device="tablet">
                            <Tablet />
                        </div>
                    </motion.div>
                </div>

                <div className={styles.stats}>
                    <EcosystemStats />
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   PARTNERSHIP BANNER
========================================================= */

function PartnershipBanner() {
    const prefersReducedMotion =
        Boolean(
            useReducedMotion(),
        );

    return (
        <motion.div
            initial={
                prefersReducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 60,
                    }
            }
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
                amount: 0.2,
            }}
            transition={{
                duration: 1,

                ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                ],
            }}
            className="
        relative
        flex
        min-h-[22rem]
        w-full
        flex-col
        items-end
        justify-between
        overflow-hidden
        p-5
        sm:min-h-[25rem]
        sm:p-6
        md:min-h-[27rem]
        lg:h-[30rem]
        lg:p-8
      "
        >
            {/* BACKGROUND */}

            <Image loading="lazy"
                src={
                    PARTNER_BACKGROUND
                }
                alt=""
                fill
                unoptimized
                sizes="100vw"
                className="
          absolute
          inset-0
          z-0
          object-cover
          object-center
        "
            />

            {/* GRADIENT */}

            <div
                className="
          pointer-events-none
          absolute
          inset-0
          z-10
        "
                style={{
                    background:
                        "radial-gradient(118.01% 73.86% at 57.53% 72.82%, rgba(0,0,0,0) 42.15%, rgba(0,0,0,0.76) 85.74%)",
                }}
            />

            {/* LEFT CONTENT */}

            <div
                className="
          relative
          z-20
          flex
          w-full
          max-w-[30.5rem]
          self-start
          flex-col
          items-start
          gap-4
        "
            >
                <h3
                    className="
            w-full
            text-[clamp(1.75rem,5vw,2.5rem)]
            font-semibold
            leading-[1.2]
            tracking-[-0.03125rem]
            text-white
          "
                    style={{
                        fontFamily:
                            'var(--Font-family-Heading, "Plus Jakarta Sans")',

                        fontFeatureSettings:
                            "'liga' off, 'clig' off",
                    }}
                >
                  <TextReveal>
                    Have a story worth telling?
                    Let&apos;s bring it to the
                    world.
                  </TextReveal>
                </h3>

                {/* JOIN AS PARTNER */}

                <button
                    type="button"
                    className="
            flex
            items-center
            justify-center
            gap-1
            rounded-[0.5rem]
            text-white
            transition-opacity
            duration-200
            hover:opacity-80
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-white
          "
                >
                    <span
                        className="
              text-[0.875rem]
              font-semibold
              leading-[1.25rem]
              sm:text-[1rem]
              sm:leading-[1.5rem]
            "
                        style={{
                            fontFamily:
                                'var(--Font-family-Body, "Plus Jakarta Sans")',
                        }}
                    >
                      <TextReveal>
                        Join as a Partner
                      </TextReveal>
                    </span>

                    <svg
                        aria-hidden="true"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <path
                            d="M7.5 5L12.5 10L7.5 15"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            {/* BOTTOM RIGHT LOGO */}

            <div
                className="
          relative
          z-20
          h-[clamp(3.75rem,7vw,5rem)]
          w-[clamp(3.5rem,6.5vw,4.6875rem)]
          shrink-0
        "
                style={{
                    mixBlendMode:
                        "luminosity",
                }}
            >
                <Image loading="lazy"
                    src={ABHIJAT_LOGO}
                    alt="Abhijat Marathi"
                    fill
                    unoptimized
                    sizes="75px"
                    className="
            object-contain
          "
                />
            </div>
        </motion.div>
    );
}

/* =========================================================
   MAIN
========================================================= */

export default function Ecosystem() {
    return (
        <section
            id="ecosystem"
            className="
        w-full
        overflow-x-clip
        bg-white
      "
        >
            {/* =================================================
          ECOSYSTEM DEVICE SCROLL
      ================================================= */}

            <div
                className="
          w-full
        "
            >
                <DeviceScrollShowcase />
            </div>

            {/* =================================================
          PARTNERSHIP SECTION
      ================================================= */}

            <div
                className="
          w-full
          px-0
        "
            >
                <PartnershipBanner />
            </div>
        </section>
    );
}
