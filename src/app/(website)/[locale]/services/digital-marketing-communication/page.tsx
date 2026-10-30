"use client";

import { PreFooterBanner } from "@/components/shared/pre-footer-banner";
import {
  LocalizedContent,
} from "@/components/localization/localized-content";
import Link from "@/components/navigation/website-link";
import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { NewsBlogsSection } from "@/components/landing/news-blogs-section";
import { TextReveal } from "@/components/motion/text-reveal";

/* =========================================================
   TYPES & DATA
   ========================================================= */

interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

interface ProcessPillar {
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

interface MomentItem {
  id: number;
  title: string;
  year: string;
  category: string;
  imageSrc: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: "01",
    number: "01",
    title: "Search Marketing",
    description:
      "Improving visibility through search advertising and related strategies.",
  },
  {
    id: "02",
    number: "02",
    title: "Social Media Management",
    description:
      "Managing social channels through consistent content and audience engagement.",
  },
  {
    id: "03",
    number: "03",
    title: "Performance Marketing",
    description:
      "Running paid campaigns focused on defined marketing objectives.",
  },
  {
    id: "04",
    number: "04",
    title: "Content Marketing",
    description:
      "Creating content that informs, engages and builds audience interest.",
  },
  {
    id: "05",
    number: "05",
    title: "Online Reputation Management",
    description:
      "Supporting brand perception and online conversations.",
  },
  {
    id: "06",
    number: "06",
    title: "Strategic Communications",
    description:
      "Developing clear, consistent messaging for defined audiences.",
  },
  {
    id: "07",
    number: "07",
    title: "Public Affairs Campaigns",
    description:
      "Communicating public-interest initiatives and institutional messages.",
  },
  {
    id: "08",
    number: "08",
    title: "Digital Outreach Programs",
    description:
      "Connecting digital initiatives with relevant communities and audiences.",
  },
  {
    id: "09",
    number: "09",
    title: "Political Communications",
    description:
      "Supporting political messaging and campaign communication.",
  },
];

const PROCESS_PILLARS: ProcessPillar[] = [
  {
    id: 1,
    title: "Purpose-Driven Strategy",
    description:
      "Every campaign begins with clear objectives, audience understanding and a defined communication direction.",
    icon: "/images/media/video-conference.svg",
  },
  {
    id: 2,
    title: "Creative Storytelling",
    description:
      "We shape messages and content that communicate ideas clearly and make brands more relatable.",
    icon: "/images/media/video-conference.svg",
  },
  {
    id: 3,
    title: "Connected Communication",
    description:
      "We bring together relevant digital channels and communication formats to maintain a consistent message.",
    icon: "/images/media/video-conference.svg",
  },
  {
    id: 4,
    title: "Audience-First Thinking",
    description:
      "We consider audience needs, interests and context when shaping campaign messaging and outreach.",
    icon: "/images/media/video-conference.svg",
  },
  {
    id: 5,
    title: "Performance Awareness",
    description:
      "We value clear messaging, appropriate approvals and communication suited to the audience and context.",
    icon: "/images/media/video-conference.svg",
  },
  {
    id: 6,
    title: "Responsible Communication",
    description:
      "We value clear messaging, appropriate approvals and communication suited to the audience and context.",
    icon: "/images/media/video-conference.svg",
  },
];

const TOUCHPOINT_ROWS = [
  ["Social media creatives", "Content series", "Digital advertisements"],
  ["Search campaign examples", "Public awareness communication"],
  ["Brand storytelling and content", "Digital outreach materials"],
];

const MOMENTS_DATA: MomentItem[] = [
  {
    id: 1,
    title: "Partnered with Qualcomm",
    year: "2026",
    category: "Digital advertisements",
    imageSrc: "/images/digital-marketing/Image2.png",
  },
  {
    id: 2,
    title: "Suman Cultural Utsav",
    year: "2026",
    category: "Culture",
    imageSrc: "/images/digital-marketing/Image3.png",
  },
  {
    id: 3,
    title: "Sonic Nights Live",
    year: "2025",
    category: "Music",
    imageSrc: "/images/event-experience/sonic-nights-live.jpg",
  },
  {
    id: 4,
    title: "Global Leadership Summit",
    year: "2025",
    category: "Corporate",
    imageSrc: "/images/media/rhythm-and-roots.png",
  },
  {
    id: 5,
    title: "National Heritage Conclave",
    year: "2025",
    category: "Public Engagement",
    imageSrc: "/images/media/stories-unplugged.png",
  },
];

