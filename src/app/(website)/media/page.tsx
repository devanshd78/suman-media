'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface FormatCard {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

interface WorkShowcaseItem {
  id: string;
  title: string;
  year: string;
  category: string;
  image: string;
}

interface JourneyCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const TOP_ROW_CARDS: FormatCard[] = [
  {
    id: 'films-documentaries',
    title: 'Films & Documentaries',
    description: 'Feature films, short films and documentary storytelling.',
    image: '/images/media/Image1.png',
    href: '/media/films-documentaries',
  },
  {
    id: 'branded-corporate',
    title: 'Branded & Corporate Films',
    description:
      'High-impact brand narratives, commercials and corporate storytelling.',
    image: '/images/media/Image2.png',
    href: '/media/branded-corporate-films',
  },
  {
    id: 'content-acquisition',
    title: 'Content Acquisition &\nDistribution',
    description:
      'Strategic licensing, syndication and global multi-platform distribution.',
    image: '/images/media/Image3.png',
    href: '/media/content-acquisition',
  },
];

const BOTTOM_ROW_CARDS: FormatCard[] = [
  {
    id: 'series-ott',
    title: 'Series & OTT Content',
    description:
      'Original web series, episodic entertainment and streaming-first formats.',
    image: '/images/media/Image4.png',
    href: '/media/series-ott-content',
  },
  {
    id: 'audio-podcasts',
    title: 'Audio & Podcasts',
    description:
      'Conversational shows, audio originals and multi-format podcast networks.',
    image: '/images/media/Image5.png',
    href: '/media/audio-podcasts',
  },
];

const WORK_SHOWCASE_ITEMS: WorkShowcaseItem[] = [
  {
    id: 'work-1',
    title: 'OFF BEAT I ghatak',
    year: '2026',
    category: 'Documentary',
    image: '/images/media/Image6.png',
  },
  {
    id: 'work-2',
    title: 'Voices of Tradition',
    year: '2026',
    category: 'Original Series',
    image: '/images/media/Image7.png',
  },
  {
    id: 'work-3',
    title: 'Beyond the Frame',
    year: '2026',
    category: 'Feature Film',
    image: '/images/media/Image8.png',
  },
  {
    id: 'work-4',
    title: 'Rhythm & Roots',
    year: '2026',
    category: 'Music & Culture',
    image: '/images/media/Image9.png',
  },
  {
    id: 'work-5',
    title: 'Stories Unplugged',
    year: '2026',
    category: 'Audio & Podcast',
    image: '/images/media/Image10.png',
  },
];

const JOURNEY_CARDS: JourneyCard[] = [
  {
    id: 'content',
    title: 'Content',
    description: 'Creating and curating stories for different formats and audiences.',
    icon: '/images/media/PresentationChart.svg',
  },
  {
    id: 'acquisition',
    title: 'Acquisition',
    description: 'Sourcing content and securing the rights to use or distribute it.',
    icon: '/images/media/Television.svg',
  },
  {
    id: 'distribution',
    title: 'Distribution',
    description:
      'Delivering content to relevant platforms, broadcasters and markets.',
    icon: '/images/media/VideoConference.svg',
  },
  {
    id: 'audience',
    title: 'Audience',
    description:
      'Connecting stories with viewers across channels and platforms.',
    icon: '/images/media/VideoConference.svg',
  },
];

