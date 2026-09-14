"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";

import { plusJakartaSans } from "@/lib/fonts";
import type { CmsFaqSection } from "@/types/cms";

type FaqVariant = "default" | "newsAndBlogs";

type FaqSectionProps = {
  content?: CmsFaqSection | null;
  variant?: FaqVariant;
};

const OPEN_ICON_COLOR: Record<FaqVariant, string> = {
  default: "border-[#8F6C1A] text-[#8F6C1A]",
  newsAndBlogs: "border-[#8F5A39] text-[#8F5A39]",
};

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5"
      fill="none"
    >
      <path
        d="M8 3.5v9M3.5 8h9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5"
      fill="none"
    >
      <path
        d="M3.5 8h9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function getVariantClasses(variant: FaqVariant) {
  const newsAndBlogs = variant === "newsAndBlogs";

  return {
    section: newsAndBlogs
      ? "gap-10 sm:gap-12 md:gap-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14 xl:gap-24"
      : "gap-10 sm:gap-12 md:gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14 xl:gap-24",

    eyebrow: newsAndBlogs
      ? "text-[0.875rem] font-semibold uppercase leading-[1.25rem] tracking-normal text-[#B8B8B8]"
      : "text-[0.75rem] font-semibold uppercase leading-[1.125rem] tracking-[0.055em] text-[rgba(0,9,51,0.58)] sm:text-[0.875rem] sm:leading-[1.25rem]",

    heading: newsAndBlogs
      ? "mt-2.5 max-w-[31rem] text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.025rem] text-black sm:text-[2.5rem] sm:leading-[3rem] sm:tracking-[-0.03125rem]"
      : "mt-2.5 max-w-[31rem] text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.04em] text-black sm:text-[2.25rem] sm:leading-[2.75rem] lg:text-[2.5rem] lg:leading-[3rem]",

    contact: newsAndBlogs
      ? "mt-4 max-w-[32rem] text-[1rem] font-normal leading-[1.5rem] text-[#B8B8B8]"
      : "mt-4 max-w-[32rem] text-[0.9375rem] font-normal leading-[1.5rem] text-[rgba(0,9,51,0.58)] sm:text-[1rem]",

    question: newsAndBlogs
      ? "text-[1rem] font-bold leading-[1.5rem]"
      : "text-[1rem] font-semibold leading-[1.5rem] sm:text-[1.125rem] sm:leading-[1.625rem]",

    answer: newsAndBlogs
      ? "max-w-[46rem] text-[1rem] font-normal leading-[1.5rem] text-[#B8B8B8]"
      : "max-w-[46rem] text-[0.9375rem] font-normal leading-[1.5rem] text-[rgba(0,9,51,0.60)] sm:text-[1rem] sm:leading-[1.625rem]",

    openQuestion: newsAndBlogs
      ? "text-black"
      : "text-[rgba(0,6,38,0.92)]",

    closedQuestion: newsAndBlogs
      ? "text-[#B8B8B8]"
      : "text-[rgba(0,6,38,0.72)]",
  };
}

