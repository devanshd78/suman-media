"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./capital-market-sections.module.css";

const steps = [
  { title: "Understand", description: "Company, business, market and objectives", icon: "Student" },
  { title: "Position", description: "Define the core investment story", icon: "TreasureChest" },
  { title: "Communicate", description: "Build the right content and communication assets", icon: "MicrophoneStage" },
  { title: "Engage", description: "Reach investors and relevant stakeholders", icon: "Chats" },
  { title: "Maintain", description: "Support ongoing financial communication", icon: "ThumbsUp" },
];

// Images and expansion weights from the monetization content gallery.
const cases = [
  { image: "/images/monetization/Image5.jpg", title: "How we helped Laminar IPO with 50X growth" },
  { image: "/images/monetization/Image6.jpg", title: "Platform Experience" },
  { image: "/images/monetization/Image7.png", title: "Digital Distribution" },
  { image: "/images/monetization/Image8.jpg", title: "Audience Growth" },
];

export default function CapitalMarketSections() {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const style = getComputedStyle(stage);
      if (style.position !== "sticky") return;
      const distance = track.offsetHeight - stage.offsetHeight;
      const offset = parseFloat(style.top) || 0;
      const travelled = offset - track.getBoundingClientRect().top;
      setProgress(distance > 0 ? Math.min(1, Math.max(0, travelled / distance)) : 0);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(track);
    observer.observe(stage);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Hold the first and last images briefly at either end of the pinned section.
  const position = Math.min(1, Math.max(0, (progress - 0.08) / 0.84)) * (cases.length - 1);

  return (
    <>
      <section className={styles.process} aria-labelledby="capital-process-heading">
        <header className={styles.processIntro}>
          <p className={styles.eyebrow}>HOW IT GET STARTS</p>
          <h2 id="capital-process-heading">From Company Story to Market Communication</h2>
          <p className={styles.description}>
            The model may change, but the journey stays connected — from understanding
            the content and audience to launching, distributing and optimising the platform.
          </p>
        </header>
        <div className={styles.steps}>
          {steps.map((step) => (
            <article key={step.title} className={styles.step}>
              <Image src={`/images/capital/icons/${step.icon}.svg`} alt="" width={56} height={56} />
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section ref={trackRef} className={styles.caseTrack} aria-labelledby="capital-cases-heading">
        <div ref={stageRef} className={styles.caseStage}>
          <header className={styles.caseIntro}>
            <p className={styles.eyebrow}>CASE STUDIES</p>
            <h2 id="capital-cases-heading">
              From Strategy to Market Impact.{" "}
              <span>how Suman brings together content, platforms, distribution and communication
                to create meaningful outcomes for brands, audiences and partners.</span>
            </h2>
          </header>
          <div className={styles.gallery}>
            {cases.map((item, index) => {
              const strength = Math.max(0, 1 - Math.abs(position - index));
              return (
                <article key={item.image} className={styles.caseCard} style={{ flexGrow: 1 + strength * 15.08 }}>
                  <div className={styles.imageFrame}>
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 767px) 100vw, 85vw" className={styles.image} />
                    <span className={styles.shade} style={{ opacity: 0.08 * (1 - strength) }} aria-hidden="true" />
                  </div>
                  <h3 className={styles.caption} style={{ opacity: Math.min(1, Math.max(0, (strength - 0.25) / 0.75)) }}>{item.title}</h3>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
