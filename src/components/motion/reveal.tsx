"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  useRef,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  amount?: number;
  once?: boolean;
  style?: CSSProperties;
};

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 28,
  amount = 0.2,
  once = true,
  style,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: distance,
              filter: "blur(10px)",
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }
      }
      viewport={{ once, amount }}
      transition={{
        duration: 0.82,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

type RevealSpanProps = RevealProps & {
  display?: "inline-block" | "block";
};

export function RevealSpan({
  children,
  className,
  delay = 0,
  distance = 18,
  amount = 0.45,
  once = true,
  display = "inline-block",
}: RevealSpanProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className={className}
      style={{ display }}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: distance,
              filter: "blur(8px)",
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }
      }
      viewport={{ once, amount }}
      transition={{
        duration: 0.72,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.span>
  );
}

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  scaleFrom?: number;
  scaleTo?: number;
};

export function Parallax({
  children,
  className,
  distance = 48,
  scaleFrom = 1.04,
  scaleTo = 1,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [distance, -distance],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [scaleFrom, scaleTo, scaleFrom],
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: reduceMotion ? 0 : y,
        scale: reduceMotion ? 1 : scale,
      }}
    >
      {children}
    </motion.div>
  );
}

export function useSectionParallax(
  target: RefObject<HTMLElement | null>,
  input: [number, number] = [0, 1],
  output: [number, number] = [0, -80],
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });

  return useTransform(scrollYProgress, input, output);
}
