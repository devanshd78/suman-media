"use client";

import { TextReveal } from "@/components/ui/scroll-text-reveal";
import { useNearViewport } from "@/hooks/use-near-viewport";

import Image from "next/image";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "framer-motion";
import {
    useEffect,
    useState,
} from "react";

/* =========================================================
   SHARED LOGO
========================================================= */

const LOGO =
    "/images/ott/mobile/center-logo.png";

/* =========================================================
   HERO 1 — CINEMA
========================================================= */

const HERO_SLIDES = [
    {
        image: "/images/ott/image1.png",
        badge: "Abhijat marathi cinema",
        title: "Tu Fakt Ho Mhan",
        description:
            "Rahul, A Younger Man Falls in Love with a Girl Whose Father Generously Supports him with Housing and Education. However, the Story Takes a Dramatic Turn.",
    },
    {
        image: "/images/ott/image2.png",
        badge: "Abhijat marathi cinema",
        title: "Mumbai Te Mauritius",
        description:
            "A Marathi story that travels beyond familiar boundaries, bringing together relationships, humour, emotion and an unforgettable journey.",
    },
    {
        image: "/images/ott/image3.png",
        badge: "Marathi cinema · Romantic",
        title: "Ratri Cha Paus",
        description:
            "A moving Marathi romance shaped by rain, relationships and emotions that slowly uncover the choices connecting two lives.",
    },
    {
        image: "/images/ott/image4.png",
        badge: "World cinema · Horror",
        title: "Curse Of the Nun",
        description:
            "A dark supernatural story where disturbing events and buried secrets draw its characters deeper into an unsettling mystery.",
    },
    {
        image: "/images/ott/image5.png",
        badge: "Abhijat marathi cinema",
        title: "Gupchup - Gupchup",
        description:
            "A lively Marathi entertainment experience filled with characters, comedy and moments designed for audiences to enjoy together.",
    },
    {
        image: "/images/ott/image6.png",
        badge: "World cinema",
        title: "AntiMatter",
        description:
            "A thought-provoking cinematic experience exploring uncertainty, identity and the consequences of stepping beyond the known.",
    },
    {
        image: "/images/ott/image7.png",
        badge: "Suman Entertainment",
        title: "Stories Made for Every Screen",
        description:
            "From Marathi originals to world cinema, discover entertainment created and curated for audiences across platforms and devices.",
    },
] as const;

/* =========================================================
   HERO 2 — MARATHI SHOWS

   Image1.png -> Image5.png
========================================================= */

const SHOW_HERO_SLIDES = [
    {
        image:
            "/images/landing/client/Image1.png",
        badge:
            "Abhijat marathi shows",
        title:
            "Masti Time",
        description:
            "Apurva Nemlekar and Tanuj Govalkar kick off the first episode of Masti Time with an exciting face-off as Team Apurva takes on Team Tanuj.",
    },
    {
        image:
            "/images/landing/client/Image2.png",
        badge:
            "Abhijat marathi shows",
        title:
            "Entertainment Unlimited",
        description:
            "Discover engaging Marathi entertainment, memorable personalities and energetic moments created to bring audiences together.",
    },
    {
        image:
            "/images/landing/client/Image3.png",
        badge:
            "Abhijat marathi shows",
        title:
            "Stories That Connect",
        description:
            "Original Marathi programming built around entertainment, conversations, culture and moments audiences can connect with.",
    },
    {
        image:
            "/images/landing/client/Image4.png",
        badge:
            "Abhijat marathi shows",
        title:
            "Made for Marathi Audiences",
        description:
            "Entertainment inspired by Marathi culture, contemporary storytelling and personalities audiences know and enjoy.",
    },
    {
        image:
            "/images/landing/client/Image5.png",
        badge:
            "Abhijat marathi shows",
        title:
            "Watch. Enjoy. Repeat.",
        description:
            "A growing world of Marathi shows, entertainment and digital-first experiences created for audiences across screens.",
    },
] as const;


/* =========================================================
   HERO 3 — MUSIC LIBRARY

   6 slides total:
   thirdhero.png
   then Image1.png -> Image5.png
========================================================= */

const MUSIC_HERO_SLIDES = [
    {
        image: "/images/ott/thirdhero.png",
        badge: "Music library",
        title: "Gulabi saree",
        description: "sanju rathod",
    },
    {
        image:
            "/images/landing/client/Image1.png",
        badge:
            "Music library",
        title:
            "Music Feature 02",
        description:
            "Featured music from the Suman entertainment library.",
    },
    {
        image:
            "/images/landing/client/Image2.png",
        badge:
            "Music library",
        title:
            "Music Feature 03",
        description:
            "Featured music from the Suman entertainment library.",
    },
    {
        image:
            "/images/landing/client/Image3.png",
        badge:
            "Music library",
        title:
            "Music Feature 04",
        description:
            "Featured music from the Suman entertainment library.",
    },
    {
        image:
            "/images/landing/client/Image4.png",
        badge:
            "Music library",
        title:
            "Music Feature 05",
        description:
            "Featured music from the Suman entertainment library.",
    },
    {
        image:
            "/images/landing/client/Image5.png",
        badge:
            "Music library",
        title:
            "Music Feature 06",
        description:
            "Featured music from the Suman entertainment library.",
    },
] as const;

/* =========================================================
   FIRST INFINITE CAROUSEL
========================================================= */

const CONTENT_ITEMS = [
    {
        title:
            "Suman Entertainment Media Pvt. Ltd.",
        category:
            "Marathi Entertainment",
        image:
            "/images/ott/SumanEntertainment.png",
    },
    {
        title:
            "Mumbai Te Mauritius",
        category:
            "Marathi Cinema",
        image:
            "/images/ott/Mumbai Te Mauritius.png",
    },
    {
        title:
            "Ratri Cha Paus",
        category:
            "Marathi Cinema | Romantic",
        image:
            "/images/ott/Ratri Cha Paus.png",
    },
    {
        title:
            "Curse Of the Nun",
        category:
            "World Cinema | Horror",
        image:
            "/images/ott/Curse Of the Nun.png",
    },
    {
        title:
            "Gupchup - Gupchup",
        category:
            "Marathi Cinema",
        image:
            "/images/ott/Gupchup.png",
    },
    {
        title:
            "AntiMatter",
        category:
            "World Cinema",
        image:
            "/images/ott/AntiMatter.png",
    },
] as const;

