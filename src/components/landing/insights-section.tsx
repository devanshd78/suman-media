"use client";

import Image from "next/image";
import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";
import { useRef } from "react";

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

function InsightCard({ post, featured }: { post: CmsFeaturedInsight; featured: boolean }) {
  return (
    <article
      data-insight-card
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
        <div className="relative aspect-[16/8.6] w-full overflow-hidden bg-[#eee9dc]">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt?.trim() || post.title}
            fill
            sizes={featured ? "(max-width: 767px) 86vw, 58vw" : "(max-width: 767px) 82vw, 35vw"}
            className="select-none object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
        </div>

        <div className="pt-5">
          <h3 className={`${inter.className} text-base font-semibold leading-6 text-black sm:text-lg`}>
            {post.title}
          </h3>

          <div className="mt-2 flex items-start justify-between gap-5">
            {post.excerpt ? (
              <p className={`${inter.className} line-clamp-2 min-w-0 max-w-[38rem] text-sm leading-5 text-[rgba(0,9,51,0.58)]`}>
                {post.excerpt}
              </p>
            ) : <span />}

            <span className={`${inter.className} shrink-0 text-xs font-semibold text-[#8F6C1A] underline underline-offset-2 transition-opacity group-hover:opacity-65 sm:text-sm`}>
              learn more
            </span>
          </div>
        </div>
      </Link>
    </article>
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

  const visiblePosts = posts
    .filter((post) => Boolean(post?.title?.trim() && post?.slug && post?.imageUrl))
    .slice(0, 6);

  if (visiblePosts.length === 0) return null;

  const scrollCards = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const firstCard = scroller.querySelector<HTMLElement>("[data-insight-card]");
    const amount = firstCard ? firstCard.getBoundingClientRect().width * 0.82 : scroller.clientWidth * 0.75;

    scroller.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <section
      id="insights"
      aria-labelledby="insights-heading"
      className="landing-section-transition mx-auto w-full max-w-[90rem] overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-[3.5rem] lg:py-[6rem]"
    >
      <div className="flex w-full flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div>
          <p className={`${inter.className} text-[0.625rem] font-semibold uppercase leading-4 tracking-[0.045em] text-[rgba(0,9,51,0.58)]`}>
            {eyebrow?.trim() || "LATEST ANNOUNCEMENTS"}
          </p>
          <h2
            id="insights-heading"
            className={`${exo2.className} mt-2.5 text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.04rem] text-black sm:text-[2.4rem] sm:leading-[2.9rem]`}
          >
            {heading?.trim() || "News and Blogs"}
          </h2>
        </div>

        <Link
          href={cta?.href || "/insights"}
          className={`${inter.className} group inline-flex shrink-0 items-center gap-1.5 py-2 text-sm font-semibold text-[#8F6C1A] transition-opacity hover:opacity-65`}
        >
          <span>{cta?.label || "Explore Capabilities"}</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            <ArrowIcon />
          </span>
        </Link>
      </div>

      <div
        ref={scrollerRef}
        className="insights-track mt-12 flex w-full gap-6 overflow-x-auto overflow-y-hidden scroll-smooth sm:mt-14 lg:mt-16 lg:gap-8"
      >
        {visiblePosts.map((post, index) => (
          <InsightCard key={post._id} post={post} featured={index === 0} />
        ))}
      </div>

      {visiblePosts.length > 1 ? (
        <div className="mt-8 flex justify-end gap-2 sm:mt-10">
          <button
            type="button"
            onClick={() => scrollCards(-1)}
            aria-label="Previous announcement"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#FCFAF5] text-[#8F6C1A] transition-colors hover:bg-[#f5eedc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F6C1A]"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollCards(1)}
            aria-label="Next announcement"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#FCFAF5] text-[#8F6C1A] transition-colors hover:bg-[#f5eedc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F6C1A]"
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
