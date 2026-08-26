"use client";

import Image from "next/image";
import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";
import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import {
  HeritageDepthField,
  Premium3DSurface,
} from "@/components/motion/premium-3d";
import { TextReveal } from "@/components/motion/text-reveal";
import type { CmsCta, CmsFeaturedInsight } from "@/types/cms";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <path
        d={direction === "right" ? "M4 10h11M11 6l4 4-4 4" : "M16 10H5M9 6l-4 4 4 4"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InsightCard({
  post,
  featured,
  index,
}: {
  post: CmsFeaturedInsight;
  featured: boolean;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      data-insight-card
      initial={reduceMotion ? false : { opacity: 0, y: 34, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: reduceMotion ? 0 : 0.76,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`shrink-0 ${
        featured
          ? "w-[min(86vw,52rem)] sm:w-[min(72vw,52rem)] lg:w-[58%]"
          : "w-[min(82vw,31rem)] sm:w-[min(48vw,31rem)] lg:w-[35%]"
      }`}
    >
      <Link
        href={`/insights/${post.slug}`}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6C1A]/35"
      >
        <Premium3DSurface
          className="rounded-[1.15rem]"
          surfaceClassName="rounded-[1.15rem]"
          intensity={featured ? 5.2 : 6}
          lift={featured ? 10 : 12}
          perspective={1200}
        >
          <div className="premium-3d-paper-shadow depth-image-frame relative aspect-[16/8.6] w-full overflow-hidden rounded-[1.15rem] border border-[#C99B36]/16 bg-[#e9dfcc] [transform-style:preserve-3d]">
            <div className="absolute inset-0 [transform:translateZ(26px)]">
              <Image
                src={post.imageUrl}
                alt={post.imageAlt?.trim() || post.title}
                fill
                sizes={
                  featured
                    ? "(max-width: 767px) 86vw, 58vw"
                    : "(max-width: 767px) 82vw, 35vw"
                }
                className="select-none object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.055]"
              />
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(226,187,95,0.18),transparent_42%,rgba(0,0,0,0.10))] opacity-70" />

            <div className="premium-3d-layer-deep absolute right-4 top-4 h-8 w-8 rotate-45 border border-white/35 bg-black/5 transition-all duration-500 group-hover:rotate-[225deg] group-hover:border-white/70" />

            <div className="premium-3d-layer absolute bottom-4 left-4 inline-flex items-center rounded-full border border-white/18 bg-black/18 px-3 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-white/82 backdrop-blur-md">
              Editorial · Suman
            </div>
          </div>
        </Premium3DSurface>

        <div className="relative pt-5 [transform-style:preserve-3d]">
          <h3 className={`${inter.className} text-base font-semibold leading-6 text-black transition-colors duration-300 group-hover:text-[#8A4A24] sm:text-lg`}>
            {post.title}
          </h3>

          <div className="mt-2 flex items-start justify-between gap-5">
            {post.excerpt ? (
              <p className={`${inter.className} line-clamp-2 min-w-0 max-w-[38rem] text-sm leading-5 text-[rgba(0,9,51,0.58)]`}>
                {post.excerpt}
              </p>
            ) : (
              <span />
            )}

            <span className={`${inter.className} kinetic-link shrink-0 text-xs font-semibold text-[#8F6C1A] sm:text-sm`}>
              learn more
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function InsightsSection({
  eyebrow,
  heading,
  cta,
  posts,
}: {
  eyebrow?: string | null;
  heading?: string | null;
  cta?: CmsCta | null;
  posts: CmsFeaturedInsight[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const visiblePosts = posts
    .filter((post) => Boolean(post?.title?.trim() && post?.slug && post?.imageUrl))
    .slice(0, 6);

  if (visiblePosts.length === 0) return null;

  const scrollCards = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const firstCard = scroller.querySelector<HTMLElement>("[data-insight-card]");
    const amount = firstCard
      ? firstCard.getBoundingClientRect().width * 0.82
      : scroller.clientWidth * 0.75;

    scroller.scrollBy({
      left: amount * direction,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const resolvedHeading = heading?.trim() || "News and Blogs";

  return (
    <section
      id="insights"
      aria-labelledby="insights-heading"
      className="landing-section-transition culture-thread heritage-surface paithani-edge fort-silhouette relative w-full overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-[3.5rem] lg:py-[6.5rem]"
    >
      <HeritageDepthField className="z-0 opacity-45" tone="light" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-24 h-72 w-72 rotate-45 border border-[#B68A16]/10" />

      <div className="relative z-10 flex w-full flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduceMotion ? 0 : 0.55 }}
            className={`${inter.className} text-[0.625rem] font-semibold uppercase leading-4 tracking-[0.08em] text-[rgba(0,9,51,0.58)]`}
          >
            {eyebrow?.trim() || "LATEST ANNOUNCEMENTS"}
          </motion.p>

          <h2
            id="insights-heading"
            className={`${exo2.className} premium-display mt-2.5 overflow-hidden text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.04rem] text-black sm:text-[2.5rem] sm:leading-[2.95rem]`}
          >
            <TextReveal text={resolvedHeading} stagger={0.055} />
          </h2>
        </div>

        <Link
          href={cta?.href || "/insights"}
          className={`${inter.className} kinetic-link group inline-flex shrink-0 items-center gap-1.5 py-2 text-sm font-semibold text-[#8F6C1A]`}
        >
          <span>{cta?.label || "Explore Capabilities"}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">
            <ArrowIcon />
          </span>
        </Link>
      </div>

      <div
        ref={scrollerRef}
        className="insights-track relative z-10 mt-12 flex w-full gap-6 overflow-x-auto overflow-y-visible pb-12 pt-3 scroll-smooth sm:mt-14 lg:mt-16 lg:gap-8"
      >
        {visiblePosts.map((post, index) => (
          <InsightCard
            key={post._id}
            post={post}
            featured={index === 0}
            index={index}
          />
        ))}
      </div>

      {visiblePosts.length > 1 ? (
        <div className="relative z-10 mt-1 flex justify-end gap-2 sm:mt-2">
          <button
            type="button"
            onClick={() => scrollCards(-1)}
            aria-label="Previous announcement"
            className="premium-3d-shadow group inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#8F6C1A]/12 bg-[#FCFAF5] text-[#8F6C1A] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#f5eedc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F6C1A]"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollCards(1)}
            aria-label="Next announcement"
            className="premium-3d-shadow group inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#8F6C1A]/12 bg-[#FCFAF5] text-[#8F6C1A] transition-all duration-300 hover:translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#f5eedc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F6C1A]"
          >
            <ArrowIcon />
          </button>
        </div>
      ) : null}

      <style>{`
        .insights-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .insights-track::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          .insights-track { scroll-behavior: auto; }
        }
      `}</style>
    </section>
  );
}
