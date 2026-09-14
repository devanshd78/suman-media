"use client";

import { lazy, Suspense, useSyncExternalStore, type ReactNode } from "react";
import { useNearViewport } from "@/hooks/use-near-viewport";

const ScrollReveal = lazy(() => import("./scroll-text-reveal-effect"));

const MOTION_PREFERENCE = "(prefers-reduced-motion: reduce)";
function subscribeToMotionPreference(onChange: () => void) {
  const preference = window.matchMedia(MOTION_PREFERENCE);
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}
const getClientSnapshot = () => !window.matchMedia(MOTION_PREFERENCE).matches;
const getServerSnapshot = () => false;

export function TextReveal({ children, enabled = true }: { children: ReactNode; enabled?: boolean }) {
  const motionEnabled = useSyncExternalStore(
    subscribeToMotionPreference,
    getClientSnapshot,
    getServerSnapshot,
  );
  const { ref, isNearViewport } = useNearViewport<HTMLSpanElement>(enabled && motionEnabled);

  if (!enabled) return <>{children}</>;

  // Keep server-rendered text and its space while the animation loads nearby.
  return (
    <span ref={ref} data-lazy-text="">
      {motionEnabled && isNearViewport ? (
        <Suspense fallback={children}>
          <ScrollReveal>{children}</ScrollReveal>
        </Suspense>
      ) : children}
    </span>
  );
}
