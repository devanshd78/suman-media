"use client";

import { useEffect, useRef, useState } from "react";

export function useNearViewport<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element || isNearViewport) return;

    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setIsNearViewport(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsNearViewport(true);
      observer.disconnect();
    }, { rootMargin: "400px" });

    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled, isNearViewport]);

  return { ref, isNearViewport };
}
