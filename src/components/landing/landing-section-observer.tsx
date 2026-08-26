"use client";

import { useEffect } from "react";

const SELECTOR = ".landing-section-transition";

/**
 * Lightweight progressive-enhancement observer for the landing page.
 *
 * - HTML is fully visible without JavaScript.
 * - We never apply transforms to section roots, so sticky/3D sections remain
 *   reliable.
 * - The observer only toggles data attributes consumed by global CSS.
 */
export function LandingSectionObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(SELECTOR),
    );

    if (sections.length === 0) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    sections.forEach((section, index) => {
      section.dataset.sectionIndex = String(index);
    });

    if (reducedMotion.matches) {
      sections.forEach((section) => {
        section.dataset.sectionVisible = "true";
      });
      return;
    }

    /* Avoid a hydration flash for content already inside the first viewport. */
    const initialCutoff = window.innerHeight * 0.94;
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top < initialCutoff) {
        section.dataset.sectionVisible = "true";
      }
    });

    root.classList.add("landing-motion-ready");

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
        threshold: 0.075,
        rootMargin: "0px 0px -7% 0px",
      },
    );

    sections.forEach((section) => {
      if (section.dataset.sectionVisible !== "true") {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
      root.classList.remove("landing-motion-ready");
    };
  }, []);

  return null;
}
