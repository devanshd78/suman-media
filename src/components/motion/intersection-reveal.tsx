"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./intersection-reveal.module.css";

/** Adds an entrance once, without relying on global DOM/text mutations.
 * Markup remains visible when JavaScript or IntersectionObserver is unavailable.
 */
export function IntersectionReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      element.dataset.entered = "true";
      observer.disconnect();
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} data-motion-managed className={`${styles.reveal} ${className}`}>{children}</div>;
}
