"use client";

import { PreFooterBanner } from "@/components/shared/pre-footer-banner";
import { LocalizedContent } from "@/components/localization/localized-content";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { NewsBlogsSection } from "@/components/landing/news-blogs-section";


interface SlideItem {
    id: number;
    title: string;
    subtitle: string;
    image: string;
}

interface ProcessStep {
    id: number;
    title: string;
    description: string;
    icon: string;
}

interface TestimonialCard {
    id: number;
    quote: string;
    name: string;
    role: string;
}

interface FaqItem {
    id: number;
    question: string;
    answer: string;
}

const SLIDES: SlideItem[] = [
    {
        id: 0,
        title: "YouTube Channel Creation",
        subtitle:
            "Setting up channels with a clear content direction and publishing strategy.",
        image: "/images/degital-media-networks/Image2.png",
    },
    {
        id: 1,
        title: "YouTube Channel Monetisation",
        subtitle:
            "Optimising ad revenue, sponsorships, and diversified income streams for channels.",
        image: "/images/degital-media-networks/Image3.png",
    },
    {
        id: 2,
        title: "Multi-Channel Networks (MCN)",
        subtitle:
            "Managing and scaling multiple channels under a unified digital network strategy.",
        image: "/images/degital-media-networks/Image4.png",
    },
    {
        id: 3,
        title: "Creator Partnerships",
        subtitle:
            "Collaborating with top-tier creators to co-produce and scale original content.",
        image: "/images/degital-media-networks/Image5.png",
    },
    {
        id: 4,
        title: "Influencer Networks",
        subtitle:
            "Connecting brands with high-impact influencer rosters for authentic reach.",
        image: "/images/degital-media-networks/Image6.png",
    },
    {
        id: 5,
        title: "Podcast Networks",
        subtitle:
            "Producing, distributing, and monetising video and audio podcasts at scale.",
        image: "/images/degital-media-networks/Image7.png",
    },
    {
        id: 6,
        title: "Digital Publishing",
        subtitle:
            "Distributing multi-format media assets across global social and web platforms.",
        image: "/images/degital-media-networks/Image8.png",
    },
    {
        id: 7,
        title: "Audience Growth Solutions",
        subtitle:
            "Data-driven retention, SEO, and algorithmic growth frameworks for media IP.",
        image: "/images/degital-media-networks/Image9.png",
    },
];

const PROCESS_STEPS: ProcessStep[] = [
    {
        id: 0,
        title: "Build",
        description: "Establish channels with a clear content direction.",
        icon: "/images/event-experience/planning.svg",
    },
    {
        id: 1,
        title: "Manage",
        description: "Support content publishing and channel operations.",
        icon: "/images/event-experience/coordination.svg",
    },
    {
        id: 2,
        title: "Monetize",
        description: "Explore eligible revenue opportunities.",
        icon: "/images/degital-media-networks/MoneyWavy.svg",
    },
    {
        id: 3,
        title: "Grow",
        description: "Support audience discovery and creator partnerships.",
        icon: "/images/business/icons/chart-line-up.svg",
    },
];

const TESTIMONIALS: TestimonialCard[] = [
    {
        id: 0,
        quote:
            "“Working with the team felt collaborative from the beginning. They understood our content vision and helped us explore opportunities to connect with a wider digital audience.”",
        name: "Neha Kulkarni",
        role: "Independent Content Creator",
    },
    {
        id: 1,
        quote:
            "“What stood out was the team's focus on the bigger picture—not just creating content, but thinking about how it can be presented, published and discovered across digital platforms.”",
        name: "M Saraf",
        role: "Media & Publishing Professional",
    },
    {
        id: 2,
        quote:
            "“The team values communication and creative alignment. Their approach makes it easier to discuss ideas, understand expectations and explore meaningful digital collaborations.”",
        name: "Sneha",
        role: "Social Media & Creator Partnerships Consultant",
    },
    {
        id: 3,
        quote:
            "“Their structured approach to channel management and audience retention helped us turn scattered uploads into a consistent, high-performing digital media property.”",
        name: "Rohan Verma",
        role: "Digital Media Producer",
    },
    {
        id: 4,
        quote:
            "“From content packaging to monetisation strategy, the clarity and execution speed they brought to our creator network made a measurable difference within weeks.”",
        name: "Ananya Sharma",
        role: "Head of Creator Relations",
    },
    {
        id: 5,
        quote:
            "“Partnering on our podcast network launch gave us the operational backbone we needed to focus purely on storytelling while they handled distribution and growth.”",
        name: "Vikramaditya Joshi",
        role: "Podcast Host & Executive Producer",
    },
    {
        id: 6,
        quote:
            "“They treat every channel like a long-term media asset. Their insights on multi-platform publishing unlocked entirely new revenue streams for our catalogue.”",
        name: "Priya Nair",
        role: "Digital Publishing Lead",
    },
];

