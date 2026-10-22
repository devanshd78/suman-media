"use client";
import { useRef } from "react";
import Link from "next/link";
import styles from "./page.module.css";
const categories = [
  ["Film Library", "Feature films and cinematic content collections.", "FILM"],
  ["Devotional Catalogue", "Devotional songs and spiritual audio content.", "DEVOTIONAL"],
  ["Song Catalogue", "Songs, recordings and original music assets.", "MUSIC"],
  ["Cultural Archives", "Regional stories, performances and cultural material.", "CULTURE"],
  ["Audio Masters", "Recorded audio and master files.", "AUDIO"],
  ["Rights & Licensing", "Publishing, synchronization and digital rights opportunities.", "RIGHTS"],
];
export function Catalogue() {
  const track = useRef<HTMLUListElement>(null);
  function move(direction: number) {
    const element = track.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth * .85, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return <div>
    <ul ref={track} id="catalogue-track" className={styles.catalogue} aria-label="Content and music catalogues" tabIndex={0}>
      {categories.map(([title, description, label], i) => <li key={title}><Link href="/contact/form" className={styles.card} aria-label={`Learn more about ${title}`}><div className={styles.cardArt} data-tone={i} aria-hidden="true"><span>{label}</span></div><div className={styles.cardBody}><h3>{title}</h3><p>{description}</p><span className={styles.cardLink}>Learn more <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg></span></div></Link></li>)}
    </ul>
    <div className={styles.controls}><button type="button" onClick={() => move(-1)} aria-label="Previous catalogues" aria-controls="catalogue-track"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg></button><button type="button" onClick={() => move(1)} aria-label="Next catalogues" aria-controls="catalogue-track"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg></button></div>
  </div>;
}
