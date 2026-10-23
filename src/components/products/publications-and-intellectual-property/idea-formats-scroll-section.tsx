"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import styles from "./publications-and-intellectual-property-page.module.css";

function FormatPill({ label, index, progress }: { label: string; index: number; progress: MotionValue<number> }) {
  const reduceMotion = useReducedMotion();
  const stagger = index * 0.025;
  const opacity = useTransform(progress, [0.04 + stagger, 0.22 + stagger, 0.68 + stagger, 0.86 + stagger], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.04 + stagger, 0.22 + stagger, 0.68 + stagger, 0.86 + stagger], [45, 0, 0, -40]);
  const scale = useTransform(progress, [0.04 + stagger, 0.22 + stagger, 0.68 + stagger, 0.86 + stagger], [0.95, 1, 1, 0.97]);

  return <motion.li className={styles.scrollPill} style={reduceMotion ? undefined : { opacity, y, scale }}>{label}</motion.li>;
}

export function ScrollFormats({ formats }: { formats: string[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  return (
    <section ref={sectionRef} className={`${styles.formats} site-section`} aria-labelledby="formats-heading">
      <p className={styles.eyebrow}>Our supported publication formats</p>
      <h2 id="formats-heading" className={styles.subheading}>Ideas Take Many Forms.</h2>
      <ul className={styles.pills}>
        {formats.map((label, index) => <FormatPill key={label} label={label} index={index} progress={scrollYProgress} />)}
      </ul>
    </section>
  );
}