const TESTIMONIALS: TestimonialCard[] = [
  {
    id: 1,
    quote:
      "“The team understood our communication goals and brought fresh ideas to the table. Their collaborative approach helped us develop a clearer direction for our digital presence. What stood out was their willingness to understand the brief before suggesting solutions. The discussions were focused, creative and aligned with our campaign objectives.”",
    name: "V Reddy",
    role: "Marketing Manager",
  },
  {
    id: 2,
    quote:
      "“What stood out was their willingness to understand the brief before suggesting solutions. The discussions were focused, creative and aligned with our campaign objectives. The focus on storytelling and audience relevance made our conversations more meaningful. It was refreshing to explore content ideas with both creativity and purpose.”",
    name: "Nivedita Kulkarni",
    role: "Entrepreneur",
  },
  {
    id: 3,
    quote:
      "“The focus on storytelling and audience relevance made our conversations more meaningful. It was refreshing to explore content ideas with both creativity and purpose.”",
    name: "Prajakta Mali",
    role: "Actress",
  },
  {
    id: 4,
    quote:
      "“The team approached our communication requirements with a practical mindset. Understanding the audience and choosing the right way to reach them were important parts of the discussion.”",
    name: "Priya Sah",
    role: "Content and Marketing Expert",
  },
  {
    id: 5,
    quote:
      "“Understanding the audience and choosing the right way to reach them were important parts of the discussion. Their structured approach to digital marketing and omnichannel communication helped us achieve measurable reach and engagement.”",
    name: "Jayant Waghdhare",
    role: "Marketing Head",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 1,
    question: "What types of digital marketing campaigns can you support?",
    answer:
      "Potential campaign requirements include social media, performance marketing, search marketing, content marketing and digital outreach, subject to confirmed service availability.",
  },
  {
    id: 2,
    question: "Can campaigns be tailored to a specific audience?",
    answer:
      "Yes. Every campaign strategy is custom-built around defined audience segments, geographic preferences, linguistic nuances and demographic behavioral patterns.",
  },
  {
    id: 3,
    question: "Do you support public affairs and institutional communication?",
    answer:
      "Yes. We support government bodies, public sector enterprises and civic institutions with structured public awareness programs, citizen engagement and policy dissemination.",
  },
  {
    id: 4,
    question: "How do you evaluate campaign performance?",
    answer:
      "We analyze full-funnel metrics including reach, active engagement rates, brand sentiment, conversion efficiency and total ROI using robust analytics dashboards.",
  },
  {
    id: 5,
    question: "How can we discuss a campaign with Suman?",
    answer:
      "You can connect directly with our strategic team by clicking 'Discuss a Campaign' or reaching out through our business inquiry portal to initiate a discovery session.",
  },
];

/* =========================================================
   ANIMATION VARIANTS (FRAMER MOTION)
   ========================================================= */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* =========================================================
   SVG ICONS
   ========================================================= */

function ChevronRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 12L10 8L6 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5.83331 14.1667L14.1666 5.83334"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66669 5.83334H14.1667V13.3333"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}



