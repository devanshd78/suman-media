
"use client";


import { PreFooterBanner } from "@/components/shared/pre-footer-banner";
import { LocalizedContent } from "@/components/localization/localized-content";
import { useState } from "react";
import { NewsBlogsSection } from "@/components/landing/news-blogs-section";

/* =========================================
   ASSET PATHS
========================================= */

const ASSET_BASE = "/images/government";
const OTT_BASE = "/images/abhijat-marathi";

const ICON_BASE =
  `${ASSET_BASE}/icons`;

const VIDEO_SRC =
  `${ASSET_BASE}/government-hero-clouds.mp4`;

/* =========================================
   SECTION 2 - AI CAPABILITIES
========================================= */

const capabilities = [
  {
    title: "AI Content Archiving.",
    description:
      "Exploring intelligent ways to organise, preserve and retrieve large content libraries.",
  },
  {
    title: "AI Publishing Solutions",
    description:
      "AI-enabled workflows for preparing, organising and publishing content across digital platforms.",
  },
  {
    title: "AI Content Discovery",
    description:
      "Helping audiences discover relevant films, music and content through intelligent discovery experiences.",
  },
  {
    title: "AI Translation",
    description:
      "Using AI to help make content accessible across languages and audiences.",
  },
  {
    title: "AI Recommendation Engines",
    description:
      "Exploring personalised recommendations based on content, interests and viewing behaviour.",
  },
  {
    title: "AI Research Projects",
    description:
      "Research and experimentation into emerging AI applications across media, entertainment and content.",
  },
  {
    title: "AI Dubbing & Voice Cloning",
    description:
      "Exploring AI-assisted dubbing and voice technologies to make multilingual content experiences.",
  },
  {
    title: "AI Metadata Generation",
    description:
      "Using AI to structure and enrich content metadata for better discovery, organisation and distribution.",
  },
  {
    title: "Digital Knowledge Systems",
    description:
      "Exploring structured digital knowledge systems for content, cultural information and organisational intelligence.",
  },
];

/* =========================================
   SECTION 3 - WHERE AI CREATES VALUE
========================================= */

const aiValues = [
  {
    title: "Discover",
    description:
      "Help audiences find the right content faster.",
    icon: "video-conference.svg",
  },
  {
    title: "Present",
    description:
      "Create more relevant content experiences.",
    icon: "presentation-chart.svg",
  },
  {
    title: "Expand",
    description:
      "Make regional content accessible across languages and markets.",
    icon: "television.svg",
  },
  {
    title: "Preserve",
    description:
      "Organise and protect valuable content and cultural archives.",
    icon: "archive.svg",
  },
];

/* =========================================
   SECTION 4 - CONTENT / AI SHOWCASE
========================================= */

type ActionTab = "library" | "ai";

type ActionCard = {
  title: string;
  image: string;
};

const actionCollections: Record<ActionTab, ActionCard[]> = {
  library: [
    {
      title: "Films",
      image: `${OTT_BASE}/abhijat-marathi-gallery-2.png`,
    },
    {
      title: "Songs",
      image: `${OTT_BASE}/nauvari-pahija.png`,
    },
    {
      title: "Archives",
      image: `${OTT_BASE}/zingaat.png`,
    },
  ],

  ai: [
    {
      title: "Translation",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Discovery",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Personalization",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    },
  ],
};

/* =========================================
   MAIN COMPONENT
========================================= */

