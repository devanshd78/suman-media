"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { Exo_2, Inter } from "next/font/google";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const PARTNER_LINKS = [
  {
    title: "Future-ready Media Infrastructure",
    href: "/services",
  },
  {
    title: "Technology-led Innovation",
    href: "/services",
  },
  {
    title: "Integrated Ecosystem",
    href: "/services",
  },
  {
    title: "Scalable Partnerships",
    href: "/services",
  },
  {
    title: "Enterprise Delivery",
    href: "/services",
  },
] as const;

export function PartnerSection() {
  return (
    <section
      id="why-partner"
      aria-labelledby="why-partner-heading"
      className="
        mx-auto
        flex
        w-full
        max-w-[90rem]
        flex-col
        items-center
        gap-[6.25rem]

        bg-[#FFEABF]

        px-5
        pt-16

        sm:px-8

        lg:px-[3.5rem]
        lg:pt-[6.25rem]
      "
    >
      {/* ===================================================== */}
      {/* TOP — WHY PARTNER WITH US                             */}
      {/* ===================================================== */}

      <div
        className="
          flex
          w-full
          flex-col
          items-start
          justify-between
          gap-10

          lg:flex-row
          lg:gap-16
        "
      >
        {/* LEFT CONTENT */}
        <div
          className="
            flex
            w-full
            flex-col
            items-start
            gap-4

            lg:w-[31.4375rem]
            lg:shrink-0
          "
        >
          <h2
            id="why-partner-heading"
            className={`
              ${exo2.className}

              w-full

              text-[2rem]
              font-semibold
              leading-[2.5rem]
              tracking-[-0.03125rem]
              text-black

              sm:text-[2.25rem]

              lg:w-[25.5625rem]
              lg:text-[2.5rem]
              lg:leading-[3rem]
            `}
            style={{
              fontFeatureSettings:
                '"liga" off, "clig" off',
            }}
          >
            Why Partner With us?
          </h2>

          <p
            className={`
              ${inter.className}

              w-full

              text-base
              font-normal
              leading-6

              text-[rgba(0,9,51,0.65)]

              lg:w-[31.4375rem]
            `}
            style={{
              fontFeatureSettings:
                '"liga" off, "clig" off',
            }}
          >
            From creating original content and building
            digital platforms to strategic communications
            and global distribution, our integrated
            capabilities help businesses, creators,
            governments, and brands grow through media
            and technology.
          </p>
        </div>

        {/* RIGHT LINKS */}
        <nav
          aria-label="Why partner with us"
          className="
            flex
            w-full
            flex-col

            lg:w-[37rem]
            lg:shrink-0
          "
        >
          {PARTNER_LINKS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="
                group

                flex
                w-full
                items-center
                justify-start
                gap-2

                border-b
                border-[rgba(0,17,102,0.10)]

                py-3

                text-black
              "
            >
              <span
                className={`
                  ${inter.className}

                  text-base
                  font-semibold
                  leading-6

                  sm:text-[1.125rem]

                  lg:text-[1.25rem]
                  lg:leading-[1.75rem]
                `}
                style={{
                  fontFeatureSettings:
                    '"liga" off, "clig" off',
                }}
              >
                {item.title}
              </span>

              <ArrowUpRight
                size={12}
                weight="bold"
                aria-hidden="true"
                className="
                  h-3
                  w-3
                  shrink-0

                  text-[rgba(0,13,77,0.45)]

                  transition-transform
                  duration-300
                  ease-in-out

                  group-hover:translate-x-[2px]
                  group-hover:-translate-y-[2px]
                "
              />
            </Link>
          ))}
        </nav>
      </div>

      {/* ===================================================== */}
      {/* CANNES FULL-WIDTH IMAGE                               */}
      {/* ===================================================== */}

      <div
        className="
          relative

          flex
          w-[calc(100%+2.5rem)]

          flex-col
          items-start
          justify-between

          overflow-hidden

          p-5

          sm:w-[calc(100%+4rem)]
          sm:p-8

          lg:h-[48.875rem]
          lg:w-[90rem]
          lg:p-8
        "
        style={{
          backgroundImage: `
            radial-gradient(
              123.64% 75.26%
              at 59.13% 73.44%,
              rgba(0, 0, 0, 0) 42%,
              rgba(0, 0, 0, 0.76) 78.23%
            ),
            url("/images/landing/background2.png")
          `,
          backgroundPosition:
            "center, 0.322px -103.596px",
          backgroundSize:
            "100% 100%, 100% 184.143%",
          backgroundRepeat:
            "no-repeat, no-repeat",
          borderRadius: 0,
        }}
      >
        {/* =================================================== */}
        {/* LEFT-ALIGNED TEXT                                   */}
        {/* =================================================== */}

        <div
          className="
            relative
            z-20

            flex
            w-full
            flex-col
            items-start

            gap-4

            text-left

            lg:w-[69.4375rem]
          "
        >
          <h3
            className={`
              ${exo2.className}

              w-full

              text-left

              text-[1.75rem]
              font-semibold
              leading-[2.25rem]
              tracking-[-0.03125rem]

              text-white

              sm:text-[2rem]
              sm:leading-[2.5rem]

              lg:text-[2.5rem]
              lg:leading-[3rem]
            `}
            style={{
              fontFeatureSettings:
                '"liga" off, "clig" off',
            }}
          >
            Abhijat Marathi made its Global Alpha Launch
            at the Cannes Film Festival 2026, at the
            Bharat (India) Pavilion.
          </h3>

          <Link
            href="/portfolio"
            className={`
              ${inter.className}

              group

              inline-flex
              items-center
              justify-start
              gap-2

              rounded-lg

              py-3

              text-left
              text-sm
              font-semibold
              leading-5

              text-white
            `}
          >
            <span>
              View Our Cannes Moment
            </span>

            <ArrowRight
              size={16}
              weight="regular"
              aria-hidden="true"
              className="
                h-4
                w-4

                transition-transform
                duration-300
                ease-in-out

                group-hover:translate-x-1
              "
            />
          </Link>
        </div>

        {/* =================================================== */}
        {/* FESTIVAL DE CANNES SVG — BOTTOM RIGHT               */}
        {/* =================================================== */}

        <div
          className="
            absolute

            bottom-5
            right-5

            z-20

            flex
            items-center
            justify-center

            sm:bottom-8
            sm:right-8
          "
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/landing/image%207%20%5BVectorized%5D.svg"
            alt="Festival de Cannes"
            draggable={false}
            className="
              h-[3.8125rem]
              w-[7.5625rem]
              shrink-0
              select-none
            "
          />
        </div>
      </div>
    </section>
  );
}