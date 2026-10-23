"use client";


import { LocalizedContent } from "@/components/localization/localized-content";
import React, { useState, useRef } from "react";
import { NewsBlogsSection } from "@/components/landing/news-blogs-section";

// Reusable Top-Right Arrow Button (turns solid white when hovering anywhere on the card)
const ArrowUpRightButton = () => <LocalizedContent>{(
    <div
        aria-label="View details"
        className="relative z-10 flex w-[3.75rem] h-[3.75rem] p-[0.875rem] justify-center items-center shrink-0 rounded-[2.5rem] bg-white/50 group-hover:bg-white transition-colors duration-300"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            style={{
                width: "2rem",
                height: "2rem",
                flexShrink: 0,
            }}
        >
            <path
                d="M8 24L24 8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="black"
            />
            <path
                d="M11 8H24V21"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="black"
            />
        </svg>
    </div>
)}</LocalizedContent>;

interface MusicCardProps {
    imageNumber: number;
    title: React.ReactNode;
    subtext: string;
    widthStyle?: React.CSSProperties;
    gradientOpacity?: number;
    hasGradient?: boolean;
}

const MusicCard = ({
    imageNumber,
    title,
    subtext,
    widthStyle,
    gradientOpacity = 0.65,
    hasGradient = true,
}: MusicCardProps) => {
    const categoryImages = ["/images/music-audio/music-videos.png", "/images/music-audio/devotional-folk-and-cultural-music.png", "/images/music-audio/film-soundtracks.jpg", "/images/music-audio/music-production.jpg", "/images/music-audio/original-songs-and-composition.png", "/images/music-audio/music-publishing-and-distribution.jpg", "/images/music-audio/artist-collaborations.png"];
    const possiblePaths = [categoryImages[imageNumber - 1] ?? categoryImages[0]];

    const [pathIndex, setPathIndex] = useState(0);

    const handleImageError = () => {
        if (pathIndex < possiblePaths.length - 1) {
            setPathIndex((prev) => prev + 1);
        }
    };

    return <LocalizedContent>{(
        <div
            className="group relative overflow-hidden flex flex-col justify-between items-end cursor-pointer bg-[#D3D3D3]"
            style={{
                height: "31.25rem",
                padding: "2rem",
                borderRadius: "var(--Corner-radius-16, 1rem)",
                ...widthStyle,
            }}
        >
            <img
                src={possiblePaths[pathIndex]}
                onError={handleImageError}
                alt={typeof title === "string" ? title : `Music category ${imageNumber}`}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 z-0"
            />

            {hasGradient && (
                <div
                    className="absolute inset-0 pointer-events-none z-[1] transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(101.5% 87.32% at 53.02% 2.59%, rgba(0, 0, 0, 0.00) 67.04%, rgba(0, 0, 0, ${gradientOpacity}) 88.52%)`,
                    }}
                />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[2]" />

            <ArrowUpRightButton />

            <div className="relative z-10 self-stretch flex flex-col items-start">
                <h3
                    className="text-white transition-transform duration-300"
                    style={{
                        fontFeatureSettings: "'liga' off, 'clig' off",
                        fontFamily:
                            'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                        fontSize: "var(--Font-size-Medium, 1.5rem)",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "2rem",
                    }}
                >
                    {title}
                </h3>

                <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="overflow-hidden">
                        <p
                            className="pt-2 text-white/90"
                            style={{
                                fontFeatureSettings: "'liga' off, 'clig' off",
                                fontFamily:
                                    'var(--Font-family-Body, "Plus Jakarta Sans", sans-serif)',
                                fontSize: "var(--Font-size-Small, 1rem)",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "var(--Line-height-Small, 1.5rem)",
                            }}
                        >
                            {subtext}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )}</LocalizedContent>;
};

// Section 3: Catalogue Data repeated 3 times (6 slides total) for smooth dragging
const CATALOGUE_SLIDES = [
    {
        id: 1,
        image: "/images/music-audio/music-audio-gallery-8.png",
        label: "Original Content",
        href: "https://youtube.com",
    },
    {
        id: 2,
        image: "/images/music-audio/music-audio-gallery-9.png",
        label: "Bhakti songs",
        href: "https://youtube.com",
    },
    {
        id: 3,
        image: "/images/music-audio/music-audio-gallery-8.png",
        label: "Original Content",
        href: "https://youtube.com",
    },
    {
        id: 4,
        image: "/images/music-audio/music-audio-gallery-9.png",
        label: "Bhakti songs",
        href: "https://youtube.com",
    },
    {
        id: 5,
        image: "/images/music-audio/music-audio-gallery-8.png",
        label: "Original Content",
        href: "https://youtube.com",
    },
    {
        id: 6,
        image: "/images/music-audio/music-audio-gallery-9.png",
        label: "Bhakti songs",
        href: "https://youtube.com",
    },
];

