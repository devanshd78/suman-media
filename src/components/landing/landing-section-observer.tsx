"use client";

import { useEffect } from "react";

const SELECTOR = ".landing-section-transition";

/**
 * One lightweight observer drives the landing-page section fades.
 * The section markup itself remains server rendered and fully visible when
 * JavaScript is unavailable, which keeps the effect progressive and SEO-safe.
 */
export function LandingSectionObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (sections.length === 0) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      sections.forEach((section) => {
        section.dataset.sectionVisible = "true";
      });
      return;
    }

    // Mark content that is already in the first viewport before enabling the
    // transition class. This avoids a flash/fade on the hero during hydration.
    const initialCutoff = window.innerHeight * 0.92;
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
        threshold: 0.08,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    sections.forEach((section) => {
      if (section.dataset.sectionVisible !== "true") observer.observe(section);
    });

    return () => {
      observer.disconnect();
      root.classList.remove("landing-motion-ready");
    };
  }, []);

  return null;
}
