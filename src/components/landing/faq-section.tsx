"use client";

import { useState } from "react";

import { plusJakartaSans } from "@/lib/fonts";
import type { CmsFaqSection } from "@/types/cms";

type FaqSectionProps = {
  content?: CmsFaqSection | null;
  variant?: "default" | "newsAndBlogs";
};

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
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
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
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

export function FaqSection({ content, variant = "default" }: FaqSectionProps) {
  const items =
    content?.items?.filter(
      (item) => Boolean(item?.question?.trim() && item?.answer?.trim()),
    ) ?? [];

  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set([0]));

  if (!content || items.length === 0) return null;

  const newsBlogsVariant = variant === "newsAndBlogs";

  const toggleItem = (index: number) => {
    setOpenItems((current) => {
      const next = new Set(current);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="landing-section-transition mx-auto grid w-full max-w-full gap-12 bg-white px-5 py-16 sm:px-8 sm:py-20 md:gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12 lg:px-[3.5rem] lg:py-[6.25rem] xl:gap-24"
    >
      <div>
        <p
          className={
            newsBlogsVariant
              ? `${plusJakartaSans.className} m-0 text-[14px] font-semibold uppercase leading-[20px] tracking-normal text-[#B8B8B8] [font-feature-settings:'liga'_off,'clig'_off]`
              : `landing-eyebrow ${plusJakartaSans.className} text-[0.75rem] font-semibold uppercase leading-[1.125rem] tracking-[0.055em] text-[rgba(0,9,51,0.58)] sm:text-[0.875rem] sm:leading-[1.25rem]`
          }
        >
          {content.eyebrow?.trim() || "FAQ"}
        </p>

        <h2
          id="faq-heading"
          className={
            newsBlogsVariant
              ? `${plusJakartaSans.className} mt-2.5 max-w-[28rem] text-[32px] font-semibold leading-[40px] tracking-[-0.4px] text-black [font-feature-settings:'liga'_off,'clig'_off] sm:text-[40px] sm:leading-[48px] sm:tracking-[-0.5px]`
              : `landing-title ${plusJakartaSans.className} mt-2.5 max-w-[28rem] text-[2rem] font-semibold leading-[2.45rem] tracking-[-0.04em] text-black sm:text-[2.4rem] sm:leading-[2.9rem] lg:text-[2.5rem] lg:leading-[3rem]`
          }
        >
          {content.heading?.trim() || "Questions people asked?"}
        </h2>

        {content.contactEmail ? (
          <p
            className={
              newsBlogsVariant
                ? `${plusJakartaSans.className} mt-4 text-[16px] font-normal leading-[24px] text-[#B8B8B8] [font-feature-settings:'liga'_off,'clig'_off]`
                : `landing-body ${plusJakartaSans.className} mt-4 text-sm leading-6 text-[rgba(0,9,51,0.58)]`
            }
          >
            {content.contactText?.trim() || "still have a query?"}{" "}
            <a
              className={
                newsBlogsVariant
                  ? `${plusJakartaSans.className} font-normal text-[#8F6C1A] underline decoration-solid [text-decoration-skip-ink:none] [text-decoration-thickness:auto] [text-underline-offset:auto] [text-underline-position:from-font] transition-opacity hover:opacity-65`
                  : "font-normal text-[#8F6C1A] underline underline-offset-2 transition-opacity hover:opacity-65"
              }
              href={`mailto:${content.contactEmail}`}
            >
              {content.contactEmail}
            </a>
          </p>
        ) : null}
      </div>

      <div
        data-landing-parallax-layer="reverse"
        className="border-t border-[rgba(0,17,102,0.12)]"
      >
        {items.map((item, index) => {
          const isOpen = openItems.has(index);
          const answerId = `faq-answer-${index}`;

          return (
            <div
              key={item._key}
              className="border-b border-[rgba(0,17,102,0.12)]"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggleItem(index)}
                className={
                  newsBlogsVariant
                    ? `${plusJakartaSans.className} flex w-full cursor-pointer items-center justify-between gap-6 bg-transparent py-5 text-left text-[16px] font-bold leading-[24px] [font-feature-settings:'liga'_off,'clig'_off] transition-colors duration-300 ${isOpen ? "text-black" : "text-[#B8B8B8]"
                    }`
                    : `${plusJakartaSans.className} flex w-full cursor-pointer items-center justify-between gap-6 bg-transparent py-5 text-left text-[1.125rem] font-semibold leading-6 text-[rgba(0,6,38,0.90)] transition-colors duration-300 sm:text-[1.125rem]`
                }
              >
                <span>{item.question}</span>

                <span
                  className={`relative inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-[border-color,color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${newsBlogsVariant && isOpen
                      ? "border-[#8F5A39] text-[#8F5A39]"
                      : "border-[#7380aa] text-[#7380aa]"
                    }`}
                >
                  <span
                    className={`absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen
                        ? "rotate-90 scale-75 opacity-0"
                        : "rotate-0 scale-100 opacity-100"
                      }`}
                  >
                    <PlusIcon />
                  </span>

                  <span
                    className={`absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen
                        ? "rotate-0 scale-100 opacity-100"
                        : "-rotate-90 scale-75 opacity-0"
                      }`}
                  >
                    <MinusIcon />
                  </span>
                </span>
              </button>

              <div
                id={answerId}
                aria-hidden={!isOpen}
                className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p
                    className={
                      newsBlogsVariant
                        ? `${plusJakartaSans.className} max-w-[45rem] pb-6 pr-10 text-[16px] font-normal leading-[24px] text-[#B8B8B8] [font-feature-settings:'liga'_off,'clig'_off] transition-transform duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "translate-y-0" : "-translate-y-1.5"
                        }`
                        : `landing-body ${plusJakartaSans.className} max-w-[45rem] pb-6 pr-10 text-sm leading-6 text-[rgba(0,9,51,0.60)] transition-transform duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-[0.94rem] sm:leading-7 ${isOpen ? "translate-y-0" : "-translate-y-1.5"
                        }`
                    }
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