// Section 4: How This Works Steps Data
const HOW_IT_WORKS_STEPS = [
    {
        id: 1,
        icon: "/images/music-audio/lightbulb.svg",
        title: "Create",
        description: "Developing original musical ideas and compositions.",
    },
    {
        id: 2,
        icon: "/images/music-audio/cassette-tape.svg",
        title: "Produce",
        description: "Bringing music to life through recording and production.",
    },
    {
        id: 3,
        icon: "/images/music-audio/television.svg",
        title: "Publish",
        description: "Preparing music for release across relevant platforms.",
    },
    {
        id: 4,
        icon: "/images/music-audio/users-three.svg",
        title: "Distribute",
        description: "Connecting music with audiences across channels.",
    },
];

export default function MusicAudioPage() {
    // Drag-to-scroll state & refs for Section 3
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [hasDragged, setHasDragged] = useState(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!sliderRef.current) return;
        setIsDown(true);
        setHasDragged(false);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDown(false);
    };

    const handleMouseUp = () => {
        setIsDown(false);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDown || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        if (Math.abs(walk) > 8) {
            setHasDragged(true);
        }
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleSlideClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        if (hasDragged) {
            e.preventDefault();
            return;
        }
        window.open(href, "_blank", "noopener,noreferrer");
    };

    return <LocalizedContent>{(
        <main className="w-full flex flex-col items-center bg-white">
            {/* ==================== 1. HERO SECTION ==================== */}
            <section
                className="flex flex-col justify-center items-center self-stretch bg-cover bg-center bg-no-repeat w-full"
                style={{
                    height: "28.4375rem",
                    padding: "7.5rem 3.5rem 6.25rem 3.5rem",
                    gap: "3.5rem",
                    backgroundImage: "url('/images/music-audio/gradient.png')",
                }}
            >
                <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[83rem] gap-8">
                    <div
                        className="flex flex-col items-start flex-1"
                        style={{ gap: "0.25rem" }}
                    >
                        <span
                            className="self-stretch uppercase"
                            style={{
                                color: "var(--Light-Border-Text-Primary, #1A1A1A)",
                                fontFeatureSettings: "'liga' off, 'clig' off",
                                fontFamily:
                                    'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                                fontSize: "var(--Font-size-Tiny, 0.875rem)",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-Tiny, 1.25rem)",
                            }}
                        >
                            MUSIC & AUDIO DIVISION
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
                            Creating Sounds That <br />
                            Stay With You.
                        </h1>
                    </div>

                    <div
                        className="flex flex-col justify-center items-start flex-1 max-w-[34rem]"
                        style={{ gap: "1rem" }}
                    >
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
                            }}
                        >
                            From original music and film soundtracks to cultural music and
                            audio production, we bring stories to life through sound.
                        </p>

                        <button
                            type="button"
                            className="bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                            style={{
                                display: "flex",
                                padding: "var(--Spacing-16, 1rem)",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "0.5rem",
                                borderRadius: "var(--Corner-radius-8, 0.5rem)",
                            }}
                        >
                            <span
                                style={{
                                    color: "var(--Light-Border-Icon-Selected, #1A1A1A)",
                                    textAlign: "center",
                                    fontFeatureSettings: "'liga' off, 'clig' off",
                                    fontFamily: 'var(--Font-family-Body, "Inter", sans-serif)',
                                    fontSize: "var(--Font-size-Small, 1rem)",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "var(--Line-height-Small, 1.5rem)",
                                }}
                            >
                                Discuss a Project
                            </span>

                            <svg
                                style={{ width: "1rem", height: "1rem" }}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6 12L10 8L6 4"
                                    stroke="var(--Light-Border-Icon-Selected, #1A1A1A)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* ==================== 2. CONTENT FORMATS SECTION ==================== */}
            <section
                className="flex flex-col items-center bg-[#FFF] w-full max-w-[90rem]"
                style={{
                    padding:
                        "3.5rem var(--Spacing-56, 3.5rem) 6.25rem var(--Spacing-56, 3.5rem)",
                    gap: "6.25rem",
                }}
            >
                <div
                    className="flex flex-col items-center"
                    style={{ gap: "0.25rem" }}
                >
                    <span
                        className="uppercase"
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
                        THING WE DO ACROSS MUSIC
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
                        Content Across Formats. <br />
                        Opportunities Across Platforms.
                    </h2>
                </div>

                <div className="flex flex-col w-full" style={{ gap: "2rem" }}>
                    {/* ROW 1 */}
                    <div
                        className="flex flex-col lg:flex-row w-full"
                        style={{ gap: "2rem" }}
                    >
                        <MusicCard
                            imageNumber={1}
                            title="Music Videos"
                            subtext="Visually captivating music videos crafted for artists, labels, and audiences."
                            widthStyle={{ flex: "1 0 0" }}
                            gradientOpacity={0.45}
                        />
                        <MusicCard
                            imageNumber={2}
                            title="Devotional, Folk & Cultural Music"
                            subtext="Music rooted in devotional traditions and regional culture."
                            widthStyle={{ width: "37.1875rem", flexShrink: 0 }}
                            gradientOpacity={0.65}
                        />
                    </div>

                    {/* ROW 2 */}
                    <div
                        className="flex flex-col lg:flex-row w-full"
                        style={{ gap: "2rem" }}
                    >
                        <MusicCard
                            imageNumber={3}
                            title={
                                <>
                                    Film Scores & Background <br />
                                    Music
                                </>
                            }
                            subtext="Cinematic scores and atmospheric themes tailored for film and visual media."
                            widthStyle={{ flex: "1 0 0" }}
                            gradientOpacity={0.65}
                        />
                        <MusicCard
                            imageNumber={4}
                            title="Music Production"
                            subtext="End-to-end arrangement, recording, mixing, and mastering in state-of-the-art studios."
                            widthStyle={{ width: "26.33331rem", flexShrink: 0 }}
                            gradientOpacity={0.65}
                        />
                        <MusicCard
                            imageNumber={5}
                            title="Original Songs & Composition"
                            subtext="Fresh melodies and original compositions built to resonate with listeners."
                            widthStyle={{ width: "26.33331rem", flexShrink: 0 }}
                            gradientOpacity={0.65}
                        />
                    </div>

                    {/* ROW 3 */}
                    <div
                        className="flex flex-col lg:flex-row w-full"
                        style={{ gap: "2rem" }}
                    >
                        <MusicCard
                            imageNumber={6}
                            title="Music Publishing & Distribution"
                            subtext="Global release management and rights publishing across all major streaming platforms."
                            widthStyle={{ width: "49.75rem", flexShrink: 0 }}
                            gradientOpacity={0.65}
                        />
                        <MusicCard
                            imageNumber={7}
                            title="Artist Collaborations"
                            subtext="Bringing together diverse vocalists, musicians, and creators for unique sonic projects."
                            widthStyle={{ flex: "1 0 0" }}
                            hasGradient={false}
                        />
                    </div>
                </div>
            </section>

            {/* ==================== 3. MUSIC CATALOGUE DRAGGABLE SECTION ==================== */}
            <section
                className="flex flex-col items-center self-stretch bg-[#000] w-full overflow-hidden"
                style={{
                    padding: "6.25rem 3.5rem",
                    gap: "6.25rem",
                }}
            >
                <div
                    className="w-full max-w-[83rem] flex flex-col"
                    style={{ gap: "6.25rem" }}
                >
                    {/* Top Split Color Heading */}
                    <h2
                        style={{
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
                        <span
                            style={{
                                color: "var(--Light-Border-Text-PrimaryInverse, #F9F9F9)",
                            }}
                        >
                            Explore our music catalogue across multiple categories,{" "}
                        </span>
                        <span style={{ color: "#969696" }}>
                            from original songs and film soundtracks to devotional, folk and
                            cultural music.
                        </span>
                    </h2>

                    {/* Draggable Horizontal Slider */}
                    <div
                        ref={sliderRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        className={`flex items-start w-full overflow-x-auto select-none no-scrollbar ${isDown ? "cursor-grabbing" : "cursor-grab"
                            }`}
                        style={{
                            gap: "1.5rem",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {CATALOGUE_SLIDES.map((slide) => (
                            <a
                                key={slide.id}
                                href={slide.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => handleSlideClick(e, slide.href)}
                                draggable={false}
                                className="flex flex-col items-start shrink-0 group"
                                style={{
                                    width: "46.125rem",
                                    height: "30.3125rem",
                                    gap: "1.25rem",
                                }}
                            >
                                {/* Thumbnail Image Wrapper */}
                                <div className="w-full flex-1 overflow-hidden rounded-[0.5rem] bg-[#1A1A1A]">
                                    <img
                                        src={slide.image}
                                        alt={slide.label}
                                        draggable={false}
                                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                                    />
                                </div>

                                {/* Bottom Row: Logo + Category Label */}
                                <div className="flex items-center" style={{ gap: "0.625rem" }}>
                                    <img
                                        src="/images/music-audio/logo.png"
                                        alt="Suman Music India"
                                        draggable={false}
                                        className="w-7 h-7 rounded-full object-contain shrink-0"
                                    />
                                    <span
                                        className="text-white"
                                        style={{
                                            fontFeatureSettings: "'liga' off, 'clig' off",
                                            fontFamily:
                                                'var(--Font-family-Body, "Plus Jakarta Sans", sans-serif)',
                                            fontSize: "1rem",
                                            fontStyle: "normal",
                                            fontWeight: 600,
                                            lineHeight: "1.5rem",
                                        }}
                                    >
                                        {slide.label}
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== 4. HOW THIS WORKS SECTION ==================== */}
            <section
                className="flex flex-col items-center bg-white w-full max-w-[90rem]"
                style={{
                    padding: "6.25rem var(--Spacing-56, 3.5rem)",
                    gap: "6.25rem",
                }}
            >
                {/* Main Heading Container */}
                <div
                    className="flex flex-col items-center self-stretch"
                    style={{ gap: "var(--Spacing-4, 0.25rem)" }}
                >
                    <span
                        className="uppercase"
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
                        HOW THIS WORKS
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
                        From Creation to Connection.
                    </h2>
                </div>

                {/* 4-Column Cards Grid (2rem gap between cards) */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full"
                    style={{ gap: "2rem" }}
                >
                    {HOW_IT_WORKS_STEPS.map((step) => (
                        <div
                            key={step.id}
                            className="flex flex-col justify-between items-start self-stretch justify-self-stretch row-span-1 col-span-1"
                            style={{
                                paddingBottom: "var(--Spacing-12, 0.75rem)",
                                minHeight: "13.75rem",
                            }}
                        >
                            {/* Top Left Icon (3.5rem x 3.5rem) */}
                            <img
                                src={step.icon}
                                alt={step.title}
                                style={{
                                    width: "3.5rem",
                                    height: "3.5rem",
                                }}
                                className="object-contain shrink-0"
                            />

                            {/* Bottom Text Wrapper */}
                            <div
                                className="flex flex-col items-start self-stretch"
                                style={{ gap: "var(--Spacing-8, 0.5rem)" }}
                            >
                                <h3
                                    style={{
                                        color: "#1A1A1A",
                                        fontFeatureSettings: "'liga' off, 'clig' off",
                                        fontFamily: 'var(--Font-family-Heading, "Inter", sans-serif)',
                                        fontSize: "var(--Font-size-Heading-4, 1.25rem)",
                                        fontStyle: "normal",
                                        fontWeight: 600,
                                        lineHeight: "var(--Line-height-Heading-4, 1.75rem)",
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

            {/* ==================== 5. BOTTOM CTA SECTION ==================== */}
            <section className="w-full flex justify-center bg-[#F9F9F9]">
                <div
                    className="flex flex-col md:flex-row justify-between items-start md:items-center w-full max-w-[90rem] bg-[#F9F9F9]"
                    style={{
                        padding: "3.5rem var(--Spacing-56, 3.5rem)",
                        gap: "6.25rem",
                    }}
                >
                    {/* Left Column: Heading & Subheading */}
                    <div
                        className="flex flex-col items-start flex-1"
                        style={{ gap: "0.75rem" }}
                    >
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
                            Have a Sound or <br />
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

                    {/* Right Column: Discuss a Project Button */}
                    <button
                        type="button"
                        className="shrink-0 hover:opacity-95 transition-opacity cursor-pointer"
                        style={{
                            display: "flex",
                            height: "3rem",
                            padding: "0 var(--Spacing-16, 1rem)", // Spacing/16 on left & right from Figma button inspection
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
                                fontFamily: 'var(--Font-family-Body, "Inter", sans-serif)',
                                fontSize: "var(--Font-size-Small, 1rem)",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-Small, 1.5rem)",
                            }}
                        >
                            Discuss a Project
                        </span>

                        {/* Arrow Up Right (1.25rem x 1.25rem) */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            style={{
                                width: "1.25rem",
                                height: "1.25rem",
                                flexShrink: 0,
                            }}
                        >
                            <path
                                d="M5.83331 14.1667L14.1666 5.83334"
                                stroke="white"
                                strokeWidth="1.67"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M6.66669 5.83334H14.1667V13.3333"
                                stroke="white"
                                strokeWidth="1.67"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </section>
            <NewsBlogsSection />
            <section className="w-full flex justify-center bg-white">
                <div
                    className="flex flex-col justify-between items-end self-stretch w-full max-w-[90rem]"
                    style={{
                        height: "30rem",
                        padding: "2rem",
                        borderRadius: "var(--Corner-radius-0, 0)",
                        background:
                            "radial-gradient(118.01% 73.86% at 57.53% 72.82%, rgba(0, 0, 0, 0.00) 42.15%, rgba(0, 0, 0, 0.76) 85.74%), url('/images/join-as-partner-background.png') lightgray 50% / cover no-repeat",
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
                                fontSize: "var(--Font-size-Heading-1, 2.5rem)",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-Heading-1, 3rem)",
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
                        className="w-16 h-16 object-contain shrink-0 select-none"
                        style={{
                            mixBlendMode: "luminosity",
                        }}
                    />
                </div>
            </section>
        </main>
    )}</LocalizedContent>;
}