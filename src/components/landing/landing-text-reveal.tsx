"use client";

import { useEffect } from "react";

const TEXT_SELECTOR =
  "h1, h2, h3, h4, h5, h6, p, blockquote, figcaption, dt, dd";

export function LandingTextReveal() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("main[data-landing-page]");
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>(TEXT_SELECTOR),
    ).filter(
      (element) =>
        !element.closest("[data-landing-text-reveal-skip]") &&
        Boolean(element.textContent?.trim()),
    );

    if (elements.length === 0) return;

    const sectionIndexes = new Map<Element, number>();
    const viewportCutoff = window.innerHeight * 0.95;

    /*
     * Batch all layout reads before mutating classes/styles. This preserves the
     * exact reveal threshold and delays while avoiding repeated forced layout.
     */
    const prepared = elements.map((element) => {
      const section = element.closest("section") ?? root;
      const index = sectionIndexes.get(section) ?? 0;
      sectionIndexes.set(section, index + 1);

      return {
        element,
        delay: Math.min(index, 4) * 55,
        initiallyVisible: element.getBoundingClientRect().top < viewportCutoff,
      };
    });

    prepared.forEach(({ element, delay, initiallyVisible }) => {
      element.classList.add("landing-text-reveal");
      element.style.setProperty("--landing-text-delay", `${delay}ms`);

      if (initiallyVisible) {
        element.dataset.landingTextVisible = "true";
      }
    });

    document.documentElement.classList.add("landing-text-motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          element.dataset.landingTextVisible = "true";
          observer.unobserve(element);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -7% 0px",
      },
    );

    prepared.forEach(({ element }) => {
      if (element.dataset.landingTextVisible !== "true") {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("landing-text-motion-ready");

      prepared.forEach(({ element }) => {
        element.classList.remove("landing-text-reveal");
        element.style.removeProperty("--landing-text-delay");
        delete element.dataset.landingTextVisible;
      });
    };
  }, []);

  return null;
}
