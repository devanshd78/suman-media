"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

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
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || hasAnimated.current) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setDisplayValue(value);
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
            const progress = Math.min(
              (time - start) / duration,
              1,
            );

            const eased =
              1 - Math.pow(1 - progress, 3);

            setDisplayValue(
              Math.round(value * eased),
            );

            if (progress < 1) {
              frameId =
                requestAnimationFrame(tick);
            } else {
              setDisplayValue(value);
              hasAnimated.current = true;
            }
          };

          frameId =
            requestAnimationFrame(tick);
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
      cancelAnimationFrame(frameId);
    };
  }, [delay, value]);

  return (
    <span ref={ref}>
      {prefix ?? ""}
      {displayValue}
      {suffix ?? ""}
    </span>
  );
}