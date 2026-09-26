"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./content.module.css";

const CAPABILITIES = [
  {
    title: "Content Strategy",
    image: "/images/monetization/Image5.jpg",
    alt: "Content Strategy",
    objectPosition: "center center",
  },
  {
    title: "Platform Experience",
    image: "/images/monetization/Image6.jpg",
    alt: "Platform Experience",
    objectPosition: "center center",
  },
  {
    title: "Digital Distribution",
    image: "/images/monetization/Image7.png",
    alt: "Digital Distribution",
    objectPosition: "center center",
  },
  {
    title: "Audience Growth",
    image: "/images/monetization/Image8.jpg",
    alt: "Audience Growth",
    objectPosition: "center center",
  },
];

const EXPANDED_WEIGHT = 16.08;
const COLLAPSED_WEIGHT = 1;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function Content() {
  const trackRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [entered, setEntered] = useState(false);

  /* ======================================================
     SCROLL-DRIVEN GALLERY
     ====================================================== */

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    let animationFrame = 0;

    const updateProgress = () => {
      animationFrame = 0;

      const rect = track.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const scrollableDistance =
        track.offsetHeight - viewportHeight;

      if (scrollableDistance <= 0) {
        setProgress(0);
        return;
      }

      const travelled = clamp(
        -rect.top,
        0,
        scrollableDistance,
      );

      const nextProgress =
        travelled / scrollableDistance;

      setProgress(nextProgress);
    };

    const handleScroll = () => {
      if (animationFrame) return;

      animationFrame =
        window.requestAnimationFrame(updateProgress);
    };

    updateProgress();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "resize",
        handleScroll,
      );

      if (animationFrame) {
        window.cancelAnimationFrame(
          animationFrame,
        );
      }
    };
  }, []);

  /* ======================================================
     INTRO REVEAL
     ====================================================== */

  useEffect(() => {
    const target = introRef.current;

    if (!target) return;

    if (!("IntersectionObserver" in window)) {
      setEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setEntered(true);
        observer.disconnect();
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  /* ======================================================
     DETERMINE CURRENT SCROLL STATE
     ====================================================== */

  const deckPosition = useMemo(() => {
    return progress * (CAPABILITIES.length - 1);
  }, [progress]);

  const baseIndex = Math.floor(deckPosition);

  const localProgress =
    baseIndex >= CAPABILITIES.length - 1
      ? 0
      : deckPosition - baseIndex;

  const getCardStrength = (index: number) => {
    const lastIndex =
      CAPABILITIES.length - 1;

    if (baseIndex >= lastIndex) {
      return index === lastIndex ? 1 : 0;
    }

    if (index === baseIndex) {
      return 1 - localProgress;
    }

    if (index === baseIndex + 1) {
      return localProgress;
    }

    return 0;
  };

  const getCardGrow = (index: number) => {
    const strength = getCardStrength(index);

    return (
      COLLAPSED_WEIGHT +
      strength *
        (EXPANDED_WEIGHT -
          COLLAPSED_WEIGHT)
    );
  };

  return (
    <section
      ref={trackRef}
      className={styles.scrollTrack}
      aria-labelledby="capabilities-heading"
    >
      <div className={styles.stickyStage}>
        <div className={styles.contentPage}>

          {/* =========================================
              HEADER
          ========================================= */}

          <div
            ref={introRef}
            className={styles.intro}
            data-entered={
              entered ? "true" : "false"
            }
          >
            <p className={styles.eyebrow}>
              OUR CAPABILITIES
            </p>

            <h1
              id="capabilities-heading"
              className={styles.heading}
            >
              <span
                className={
                  styles.headingPrimary
                }
              >
                Built Around Content. Designed
                Around Business.
              </span>{" "}

              <span
                className={
                  styles.headingSecondary
                }
              >
                From content libraries and
                digital platforms to distribution
                and audience growth, Suman brings
                the pieces together to create
                sustainable entertainment
                businesses.
              </span>
            </h1>
          </div>

          {/* =========================================
              DESKTOP SCROLL GALLERY
          ========================================= */}

          <div
            className={styles.gallery}
            data-entered={
              entered ? "true" : "false"
            }
          >
            {CAPABILITIES.map(
              (item, index) => {
                const strength =
                  getCardStrength(index);

                const grow =
                  getCardGrow(index);

                return (
                  <article
                    key={item.title}
                    className={
                      styles.capabilityCard
                    }
                    style={{
                      flexGrow: grow,
                    }}
                  >
                    <div
                      className={
                        styles.imageFrame
                      }
                    >
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, 85vw"
                        className={
                          styles.image
                        }
                        style={{
                          objectPosition:
                            item.objectPosition,
                        }}
                      />

                      <span
                        className={
                          styles.imageShade
                        }
                        style={{
                          opacity:
                            0.08 *
                            (1 - strength),
                        }}
                        aria-hidden="true"
                      />
                    </div>

                    <h2
                      className={
                        styles.cardTitle
                      }
                      style={{
                        opacity: clamp(
                          (strength - 0.25) /
                            0.75,
                          0,
                          1,
                        ),
                      }}
                    >
                      {item.title}
                    </h2>
                  </article>
                );
              },
            )}
          </div>

          {/* =========================================
              MOBILE
          ========================================= */}

          <div
            className={
              styles.mobileGallery
            }
          >
            {CAPABILITIES.map((item) => (
              <article
                key={item.title}
                className={
                  styles.mobileCard
                }
              >
                <div
                  className={
                    styles.mobileImage
                  }
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="100vw"
                    className={
                      styles.image
                    }
                    style={{
                      objectPosition:
                        item.objectPosition,
                    }}
                  />
                </div>

                <h2
                  className={
                    styles.mobileTitle
                  }
                >
                  {item.title}
                </h2>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