/* =========================================================
   SECOND INFINITE CAROUSEL

   Below second hero.

   Frame 38.png
   Frame 38-1.png
   ...
   Frame 38-13.png

   Text is temporary.
   You can update it later.
========================================================= */

const SHOW_CONTENT_ITEMS = [
    {
        title: "Swaminchya Paulkhuna",
        category: "Abhijat Marathi Shows",
        image:
            "/images/ott/below-hero/Frame 38.png",
    },
    {
        title: "युवागिरी with neel",
        category: "Abhijat Marathi Shows",
        image:
            "/images/ott/below-hero/Frame 38-1.png",
    },
    {
        title: "थेट बोल विषय खोल (Podcast)",
        category: "Abhijat Marathi Shows",
        image:
            "/images/ott/below-hero/Frame 38-2.png",
    },
    {
        title: "KAY BAI SANGU",
        category: "Abhijat Marathi Shows",
        image:
            "/images/ott/below-hero/Frame 38-3.png",
    },
    {
        title: "Round Table",
        category: "Abhijat Marathi Shows",
        image:
            "/images/ott/below-hero/Frame 38-4.png",
    },
    {
        title: "Fittam Fit MAHARASTAR",
        category: "Abhijat Marathi Shows",
        image:
            "/images/ott/below-hero/Frame 38-5.png",
    },
    {
        title: "Nakki Kaay Shijtay",
        category: "Abhijat Marathi Shows",
        image:
            "/images/ott/below-hero/Frame 38-6.png",
    },
    {
        title: "OFFBEAT Bhatak",
        category: "Abhijat Marathi Shows",
        image:
            "/images/ott/below-hero/Frame 38-10.png",
    },
    {
        title: "Krupaya Laksh Asu Dya",
        category: "Abhijat Marathi Shows",
        image:
            "/images/ott/below-hero/Frame 38-11.png",
    },
    {
        title: "Amhi Asa Eiklay",
        category: "Abhijat Marathi Shows",
        image:
            "/images/ott/below-hero/Frame 38-13.png",
    },
] as const;

/* =========================================================
   MUSIC INFINITE CAROUSEL

   Below HERO 3
========================================================= */

const MUSIC_CONTENT_ITEMS = [
  {
    title: "Na Sangatach Aaj",
    category: "Music",
    image: "/images/ott/Na Sangatach Aaj.png",
  },
  {
    title: "Shaky",
    category: "Music",
    image: "/images/ott/Shaky.png",
  },
  {
    title: "Nauvari pahija",
    category: "Music",
    image: "/images/ott/Nauvari pahija.png",
  },
  {
    title: "Govyachya",
    category: "Music",
    image: "/images/ott/Govyachya.png",
  },
  {
    title: "Zingaat",
    category: "Music",
    image: "/images/ott/Zingaat.png",
  },
  {
    title: "Alka",
    category: "Music",
    image: "/images/ott/Alka.png",
  },
] as const;

/* =========================================================
   ICONS
========================================================= */

function ChevronRightIcon() {
    return (
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
    );
}

