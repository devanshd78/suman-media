"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

const HEADER_OFFSET_PX = 64;
const SCROLL_DURATION_SECONDS = 0.72;

function getHashTarget(hash: string) {
  if (!hash || hash === "#") return null;

  try {
    const id = decodeURIComponent(hash.slice(1));
    return document.getElementById(id);
  } catch {
    return null;
  }
}

function nativeScrollToTarget(
  target: HTMLElement,
  behavior: ScrollBehavior,
) {
  const top =
    window.scrollY +
    target.getBoundingClientRect().top -
    HEADER_OFFSET_PX;

  window.scrollTo({
    top: Math.max(0, top),
    behavior,
  });
}

export function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const root = document.documentElement;

    const useLenis =
      !reducedMotion.matches &&
      !coarsePointer.matches;

    let lenis: Lenis | null = null;

    if (useLenis) {
      lenis = new Lenis({
        autoRaf: true,
        duration: SCROLL_DURATION_SECONDS,
        easing: (t: number) =>
          Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        stopInertiaOnNavigate: true,
      });

      lenisRef.current = lenis;
      root.dataset.scrollEngine = "lenis";
    } else {
      root.dataset.scrollEngine = "native";
    }

    const scrollToHash = (
      hash: string,
      immediate = false,
    ) => {
      const destination = getHashTarget(hash);
      if (!destination) return false;

      if (lenis) {
        lenis.scrollTo(destination, {
          offset: -HEADER_OFFSET_PX,
          duration: immediate
            ? 0
            : SCROLL_DURATION_SECONDS,
          immediate,
        });
      } else {
        nativeScrollToTarget(
          destination,
          immediate || reducedMotion.matches
            ? "auto"
            : "smooth",
        );
      }

      return true;
    };

    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        !url.hash ||
        !getHashTarget(url.hash)
      ) {
        return;
      }

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

    const initialHashFrame = window.requestAnimationFrame(() => {
      if (window.location.hash) {
        scrollToHash(window.location.hash, true);
      }
    });

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("hashchange", handleHashChange);
      window.cancelAnimationFrame(initialHashFrame);

      lenis?.destroy();
      lenisRef.current = null;

      if (
        root.dataset.scrollEngine ===
        (useLenis ? "lenis" : "native")
      ) {
        delete root.dataset.scrollEngine;
      }
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const destination = getHashTarget(window.location.hash);
      const lenis = lenisRef.current;

      if (lenis) {
        lenis.resize();

        if (destination) {
          lenis.scrollTo(destination, {
            offset: -HEADER_OFFSET_PX,
            duration: SCROLL_DURATION_SECONDS,
          });
        }

        return;
      }

      if (destination) {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        nativeScrollToTarget(
          destination,
          reducedMotion ? "auto" : "smooth",
        );
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return children;
}
