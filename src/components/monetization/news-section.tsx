"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { inter } from "@/lib/fonts";
import styles from "./news-section.module.css";

const articles = [
  {
    title: "Suman Entertainment & Media Pvt. Ltd.",
    description: "Suman Entertainment & Media Pvt. Ltd. brings together platforms, content, technology and experiences under one growing media ecosystem.",
    image: "/images/monetization/Image9.jpg",
    href: "/news-and-blogs/abhijat-marathi-at-cannes-2026",
  },
  {
    title: "Why Kedar Joshi wore this outfit?",
    description: "A closer look at the Cannes 2026 appearance and the cultural thinking behind a distinctive international red-carpet moment.",
    image: "/images/monetization/Image10.jpg",
    href: "/news-and-blogs/inside-bharat-pavilion-cannes-2026",
  },
  {
    title: "Digital Platforms and OTT",
    description: "Suman Entertainment & Media Pvt. Ltd. brings together platforms, content, technology and experiences under one growing media ecosystem.",
    image: "/images/monetization/Image11.png",
    href: "/news-and-blogs",
  },
];

function Caret({ left = false }: { left?: boolean }) {
  return (
    <svg width="6" height="12" viewBox="0 0 8 14" fill="none" aria-hidden="true">
      <path d={left ? "M7 1 1 7l6 6" : "m1 1 6 6-6 6"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function NewsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateEdges = () => {
      const start = track.scrollLeft <= 1;
      const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
      setEdges((previous) => previous.start === start && previous.end === end
        ? previous : { start, end });
    };

    updateEdges();
    track.addEventListener("scroll", updateEdges, { passive: true });
    const observer = new ResizeObserver(updateEdges);
    observer.observe(track);
    for (const card of track.children) observer.observe(card);
    return () => {
      track.removeEventListener("scroll", updateEdges);
      observer.disconnect();
    };
  }, []);

  const move = (direction: number) => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <>
      <section className={styles.news} aria-labelledby="monetization-news-heading">
        <header className={styles.header}>
          <div className={styles.headingGroup}>
            <p className={styles.eyebrow}>LATEST ANNOUNCEMENTS</p>
            <h2 id="monetization-news-heading" className={styles.heading}>News</h2>
          </div>
          <Link href="/news-and-blogs" className={`${styles.viewAll} ${inter.className}`}>
            View all <Caret />
          </Link>
        </header>

        <div
          id="monetization-news-carousel"
          ref={trackRef}
          className={styles.track}
          role="region"
          aria-label="Latest news articles"
          aria-roledescription="carousel"
          tabIndex={0}
        >
          {articles.map((article) => (
            <article key={article.image} className={styles.card}>
              <Link href={article.href} className={styles.imageLink} aria-label={article.title}>
                <Image src={article.image} alt={article.title} fill sizes="(max-width: 768px) 90vw, 654px" className={styles.image} />
              </Link>
              <div className={styles.cardContent}>
                <div className={`${styles.metadata} ${inter.className}`}>
                  <span className={styles.tag}>New launches</span>
                  <time dateTime="2026-08-07">Aug 7, 2026</time>
                </div>
                <h3 className={styles.cardHeading}><Link href={article.href}>{article.title}</Link></h3>
                <p className={styles.description}>{article.description}</p>
                <Link href={article.href} className={`${styles.readMore} ${inter.className}`} aria-label={`Read more: ${article.title}`}>
                  Read more <Caret />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.controls}>
          <button type="button" className={styles.arrow} onClick={() => move(-1)} disabled={edges.start} aria-label="Previous news" aria-controls="monetization-news-carousel"><Caret left /></button>
          <button type="button" className={styles.arrow} onClick={() => move(1)} disabled={edges.end} aria-label="Next news" aria-controls="monetization-news-carousel"><Caret /></button>
        </div>
      </section>

      <section className={styles.contactBanner} aria-labelledby="have-content-heading">
        <Image src="/images/monetization/Image12.jpg" alt="" fill sizes="100vw" className={styles.bannerImage} />
        <div className={styles.bannerContent}>
          <h2 id="have-content-heading" className={styles.bannerHeading}>Have Content?<br />Let&apos;s Find Its Revenue Model.</h2>
          <Link href="/contact" className={`${styles.contactLink} ${inter.className}`}>Contact us <Caret /></Link>
        </div>
        <Image src="/images/abhijat-logo.png" alt="Abhijat Studios" width={75} height={80} className={styles.bannerLogo} />
      </section>
    </>
  );
}
