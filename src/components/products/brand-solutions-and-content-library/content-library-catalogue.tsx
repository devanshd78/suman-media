"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./brand-solutions-and-content-library-page.module.css";
const categories = [
  ["Film Library", "Feature films and cinematic content collections.", "film-library"],
  ["Devotional Catalogue", "Devotional songs and spiritual audio content.", "devotional"],
  ["Song Catalogue", "Songs, recordings and original music assets.", "songs"],
  ["Cultural Archives", "Regional stories, performances and cultural material.", "culture"],
  ["Audio Masters", "Recorded audio and master files.", "audio"],
  ["Rights & Licensing", "Publishing, synchronization and digital rights opportunities.", "rights"],
];
function scrollToItem(track: HTMLUListElement | null, index: number) {
  const item = track?.children[index] as HTMLElement | undefined;
  if (!track || !item) return;
  track.scrollTo({ left: item.offsetLeft - (track.children[0] as HTMLElement).offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
}
export function LibraryGallery() {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  return <div className={styles.gallery}>
    <ul ref={track} className={styles.galleryTrack} id="library-gallery" aria-label="Content and music highlights" onScroll={() => { const el=track.current; if(el) setActive(Math.round(el.scrollLeft / el.clientWidth)); }}>
      {[['library-hero','A drummer performing'],['library-live','A live music audience'],['library-vocals','A vocalist performing'],['library-culture','A dance performance']].map(([asset,alt],i) => <li key={asset}><Image src={`/images/brand-solutions-and-content-library/${asset}.jpg`} alt={alt} width={1328} height={588} priority={i === 0} sizes="92vw" /></li>)}
    </ul>
    <div className={styles.dots} aria-label="Choose a highlight">{[0,1,2,3].map(i=><button key={i} type="button" aria-label={`Show highlight ${i+1}`} aria-controls="library-gallery" aria-pressed={active===i} onClick={()=>scrollToItem(track.current,i)} />)}</div>
  </div>;
}
export function Catalogue() {
  const track = useRef<HTMLUListElement>(null);
  function move(direction: number) {
    const el=track.current; if(!el) return;
    const step=(el.children[1] as HTMLElement).offsetLeft-(el.children[0] as HTMLElement).offsetLeft;
    scrollToItem(el, Math.max(0,Math.min(categories.length-1,Math.round(el.scrollLeft/step)+direction)));
  }
  return <div>
    <ul ref={track} id="catalogue-track" className={styles.catalogue} aria-label="Content and music catalogues" tabIndex={0}>
      {categories.map(([title, description, asset]) => <li key={title}><Link href="/contact/form" className={styles.catalogueCard} aria-label={`Learn more about ${title}`}><Image src={`/images/brand-solutions-and-content-library/${asset}.jpg`} alt={title} width={1190} height={600} sizes="(max-width: 639px) 88vw, 83vw"/><div className={styles.catalogueBody}><div><h3>{title}</h3><p>{description}</p></div><span className={styles.learnMore}>Learn more <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg></span></div></Link></li>)}
    </ul>
    <div className={styles.controls}><button type="button" onClick={() => move(-1)} aria-label="Previous catalogues" aria-controls="catalogue-track">‹</button><button type="button" onClick={() => move(1)} aria-label="Next catalogues" aria-controls="catalogue-track">›</button></div>
  </div>;
}
