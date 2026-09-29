// app/monetisation/page.tsx

import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function MonetisationPage() {
  return (
    <main
      className={`
        ${plusJakartaSans.variable}
        ${inter.variable}
        w-full
        bg-white
      `}
    >
      <section
        className="
          relative
          flex
          w-full
          min-h-[58.25rem]
          flex-col
          items-center
          overflow-hidden

          site-gutter
          pt-24
          pb-16

          md:pt-28
          md:pb-20
          lg:py-[6.25rem]
        "
      >
        {/* ========================= */}
        {/* BACKGROUND VIDEO */}
        {/* ========================= */}
        <video
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src="/images/monetization/montitazationheader.mp4"
            type="video/mp4"
          />
        </video>

        {/* Optional subtle overlay for text readability */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-black/[0.03]
          "
        />

        {/* ========================= */}
        {/* CONTENT */}
        {/* ========================= */}
        <div
          className="
            relative
            z-10
            flex
            w-full
            flex-1
            flex-col
            gap-16
            sm:gap-24
          "
        >
          {/* Top content */}
          <div className="w-full">
            {/* Small heading */}
            <p
              className="
                w-full
                max-w-[75.625rem]

                font-[family-name:var(--font-plus-jakarta)]
                text-[0.75rem]
                font-semibold
                uppercase
                leading-[1.25rem]
                text-white

                [font-feature-settings:'liga'_off,'clig'_off]

                md:text-[0.875rem]
              "
            >
              MONETISATION MODELS
            </p>

            {/* Main heading */}
            <h1
              className="
                mt-2
                w-full
                max-w-[36.375rem]

                font-[family-name:var(--font-plus-jakarta)]
                text-[clamp(2rem,7vw,3.5rem)]
                font-semibold
                leading-[1.15]
                tracking-[-0.04rem]
                text-white

                [font-feature-settings:'liga'_off,'clig'_off]

                lg:tracking-[-0.0625rem]
              "
            >
              Turn Content Into
              <br />
              Sustainable Revenue.
            </h1>

            {/* Join now */}
            <a
              href="#contact"
              className="
                mt-4
                inline-flex
                items-center
                justify-center
                gap-1

                rounded-[0.75rem]
                p-4

                font-[family-name:var(--font-inter)]
                text-[1rem]
                font-semibold
                leading-[1.5rem]
                text-[#F9F9F9]

                transition-all
                duration-300

                hover:bg-white/10
                active:scale-[0.98]

                [font-feature-settings:'liga'_off,'clig'_off]
              "
            >
              <span>Join now</span>

              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12h14m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            </a>
          </div>

          {/* ========================= */}
          {/* BOTTOM RIGHT TEXT */}
          {/* ========================= */}
          <div
            className="
              mt-auto
              flex
              w-full
              justify-start

              lg:justify-end
            "
          >
            <p
              className="
                w-full
                max-w-[35.625rem]

                font-[family-name:var(--font-plus-jakarta)]
                text-[1rem]
                font-medium
                leading-[1.5rem]
                text-white

                [font-feature-settings:'liga'_off,'clig'_off]

                sm:text-[1.125rem]
                sm:leading-[1.625rem]

                lg:text-[1.25rem]
                lg:leading-[1.75rem]
              "
            >
              Build the right monetisation strategy around your content,
              audience and platform — from subscriptions and advertising to
              rentals and hybrid models.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