const FAQ_ITEMS: FaqItem[] = [
    {
        id: 0,
        question: "What are Digital Media Network services?",
        answer:
            "They include channel development, content publishing, monetisation support and partnerships that help digital content reach its intended audience.",
    },
    {
        id: 1,
        question: "Do you help create and set up YouTube channels?",
        answer:
            "Yes, we handle end-to-end channel setup including branding, content strategy, metadata optimisation, and publishing workflows.",
    },
    {
        id: 2,
        question: "How does YouTube channel monetisation work?",
        answer:
            "We help channels unlock and optimise multiple revenue streams including AdSense, brand sponsorships, memberships, and multi-platform licensing.",
    },
    {
        id: 3,
        question: "Do you work with content creators and influencers?",
        answer:
            "Yes, we partner with independent creators, talent rosters, and influencers to scale their reach, production quality, and commercial opportunities.",
    },
    {
        id: 4,
        question: "Can brands collaborate with digital creators through Suman?",
        answer:
            "Absolutely. We connect brands with aligned creators and digital networks for authentic integrations, sponsored series, and performance campaigns.",
    },
    {
        id: 5,
        question: "Do you support podcast networks and digital publishing?",
        answer:
            "Yes, we support full-scale video and audio podcast distribution, clip syndication, and digital publishing across major global platforms.",
    },
    {
        id: 6,
        question: "How can I partner with Suman Entertainment & Media?",
        answer:
            "You can reach out through our Contact button or Talk to Expert section to schedule a discovery call with our digital media partnerships team.",
    },
];