export function FaqSection({
  content,
  variant = "default",
}: FaqSectionProps) {
  const uid = useId().replace(/:/g, "");

  const items = useMemo(
    () =>
      content?.items?.filter((item) =>
        Boolean(item?.question?.trim() && item?.answer?.trim()),
      ) ?? [],
    [content?.items],
  );

  const [openItems, setOpenItems] = useState<Set<number>>(
    () => new Set([0]),
  );

  useEffect(() => {
    setOpenItems((current) => {
      if (items.length === 0) {
        return new Set();
      }

      const valid = new Set(
        [...current].filter((index) => index >= 0 && index < items.length),
      );

      if (valid.size === 0) {
        valid.add(0);
      }

      return valid;
    });
  }, [items.length]);

  const toggleItem = useCallback((index: number) => {
    setOpenItems((current) => {
      const next = new Set(current);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  }, []);

  if (!content || items.length === 0) {
    return null;
  }

  const newsAndBlogsVariant = variant === "newsAndBlogs";
  const classes = getVariantClasses(variant);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className={`
        landing-section-transition
        mx-auto
        grid
        w-full
        max-w-full
        bg-white
        px-5
        py-16
        sm:px-8
        sm:py-20
        lg:px-[3.5rem]
        lg:py-[6.25rem]
        ${classes.section}
      `}
      style={{
        fontFeatureSettings: '"liga" off, "clig" off',
      }}
    >
      <div className="min-w-0">
        <p
          className={`${plusJakartaSans.className} m-0 ${classes.eyebrow}`}
        >
          {content.eyebrow?.trim() || "FAQ"}
        </p>

        <h2
          id="faq-heading"
          className={`${plusJakartaSans.className} m-0 ${classes.heading}`}
        >
          {content.heading?.trim() || "Questions people asked?"}
        </h2>

        {content.contactEmail ? (
          <p
            className={`${plusJakartaSans.className} m-0 ${classes.contact}`}
          >
            {content.contactText?.trim() || "still have a query?"}{" "}
            <a
              href={`mailto:${content.contactEmail}`}
              className="font-normal text-[#8F6C1A] underline decoration-solid underline-offset-2 transition-opacity duration-200 hover:opacity-65 focus-visible:rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6C1A]/35 focus-visible:ring-offset-2"
            >
              {content.contactEmail}
            </a>
          </p>
        ) : null}
      </div>

      <div
        data-landing-parallax-layer="reverse"
        className="min-w-0 border-t border-[rgba(0,17,102,0.12)]"
      >
        {items.map((item, index) => {
          const isOpen = openItems.has(index);
          const itemKey = item._key || String(index);
          const buttonId = `faq-button-${uid}-${itemKey}`;
          const answerId = `faq-answer-${uid}-${itemKey}`;

          return (
            <div
              key={itemKey}
              className="border-b border-[rgba(0,17,102,0.12)]"
            >
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggleItem(index)}
                className={`
                  ${plusJakartaSans.className}
                  group
                  flex
                  w-full
                  cursor-pointer
                  items-center
                  justify-between
                  gap-5
                  bg-transparent
                  py-5
                  text-left
                  transition-colors
                  duration-300
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-inset
                  focus-visible:ring-[#8F6C1A]/30
                  sm:gap-6
                  sm:py-[1.375rem]
                  ${classes.question}
                  ${isOpen ? classes.openQuestion : classes.closedQuestion}
                `}
              >
                <span className="min-w-0 pr-2">
                  {item.question}
                </span>

                <span
                  aria-hidden="true"
                  className={`
                    relative
                    inline-flex
                    h-6
                    w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    transition-[border-color,color,background-color,transform]
                    duration-300
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    group-hover:bg-black/[0.025]
                    ${isOpen
                      ? OPEN_ICON_COLOR[variant]
                      : "border-[#7380AA] text-[#7380AA]"
                    }
                  `}
                >
                  <span
                    className={`
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      transition-[opacity,transform]
                      duration-300
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      ${isOpen
                        ? "rotate-90 scale-75 opacity-0"
                        : "rotate-0 scale-100 opacity-100"
                      }
                    `}
                  >
                    <PlusIcon />
                  </span>

                  <span
                    className={`
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      transition-[opacity,transform]
                      duration-300
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      ${isOpen
                        ? "rotate-0 scale-100 opacity-100"
                        : "-rotate-90 scale-75 opacity-0"
                      }
                    `}
                  >
                    <MinusIcon />
                  </span>
                </span>
              </button>

              <div
                id={answerId}
                role="region"
                aria-labelledby={buttonId}
                aria-hidden={!isOpen}
                className={`
                  grid
                  overflow-hidden
                  transition-[grid-template-rows,opacity]
                  duration-[360ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                  }
                `}
              >
                <div className="min-h-0 overflow-hidden">
                  <p
                    className={`
                      ${plusJakartaSans.className}
                      m-0
                      pb-6
                      pr-8
                      transition-[transform,opacity]
                      duration-[360ms]
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      sm:pr-10
                      ${classes.answer}
                      ${isOpen
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-1.5 opacity-0"
                      }
                    `}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
