"use client";

import { useEffect } from "react";

const SECTION_SELECTOR = ".landing-section-transition";
const LAYER_SELECTOR = "[data-landing-parallax-layer]";
const PARALLAX_VARIANTS = [
  "depth",
  "split",
  "slide-left",
  "zoom",
  "slide-right",
  "tilt",
  "cinematic",
  "rise",
  "carousel",
] as const;

type ParallaxVariant = (typeof PARALLAX_VARIANTS)[number];

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function findForegroundLayer(section: HTMLElement) {
  const existing = section.querySelector<HTMLElement>(
    '[data-landing-parallax-layer="foreground"]',
  );
  if (existing) return existing;

  const heading = section.querySelector<HTMLElement>("h1, h2");
  if (heading?.parentElement && heading.parentElement !== section) {
    return heading.parentElement;
  }

  return Array.from(section.children).find(
    (child): child is HTMLElement =>
      child instanceof HTMLElement &&
      child.tagName !== "STYLE" &&
      !child.matches(LAYER_SELECTOR),
  );
}

function findSecondaryLayer(
  section: HTMLElement,
  foreground: HTMLElement | undefined,
) {
  const existing = section.querySelector<HTMLElement>(
    '[data-landing-parallax-layer="secondary"]',
  );
  if (existing) return existing;

  return Array.from(section.children)
    .filter(
      (child): child is HTMLElement =>
        child instanceof HTMLElement &&
        child.tagName !== "STYLE" &&
        child.tagName !== "SCRIPT" &&
        !child.matches(LAYER_SELECTOR) &&
        child !== foreground &&
        !child.contains(foreground ?? null) &&
        !foreground?.contains(child),
    )
    .filter((child) => {
      const style = window.getComputedStyle(child);
      return (
        style.display !== "none" &&
        style.position !== "absolute" &&
        style.position !== "fixed"
      );
    })
    .sort(
      (first, second) =>
        second.offsetWidth * second.offsetHeight -
        first.offsetWidth * first.offsetHeight,
    )[0];
}

function getParallaxVariant(
  section: HTMLElement,
  index: number,
): ParallaxVariant {
  const identity = `${section.id} ${section.getAttribute("aria-labelledby") ?? ""} ${section.getAttribute("aria-label") ?? ""}`.toLowerCase();

  if (identity.includes("hero")) return "depth";
  if (identity.includes("about")) return "split";
  if (identity.includes("client") || identity.includes("ecosystem")) {
    return "carousel";
  }
  if (identity.includes("service")) return "zoom";
  if (identity.includes("achievement")) return "tilt";
  if (identity.includes("industr")) return "slide-right";
  if (identity.includes("statistic")) return "rise";
  if (identity.includes("partner")) return "split";
  if (identity.includes("cannes") || identity.includes("film")) {
    return "cinematic";
  }
  if (identity.includes("testimonial")) return "rise";
  if (identity.includes("story") || identity.includes("abhijat")) {
    return "cinematic";
  }
  if (identity.includes("media")) return "slide-left";
  if (identity.includes("founder")) return "depth";
  if (identity.includes("insight")) return "slide-right";
  if (identity.includes("faq")) return "split";
  if (identity.includes("career")) return "zoom";

  return PARALLAX_VARIANTS[index % PARALLAX_VARIANTS.length] ?? "depth";
}

/**
 * Adds independent depth motion to opt-in media/accent layers and to one
 * foreground content group per landing section. Section roots remain fixed,
 * so sticky layouts, physics coordinates, and horizontal scrollers keep their
 * original containing blocks.
 */