function TiltedArrowIcon() {
  return (
    <svg
      className="format-card-arrow-svg"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 24L24 8"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 8H24V21"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmallArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 12L12 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 4H12V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MediaContentPage() {
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);
  const [stickyTopOffset, setStickyTopOffset] = useState(0);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const totalItems = WORK_SHOWCASE_ITEMS.length;
    let rafId: number | null = null;

    const updateStickyOffsetAndProgress = () => {
      const trackEl = trackRef.current;
      const stageEl = stageRef.current;
      if (!trackEl || !stageEl) return;

      if (window.innerWidth <= 900) {
        setStickyTopOffset(0);
        return;
      }

      const viewportHeight = window.innerHeight;
      const stageHeight = stageEl.offsetHeight;
      const computedStickyTop =
        stageHeight > viewportHeight ? viewportHeight - stageHeight : 0;

      setStickyTopOffset(computedStickyTop);

      const trackRect = trackEl.getBoundingClientRect();
      const pinnedScrollLength = trackRect.height - stageHeight;

      if (pinnedScrollLength <= 0) return;

      const scrolledWhilePinned = computedStickyTop - trackRect.top;

      if (scrolledWhilePinned <= 0) {
        setActiveWorkIndex(0);
        return;
      }

      if (scrolledWhilePinned >= pinnedScrollLength) {
        setActiveWorkIndex(totalItems - 1);
        return;
      }

      const startBuffer = pinnedScrollLength * 0.06;
      const endBuffer = pinnedScrollLength * 0.06;
      const activeRange = Math.max(
        1,
        pinnedScrollLength - startBuffer - endBuffer
      );

      const normalized = Math.min(
        1,
        Math.max(0, (scrolledWhilePinned - startBuffer) / activeRange)
      );

      const nextIndex = Math.min(
        totalItems - 1,
        Math.floor(normalized * totalItems)
      );

      setActiveWorkIndex((prev) => (prev !== nextIndex ? nextIndex : prev));
    };

    const handleScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        updateStickyOffsetAndProgress();
        rafId = null;
      });
    };

    updateStickyOffsetAndProgress();

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize);

    const resizeObserver = new ResizeObserver(handleScrollOrResize);
    if (stageRef.current) {
      resizeObserver.observe(stageRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      resizeObserver.disconnect();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const handleSelectWorkItem = (index: number) => {
    setActiveWorkIndex(index);

    const trackEl = trackRef.current;
    const stageEl = stageRef.current;
    if (!trackEl || !stageEl || window.innerWidth <= 900) return;

    const totalItems = WORK_SHOWCASE_ITEMS.length;
    const viewportHeight = window.innerHeight;
    const stageHeight = stageEl.offsetHeight;
    const computedStickyTop =
      stageHeight > viewportHeight ? viewportHeight - stageHeight : 0;

    const pinnedScrollLength = trackEl.offsetHeight - stageHeight;
    if (pinnedScrollLength <= 0) return;

    const startBuffer = pinnedScrollLength * 0.06;
    const endBuffer = pinnedScrollLength * 0.06;
    const activeRange = Math.max(
      1,
      pinnedScrollLength - startBuffer - endBuffer
    );

    const targetProgress = (index + 0.5) / totalItems;
    const targetPinnedScroll = startBuffer + targetProgress * activeRange;

    const trackTopDocument =
      window.scrollY + trackEl.getBoundingClientRect().top;
    const targetWindowScroll =
      trackTopDocument - computedStickyTop + targetPinnedScroll;

    window.scrollTo({
      top: targetWindowScroll,
      behavior: 'smooth',
    });
  };

  return (
    <main className="media-page">
      {/* HERO SECTION */}
      <section
        className="media-hero"
        aria-labelledby="media-hero-heading"
      >
        <div className="media-hero-gradient" aria-hidden="true" />

        <div className="media-hero-content">
          <div className="media-hero-copy">
            <p className="media-hero-eyebrow">
              MEDIA &amp; CONTENT SYNDICATION
            </p>

            <h1
              id="media-hero-heading"
              className="media-hero-heading"
            >
              Stories Made to
              <br />
              Reach Further.
            </h1>
          </div>

          <div className="media-hero-details">
            <p className="media-hero-description">
              Exploring AI-driven solutions for content discovery,
              recommendations, translation, publishing, archiving and
              digital knowledge.
            </p>

            <Link className="media-project-link" href="/contact">
              <span className="media-project-label">
                Discuss a Project
              </span>

              <svg
                className="media-project-chevron"
                xmlns="http://www.w3.org/2000/svg"
                width="7"
                height="12"
                viewBox="0 0 8 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 13L7 7L1 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FORMATS & PLATFORMS SECTION */}
      <section
        className="media-formats-section"
        aria-labelledby="media-formats-heading"
      >
        <div className="media-formats-container">
          <header className="media-formats-header">
            <p className="media-formats-eyebrow">
              THING WE DO ACROSS MUISC
            </p>

            <h2
              id="media-formats-heading"
              className="media-formats-heading"
            >
              Content Across Formats.
              <br />
              Opportunities Across Platforms.
            </h2>
          </header>

          <div className="media-formats-grid">
            <div className="media-formats-row-top">
              {TOP_ROW_CARDS.map((card) => (
                <Link
                  key={card.id}
                  href={card.href}
                  className="format-card format-card--top"
                  style={
                    {
                      '--card-image': `url('${card.image}')`,
                    } as React.CSSProperties
                  }
                >
                  <span className="format-card-icon-btn" aria-hidden="true">
                    <TiltedArrowIcon />
                  </span>

                  <div className="format-card-copy">
                    <h3 className="format-card-title">{card.title}</h3>
                    <div className="format-card-subtext-wrap">
                      <p className="format-card-subtext">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="media-formats-row-bottom">
              {BOTTOM_ROW_CARDS.map((card, index) => (
                <Link
                  key={card.id}
                  href={card.href}
                  className={`format-card ${
                    index === 0
                      ? 'format-card--bottom-left'
                      : 'format-card--bottom-right'
                  }`}
                  style={
                    {
                      '--card-image': `url('${card.image}')`,
                    } as React.CSSProperties
                  }
                >
                  <span className="format-card-icon-btn" aria-hidden="true">
                    <TiltedArrowIcon />
                  </span>

                  <div className="format-card-copy">
                    <h3 className="format-card-title">{card.title}</h3>
                    <div className="format-card-subtext-wrap">
                      <p className="format-card-subtext">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WORK SHOWCASE STICKY SCROLL TRACK */}
      <div ref={trackRef} className="media-work-scroll-track">
        <section
          ref={stageRef}
          className="media-work-section"
          style={{ top: `${stickyTopOffset}px` }}
          aria-label="Our work across music, films and digital content"
        >
          <div className="media-work-container">
            <p className="media-work-statement">
              <span className="media-work-statement-primary">
                our work across music, films and digital content—
              </span>
              <span className="media-work-statement-secondary">
                from original productions to content distribution and
                syndication, connecting stories with audiences across
                platforms.
              </span>
            </p>

            <div
              className="media-work-gallery"
              role="region"
              aria-label="Featured media showcase"
            >
              {WORK_SHOWCASE_ITEMS.map((item, index) => {
                const isActive = index === activeWorkIndex;

                return (
                  <div
                    key={item.id}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isActive}
                    aria-label={`${item.title} (${item.year} ${item.category})`}
                    onClick={() => handleSelectWorkItem(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectWorkItem(index);
                      }
                    }}
                    className={`media-work-item ${
                      isActive
                        ? 'media-work-item--active'
                        : 'media-work-item--collapsed'
                    }`}
                  >
                    <div
                      className="media-work-image"
                      style={{
                        backgroundImage: `url('${item.image}')`,
                      }}
                    />

                    <div
                      className={`media-work-caption ${
                        isActive ? 'media-work-caption--visible' : ''
                      }`}
                    >
                      <h3 className="media-work-caption-title">
                        {item.title}
                      </h3>
                      <p className="media-work-caption-meta">
                        <span>{item.year}</span>
                        <span>{item.category}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* HOW GLOBAL JOURNEY STARTS SECTION */}
      <section
        className="journey-section"
        aria-labelledby="journey-heading"
      >
        <div className="journey-container">
          <header className="journey-header">
            <p className="journey-eyebrow">HOW GLOBAL JOURNEY STARTS</p>
            <h2 id="journey-heading" className="journey-heading">
              From Content to Audience.
            </h2>
          </header>

          <div className="journey-cards-grid">
            {JOURNEY_CARDS.map((card) => (
              <div key={card.id} className="journey-card">
                <div
                  className="journey-card-icon"
                  style={{
                    backgroundImage: `url('${card.icon}')`,
                  }}
                  aria-hidden="true"
                />
                <div className="journey-card-copy">
                  <h3 className="journey-card-title">{card.title}</h3>
                  <p className="journey-card-desc">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER SECTION */}
      <section
        className="cta-banner-section"
        aria-labelledby="cta-banner-heading"
      >
        <div className="cta-banner-container">
          <div
            className="cta-banner-bg-graphic"
            style={{
              backgroundImage: `url('/images/media/Group 523 .svg')`,
            }}
            aria-hidden="true"
          />

          <div className="cta-banner-left">
            <h2 id="cta-banner-heading" className="cta-banner-heading">
              Have a Story to Share
              <br />
              With the World?
            </h2>
            <p className="cta-banner-subtext">
              Let&apos;s explore opportunities across content, production and distribution.
            </p>
          </div>

          <div className="cta-banner-right">
            <div className="cta-banner-actions">
              <Link href="/contact" className="cta-primary-btn">
                <span>Discuss a Project</span>
                <SmallArrowIcon />
              </Link>
              <Link href="/contact" className="cta-secondary-btn">
                <span>Contact Our Team</span>
                <SmallArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .media-page {
          width: 100%;
          color: #1a1a1a;
          background: #fff;
          font-family: var(
            --Font-family-Body,
            'Plus Jakarta Sans',
            Arial,
            sans-serif
          );
        }

        /* ================= HERO SECTION ================= */
        .media-hero {
          position: relative;
          isolation: isolate;
          box-sizing: border-box;
          display: flex;
          width: 100%;
          min-width: 0;
          min-height: 28.4375rem;
          height: 28.4375rem;
          padding: 7.5rem 3.5rem 6.25rem;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 3.5rem;
          overflow: hidden;
          background: #fff;
        }

        .media-hero-gradient {
          position: absolute;
          z-index: 0;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background:
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0) 38%,
              rgba(255, 255, 255, 0.18) 65%,
              rgba(255, 255, 255, 0.92) 100%
            ),
            url('/images/media/Gradient.png') center / cover no-repeat;
        }

        .media-hero-content {
          position: relative;
          z-index: 1;
          display: grid;
          width: 100%;
          max-width: 83rem;
          grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.92fr);
          align-items: center;
          column-gap: clamp(2rem, 5vw, 7.5rem);
          animation: media-hero-enter 750ms
            cubic-bezier(0.2, 0.7, 0.2, 1) both;
        }

        .media-hero-copy,
        .media-hero-details {
          min-width: 0;
        }

        .media-hero-eyebrow {
          margin: 0 0 0.25rem;
          color: var(--Light-Border-Text-Primary, #1a1a1a);
          font-family: var(
            --Font-family-Heading,
            'Plus Jakarta Sans',
            Arial,
            sans-serif
          );
          font-size: var(--Font-size-Tiny, 0.875rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Tiny, 1.25rem);
          font-feature-settings: 'liga' off, 'clig' off;
        }

        .media-hero-heading {
          margin: 0;
          color: var(--Light-Border-Selected, #1a1a1a);
          font-family: var(
            --Font-family-Heading,
            'Plus Jakarta Sans',
            Arial,
            sans-serif
          );
          font-size: var(--Font-size-Heading-1, 2.5rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Heading-1, 3rem);
          letter-spacing: -0.03125rem;
          font-feature-settings: 'liga' off, 'clig' off;
          text-wrap: balance;
        }

        .media-hero-details {
          display: flex;
          min-width: 0;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }

        .media-hero-description {
          max-width: 35rem;
          margin: 0;
          color: var(--Light-Border-Text-Primary, #1a1a1a);
          font-family: var(
            --Font-family-Body,
            'Plus Jakarta Sans',
            Arial,
            sans-serif
          );
          font-size: var(--Font-size-Small, 1rem);
          font-style: normal;
          font-weight: 400;
          line-height: var(--Line-height-Small, 1.5rem);
          font-feature-settings: 'liga' off, 'clig' off;
        }

        .media-hero-details :global(.media-project-link) {
          box-sizing: border-box;
          display: inline-flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-self: flex-start;
          align-items: center;
          justify-content: center;
          width: max-content;
          max-width: 100%;
          padding: 1rem;
          gap: 0.5rem;
          border: 0;
          border-radius: var(--Corner-radius-12, 0.5rem);
          background-color: #ffffff;
          color: var(--Light-Border-Icon-Selected, #1a1a1a);
          font-family: var(
            --Font-family-Body,
            'Plus Jakarta Sans',
            Inter,
            Arial,
            sans-serif
          );
          font-size: var(--Font-size-Small, 1rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Small, 1.5rem);
          text-align: center;
          text-decoration: none;
          white-space: nowrap;
          font-feature-settings: 'liga' off, 'clig' off;
          cursor: pointer;
          transition: color 180ms ease, background-color 180ms ease;
        }

        .media-hero-details :global(.media-project-link:hover) {
          color: #444444;
          background-color: #ffffff;
        }

        .media-project-label {
          display: inline-block;
          flex: 0 0 auto;
          margin: 0;
          color: inherit;
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.5rem;
          white-space: nowrap;
        }

        .media-project-chevron {
          display: inline-block;
          flex: 0 0 auto;
          width: 0.4375rem;
          height: 0.75rem;
          margin: 0;
          padding: 0;
          align-self: center;
          color: currentColor;
          overflow: visible;
          transition: transform 180ms ease;
        }

        .media-hero-details
          :global(.media-project-link:hover)
          .media-project-chevron {
          transform: translateX(3px);
        }

        .media-hero-details :global(.media-project-link:focus-visible) {
          outline: 2px solid #1a1a1a;
          outline-offset: 4px;
        }

        /* ================= FORMATS SECTION ================= */
        .media-formats-section {
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          width: 100%;
          padding: 3.5rem 3.5rem 6.25rem;
          background: #ffffff;
        }

        .media-formats-container {
          display: flex;
          width: 100%;
          max-width: 83rem;
          flex-direction: column;
          align-items: center;
          gap: 6.25rem;
        }

        .media-formats-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          text-align: center;
        }

        .media-formats-eyebrow {
          margin: 0;
          color: var(--Light-Border-Text-Secondary, #969696);
          text-align: center;
          font-feature-settings: 'liga' off, 'clig' off;
          font-family: var(
            --Font-family-Heading,
            'Plus Jakarta Sans',
            Arial,
            sans-serif
          );
          font-size: var(--Font-size-Tiny, 0.875rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Tiny, 1.25rem);
        }

        .media-formats-heading {
          margin: 0;
          color: #000000;
          text-align: center;
          font-feature-settings: 'liga' off, 'clig' off;
          font-family: var(
            --Font-family-Heading,
            'Plus Jakarta Sans',
            Arial,
            sans-serif
          );
          font-size: var(--Font-size-Heading-1, 2.5rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Heading-1, 3rem);
          letter-spacing: -0.03125rem;
        }

        .media-formats-grid {
          display: flex;
          width: 100%;
          flex-direction: column;
          gap: 2rem;
        }

        .media-formats-row-top,
        .media-formats-row-bottom {
          display: flex;
          width: 100%;
          gap: 2rem;
        }

        .media-formats-grid :global(.format-card) {
          position: relative;
          box-sizing: border-box;
          display: flex;
          height: 31.25rem;
          padding: 2rem;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          border-radius: var(--Corner-radius-16, 1rem);
          text-decoration: none;
          overflow: hidden;
          cursor: pointer;
        }

        .media-formats-grid :global(.format-card--top) {
          width: 26.33331rem;
          flex: 1 1 0;
          max-width: 26.33331rem;
          background:
            radial-gradient(
              101.5% 87.32% at 53.02% 2.59%,
              rgba(0, 0, 0, 0) 67.04%,
              rgba(0, 0, 0, 0.65) 88.52%
            ),
            var(--card-image) lightgray 50% / cover no-repeat;
        }

        .media-formats-grid :global(.format-card--bottom-left) {
          flex: 1 0 0;
          background:
            radial-gradient(
              101.5% 87.32% at 53.02% 2.59%,
              rgba(0, 0, 0, 0) 67.04%,
              rgba(0, 0, 0, 0.65) 88.52%
            ),
            var(--card-image) lightgray 50% / cover no-repeat;
        }

        .media-formats-grid :global(.format-card--bottom-right) {
          width: 46rem;
          flex: 0 0 46rem;
          background:
            radial-gradient(
              101.5% 87.32% at 53.02% 2.59%,
              rgba(0, 0, 0, 0) 67.04%,
              rgba(0, 0, 0, 0.45) 88.52%
            ),
            var(--card-image) lightgray 50% / cover no-repeat;
        }

        .format-card-icon-btn {
          box-sizing: border-box;
          display: flex;
          width: 3.75rem;
          height: 3.75rem;
          padding: 0.875rem;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          border-radius: 2.5rem;
          background: rgba(255, 255, 255, 0.5);
          transition: background-color 220ms ease, transform 220ms ease;
        }

        .format-card-icon-btn :global(.format-card-arrow-svg) {
          width: 2rem;
          height: 2rem;
          flex-shrink: 0;
        }

        .media-formats-grid
          :global(.format-card:hover)
          .format-card-icon-btn,
        .media-formats-grid
          :global(.format-card:focus-visible)
          .format-card-icon-btn {
          background: #ffffff;
        }

        .format-card-copy {
          align-self: stretch;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .format-card-title {
          margin: 0;
          color: var(--Text-Inverse-strong, #fff);
          font-feature-settings: 'liga' off, 'clig' off;
          font-family: var(
            --Font-family-Heading,
            'Plus Jakarta Sans',
            Arial,
            sans-serif
          );
          font-size: var(--Font-size-Heading-3, 1.5rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Heading-3, 2rem);
          white-space: pre-line;
        }

        .format-card-subtext-wrap {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transition:
            grid-template-rows 260ms cubic-bezier(0.2, 0.7, 0.2, 1),
            opacity 220ms ease,
            margin-top 260ms cubic-bezier(0.2, 0.7, 0.2, 1);
          margin-top: 0;
        }

        .format-card-subtext {
          overflow: hidden;
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
          font-family: var(
            --Font-family-Body,
            'Plus Jakarta Sans',
            Arial,
            sans-serif
          );
          font-size: var(--Font-size-Small, 1rem);
          font-style: normal;
          font-weight: 400;
          line-height: var(--Line-height-Small, 1.5rem);
          font-feature-settings: 'liga' off, 'clig' off;
        }

        .media-formats-grid
          :global(.format-card:hover)
          .format-card-subtext-wrap,
        .media-formats-grid
          :global(.format-card:focus-visible)
          .format-card-subtext-wrap {
          grid-template-rows: 1fr;
          opacity: 1;
          margin-top: 0.5rem;
        }

        .media-formats-grid :global(.format-card:focus-visible) {
          outline: 2px solid #1a1a1a;
          outline-offset: 4px;
        }

        /* ================= WORK SHOWCASE STICKY SECTION ================= */
        .media-work-scroll-track {
          position: relative;
          width: 100%;
          min-height: 420vh;
          background: #000000;
        }

        .media-work-section {
          position: sticky;
          top: 0;
          box-sizing: border-box;
          display: flex;
          width: 100%;
          padding: 6.25rem 3.5rem;
          flex-direction: column;
          align-items: center;
          gap: 6.25rem;
          align-self: stretch;
          background: #000000;
        }

        .media-work-container {
          display: flex;
          width: 100%;
          max-width: 83rem;
          flex-direction: column;
          align-items: center;
          gap: 6.25rem;
          align-self: stretch;
          margin: 0 auto;
        }

        .media-work-statement {
          margin: 0;
          align-self: stretch;
          font-family: var(
            --Font-family-Heading,
            'Plus Jakarta Sans',
            Arial,
            sans-serif
          );
          font-size: var(--Font-size-Heading-1, 2.5rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Heading-1, 3rem);
          letter-spacing: -0.03125rem;
          font-feature-settings: 'liga' off, 'clig' off;
        }

        .media-work-statement-primary {
          color: var(--Light-Border-Text-PrimaryInverse, #f9f9f9);
        }

        .media-work-statement-secondary {
          color: var(--Light-Border-Text-Secondary, #969696);
        }

        .media-work-gallery {
          display: flex;
          width: 100%;
          align-items: flex-start;
          gap: 1.5rem;
          align-self: stretch;
        }

        .media-work-item {
          display: flex;
          flex-direction: column;
          min-width: 0;
          cursor: pointer;
          outline: none;
          transition:
            flex 650ms cubic-bezier(0.22, 1, 0.36, 1),
            width 650ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .media-work-item--active {
          flex: 1 1 0%;
        }

        .media-work-item--collapsed {
          flex: 0 0 2.25rem;
          width: 2.25rem;
        }

        .media-work-image {
          width: 100%;
          height: 35.75rem;
          align-self: stretch;
          border-radius: 0.5rem;
          background-color: lightgray;
          background-position: 50% 50%;
          background-size: cover;
          background-repeat: no-repeat;
          overflow: hidden;
        }

        .media-work-caption {
          display: flex;
          width: 100%;
          min-height: 2rem;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 1.25rem;
          opacity: 0;
          visibility: hidden;
          overflow: hidden;
          pointer-events: none;
          white-space: nowrap;
          transition:
            opacity 320ms ease,
            visibility 320ms ease;
        }

        .media-work-caption--visible {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        .media-work-caption-title {
          margin: 0;
          color: var(--Light-Border-Text-PrimaryInverse, #f9f9f9);
          font-family: var(
            --Font-family-Heading,
            'Plus Jakarta Sans',
            Arial,
            sans-serif
          );
          font-size: var(--Font-size-Heading-3, 1.5rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Heading-3, 2rem);
          font-feature-settings: 'liga' off, 'clig' off;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .media-work-caption-meta {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          margin: 0;
          color: var(--Light-Border-Text-Secondary, #969696);
          font-family: var(
            --Font-family-Body,
            'Plus Jakarta Sans',
            Arial,
            sans-serif
          );
          font-size: var(--Font-size-Small, 1rem);
          font-style: normal;
          font-weight: 400;
          line-height: var(--Line-height-Small, 1.5rem);
          font-feature-settings: 'liga' off, 'clig' off;
        }

        .media-work-item:focus-visible .media-work-image {
          outline: 2px solid #f9f9f9;
          outline-offset: 4px;
        }

        /* ================= HOW GLOBAL JOURNEY STARTS SECTION ================= */
        .journey-section {
          box-sizing: border-box;
          display: flex;
          width: 90rem;
          max-width: 100%;
          margin: 0 auto;
          padding: 6.25rem var(--Spacing-56, 3.5rem);
          flex-direction: column;
          align-items: center;
          gap: 6.25rem;
          background: #ffffff;
        }

        .journey-container {
          display: flex;
          width: 100%;
          max-width: 83rem;
          flex-direction: column;
          align-items: center;
          gap: 6.25rem;
        }

        .journey-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          text-align: center;
        }

        .journey-eyebrow {
          margin: 0;
          color: var(--Light-Border-Text-Secondary, #969696);
          text-align: center;
          font-feature-settings: 'liga' off, 'clig' off;
          font-family: var(
            --Font-family-Heading,
            'Plus Jakarta Sans',
            Arial,
            sans-serif
          );
          font-size: var(--Font-size-Tiny, 0.875rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Tiny, 1.25rem);
        }

        .journey-heading {
          margin: 0;
          color: #000000;
          text-align: center;
          font-feature-settings: 'liga' off, 'clig' off;
          font-family: var(
            --Font-family-Heading,
            'Plus Jakarta Sans',
            Arial,
            sans-serif
          );
          font-size: var(--Font-size-Heading-1, 2.5rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Heading-1, 3rem);
          letter-spacing: -0.03125rem;
        }

        .journey-cards-grid {
          display: grid;
          width: 100%;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 2rem;
          align-items: stretch;
        }

        .journey-card {
          box-sizing: border-box;
          display: flex;
          padding-bottom: var(--Spacing-12, 0.75rem);
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          align-self: stretch;
          grid-row: span 1;
          grid-column: span 1;
          justify-self: stretch;
          min-width: 0;
        }

        .journey-card-icon {
          width: 3.5rem;
          height: 3.5rem;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          margin-bottom: 2rem;
        }

        .journey-card-copy {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: flex-start;
          text-align: left;
        }

        .journey-card-title {
          margin: 0;
          color: #000000;
          font-family: var(
            --Font-family-Heading,
            'Plus Jakarta Sans',
            Arial,
            sans-serif
          );
          font-size: var(--Font-size-Heading-3, 1.5rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Heading-3, 2rem);
          font-feature-settings: 'liga' off, 'clig' off;
        }

        .journey-card-desc {
          margin: 0;
          color: var(--Light-Border-Text-Secondary, #969696);
          font-family: var(
            --Font-family-Body,
            'Plus Jakarta Sans',
            Arial,
            sans-serif
          );
          font-size: var(--Font-size-Small, 1rem);
          font-style: normal;
          font-weight: 400;
          line-height: var(--Line-height-Small, 1.5rem);
          font-feature-settings: 'liga' off, 'clig' off;
        }

        /* ================= CTA BANNER SECTION ================= */
        .cta-banner-section {
          box-sizing: border-box;
          display: flex;
          width: 90rem;
          max-width: 100%;
          margin: 0 auto;
          padding: 3.5rem var(--Spacing-56, 3.5rem);
          align-items: center;
          justify-content: center;
          background: #fbfaf6;
        }

        .cta-banner-container {
          position: relative;
          isolation: isolate;
          display: flex;
          width: 100%;
          max-width: 83rem;
          align-items: center;
          justify-content: space-between;
          gap: 6.25rem;
          overflow: hidden;
        }

        .cta-banner-bg-graphic {
          position: absolute;
          width: 14.073rem;
          height: 14.06256rem;
          left: 80.5625rem;
          top: -4.8125rem;
          opacity: 0.4;
          mix-blend-mode: luminosity;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          pointer-events: none;
          z-index: 0;
        }

        .cta-banner-left {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-width: 48rem;
        }

        .cta-banner-heading {
          margin: 0;
          color: #000000;
          font-feature-settings: 'liga' off, 'clig' off;
          font-family: var(
            --Font-family-Heading,
            'Plus Jakarta Sans',
            Arial,
            sans-serif
          );
          font-size: var(--Font-size-Heading-1, 2.5rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Heading-1, 3rem);
          letter-spacing: -0.03125rem;
        }

        .cta-banner-subtext {
          margin: 0;
          color: var(--Light-Border-Text-Secondary, #969696);
          font-feature-settings: 'liga' off, 'clig' off;
          font-family: var(
            --Font-family-Body,
            'Plus Jakarta Sans',
            Arial,
            sans-serif
          );
          font-size: var(--Font-size-Small, 1rem);
          font-style: normal;
          font-weight: 400;
          line-height: var(--Line-height-Small, 1.5rem);
        }

        .cta-banner-right {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .cta-banner-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .cta-primary-btn {
          box-sizing: border-box;
          display: flex;
          height: 3rem;
          padding: 0 var(--Spacing-0, 0);
          justify-content: center;
          align-items: center;
          gap: var(--Spacing-0, 0);
          border-radius: var(--Corner-radius-4, 0.25rem);
          background: linear-gradient(
              0deg,
              var(--BrandPrimary-800, #8f6c1a) 0%,
              var(--BrandPrimary-800, #8f6c1a) 100%
            ),
            var(--Fill-Warning-strong-2, #8f6c1a);
          color: var(--Text-Inverse-strong, #fff);
          text-align: center;
          font-feature-settings: 'liga' off, 'clig' off;
          font-family: var(--Font-family-Body, Inter, Arial, sans-serif);
          font-size: var(--Font-size-Small, 1rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Small, 1.5rem);
          text-decoration: none;
          white-space: nowrap;
          cursor: pointer;
          transition: opacity 180ms ease;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }

        .cta-primary-btn:hover {
          opacity: 0.9;
        }

        .cta-secondary-btn {
          box-sizing: border-box;
          display: flex;
          height: 3rem;
          padding: 0 var(--Spacing-16, 1rem);
          justify-content: center;
          align-items: center;
          gap: var(--Spacing-4, 0.25rem);
          align-self: stretch;
          border-radius: var(--Corner-radius-8, 0.5rem);
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: var(--Text-Strong, rgba(0, 6, 38, 0.90));
          text-align: center;
          font-feature-settings: 'liga' off, 'clig' off;
          font-family: var(--Font-family-Body, Inter, Arial, sans-serif);
          font-size: var(--Font-size-Small, 1rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Small, 1.5rem);
          text-decoration: none;
          white-space: nowrap;
          cursor: pointer;
          transition: background-color 180ms ease;
        }

        .cta-secondary-btn:hover {
          background-color: #f4f3ef;
        }

        @keyframes media-hero-enter {
          from {
            opacity: 0;
            transform: translateY(1rem);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ================= RESPONSIVE BREAKPOINTS ================= */
        @media (max-width: 1200px) {
          .media-formats-row-top {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .media-formats-grid :global(.format-card--top) {
            width: 100%;
            max-width: none;
          }

          .media-formats-grid :global(.format-card--bottom-right) {
            width: 55%;
            flex: 0 0 55%;
          }

          .journey-cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .media-hero {
            height: auto;
            min-height: 28.4375rem;
            padding: 6rem 2rem 5rem;
          }

          .media-hero-content {
            grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
            column-gap: 2rem;
          }

          .media-hero-heading,
          .media-formats-heading,
          .media-work-statement,
          .journey-heading,
          .cta-banner-heading {
            font-size: clamp(2rem, 4vw, 2.5rem);
            line-height: 1.2;
          }

          .media-hero-gradient {
            opacity: 0.95;
            background-position: center;
          }

          .media-formats-section {
            padding: 3rem 2rem 5rem;
          }

          .media-formats-container,
          .media-work-container,
          .journey-container {
            gap: 4rem;
          }

          .media-formats-row-bottom {
            flex-direction: column;
          }

          .media-formats-grid :global(.format-card--bottom-left),
          .media-formats-grid :global(.format-card--bottom-right) {
            width: 100%;
            flex: 1 1 auto;
          }

          .media-work-scroll-track {
            min-height: auto;
          }

          .media-work-section {
            position: relative;
            top: 0 !important;
            padding: 4.5rem 2rem;
            gap: 4rem;
          }

          .media-work-gallery {
            flex-direction: column;
            gap: 1rem;
          }

          .media-work-item--active,
          .media-work-item--collapsed {
            width: 100%;
            flex: 0 0 auto;
          }

          .media-work-item--active .media-work-image {
            height: 24rem;
          }

          .media-work-item--collapsed .media-work-image {
            height: 4rem;
          }

          .media-work-item--collapsed .media-work-caption {
            display: none;
          }

          .cta-banner-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 2.5rem;
          }

          .cta-banner-bg-graphic {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .media-hero {
            min-height: auto;
            height: auto;
            padding: 5rem 1.25rem 4rem;
          }

          .media-hero-content {
            grid-template-columns: minmax(0, 1fr);
            row-gap: 1.5rem;
          }

          .media-hero-heading,
          .media-formats-heading,
          .media-work-statement,
          .journey-heading,
          .cta-banner-heading {
            font-size: 2rem;
            line-height: 2.5rem;
            letter-spacing: -0.025rem;
          }

          .media-hero-description {
            font-size: 0.9375rem;
            line-height: 1.5rem;
          }

          .media-hero-gradient {
            inset: 0;
            width: 100%;
            height: 100%;
            opacity: 0.85;
            background-position: center;
          }

          .media-hero-details :global(.media-project-link) {
            padding: 1rem;
            gap: 0.5rem;
          }

          .media-formats-section {
            padding: 2.5rem 1.25rem 4rem;
          }

          .media-formats-container,
          .media-work-container,
          .journey-container {
            gap: 2.5rem;
          }

          .media-formats-row-top {
            grid-template-columns: minmax(0, 1fr);
          }

          .media-formats-grid :global(.format-card) {
            height: 24rem;
            padding: 1.5rem;
          }

          .media-work-section {
            padding: 3.5rem 1.25rem;
            gap: 2.5rem;
          }

          .media-work-item--active .media-work-image {
            height: 18rem;
          }

          .media-work-caption-title {
            font-size: 1.25rem;
            line-height: 1.75rem;
          }

          .journey-section,
          .cta-banner-section {
            padding: 4rem 1.25rem;
          }

          .journey-cards-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .cta-banner-actions {
            flex-direction: column;
            width: 100%;
          }

          .cta-primary-btn,
          .cta-secondary-btn {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .media-hero-content {
            animation: none;
          }

          .media-hero-details :global(.media-project-link),
          .media-project-chevron,
          .format-card-icon-btn,
          .format-card-subtext-wrap,
          .media-work-item,
          .media-work-caption {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}