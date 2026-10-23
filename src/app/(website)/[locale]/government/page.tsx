import React from "react";
import Image from "next/image";
import { NewsBlogsSection } from "@/components/landing/news-blogs-section";

const impactServices = [
  {
    id: "01",
    title: "01. Public Awareness Campaign",
    description:
      "Communication campaigns designed to inform people about public initiatives, services and important issues.",
    image: "/images/psu/Image1.jpg",
    reverse: false, // Image Left, Text Right
  },
  {
    id: "02",
    title: "02. Tourism & Heritage Promotion",
    description:
      "Premium content behind a recurring subscription — built for audiences who want continuous access to a curated entertainment library.",
    image: "/images/psu/Image2.jpg",
    reverse: true, // Text Left, Image Right
  },
  {
    id: "03",
    title: "03. Cultural Documentation",
    description:
      "Showcasing regional culture, traditions, people and stories through media and content production.",
    image: "/images/psu/Image3.jpg",
    reverse: false, // Image Left, Text Right
  },
  {
    id: "04",
    title: "04. Government & Institutional Events",
    description:
      "Supporting the communication and execution of public, cultural and institutional events.",
    image: "/images/psu/Image4.jpg",
    reverse: true, // Text Left, Image Right
  },
];

export default function PsuServicesPage() {
  return (
    <div className="w-full min-h-screen bg-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Google Fonts & Font Feature Settings */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        
        .no-ligatures {
          font-feature-settings: 'liga' off, 'clig' off;
        }
      `}</style>

      {/* =====================================================================
          HERO SECTION
      ===================================================================== */}
      <main className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-between">
        {/* Responsive Full-Screen Background Image Container */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src="/images/psu/Frame 523.png"
              alt="Government, PSU & Institutional Services Background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center scale-105"
            />
          </div>
        </div>

        {/* Linear Gradient Overlay */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(180deg, #000 0.02%, rgba(51, 51, 51, 0.46) 29.33%, #000 71.47%)",
          }}
        />

        {/* Hero Content Container */}
        <div className="relative z-20 w-full max-w-[90rem] mx-auto px-6 md:px-16 mt-[6.5rem] pb-36 flex-1 flex flex-col justify-between">
          {/* Top Left Section: Tagline & Main Display Heading */}
          <div className="max-w-[54rem]">
            {/* Tiny/Bold Text */}
            <p
              className="no-ligatures uppercase tracking-wide mb-3"
              style={{
                color: "#FFF",
                fontFamily: 'var(--Font-family-Heading, "Plus Jakarta Sans")',
                fontSize: "var(--Font-size-Tiny, 0.875rem)",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "var(--Line-height-Tiny, 1.25rem)",
              }}
            >
              GOVERNMENT, PSU & INSTITUTIONAL SERVICES
            </p>

            {/* Main Display/Semi Bold Heading */}
            <h1
              className="no-ligatures"
              style={{
                color: "var(--Text-Inverse-strong-2, #FFF)",
                fontFamily: 'var(--Font-family-Heading, "Plus Jakarta Sans")',
                fontSize:
                  "clamp(2.25rem, 4vw, var(--Font-size-Display, 3.5rem))",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "1.15",
                letterSpacing: "-0.0625rem",
              }}
            >
              Communication That Connects Institutions with People.
            </h1>
          </div>

          {/* Bottom Right Section (Frame 636) */}
          <div className="self-end w-full max-w-[38rem] mt-40 md:mt-32 flex flex-col items-start">
            {/* Bottom Right Text */}
            <p
              className="no-ligatures"
              style={{
                color: "var(--Text-Inverse-strong-2, #FFF)",
                fontFamily: 'var(--Font-family-Heading, "Plus Jakarta Sans")',
                fontSize: "var(--Font-size-Subheading, 1.375rem)",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "2rem",
                letterSpacing: "-0.015rem",
              }}
            >
              Supporting government bodies and institutions through strategic
              communication, digital outreach and public-facing campaigns.
            </p>

            {/* 2rem Spacing (From Frame 636) */}
            <div className="h-[2rem] w-full" />

            {/* "Discuss a Project" Button */}
            <button
              type="button"
              className="group cursor-pointer text-white hover:opacity-80 transition-opacity"
              style={{
                display: "flex",
                padding: "0 var(--Spacing-0, 0)",
                justifyContent: "center",
                alignItems: "center",
                gap: "var(--Spacing-0, 0)",
              }}
            >
              <span
                className="text-sm font-semibold tracking-wide flex items-center gap-2.5 py-2"
                style={{
                  display: "flex",
                  padding: "0 var(--Spacing-0, 0)",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>Discuss a Project</span>
                <ChevronRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>

        {/* Responsive Bottom White Curved Shape (Rectangle 410) */}
        <svg
          viewBox="0 0 1456 97"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-[4rem] md:h-[6.03125rem] pointer-events-none z-20"
        >
          <path
            d="M0 97C485.333 15 970.667 15 1456 97H0Z"
            fill="#FFF"
          />
        </svg>
      </main>

      {/* =====================================================================
          BELOW HERO: COMMUNICATION FOR PUBLIC IMPACT SECTION
      ===================================================================== */}
      <section
        className="w-full max-w-[90rem] mx-auto px-6 md:px-[3.5rem] py-[6.25rem]"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6.25rem",
          alignSelf: "stretch",
          background: "#FFF",
        }}
      >
        {/* Section Header (Frame 475) */}
        <div className="w-full flex flex-col items-center">
          {/* Small Text */}
          <p
            className="no-ligatures uppercase"
            style={{
              color: "var(--Light-Border-Text-Secondary, #969696)",
              textAlign: "center",
              fontFamily: 'var(--Font-family-Heading, "Plus Jakarta Sans")',
              fontSize: "var(--Font-size-Tiny, 0.875rem)",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "var(--Line-height-Tiny, 1.25rem)",
            }}
          >
            GOVERNMENT, PSU & INSTITUTIONAL SERVICES
          </p>

          {/* Main Heading */}
          <h2
            className="no-ligatures mt-1"
            style={{
              color: "var(--Light-Border-Text-Primary, #1A1A1A)",
              textAlign: "center",
              fontFamily: 'var(--Font-family-Heading, "Plus Jakarta Sans")',
              fontSize: "clamp(2rem, 3.5vw, var(--Font-size-Heading-1, 2.5rem))",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "var(--Line-height-Heading-1, 3rem)",
              letterSpacing: "-0.03125rem",
            }}
          >
            Communication for Public Impact
          </h2>

          {/* 0.75rem (12px) Spacing shown in Figma spec */}
          <div className="h-[0.75rem] w-full" />

          {/* Sub Text */}
          <p
            className="no-ligatures max-w-[38rem]"
            style={{
              color: "var(--Light-Border-Text-Secondary, #969696)",
              textAlign: "center",
              fontFamily: 'var(--Font-family-Body, "Plus Jakarta Sans")',
              fontSize: "var(--Font-size-Small, 1rem)",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "var(--Line-height-Small, 1.5rem)",
            }}
          >
            Different content calls for different revenue models. Choose the
            approach that fits your audience, content library and growth
            strategy.
          </p>
        </div>

        {/* 4 Alternating Image & Text Cards */}
        <div className="w-full flex flex-col gap-[6.25rem]">
          {impactServices.map((item) => (
            <div
              key={item.id}
              className={`w-full flex flex-col ${item.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-10 lg:gap-[3.5rem] self-stretch`}
            >
              {/* Image Container */}
              <div
                className="w-full lg:flex-[1_0_0] relative overflow-hidden shrink-0"
                style={{
                  height: "22.9375rem",
                  borderRadius: "1rem",
                  background: "lightgray 50% / cover no-repeat",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Text at Opposite Side of Image */}
              <div
                className="w-full lg:flex-[1_0_0]"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "4rem",
                  alignSelf: "stretch",
                }}
              >
                {/* Heading + Subtext Wrapper (Spacing/8 = 0.5rem gap) */}
                <div className="flex flex-col items-start gap-[0.5rem] w-full">
                  <h3
                    className="no-ligatures"
                    style={{
                      color: "#372B0D",
                      fontFamily:
                        'var(--Font-family-Heading, "Plus Jakarta Sans")',
                      fontSize:
                        "clamp(1.5rem, 2.5vw, var(--Font-size-Heading-2, 2rem))",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "var(--Line-height-Heading-2, 2.5rem)",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="no-ligatures max-w-[34rem]"
                    style={{
                      color: "var(--Light-Border-Text-Secondary, #969696)",
                      fontFamily:
                        'var(--Font-family-Body, "Plus Jakarta Sans")',
                      fontSize: "var(--Font-size-Small, 1rem)",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "var(--Line-height-Small, 1.5rem)",
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* "Learn more" Button */}
                <button
                  type="button"
                  className="group cursor-pointer hover:opacity-80 transition-opacity"
                  style={{
                    display: "flex",
                    width: "9.375rem",
                    padding: "0 var(--Spacing-0, 0)",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "var(--Spacing-0, 0)",
                    borderRadius: "var(--Corner-radius-4, 0.25rem)",
                  }}
                >
                  {/* Inner Button State Container (Spacing/16 = 1rem padding) */}
                  <span
                    className="no-ligatures flex items-center justify-center gap-2 py-[1rem] px-[1rem] w-full"
                    style={{
                      color: "var(--Text-Warning, #8F6C1A)",
                      textAlign: "center",
                      fontFamily: "var(--Font-family-Body, Inter, sans-serif)",
                      fontSize: "var(--Font-size-Small, 1rem)",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "var(--Line-height-Small, 1.5rem)",
                    }}
                  >
                    <span>Learn more</span>
                    <ChevronRightIcon className="w-4 h-4 text-[#8F6C1A] transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
            </div>
          ))}
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
              "radial-gradient(118.01% 73.86% at 57.53% 72.82%, rgba(0, 0, 0, 0.00) 42.15%, rgba(0, 0, 0, 0.76) 85.74%), url('/images/psu/Image5.jpg') lightgray 50% / cover no-repeat",
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
            className="w-16 h-16 object-contain shrink-0 select-none"
            style={{
              mixBlendMode: "luminosity",
            }}
          />
        </div>
      </section>
    </div>
  );
}

/* Helper SVG Icons */
function ChevronDownIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 opacity-80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}