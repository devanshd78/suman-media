"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useMotionValue } from "framer-motion";

type RailOptions = {
  section: RefObject<HTMLElement | null>;
  content: RefObject<HTMLDivElement | null>;
  viewport: RefObject<HTMLDivElement | null>;
  track: RefObject<HTMLDivElement | null>;
};

type RailGeometry = { pinned: boolean; viewportHeight: number; distance: number; hold: number };
const INITIAL: RailGeometry = { pinned: false, viewportHeight: 0, distance: 0, hold: 0 };

/** One coordinate system for the sticky panel and its horizontal travel.
 * No wheel interception, autoplay, extra Lenis instance or trailing spring.
 * Short, touch and reduced-motion layouts remain a native horizontal rail.
 */
export function usePinnedRail({ section, content, viewport, track }: RailOptions) {
  const x = useMotionValue(0);
  const [geometry, setGeometry] = useState<RailGeometry>(INITIAL);
  const geometryRef = useRef(INITIAL);

  useEffect(() => {
    const root = section.current;
    const panel = content.current;
    const windowEl = viewport.current;
    const rail = track.current;
    if (!root || !panel || !windowEl || !rail) return;
    const desktop = matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let measureFrame = 0;
    let scrollFrame = 0;
    let disposed = false;

    const updateScroll = () => {
      scrollFrame = 0;
      const current = geometryRef.current;
      if (!current.pinned) { x.set(0); return; }
      // Read the live position; fonts, CMS data and sections above may resize.
      const travelled = Math.max(0, -root.getBoundingClientRect().top);
      x.set(-Math.min(current.distance, travelled));
      root.dataset.railComplete = String(travelled >= current.distance - 1);
    };
    const scheduleScroll = () => {
      if (!disposed && !scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
    };
    const measure = () => {
      measureFrame = 0;
      if (disposed) return;
      const viewportHeight = document.documentElement.clientHeight;
      const naturalHeight = Math.ceil(panel.getBoundingClientRect().height);
      const distance = Math.max(0, rail.scrollWidth - windowEl.clientWidth);
      const pinned = desktop.matches && !reduced.matches && distance > 1 &&
        naturalHeight <= viewportHeight;
      const next = { pinned, viewportHeight, distance,
        hold: pinned ? Math.round(Math.min(400, Math.max(120, viewportHeight * 0.35))) : 0 };
      geometryRef.current = next;
      if (pinned) windowEl.scrollLeft = 0;
      setGeometry((old) => Object.keys(next).every((key) =>
        old[key as keyof RailGeometry] === next[key as keyof RailGeometry]) ? old : next);
      scheduleScroll();
    };
    const scheduleMeasure = () => {
      if (!disposed && !measureFrame) measureFrame = requestAnimationFrame(measure);
    };
    const revealFocused = (event: FocusEvent) => {
      const card = event.target instanceof HTMLElement ? event.target.closest<HTMLElement>("[data-rail-card]") : null;
      if (!card || !geometryRef.current.pinned) return;
      const gutter = Number.parseFloat(getComputedStyle(rail).paddingLeft) || 0;
      const offset = Math.min(geometryRef.current.distance, Math.max(0,
        card.getBoundingClientRect().left - rail.getBoundingClientRect().left - gutter));
      window.scrollTo({ top: window.scrollY + root.getBoundingClientRect().top + offset, behavior: "instant" });
      scheduleScroll();
    };
    const observer = new ResizeObserver(scheduleMeasure);
    [panel, windowEl, rail, document.body].forEach((element) => observer.observe(element));
    window.addEventListener("scroll", scheduleScroll, { passive: true });
    window.addEventListener("resize", scheduleMeasure, { passive: true });
    desktop.addEventListener("change", scheduleMeasure);
    reduced.addEventListener("change", scheduleMeasure);
    rail.addEventListener("focusin", revealFocused);
    document.fonts.ready.then(scheduleMeasure);
    scheduleMeasure();
    return () => {
      disposed = true;
      cancelAnimationFrame(measureFrame); cancelAnimationFrame(scrollFrame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleScroll);
      window.removeEventListener("resize", scheduleMeasure);
      desktop.removeEventListener("change", scheduleMeasure);
      reduced.removeEventListener("change", scheduleMeasure);
      rail.removeEventListener("focusin", revealFocused);
    };
  }, [section, content, viewport, track, x]);

  return { ...geometry, x,
    sectionHeight: geometry.pinned ? geometry.viewportHeight + geometry.distance + geometry.hold : undefined };
}
