"use client";

import Image from "next/image";
import { ContentMovement } from "./content-movement";
import { ContentShowcase } from "./content-showcase";
import NewsSection from "@/components/monetization/news-section";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

type AcquisitionCard = {
  id: number;
  title: string;
  description: string;
  type: "film" | "music" | "ott";
};

const acquisitionCards: AcquisitionCard[] = [
  {
    id: 1,
    title: "Film Rights Acquisition",
    description:
      "Acquiring film rights to create distribution and monetisation opportunities across relevant platforms and markets.",
    type: "film",
  },
  {
    id: 2,
    title: "Music Rights Acquisition",
    description:
      "Acquiring songs, albums and music catalogues for digital, commercial and multi-platform distribution.",
    type: "music",
  },
  {
    id: 3,
    title: "OTT Rights",
    description:
      "Structuring content rights for premium OTT platforms and digital audiences.",
    type: "ott",
  },
  {
    id: 4,
    title: "Digital Distribution",
    description:
      "Expanding premium content across digital platforms, connected audiences and international markets.",
    type: "film",
  },
];

export default function ContentDistributionPage() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const activePointer = useRef<number | null>(null);

  const dragData = useRef({
    startX: 0,
    scrollLeft: 0,
  });

  const scrollSlider = useCallback((direction: "left" | "right") => {
    const slider = sliderRef.current;

    if (!slider) return;

    const card = slider.querySelector<HTMLElement>("[data-card]");

    const amount = card
      ? card.offsetWidth + 24
      : Math.min(slider.clientWidth * 0.85, 524);

    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const atEnd = slider.scrollLeft >= maxScroll - 2;
    const atStart = slider.scrollLeft <= 2;

    slider.scrollTo({
      left: direction === "right"
        ? (atEnd ? 0 : slider.scrollLeft + amount)
        : (atStart ? maxScroll : slider.scrollLeft - amount),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant" : "smooth",
    });
  }, []);

  useEffect(() => {
    if (paused || dragging) return;

    const timer = window.setInterval(() => {
      if (document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      scrollSlider("right");
    }, 4000);

    return () => window.clearInterval(timer);
  }, [paused, dragging, scrollSlider]);

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const slider = sliderRef.current;

    if (!slider || !event.isPrimary || event.button !== 0) return;

    activePointer.current = event.pointerId;
    slider.scrollTo({ left: slider.scrollLeft, behavior: "instant" });

    dragData.current = {
      startX: event.clientX,
      scrollLeft: slider.scrollLeft,
    };

    setDragging(true);
    slider.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const slider = sliderRef.current;

    if (!slider || activePointer.current !== event.pointerId) return;

    const distance = event.clientX - dragData.current.startX;

    slider.scrollLeft =
      dragData.current.scrollLeft - distance;
  };

  const stopDragging = (
    event?: ReactPointerEvent<HTMLDivElement>
  ) => {
    activePointer.current = null;
    setDragging(false);

    const slider = sliderRef.current;

    if (
      slider &&
      event &&
      slider.hasPointerCapture(event.pointerId)
    ) {
      slider.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <main className="content-page">
      {/* =========================================================
          HERO SECTION
      ========================================================== */}
      <section className="hero-section">
        <div className="hero-copy">
          <div className="hero-content">
            <p className="eyebrow">
              CONTENT ACQUISITION &amp; DISTRIBUTION
            </p>

            <h1 className="hero-heading">
              Turn valuable content
              <br />
              rights into scalable
              <br />
              distribution
              <br />
              opportunities.
            </h1>

            <p className="hero-description">
              We acquire, manage, and distribute films, music, and
              premium content across OTT platforms, television, FAST
              channels, and international markets. From strategic
              content acquisition and rights management to
              multi-platform distribution and audience expansion, we
              help valuable content reach the right audiences, across
              the right channels, in markets worldwide.
            </p>
          </div>

          <a href="#acquire" className="partner-link">
            <span>Partner with us</span>

            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6.75 3.75L12 9L6.75 14.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="hero-image">
          <Image
            src="/images/content&distribution/Image1.png"
            alt="Content acquisition and distribution"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
            className="hero-image-file"
          />

          <div className="hero-image-gradient" />
        </div>
      </section>

      {/* =========================================================
          ACQUISITION SECTION
      ========================================================== */}
      <section id="acquire" className="acquisition-section">
        <div
          className="acquisition-inner"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
          }}
        >
          <div className="section-header">
            <div>
              <h2 className="section-title">
                What We Acquire &amp; Distribute
              </h2>

              <p className="section-subtitle">
                One Content Ecosystem. Multiple Routes to Market.
              </p>
            </div>

            <div className="slider-buttons">
              <button
                type="button"
                aria-label="Previous card"
                onClick={() => scrollSlider("left")}
                className="slider-button slider-button-light"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M11.25 3.75L6 9L11.25 14.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Next card"
                onClick={() => scrollSlider("right")}
                className="slider-button slider-button-gold"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M6.75 3.75L12 9L6.75 14.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={sliderRef}
            className={`cards-slider ${dragging ? "dragging" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            onLostPointerCapture={stopDragging}
            tabIndex={0}
            role="region"
            aria-label="Acquisition cards"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                scrollSlider(event.key === "ArrowRight" ? "right" : "left");
              }
            }}
          >
            {acquisitionCards.map((card) => (
              <AcquisitionCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>

      <ContentMovement />
      <ContentShowcase />
      <NewsSection articleLinkOverride="/news-and-blogs" />

      <style jsx>{`
        .content-page {
          width: 100%;
          overflow: hidden;
          background: #ffffff;
          font-family: "Plus Jakarta Sans", Arial, sans-serif;
        }

        /* =====================================================
           HERO
        ====================================================== */

        .hero-section {
          display: flex;
          height: 50.375rem;
          padding: 2rem 3.5rem 3.5rem 3.5rem;
          align-items: flex-start;
          gap: 3.5rem;
          align-self: stretch;
          background: #ffffff;
        }

        .hero-copy {
          width: calc(50% - 1.75rem);
          height: 100%;
          min-width: 0;

          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-content {
          width: 100%;
        }

        .eyebrow {
          margin: 0 0 1.25rem 0;

          color: var(
            --Light-Border-Text-Tertiary,
            #b8b8b8
          );

          font-feature-settings:
            "liga" off,
            "clig" off;

          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 0.875rem;
          font-style: normal;
          font-weight: 600;
          line-height: 1.25rem;

          text-transform: uppercase;
        }

        .hero-heading {
          margin: 0;

          color: #000000;

          font-feature-settings:
            "liga" off,
            "clig" off;

          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 3.5rem;
          font-style: normal;
          font-weight: 600;
          line-height: 4rem;
          letter-spacing: -0.0625rem;
        }

        .hero-description {
          max-width: 43rem;

          margin: 1.5rem 0 0;

          color: var(
            --Light-Border-Text-Secondary,
            #969696
          );

          font-feature-settings:
            "liga" off,
            "clig" off;

          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 1.25rem;
          font-style: normal;
          font-weight: 400;
          line-height: 1.75rem;
        }

        .partner-link {
          margin-top: auto;

          display: flex;
          padding: 0;
          justify-content: center;
          align-items: center;
          gap: 0.25rem;

          border-radius: 0.25rem;

          color: var(--Text-Warning, #8f6c1a);
          text-decoration: none;
          text-align: center;

          font-feature-settings:
            "liga" off,
            "clig" off;

          font-family: Inter, Arial, sans-serif;
          font-size: 1rem;
          font-style: normal;
          font-weight: 600;
          line-height: 1.5rem;

          transition:
            gap 200ms ease,
            opacity 200ms ease;
        }

        .partner-link:hover {
          gap: 0.5rem;
          opacity: 0.8;
        }

        .hero-image {
          position: relative;
          flex: 1 0 0;
          align-self: stretch;

          min-width: 0;
          overflow: hidden;

          border-radius: 1rem;
          background: #d3d3d3;
        }

        .hero-image :global(.hero-image-file) {
          object-fit: cover;
          object-position: center center;
        }

        .hero-image-gradient {
          position: absolute;
          inset: 0;
          pointer-events: none;

          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 24.08%,
            rgba(255, 255, 255, 0.08) 50%,
            rgba(124, 124, 204, 0.08) 100%
          );
        }

        /* =====================================================
           ACQUISITION SECTION
        ====================================================== */

        .acquisition-section {
          display: flex;
          padding: 6.25rem 3.5rem;
          flex-direction: column;
          align-items: center;
          gap: 6.25rem;
          align-self: stretch;

          background: #ffffff;
        }

        .acquisition-inner {
          width: 100%;
          min-width: 0;
        }

        .section-header {
          width: 100%;

          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 2rem;

          margin-bottom: 6.25rem;
        }

        .section-title {
          margin: 0;

          color: var(
            --Light-Border-Text-Primary,
            #1a1a1a
          );

          font-feature-settings:
            "liga" off,
            "clig" off;

          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 2.5rem;
          font-style: normal;
          font-weight: 600;
          line-height: 3rem;
          letter-spacing: -0.03125rem;
        }

        .section-subtitle {
          margin: 0.5rem 0 0;

          color: var(
            --Light-Border-Text-Secondary,
            #969696
          );

          font-feature-settings:
            "liga" off,
            "clig" off;

          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 1rem;
          font-style: normal;
          font-weight: 400;
          line-height: 1.5rem;
        }

        .slider-buttons {
          display: flex;
          align-items: center;
          gap: 0.75rem;

          flex-shrink: 0;
        }

        .slider-button {
          width: 3rem;
          height: 3rem;
          padding: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 0;
          border-radius: 0.5rem;

          cursor: pointer;

          transition:
            transform 160ms ease,
            opacity 160ms ease;
        }

        .slider-button:hover {
          transform: translateY(-1px);
        }

        .slider-button:active {
          transform: scale(0.96);
        }

        .slider-button-light {
          background: #f8f6f0;
          color: #8f6c1a;
        }

        .slider-button-gold {
          background: #8f6c1a;
          color: #ffffff;
        }

        /* =====================================================
           DRAGGABLE SLIDER
        ====================================================== */

        .cards-slider {
          display: flex;
          align-items: stretch;
          gap: 1.5rem;

          width: calc(100% + 3.5rem);

          overflow-x: auto;
          overflow-y: hidden;

          padding-right: 3.5rem;
          padding-bottom: 0.25rem;

          cursor: grab;

          scroll-snap-type: x proximity;
          scroll-behavior: smooth;

          scrollbar-width: none;

          user-select: none;
          touch-action: pan-y;
          overscroll-behavior-x: contain;
        }

        .cards-slider::-webkit-scrollbar {
          display: none;
        }

        .cards-slider.dragging {
          cursor: grabbing;
          scroll-behavior: auto;
          scroll-snap-type: none;
        }

        /* =====================================================
           RESPONSIVE
        ====================================================== */

        @media (max-width: 1200px) {
          .hero-heading {
            font-size: 3rem;
            line-height: 3.5rem;
          }

          .hero-description {
            font-size: 1.125rem;
            line-height: 1.65rem;
          }
        }

        @media (max-width: 950px) {
          .hero-section {
            height: auto;
            min-height: 0;

            padding: 2rem 2rem 5rem;

            flex-direction: column;
            gap: 3rem;
          }

          .hero-copy {
            width: 100%;
          }

          .hero-heading br {
            display: none;
          }

          .hero-description {
            max-width: 45rem;
          }

          .partner-link {
            margin-top: 2.5rem;
          }

          .hero-image {
            width: 100%;
            height: 35rem;
            flex: none;
          }

          .acquisition-section {
            padding: 5rem 2rem;
          }

          .section-header {
            margin-bottom: 4rem;
          }

          .cards-slider {
            width: calc(100% + 2rem);
            padding-right: 2rem;
          }
        }

        @media (max-width: 640px) {
          .hero-section {
            padding: 2rem 1.25rem 4rem;
            gap: 2rem;
          }

          .eyebrow {
            margin-bottom: 1rem;
            font-size: 0.75rem;
          }

          .hero-heading {
            font-size: 2.5rem;
            line-height: 2.9rem;
            letter-spacing: -0.04rem;
          }

          .hero-description {
            margin-top: 1.5rem;
            font-size: 1rem;
            line-height: 1.5rem;
          }

          .hero-image {
            height: 28rem;
            border-radius: 0.75rem;
          }

          .acquisition-section {
            padding: 4rem 1.25rem;
          }

          .section-header {
            align-items: flex-end;
            margin-bottom: 3rem;
          }

          .section-title {
            font-size: 2rem;
            line-height: 2.5rem;
          }

          .slider-button {
            width: 2.75rem;
            height: 2.75rem;
          }

          .cards-slider {
            width: calc(100% + 1.25rem);
            padding-right: 1.25rem;
          }
        }
      `}</style>
    </main>
  );
}

/* =========================================================
   CARD
========================================================== */

function AcquisitionCard({
  card,
}: {
  card: AcquisitionCard;
}) {
  return (
    <article data-card className="acquisition-card">
      <div className="card-copy">
        <h3>{card.title}</h3>
        <p>{card.description}</p>
      </div>

      <div className={`card-media ${card.type === "music" ? "music-media" : ""}`}>
        {card.type === "film" && <FilmArtwork />}

        {card.type === "music" && (
          <div className="music-image" role="img" aria-label="Music rights acquisition" />
        )}

        {card.type === "ott" && (
          <div className="single-image ott-image">
            <Image
              src="/images/ott/Curse Of the Nun.png"
              alt="OTT content distribution"
              fill
              draggable={false}
              sizes="500px"
            />
          </div>
        )}
      </div>

      <style jsx>{`
        .acquisition-card {
          width: 31.25rem;
          height: 38.9375rem;

          flex: 0 0 31.25rem;

          display: flex;
          padding-top: 2rem;
          flex-direction: column;
          align-items: center;
          gap: 3.5rem;

          overflow: hidden;

          border-radius: 2rem;
          background: #f8f8f8;

          scroll-snap-align: start;
        }

        .card-copy {
          display: flex;
          padding: 0 2rem;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.5rem;
          align-self: stretch;

          flex-shrink: 0;
        }

        .card-copy h3 {
          margin: 0;

          color: #372b0d;

          font-feature-settings:
            "liga" off,
            "clig" off;

          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 2rem;
          font-style: normal;
          font-weight: 700;
          line-height: 2.5rem;
        }

        .card-copy p {
          margin: 0;

          color: var(
            --Light-Border-Text-Secondary,
            #969696
          );

          font-feature-settings:
            "liga" off,
            "clig" off;

          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 1rem;
          font-style: normal;
          font-weight: 400;
          line-height: 1.5rem;
        }

        .card-media {
          position: relative;

          width: 100%;
          min-height: 0;
          flex: 1;

          overflow: hidden;
        }

        .single-image {
          position: absolute;

          inset: 0 0 0 0;

          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .single-image :global(img) {
          object-fit: contain;
          object-position: center bottom;
          padding: 0 1.5rem;
        }

        .music-media {
          width: 31.25rem;
          max-width: 100%;
          height: 22.125rem;
          flex: 0 0 auto;
          aspect-ratio: 113 / 80;
        }

        .music-image {
          width: 100%;
          height: 100%;
          background: url("/images/content&distribution/Image2.png") lightgray
            -0.288px -246.62px / 104.029% 263.042% no-repeat;
        }

        @media (max-width: 640px) {
          .music-media { height: auto; }
          .music-image {
            position: absolute;
            inset: 0;
            background-position: 1.43% 42.73%;
          }
        }

        .ott-image :global(img) {
          object-position: center bottom;
        }

        @media (max-width: 640px) {
          .acquisition-card {
            width: min(31.25rem, calc(100vw - 3rem));
            flex-basis: min(
              31.25rem,
              calc(100vw - 3rem)
            );

            height: 35rem;

            gap: 2.5rem;

            border-radius: 1.5rem;
          }

          .card-copy {
            padding: 0 1.5rem;
            gap: 1rem;
          }

          .card-copy h3 {
            font-size: 1.6rem;
            line-height: 2rem;
          }

          .card-copy p {
            font-size: 0.9375rem;
            line-height: 1.4rem;
          }
        }
      `}</style>
    </article>
  );
}

/* =========================================================
   FILM PHONE ARTWORK
========================================================== */

function FilmArtwork() {
  return (
    <div className="film-artwork">
      <div className="phone">
        {/* Content shown inside the phone */}
        <div className="phone-screen-content">
          <Image
            src="/images/ott/mobile/onphone-image.png"
            alt="Film content shown on mobile"
            width={1164}
            height={2531}
            draggable={false}
            sizes="300px"
          />
        </div>

        {/* Time image */}
        <div className="phone-time">
          <Image
            src="/images/ott/mobile/time.png"
            alt=""
            width={1802}
            height={3909}
            unoptimized
            draggable={false}
            sizes="(max-width: 640px) 258px, 306px"
          />
        </div>

        {/* Logo in top center */}
        <div className="phone-logo">
          <Image
            src="/images/ott/mobile/center-logo.png"
            alt=""
            fill
            draggable={false}
            sizes="40px"
          />
        </div>
      </div>

      <style jsx>{`
        .film-artwork {
          position: absolute;
          inset: 0;

          display: flex;
          justify-content: center;
          align-items: flex-start;

          overflow: hidden;
        }

        .phone {
          position: relative;

          width: 21rem;
          height: 31.5rem;
          max-width: calc(100% - 2rem);
          display: flex;
          padding-right: 0.03125rem;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          border-radius: 1.875rem;
          border: 15px solid #fff;
          overflow: hidden;
          background: linear-gradient(115deg, #30103f, #170720);
          flex-shrink: 0;
        }

        .phone-screen-content {
          position: absolute;

          z-index: 2;

          left: 0;
          right: 0;
          top: 4.25rem;
          bottom: 0;

          overflow: hidden;

          background: #000;
        }

        .phone-screen-content :global(img) {
          /* Crop the phone bezel and status bar embedded in this asset. */
          position: absolute;
          width: 121%;
          max-width: none;
          height: auto;
          left: 0;
          top: 0;
          transform: translate(-8.3%, -18%);
          pointer-events: none;
        }

        .phone-time {
          position: absolute;

          z-index: 4;

          top: 0.5rem;
          left: 0;
          width: 100%;
          height: 1.5rem;
          overflow: hidden;
        }

        .phone-time :global(img) {
          width: 100%;
          height: auto;
        }

        .phone-logo {
          position: absolute;

          z-index: 4;

          top: 2rem;
          left: 50%;

          width: 2rem;
          height: 2rem;

          transform: translateX(-50%);
        }

        .phone-logo :global(img) {
          object-fit: contain;
        }

        @media (max-width: 640px) {
          .phone {
            width: 18rem;
            height: 27rem;
          }
        }
      `}</style>
    </div>
  );
}
