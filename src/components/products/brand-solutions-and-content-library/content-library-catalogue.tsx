"use client";

import { LocalizedContent } from "@/components/localization/localized-content";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "@/components/navigation/website-link";
import styles from "./brand-solutions-and-content-library-page.module.css";

const gallerySlides = [
  {
    asset: "library-hero",
    alt: "A master drummer performing live on stage",
    title: "Live Music & Stage Masters",
    tag: "Concert Archives",
  },
  {
    asset: "library-live",
    alt: "A live music audience captivated by an orchestral and vocal production",
    title: "Audience & Festival Experiences",
    tag: "Festival Productions",
  },
  {
    asset: "library-vocals",
    alt: "A classical and playback vocalist performing in a recording session",
    title: "Vocal Masters & Classical Recordings",
    tag: "Studio Masters",
  },
  {
    asset: "library-culture",
    alt: "Traditional dance and cultural performance showcasing heritage arts",
    title: "Regional Heritage & Cultural Arts",
    tag: "Cultural Archives",
  },
] as const;

const categories = [
  {
    title: "Film Library",
    description: "Feature films and cinematic content collections.",
    asset: "film-library",
    tag: "Cinematic Catalogue",
  },
  {
    title: "Devotional Catalogue",
    description: "Devotional songs, spiritual chants and sacred audio content.",
    asset: "devotional",
    tag: "Spiritual & Sacred",
  },
  {
    title: "Song Catalogue",
    description: "Songs, studio recordings and original music assets across genres.",
    asset: "songs",
    tag: "Original Compositions",
  },
  {
    title: "Cultural Archives",
    description: "Regional stories, performances and living cultural heritage material.",
    asset: "culture",
    tag: "Heritage & Folk",
  },
  {
    title: "Audio Masters",
    description: "High-fidelity recorded audio stems and master multi-track files.",
    asset: "audio",
    tag: "Stems & Masters",
  },
  {
    title: "Rights & Licensing",
    description: "Publishing, synchronization, public performance and digital rights opportunities.",
    asset: "rights",
    tag: "Licensing & Syndication",
  },
] as const;

function scrollToItem(track: HTMLUListElement | null, index: number) {
  const item = track?.children[index] as HTMLElement | undefined;
  if (!track || !item) return;
  track.scrollTo({
    left: item.offsetLeft - (track.children[0] as HTMLElement).offsetLeft,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
}

export function LibraryGallery() {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback((index: number) => {
    const total = gallerySlides.length;
    const target = ((index % total) + total) % total;
    setActive(target);
    scrollToItem(track.current, target);
  }, []);

  const handlePrev = useCallback(() => {
    goToSlide(active - 1);
  }, [active, goToSlide]);

  const handleNext = useCallback(() => {
    goToSlide(active + 1);
  }, [active, goToSlide]);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      goToSlide(active + 1);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [active, goToSlide, isPaused]);

  return (
    <LocalizedContent>
      <div
        className={styles.gallery}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div className={styles.galleryWrapper}>
          <button
            type="button"
            className={`${styles.galleryNavButton} ${styles.galleryNavPrev}`}
            onClick={handlePrev}
            aria-label="Previous highlight slide"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <ul
            ref={track}
            className={styles.galleryTrack}
            id="library-gallery"
            aria-label="Content and music highlights"
            onScroll={() => {
              const el = track.current;
              if (el && el.clientWidth > 0) {
                const nextIndex = Math.round(el.scrollLeft / el.clientWidth);
                if (nextIndex !== active && nextIndex >= 0 && nextIndex < gallerySlides.length) {
                  setActive(nextIndex);
                }
              }
            }}
          >
            {gallerySlides.map((slide, i) => (
              <li key={slide.asset} className={styles.gallerySlide}>
                <Image
                  src={`/images/brand-solutions-and-content-library/${slide.asset}.jpg`}
                  alt={slide.alt}
                  width={1328}
                  height={588}
                  priority={i === 0}
                  sizes="92vw"
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryTag}>{slide.tag}</span>
                  <span className={styles.galleryTitle}>{slide.title}</span>
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={`${styles.galleryNavButton} ${styles.galleryNavNext}`}
            onClick={handleNext}
            aria-label="Next highlight slide"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className={styles.dots} aria-label="Choose a highlight">
          {gallerySlides.map((slide, i) => (
            <button
              key={slide.asset}
              type="button"
              aria-label={`Show ${slide.title} (${i + 1} of ${gallerySlides.length})`}
              aria-controls="library-gallery"
              aria-pressed={active === i}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      </div>
    </LocalizedContent>
  );
}

export function Catalogue() {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToCatalogue = useCallback((index: number) => {
    const total = categories.length;
    const target = ((index % total) + total) % total;
    setActive(target);
    scrollToItem(track.current, target);
  }, []);

  const move = useCallback(
    (direction: number) => {
      goToCatalogue(active + direction);
    },
    [active, goToCatalogue],
  );

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      goToCatalogue(active + 1);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [active, goToCatalogue, isPaused]);

  return (
    <LocalizedContent>
      <div
        className={styles.catalogueWrapper}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <ul
          ref={track}
          id="catalogue-track"
          className={styles.catalogue}
          aria-label="Content and music catalogues"
          tabIndex={0}
          onScroll={() => {
            const el = track.current;
            if (el && el.children.length > 1) {
              const step =
                (el.children[1] as HTMLElement).offsetLeft -
                (el.children[0] as HTMLElement).offsetLeft;
              if (step > 0) {
                const nextIndex = Math.max(
                  0,
                  Math.min(
                    categories.length - 1,
                    Math.round(el.scrollLeft / step),
                  ),
                );
                if (nextIndex !== active) {
                  setActive(nextIndex);
                }
              }
            }
          }}
        >
          {categories.map((cat, i) => (
            <li key={cat.title} data-active={active === i}>
              <Link
                href="/contact/form"
                className={styles.catalogueCard}
                aria-label={`Learn more about ${cat.title}`}
              >
                <div className={styles.catalogueImageWrap}>
                  <Image
                    src={`/images/brand-solutions-and-content-library/${cat.asset}.jpg`}
                    alt={cat.title}
                    width={1190}
                    height={600}
                    sizes="(max-width: 639px) 88vw, 83vw"
                  />
                  <span className={styles.catalogueTag}>{cat.tag}</span>
                </div>
                <div className={styles.catalogueBody}>
                  <div>
                    <h3>{cat.title}</h3>
                    <p>{cat.description}</p>
                  </div>
                  <span className={styles.learnMore}>
                    Learn more{" "}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      aria-hidden="true"
                    >
                      <path d="m9 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.catalogueToolbar}>
          <div className={styles.catalogueStatus}>
            <span className={styles.catalogueCounter}>
              <strong>{String(active + 1).padStart(2, "0")}</strong> /{" "}
              {String(categories.length).padStart(2, "0")}
            </span>
            <div
              className={styles.catalogueDots}
              aria-label="Catalogue slide indicators"
            >
              {categories.map((cat, i) => (
                <button
                  key={cat.title}
                  type="button"
                  aria-label={`Go to ${cat.title} (${i + 1} of ${categories.length})`}
                  aria-pressed={active === i}
                  className={`${styles.catalogueDot} ${active === i ? styles.catalogueDotActive : ""}`}
                  onClick={() => goToCatalogue(i)}
                />
              ))}
            </div>
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous catalogue"
              aria-controls="catalogue-track"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next catalogue"
              aria-controls="catalogue-track"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </LocalizedContent>
  );
}
