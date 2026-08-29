"use client";

import Lenis from "lenis";
import Snap from "lenis/snap";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

const HEADER_OFFSET_PX = 88;
const SCROLL_DURATION_SECONDS = 1.05;

function getHashTarget(hash: string) {
  if (!hash || hash === "#") return null;

  try {
    const id = decodeURIComponent(hash.slice(1));
    return document.getElementById(id);
  } catch {
    return null;
  }
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const snapRef = useRef<Snap | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Keep native scrolling for users who explicitly request less motion.
    if (reducedMotion.matches) return;

    const lenis = new Lenis({
      duration: SCROLL_DURATION_SECONDS,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });

    lenisRef.current = lenis;
    let animationFrame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrame = window.requestAnimationFrame(raf);
    };

    animationFrame = window.requestAnimationFrame(raf);

    const scrollToHash = (hash: string, immediate = false) => {
      const destination = getHashTarget(hash);
      if (!destination) return false;

      lenis.scrollTo(destination, {
        offset: -HEADER_OFFSET_PX,
        duration: immediate ? 0 : SCROLL_DURATION_SECONDS,
        immediate,
      });
      return true;
    };

    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      // Intercept hash navigation only when it stays on the current page.
      // Cross-page links remain normal Next.js navigation; the pathname effect
      // below smoothly resolves their hash after the destination mounts.
      if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        !url.hash
      ) {
        return;
      }

      if (!getHashTarget(url.hash)) return;

      event.preventDefault();
      scrollToHash(url.hash);

      const nextUrl = `${url.pathname}${url.search}${url.hash}`;
      window.history.pushState(null, "", nextUrl);
    };

    const handleHashChange = () => {
      scrollToHash(window.location.hash);
    };

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("hashchange", handleHashChange);

    // Handle a direct visit such as /#faq after the Lenis instance exists.
    const initialHashFrame = window.requestAnimationFrame(() => {
      if (window.location.hash) scrollToHash(window.location.hash, true);
    });

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("hashchange", handleHashChange);
      window.cancelAnimationFrame(initialHashFrame);
      window.cancelAnimationFrame(animationFrame);
      snapRef.current?.destroy();
      snapRef.current = null;
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const lenis = lenisRef.current;
      if (!lenis) return;

      lenis.resize();

      snapRef.current?.destroy();
      snapRef.current = null;

      const landingSections = Array.from(
        document.querySelectorAll<HTMLElement>(".landing-section-transition"),
      );

      if (landingSections.length > 1) {
        const snap = new Snap(lenis, {
          type: "proximity",
          distanceThreshold: "18%",
          debounce: 220,
          duration: 0.72,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        });

        snap.addElements(landingSections, {
          align: "start",
          ignoreSticky: true,
          ignoreTransform: true,
        });
        snapRef.current = snap;
      }

      // Next.js can navigate to /some-page#section. Once the destination route
      // has rendered, finish that navigation with the same smooth behaviour.
      if (window.location.hash) {
        const destination = getHashTarget(window.location.hash);
        if (destination) {
          lenis.scrollTo(destination, {
            offset: -HEADER_OFFSET_PX,
            duration: SCROLL_DURATION_SECONDS,
          });
        }
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
      snapRef.current?.destroy();
      snapRef.current = null;
    };
  }, [pathname]);

  return children;
}
