"use client";

import Image from "next/image";
import Link from "next/link";
import NewsSection from "@/components/monetization/news-section";
import CapitalMarketSections from "./capital-market-sections";
import { useCallback, useEffect, useRef, useState } from "react";

type Campaign = {
  title: string;
  description: string;
  image: string;
};

const campaigns: Campaign[] = [
  {
    title: "SME IPO Marketing",
    description:
      "Communication and campaign support for companies preparing to access SME capital markets.",
    image: "/images/capital/image 146.png",
  },
  {
    title: "Mainboard IPO Campaigns",
    description:
      "Strategic communication and campaign support around mainboard IPO initiatives.",
    image: "/images/capital/image 146-1.png",
  },
  {
    title: "Investor Relations",
    description:
      "Helping companies communicate business updates, milestones and key information to investors.",
    image: "/images/capital/image 146-2.png",
  },
  {
    title: "Shareholder Communications",
    description:
      "Clear and consistent communication designed for shareholders and other financial stakeholders.",
    image: "/images/capital/image 146-3.png",
  },
  {
    title: "Merchant Banker Support",
    description:
      "Communication and campaign support aligned with the requirements of capital-market advisors.",
    image: "/images/capital/image 146-4.png",
  },
  {
    title: "Digital Roadshows",
    description:
      "Digital presentations and investor-facing experiences designed to communicate the company story.",
    image: "/images/capital/image 146-5.png",
  },
  {
    title: "Financial PR",
    description:
      "Strategic communication around financial milestones, corporate developments and market updates.",
    image: "/images/capital/image 146-6.png",
  },
  {
    title: "Listed Company Communication",
    description:
      "Ongoing communication support for listed companies across important corporate and financial developments.",
    image: "/images/capital/image 146-7.png",
  },
];

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CapitalMarketsPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const sliderSectionRef = useRef<HTMLElement | null>(null);
  const changeSlide = useCallback((nextSlide: number) => {
    const safeIndex = Math.max(
      0,
      Math.min(campaigns.length - 1, nextSlide)
    );

    setActiveSlide(safeIndex);
    const section = sliderSectionRef.current;
    const panel = section?.querySelector<HTMLElement>(".campaign-inner");
    if (!section || !panel || getComputedStyle(panel).position !== "sticky") return;

    const offset = parseFloat(getComputedStyle(panel).top) || 0;
    const travel = section.offsetHeight - panel.offsetHeight;
    window.scrollTo({
      top: window.scrollY + section.getBoundingClientRect().top - offset +
        (safeIndex + 0.5) * (travel / campaigns.length),
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    const section = sliderSectionRef.current;
    if (!section) return;

    const panel = section.querySelector<HTMLElement>(".campaign-inner");
    if (!panel) return;
    let frame = 0;

    const updateSlide = () => {
      frame = 0;
      const style = getComputedStyle(panel);
      if (style.position !== "sticky") return;

      // Only consume slide travel after the complete panel reaches the header.
      // Each slide, including the first and last, gets a full scroll interval.
      const offset = parseFloat(style.top) || 0;
      const travel = section.offsetHeight - panel.offsetHeight;
      const progress = Math.max(0, offset - section.getBoundingClientRect().top);
      const index = Math.floor(progress / (travel / campaigns.length));
      setActiveSlide(Math.min(campaigns.length - 1, Math.max(0, index)));
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateSlide);
    };
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(section);
    observer.observe(panel);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <main className="capital-page">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="capital-hero">
        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">
              CAPITAL MARKETS &amp; INVESTOR COMMUNICATIONS
            </p>

            <h1>
              Communicating Value.
              <br />
              Building Market
              <br />
              Confidence.
            </h1>

            <p className="hero-description">
              Strategic communication solutions for companies navigating IPOs,
              investor engagement, shareholder communication and financial
              visibility.
            </p>

            <Link href="/contact" className="text-link">
              <span>Partner with us</span>
              <ArrowIcon />
            </Link>
          </div>

          <div className="hero-image">
            <Image
              src="/images/capital/Image1.jpg"
              alt="Capital markets and investor communications"
              fill
              priority
              sizes="50vw"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          CAMPAIGNS
      ========================================================== */}
      <section ref={sliderSectionRef} className="campaign-section">
        <div className="campaign-inner">
          <div className="campaign-intro">
            <h2>
              Launch &amp; Communicate
              <br />
              Campaigns effortlessly.
            </h2>

            <p>
              From IPO campaigns to ongoing investor communication, we help
              companies communicate their story clearly across key financial
              stakeholders.
            </p>
          </div>

          {/* The same scroll-driven slider is used on every screen size. */}
          <div className="campaign-desktop">
            <nav className="campaign-nav" aria-label="Campaign services">
              <div className="nav-line" aria-hidden="true" />

              {campaigns.map((campaign, index) => {
                const selected = activeSlide === index;

                return (
                  <button
                    type="button"
                    key={campaign.title}
                    className={`nav-item ${selected ? "active" : ""}`}
                    onClick={() => changeSlide(index)}
                    aria-current={selected ? "true" : undefined}
                  >
                    <span className="nav-indicator" aria-hidden="true">
                      {selected && <span className="nav-dot" />}
                    </span>

                    <span>{campaign.title}</span>
                  </button>
                );
              })}
            </nav>

            <div className="desktop-card-wrap">
              <div className="campaign-viewport">
                {campaigns.map((campaign, index) => (
                  <div
                    key={campaign.title}
                    className={`campaign-slide ${
                      index === activeSlide ? "is-active" :
                      index < activeSlide ? "is-before" : "is-after"
                    }`}
                    aria-hidden={index !== activeSlide}
                    inert={index !== activeSlide}
                  >
                    <CampaignCard campaign={campaign} />
                  </div>
                ))}
              </div>

              <div className="progress">
                {campaigns.map((campaign, index) => (
                  <button
                    type="button"
                    key={campaign.title}
                    aria-label={`Open ${campaign.title}`}
                    className={`progress-dot ${
                      activeSlide === index ? "active" : ""
                    }`}
                    onClick={() => changeSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <CapitalMarketSections />
      <NewsSection />

      <style jsx>{`
        :global(*) {
          box-sizing: border-box;
        }

        .capital-page {
          width: 100%;
          overflow: clip;
          background: #fff;
          color: #1a1a1a;
        }

        /* ========================================================
           HERO
        ======================================================== */

        .capital-hero {
          display: flex;
          height: 50.375rem;
          padding: 2rem 3.5rem 3.5rem;
          align-items: flex-start;
          gap: 3.5rem;
          align-self: stretch;
          background: #fff;
        }

        .hero-content {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 3.5rem;
          width: 100%;
          height: 100%;
        }

        .hero-copy {
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }

        .eyebrow {
          margin: 0 0 1rem;
          color: var(--Light-Border-Text-Tertiary, #b8b8b8);
          font-feature-settings:
            "liga" off,
            "clig" off;
          font-family: var(
            --Font-family-Heading,
            "Plus Jakarta Sans"
          );
          font-size: var(--Font-size-Tiny, 0.875rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Tiny, 1.25rem);
          text-transform: uppercase;
        }

        .hero-copy h1 {
          margin: 0;
          max-width: 42rem;
          color: #000;
          font-feature-settings:
            "liga" off,
            "clig" off;
          font-family: var(
            --Font-family-Heading,
            "Plus Jakarta Sans"
          );
          font-size: var(--Font-size-Display, 3.5rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Display, 4rem);
          letter-spacing: -0.0625rem;
        }

        .hero-description {
          max-width: 42rem;
          margin: 2rem 0 0;
          color: var(--Light-Border-Text-Secondary, #969696);
          font-feature-settings:
            "liga" off,
            "clig" off;
          font-family: var(--Font-family-Body, "Plus Jakarta Sans");
          font-size: var(--Font-size-Heading-4, 1.25rem);
          font-style: normal;
          font-weight: 400;
          line-height: var(--Line-height-Heading-4, 1.75rem);
        }

        .hero-copy :global(.text-link) {
          display: flex;
          padding: 0 var(--Spacing-0, 0);
          justify-content: center;
          align-items: center;
          gap: var(--Spacing-0, 0);
          margin-top: 3.5rem;
          border-radius: var(--Corner-radius-4, 0.25rem);
          color: var(--Text-Warning, #8f6c1a);
          text-align: center;
          font-feature-settings:
            "liga" off,
            "clig" off;
          font-family: var(--Font-family-Body, var(--font-inter, Inter, sans-serif));
          font-size: var(--Font-size-Small, 1rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Small, 1.5rem);
          text-decoration: none;
          transition: opacity 180ms ease;
        }

        .hero-copy :global(.text-link:hover) {
          opacity: 0.8;
        }

        .hero-image {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 0;
          overflow: hidden;
          border-radius: 0.75rem;
        }

        .hero-image :global(img) {
          object-fit: cover;
          object-position: center;
        }

        /* ========================================================
           CAMPAIGN SECTION
        ======================================================== */

        .campaign-section {
          display: flex;
          padding: 6.25rem 3.5rem;
          flex-direction: column;
          align-items: center;
          gap: 6.25rem;
          align-self: stretch;
          background: #fff;
        }

        .campaign-inner {
          width: 100%;
          max-width: 100rem;
          margin: 0 auto;
        }

        .campaign-intro {
          display: grid;
          grid-template-columns: minmax(0, 33.25rem) minmax(20rem, 1fr);
          column-gap: 6.25rem;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 6.25rem;
        }

        .campaign-intro h2 {
          width: 33.25rem;
          max-width: 100%;
          margin: 0;
          color: var(--Light-Border-Text-Primary, #1a1a1a);
          font-feature-settings:
            "liga" off,
            "clig" off;
          font-family: var(
            --Font-family-Heading,
            "Plus Jakarta Sans"
          );
          font-size: var(--Font-size-Heading-1, 2.5rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Heading-1, 3rem);
          letter-spacing: -0.03125rem;
        }

        .campaign-intro p {
          justify-self: end;
          max-width: 43rem;
          margin: 0;
          padding-top: 0.5rem;
          color: var(--Light-Border-Text-Secondary, #969696);
          font-feature-settings:
            "liga" off,
            "clig" off;
          font-family: var(--Font-family-Body, "Plus Jakarta Sans");
          font-size: var(--Font-size-Small, 1rem);
          font-style: normal;
          font-weight: 400;
          line-height: var(--Line-height-Small, 1.5rem);
        }

        .campaign-desktop {
          display: grid;
          grid-template-columns: 17.875rem minmax(0, 1fr);
          gap: 6rem;
          align-items: stretch;
          width: 100%;
        }

        /* LEFT NAV */

        .campaign-nav {
          position: relative;
          display: flex;
          min-width: 0;
          flex-direction: column;
          align-items: stretch;
        }

        .nav-line {
          position: absolute;
          top: 0.75rem;
          bottom: calc(12.5% - 0.75rem);
          left: 0.96875rem;
          width: 1px;
          background: #8f6c1a;
          z-index: 0;
        }

        .nav-item {
          position: relative;
          z-index: 1;
          display: flex;
          min-height: 0;
          flex: 1;
          width: 100%;
          padding: 0;
          align-items: flex-start;
          gap: 1rem;
          border: 0;
          background: transparent;
          color: #1a1a1a;
          text-align: left;
          cursor: pointer;
          font-feature-settings:
            "liga" off,
            "clig" off;
          font-family: var(--Font-family-Body, "Plus Jakarta Sans");
          font-size: var(--Font-size-Small, 1rem);
          font-style: normal;
          font-weight: 400;
          line-height: var(--Line-height-Small, 1.5rem);
        }

        .nav-item.active {
          font-weight: 500;
        }

        .nav-item > span:last-child {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .nav-indicator {
          position: relative;
          display: flex;
          width: 2rem;
          height: 1.5rem;
          flex: 0 0 2rem;
          align-items: center;
          justify-content: center;
        }

        .nav-dot {
          display: block;
          width: 0.625rem;
          height: 0.625rem;
          border-radius: 999px;
          background: #8f6c1a;
        }

        /* RIGHT CARD */

        .desktop-card-wrap {
          min-width: 0;
        }

        .campaign-viewport {
          position: relative;
          flex: 1;
          min-height: 0;
          overflow: hidden;
          border-radius: 2rem;
          isolation: isolate;
        }

        .campaign-slide {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          opacity: 0;
          pointer-events: none;
          transition:
            transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 650ms ease;
        }

        .campaign-slide.is-after {
          transform: translateY(100%);
        }

        .campaign-slide.is-before {
          transform: translateY(-100%);
        }

        .campaign-slide.is-active {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        @media (prefers-reduced-motion: reduce) {
          .campaign-slide {
            transition: none;
          }
        }

        .progress {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.25rem;
        }

        .progress-dot {
          width: 0.4375rem;
          height: 0.4375rem;
          padding: 0;
          border: 0;
          border-radius: 100%;
          background: #dadada;
          cursor: pointer;
        }

        .progress-dot.active {
          background: #8f6c1a;
        }


        /* One layout at every viewport: only dimensions and type scale. */
        .capital-page {
          --capital-gutter: clamp(0.625rem, 3.9vw, 5rem);
          --capital-heading: clamp(1rem, 2.8vw, 3.5rem);
          --capital-body: clamp(0.625rem, 1.12vw, 1.25rem);
        }

        .capital-hero {
          height: clamp(25rem, 56vw, 65rem);
          padding: 2rem var(--capital-gutter) clamp(2rem, 4vw, 4rem);
        }
        .hero-content { gap: clamp(0.75rem, 3.9vw, 5rem); }
        .hero-copy h1 { font-size: clamp(1.25rem, 3.9vw, 4.5rem); line-height: 1.15; letter-spacing: -0.02em; overflow-wrap: anywhere; }
        .eyebrow { font-size: clamp(0.5rem, 0.98vw, 1rem); line-height: 1.4; margin-bottom: clamp(0.5rem, 1.12vw, 1rem); }
        .hero-description { font-size: clamp(0.625rem, 1.4vw, 1.5rem); line-height: 1.4; margin-top: clamp(0.75rem, 2.2vw, 2rem); }
        .hero-copy :global(.text-link) { font-size: var(--capital-body); line-height: 1.5; margin-top: clamp(1rem, 3.9vw, 3.5rem); }
        .hero-copy :global(.text-link svg) { width: 1em; height: 1em; }

        .campaign-section {
          display: block;
          height: calc(100svh - var(--site-header-offset, 64px) + ${campaigns.length * 80}svh);
          padding: 0;
        }
        .campaign-inner {
          position: sticky;
          top: var(--site-header-offset, 64px);
          display: flex;
          flex-direction: column;
          height: calc(100svh - var(--site-header-offset, 64px));
          max-width: none;
          padding: clamp(0.5rem, 2.5svh, 3rem) var(--capital-gutter);
        }
        .campaign-intro {
          flex: none;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          column-gap: clamp(0.75rem, 6.9vw, 6.25rem);
          margin-bottom: clamp(0.75rem, 3svh, 3rem);
        }
        .campaign-intro h2 { width: auto; font-size: min(var(--capital-heading), 5svh); line-height: 1.2; letter-spacing: -0.02em; }
        .campaign-intro p { font-size: min(var(--capital-body), 2.8svh); line-height: 1.45; padding-top: 0; }
        .campaign-desktop {
          flex: 1;
          min-height: 0;
          grid-template-columns: minmax(0, clamp(5.5rem, 20vw, 22rem)) minmax(0, 1fr);
          gap: clamp(0.625rem, 4vw, 6rem);
        }
        .nav-item { font-size: clamp(0.625rem, min(2.7vw, 2.5svh), 1rem); line-height: 1.3; gap: clamp(0.25rem, 1.12vw, 1rem); }
        .nav-indicator { width: clamp(0.75rem, 2.2vw, 2rem); flex-basis: clamp(0.75rem, 2.2vw, 2rem); height: 1.3em; }
        .nav-line { left: calc(clamp(0.75rem, 2.2vw, 2rem) / 2 - 0.5px); top: 0.65em; bottom: calc(12.5% - 0.65em); font-size: clamp(0.625rem, min(2.7vw, 2.5svh), 1rem); }
        .nav-dot { width: clamp(0.25rem, 0.7vw, 0.625rem); height: clamp(0.25rem, 0.7vw, 0.625rem); }
        .desktop-card-wrap { display: flex; flex-direction: column; min-height: 0; }
        .campaign-viewport { border-radius: clamp(0.5rem, 2.2vw, 2rem); }
        .progress { margin-top: clamp(0.25rem, 1svh, 1rem); gap: clamp(0.125rem, 0.6vw, 0.5rem); }
        .progress-dot { width: 1.25rem; height: 1.5rem; background: radial-gradient(circle, #dadada 0 3px, transparent 3.5px); }
        .progress-dot.active { background: radial-gradient(circle, #8f6c1a 0 3px, transparent 3.5px); }
      `}</style>
    </main>
  );
}

/* =============================================================
   CAMPAIGN CARD
============================================================= */

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <article className="campaign-card">
      <div className="card-header">
        <div className="card-copy">
          <h3>{campaign.title}</h3>

          <p>{campaign.description}</p>
        </div>

        <Link href="/contact" className="contact-link">
          <span>Contact us</span>
          <ArrowIcon />
        </Link>
      </div>

      <div className="campaign-image">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          sizes="(max-width: 1023px) 100vw, 65vw"
        />
      </div>

      <style jsx>{`
        .campaign-card {
          display: flex;
          height: 34.875rem;
          padding: 2rem;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
          align-self: stretch;
          overflow: hidden;
          border-radius: 2rem;
          background: #f5f5f5;
        }

        .card-header {
          display: flex;
          width: 100%;
          min-width: 0;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
        }

        .card-copy {
          min-width: 0;
          flex: 1;
        }

        .card-copy h3 {
          margin: 0;
          color: #372b0d;
          font-feature-settings:
            "liga" off,
            "clig" off;
          font-family: var(
            --Font-family-Heading,
            "Plus Jakarta Sans"
          );
          font-size: var(--Font-size-Heading-3, 1.5rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Heading-3, 2rem);
        }

        .card-copy p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          width: 100%;
          margin: 0.75rem 0 0;
          overflow: hidden;
          color: var(--Light-Border-Text-Secondary, #969696);
          font-feature-settings:
            "liga" off,
            "clig" off;
          text-overflow: ellipsis;
          font-family: var(--Font-family-Body, "Plus Jakarta Sans");
          font-size: var(--Font-size-Small, 1rem);
          font-style: normal;
          font-weight: 500;
          line-height: var(--Line-height-Small, 1.5rem);
        }

        .campaign-card :global(.contact-link) {
          display: flex;
          flex: 0 0 auto;
          padding: 0.625rem 0;
          justify-content: center;
          align-items: center;
          gap: var(--Spacing-4, 0.25rem);
          border-radius: var(--Spacing-12, 0.75rem);
          color: #8f6c1a;
          text-align: center;
          font-feature-settings:
            "liga" off,
            "clig" off;
          font-family: var(--Font-family-Body, var(--font-inter, Inter, sans-serif));
          font-size: var(--Font-size-Small, 1rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Small, 1.5rem);
          text-decoration: none;
          white-space: nowrap;
          transition: opacity 180ms ease;
        }

        .campaign-card :global(.contact-link:hover) {
          opacity: 0.8;
        }

        .campaign-image {
          position: relative;
          width: 100%;
          height: 24.125rem;
          flex-shrink: 0;
          align-self: stretch;
          overflow: hidden;
          border-radius: 0.75rem;
          background: lightgray;
        }

        .campaign-image :global(img) {
          object-fit: cover;
          object-position: center;
          transition: transform 450ms ease;
        }

        .campaign-card:hover .campaign-image :global(img) {
          transform: scale(1.015);
        }


        .campaign-card {
          flex: 1;
          height: auto;
          min-height: 0;
          padding: clamp(0.5rem, min(2vw, 2.5svh), 2rem);
          gap: clamp(0.5rem, 2svh, 2.5rem);
          border-radius: clamp(0.5rem, 2.2vw, 2rem);
        }
        .card-header { flex: none; gap: clamp(0.375rem, 1.4vw, 2rem); }
        .card-copy h3 { font-size: clamp(0.75rem, min(1.7vw, 3.5svh), 1.75rem); line-height: 1.3; overflow-wrap: anywhere; }
        .card-copy p { margin-top: clamp(0.25rem, 0.8vw, 0.75rem); font-size: var(--capital-body); line-height: 1.4; }
        .campaign-card :global(.contact-link) { font-size: clamp(0.625rem, min(1.12vw, 2.5svh), 1rem); line-height: 1.5; padding: clamp(0.25rem, 0.7vw, 0.625rem) 0; gap: 0.125rem; }
        .campaign-card :global(.contact-link svg) { width: 1em; height: 1em; }
        .campaign-image { flex: 1; height: auto; min-height: 0; border-radius: clamp(0.25rem, 0.8vw, 0.75rem); }
      `}</style>
    </article>
  );
}

