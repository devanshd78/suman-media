"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const BOX_COUNT = 20;
const GRID_COLUMNS = 5;
const STAGGER_DELAY_MS = 70;

export function AchievementRevealGrid() {
  const boxes = Array.from({ length: BOX_COUNT });

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

  /*
    Touch / non-hover devices can never trigger onMouseEnter,
    so the image (and the "View more" link gated on box 15)
    would stay hidden forever.

    On mount: if the device cannot hover, watch the section
    and reveal every box in a diagonal cascade once it
    scrolls into view. Hover-capable devices keep the
    hover-to-wipe behavior unchanged.
  */
  useEffect(() => {
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    if (canHover) {
      return;
    }

    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const timeoutIds: number[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }

        observer.disconnect();

        if (prefersReducedMotion) {
          // Reveal everything at once — no stagger.
          setRevealedBoxes(
            new Set(Array.from({ length: BOX_COUNT }, (_, index) => index)),
          );

          return;
        }

        // Diagonal cascade: boxes sharing (row + col) reveal together-ish.
        const order = Array.from(
          { length: BOX_COUNT },
          (_, index) => index,
        ).sort((a, b) => {
          const diagonalA = Math.floor(a / GRID_COLUMNS) + (a % GRID_COLUMNS);
          const diagonalB = Math.floor(b / GRID_COLUMNS) + (b % GRID_COLUMNS);

          return diagonalA - diagonalB;
        });

        order.forEach((boxIndex, position) => {
          timeoutIds.push(
            window.setTimeout(
              () => revealBox(boxIndex),
              position * STAGGER_DELAY_MS,
            ),
          );
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [revealBox]);

  return (
    <section
      ref={sectionRef}
      aria-label="Achievement"
      className="
        relative
        mx-auto
        aspect-[18/11]
        min-h-[24rem]
        w-full
        max-w-[90rem]
        overflow-hidden
        bg-white
        lg:max-h-[55rem]
      "
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/landing/background.png"
          alt="Suman Media achievement"
          draggable={false}
          className="
            h-full
            w-full
            select-none
            object-cover
            object-center
          "
        />

        {/* 
          View More Button

          Index 15 = first box in the last row.

          The button appears only after that brown box
          has been removed.
        */}
        {revealedBoxes.has(15) && (
          <Link
            href="/about"
            className="
              absolute
              bottom-6
              left-6
              z-30
              lg:bottom-[3rem]
              lg:left-[3.5rem]

              inline-flex
              items-center
              gap-2

              rounded-lg
              px-4
              py-3

              text-sm
              font-semibold
              text-black

              animate-[achievementButtonReveal_300ms_ease-in-out_both]

              transition-opacity
              duration-200

              hover:opacity-60
            "
          >
            <span>View more</span>

            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-4 w-4"
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
          </Link>
        )}
      </div>

      {/* 20 Brown Reveal Boxes */}
      <div
        className="
          relative
          z-10
          grid
          h-full
          w-full
          grid-cols-5
          grid-rows-4
        "
      >
        {boxes.map((_, index) => {
          const isRevealed = revealedBoxes.has(index);

          return (
            <div
              key={index}
              onMouseEnter={() => revealBox(index)}
              className={`
                relative

                ${isRevealed ? "pointer-events-none" : ""}
              `}
            >
              <div
                className={`
                  absolute
                  inset-0

                  h-full
                  w-full

                  bg-[#927116]

                  transition-opacity
                  duration-300
                  ease-in-out

                  ${
                    isRevealed
                      ? "opacity-0"
                      : "opacity-100"
                  }
                `}
              />
            </div>
          );
        })}
      </div>

      {/* Button Reveal Animation */}
      <style>{`
        @keyframes achievementButtonReveal {
          from {
            opacity: 0;
            transform: translateY(4px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}