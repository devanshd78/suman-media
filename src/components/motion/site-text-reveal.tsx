"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TEXT_SELECTOR = "h1,h2,h3,h4,h5,h6,p,blockquote,figcaption,dt,dd";
const MANAGED_SELECTOR = "[data-motion-managed],[data-text-reveal],[data-landing-text-reveal-skip],header,nav,[role=dialog],[role=menu],[aria-hidden=true],[inert]";

/** The homepage entrance system, shared by static and streamed website content.
 * Text is never split/mutated; React, Marathi shaping and custom motion retain ownership. */
export function SiteTextReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-website-content]");
    if (!root || !("IntersectionObserver" in window)) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const prepared = new Set<HTMLElement>();
    let frame = 0;
    const reveal = (element: HTMLElement) => {
      element.dataset.landingTextVisible = "true";
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        // A fast jump past an element also reveals it, so reverse scrolling is safe.
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) reveal(entry.target as HTMLElement);
      }
    }, { threshold: 0, rootMargin: "0px 0px -4% 0px" });
    const prepare = () => {
      frame = 0;
      const sections = new Map<Element, number>();
      const additions = Array.from(root.querySelectorAll<HTMLElement>(TEXT_SELECTOR))
        .filter(element => !prepared.has(element) && !element.closest(MANAGED_SELECTOR) && !element.querySelector('[data-motion-managed],[data-text-reveal]') && element.textContent?.trim())
        .map(element => {
          const section = element.closest("section") ?? root;
          const index = sections.get(section) ?? 0;
          sections.set(section, index + 1);
          return { element, delay: Math.min(index, 4) * 55, top: element.getBoundingClientRect().top };
        });
      for (const { element, delay, top } of additions) {
        prepared.add(element);
        element.classList.add("landing-text-reveal");
        element.style.setProperty("--landing-text-delay", `${delay}ms`);
        if (top < innerHeight * .96) reveal(element);
        else observer.observe(element);
      }
    };
    document.documentElement.classList.add("landing-text-motion-ready");
    prepare();
    const mutations = new MutationObserver(records => {
      if (!frame && records.some(record => Array.from(record.addedNodes).some(node => node.nodeType === Node.ELEMENT_NODE))) {
        frame = requestAnimationFrame(prepare);
      }
    });
    mutations.observe(root, { childList: true, subtree: true });
    const showAll = () => { if (preference.matches) prepared.forEach(reveal); };
    preference.addEventListener("change", showAll);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      mutations.disconnect();
      preference.removeEventListener("change", showAll);
      document.documentElement.classList.remove("landing-text-motion-ready");
      for (const element of prepared) {
        element.classList.remove("landing-text-reveal");
        element.style.removeProperty("--landing-text-delay");
        delete element.dataset.landingTextVisible;
      }
    };
  }, [pathname]);
  return null;
}