export default function DigitalMediaNetworksPage() {
    const [activeSlide, setActiveSlide] = useState<number>(0);
    // First FAQ (index 0) starts open; opening another closes the previous one; clicking the active one closes it
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % SLIDES.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [activeSlide]);

    const toggleFaq = (index: number) => {
        setOpenFaq((prev) => (prev === index ? null : index));
    };

    const currentSlide = SLIDES[activeSlide];

    return <LocalizedContent>{(
        <div className="digital-media-page"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                background: "#FFF",
                overflowX: "hidden",
            }}
        >
            {/* Keyframes for Infinite Testimonial Scroll */}
            <style>{`

        .digital-media-page .digital-slide-card { height: auto !important; }
        html[lang="mr"] .digital-media-page :is(h1,h2,h3,p) { line-height: 1.5 !important; }
        @media (max-width: 900px) {
          .digital-media-page > section { padding: 3.5rem 1.25rem !important; min-height: 0 !important; }
          .digital-media-page > section:first-of-type { padding-top: 7rem !important; }
          .digital-media-page :is(.digital-hero-row,.digital-capabilities-row,.digital-faq-row,.digital-contact-row) { flex-direction: column !important; gap: 2rem !important; width: 100% !important; }
          .digital-media-page :is(.digital-hero-row,.digital-capabilities-row,.digital-faq-row) > div { width: 100% !important; min-width: 0 !important; flex-basis: auto !important; }
          .digital-media-page .digital-contact-row { padding: 0 !important; }
          .digital-media-page .digital-process-grid { grid-template-columns: repeat(2,minmax(0,1fr)) !important; }
          .digital-media-page .digital-slide-card { padding: 1.25rem !important; }
          .digital-media-page .marquee-track > div { width: min(29.5rem,85vw) !important; }
          .digital-media-page h1 { font-size: clamp(2rem,7vw,3rem) !important; line-height: 1.3 !important; }
        }
        @media (max-width: 540px) {
          .digital-media-page .digital-process-grid { grid-template-columns: 1fr !important; }
          .digital-media-page .digital-slide-card > div:first-child { flex-direction: column !important; gap: 1rem !important; }
        }
        @keyframes infiniteMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          gap: 1.25rem;
          animation: infiniteMarquee 45s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

            {/* ==================== SECTION 1: HERO ==================== */}
            <section
                style={{
                    display: "flex",
                    width: "100%",
                    maxWidth: "90rem",
                    padding: "8.75rem 3.5rem 3.5rem 3.5rem",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "6.25rem",
                    alignSelf: "center",
                    background: "#FFF",
                    boxSizing: "border-box",
                }}
            >
                <div className="digital-hero-row"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        alignSelf: "stretch",
                        gap: "4rem",
                    }}
                >
                    {/* Left Column */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "0.75rem",
                            flex: "1 1 55%",
                            maxWidth: "42rem",
                        }}
                    >
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
                                textTransform: "uppercase",
                            }}
                        >
                            DIGITAL MEDIA NETWORKS
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
                                margin: 0,
                            }}
                        >
                            Building and growing digital media networks through channel,
                            creator partnerships and monetisation.
                        </h1>
                    </div>

                    {/* Right Column */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "1.5rem",
                            flex: "1 1 45%",
                            maxWidth: "36rem",
                        }}
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
                                margin: 0,
                            }}
                        >
                            We build and manage digital media networks through YouTube channel
                            development, creator partnerships, content publishing and
                            monetisation—helping content reach wider audiences and unlock
                            sustainable growth across digital platforms.
                        </p>

                        <Link href="/contact"
                            style={{
                                display: "flex",
                                padding: "1rem",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "0.5rem",
                                borderRadius: "var(--Corner-radius-4, 0.25rem)",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                marginLeft: "-1rem",
                            }}
                        >
                            <span
                                style={{
                                    color: "var(--Text-Warning, #8F6C1A)",
                                    textAlign: "center",
                                    fontFeatureSettings: "'liga' off, 'clig' off",
                                    fontFamily: 'var(--Font-family-Body, "Inter", sans-serif)',
                                    fontSize: "var(--Font-size-Small, 1rem)",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "var(--Line-height-Small, 1.5rem)",
                                }}
                            >
                                Explore Partnership
                            </span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 8 14"
                                fill="none"
                                style={{
                                    width: "0.375rem",
                                    height: "0.75rem",
                                    flexShrink: 0,
                                }}
                            >
                                <path
                                    d="M1 1L7 7L1 13"
                                    stroke="var(--Stroke-Warning-weak, rgba(143, 108, 26, 0.20))"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Hero Image */}
                <div
                    role="img"
                    aria-label="Digital Media Networks Team"
                    style={{
                        width: "100%",
                        height: "36.75rem",
                        alignSelf: "stretch",
                        borderRadius: "1rem",
                        background:
                            "url('/images/degital-media-networks/Image1.png') lightgray 50% / cover no-repeat",
                    }}
                />
            </section>

            {/* ==================== SECTION 2: 8-SLIDE SHOWCASE ==================== */}
            <section
                style={{
                    display: "flex",
                    width: "100%",
                    maxWidth: "90rem",
                    minHeight: "59.625rem",
                    padding: "6.25rem 3.5rem",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6.25rem",
                    background: "#FFF",
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        alignSelf: "stretch",
                        gap: "4rem",
                    }}
                >
                    <h2
                        style={{
                            color: "var(--Light-Border-Text-Primary, #1A1A1A)",
                            fontFeatureSettings: "'liga' off, 'clig' off",
                            fontFamily:
                                'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                            fontSize: "var(--Font-size-Heading-1, 2.5rem)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-Heading-1, 3rem)",
                            letterSpacing: "-0.03125rem",
                            margin: 0,
                            maxWidth: "32rem",
                        }}
                    >
                        Turning Digital Channels into Media Assets.
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
                            margin: 0,
                            maxWidth: "36rem",
                        }}
                    >
                        Explore our capabilities across channel development, creator
                        networks, digital publishing and monetisation.
                    </p>
                </div>

                <div className="digital-capabilities-row"
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        alignSelf: "stretch",
                        gap: "6rem",
                    }}
                >
                    {/* Left Side Slides Navigation List */}
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "1.5rem",
                            minWidth: "18.5rem",
                            flexShrink: 0,
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                left: "0.46875rem",
                                top: "0.75rem",
                                bottom: "0.75rem",
                                width: "2px",
                                background:
                                    "linear-gradient(180deg, rgba(143, 108, 26, 0.45) 0%, rgba(143, 108, 26, 0.1) 100%)",
                                zIndex: 0,
                            }}
                        />

                        {SLIDES.map((slide, index) => {
                            const isSelected = index === activeSlide;

                            return (
                                <button
                                    key={slide.id}
                                    type="button"
                                    onClick={() => setActiveSlide(index)}
                                    style={{
                                        position: "relative",
                                        zIndex: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.25rem",
                                        background: "transparent",
                                        border: "none",
                                        padding: "0.25rem 0",
                                        cursor: "pointer",
                                        textAlign: "left",
                                        width: "100%",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "1rem",
                                            height: "1rem",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                            marginRight: "0.5rem",
                                        }}
                                    >
                                        {isSelected && (
                                            <span
                                                style={{
                                                    width: "1rem",
                                                    height: "1rem",
                                                    aspectRatio: "1/1",
                                                    borderRadius: "1rem",
                                                    background: "#8F6C1A",
                                                    display: "block",
                                                    transition: "all 0.25s ease",
                                                }}
                                            />
                                        )}
                                    </div>

                                    <span
                                        style={{
                                            color: isSelected
                                                ? "var(--Light-Border-Text-Primary, #1A1A1A)"
                                                : "var(--Light-Border-Text-Secondary, #969696)",
                                            fontFeatureSettings: "'liga' off, 'clig' off",
                                            fontFamily:
                                                'var(--Font-family-Body, "Plus Jakarta Sans", sans-serif)',
                                            fontSize: "var(--Font-size-Small, 1rem)",
                                            fontStyle: "normal",
                                            fontWeight: isSelected ? 600 : 400,
                                            lineHeight: "var(--Line-height-Small, 1.5rem)",
                                            transition: "color 0.25s ease, font-weight 0.15s ease",
                                        }}
                                    >
                                        {slide.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Side Slide Card */}
                    <div className="digital-slide-card"
                        style={{
                            display: "flex",
                            flex: 1,
                            minHeight: "34.875rem",
                            padding: "2rem",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "2.5rem",
                            alignSelf: "stretch",
                            borderRadius: "2rem",
                            background: "#F5F5F5",
                            boxSizing: "border-box",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                alignSelf: "stretch",
                                gap: "2rem",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: "0.5rem",
                                    flex: 1,
                                    minWidth: 0,
                                }}
                            >
                                <h3
                                    style={{
                                        color: "#372B0D",
                                        fontFeatureSettings: "'liga' off, 'clig' off",
                                        fontFamily:
                                            'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                                        fontSize: "var(--Font-size-Heading-3, 1.5rem)",
                                        fontStyle: "normal",
                                        fontWeight: 600,
                                        lineHeight: "var(--Line-height-Heading-3, 2rem)",
                                        margin: 0,
                                    }}
                                >
                                    {currentSlide.title}
                                </h3>

                                <p
                                    style={{
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 1,
                                        alignSelf: "stretch",
                                        overflow: "hidden",
                                        color: "var(--Light-Border-Text-Secondary, #969696)",
                                        fontFeatureSettings: "'liga' off, 'clig' off",
                                        textOverflow: "ellipsis",
                                        fontFamily:
                                            'var(--Font-family-Body, "Plus Jakarta Sans", sans-serif)',
                                        fontSize: "var(--Font-size-Small, 1rem)",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "var(--Line-height-Small, 1.5rem)",
                                        margin: 0,
                                    }}
                                >
                                    {currentSlide.subtitle}
                                </p>
                            </div>

                            <Link href="/contact"
                                style={{
                                    display: "flex",
                                    padding: "0 var(--Spacing-0, 0)",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    borderRadius: "var(--Corner-radius-4, 0.25rem)",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    flexShrink: 0,
                                    marginTop: "0.25rem",
                                }}
                            >
                                <span
                                    style={{
                                        color: "var(--Text-Warning, #8F6C1A)",
                                        textAlign: "center",
                                        fontFeatureSettings: "'liga' off, 'clig' off",
                                        fontFamily: 'var(--Font-family-Body, "Inter", sans-serif)',
                                        fontSize: "var(--Font-size-Small, 1rem)",
                                        fontStyle: "normal",
                                        fontWeight: 600,
                                        lineHeight: "var(--Line-height-Small, 1.5rem)",
                                    }}
                                >
                                    Contact us
                                </span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 8 14"
                                    fill="none"
                                    style={{
                                        width: "0.375rem",
                                        height: "0.75rem",
                                        flexShrink: 0,
                                    }}
                                >
                                    <path
                                        d="M1 1L7 7L1 13"
                                        stroke="var(--Stroke-Warning-weak, rgba(143, 108, 26, 0.20))"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        </div>

                        <div
                            key={currentSlide.id}
                            role="img"
                            aria-label={currentSlide.title}
                            style={{
                                height: "24.125rem",
                                flexShrink: 0,
                                alignSelf: "stretch",
                                borderRadius: "0.75rem",
                                background: `url('${currentSlide.image}') lightgray 50% / cover no-repeat`,
                                transition: "background-image 0.3s ease-in-out",
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* ==================== SECTION 3: FROM PLANNING TO EXPERIENCE ==================== */}
            <section
                style={{
                    display: "flex",
                    width: "100%",
                    maxWidth: "90rem",
                    padding: "6.25rem var(--Spacing-56, 3.5rem)",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6.25rem",
                    background: "#FFF",
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.25rem",
                        textAlign: "center",
                    }}
                >
                    <span
                        style={{
                            color: "var(--Light-Border-Text-Secondary, #969696)",
                            fontFeatureSettings: "'liga' off, 'clig' off",
                            fontFamily:
                                'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                            fontSize: "var(--Font-size-Tiny, 0.875rem)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-Tiny, 1.25rem)",
                            textTransform: "uppercase",
                        }}
                    >
                        HOW WE BRING EVENTS TO THE LIFE
                    </span>

                    <h2
                        style={{
                            color: "var(--Light-Border-Text-Primary, #1A1A1A)",
                            fontFeatureSettings: "'liga' off, 'clig' off",
                            fontFamily:
                                'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                            fontSize: "var(--Font-size-Heading-1, 2.5rem)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-Heading-1, 3rem)",
                            letterSpacing: "-0.03125rem",
                            margin: 0,
                        }}
                    >
                        From Planning to Experience.
                    </h2>
                </div>

                <div className="digital-process-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                        gap: "2rem",
                        width: "100%",
                        alignSelf: "stretch",
                    }}
                >
                    {PROCESS_STEPS.map((step) => (
                        <div
                            key={step.id}
                            style={{
                                display: "flex",
                                paddingBottom: "var(--Spacing-12, 0.75rem)",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                alignSelf: "stretch",
                                gridRow: "span 1",
                                gridColumn: "span 1",
                                justifySelf: "stretch",
                                minHeight: "13.5rem",
                                boxSizing: "border-box",
                            }}
                        >
                            <img
                                src={step.icon}
                                alt={step.title}
                                style={{
                                    width: "3.5rem",
                                    height: "3.5rem",
                                    objectFit: "contain",
                                    flexShrink: 0,
                                }}
                            />

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: "0.5rem",
                                    alignSelf: "stretch",
                                    marginTop: "3.5rem",
                                }}
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
                                        margin: 0,
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
                                        margin: 0,
                                    }}
                                >
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ==================== SECTION 4: CTA BANNER ==================== */}
            <section
                style={{
                    display: "flex",
                    width: "100%",
                    background: "#F9F9F9",
                    justifyContent: "center",
                }}
            >
                <div className="digital-contact-row"
                    style={{
                        display: "flex",
                        width: "100%",
                        maxWidth: "90rem",
                        padding: "3.5rem var(--Spacing-56, 3.5rem)",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "6.25rem",
                        background: "#F9F9F9",
                        boxSizing: "border-box",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "0.75rem",
                            flex: 1,
                        }}
                    >
                        <h2
                            style={{
                                color: "var(--Light-Border-Text-Primary, #1A1A1A)",
                                fontFeatureSettings: "'liga' off, 'clig' off",
                                fontFamily:
                                    'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                                fontSize: "var(--Font-size-Heading-1, 2.5rem)",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-Heading-1, 3rem)",
                                letterSpacing: "-0.03125rem",
                                margin: 0,
                                maxWidth: "28rem",
                            }}
                        >
                            Have a Digital Media Opportunity in Mind?
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
                                margin: 0,
                            }}
                        >
                            Let’s explore opportunities across channel development, creator
                            partnerships and digital media growth.
                        </p>
                    </div>

                    <Link href="/contact"
                        style={{
                            display: "flex",
                            height: "3rem",
                            padding: "0 1rem",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "0.5rem",
                            borderRadius: "var(--Corner-radius-4, 0.25rem)",
                            background:
                                "linear-gradient(0deg, var(--BrandPrimary-800, #8F6C1A) 0%, var(--BrandPrimary-800, #8F6C1A) 100%), var(--Fill-Warning-strong-2, #8F6C1A)",
                            border: "none",
                            cursor: "pointer",
                            flexShrink: 0,
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
                            Talk to Expert
                        </span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                        >
                            <path
                                d="M3.5 10.5L10.5 3.5M10.5 3.5H4.375M10.5 3.5V9.625"
                                stroke="#FFFFFF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* ==================== SECTION 5: INFINITE SCROLL TESTIMONIALS ==================== */}
            <section
                style={{
                    display: "flex",
                    width: "100%",
                    padding: "6.25rem 0 0 0",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "#FFF",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <div className="marquee-track">
                        {[...TESTIMONIALS, ...TESTIMONIALS].map((item, idx) => (
                            <div
                                key={`${item.id}-${idx}`}
                                style={{
                                    position: "relative",
                                    display: "flex",
                                    width: "29.5rem",
                                    minHeight: "17.625rem",
                                    padding: "1.25rem",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    borderRadius: "1rem",
                                    border: "1px solid rgba(214, 204, 163, 0.25)",
                                    background: "rgba(214, 204, 163, 0.10)",
                                    boxSizing: "border-box",
                                    overflow: "hidden",
                                    flexShrink: 0,
                                }}
                            >
                                {/* Quote Text */}
                                <p
                                    style={{
                                        position: "relative",
                                        zIndex: 1,
                                        color: "var(--Light-Border-Text-Secondary, #969696)",
                                        fontFeatureSettings: "'liga' off, 'clig' off",
                                        fontFamily:
                                            'var(--Font-family-Body, "Plus Jakarta Sans", sans-serif)',
                                        fontSize: "var(--Font-size-Small, 1rem)",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "var(--Line-height-Small, 1.5rem)",
                                        margin: 0,
                                    }}
                                >
                                    {item.quote}
                                </p>

                                {/* Author Info */}
                                <div
                                    style={{
                                        position: "relative",
                                        zIndex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        gap: "0.125rem",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "var(--Light-Border-Text-Primary, #1A1A1A)",
                                            fontFeatureSettings: "'liga' off, 'clig' off",
                                            fontFamily:
                                                'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                                            fontSize: "var(--Font-size-Small, 1rem)",
                                            fontStyle: "normal",
                                            fontWeight: 600,
                                            lineHeight: "var(--Line-height-Small, 1.5rem)",
                                        }}
                                    >
                                        {item.name}
                                    </span>

                                    <span
                                        style={{
                                            color: "var(--Light-Border-Text-Tertiary, #B8B8B8)",
                                            fontFeatureSettings: "'liga' off, 'clig' off",
                                            fontFamily:
                                                'var(--Font-family-Body, "Plus Jakarta Sans", sans-serif)',
                                            fontSize: "var(--Font-size-Tiny, 0.875rem)",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "var(--Line-height-Tiny, 1.25rem)",
                                        }}
                                    >
                                        {item.role}
                                    </span>
                                </div>

                                {/* Bottom-Right Decorative Logo Watermark */}
                                <img
                                    src="/images/degital-media-networks/Group%20523.svg"
                                    alt=""
                                    aria-hidden="true"
                                    style={{
                                        width: "13.5rem",
                                        minHeight: "13.5rem",
                                        objectFit: "contain",
                                        position: "absolute",
                                        right: "-1.5rem",
                                        bottom: "-2.75rem",
                                        opacity: 0.55,
                                        mixBlendMode: "luminosity",
                                        pointerEvents: "none",
                                        userSelect: "none",
                                        zIndex: 0,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== SECTION 6: FAQ SECTION ==================== */}
            <section
                style={{
                    display: "flex",
                    width: "100%",
                    maxWidth: "90rem",
                    minHeight: "50rem",
                    padding: "6.25rem var(--Spacing-56, 3.5rem)",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "#FFF",
                    boxSizing: "border-box",
                }}
            >
                {/* Strict Side-by-Side Row (No wrapping on desktop screens) */}
                <div className="digital-faq-row"
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "3.5rem",
                        flexWrap: "nowrap",
                    }}
                >
                    {/* Left Column: FAQ Label + Heading + Subtext */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            flex: "1 1 auto",
                            maxWidth: "33.5rem",
                        }}
                    >
                        {/* FAQ Label */}
                        <span
                            style={{
                                color: "var(--Light-Border-Text-Tertiary, #B8B8B8)",
                                fontFeatureSettings: "'liga' off, 'clig' off",
                                fontFamily:
                                    'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                                fontSize: "var(--Font-size-Tiny, 0.875rem)",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-Tiny, 1.25rem)",
                                textTransform: "uppercase",
                                marginBottom: "0.25rem",
                            }}
                        >
                            FAQ
                        </span>

                        {/* Main Heading */}
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
                                margin: "0 0 1rem 0",
                            }}
                        >
                            Questions people asked?
                        </h2>

                        {/* Subtext */}
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
                                margin: 0,
                            }}
                        >
                            Find answers to common questions about our digital media network
                            services, channel development and creator partnerships.
                        </p>
                    </div>

                    {/* Right Column: Accordion List (45.9375rem width, scales down smoothly if viewport is narrower) */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "45.9375rem",
                            flex: "0 1 45.9375rem",
                            gap: "1rem",
                        }}
                    >
                        {FAQ_ITEMS.map((faq, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <div
                                    key={faq.id}
                                    role="button"
                                    tabIndex={0}
                                    aria-expanded={isOpen}
                                    onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggleFaq(index); } }}
                                    onClick={() => toggleFaq(index)}
                                    style={{
                                        display: "flex",
                                        width: "100%",
                                        padding:
                                            "var(--Spacing-12, 0.75rem) var(--Spacing-12, 0.75rem) var(--Spacing-16, 1rem) var(--Spacing-12, 0.75rem)",
                                        alignItems: "flex-start",
                                        justifyContent: "space-between",
                                        gap: "var(--Spacing-8, 0.5rem)",
                                        borderRadius: "var(--Corner-radius-0, 0)",
                                        borderBottom:
                                            "1px solid var(--Stroke-Weak-2, rgba(0, 17, 102, 0.10))",
                                        boxSizing: "border-box",
                                        cursor: "pointer",
                                    }}
                                >
                                    {/* Question & Answer Text Wrapper */}
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            gap: "0.5rem",
                                            flex: 1,
                                        }}
                                    >
                                        <h3
                                            style={{
                                                color: isOpen
                                                    ? "#000000"
                                                    : "var(--Light-Border-Text-Secondary, #969696)",
                                                fontFeatureSettings: "'liga' off, 'clig' off",
                                                fontFamily:
                                                    'var(--Font-family-Body, "Plus Jakarta Sans", sans-serif)',
                                                fontSize: "var(--Font-size-Small, 1rem)",
                                                fontStyle: "normal",
                                                fontWeight: isOpen ? 600 : 500,
                                                lineHeight: "var(--Line-height-Small, 1.5rem)",
                                                margin: 0,
                                                transition: "color 0.2s ease",
                                            }}
                                        >
                                            {faq.question}
                                        </h3>

                                        {isOpen && (
                                            <p
                                                style={{
                                                    color: "var(--Light-Border-Text-Tertiary, #B8B8B8)",
                                                    fontFeatureSettings: "'liga' off, 'clig' off",
                                                    fontFamily:
                                                        'var(--Font-family-Body, "Plus Jakarta Sans", sans-serif)',
                                                    fontSize: "var(--Font-size-Small, 1rem)",
                                                    fontStyle: "normal",
                                                    fontWeight: 400,
                                                    lineHeight: "var(--Line-height-Small, 1.5rem)",
                                                    margin: 0,
                                                }}
                                            >
                                                {faq.answer}
                                            </p>
                                        )}
                                    </div>

                                    {/* Open / Close Circle Icon (1.5rem x 1.5rem) */}
                                    <div
                                        style={{
                                            width: "1.5rem",
                                            height: "1.5rem",
                                            flexShrink: 0,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {isOpen ? (
                                            /* Minus Circle Icon (Brown/Gold when Open) */
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="9"
                                                    stroke="#8F6C1A"
                                                    strokeWidth="1.5"
                                                />
                                                <path
                                                    d="M8.5 12H15.5"
                                                    stroke="#8F6C1A"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        ) : (
                                            /* Plus Circle Icon (Slate/Grey when Closed) */
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="9"
                                                    stroke="#7A869A"
                                                    strokeWidth="1.5"
                                                />
                                                <path
                                                    d="M12 8.5V15.5M8.5 12H15.5"
                                                    stroke="#7A869A"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <NewsBlogsSection />
            <PreFooterBanner type={2} />
        </div>
    )}</LocalizedContent>;
}