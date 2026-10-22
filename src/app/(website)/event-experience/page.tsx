import React from "react";
import Image from "next/image";

export default function EventPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Top Background Color Grading & Noise Texture */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[550px] z-0"
        style={{
          background: `
            radial-gradient(80% 90% at 95% 0%, rgba(108, 99, 255, 0.48) 0%, rgba(165, 158, 255, 0.22) 45%, rgba(255, 255, 255, 0) 100%),
            radial-gradient(60% 80% at 15% 0%, rgba(210, 208, 255, 0.45) 0%, rgba(255, 255, 255, 0) 80%),
            linear-gradient(180deg, #ECEBFF 0%, #FFFFFF 100%)
          `,
        }}
      >
        {/* Subtle SVG Noise Overlay to match the grainy gradient look */}
        <div
          className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Content Container */}
      <section
        className="relative z-10 w-full"
        style={{
          display: "flex",
          padding: "8.75rem 3.5rem 0 3.5rem",
          flexDirection: "column",
          alignItems: "center",
          gap: "3.5rem",
          alignSelf: "stretch",
        }}
      >
        {/* Top Header Split Section */}
        <div className="flex w-full flex-col justify-between gap-8 lg:flex-row lg:items-start">
          {/* Left Column: Category & Main Heading */}
          <div className="flex max-w-[34rem] flex-col gap-[0.25rem]">
            <span
              style={{
                color: "var(--Light-Border-Text-Primary, #1A1A1A)",
                fontFeatureSettings: "'liga' off, 'clig' off",
                fontFamily: 'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
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
                fontFamily: 'var(--Font-family-Heading, "Plus Jakarta Sans", sans-serif)',
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

          {/* Right Column: Description & Action Button */}
          <div className="flex max-w-[36rem] flex-col items-start gap-[1rem]">
            <p
              style={{
                color: "var(--Light-Border-Text-Primary, #1A1A1A)",
                fontFeatureSettings: "'liga' off, 'clig' off",
                fontFamily: 'var(--Font-family-Body, "Plus Jakarta Sans", sans-serif)',
                fontSize: "var(--Font-size-Small, 1rem)",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "var(--Line-height-Small, 1.5rem)",
                opacity: 0.75,
              }}
            >
              From concerts and cultural festivals to corporate gatherings and public
              engagement programs, we create opportunities for people, brands and
              communities to connect.
            </p>

            {/* Plan an Event Button */}
            <button
              type="button"
              className="px-5 py-3 shadow-sm transition-transform active:scale-95 hover:bg-neutral-50"
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

        {/* Hero Image Container */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            display: "flex",
            padding: "0 var(--Spacing-0, 0)",
            justifyContent: "center",
            alignItems: "center",
            gap: "var(--Spacing-0, 0)",
            borderRadius: "var(--Corner-radius-12, 0.75rem)",
          }}
        >
          {/* In Next.js, files inside `public/` are referenced from the root `/` */}
          <Image
            src="/images/event/Image1.png"
            alt="Crowd enjoying an event"
            width={1440}
            height={720}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </section>
    </main>
  );
}