/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function DigitalMarketingPage() {
  // Not open by default as requested: "will not be default open"
  const [openCapability, setOpenCapability] = useState<string | null>(null);
  const [hoveredCapability, setHoveredCapability] = useState<string | null>(null);

  // Active open card: hover opens it in the same style as clicking +, locked on click
  const activeCapabilityId = hoveredCapability ?? openCapability;

  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [activeMomentIndex, setActiveMomentIndex] = useState<number>(0);

  const touchpointsRef = useRef<HTMLElement>(null);
  const { scrollYProgress: touchpointsScrollProgress } = useScroll({
    target: touchpointsRef,
    offset: ["start end", "end start"],
  });
  const reduceMotion = useReducedMotion();

  const headerOpacity = useTransform(
    touchpointsScrollProgress,
    [0.06, 0.24, 0.76, 0.94],
    [0, 1, 1, 0]
  );
  const headerY = useTransform(
    touchpointsScrollProgress,
    [0.06, 0.24, 0.76, 0.94],
    [35, 0, 0, -35]
  );
  const headerScale = useTransform(
    touchpointsScrollProgress,
    [0.06, 0.24, 0.76, 0.94],
    [0.96, 1, 1, 0.96]
  );

  const row1Opacity = useTransform(
    touchpointsScrollProgress,
    [0.1, 0.28, 0.72, 0.9],
    [0, 1, 1, 0]
  );
  const row1Y = useTransform(
    touchpointsScrollProgress,
    [0.1, 0.28, 0.72, 0.9],
    [35, 0, 0, -35]
  );
  const row1Scale = useTransform(
    touchpointsScrollProgress,
    [0.1, 0.28, 0.72, 0.9],
    [0.96, 1, 1, 0.96]
  );

  const row2Opacity = useTransform(
    touchpointsScrollProgress,
    [0.14, 0.32, 0.68, 0.86],
    [0, 1, 1, 0]
  );
  const row2Y = useTransform(
    touchpointsScrollProgress,
    [0.14, 0.32, 0.68, 0.86],
    [35, 0, 0, -35]
  );
  const row2Scale = useTransform(
    touchpointsScrollProgress,
    [0.14, 0.32, 0.68, 0.86],
    [0.96, 1, 1, 0.96]
  );

  const row3Opacity = useTransform(
    touchpointsScrollProgress,
    [0.18, 0.36, 0.64, 0.82],
    [0, 1, 1, 0]
  );
  const row3Y = useTransform(
    touchpointsScrollProgress,
    [0.18, 0.36, 0.64, 0.82],
    [35, 0, 0, -35]
  );
  const row3Scale = useTransform(
    touchpointsScrollProgress,
    [0.18, 0.36, 0.64, 0.82],
    [0.96, 1, 1, 0.96]
  );

  const handleOpenCapability = (id: string) => {
    setOpenCapability(id);
    setHoveredCapability(id);
  };

  const handleCloseCapability = () => {
    setOpenCapability(null);
    setHoveredCapability(null);
  };

  const toggleFaq = (id: number) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
      <LocalizedContent>
      <main className="w-full bg-white text-[#1A1A1A] overflow-x-hidden selection:bg-[#8F6C1A] selection:text-white">
        {/* Custom CSS overrides */}
        <style>{`
          @keyframes infiniteMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .testimonial-marquee {
            display: flex;
            width: max-content;
            gap: 1.5rem;
            animation: infiniteMarquee 45s linear infinite;
          }
          .testimonial-marquee:hover {
            animation-play-state: paused;
          }
          .digital-hero-container {
            display: flex;
            width: 100%;
            max-width: 100%;
            min-height: 50.1875rem;
            padding: 3.5rem;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            gap: 2.5rem;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 33.54%, #000 84.23%), url('/images/digital-marketing/Image1.jpg') lightgray 50% / cover no-repeat;
            box-sizing: border-box;
          }
          @media (max-width: 900px) {
            .digital-hero-container {
              height: auto;
              min-height: 38rem;
              padding: 7rem 1.5rem 2.5rem 1.5rem;
              gap: 2rem;
            }
            .digital-hero-row {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 2rem !important;
            }
            .digital-logos-strip {
              padding: 2rem 1.5rem !important;
              gap: 2rem !important;
            }
            .capabilities-section-container {
              padding: 4rem 1.5rem !important;
              gap: 3.5rem !important;
            }
            .capabilities-heading-title {
              font-size: clamp(2.5rem, 8vw, 4rem) !important;
              line-height: 1.15 !important;
            }
            .capability-row-item {
              padding: 1.5rem 1rem !important;
            }
            .capability-open-box {
              padding: 1.5rem 1rem !important;
            }
          }
          .digital-logos-strip {
            display: flex;
            width: 100%;
            max-width: 100%;
            padding: 2.625rem clamp(1.5rem, 4vw, 3.5rem);
            justify-content: center;
            align-items: center;
            background: #FFF;
            gap: clamp(2rem, 5vw, 4.5rem);
            flex-wrap: wrap;
            box-sizing: border-box;
          }
          .capabilities-section-container {
            display: flex;
            width: 100%;
            max-width: 100%;
            padding: 6.25rem clamp(1.5rem, 4vw, 3.5rem);
            flex-direction: column;
            align-items: flex-start;
            gap: 6.25rem;
            align-self: stretch;
            background: #000;
            box-sizing: border-box;
          }
          .capabilities-heading-title {
            color: #FFF;
            font-feature-settings: 'liga' off, 'clig' off;
            font-family: var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif);
            font-size: clamp(2.75rem, 6vw, 5.625rem);
            font-style: normal;
            font-weight: 600;
            line-height: 120%; /* 6.75rem */
            letter-spacing: -0.03125rem;
            margin: 0;
          }
          .capabilities-list-wrapper {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            align-self: stretch;
            width: 100%;
          }
          .capability-row-item {
            display: flex;
            padding: 2rem;
            justify-content: space-between;
            align-items: flex-start;
            align-self: stretch;
            width: 100%;
            box-sizing: border-box;
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
            transition: background-color 0.2s ease, border-color 0.2s ease;
          }
          .capability-open-box {
            display: flex;
            padding: 2rem;
            justify-content: space-between;
            align-items: flex-start;
            align-self: stretch;
            width: 100%;
            box-sizing: border-box;
            border-radius: 0px !important;
            background: #EAE5DB;
          }
          .planning-section-container {
            display: flex;
            width: 100%;
            max-width: 100%;
            padding: 6.25rem clamp(1.5rem, 4vw, 3.5rem);
            flex-direction: column;
            align-items: center;
            gap: 6.25rem;
            background: #FFF;
            box-sizing: border-box;
          }
          .planning-cards-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 2rem;
            width: 100%;
            align-self: stretch;
          }
          .planning-card {
            display: flex;
            height: 16.9375rem;
            padding: 1.25rem;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            grid-row: span 1;
            grid-column: span 1;
            justify-self: stretch;
            border-radius: 1rem;
            background: rgba(235, 235, 235, 0.31);
            box-sizing: border-box;
            transition: background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
          }
          .planning-card:hover {
            background: #EAE5DB;
          }
          .planning-card-icon-box {
            display: flex;
            width: 3.5rem;
            height: 3.5rem;
            padding: 0.625rem 0.75rem 0.6875rem 0.5625rem;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            border-radius: 0.5rem;
            border: 1px solid rgba(143, 108, 26, 0.20);
            background: #FFF;
            box-sizing: border-box;
          }
          @media (max-width: 1024px) {
            .planning-cards-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
          @media (max-width: 900px) {
            .planning-section-container {
              padding: 4rem 1.5rem !important;
              gap: 3.5rem !important;
            }
          }
          @media (max-width: 640px) {
            .planning-cards-grid {
              grid-template-columns: 1fr;
            }
            .planning-card {
              height: auto !important;
              min-height: 16.9375rem !important;
            }
          }
          .touchpoint-section-container {
            display: flex;
            width: 100%;
            max-width: 100%;
            padding: 6.25rem clamp(1.5rem, 4vw, 3.5rem);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 6.25rem;
            align-self: stretch;
            background: #FFF;
            box-sizing: border-box;
          }
          .touchpoints-grid-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1.75rem;
            width: 100%;
            box-sizing: border-box;
          }
          .touchpoints-row {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1.75rem;
            flex-wrap: wrap;
            width: 100%;
            box-sizing: border-box;
          }
          .touchpoint-capsule {
            display: flex;
            padding: 2rem;
            justify-content: center;
            align-items: center;
            gap: var(--Spacing-4, 0.25rem);
            border-radius: 2.75rem;
            border: 1px solid #D2D2D2;
            background: #FFF;
            box-sizing: border-box;
            transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
          }
          .touchpoint-capsule:hover {
            border-color: #8F6C1A;
            background-color: #FAF8F5;
          }
          .touchpoint-capsule-text {
            color: #8F6C1A;
            text-align: center;
            font-feature-settings: 'liga' off, 'clig' off;
            font-family: var(--Font-family-Heading, Inter, sans-serif);
            font-size: var(--Font-size-Heading-2, 2rem);
            font-style: normal;
            font-weight: 600;
            line-height: var(--Line-height-Heading-2, 2.5rem);
            white-space: nowrap;
          }
          @media (max-width: 900px) {
            .touchpoint-section-container {
              padding: 4rem 1.5rem !important;
              gap: 3.5rem !important;
            }
            .touchpoints-grid-container {
              gap: 1.25rem !important;
            }
            .touchpoints-row {
              gap: 1rem !important;
            }
            .touchpoint-capsule {
              padding: 1.25rem 1.75rem !important;
              border-radius: 2rem !important;
            }
            .touchpoint-capsule-text {
              font-size: 1.125rem !important;
              line-height: 1.5rem !important;
              white-space: normal !important;
            }
          }
          .digital-cta-section-container {
            display: flex;
            width: 100%;
            max-width: 100%;
            padding: 3.5rem clamp(1.5rem, 4vw, 3.5rem);
            align-items: center;
            justify-content: space-between;
            gap: 6.25rem;
            background: #F9F9F9;
            box-sizing: border-box;
          }
          @media (max-width: 900px) {
            .digital-cta-section-container {
              padding: 2.5rem 1.5rem !important;
              gap: 2rem !important;
              flex-direction: column !important;
              align-items: flex-start !important;
            }
          }
          .digital-faq-section-container {
            display: flex;
            width: 100%;
            max-width: 100%;
            justify-content: center;
            background: #FFF;
          }
          .digital-faq-inner {
            display: flex;
            width: 100%;
            max-width: 100%;
            padding: 6.25rem clamp(1.5rem, 4vw, 3.5rem);
            flex-direction: column;
            align-items: center;
            box-sizing: border-box;
          }
          .digital-faq-row {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: flex-start;
            gap: 3.5rem;
          }
          .digital-faq-left {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            flex: 1;
            max-width: 33.5625rem;
            flex-shrink: 0;
          }
          .digital-faq-list {
            display: flex;
            width: 100%;
            max-width: 45.9375rem;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: var(--Spacing-16, 1rem);
          }
          .digital-faq-item {
            display: flex;
            width: 100%;
            padding: var(--Spacing-12, 0.75rem) var(--Spacing-12, 0.75rem) var(--Spacing-16, 1rem) var(--Spacing-12, 0.75rem);
            align-items: flex-start;
            gap: var(--Spacing-8, 0.5rem);
            border-radius: var(--Corner-radius-0, 0);
            border-bottom: 1px solid var(--Stroke-Weak-2, rgba(0, 17, 102, 0.10));
            flex-direction: column;
            box-sizing: border-box;
          }
          @media (max-width: 1024px) {
            .digital-faq-inner {
              padding: 4rem 1.5rem !important;
            }
            .digital-faq-row {
              flex-direction: column !important;
              gap: 2.5rem !important;
            }
            .digital-faq-left {
              width: 100% !important;
              max-width: 100% !important;
            }
            .digital-faq-list {
              width: 100% !important;
              max-width: 100% !important;
            }
          }
        `}</style>

        {/* =========================================================
            SECTION 1: HERO
            ========================================================= */}
        <section
          aria-labelledby="hero-heading"
          className="w-full flex justify-center bg-black overflow-hidden"
        >
          <motion.div
            className="digital-hero-container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div
              className="digital-hero-row w-full flex items-end justify-between"
              style={{ gap: "6.25rem" }}
            >
              {/* Left Column: Text Wrapper */}
              <div className="flex flex-col items-start flex-1 max-w-[54rem]">
                <motion.span
                  variants={itemVariants}
                  style={{
                    color: "#FFF",
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
                  DIGITAL MARKETING &amp; COMMUNICATIONS
                </motion.span>

                <TextReveal
                  as="h1"
                  id="hero-heading"
                  text="We partnered with X Company"
                  effect="mask"
                  split="words"
                  style={{
                    color: "var(--Text-Inverse-strong-2, #FFF)",
                    fontFeatureSettings: "'liga' off, 'clig' off",
                    fontFamily:
                      'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                    fontSize: "var(--Font-size-Heading-1, 2.5rem)",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "var(--Line-height-Heading-1, 3rem)",
                    letterSpacing: "-0.03125rem",
                    margin: "0.25rem 0 0 0",
                  }}
                />

                <motion.p
                  variants={itemVariants}
                  style={{
                    color: "var(--Light-Border-Text-Secondary, #969696)",
                    fontFeatureSettings: "'liga' off, 'clig' off",
                    fontFamily:
                      'var(--Font-family-Body, "Plus Jakarta Sans", sans-serif)',
                    fontSize: "var(--Font-size-Heading-4, 1.25rem)",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "var(--Line-height-Heading-4, 1.75rem)",
                    margin: "1rem 0 0 0",
                  }}
                >
                  From social media and content marketing to performance campaigns and
                  strategic communications, we help organisations communicate clearly
                  and connect with their audiences across digital platforms.
                </motion.p>
              </div>

              {/* Right Side: Discuss a Campaign Button */}
              <motion.div variants={itemVariants} className="shrink-0 pb-1">
                <Link
                  href="/contact/form?type=general"
                  style={{
                    display: "flex",
                    padding: "var(--Spacing-16, 1rem)",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "var(--Spacing-4, 0.25rem)",
                    borderRadius: "var(--Spacing-12, 0.75rem)",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white group"
                >
                  <span
                    style={{
                      color: "#FFF",
                      fontFeatureSettings: "'liga' off, 'clig' off",
                      fontFamily:
                        'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                      fontSize: "1rem",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "1.5rem",
                    }}
                  >
                    Discuss a Campaign
                  </span>
                  <ChevronRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* =========================================================
            SECTION 2: LOGO STRIP
            ========================================================= */}
        <section
          aria-label="Partner Brand Logos"
          className="w-full bg-white flex justify-center border-b border-black/[0.04] overflow-hidden"
        >
          <motion.div
            className="digital-logos-strip"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 1. AWS */}
            <div className="flex items-center justify-center shrink-0">
              <Image
                src="/images/partners/company/company-gallery-1.svg"
                alt="Amazon Web Services"
                width={80}
                height={36}
                className="object-contain"
              />
            </div>

            {/* 2. Government of Maharashtra */}
            <div className="flex items-center justify-center shrink-0">
              <Image
                src="/images/partners/company/company-gallery-2.svg"
                alt="Government of Maharashtra"
                width={88}
                height={88}
                className="w-[5.5rem] h-[5.5rem] aspect-square -rotate-[0.003deg] object-contain"
              />
            </div>

            {/* 3. Laminar */}
            <div className="flex items-center justify-center shrink-0">
              <Image
                src="/images/partners/company/company-gallery-3.svg"
                alt="Laminar"
                width={189}
                height={74}
                className="w-[11.8125rem] h-[4.625rem] aspect-[189/74] -rotate-[0.003deg] object-contain"
              />
            </div>

            {/* 4. Z मराठी Orange Logo Box */}
            <div className="flex items-center justify-center shrink-0">
              <Image
                src="/images/partners/company/company-gallery-4.svg"
                alt="Z मराठी"
                width={88}
                height={54}
                className="w-[5.5rem] h-[3.375rem] aspect-[44/27] -rotate-[0.003deg] object-contain"
              />
            </div>

            {/* 5. Festival de Cannes */}
            <div className="flex items-center justify-center shrink-0">
              <Image
                src="/images/partners/company/company-gallery-5.svg"
                alt="Festival de Cannes"
                width={116}
                height={38}
                className="object-contain"
              />
            </div>
          </motion.div>
        </section>

        {/* =========================================================
            SECTION 3: PHILOSOPHY STATEMENT
            ========================================================= */}
        <section
          aria-label="Strategy & Communication Philosophy"
          className="w-full flex justify-center items-center bg-white py-16 sm:py-24 md:py-32 px-6 sm:px-10 lg:px-[3.5rem] overflow-hidden"
        >
          <motion.div
            className="w-full max-w-full mx-auto text-center px-4 sm:px-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                fontFeatureSettings: "'liga' off, 'clig' off",
                fontFamily:
                  'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: "-0.03125rem",
                textAlign: "center",
              }}
            >
              <span style={{ color: "#000" }}>
                Suman Entertainment &amp; Media brings together strategy,{" "}
              </span>
              <span style={{ color: "#969696" }}>
                creativity and digital channels to help brands and organisations
                communicate with the right audiences. From social media and
                performance marketing to content creation, public affairs and
                digital outreach, we focus on purposeful communication that
                builds connections and supports business objectives.
              </span>
            </p>
          </motion.div>
        </section>

        {/* =========================================================
            SECTION 4: OUR CAPABILITIES (CUSTOM ACCORDION & SMART HOVER)
            Figma Specs:
            padding: 6.25rem 3.5rem; gap: 6.25rem; background: #000;
            heading: font-size: 5.625rem; line-height: 120%;
            row: padding: 2rem; justify-content: space-between;
            items: font-size: 2rem; font-weight: 600; line-height: 2.5rem;
            open box: padding: 2rem; border-radius: 0.5rem; bg: #EFEAE1
            shadow SVG: <path opacity="0.4" d="M16.2945 0H1311.71L1328 16H0L16.2945 0Z" fill="#D6CCA3"/>
            collapse button: 3.5rem x 3.5rem, bg #8F6C1A, radius: 0.75rem
            ========================================================= */}
        <section
          aria-labelledby="capabilities-heading"
          className="w-full bg-[#000] flex justify-center overflow-hidden"
        >
          <div className="capabilities-section-container max-w-[90rem]">
            {/* Heading: 5.625rem (90px) on desktop */}
            <motion.h2
              id="capabilities-heading"
              className="capabilities-heading-title"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Our Capabilities
            </motion.h2>

            {/* Capabilities List */}
            <div
              className="capabilities-list-wrapper"
              onMouseLeave={() => setHoveredCapability(null)}
            >
              {CAPABILITIES.map((item) => {
                const isActive = activeCapabilityId === item.id;

                if (isActive) {
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.99 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      onMouseEnter={() => setHoveredCapability(item.id)}
                      className="w-full flex flex-col items-center"
                    >
                      {/* Shadow behind open card: trapezoid SVG from Figma */}
                      <div className="w-full flex justify-center overflow-hidden -mb-[1px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="16"
                          viewBox="0 0 1328 16"
                          fill="none"
                          preserveAspectRatio="none"
                          className="w-full h-4 block"
                        >
                          <path
                            opacity="0.4"
                            d="M16.2945 0H1311.71L1328 16H0L16.2945 0Z"
                            fill="#D6CCA3"
                          />
                        </svg>
                      </div>

                      {/* Open Box Card (Sharp Edges - No Border Radius as per Figma Image 2) */}
                      <div className="capability-open-box">
                        {/* Left Side: Serial Number + Title & Subheading */}
                        <div className="flex items-start gap-6 sm:gap-10 md:gap-14 flex-1">
                          {/* Serial Number */}
                          <span
                            style={{
                              color: "#000",
                              fontFeatureSettings: "'liga' off, 'clig' off",
                              fontFamily:
                                'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                              fontSize: "var(--Font-size-Heading-2, 2rem)",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "var(--Line-height-Heading-2, 2.5rem)",
                              width: "3rem",
                              flexShrink: 0,
                            }}
                          >
                            {item.number}
                          </span>

                          {/* Text Block */}
                          <div className="flex flex-col items-start max-w-3xl">
                            <h3
                              style={{
                                color: "#000",
                                fontFeatureSettings: "'liga' off, 'clig' off",
                                fontFamily:
                                  'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                                fontSize: "var(--Font-size-Heading-2, 2rem)",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-Heading-2, 2.5rem)",
                                margin: 0,
                              }}
                            >
                              {item.title}
                            </h3>

                            <p
                              style={{
                                color: "var(--Light-Border-Text-Secondary, #969696)",
                                fontFeatureSettings: "'liga' off, 'clig' off",
                                fontFamily:
                                  'var(--Font-family-Body, "Plus Jakarta Sans", sans-serif)',
                                fontSize: "1rem",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "1.5rem",
                                margin: "0.5rem 0 0 0",
                              }}
                            >
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Right Side: Collapse Button (Minus Icon) */}
                        <button
                          type="button"
                          aria-label={`Collapse ${item.title}`}
                          onClick={handleCloseCapability}
                          style={{
                            display: "flex",
                            width: "3.5rem",
                            height: "3.5rem",
                            padding: "0.5rem",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "var(--Spacing-4, 0.25rem)",
                            borderRadius: "var(--Spacing-12, 0.75rem)",
                            background:
                              "linear-gradient(0deg, var(--BrandPrimary-800, #8F6C1A) 0%, var(--BrandPrimary-800, #8F6C1A) 100%), #8F6C1A",
                            border: "none",
                            cursor: "pointer",
                            flexShrink: 0,
                          }}
                          className="hover:opacity-90 active:scale-95 transition-all"
                        >
                          <div
                            style={{
                              width: "1rem",
                              height: "3px",
                              backgroundColor: "#FFF",
                              borderRadius: "2px",
                            }}
                          />
                        </button>
                      </div>
                    </motion.div>
                  );
                }

                // Closed Item Row
                return (
                  <motion.div
                    key={item.id}
                    layout
                    onMouseEnter={() => setHoveredCapability(item.id)}
                    className="capability-row-item group hover:bg-white/[0.02]"
                  >
                    {/* Left: Number + Title */}
                    <div className="flex items-start gap-6 sm:gap-10 md:gap-14 flex-1">
                      <span
                        style={{
                          color: "#FFF",
                          fontFeatureSettings: "'liga' off, 'clig' off",
                          fontFamily:
                            'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                          fontSize: "var(--Font-size-Heading-2, 2rem)",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "var(--Line-height-Heading-2, 2.5rem)",
                          width: "3rem",
                          flexShrink: 0,
                        }}
                      >
                        {item.number}
                      </span>

                      <div className="flex flex-col items-start max-w-3xl">
                        <h3
                          style={{
                            color: "#FFF",
                            fontFeatureSettings: "'liga' off, 'clig' off",
                            fontFamily:
                              'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                            fontSize: "var(--Font-size-Heading-2, 2rem)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-Heading-2, 2.5rem)",
                            margin: 0,
                          }}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Right: Plus Icon Button to Open */}
                    <button
                      type="button"
                      aria-label={`Open ${item.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCapability(item.id);
                      }}
                      className="w-12 h-12 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer shrink-0"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: FROM PLANNING TO EXPERIENCE (PROCESS GRID)
            ========================================================= */}
        <section
          aria-labelledby="planning-heading"
          className="w-full bg-[#FFF] flex justify-center border-b border-black/[0.04] overflow-hidden"
        >
          <div className="planning-section-container">
            {/* Header */}
            <motion.div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--Spacing-4, 0.25rem)",
                alignSelf: "stretch",
                textAlign: "center",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
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
                  textTransform: "uppercase",
                }}
              >
                HOW WE BRING EVENTS TO THE LIFE
              </span>
              <TextReveal
                as="h2"
                id="planning-heading"
                text="From Planning to Experience."
                effect="mask"
                split="words"
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
                  margin: 0,
                }}
              />
            </motion.div>

            {/* 6 Feature Pillars (3x2 Grid) with stagger animation */}
            <motion.div
              className="planning-cards-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={cardStaggerVariants}
            >
              {PROCESS_PILLARS.map((pillar) => (
                <motion.div
                  key={pillar.id}
                  variants={cardItemVariants}
                  className="planning-card"
                >
                  {/* Top Left Icon Container */}
                  <div className="planning-card-icon-box">
                    <Image
                      src={pillar.icon}
                      alt=""
                      width={35}
                      height={35}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Bottom Text Block */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                      alignSelf: "stretch",
                    }}
                  >
                    <h3
                      style={{
                        color: "#1A1A1A",
                        fontFeatureSettings: "'liga' off, 'clig' off",
                        fontFamily:
                          'var(--Font-family-Heading, Inter, sans-serif)',
                        fontSize: "var(--Font-size-Heading-4, 1.25rem)",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "var(--Line-height-Heading-4, 1.75rem)",
                        margin: 0,
                      }}
                    >
                      {pillar.title}
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
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* =========================================================
            SECTION 6: COMMUNICATION ACROSS EVERY TOUCHPOINT
            ========================================================= */}
        <section
          ref={touchpointsRef}
          aria-labelledby="touchpoint-heading"
          className="w-full bg-white flex justify-center border-b border-black/[0.04] overflow-hidden"
        >
          <div className="touchpoint-section-container">
            {/* Header Block with Scroll Reveal & Disappear */}
            <motion.div
              style={
                reduceMotion
                  ? undefined
                  : { opacity: headerOpacity, y: headerY, scale: headerScale }
              }
              className="flex flex-col items-center gap-[0.25rem] text-center"
            >
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
                  textTransform: "uppercase",
                }}
              >
                WE HAVE NAILED IT
              </span>

              <h2
                id="touchpoint-heading"
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
                  margin: 0,
                }}
              >
                Communication Across
                <br className="hidden sm:inline" />
                {" "}Every Touchpoint.
              </h2>
            </motion.div>

            {/* Capsules Grid (3 Rows) with Scroll Reveal & Disappear */}
            <div className="touchpoints-grid-container">
              {/* Row 1 (3 capsules) */}
              <motion.div
                style={
                  reduceMotion
                    ? undefined
                    : { opacity: row1Opacity, y: row1Y, scale: row1Scale }
                }
                className="touchpoints-row"
              >
                {TOUCHPOINT_ROWS[0].map((tag) => (
                  <motion.div
                    key={tag}
                    whileHover={{
                      scale: 1.03,
                      borderColor: "#8F6C1A",
                      backgroundColor: "#FAF8F5",
                    }}
                    transition={{ duration: 0.2 }}
                    className="touchpoint-capsule cursor-default"
                  >
                    <span className="touchpoint-capsule-text">{tag}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Row 2 (2 capsules) */}
              <motion.div
                style={
                  reduceMotion
                    ? undefined
                    : { opacity: row2Opacity, y: row2Y, scale: row2Scale }
                }
                className="touchpoints-row"
              >
                {TOUCHPOINT_ROWS[1].map((tag) => (
                  <motion.div
                    key={tag}
                    whileHover={{
                      scale: 1.03,
                      borderColor: "#8F6C1A",
                      backgroundColor: "#FAF8F5",
                    }}
                    transition={{ duration: 0.2 }}
                    className="touchpoint-capsule cursor-default"
                  >
                    <span className="touchpoint-capsule-text">{tag}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Row 3 (2 capsules) */}
              <motion.div
                style={
                  reduceMotion
                    ? undefined
                    : { opacity: row3Opacity, y: row3Y, scale: row3Scale }
                }
                className="touchpoints-row"
              >
                {TOUCHPOINT_ROWS[2].map((tag) => (
                  <motion.div
                    key={tag}
                    whileHover={{
                      scale: 1.03,
                      borderColor: "#8F6C1A",
                      backgroundColor: "#FAF8F5",
                    }}
                    transition={{ duration: 0.2 }}
                    className="touchpoint-capsule cursor-default"
                  >
                    <span className="touchpoint-capsule-text">{tag}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 7: INTERACTIVE SHOWCASE ACCORDION
            ========================================================= */}
        <section className="relative z-10 flex w-full flex-col items-center gap-[3.5rem] self-stretch bg-black px-6 py-[4rem] md:px-10 lg:gap-[6.25rem] lg:px-[3.5rem] lg:py-[6.25rem]">
          <div className="w-full max-w-[90rem] flex flex-col items-center gap-[3.5rem] lg:gap-[6.25rem]">
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
                  Explore how strategy, creativity and digital communication come{" "}
                </span>
                <span style={{ color: "#969696" }}>
                  together to shape campaigns across social media, content marketing,
                  performance advertising and public outreach.
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
          </div>
        </section>

        {/* =========================================================
            SECTION 8: CTA BANNER (HAVE A MESSAGE WORTH SHARING?)
            ========================================================= */}
        <section
          aria-labelledby="cta-heading"
          className="w-full bg-[#F9F9F9] border-t border-b border-black/[0.05] flex justify-center overflow-hidden"
        >
          <div className="digital-cta-section-container">
            <div className="flex flex-col items-start gap-3 flex-1">
              <h2
                id="cta-heading"
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
                  margin: 0,
                }}
              >
                Have a Message
                <br />
                Worth Sharing?
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
                Let&apos;s explore how the right strategy, creative direction
                and digital channels can help your message reach its audience.
              </p>
            </div>

            <Link
              href="/contact/form?type=general"
              style={{
                display: "flex",
                padding: "var(--Spacing-16, 1rem)",
                justifyContent: "center",
                alignItems: "center",
                gap: "var(--Spacing-4, 0.25rem)",
                borderRadius: "var(--Spacing-12, 0.75rem)",
                background: "var(--BrandPrimary-800, #8F6C1A)",
                color: "#FFF",
                textDecoration: "none",
                flexShrink: 0,
              }}
              className="hover:bg-[#785914] transition-colors shadow-sm"
            >
              <span
                style={{
                  fontFamily:
                    'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
                  fontSize: "1rem",
                  fontWeight: 600,
                  lineHeight: "1.5rem",
                }}
              >
                Discuss a Campaign
              </span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </section>

        {/* =========================================================
            SECTION 9: INFINITE TESTIMONIALS MARQUEE
            ========================================================= */}
        <section
          aria-label="Client Testimonials"
          className="w-full bg-white py-24 sm:py-28 overflow-hidden"
        >
          <div className="w-full overflow-hidden">
            <div className="testimonial-marquee px-6">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((card, idx) => (
                <div
                  key={`${card.id}-${idx}`}
                  style={{
                    display: "flex",
                    width: "29.5rem",
                    maxWidth: "calc(100vw - 3rem)",
                    height: "17.625rem",
                    padding: "1.25rem",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    borderRadius: "1rem",
                    border: "1px solid rgba(214, 204, 163, 0.02)",
                    background: "rgba(214, 204, 163, 0.10)",
                    boxSizing: "border-box",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  {/* Top: Quote Text */}
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
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {card.quote}
                  </p>

                  {/* Bottom: Name & Role */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      position: "relative",
                      zIndex: 2,
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
                      }}
                    >
                      {card.name}
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
                      {card.role}
                    </span>
                  </div>

                  {/* Bottom Right Artwork SVG positioned per Figma inspect */}
                  <div
                    style={{
                      width: "10.875rem",
                      height: "7.0625rem",
                      position: "absolute",
                      right: 0,
                      bottom: 0,
                      mixBlendMode: "luminosity",
                      pointerEvents: "none",
                      userSelect: "none",
                      zIndex: 1,
                    }}
                    aria-hidden="true"
                  >
                    <Image
                      src="/images/creator-ecosystem/creator-ecosystem-artwork-523.svg"
                      alt=""
                      width={174}
                      height={113}
                      className="w-full h-full object-contain object-bottom-right"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 10: FAQ ACCORDION
            ========================================================= */}
        <section
          aria-labelledby="faq-heading"
          className="digital-faq-section-container"
        >
          <div className="digital-faq-inner">
            <div className="digital-faq-row">
              {/* Left Column: Heading and query prompt */}
              <div className="digital-faq-left lg:sticky lg:top-32">
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
                    marginBottom: "0.5rem",
                  }}
                >
                  FAQ
                </span>

                <h2
                  id="faq-heading"
                  style={{
                    color: "var(--Text-Strong, #000)",
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
                  still have a quarry?{" "}
                  <a
                    href="mailto:Contact@sumanentertainment.com"
                    style={{
                      color: "var(--Text-Warning-2, #8F6C1A)",
                      fontFeatureSettings: "'liga' off, 'clig' off",
                      fontFamily:
                        'var(--Font-family-Body, "Plus Jakarta Sans", sans-serif)',
                      fontSize: "var(--Font-size-Small, 1rem)",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "var(--Line-height-Small, 1.5rem)",
                      textDecorationLine: "underline",
                      textDecorationStyle: "solid",
                      textDecorationSkipInk: "none",
                      textDecorationThickness: "auto",
                      textUnderlineOffset: "auto",
                      textUnderlinePosition: "from-font",
                    }}
                    className="hover:opacity-80 transition-opacity"
                  >
                    Contact@sumanentertainment.com
                  </a>
                </p>
              </div>

              {/* Right Column: Accordion Questions */}
              <div className="digital-faq-list">
                {FAQ_ITEMS.map((faq) => {
                  const isOpen = openFaq === faq.id;
                  return (
                    <div key={faq.id} className="digital-faq-item">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between gap-4 text-left cursor-pointer border-none bg-transparent p-0 group"
                      >
                        <span
                          style={{
                            color: isOpen
                              ? "var(--Text-Strong, #000)"
                              : "var(--Light-Border-Text-Tertiary, #B8B8B8)",
                            fontFeatureSettings: "'liga' off, 'clig' off",
                            fontFamily:
                              'var(--Font-family-Body, "Plus Jakarta Sans", sans-serif)',
                            fontSize: "var(--Font-size-Small, 1rem)",
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "var(--Line-height-Small, 1.5rem)",
                            transition: "color 0.2s ease",
                          }}
                          className={isOpen ? "" : "group-hover:text-black/70"}
                        >
                          {faq.question}
                        </span>

                        <span className="shrink-0 flex items-center justify-center w-6 h-6">
                          {isOpen ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              aria-hidden="true"
                              style={{
                                width: "1.5rem",
                                height: "1.5rem",
                                flexShrink: 0,
                              }}
                            >
                              <path
                                d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                stroke="#8F5A39"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              aria-hidden="true"
                              style={{
                                width: "1.5rem",
                                height: "1.5rem",
                                flexShrink: 0,
                              }}
                            >
                              <path
                                d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                stroke="#000D4D"
                                strokeOpacity={0.45}
                              />
                            </svg>
                          )}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            style={{ overflow: "hidden", width: "100%" }}
                          >
                            <p
                              style={{
                                color:
                                  "var(--Light-Border-Text-Tertiary, #B8B8B8)",
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
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 10: NEWS & ANNOUNCEMENTS
            ========================================================= */}
        <NewsBlogsSection eyebrow="Latest Announcements" heading="News" />

        {/* =========================================================
            SECTION 11: PRE-FOOTER BANNER
            ========================================================= */}
        <PreFooterBanner type={1} />
      </main>
    </LocalizedContent>
  );
}
