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

  /**
   * Defaults preserve the older desktop-only behaviour for any other
   * component that already uses this shared hook.
   *
   * Industries overrides these values so its animation can run across
   * phones, tablets, touch laptops and desktops when the layout fits.
   */
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
 * Important implementation rules:
 * - no wheel interception
 * - no second smooth-scroll engine
 * - no spring layered over Lenis
 * - reversible: scrolling back up moves the rail back naturally
 * - the pinned mode is enabled only when the complete panel fits vertically
 * - reduced-motion users retain a normal horizontal swipe/scroll rail
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

  const geometryRef =
    useRef<RailGeometry>(INITIAL);

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

    const updateScroll = () => {
      scrollFrame = 0;

      const current = geometryRef.current;

      if (!current.pinned) {
        x.set(0);
        root.dataset.railComplete = "false";
        return;
      }

      /*
       * Read the section position live. This avoids stale offsets when
       * CMS text, fonts or sections above Industries change height.
       */
      const travelled = Math.max(
        0,
        -root.getBoundingClientRect().top,
      );

      const clampedTravel = Math.min(
        current.distance,
        travelled,
      );

      x.set(-clampedTravel);

      root.dataset.railComplete = String(
        clampedTravel >= current.distance - 1,
      );
    };

    const scheduleScroll = () => {
      if (!disposed && !scrollFrame) {
        scrollFrame = window.requestAnimationFrame(
          updateScroll,
        );
      }
    };

    const measure = () => {
      measureFrame = 0;

      if (disposed) {
        return;
      }

      const viewportWidth =
        document.documentElement.clientWidth;

      const viewportHeight =
        document.documentElement.clientHeight;

      const naturalHeight = Math.ceil(
        panel.getBoundingClientRect().height,
      );

      const distance = Math.max(
        0,
        rail.scrollWidth - windowElement.clientWidth,
      );

      const pointerAllowed =
        !requireFinePointer || finePointer.matches;

      /*
       * The old hook disabled the animation below desktop/fine-pointer
       * sizes. The responsive mode now allows any viewport requested by
       * the caller, but it still refuses to pin if the actual rendered
       * panel cannot fit vertically. This prevents clipping on extremely
       * short browser windows while keeping the fallback horizontal.
       */
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
        /* Native horizontal scroll must not offset the animated rail. */
        if (windowElement.scrollLeft !== 0) {
          windowElement.scrollLeft = 0;
        }
      } else {
        x.set(0);
      }

      setGeometry((current) =>
        sameGeometry(current, next)
          ? current
          : next,
      );

      scheduleScroll();
    };

    const scheduleMeasure = () => {
      if (!disposed && !measureFrame) {
        measureFrame = window.requestAnimationFrame(
          measure,
        );
      }
    };

    const revealFocusedCard = (event: FocusEvent) => {
      const card =
        event.target instanceof HTMLElement
          ? event.target.closest<HTMLElement>(
            "[data-rail-card]",
          )
          : null;

      const current = geometryRef.current;

      if (!card || !current.pinned) {
        return;
      }

      const trackStyle = window.getComputedStyle(rail);
      const leftPadding = Number.parseFloat(
        trackStyle.paddingLeft || "0",
      );

      const cardOffset = Math.max(
        0,
        card.offsetLeft - leftPadding,
      );

      const targetDistance = Math.min(
        current.distance,
        cardOffset,
      );

      const rootTop =
        window.scrollY + root.getBoundingClientRect().top;

      window.scrollTo({
        top: rootTop + targetDistance,
        behavior: "auto",
      });

      scheduleScroll();
    };

    const observer = new ResizeObserver(
      scheduleMeasure,
    );

    observer.observe(panel);
    observer.observe(windowElement);
    observer.observe(rail);

    window.addEventListener(
      "scroll",
      scheduleScroll,
      { passive: true },
    );

    window.addEventListener(
      "resize",
      scheduleMeasure,
      { passive: true },
    );

    window.visualViewport?.addEventListener(
      "resize",
      scheduleMeasure,
      { passive: true },
    );

    reducedMotion.addEventListener(
      "change",
      scheduleMeasure,
    );

    finePointer.addEventListener(
      "change",
      scheduleMeasure,
    );

    rail.addEventListener(
      "focusin",
      revealFocusedCard,
    );

    document.fonts?.ready
      .then(scheduleMeasure)
      .catch(() => undefined);

    scheduleMeasure();

    return () => {
      disposed = true;

      window.cancelAnimationFrame(measureFrame);
      window.cancelAnimationFrame(scrollFrame);

      observer.disconnect();

      window.removeEventListener(
        "scroll",
        scheduleScroll,
      );

      window.removeEventListener(
        "resize",
        scheduleMeasure,
      );

      window.visualViewport?.removeEventListener(
        "resize",
        scheduleMeasure,
      );

      reducedMotion.removeEventListener(
        "change",
        scheduleMeasure,
      );

      finePointer.removeEventListener(
        "change",
        scheduleMeasure,
      );

      rail.removeEventListener(
        "focusin",
        revealFocusedCard,
      );
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
