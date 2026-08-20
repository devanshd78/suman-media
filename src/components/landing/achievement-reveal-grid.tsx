"use client";

import Link from "next/link";
import { useState } from "react";

export function AchievementRevealGrid() {
  const boxes = Array.from({ length: 20 });

  const [revealedBoxes, setRevealedBoxes] = useState<Set<number>>(
    () => new Set(),
  );

  const revealBox = (index: number) => {
    setRevealedBoxes((current) => {
      if (current.has(index)) {
        return current;
      }

      const updated = new Set(current);
      updated.add(index);

      return updated;
    });
  };

  return (
    <section
      aria-label="Achievement"
      className="
        relative
        mx-auto
        h-[55rem]
        w-full
        max-w-[90rem]
        overflow-hidden
        bg-white
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
              bottom-[3rem]
              left-[3.5rem]
              z-30

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
                flex
                h-[13.75rem]
                w-[18rem]

                items-center
                justify-center
                justify-self-stretch

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