import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import styles from "./government-institutional-page.module.css";

// Each polygon follows a card in the PDF's original mosaic.
const cards = [
  "polygon(0 0,21% 0,32% 28%,0 27%)",
  "polygon(22% 0,57% 0,71% 30%,34% 28%)",
  "polygon(59% 0,100% 0,100% 32%,71% 30%)",
  "polygon(0 27%,33% 28%,46% 58%,0 56%)",
  "polygon(34% 28%,72% 30%,85% 60%,47% 58%)",
  "polygon(73% 31%,100% 32%,100% 62%,85% 61%)",
  "polygon(0 56%,9% 57%,21% 86%,0 84%)",
  "polygon(10% 57%,47% 59%,60% 88%,21% 86%)",
  "polygon(48% 59%,85% 61%,98% 91%,60% 89%)",
  "polygon(86% 61%,100% 62%,100% 92%,98% 91%)",
];
export function Chevron() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>;
}
export function GovernmentHero() {
  return <section className={styles.hero} aria-labelledby="government-title">
    <div className={styles.mosaic} aria-hidden="true">
      <Image src="/images/government-institutional/hero-mosaic.jpg" alt="" fill preload sizes="(max-width: 1440px) 1440px, 100vw" className={styles.mosaicBase}/>
      {cards.map((clipPath,index)=><div key={clipPath} className={styles.mosaicCard} style={{clipPath,"--delay":`${index * 75}ms`} as CSSProperties} />)}
    </div>
    <div className={styles.shade} aria-hidden="true" />
    <div className={styles.heroHeading}>
      <p className={`${styles.eyebrow} ${styles.entrance}`} style={{"--delay":"180ms"} as CSSProperties}>Government, PSU &amp; Institutional Services</p>
      <h1 id="government-title" className={styles.entrance} style={{"--delay":"300ms"} as CSSProperties}>{"Communication That Connects\nInstitutions with People."}</h1>
    </div>
    <div className={styles.heroIntro}>
      <p className={styles.entrance} style={{"--delay":"500ms"} as CSSProperties}>Supporting government bodies and institutions through strategic communication, digital outreach and public-facing campaigns.</p>
      <Link href="/contact/form" className={`${styles.action} ${styles.entrance}`} style={{"--delay":"650ms"} as CSSProperties}>Discuss a Project <Chevron /></Link>
    </div>
    <svg className={styles.curve} viewBox="0 0 1440 44" preserveAspectRatio="none" aria-hidden="true"><path d="M0 44Q720 -34 1440 44V45H0Z" fill="white"/></svg>
  </section>;
}
