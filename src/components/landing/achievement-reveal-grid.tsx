"use client";

import Image from "@/components/ui/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type { CmsAchievementSection } from "@/types/cms";

const BOX_COUNT = 20;
const GRID_COLUMNS = 5;
const STAGGER_DELAY_MS = 55;

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-3.5 w-3.5"
      fill="none"
    >
      <path
        d="M4 10h11M11 6l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function isSvg(url?: string | null) {
  if (!url) return false;

  return url
    .split("?")[0]
    .toLowerCase()
    .endsWith(".svg");
}

export function AchievementRevealGrid({
  content,
}: {
  content?: CmsAchievementSection | null;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [revealedBoxes, setRevealedBoxes] = useState<Set<number>>(
    () => new Set(),
  );

  const revealBox = useCallback((index: number) => {
    setRevealedBoxes((current) => {
      if (current.has(index)) {
        return current;
      }

      const updated = new Set(current);
      updated.add(index);

      return updated;
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /*
     * Desktop:
     * each tile reveals when hovered.
     *
     * Touch/mobile:
     * tiles automatically reveal when
     * the section enters the viewport.
     */
    if (canHover) return;

    const timeoutIds: number[] = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        observer.disconnect();

        if (reducedMotion) {
          setRevealedBoxes(
            new Set(
              Array.from(
                { length: BOX_COUNT },
                (_, index) => index,
              ),
            ),
          );

          return;
        }

        const order = Array.from(
          { length: BOX_COUNT },
          (_, index) => index,
        ).sort((a, b) => {
          const diagonalA =
            Math.floor(a / GRID_COLUMNS) +
            (a % GRID_COLUMNS);

          const diagonalB =
            Math.floor(b / GRID_COLUMNS) +
            (b % GRID_COLUMNS);

          return diagonalA - diagonalB;
        });

        order.forEach((boxIndex, position) => {
          const timeoutId = window.setTimeout(
            () => {
              revealBox(boxIndex);
            },
            position * STAGGER_DELAY_MS,
          );

          timeoutIds.push(timeoutId);
        });
      },
      {
        threshold: 0.22,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();

      timeoutIds.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, [revealBox]);

  const eyebrow =
    content?.eyebrow?.trim() || "ACHIEVEMENT";

  const heading =
    content?.heading?.trim() ||
    "Empanelled with the Government of Maharashtra for initiatives promoting Marathi language, culture and heritage.";

  const description =
    content?.description?.trim() || null;

  const ctaLabel =
    content?.cta?.label?.trim() || "View more";

  const ctaHref =
    content?.cta?.href?.trim() || "/about";

  return (
    <section
      ref={sectionRef}
      aria-labelledby="achievement-heading"
      className="
        landing-section-transition
        relative
        mx-auto
        w-full
        max-w-full
        overflow-hidden
        bg-[#FFEABF]
      "
    >
      {/* =====================================================
          MAIN SECTION
          ===================================================== */}

      <div
        className="
          relative
          z-0
          min-h-[33rem]
          w-full
          px-6
          pb-[6.5rem]
          pt-7

          sm:min-h-[38rem]
          sm:px-8
          sm:pb-[8rem]
          sm:pt-8

          lg:min-h-[47rem]
          lg:px-[3.5rem]
          lg:pb-[10rem]
          lg:pt-10
        "
      >
        {/* =================================================
            EYEBROW
            ================================================= */}

        <p
          className="
            relative
            z-[2]
            text-[0.55rem]
            font-medium
            uppercase
            tracking-[0.03em]
            text-[#171717]

            sm:text-[0.625rem]
          "
        >
          {eyebrow}
        </p>

        {/* =================================================
            MARATHI LANGUAGE DEPARTMENT EMBLEM
            ================================================= */}

        {content?.departmentEmblemUrl ? (
          <div
            data-landing-parallax-layer="reverse"
            className="
              relative
              z-[2]
              mt-8
              h-[5.5rem]
              w-[5.5rem]

              sm:mt-9
              sm:h-[6.5rem]
              sm:w-[6.5rem]

              lg:mt-10
              lg:h-[7.5rem]
              lg:w-[7.5rem]
            "
          >
            <Image
              src={content.departmentEmblemUrl}
              alt={
                content.departmentEmblemAlt?.trim() ||
                "Marathi Language Department emblem"
              }
              fill
              sizes="120px"
              unoptimized={isSvg(
                content.departmentEmblemUrl,
              )}
              className="
                select-none
                object-contain
                object-left
              "
            />
          </div>
        ) : null}

        {/* =================================================
            GOVERNMENT OF MAHARASHTRA SEAL
            ================================================= */}

        {content?.governmentSealUrl ? (
          <div
            data-landing-parallax-layer="reverse"
            className="
              absolute
              -right-[3rem]
              -top-[3rem]
              z-[2]
              h-[11rem]
              w-[11rem]

              sm:-right-[3.5rem]
              sm:-top-[3.5rem]
              sm:h-[14rem]
              sm:w-[14rem]

              lg:-right-[4.5rem]
              lg:-top-[5rem]
              lg:h-[20rem]
              lg:w-[20rem]

              xl:-right-[5rem]
              xl:h-[22rem]
              xl:w-[22rem]
            "
          >
            <Image
              src={content.governmentSealUrl}
              alt={
                content.governmentSealAlt?.trim() ||
                "Government of Maharashtra seal"
              }
              fill
              sizes="352px"
              unoptimized={isSvg(
                content.governmentSealUrl,
              )}
              className="
                select-none
                object-contain
              "
            />
          </div>
        ) : null}

        {/* =================================================
            MAIN TEXT
            ================================================= */}

        <div
          className="
            relative
            z-[2]
            mt-10
            max-w-[67rem]

            sm:mt-12

            lg:mt-14
          "
        >
          <h2
            id="achievement-heading"
            className="
              max-w-[64rem]
              text-[2rem]
              font-semibold
              leading-[1.1]
              tracking-[-0.035em]
              text-[#8F6C1A]

              sm:text-[2.75rem]

              lg:text-[3.6rem]
              lg:leading-[1.08]

              xl:text-[4rem]
            "
          >
            {heading}
          </h2>

          {description ? (
            <p
              className="
                mt-5
                max-w-[48rem]
                text-sm
                leading-6
                text-[#8F6C1A]

                sm:text-base
                sm:leading-7
              "
            >
              {description}
            </p>
          ) : null}

          <Link href={ctaHref}
            className="
    relative
    z-20
    mt-9
    inline-flex
    items-center
    gap-1.5
    py-2

    text-[0.7rem]
    font-semibold
    text-[#171717]

    transition-opacity
    duration-300
    hover:opacity-60

    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-offset-4
    focus-visible:outline-[#8F6C1A]

    sm:text-xs
    lg:mt-11
  "
          >
<span>{ctaLabel}</span>
            <ArrowRightIcon />
          </Link>
        </div>
      </div>

      {/* =====================================================
          BOTTOM MARATHI CULTURAL ARTWORK
          ===================================================== */}

      {content?.bottomArtworkUrl ? (
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            z-[1]

            h-[4.5rem]
            overflow-hidden

            sm:h-[6rem]

            lg:h-[7.5rem]
          "
          aria-hidden={
            !content.bottomArtworkAlt?.trim()
          }
        >
          <Image
            src={content.bottomArtworkUrl}
            alt={
              content.bottomArtworkAlt?.trim() ||
              ""
            }
            fill
            sizes="100vw"
            className="
              select-none
              object-cover
              object-center
            "
          />
        </div>
      ) : null}

      {/* =====================================================
          REVEAL GRID
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-10
          grid
          grid-cols-5
          grid-rows-4
        "
      >
        {Array.from(
          { length: BOX_COUNT },
          (_, index) => {
            const isRevealed =
              revealedBoxes.has(index);

            return (
              <div
                key={index}
                onMouseEnter={() =>
                  revealBox(index)
                }
                className={
                  isRevealed
                    ? "pointer-events-none relative"
                    : "relative"
                }
              >
                <div
                  className={`
                    absolute
                    inset-0
                    bg-[#8F6C1A]
                    transition-opacity
                    duration-500
                    ease-out

                    ${isRevealed
                      ? "opacity-0"
                      : "opacity-100"
                    }
                  `}
                />
              </div>
            );
          },
        )}
      </div>
    </section>
  );
}
