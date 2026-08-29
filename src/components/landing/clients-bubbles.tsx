"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import type { CmsFeaturedCompany } from "@/types/cms";

type BubbleStyle = CSSProperties & {
  "--bubble-size": string;
  "--bubble-left": string;
  "--bubble-top": string;
  "--bubble-delay": string;
  "--bubble-drop": string;
  "--bubble-drift": string;
};

const BUBBLE_LAYOUT = [
  {
    size: "13rem",
    left: "2%",
    top: "28%",
    delay: "0ms",
    drop: "-580px",
    drift: "-14px",
  },
  {
    size: "17rem",
    left: "15%",
    top: "2%",
    delay: "130ms",
    drop: "-720px",
    drift: "12px",
  },
  {
    size: "11.5rem",
    left: "36%",
    top: "34%",
    delay: "260ms",
    drop: "-520px",
    drift: "-8px",
  },
  {
    size: "15rem",
    left: "47%",
    top: "0%",
    delay: "80ms",
    drop: "-680px",
    drift: "10px",
  },
  {
    size: "12.5rem",
    left: "66%",
    top: "34%",
    delay: "320ms",
    drop: "-560px",
    drift: "-12px",
  },
  {
    size: "16rem",
    left: "78%",
    top: "4%",
    delay: "190ms",
    drop: "-760px",
    drift: "8px",
  },
  {
    size: "10.5rem",
    left: "84%",
    top: "48%",
    delay: "390ms",
    drop: "-500px",
    drift: "-7px",
  },
  {
    size: "10rem",
    left: "0%",
    top: "58%",
    delay: "230ms",
    drop: "-610px",
    drift: "9px",
  },
] as const;

function companyHref(company: CmsFeaturedCompany) {
  if (company.hasDetailPage && company.slug) {
    return `/companies/${company.slug}`;
  }

  return company.websiteUrl || undefined;
}

export function ClientsBubbles({
  companies,
}: {
  companies: CmsFeaturedCompany[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  const visibleCompanies = companies
    .filter((company) => Boolean(company.logoUrl))
    .slice(0, 8);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setHasEntered(true);
        observer.disconnect();
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  if (visibleCompanies.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="w-full"
      data-entered={hasEntered ? "true" : "false"}
    >
      {/* =====================================================
          MOBILE / TABLET
          ===================================================== */}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:hidden">
        {visibleCompanies.map((company, index) => {
          const href = companyHref(company);

          const bubble = (
            <div
              className="client-mobile-bubble relative aspect-square overflow-hidden rounded-full bg-[#927116] shadow-[0_1rem_2.5rem_rgba(77,58,9,0.18)]"
              style={
                {
                  "--mobile-delay": `${index * 90}ms`,
                } as CSSProperties
              }
            >
              <Image
                src={company.logoUrl!}
                alt={company.logoAlt?.trim() || company.name}
                fill
                sizes="(max-width: 640px) 45vw, 30vw"
                className="object-contain p-[22%]"
              />
            </div>
          );

          if (!href) return <div key={company._id}>{bubble}</div>;

          if (href.startsWith("http")) {
            return (
              <a
                key={company._id}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={company.name}
                className="block rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#927116]"
              >
                {bubble}
              </a>
            );
          }

          return (
            <Link
              key={company._id}
              href={href}
              aria-label={company.name}
              className="block rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#927116]"
            >
              {bubble}
            </Link>
          );
        })}
      </div>

      {/* =====================================================
          DESKTOP FALLING BUBBLES
          ===================================================== */}

      <div
        className="relative hidden h-[36rem] w-full overflow-visible lg:block"
        aria-label="Featured clients and partners"
      >
        {visibleCompanies.map((company, index) => {
          const layout =
            BUBBLE_LAYOUT[index % BUBBLE_LAYOUT.length];

          const href = companyHref(company);

          const style: BubbleStyle = {
            "--bubble-size": layout.size,
            "--bubble-left": layout.left,
            "--bubble-top": layout.top,
            "--bubble-delay": layout.delay,
            "--bubble-drop": layout.drop,
            "--bubble-drift": layout.drift,
          };

          const bubble = (
            <div
              className="client-logo-bubble group relative h-[var(--bubble-size)] w-[var(--bubble-size)] overflow-hidden rounded-full bg-[#927116] shadow-[0_1.5rem_4rem_rgba(77,58,9,0.16)]"
            >
              <Image
                src={company.logoUrl!}
                alt={company.logoAlt?.trim() || company.name}
                fill
                sizes="17rem"
                className="object-contain p-[22%] transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          );

          return (
            <div
              key={company._id}
              className="client-logo-position absolute left-[var(--bubble-left)] top-[var(--bubble-top)]"
              style={style}
            >
              {href ? (
                href.startsWith("http") ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={company.name}
                    className="block rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#927116]"
                  >
                    {bubble}
                  </a>
                ) : (
                  <Link
                    href={href}
                    aria-label={company.name}
                    className="block rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#927116]"
                  >
                    {bubble}
                  </Link>
                )
              ) : (
                bubble
              )}
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        /* =====================================================
           DESKTOP: BUBBLE FALL
           ===================================================== */

        @keyframes clientBubbleDrop {
          0% {
            opacity: 0;
            transform:
              translate3d(
                var(--bubble-drift),
                var(--bubble-drop),
                0
              )
              scale(0.88);
          }

          12% {
            opacity: 1;
          }

          68% {
            transform:
              translate3d(0, 24px, 0)
              scale(1.015);
          }

          79% {
            transform:
              translate3d(0, -13px, 0)
              scale(0.995);
          }

          88% {
            transform:
              translate3d(0, 7px, 0)
              scale(1);
          }

          95% {
            transform:
              translate3d(0, -3px, 0)
              scale(1);
          }

          100% {
            opacity: 1;
            transform:
              translate3d(0, 0, 0)
              scale(1);
          }
        }

        @keyframes clientBubbleIdle {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -7px, 0);
          }
        }

        .client-logo-position {
          opacity: 0;
          will-change: transform, opacity;
        }

        [data-entered="true"] .client-logo-position {
          animation:
            clientBubbleDrop
              1.55s
              cubic-bezier(0.16, 0.8, 0.28, 1.05)
              var(--bubble-delay)
              both,
            clientBubbleIdle
              6s
              ease-in-out
              calc(var(--bubble-delay) + 1.7s)
              infinite;
        }

        /* =====================================================
           MOBILE
           ===================================================== */

        @keyframes clientMobileDrop {
          0% {
            opacity: 0;
            transform: translate3d(0, -110px, 0) scale(0.9);
          }

          72% {
            opacity: 1;
            transform: translate3d(0, 9px, 0) scale(1.01);
          }

          86% {
            transform: translate3d(0, -5px, 0) scale(1);
          }

          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        .client-mobile-bubble {
          opacity: 0;
        }

        [data-entered="true"] .client-mobile-bubble {
          animation:
            clientMobileDrop
            1s
            cubic-bezier(0.16, 0.8, 0.28, 1.05)
            var(--mobile-delay)
            both;
        }

        /* =====================================================
           ACCESSIBILITY
           ===================================================== */

        @media (prefers-reduced-motion: reduce) {
          .client-logo-position,
          .client-mobile-bubble {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}