export default function Page() {
  const [activeTab, setActiveTab] =
    useState<ActionTab>("library");

  const activeCards = actionCollections[activeTab];

  return <LocalizedContent>{(
    <main className="ai-page">

      {/* ===================================
          SECTION 1 - VIDEO HERO
      =================================== */}

      <section
        className="hero"
        aria-label="AI Built Around Content"
      >
        <div className="hero-video-wrap">
          <video
            className="hero-video"
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Floating bubbles above pink clouds"
          />

          <div className="hero-copy">
            <h1>AI Built Around Content</h1>

            <p>
              Exploring AI-driven solutions for
              content discovery, recommendations,
              <br className="desktop-break" />
              {" "}
              translation, publishing, archiving
              and digital knowledge.
            </p>

            <a
              className="hero-link"
              href="#ai-capabilities"
            >
              Explore Our Capabilities
              <span aria-hidden="true">›</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===================================
          SECTION 2 - AI CAPABILITIES
      =================================== */}

      <section
        className="capabilities-section"
        id="ai-capabilities"
      >
        <div className="section-heading">
          <span className="eyebrow">
            AI CAPABILITIES
          </span>

          <h2>Our Areas of Exploration</h2>
        </div>

        <div className="capabilities-grid">
          {capabilities.map((item, index) => {
            const imageName = ["content-archiving.png", "publishing-solutions.png", "content-discovery.png", "translation.png", "recommendation-engines.png", "research-projects.png", "dubbing-and-voice-cloning.png", "metadata-generation.png", "digital-knowledge-systems.png"][index];

            const slug = item.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/-$/, "");

            return (
              <article
                className="capability-card"
                key={item.title}
              >
                <img
                  className="card-image"
                  src={`${ASSET_BASE}/${encodeURIComponent(
                    imageName
                  )}`}
                  alt=""
                  width={100}
                  height={100}
                  loading="lazy"
                />

                <div className="card-body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <a
                  className="card-link"
                  href={`/ai-capabilities/${slug}`}
                >
                  Explore Our Capabilities
                  <span aria-hidden="true">›</span>
                </a>
              </article>
            );
          })}
        </div>
      </section>

      {/* ===================================
          SECTION 3 - WHERE AI CREATES VALUE
      =================================== */}

      <section
        className="ai-value-section"
        id="ai-value"
        aria-labelledby="ai-value-title"
      >
        <div className="ai-value-heading">
          <span className="ai-value-eyebrow">
            HOW GLOBAL JOURNEY STARTS
          </span>

          <h2 id="ai-value-title">
            Where AI Creates Value
          </h2>
        </div>

        <div className="ai-value-grid">
          {aiValues.map((item) => (
            <article
              className="ai-value-card"
              key={item.title}
            >
              <img
                className="ai-value-icon"
                src={`${ICON_BASE}/${item.icon}`}
                alt=""
                width={56}
                height={56}
                loading="lazy"
              />

              <div className="ai-value-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===================================
          SECTION 4 - AI IN ACTION
      =================================== */}

      <section
        className="action-section"
        id="ai-in-action"
        aria-labelledby="action-title"
      >
        <div className="action-inner">

          <div className="action-header">
            <div className="action-header-left">
              <span className="action-eyebrow">
                AI IN ACTION
              </span>

              <h2 id="action-title">
                From Content to Intelligence
              </h2>
            </div>

            <div className="action-header-right">
              <p>
                Our AI roadmap is focused on practical
                applications across content, entertainment
                and digital experiences – from intelligent
                discovery to multilingual access and
                knowledge systems.
              </p>
            </div>
          </div>

          <div className="action-showcase">

            {/* Interactive Toggle */}

            <div
              className="action-toggle"
              role="group"
              aria-label="Content and AI showcase"
            >
              <button
                type="button"
                className={`action-toggle-button library-button ${
                  activeTab === "library"
                    ? "selected"
                    : ""
                }`}
                aria-pressed={activeTab === "library"}
                onClick={() => setActiveTab("library")}
              >
                Content Library
              </button>

              <button
                type="button"
                className={`action-toggle-button ai-button ${
                  activeTab === "ai"
                    ? "selected"
                    : ""
                }`}
                aria-pressed={activeTab === "ai"}
                onClick={() => setActiveTab("ai")}
              >
                AI Layer
              </button>
            </div>

            {/* Image Cards */}

            <div
              className="action-cards-grid"
              aria-live="polite"
            >
              {activeCards.map((card) => (
                <article
                  key={`${activeTab}-${card.title}`}
                  className="action-image-card"
                  style={{
                    backgroundImage: `
                      radial-gradient(
                        101.5% 87.32% at 53.02% 2.59%,
                        rgba(0, 0, 0, 0) 67.04%,
                        rgba(0, 0, 0, 0.39) 88.52%
                      ),
                      linear-gradient(
                        to top,
                        rgba(0, 0, 0, 0.25),
                        transparent 50%
                      ),
                      url("${card.image}")
                    `,
                  }}
                >
                  <h3>{card.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================
          SECTION 5 - NEWS & BLOGS
      =================================== */}

      <NewsBlogsSection />

      {/* ===================================
          SECTION 6 - PARTNER WITH US
      =================================== */}

      <PreFooterBanner type={2} />

      {/* ===================================
          ALL PAGE STYLES
      =================================== */}

      <style jsx>{`

        /* =================================
           PAGE BASE
        ================================= */

        .ai-page {
          --primary: #1a1a1a;
          --body: #635f56;
          --gold: #8f6c1a;

          width: 100vw;
          max-width: none;
          margin-left: calc(50% - 50vw);

          overflow-x: clip;

          background: #ffffff;
          color: var(--primary);

          font-family:
            "Plus Jakarta Sans",
            sans-serif;
        }

        .ai-page,
        .ai-page * {
          box-sizing: border-box;
        }

        /* =================================
           SECTION 1 - VIDEO HERO
        ================================= */

        .hero {
          display: flex;

          width: 100%;
          max-width: none;
          min-height: 49.9375rem;

          padding: 0 0 3.5rem

          flex-direction: column;
          align-items: center;

          gap: 3.5rem;

          margin: 0 auto;
        }

        .hero-video-wrap {
          position: relative;

          width: 100%;
          height: auto;

          aspect-ratio: 1440 / 643;

          overflow: hidden;
          background: #ffffff;
        }

        .hero-video {
          display: block;

          width: 100%;
          height: 100%;

          object-fit: cover;
          object-position: center;

          pointer-events: none;
        }

        .hero-copy {
          position: absolute;

          top: 12.8%;
          left: 1rem;
          right: 1rem;

          display: flex;
          flex-direction: column;
          align-items: center;

          text-align: center;
          pointer-events: none;
        }

        .hero-copy h1 {
          margin: 0;

          font-size:
            clamp(1.75rem, 2.8vw, 2.5rem);

          font-weight: 600;
          line-height: 1.2;
          letter-spacing: -0.03125rem;
        }

        .hero-copy p {
          margin: 1rem 0 0;

          color: #969696;

          font-size: 0.875rem;
          font-weight: 400;
          line-height: 1.5;
        }

        .hero-link {
          display: inline-flex;
          align-items: center;

          gap: 0.25rem;
          margin-top: 1.5rem;

          color: var(--gold);

          font-family: Inter, sans-serif;
          font-size: 0.875rem;
          font-weight: 600;

          text-decoration: none;
          pointer-events: auto;
        }

        .hero-link span,
        .card-link span {
          font-size: 1.5em;
          line-height: 0.7;
        }

        /* =================================
           SECTION 2 - CAPABILITIES
        ================================= */

        .capabilities-section {
          display: flex;

          width: 100%;
          padding: 6.25rem 3.5rem;

          flex-direction: column;
          align-items: center;

          gap: 4rem;
          align-self: stretch;

          background: #ffffff;
          scroll-margin-top: 1rem;
        }

        .section-heading {
          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 1rem;
          text-align: center;
        }

        .eyebrow {
          color: #969696;

          font-family:
            "Plus Jakarta Sans",
            sans-serif;

          font-size: 0.875rem;
          font-style: normal;
          font-weight: 600;
          line-height: 1.25rem;
        }

        .section-heading h2 {
          margin: 0;

          color: #1a1a1a;

          font-family:
            "Plus Jakarta Sans",
            sans-serif;

          font-size: 2.5rem;
          font-weight: 600;
          line-height: 3rem;
          letter-spacing: -0.03125rem;
        }

        /* =================================
           CAPABILITY CARDS
        ================================= */

        .capabilities-grid {
          display: grid;

          width: 100%;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 1.25rem;
        }

        .capability-card {
          display: flex;

          min-width: 0;
          min-height: 21.75rem;

          padding: 1.25rem;

          flex-direction: column;
          justify-content: center;
          align-items: flex-start;

          gap: 1.25rem;

          border: 1px solid #e7e7e7;
          border-radius: 1rem;
          background: #ffffff;
        }

        .card-image {
          width: 6.25rem;
          height: 6.25rem;

          aspect-ratio: 1 / 1;
          border-radius: 1rem;

          object-fit: cover;
          flex-shrink: 0;
        }

        .card-body {
          display: flex;
          flex: 1;

          flex-direction: column;
          gap: 1.25rem;
        }

        .card-body h3 {
          margin: 0;

          color: #1a1a1a;

          font-family:
            "Plus Jakarta Sans",
            sans-serif;

          font-size: 1.5rem;
          font-weight: 600;
          line-height: 2rem;
        }

        .card-body p {
          margin: 0;

          color: #635f56;

          font-family:
            "Plus Jakarta Sans",
            sans-serif;

          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5rem;
        }

        .card-link {
          display: inline-flex;
          align-items: center;

          gap: 0.25rem;

          color: #8f6c1a;

          font-family: Inter, sans-serif;
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.5rem;

          text-decoration: none;
        }

        .card-link:hover,
        .hero-link:hover {
          text-decoration: underline;
        }

        /* =================================
           SECTION 3 - AI VALUE
        ================================= */

        .ai-value-section {
          display: flex;

          width: 100%;
          max-width: 90rem;

          padding: 6.25rem 3.5rem;

          flex-direction: column;
          align-items: center;

          gap: 6.25rem;
          margin: 0 auto;

          background: #ffffff;
        }

        .ai-value-heading {
          display: flex;
          width: 100%;

          flex-direction: column;
          align-items: center;

          gap: 0.75rem;
          text-align: center;
        }

        .ai-value-eyebrow {
          align-self: stretch;

          color: #969696;
          text-align: center;

          font-feature-settings:
            "liga" off,
            "clig" off;

          font-family:
            "Plus Jakarta Sans",
            sans-serif;

          font-size: 0.875rem;
          font-style: normal;
          font-weight: 600;
          line-height: 1.25rem;
        }

        .ai-value-heading h2 {
          margin: 0;

          color: #000000;
          text-align: center;

          font-feature-settings:
            "liga" off,
            "clig" off;

          font-family:
            "Plus Jakarta Sans",
            sans-serif;

          font-size: 2.5rem;
          font-style: normal;
          font-weight: 600;
          line-height: 3rem;
          letter-spacing: -0.03125rem;
        }

        .ai-value-grid {
          display: grid;

          width: 100%;
          height: 15rem;

          grid-template-columns:
            repeat(4, minmax(0, 1fr));

          grid-template-rows:
            repeat(1, minmax(0, 1fr));

          grid-auto-flow: row;

          column-gap: 2rem;
          row-gap: 2.375rem;

          align-self: stretch;
        }

        .ai-value-card {
          display: flex;

          min-width: 0;
          height: 100%;

          padding-bottom: 0.75rem;

          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;

          align-self: stretch;
          justify-self: stretch;

          background: transparent;
        }

        .ai-value-icon {
          display: block;

          width: 3.5rem;
          height: 3.5rem;

          min-width: 3.5rem;
          min-height: 3.5rem;

          object-fit: contain;
          flex-shrink: 0;
        }

        .ai-value-content {
          display: flex;
          width: 100%;

          flex-direction: column;
          align-items: flex-start;

          gap: 0.5rem;
        }

        .ai-value-content h3 {
          margin: 0;

          color: #1a1a1a;

          font-feature-settings:
            "liga" off,
            "clig" off;

          font-family: Inter, sans-serif;

          font-size: 1.25rem;
          font-style: normal;
          font-weight: 600;
          line-height: 1.75rem;
        }

        .ai-value-content p {
          margin: 0;

          color: #969696;

          font-feature-settings:
            "liga" off,
            "clig" off;

          font-family:
            "Plus Jakarta Sans",
            sans-serif;

          font-size: 1rem;
          font-style: normal;
          font-weight: 400;
          line-height: 1.5rem;
        }

        /* =================================
           SECTION 4 - AI IN ACTION
        ================================= */

        .action-section {
          display: flex;

          width: 100%;
          max-width: none;

          background: #000000;
          color: #ffffff;
        }

        .action-inner {
          display: flex;

          width: 100%;
          max-width: 90rem;

          padding: 6.25rem 3.5rem;

          flex-direction: column;
          align-items: center;

          gap: 6.25rem;
          margin: 0 auto;
        }

        /* Action Header */

        .action-header {
          display: grid;
          width: 100%;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 1fr);

          column-gap: 3rem;
          align-items: center;
        }

        .action-header-left {
          display: flex;

          min-width: 0;

          flex-direction: column;
          align-items: flex-start;

          gap: 0.5rem;
        }

        .action-eyebrow {
          color: #969696;

          font-feature-settings:
            "liga" off,
            "clig" off;

          font-family:
            "Plus Jakarta Sans",
            sans-serif;

          font-size: 0.875rem;
          font-style: normal;
          font-weight: 600;
          line-height: 1.25rem;
        }

        .action-header-left h2 {
          margin: 0;

          color: #ffffff;

          font-feature-settings:
            "liga" off,
            "clig" off;

          font-family:
            "Plus Jakarta Sans",
            sans-serif;

          font-size: 2.5rem;
          font-style: normal;
          font-weight: 600;
          line-height: 3rem;
          letter-spacing: -0.03125rem;
        }

        .action-header-right {
          display: flex;

          min-width: 0;

          justify-content: flex-end;
          align-items: center;
        }

        .action-header-right p {
          width: 100%;
          max-width: 31rem;

          margin: 0;

          color: #969696;

          font-feature-settings:
            "liga" off,
            "clig" off;

          font-family:
            "Plus Jakarta Sans",
            sans-serif;

          font-size: 1rem;
          font-style: normal;
          font-weight: 400;
          line-height: 1.5rem;
        }

        /* Action Showcase */

        .action-showcase {
          display: flex;
          width: 100%;

          flex-direction: column;
          align-items: center;

          gap: 3rem;
        }

        /* Toggle */

        .action-toggle {
          display: flex;

          padding: 0.75rem;

          align-items: flex-start;
          gap: 0.5rem;

          border-radius: 0.75rem;
          background: #1a1a1a;

          flex-shrink: 0;
        }

        .action-toggle-button {
          display: flex;

          height: 2.75rem;
          padding: 0;

          justify-content: center;
          align-items: center;
          gap: 0;

          border: 0;
          border-radius: 0.25rem;
          background: transparent;

          color: #ffffff;

          font-family: Inter, sans-serif;

          font-size: 0.875rem;
          font-style: normal;
          font-weight: 500;
          line-height: 1.25rem;
          text-align: center;

          cursor: pointer;

          transition:
            background-color 200ms ease,
            color 200ms ease;
        }

        .library-button {
          width: 8.25rem;
        }

        .ai-button {
          width: 6.25rem;
        }

        .action-toggle-button.selected {
          background: #ffffff;
          color: #8f6c1a;
        }

        .action-toggle-button:not(.selected) {
          background: transparent;
          color: #ffffff;
        }

        .action-toggle-button:not(.selected):hover {
          background: #2b2b2b;
        }

        .action-toggle-button:focus-visible {
          outline: 2px solid #c59b42;
          outline-offset: 3px;
        }

        /* Action Images */

        .action-cards-grid {
          display: grid;
          width: 100%;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          column-gap: 2rem;
          row-gap: 2rem;

          align-self: stretch;
        }

        .action-image-card {
          position: relative;

          display: flex;

          width: 100%;
          height: 28.125rem;

          padding: 2rem;

          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;

          min-width: 0;

          border-radius: 1rem;

          background-color: #171717;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;

          overflow: hidden;
          isolation: isolate;

          animation:
            imageCardAppear 350ms ease both;
        }

        .action-image-card h3 {
          position: relative;
          z-index: 2;

          margin: 0;

          color: #ffffff;

          font-feature-settings:
            "liga" off,
            "clig" off;

          font-family:
            "Plus Jakarta Sans",
            sans-serif;

          font-size: 1.5rem;
          font-style: normal;
          font-weight: 600;
          line-height: 2rem;
        }

        @keyframes imageCardAppear {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* =========================================
           SECTION 6 - PARTNER BANNER
        ========================================= */


        /* Partner Heading Content */


        /* Partner Heading */


        /* Partner Button */






        /* Bottom Right Logo */


        /* =================================
           RESPONSIVE - SMALL DESKTOP
        ================================= */

        @media (max-width: 1100px) {

          .action-inner {
            padding: 5rem 2.5rem;
            gap: 4.5rem;
          }

          .action-header {
            column-gap: 2rem;
          }

          .action-header-left h2 {
            font-size: 2.25rem;
            line-height: 2.75rem;
          }

          .action-cards-grid {
            column-gap: 1.5rem;
          }

          .action-image-card {
            height: 25rem;
            padding: 1.5rem;
          }
        }

        /* =================================
           RESPONSIVE - TABLET
        ================================= */

        @media (max-width: 900px) {

          /* Hero */

          .hero {
            min-height: auto;
            padding: 0 0 2.5rem;
          }

          .hero-video-wrap {
            height: clamp(
              25rem,
              60vw,
              40rem
            );
          }

          /* Capabilities */

          .capabilities-section {
            padding: 4.5rem 2rem;
            gap: 3rem;
          }

          .capabilities-grid {
            gap: 1rem;
          }

          .capability-card {
            min-height: 21rem;
          }

          /* AI Value */

          .ai-value-section {
            padding: 4.5rem 2rem;
            gap: 4rem;
          }

          .ai-value-grid {
            height: auto;

            grid-template-columns:
              repeat(2, minmax(0, 1fr));

            grid-template-rows: auto;

            column-gap: 2rem;
            row-gap: 2.375rem;
          }

          .ai-value-card {
            height: 15rem;
          }

          /* AI in Action */

          .action-inner {
            padding: 4.5rem 2rem;
            gap: 4rem;
          }

          .action-header {
            grid-template-columns: 1fr;
            row-gap: 1.5rem;
          }

          .action-header-right {
            justify-content: flex-start;
          }

          .action-header-right p {
            max-width: 38rem;
          }

          .action-showcase {
            gap: 2.5rem;
          }

          .action-cards-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));

            gap: 1.5rem;
          }

          .action-image-card {
            height: 25rem;
          }

          /* Partner Banner */



        }

        /* =================================
           RESPONSIVE - MOBILE
        ================================= */

        @media (max-width: 640px) {

          /* Hero */

          .hero {
            padding: 0 0 2rem;
          }

          .hero-video-wrap {
            height: min(80vh, 35rem);
            min-height: 24rem;
          }

          .hero-video {
            object-position: center bottom;
          }

          .hero-copy {
            top: 12%;
            left: 1.25rem;
            right: 1.25rem;
          }

          .hero-copy h1 {
            font-size:
              clamp(1.55rem, 6vw, 2rem);
          }

          .hero-copy p {
            margin-top: 0.75rem;
            font-size: 0.75rem;
          }

          .desktop-break {
            display: none;
          }

          .hero-link {
            margin-top: 1rem;
            font-size: 0.8125rem;
          }

          /* Capabilities */

          .capabilities-section {
            padding: 3.5rem 1.25rem;
            gap: 2rem;
          }

          .section-heading {
            gap: 0.75rem;
          }

          .section-heading h2 {
            font-size:
              clamp(1.75rem, 7vw, 2.25rem);

            line-height: 1.25;
          }

          .capabilities-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .capability-card {
            min-height: 19rem;
            gap: 1.25rem;
          }

          .card-body {
            gap: 0.75rem;
          }

          .card-body h3 {
            font-size: 1.375rem;
            line-height: 1.875rem;
          }

          .card-body p {
            font-size: 0.9375rem;
          }

          .card-link {
            font-size: 0.9375rem;
          }

          /* AI Value */

          .ai-value-section {
            padding: 3.5rem 1.25rem;
            gap: 3rem;
          }

          .ai-value-heading {
            gap: 0.75rem;
          }

          .ai-value-heading h2 {
            font-size:
              clamp(1.75rem, 7vw, 2.25rem);

            line-height: 1.25;
          }

          .ai-value-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;

            column-gap: 0;
            row-gap: 2rem;
          }

          .ai-value-card {
            height: auto;
            min-height: 12rem;

            gap: 2rem;
            padding-bottom: 0.75rem;
          }

          .ai-value-content {
            gap: 0.5rem;
          }

          /* AI in Action */

          .action-inner {
            padding: 3.5rem 1.25rem;
            gap: 3rem;
          }

          .action-header {
            grid-template-columns: 1fr;
            row-gap: 1.25rem;
          }

          .action-header-left {
            gap: 0.75rem;
          }

          .action-header-left h2 {
            font-size:
              clamp(1.75rem, 7vw, 2.25rem);

            line-height: 1.25;
          }

          .action-header-right p {
            font-size: 0.9375rem;
            line-height: 1.5rem;
          }

          .action-showcase {
            gap: 2rem;
          }

          .action-toggle {
            padding: 0.5rem;
            gap: 0.25rem;
            max-width: 100%;
          }

          .library-button {
            width: 8.25rem;
          }

          .ai-button {
            width: 6.25rem;
          }

          .action-cards-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .action-image-card {
            width: 100%;
            height: auto;

            aspect-ratio: 421 / 450;
            max-height: 32rem;

            padding: 1.5rem;
          }

          .action-image-card h3 {
            font-size: 1.5rem;
            line-height: 2rem;
          }

          /* Partner Banner */





        }

        /* =================================
           SMALL MOBILE
        ================================= */

        @media (max-width: 375px) {

          .ai-value-section,
          .action-inner {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .ai-value-heading h2,
          .action-header-left h2 {
            font-size: 1.625rem;
          }

          .action-image-card {
            padding: 1.25rem;
          }



        }

        /* =================================
           REDUCED MOTION
        ================================= */

        @media (prefers-reduced-motion: reduce) {

          .action-image-card {
            animation: none;
          }

          .action-toggle-button,

        }

      `}</style>
    </main>
  )}</LocalizedContent>;
}
