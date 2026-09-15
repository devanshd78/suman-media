"use client";

import { useMotionValue } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

type RailOptions = {
  section: RefObject<HTMLElement | null>;
  content: RefObject<HTMLDivElement | null>;
  viewport: RefObject<HTMLDivElement | null>;
  track: RefObject<HTMLDivElement | null>;
  minViewportWidth?: number;
  minViewportHeight?: number;
  requireFinePointer?: boolean;
};

type RailGeometry = {
  pinned: boolean;
  viewportHeight: number;
  distance: number;
};

const INITIAL: RailGeometry = {
  pinned: false,
  viewportHeight: 0,
  distance: 0,
};

function sameGeometry(a: RailGeometry, b: RailGeometry) {
  return (
    a.pinned === b.pinned &&
    Math.abs(a.viewportHeight - b.viewportHeight) < 0.5 &&
    Math.abs(a.distance - b.distance) < 0.5
  );
}

/**
 * Converts ordinary page Y-scroll into horizontal rail movement.
 *
 * The scroll path is deliberately based on native window.scrollY. The section
 * offset is measured only when layout changes, so ordinary scroll frames do
 * not force layout with getBoundingClientRect(). This keeps the pinned rail in
 * sync with Lenis without layering a second smoothing engine on top of it.
 */
export function usePinnedRail({
  section,
  content,
  viewport,
  track,
  minViewportWidth = 1024,
  minViewportHeight = 0,
  requireFinePointer = true,
}: RailOptions) {
  const x = useMotionValue(0);

  const [geometry, setGeometry] =
    useState<RailGeometry>(INITIAL);

  const geometryRef = useRef<RailGeometry>(INITIAL);
  const sectionTopRef = useRef(0);

  useEffect(() => {
    const root = section.current;
    const panel = content.current;
    const windowElement = viewport.current;
    const rail = track.current;

    if (!root || !panel || !windowElement || !rail) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    let measureFrame = 0;
    let scrollFrame = 0;
    let disposed = false;
    let lastComplete: boolean | null = null;

    const setRailComplete = (complete: boolean) => {
      if (lastComplete === complete) return;
      lastComplete = complete;
      root.dataset.railComplete = String(complete);
    };

    const updateScroll = () => {
      scrollFrame = 0;

      const current = geometryRef.current;

      if (!current.pinned) {
        if (x.get() !== 0) x.set(0);
        setRailComplete(false);
        return;
      }

      const travelled = Math.max(
        0,
        window.scrollY - sectionTopRef.current,
      );

      const clampedTravel = Math.min(
        current.distance,
        travelled,
      );

      const nextX = -clampedTravel;
      if (Math.abs(x.get() - nextX) > 0.1) {
        x.set(nextX);
      }

      setRailComplete(
        clampedTravel >= current.distance - 1,
      );
    };

    const scheduleScroll = () => {
      if (!disposed && !scrollFrame) {
        scrollFrame = window.requestAnimationFrame(updateScroll);
      }
    };

    const measure = () => {
      measureFrame = 0;

      if (disposed) return;

      const viewportWidth =
        document.documentElement.clientWidth;
      const viewportHeight =
        document.documentElement.clientHeight;

      sectionTopRef.current =
        window.scrollY + root.getBoundingClientRect().top;

      const naturalHeight = Math.ceil(panel.offsetHeight);
      const distance = Math.max(
        0,
        rail.scrollWidth - windowElement.clientWidth,
      );

      const pointerAllowed =
        !requireFinePointer || finePointer.matches;

      const pinned =
        !reducedMotion.matches &&
        pointerAllowed &&
        viewportWidth >= minViewportWidth &&
        viewportHeight >= minViewportHeight &&
        distance > 1 &&
        naturalHeight <= viewportHeight + 2;

      const next: RailGeometry = {
        pinned,
        viewportHeight,
        distance,
      };

      geometryRef.current = next;

      if (pinned) {
        if (windowElement.scrollLeft !== 0) {
          windowElement.scrollLeft = 0;
        }
      } else if (x.get() !== 0) {
        x.set(0);
      }

      setGeometry((current) =>
        sameGeometry(current, next) ? current : next,
      );

      scheduleScroll();
    };

    const scheduleMeasure = () => {
      if (!disposed && !measureFrame) {
        measureFrame = window.requestAnimationFrame(measure);
      }
    };

    const revealFocusedCard = (event: FocusEvent) => {
      const card =
        event.target instanceof HTMLElement
          ? event.target.closest<HTMLElement>("[data-rail-card]")
          : null;

      const current = geometryRef.current;
      if (!card || !current.pinned) return;

      const trackStyle = window.getComputedStyle(rail);
      const leftPadding =
        Number.parseFloat(trackStyle.paddingLeft || "0") || 0;

      const cardOffset = Math.max(
        0,
        card.offsetLeft - leftPadding,
      );

      const targetDistance = Math.min(
        current.distance,
        cardOffset,
      );

      window.scrollTo({
        top: sectionTopRef.current + targetDistance,
        behavior: "auto",
      });

      scheduleScroll();
    };

    const observer = new ResizeObserver(scheduleMeasure);

    observer.observe(panel);
    observer.observe(windowElement);
    observer.observe(rail);
    observer.observe(document.body);

    window.addEventListener("scroll", scheduleScroll, {
      passive: true,
    });
    window.addEventListener("resize", scheduleMeasure, {
      passive: true,
    });
    window.addEventListener("pageshow", scheduleMeasure, {
      passive: true,
    });
    window.visualViewport?.addEventListener(
      "resize",
      scheduleMeasure,
      { passive: true },
    );

    reducedMotion.addEventListener("change", scheduleMeasure);
    finePointer.addEventListener("change", scheduleMeasure);
    rail.addEventListener("focusin", revealFocusedCard);

    document.fonts?.ready
      .then(scheduleMeasure)
      .catch(() => undefined);

    scheduleMeasure();

    return () => {
      disposed = true;

      window.cancelAnimationFrame(measureFrame);
      window.cancelAnimationFrame(scrollFrame);
      observer.disconnect();

      window.removeEventListener("scroll", scheduleScroll);
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("pageshow", scheduleMeasure);
      window.visualViewport?.removeEventListener(
        "resize",
        scheduleMeasure,
      );

      reducedMotion.removeEventListener("change", scheduleMeasure);
      finePointer.removeEventListener("change", scheduleMeasure);
      rail.removeEventListener("focusin", revealFocusedCard);
    };
  }, [
    section,
    content,
    viewport,
    track,
    x,
    minViewportWidth,
    minViewportHeight,
    requireFinePointer,
  ]);

  return {
    ...geometry,
    x,
    sectionHeight: geometry.pinned
      ? geometry.viewportHeight + geometry.distance
      : undefined,
  };
}