function PauseIcon() {
    return (
        <svg
            aria-hidden="true"
            width="14"
            height="18"
            viewBox="0 0 14 18"
            fill="none"
        >
            <path
                d="M5 1H1V17H5V1Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M13 1H9V17H13V1Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function LargePlayIcon() {
    return (
        <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
        >
            <path
                d="M5.25 3.25L14 9L5.25 14.75V3.25Z"
                fill="white"
            />
        </svg>
    );
}

/* =========================================================
   SMALL WATCH NOW ICON

   Figma:
   17 × 17 black circle
   white play icon
========================================================= */

function WatchNowPlayIcon() {
    return (
        <span
            className="
        flex
        h-[1.0625rem]
        w-[1.0625rem]
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-black
        p-[0.09963rem]
      "
        >
            <svg
                aria-hidden="true"
                className="
          h-[0.86331rem]
          w-[0.86331rem]
          shrink-0
        "
                viewBox="0 0 14 14"
                fill="none"
            >
                <path
                    d="M4.2 2.5L11.35 7L4.2 11.5V2.5Z"
                    fill="white"
                />
            </svg>
        </span>
    );
}

/* =========================================================
   CAROUSEL TYPES
========================================================= */

type CarouselItem = {
    title: string;
    category: string;
    image: string;
};

/* =========================================================
   REUSABLE CONTENT CARD

   Used by BOTH carousels.
========================================================= */

function ContentCard({
    item,
}: {
    item: CarouselItem;
}) {
    return (
        <article
            className="
        group/content-card

        flex
        h-[20.6875rem]
        w-[28.125rem]
        shrink-0
        flex-col
        items-start

        gap-[1.5rem]
      "
        >
            {/* =================================================
          IMAGE
      ================================================= */}

            <div
                className="
          relative

          min-h-0
          w-full
          flex-1

          overflow-hidden

          rounded-[0.5rem]

          bg-[#EAEAEA]
        "
            >
                <Image loading="lazy"
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    sizes="450px"
                    className="
            object-cover
            object-center

            transition-transform
            duration-500
            ease-out

            group-hover/content-card:scale-[1.025]
          "
                />

                {/* HOVER SHADE */}

                <div
                    className="
            pointer-events-none

            absolute
            inset-0
            z-10

            bg-black/0

            transition-colors
            duration-300

            group-hover/content-card:bg-black/10
          "
                />

                {/* =================================================
            WATCH NOW ON HOVER
        ================================================= */}

                <div
                    className="
            pointer-events-none

            absolute
            inset-0
            z-20

            flex
            items-center
            justify-center

            opacity-0

            transition-opacity
            duration-300

            group-hover/content-card:opacity-100
          "
                >
                    <button
                        type="button"
                        className="
              pointer-events-auto

              flex
              items-center
              justify-center

              gap-[0.25rem]

              rounded-[2rem]

              bg-white

              px-[0.75rem]
              py-[0.5rem]

              text-black

              shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.12)]

              backdrop-blur-[4px]

              transition-transform
              duration-200

              hover:scale-[1.03]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-black/30
            "
                    >
                        <WatchNowPlayIcon />

                        <span
                            className="
                whitespace-nowrap

                text-[0.875rem]
                font-semibold
                leading-[1.25rem]

                text-black
              "
                            style={{
                                fontFamily:
                                    'var(--Font-family-Body, "Plus Jakarta Sans")',
                            }}
                        >
                          <TextReveal>
                            Watch now
                          </TextReveal>
                        </span>
                    </button>
                </div>
            </div>

            {/* =================================================
          CARD TEXT
      ================================================= */}

            <div
                className="
          flex
          w-full
          flex-col

          gap-[0.25rem]
        "
            >
                <p
                    className="
            line-clamp-1

            w-full
            overflow-hidden

            text-[0.875rem]
            font-normal
            leading-[1.25rem]

            text-[#1A1A1A]

            text-ellipsis
          "
                    style={{
                        fontFamily:
                            'var(--Font-family-Body, "Plus Jakarta Sans")',

                        fontFeatureSettings:
                            "'liga' off, 'clig' off",
                    }}
                >
                  <TextReveal>
                    {item.title}
                  </TextReveal>
                </p>

                <p
                    className="
            line-clamp-2

            w-full
            overflow-hidden

            text-[0.875rem]
            font-normal
            leading-[1.25rem]

            text-[#969696]

            text-ellipsis
          "
                    style={{
                        fontFamily:
                            'var(--Font-family-Body, "Plus Jakarta Sans")',

                        fontFeatureSettings:
                            "'liga' off, 'clig' off",
                    }}
                >
                  <TextReveal>
                    {item.category}
                  </TextReveal>
                </p>
            </div>
        </article>
    );
}

/* =========================================================
   MUSIC CONTENT CARD

   FIGMA:
   width: 16.25rem
   height: 22.5rem
   gap: 1.5rem
========================================================= */

function MusicContentCard({
  item,
}: {
  item: CarouselItem;
}) {
  return (
    <article
      className="
        group/music-card

        flex
        h-[22.5rem]
        w-[16.25rem]
        shrink-0
        flex-col
        items-start

        gap-[1.5rem]
      "
    >
      {/* IMAGE */}

      <div
        className="
          relative

          min-h-0
          w-full
          flex-1

          overflow-hidden

          rounded-[0.5rem]

          bg-[#EAEAEA]
        "
      >
        <Image loading="lazy"
          src={item.image}
          alt={item.title}
          fill
          unoptimized
          sizes="260px"
          className="object-cover object-center"
        />

        {/* HOVER OVERLAY */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0
            z-10

            bg-black/0

            transition-colors
            duration-300

            group-hover/music-card:bg-black/10
          "
        />

        {/* WATCH NOW */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0
            z-20

            flex
            items-center
            justify-center

            opacity-0

            transition-opacity
            duration-300

            group-hover/music-card:opacity-100
          "
        >
          <button
            type="button"
            className="
              pointer-events-auto

              flex
              items-center
              justify-center

              gap-[0.25rem]

              rounded-[2rem]

              bg-white

              px-[0.75rem]
              py-[0.5rem]

              text-black

              shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.12)]

              backdrop-blur-[4px]

              transition-transform
              duration-200

              hover:scale-[1.03]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-black/30
            "
          >
            <WatchNowPlayIcon />

            <span
              className="
                whitespace-nowrap

                text-[0.875rem]
                font-semibold
                leading-[1.25rem]

                text-black
              "
              style={{
                fontFamily:
                  'var(--Font-family-Body, "Plus Jakarta Sans")',
              }}
            >
              <TextReveal>
              Stream now
              </TextReveal>
            </span>
          </button>
        </div>
      </div>

      {/* TEXT */}

      <div
        className="
          flex
          w-full
          flex-col

          gap-[0.25rem]
        "
      >
        <p
          className="
            line-clamp-1

            w-full
            overflow-hidden

            text-[0.875rem]
            font-normal
            leading-[1.25rem]

            text-[#1A1A1A]
          "
          style={{
            fontFamily:
              'var(--Font-family-Body, "Plus Jakarta Sans")',

            fontFeatureSettings:
              "'liga' off, 'clig' off",
          }}
        >
          <TextReveal>
          {item.title}
          </TextReveal>
        </p>

        <p
          className="
            line-clamp-1

            w-full
            overflow-hidden

            text-[0.875rem]
            font-normal
            leading-[1.25rem]

            text-[#969696]
          "
          style={{
            fontFamily:
              'var(--Font-family-Body, "Plus Jakarta Sans")',

            fontFeatureSettings:
              "'liga' off, 'clig' off",
          }}
        >
          <TextReveal>
          {item.category}
          </TextReveal>
        </p>
      </div>
    </article>
  );
}

/* =========================================================
   MUSIC CAROUSEL GROUP
========================================================= */

function MusicContentGroup({
  copy,
}: {
  copy: number;
}) {
  return (
    <div
      aria-hidden={copy === 1}
      className="
        flex
        shrink-0

        gap-[1.5rem]
      "
    >
      {MUSIC_CONTENT_ITEMS.map(
        (item, index) => (
          <MusicContentCard
            key={`music-${copy}-${index}-${item.image}`}
            item={item}
          />
        ),
      )}
    </div>
  );
}

/* =========================================================
   REUSABLE CAROUSEL GROUP
========================================================= */

function ContentGroup({
    items,
    copy,
    groupName,
}: {
    items: readonly CarouselItem[];
    copy: number;
    groupName: string;
}) {
    return (
        <div
            aria-hidden={copy === 1}
            className="
        flex
        shrink-0

        gap-[1.5rem]
      "
        >
            {items.map(
                (item, index) => (
                    <ContentCard
                        key={`${groupName}-${copy}-${index}-${item.image}`}
                        item={item}
                    />
                ),
            )}
        </div>
    );
}

/* =========================================================
   SHARED HERO BADGE
========================================================= */

function HeroBadge({
    label,
}: {
    label: string;
}) {
    return (
        <div
            className="
        inline-flex

        items-center
        justify-center

        gap-[0.25rem]

        rounded-[62.4375rem]

        border
        border-white

        bg-[rgba(249,249,249,0.05)]

        px-[0.75rem]
        py-[0.5rem]

        backdrop-blur-[1px]
      "
        >
            <span
                className="
          whitespace-nowrap

          text-[0.75rem]
          font-medium
          leading-[1rem]

          text-white

          sm:text-[0.875rem]
          sm:leading-[1.25rem]
        "
                style={{
                    fontFamily:
                        'var(--Font-family-Body, "Plus Jakarta Sans")',
                }}
            >
              <TextReveal>
                {label}
              </TextReveal>
            </span>

            <div
                className="
          relative

          h-[1.3125rem]
          w-[1.25rem]

          shrink-0
        "
                style={{
                    mixBlendMode:
                        "luminosity",
                }}
            >
                <Image loading="lazy"
                    src={LOGO}
                    alt=""
                    fill
                    unoptimized
                    sizes="20px"
                    className="object-contain"
                />
            </div>
        </div>
    );
}

/* =========================================================
   SHARED HERO BUTTONS
========================================================= */

function HeroButtons({
    primaryLabel = "Watch now",
}: {
    primaryLabel?: string;
}) {
    return (
        <div
            className="
        flex
        shrink-0
        flex-wrap

        items-center

        gap-[0.75rem]
      "
        >
            {/* WATCH NOW */}

            <button
                type="button"
                className="
          flex

          h-[3.5rem]

          items-center
          justify-center

          gap-[0.4rem]

          rounded-[0.25rem]

          bg-white

          px-[1.5rem]

          text-[#1A1A1A]

          transition-colors
          duration-200

          hover:bg-white/90

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-white
        "
            >
                <span
                    className="
            whitespace-nowrap

            text-[1rem]
            font-semibold
            leading-[1.5rem]
          "
                    style={{
                        fontFamily:
                            'var(--Font-family-Body, "Plus Jakarta Sans")',
                    }}
                >
                  <TextReveal>
                    {primaryLabel}
                  </TextReveal>
                </span>

                <ChevronRightIcon />
            </button>

            {/* LEARN MORE */}

            <button
                type="button"
                className="
          flex

          h-[3.5rem]

          items-center
          justify-center

          gap-[0.4rem]

          rounded-[0.25rem]

          border
          border-white

          bg-transparent

          px-[1.5rem]

          text-white

          transition-colors
          duration-200

          hover:bg-white/10

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-white
        "
            >
                <span
                    className="
            whitespace-nowrap

            text-[1rem]
            font-semibold
            leading-[1.5rem]
          "
                    style={{
                        fontFamily:
                            'var(--Font-family-Body, "Plus Jakarta Sans")',
                    }}
                >
                  <TextReveal>
                    Learn more
                  </TextReveal>
                </span>

                <ChevronRightIcon />
            </button>
        </div>
    );
}

/* =========================================================
   MAIN
========================================================= */

export default function Section3() {
    const { ref, isNearViewport } = useNearViewport<HTMLElement>();
    const prefersReducedMotion =
        Boolean(useReducedMotion());

    /* =======================================================
       HERO 1
    ======================================================= */

    const [
        isPlaying,
        setIsPlaying,
    ] = useState(true);

    const [
        activeHero,
        setActiveHero,
    ] = useState(0);

    const heroMotionEnabled =
        isNearViewport &&
        isPlaying &&
        !prefersReducedMotion;

    const currentHero =
        HERO_SLIDES[
        activeHero
        ];

    /* =======================================================
       HERO 2
    ======================================================= */

    const [
        isShowPlaying,
        setIsShowPlaying,
    ] = useState(true);

    const [
        activeShowHero,
        setActiveShowHero,
    ] = useState(0);

    const showMotionEnabled =
        isNearViewport &&
        isShowPlaying &&
        !prefersReducedMotion;

    const currentShowHero =
        SHOW_HERO_SLIDES[
        activeShowHero
        ];

    /* =======================================================
       HERO 3 — MUSIC
    ======================================================= */

    const [
        isMusicPlaying,
        setIsMusicPlaying,
    ] = useState(true);

    const [
        activeMusicHero,
        setActiveMusicHero,
    ] = useState(0);

    const musicMotionEnabled =
        isNearViewport &&
        isMusicPlaying &&
        !prefersReducedMotion;

    const currentMusicHero =
        MUSIC_HERO_SLIDES[
        activeMusicHero
        ];

    /* =======================================================
       HERO 1 AUTOPLAY
    ======================================================= */

    useEffect(() => {
        if (!heroMotionEnabled) {
            return;
        }

        const interval =
            window.setInterval(
                () => {
                    setActiveHero(
                        (current) =>
                            (current + 1) %
                            HERO_SLIDES.length,
                    );
                },
                6000,
            );

        return () => {
            window.clearInterval(
                interval,
            );
        };
    }, [heroMotionEnabled]);

    /* =======================================================
       HERO 2 AUTOPLAY
    ======================================================= */

    useEffect(() => {
        if (!showMotionEnabled) {
            return;
        }

        const interval =
            window.setInterval(
                () => {
                    setActiveShowHero(
                        (current) =>
                            (current + 1) %
                            SHOW_HERO_SLIDES.length,
                    );
                },
                6000,
            );

        return () => {
            window.clearInterval(
                interval,
            );
        };
    }, [showMotionEnabled]);

    /* =======================================================
       HERO 3 AUTOPLAY
    ======================================================= */

    useEffect(() => {
        if (!musicMotionEnabled) {
            return;
        }

        const interval =
            window.setInterval(
                () => {
                    setActiveMusicHero(
                        (current) =>
                            (current + 1) %
                            MUSIC_HERO_SLIDES.length,
                    );
                },
                6000,
            );

        return () => {
            window.clearInterval(
                interval,
            );
        };
    }, [musicMotionEnabled]);

    return (
        <section
            ref={ref}
            aria-labelledby="abhijat-universe-heading"
            className="
        w-full
        overflow-hidden

        bg-white
      "
        >
            {/* =====================================================
          INTRO
      ====================================================== */}

            <div
                className="
    mx-auto

    flex
    w-full
    max-w-[90rem]
    flex-col
    items-center

    gap-[1rem]

    px-5
    py-16

    md:px-8
    md:py-20

    lg:px-[3.5rem]
    lg:py-[6.25rem]
  "
            >
                <div
                    className="
            flex
            w-full
            flex-col

            items-start
            justify-between

            gap-10

            lg:flex-row
            lg:items-center
          "
                >
                    {/* LEFT */}

                    <div
                        className="
              flex
              max-w-full
              items-center

              gap-[0.625rem]
            "
                    >
                        <div
                            className="
                relative

                h-[5.0625rem]
                w-[4.75rem]

                shrink-0
              "
                        >
                            <Image loading="lazy"
                                src={LOGO}
                                alt="Abhijat Marathi OTT"
                                fill
                                unoptimized
                                sizes="76px"
                                className="object-contain"
                            />
                        </div>

                        <h2
                            id="abhijat-universe-heading"
                            className="
                w-[33.25rem]
                max-w-full

                font-semibold
                not-italic

                tracking-[-0.03125rem]
              "
                            style={{
                                color:
                                    "var(--Light-Border-Text-Primary, #1A1A1A)",
                                fontFamily:
                                    'var(--Font-family-Heading, var(--font-plus-jakarta-sans, "Plus Jakarta Sans"))',
                                fontSize:
                                    "var(--Font-size-Heading-1, 2.5rem)",
                                lineHeight:
                                    "var(--Line-height-Heading-1, 3rem)",

                                fontFeatureSettings:
                                    "'liga' off, 'clig' off",
                            }}
                        >
                          <TextReveal>
                            Welcome to the Abhijat
                            <br className="hidden sm:block" />
                            {" "}
                            marathi universe
                          </TextReveal>
                        </h2>
                    </div>

                    {/* RIGHT */}

                    <p
                        className="
              w-[37.5rem]
              max-w-full

              font-normal
              not-italic
            "
                        style={{
                            color:
                                "var(--Light-Border-Text-Secondary, #969696)",
                            fontFamily:
                                'var(--Font-family-Body, var(--font-plus-jakarta-sans, "Plus Jakarta Sans"))',
                            fontSize:
                                "var(--Font-size-Small, 1rem)",
                            lineHeight:
                                "var(--Line-height-Small, 1.5rem)",

                            fontFeatureSettings:
                                "'liga' off, 'clig' off",
                        }}
                    >
                      <TextReveal>
                        From Marathi OTT to connected-screen
                        experiences, Suman builds and enables
                        digital platforms that bring content to
                        audiences across devices and markets.
                      </TextReveal>
                    </p>
                </div>
            </div>

            {/* =====================================================
          HERO 1 — CINEMA
      ====================================================== */}

            <div
                className="
          relative

          mx-auto

          flex
          h-[32rem]
          w-full
          max-w-[90rem]

          flex-col
          items-center
          justify-end

          overflow-hidden

          px-5
          py-8

          sm:h-[38rem]
          sm:px-8

          lg:h-[44.875rem]
          lg:px-[3.5rem]
          lg:py-[3.5rem]
        "
            >
                {/* HERO 1 IMAGE */}

                <AnimatePresence
                    initial={false}
                >
                    <motion.div
                        key={`hero-image-${activeHero}`}
                        className="
              absolute
              inset-0
              z-0

              h-full
              w-full

              overflow-hidden
            "
                        initial={
                            prefersReducedMotion
                                ? {
                                    opacity: 0,
                                }
                                : {
                                    x: "100%",
                                    opacity: 1,
                                }
                        }
                        animate={{
                            x: 0,
                            opacity: 1,
                        }}
                        exit={
                            prefersReducedMotion
                                ? {
                                    opacity: 0,
                                }
                                : {
                                    x: "-100%",
                                    opacity: 1,
                                }
                        }
                        transition={{
                            x: {
                                duration: 0.9,

                                ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1,
                                ],
                            },

                            opacity: {
                                duration: 0.25,
                            },
                        }}
                    >
                        <Image loading="lazy"
                            src={
                                currentHero.image
                            }
                            alt={
                                currentHero.title
                            }

                            fill
                            unoptimized



                            sizes="
                (min-width: 1440px) 1440px,
                100vw
              "

                            draggable={false}

                            className="
                pointer-events-none
                select-none
              "

                            style={{
                                objectFit:
                                    "fill",

                                objectPosition:
                                    "center center",
                            }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* HERO 1 GRADIENT */}

                <div
                    className="
            pointer-events-none

            absolute
            inset-0
            z-10
          "
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(0,0,0,0) 46.93%, rgba(0,0,0,0.88) 94.55%)",
                    }}
                />

                {/* HERO 1 PAUSE */}

                <button
                    type="button"

                    aria-label={
                        isPlaying
                            ? "Pause slideshow"
                            : "Play slideshow"
                    }

                    aria-pressed={
                        !isPlaying
                    }

                    onClick={() =>
                        setIsPlaying(
                            (value) =>
                                !value,
                        )
                    }

                    className="
            absolute

            right-[1.25rem]
            top-[2rem]
            z-50

            flex

            h-[3rem]
            w-[3rem]

            items-center
            justify-center

            rounded-full

            border
            border-white

            bg-black/10

            text-white

            backdrop-blur-[3px]

            transition-colors
            duration-200

            hover:bg-white/15

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-white

            lg:right-[2rem]
            lg:top-[5.5625rem]
          "
                >
                    {isPlaying ? (
                        <PauseIcon />
                    ) : (
                        <LargePlayIcon />
                    )}
                </button>

                {/* HERO 1 CONTENT */}

                <AnimatePresence
                    mode="wait"
                    initial={false}
                >
                    <motion.div
                        key={`hero-content-${activeHero}`}

                        initial={{
                            opacity: 0,

                            x:
                                prefersReducedMotion
                                    ? 0
                                    : 24,
                        }}

                        animate={{
                            opacity: 1,
                            x: 0,
                        }}

                        exit={{
                            opacity: 0,

                            x:
                                prefersReducedMotion
                                    ? 0
                                    : -20,
                        }}

                        transition={{
                            duration: 0.4,
                            ease: "easeOut",
                        }}

                        className="
              relative
              z-30

              w-full
            "
                    >
                        <HeroBadge
                            label={
                                currentHero.badge
                            }
                        />

                        {/* TITLE + BUTTONS */}

                        <div
                            className="
                mt-[0.5rem]

                grid
                w-full

                grid-cols-1

                items-center

                gap-5

                lg:grid-cols-[minmax(0,1fr)_auto]
                lg:gap-[2rem]
              "
                        >
                            <h3
                                className="
                  line-clamp-2

                  min-w-0
                  overflow-hidden

                  text-[2rem]
                  font-bold
                  leading-[2.5rem]

                  tracking-[-0.03125rem]

                  text-white

                  md:text-[2.5rem]
                  md:leading-[3rem]
                "
                                style={{
                                    fontFamily:
                                        'var(--Font-family-Body, "Plus Jakarta Sans")',

                                    fontFeatureSettings:
                                        "'liga' off, 'clig' off",
                                }}
                            >
                              <TextReveal>
                                {
                                    currentHero.title
                                }
                              </TextReveal>
                            </h3>

                            <HeroButtons />
                        </div>

                        {/* DESCRIPTION */}

                        <p
                            className="
                mt-[0.5rem]

                line-clamp-2

                w-full
                max-w-[46rem]

                overflow-hidden

                text-[1rem]
                font-medium
                leading-[1.5rem]

                text-[rgba(255,255,255,0.78)]

                md:text-[1.25rem]
                md:leading-[1.75rem]
              "
                            style={{
                                fontFamily:
                                    'var(--Font-family-Body, "Plus Jakarta Sans")',

                                fontFeatureSettings:
                                    "'liga' off, 'clig' off",
                            }}
                        >
                          <TextReveal>
                            {
                                currentHero.description
                            }
                          </TextReveal>
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* =====================================================
          FIRST INFINITE CAROUSEL

          6 cinema cards
      ====================================================== */}

            <div
                className="
          section3-marquee

          w-full
          overflow-hidden

          pt-[1.5rem]
          pb-[6.25rem]
        "
            >
                <div
                    className="
            section3-marquee-track
            section3-marquee-track-cinema

            flex
            w-max

            gap-[1.5rem]

            will-change-transform
          "
                >
                    <ContentGroup
                        items={CONTENT_ITEMS}
                        copy={0}
                        groupName="cinema"
                    />

                    <ContentGroup
                        items={CONTENT_ITEMS}
                        copy={1}
                        groupName="cinema"
                    />
                </div>
            </div>

            {/* =====================================================
          HERO 2 — MARATHI SHOWS

          Full bleed
          no left/right white space
      ====================================================== */}

            <div
                className="
          relative

          h-[32rem]
          w-full

          overflow-hidden

          bg-black

          sm:h-[37rem]

          lg:h-[43.625rem]
        "
            >
                {/* HERO 2 IMAGE */}

                <AnimatePresence
                    initial={false}
                >
                    <motion.div
                        key={`show-image-${activeShowHero}`}

                        className="
              absolute
              inset-0
              z-0

              h-full
              w-full
            "

                        initial={
                            prefersReducedMotion
                                ? {
                                    opacity: 0,
                                }
                                : {
                                    x: "100%",
                                    opacity: 1,
                                }
                        }

                        animate={{
                            x: 0,
                            opacity: 1,
                        }}

                        exit={
                            prefersReducedMotion
                                ? {
                                    opacity: 0,
                                }
                                : {
                                    x: "-100%",
                                    opacity: 1,
                                }
                        }

                        transition={{
                            x: {
                                duration: 1.05,

                                ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1,
                                ],
                            },

                            opacity: {
                                duration: 0.3,
                            },
                        }}
                    >
                        <Image loading="lazy"
                            src={
                                currentShowHero.image
                            }

                            alt={
                                currentShowHero.title
                            }

                            fill
                            unoptimized



                            sizes="100vw"

                            draggable={false}

                            className="
                pointer-events-none
                select-none
              "

                            style={{
                                objectFit:
                                    "cover",

                                objectPosition:
                                    "center center",
                            }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* HERO 2 GRADIENT */}

                <div
                    className="
            pointer-events-none

            absolute
            inset-0
            z-10
          "
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(0,0,0,0) 46.93%, rgba(0,0,0,0.88) 94.55%)",
                    }}
                />

                {/* HERO 2 PAUSE */}

                <button
                    type="button"

                    aria-label={
                        isShowPlaying
                            ? "Pause shows slideshow"
                            : "Play shows slideshow"
                    }

                    aria-pressed={
                        !isShowPlaying
                    }

                    onClick={() =>
                        setIsShowPlaying(
                            (value) =>
                                !value,
                        )
                    }

                    className="
            absolute

            right-[1.25rem]
            top-[1.25rem]
            z-50

            flex

            h-[3rem]
            w-[3rem]

            items-center
            justify-center

            rounded-full

            border
            border-white

            bg-black/10

            text-white

            backdrop-blur-[3px]

            transition-colors
            duration-200

            hover:bg-white/15

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-white

            lg:right-[2rem]
            lg:top-[2rem]
          "
                >
                    {isShowPlaying ? (
                        <PauseIcon />
                    ) : (
                        <LargePlayIcon />
                    )}
                </button>

                {/* HERO 2 CONTENT */}

                <AnimatePresence
                    mode="wait"
                    initial={false}
                >
                    <motion.div
                        key={`show-content-${activeShowHero}`}

                        initial={{
                            opacity: 0,

                            x:
                                prefersReducedMotion
                                    ? 0
                                    : 24,
                        }}

                        animate={{
                            opacity: 1,
                            x: 0,
                        }}

                        exit={{
                            opacity: 0,

                            x:
                                prefersReducedMotion
                                    ? 0
                                    : -20,
                        }}

                        transition={{
                            duration: 0.45,
                            ease: "easeOut",
                        }}

                        className="
              absolute

              bottom-[1.5rem]
              left-[1.5rem]
              right-[1.5rem]

              z-30

              sm:bottom-[2rem]
              sm:left-[2rem]
              sm:right-[2rem]

              lg:bottom-[3.5rem]
              lg:left-[3.5rem]
              lg:right-[3.5rem]
            "
                    >
                        <HeroBadge
                            label={
                                currentShowHero.badge
                            }
                        />

                        {/* TITLE + BUTTONS */}

                        <div
                            className="
                mt-[0.5rem]

                grid
                w-full

                grid-cols-1

                items-center

                gap-5

                lg:grid-cols-[minmax(0,1fr)_auto]
                lg:gap-[2rem]
              "
                        >
                            <h3
                                className="
                  line-clamp-2

                  min-w-0
                  overflow-hidden

                  text-[2rem]
                  font-bold
                  leading-[2.5rem]

                  tracking-[-0.03125rem]

                  text-white

                  md:text-[2.5rem]
                  md:leading-[3rem]
                "
                                style={{
                                    fontFamily:
                                        'var(--Font-family-Body, "Plus Jakarta Sans")',

                                    fontFeatureSettings:
                                        "'liga' off, 'clig' off",
                                }}
                            >
                              <TextReveal>
                                {
                                    currentShowHero.title
                                }
                              </TextReveal>
                            </h3>

                            <HeroButtons />
                        </div>

                        {/* DESCRIPTION */}

                        <p
                            className="
                mt-[0.5rem]

                line-clamp-2

                w-full
                max-w-[48rem]

                overflow-hidden

                text-[1rem]
                font-medium
                leading-[1.5rem]

                text-[rgba(255,255,255,0.78)]

                md:text-[1.25rem]
                md:leading-[1.75rem]
              "
                            style={{
                                fontFamily:
                                    'var(--Font-family-Body, "Plus Jakarta Sans")',

                                fontFeatureSettings:
                                    "'liga' off, 'clig' off",
                            }}
                        >
                          <TextReveal>
                            {
                                currentShowHero.description
                            }
                          </TextReveal>
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* =====================================================
          SECOND INFINITE CAROUSEL

          NEW

          14 images:
          Frame 38.png
          to
          Frame 38-13.png

          Same card UI and hover behavior.

          Track is slower than first one because there are
          more cards, keeping approximately the same visual
          pixels-per-second speed.
      ====================================================== */}

            <div
                className="
          section3-marquee

          w-full
          overflow-hidden

          bg-white

          pt-[1.5rem]
          pb-[6.25rem]
        "
            >
                <div
                    className="
            section3-marquee-track
            section3-marquee-track-shows

            flex
            w-max

            gap-[1.5rem]

            will-change-transform
          "
                >
                    {/* FIRST COPY */}

                    <ContentGroup
                        items={
                            SHOW_CONTENT_ITEMS
                        }
                        copy={0}
                        groupName="shows"
                    />

                    {/* SECOND COPY */}

                    <ContentGroup
                        items={
                            SHOW_CONTENT_ITEMS
                        }
                        copy={1}
                        groupName="shows"
                    />
                </div>
            </div>

            {/* =====================================================
          HERO 3 — MUSIC LIBRARY

          FIGMA:
          width: 90rem
          height: 43.625rem
          padding: 3.5rem

          Slide order:
          thirdhero.png
          Image1.png -> Image5.png
      ====================================================== */}

            <div
                className="
          relative

          flex
          h-[32rem]
          w-full

          flex-col
          items-center
          justify-end

          overflow-hidden

          bg-white

          py-5

          sm:h-[37rem]
          sm:py-8

          lg:h-[43.625rem]
          lg:py-[3.5rem]
        "
            >
                {/* INNER MUSIC HERO */}

                <div
                    className="
            relative

            h-full
            w-full

            overflow-hidden

            bg-black
          "
                >
                    {/* HERO 3 IMAGE */}

                    <AnimatePresence
                        initial={false}
                    >
                        <motion.div
                            key={`music-image-${activeMusicHero}`}

                            className="
                absolute
                inset-0
                z-0

                h-full
                w-full
              "

                            initial={
                                prefersReducedMotion
                                    ? {
                                        opacity: 0,
                                    }
                                    : {
                                        x: "100%",
                                        opacity: 1,
                                    }
                            }

                            animate={{
                                x: 0,
                                opacity: 1,
                            }}

                            exit={
                                prefersReducedMotion
                                    ? {
                                        opacity: 0,
                                    }
                                    : {
                                        x: "-100%",
                                        opacity: 1,
                                    }
                            }

                            transition={{
                                x: {
                                    duration: 1.05,

                                    ease: [
                                        0.22,
                                        1,
                                        0.36,
                                        1,
                                    ],
                                },

                                opacity: {
                                    duration: 0.3,
                                },
                            }}
                        >
                            <Image loading="lazy"
                                src={
                                    currentMusicHero.image
                                }

                                alt={
                                    currentMusicHero.title
                                }

                                fill
                                unoptimized



                                sizes="100vw"

                                draggable={false}

                                className="
                  pointer-events-none
                  select-none
                "

                                style={{
                                    objectFit:
                                        "cover",

                                    objectPosition:
                                        "center center",
                                }}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* HERO 3 GRADIENT */}

                    <div
                        className="
              pointer-events-none

              absolute
              inset-0
              z-10
            "
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(0,0,0,0) 46.93%, rgba(0,0,0,0.88) 94.55%)",
                        }}
                    />

                    {/* HERO 3 PAUSE / PLAY */}

                    <button
                        type="button"

                        aria-label={
                            isMusicPlaying
                                ? "Pause music slideshow"
                                : "Play music slideshow"
                        }

                        aria-pressed={
                            !isMusicPlaying
                        }

                        onClick={() =>
                            setIsMusicPlaying(
                                (value) =>
                                    !value,
                            )
                        }

                        className="
              absolute

              right-[1.25rem]
              top-[1.25rem]
              z-50

              flex

              h-[3rem]
              w-[3rem]

              items-center
              justify-center

              rounded-full

              border
              border-white

              bg-black/10

              text-white

              backdrop-blur-[3px]

              transition-colors
              duration-200

              hover:bg-white/15

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white

              lg:right-[2rem]
              lg:top-[2rem]
            "
                    >
                        {isMusicPlaying ? (
                            <PauseIcon />
                        ) : (
                            <LargePlayIcon />
                        )}
                    </button>

                    {/* HERO 3 CONTENT */}

                    <AnimatePresence
                        mode="wait"
                        initial={false}
                    >
                        <motion.div
                            key={`music-content-${activeMusicHero}`}

                            initial={{
                                opacity: 0,

                                x:
                                    prefersReducedMotion
                                        ? 0
                                        : 24,
                            }}

                            animate={{
                                opacity: 1,
                                x: 0,
                            }}

                            exit={{
                                opacity: 0,

                                x:
                                    prefersReducedMotion
                                        ? 0
                                        : -20,
                            }}

                            transition={{
                                duration: 0.45,
                                ease: "easeOut",
                            }}

                            className="
                absolute

                bottom-[1.5rem]
                left-[1.5rem]
                right-[1.5rem]

                z-30

                sm:bottom-[2rem]
                sm:left-[2rem]
                sm:right-[2rem]

                lg:bottom-[3.5rem]
                lg:left-[3.5rem]
                lg:right-[3.5rem]
              "
                        >
                            <HeroBadge
                                label={
                                    currentMusicHero.badge
                                }
                            />

                            {/* TITLE + BUTTONS */}

                            <div
                                className="
                  mt-[0.5rem]

                  grid
                  w-full

                  grid-cols-1

                  items-center

                  gap-5

                  lg:grid-cols-[minmax(0,1fr)_auto]
                  lg:gap-[2rem]
                "
                            >
                                <h3
                                    className="
                    line-clamp-2

                    min-w-0
                    overflow-hidden

                    text-[2rem]
                    font-bold
                    leading-[2.5rem]

                    tracking-[-0.03125rem]

                    text-white

                    md:text-[2.5rem]
                    md:leading-[3rem]
                  "
                                    style={{
                                        fontFamily:
                                            'var(--Font-family-Body, "Plus Jakarta Sans")',

                                        fontFeatureSettings:
                                            "'liga' off, 'clig' off",
                                    }}
                                >
                                  <TextReveal>
                                    {
                                        currentMusicHero.title
                                    }
                                  </TextReveal>
                                </h3>

                                <HeroButtons
                                    primaryLabel="Stream now"
                                />
                            </div>

                            {/* ARTIST / DESCRIPTION */}

                            <p
                                className="
                  mt-[0.5rem]

                  line-clamp-2

                  w-full
                  max-w-[48rem]

                  overflow-hidden

                  text-[1rem]
                  font-medium
                  leading-[1.5rem]

                  text-[rgba(255,255,255,0.78)]

                  md:text-[1.25rem]
                  md:leading-[1.75rem]
                "
                                style={{
                                    fontFamily:
                                        'var(--Font-family-Body, "Plus Jakarta Sans")',

                                    fontFeatureSettings:
                                        "'liga' off, 'clig' off",
                                }}
                            >
                              <TextReveal>
                                {
                                    currentMusicHero.description
                                }
                              </TextReveal>
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* =====================================================
                MUSIC INFINITE CAROUSEL

                6 MUSIC CARDS

                continuous:
                RIGHT -> LEFT

                pauses on hover
            ====================================================== */}

            <div
              className="
                section3-marquee

                w-full
                overflow-hidden

                bg-white

                pt-[1.5rem]
                pb-[6.25rem]
              "
            >
              <div
                className="
                  section3-marquee-track
                  section3-marquee-track-music

                  flex
                  w-max

                  gap-[1.5rem]

                  will-change-transform
                "
              >
                <MusicContentGroup copy={0} />

                <MusicContentGroup copy={1} />
              </div>
            </div>

            {/* ENTERTAINMENT ANYWHERE */}

            <section
                aria-labelledby="abhijat-anywhere-heading"
                className="mx-auto flex w-full max-w-[90rem] flex-col items-center gap-[3.5rem] self-stretch bg-white px-5 py-16 md:px-8 lg:min-h-[28.1875rem] lg:px-[3.5rem] lg:py-[6.25rem]"
            >
                <h2
                    id="abhijat-anywhere-heading"
                    className="w-[34.875rem] max-w-full text-center font-semibold not-italic"
                    style={{
                        color: "var(--Light-Border-Text-Primary, #1A1A1A)",
                        fontFamily:
                            'var(--Font-family-Heading, var(--font-plus-jakarta-sans, "Plus Jakarta Sans"))',
                        fontFeatureSettings: "'liga' off, 'clig' off",
                        fontSize: "var(--Font-size-Heading-2, 2rem)",
                        lineHeight: "var(--Line-height-Heading-2, 2.5rem)",
                    }}
                >
                  <TextReveal>
                    Experience Authentic Marathi Entertainment Anywhere, Anytime.
                  </TextReveal>
                </h2>

                <div className="grid w-full grid-cols-1 gap-[3.5rem] lg:grid-cols-2">
                    {[
                        {
                            image: "/images/ott/playstore.png",
                            alt: "Google Play Store",
                            description:
                                "Discover the essence of Maharashtra on your Android device. Stream classic films, new releases, and exclusive regional stories in high definition.",
                        },
                        {
                            image: "/images/ott/AppStore.png",
                            alt: "Apple App Store",
                            description:
                                "Elevate your streaming experience on iPhone and iPad. Enjoy curated Marathi cinema, compelling web originals, and cultural gems designed for seamless entertainment on iOS.",
                        },
                    ].map((platform) => (
                        <article
                            key={platform.image}
                            className="flex min-h-[7.1875rem] items-center"
                        >
                            <div className="relative w-[8.25rem] shrink-0 self-stretch overflow-hidden rounded-l-[0.75rem] bg-[#D3D3D3]">
                                <Image loading="lazy"
                                    src={platform.image}
                                    alt={platform.alt}
                                    fill
                                    unoptimized
                                    sizes="132px"
                                    className="object-cover object-center"
                                />
                            </div>

                            <p
                                className="flex flex-1 items-center self-stretch p-4 font-normal not-italic"
                                style={{
                                    color:
                                        "var(--Light-Border-Text-Secondary, #969696)",
                                    fontFamily:
                                        'var(--Font-family-Body, var(--font-plus-jakarta-sans, "Plus Jakarta Sans"))',
                                    fontFeatureSettings: "'liga' off, 'clig' off",
                                    fontSize: "var(--Font-size-Small, 1rem)",
                                    lineHeight: "var(--Line-height-Small, 1.5rem)",
                                }}
                            >
                              <TextReveal>
                                {platform.description}
                              </TextReveal>
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            {/* =====================================================
          INFINITE MARQUEE CSS
      ====================================================== */}

            <style>{`
        @keyframes section3InfiniteMarquee {
          from {
            transform:
              translate3d(
                0,
                0,
                0
              );
          }

          to {
            transform:
              translate3d(
                calc(-50% - 0.75rem),
                0,
                0
              );
          }
        }

        /*
         * Shared animation properties.
         */
        .section3-marquee-track {
          animation-name:
            section3InfiniteMarquee;

          animation-timing-function:
            linear;

          animation-iteration-count:
            infinite;
        }

        /*
         * FIRST CAROUSEL:
         * 6 cards.
         */
        .section3-marquee-track-cinema {
          animation-duration:
            36s;
        }

        /*
         * SECOND CAROUSEL:
         * 14 cards.
         *
         * 84s keeps its movement approximately
         * the same visual speed as the 6-card
         * 36-second carousel.
         */
        .section3-marquee-track-shows {
          animation-duration:
            84s;
        }

        .section3-marquee-track-music {
          animation-duration: 36s;
        }

        /*
         * Hover pauses whichever carousel
         * the user is currently interacting with.
         */
        .section3-marquee:hover
        .section3-marquee-track {
          animation-play-state:
            paused;
        }

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .section3-marquee-track {
            animation:
              none;

            transform:
              none;
          }
        }
      `}</style>
        </section>
    );
}