export function LandingSectionObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(SECTION_SELECTOR),
    );
    if (sections.length === 0) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotion.matches) {
      sections.forEach((section) => {
        section.dataset.sectionVisible = "true";
      });
      return;
    }

    const automaticForegrounds: HTMLElement[] = [];
    const automaticSecondaryLayers: HTMLElement[] = [];
    const automaticVariants: HTMLElement[] = [];

    sections.forEach((section, index) => {
      if (!section.dataset.parallaxVariant) {
        section.dataset.parallaxVariant = getParallaxVariant(section, index);
        automaticVariants.push(section);
      }

      const existingForeground = section.querySelector<HTMLElement>(
        '[data-landing-parallax-layer="foreground"]',
      );
      const foreground = findForegroundLayer(section);
      if (foreground && !existingForeground) {
        foreground.dataset.landingParallaxLayer = "foreground";
        automaticForegrounds.push(foreground);
      }

      const existingSecondary = section.querySelector<HTMLElement>(
        '[data-landing-parallax-layer="secondary"]',
      );
      const secondary = findSecondaryLayer(section, foreground);
      if (secondary && !existingSecondary) {
        secondary.dataset.landingParallaxLayer = "secondary";
        automaticSecondaryLayers.push(secondary);
      }
    });

    let parallaxFrame = 0;

    const updateParallax = () => {
      parallaxFrame = 0;

      const viewportHeight = Math.max(window.innerHeight, 1);
      const isMobile = window.innerWidth < 640;
      const foregroundTravel = isMobile
        ? 24
        : clamp(viewportHeight * 0.065, 42, 64);
      const reverseTravel = isMobile
        ? 14
        : clamp(viewportHeight * 0.032, 20, 34);
      const horizontalTravel = isMobile
        ? 24
        : clamp(viewportHeight * 0.072, 46, 76);

      const updates = sections.map((section) => {
        const rect = section.getBoundingClientRect();
        const centerDelta =
          rect.top + rect.height / 2 - viewportHeight / 2;
        const scrollRange = viewportHeight / 2 + rect.height / 2;
        const progress = clamp(centerDelta / scrollRange, -1, 1);
        const mediaTravel = Math.min(
          isMobile ? 42 : 104,
          viewportHeight * (isMobile ? 0.055 : 0.12),
          rect.height * 0.08,
        );
        const isNearViewport =
          rect.top < viewportHeight * 1.35 &&
          rect.bottom > -viewportHeight * 0.35;
        const isInViewport = rect.top < viewportHeight && rect.bottom > 0;
        const edgeProgress = Math.abs(progress);

        let mediaOffsetX = 0;
        let foregroundOffsetX = 0;
        let foregroundOffsetY = progress * foregroundTravel;
        let foregroundScale = 1;
        let foregroundRotate = 0;
        let reverseOffsetX = 0;
        let reverseOffsetY = -progress * reverseTravel;
        let reverseScale = 1;
        let reverseRotate = 0;
        let secondaryOffsetX = 0;
        let secondaryOffsetY = -progress * reverseTravel;
        let secondaryScale = 1;
        let secondaryRotate = 0;
        let mediaScale = 1.1 + edgeProgress * 0.08;

        switch (section.dataset.parallaxVariant as ParallaxVariant) {
          case "split":
            foregroundOffsetX = progress * horizontalTravel;
            foregroundOffsetY *= 0.5;
            reverseOffsetX = -progress * horizontalTravel * 0.82;
            secondaryOffsetX = -progress * horizontalTravel * 0.56;
            secondaryOffsetY *= 0.4;
            break;
          case "slide-left":
            foregroundOffsetX = -progress * horizontalTravel;
            foregroundOffsetY *= 0.24;
            reverseOffsetX = progress * horizontalTravel * 0.62;
            secondaryOffsetX = progress * horizontalTravel * 1.12;
            secondaryOffsetY *= 0.3;
            break;
          case "slide-right":
            foregroundOffsetX = progress * horizontalTravel;
            foregroundOffsetY *= 0.24;
            reverseOffsetX = -progress * horizontalTravel * 0.62;
            secondaryOffsetX = -progress * horizontalTravel * 1.12;
            secondaryOffsetY *= 0.3;
            break;
          case "zoom":
            foregroundOffsetY *= 0.34;
            foregroundScale = 1 - edgeProgress * (isMobile ? 0.025 : 0.055);
            reverseScale = 1 + edgeProgress * 0.035;
            secondaryScale = 1 + edgeProgress * 0.06;
            mediaScale = 1.08 + edgeProgress * 0.14;
            break;
          case "tilt":
            foregroundOffsetX = progress * horizontalTravel * 0.18;
            foregroundOffsetY *= 0.58;
            foregroundRotate = progress * (isMobile ? 0.4 : 1.15);
            reverseRotate = -progress * (isMobile ? 0.25 : 0.75);
            secondaryOffsetX = -progress * horizontalTravel * 0.3;
            secondaryRotate = -progress * (isMobile ? 0.3 : 0.9);
            break;
          case "cinematic":
            foregroundOffsetY *= 0.68;
            secondaryOffsetY = -progress * mediaTravel * 0.72;
            secondaryScale = 1.02 + edgeProgress * 0.05;
            mediaScale = 1.12 + edgeProgress * 0.12;
            break;
          case "rise":
            foregroundOffsetY *= 1.2;
            foregroundScale = 1 - edgeProgress * 0.02;
            reverseOffsetY *= 0.62;
            secondaryOffsetY = -progress * foregroundTravel * 0.82;
            break;
          case "carousel":
            foregroundOffsetY *= 0.42;
            reverseOffsetX = progress * horizontalTravel * 0.5;
            secondaryOffsetX = -progress * horizontalTravel * 1.35;
            secondaryOffsetY *= 0.18;
            secondaryScale = 0.985 + (1 - edgeProgress) * 0.015;
            break;
          case "depth":
          default:
            mediaOffsetX = -progress * horizontalTravel * 0.08;
            secondaryOffsetY = -progress * foregroundTravel * 0.72;
            break;
        }

        return {
          section,
          centerDistance: Math.abs(centerDelta),
          isInViewport,
          mediaOffset: -progress * mediaTravel,
          mediaOffsetX,
          mediaScale,
          foregroundOffsetX,
          foregroundOffsetY,
          foregroundScale,
          foregroundRotate,
          reverseOffsetX,
          reverseOffsetY,
          reverseScale,
          reverseRotate,
          secondaryOffsetX,
          secondaryOffsetY,
          secondaryScale,
          secondaryRotate,
          isNearViewport,
        };
      });

      const currentSection = updates
        .filter((update) => update.isInViewport)
        .sort((first, second) => first.centerDistance - second.centerDistance)[0]
        ?.section;

      updates.forEach(
        ({
          section,
          mediaOffset,
          mediaOffsetX,
          mediaScale,
          foregroundOffsetX,
          foregroundOffsetY,
          foregroundScale,
          foregroundRotate,
          reverseOffsetX,
          reverseOffsetY,
          reverseScale,
          reverseRotate,
          secondaryOffsetX,
          secondaryOffsetY,
          secondaryScale,
          secondaryRotate,
          isNearViewport,
        }) => {
          section.style.setProperty(
            "--landing-parallax-media-x",
            `${mediaOffsetX.toFixed(2)}px`,
          );
          section.style.setProperty(
            "--landing-parallax-media-y",
            `${mediaOffset.toFixed(2)}px`,
          );
          section.style.setProperty(
            "--landing-parallax-media-scale",
            mediaScale.toFixed(4),
          );
          section.style.setProperty(
            "--landing-parallax-foreground-x",
            `${foregroundOffsetX.toFixed(2)}px`,
          );
          section.style.setProperty(
            "--landing-parallax-foreground-y",
            `${foregroundOffsetY.toFixed(2)}px`,
          );
          section.style.setProperty(
            "--landing-parallax-foreground-scale",
            foregroundScale.toFixed(4),
          );
          section.style.setProperty(
            "--landing-parallax-foreground-rotate",
            `${foregroundRotate.toFixed(3)}deg`,
          );
          section.style.setProperty(
            "--landing-parallax-reverse-x",
            `${reverseOffsetX.toFixed(2)}px`,
          );
          section.style.setProperty(
            "--landing-parallax-reverse-y",
            `${reverseOffsetY.toFixed(2)}px`,
          );
          section.style.setProperty(
            "--landing-parallax-reverse-scale",
            reverseScale.toFixed(4),
          );
          section.style.setProperty(
            "--landing-parallax-reverse-rotate",
            `${reverseRotate.toFixed(3)}deg`,
          );
          section.style.setProperty(
            "--landing-parallax-secondary-x",
            `${secondaryOffsetX.toFixed(2)}px`,
          );
          section.style.setProperty(
            "--landing-parallax-secondary-y",
            `${secondaryOffsetY.toFixed(2)}px`,
          );
          section.style.setProperty(
            "--landing-parallax-secondary-scale",
            secondaryScale.toFixed(4),
          );
          section.style.setProperty(
            "--landing-parallax-secondary-rotate",
            `${secondaryRotate.toFixed(3)}deg`,
          );

          const nextActiveState = isNearViewport ? "true" : "false";
          if (section.dataset.parallaxActive !== nextActiveState) {
            section.dataset.parallaxActive = nextActiveState;
          }

          const nextCurrentState = section === currentSection ? "true" : "false";
          if (section.dataset.sectionCurrent !== nextCurrentState) {
            section.dataset.sectionCurrent = nextCurrentState;
          }
        },
      );
    };

    const scheduleParallaxUpdate = () => {
      if (parallaxFrame !== 0) return;
      parallaxFrame = window.requestAnimationFrame(updateParallax);
    };

    // Reveal anything already in the first viewport before motion is enabled,
    // preventing a hydration flash on the hero.
    const initialCutoff = window.innerHeight * 0.92;
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top < initialCutoff) {
        section.dataset.sectionVisible = "true";
      }
    });

    updateParallax();
    root.classList.add("landing-motion-ready");

    window.addEventListener("scroll", scheduleParallaxUpdate, { passive: true });
    window.addEventListener("resize", scheduleParallaxUpdate);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const section = entry.target as HTMLElement;
          section.dataset.sectionVisible = "true";
          observer.unobserve(section);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    sections.forEach((section) => {
      if (section.dataset.sectionVisible !== "true") observer.observe(section);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleParallaxUpdate);
      window.removeEventListener("resize", scheduleParallaxUpdate);
      if (parallaxFrame !== 0) window.cancelAnimationFrame(parallaxFrame);

      sections.forEach((section) => {
        section.style.removeProperty("--landing-parallax-media-x");
        section.style.removeProperty("--landing-parallax-media-y");
        section.style.removeProperty("--landing-parallax-media-scale");
        section.style.removeProperty("--landing-parallax-foreground-x");
        section.style.removeProperty("--landing-parallax-foreground-y");
        section.style.removeProperty("--landing-parallax-foreground-scale");
        section.style.removeProperty("--landing-parallax-foreground-rotate");
        section.style.removeProperty("--landing-parallax-reverse-x");
        section.style.removeProperty("--landing-parallax-reverse-y");
        section.style.removeProperty("--landing-parallax-reverse-scale");
        section.style.removeProperty("--landing-parallax-reverse-rotate");
        section.style.removeProperty("--landing-parallax-secondary-x");
        section.style.removeProperty("--landing-parallax-secondary-y");
        section.style.removeProperty("--landing-parallax-secondary-scale");
        section.style.removeProperty("--landing-parallax-secondary-rotate");
        delete section.dataset.parallaxActive;
        delete section.dataset.sectionCurrent;
      });

      automaticForegrounds.forEach((foreground) => {
        delete foreground.dataset.landingParallaxLayer;
      });

      automaticSecondaryLayers.forEach((secondary) => {
        delete secondary.dataset.landingParallaxLayer;
      });

      automaticVariants.forEach((section) => {
        delete section.dataset.parallaxVariant;
      });

      root.classList.remove("landing-motion-ready");
    };
  }, []);

  return null;
}
