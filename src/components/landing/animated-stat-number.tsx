"use client";

import { useEffect, useRef } from "react";

type AnimatedStatNumberProps = {
  value: number;
  prefix?: string | null;
  suffix?: string | null;
  delay?: number;
};

export function AnimatedStatNumber({
  value,
  prefix,
  suffix,
  delay = 0,
}: AnimatedStatNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || hasAnimated.current) {
      return;
    }

    const formatValue = (currentValue: number) =>
      `${prefix ?? ""}${currentValue}${suffix ?? ""}`;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      element.textContent = formatValue(value);
      hasAnimated.current = true;
      return;
    }

    let frameId = 0;
    let timeoutId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        observer.disconnect();

        timeoutId = window.setTimeout(() => {
          const duration = 1400;
          const start = performance.now();

          const tick = (time: number) => {
            const progress = Math.min((time - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const displayValue = Math.round(value * eased);

            /*
             * Keep the exact existing timing/easing, but update the isolated
             * text node directly instead of forcing a React render every frame.
             */
            element.textContent = formatValue(displayValue);

            if (progress < 1) {
              frameId = window.requestAnimationFrame(tick);
            } else {
              element.textContent = formatValue(value);
              hasAnimated.current = true;
            }
          };

          frameId = window.requestAnimationFrame(tick);
        }, delay);
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(frameId);
    };
  }, [delay, prefix, suffix, value]);

  return <span ref={ref}>{prefix ?? ""}0{suffix ?? ""}</span>;
}
