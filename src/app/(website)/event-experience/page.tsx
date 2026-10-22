import React from "react";
import Image from "next/image";

export default function EventPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Top Background Color Grading & Grain Texture */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[540px] z-0"
        style={{
          background: `
            radial-gradient(55% 95% at 96% 12%, rgba(88, 70, 228, 0.78) 0%, rgba(138, 125, 245, 0.42) 48%, rgba(255, 255, 255, 0) 100%),
            radial-gradient(75% 85% at 20% 0%, rgba(202, 198, 252, 0.65) 0%, rgba(235, 233, 255, 0.35) 55%, rgba(255, 255, 255, 0) 95%),
            linear-gradient(180deg, #E2DFFF 0%, #F4F3FF 62%, #FFFFFF 100%)
          `,
        }}
      >
        {/* Grainy Noise Overlay matching reference */}
        <div
          className="absolute inset-0 opacity-[0.28] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Content Section */}
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
        {/* Header Split Row */}
        <div className="flex w-full flex-col justify-between gap-8 lg:flex-row lg:items-start">
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

        {/* Full-Width Hero Image Container */}
        <div
          className="relative w-full self-stretch overflow-hidden"
          style={{
            display: "flex",
            width: "100%",
            padding: "0 var(--Spacing-0, 0)",
            justifyContent: "center",
            alignItems: "center",
            gap: "var(--Spacing-0, 0)",
            borderRadius: "var(--Corner-radius-12, 0.75rem)",
          }}
        >
          <Image
            src="/images/event/Image1.png"
            alt="Crowd enjoying an event"
            width={1920}
            height={960}
            sizes="100vw"
            priority
            className="block h-auto w-full object-cover"
          />
        </div>
      </section>
    </main>
  );
}