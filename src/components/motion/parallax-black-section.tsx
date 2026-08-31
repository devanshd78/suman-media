"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useRef,
  type ReactNode,
} from "react";

type ParallaxBlackSectionProps = {
  children: ReactNode;
  className?: string;
};

export function ParallaxBlackSection({
  children,
  className = "",
}: ParallaxBlackSectionProps) {
  const wrapperRef =
    useRef<HTMLDivElement>(null);

  const shouldReduceMotion =
    useReducedMotion();

  const { scrollYProgress } =
    useScroll({
      target: wrapperRef,
      offset: [
        "start end",
        "start 35%",
      ],
    });

  const smoothProgress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 110,
        damping: 28,
        mass: 0.55,
        restDelta: 0.001,
      },
    );

  /*
   * Black section begins slightly below its
   * normal position and rises into place.
   */
  const y = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion
      ? [0, 0]
      : [90, 0],
  );

  /*
   * Small perspective scale gives the incoming
   * section depth without making the website
   * feel overly animated.
   */
  const scale = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion
      ? [1, 1]
      : [0.975, 1],
  );

  /*
   * This makes the upper edge feel like it is
   * revealing over the previous white section.
   */
  const clipPath = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion
      ? [
          "inset(0% 0% 0% 0%)",
          "inset(0% 0% 0% 0%)",
        ]
      : [
          "inset(7% 0% 0% 0%)",
          "inset(0% 0% 0% 0%)",
        ],
  );

  return (
    <div
      ref={wrapperRef}
      className="
        relative
        z-10
        w-full
        bg-white
        [perspective:1400px]
      "
    >
      <motion.div
        className={`
          relative
          z-20
          w-full
          origin-top
          bg-black
          [backface-visibility:hidden]
          ${className}
        `}
        style={
          shouldReduceMotion
            ? undefined
            : {
                y,
                scale,
                clipPath,
                willChange:
                  "transform, clip-path",
              }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}