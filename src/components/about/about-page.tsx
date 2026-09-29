"use client";

import Image from "@/components/ui/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Children,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { plusJakartaSans } from "@/lib/fonts";

import styles from "./about-page.module.css";

type CarouselProps = {
  ariaLabel: string;
  children: ReactNode;
  autoplayMs?: number;
  className?: string;
  controls?: boolean;
  dots?: boolean;
};

type TimelineItem = {
  year: string;
  title: string;
  image: string;
  imageAlt: string;
};

type ImageSlide = {
  src: string;
  alt: string;
};

const BRAND_LOGOS = [
  {
    src: "/images/fast-channel/abhijat-marathi-ott-logo.webp",
    alt: "Abhijat Marathi OTT",
  },
  {
    src: "/images/fast-channel/suman-music-marathi-logo.webp",
    alt: "Suman Music Marathi",
  },
  {
    src: "/images/fast-channel/suman-bhakti-logo.webp",
    alt: "Suman Bhakti",
  },
  {
    src: "/images/fast-channel/adlibs-production-logo.webp",
    alt: "Adlibs Production",
  },
  {
    src: "/images/fast-channel/adidev-bhakti-logo.webp",
    alt: "Adidev Bhakti",
  },
  {
    src: "/images/fast-channel/abhijat-marathi-vishesh-logo.webp",
    alt: "Abhijat Marathi Vishesh",
  },
  {
    src: "/images/fast-channel/suman-music-bhakti-logo.webp",
    alt: "Suman Music Bhakti",
  },
];

const MISSION_IMAGES: ImageSlide[] = [
  {
    src: "/images/about/mission-01.webp",
    alt: "Suman Entertainment delegation at an international cultural event",
  },
  {
    src: "/images/about/mission-02.webp",
    alt: "Guests at an international media event",
  },
  {
    src: "/images/about/mission-03.webp",
    alt: "Suman Entertainment representatives at an international gathering",
  },
  {
    src: "/images/about/mission-04.webp",
    alt: "Cultural delegation on a red carpet",
  },
  {
    src: "/images/about/timeline-2026.webp",
    alt: "Group representing Marathi culture at an international event",
  },
];

const TIMELINE: TimelineItem[] = [
  {
    year: "2021",
    title: "Suman Entertainment & Media incorporated.",
    image: "/images/about/timeline-2021.webp",
    imageAlt: "Suman Entertainment office",
  },
  {
    year: "2022",
    title:
      "Built a full-stack digital marketing, content and reputation management business.",
    image: "/images/about/timeline-2022.webp",
    imageAlt: "Team working in a Suman Entertainment office",
  },
  {
    year: "2025",
    title:
      "Launched Abhijat Marathi OTT, a dedicated Marathi-language streaming platform.",
    image: "/images/about/timeline-2025.webp",
    imageAlt: "Abhijat Marathi platform launch event",
  },
  {
    year: "2026",
    title:
      "Abhijat Marathi Global Alpha Launch at Cannes, marking a major international positioning for Marathi cinema and culture.",
    image: "/images/about/timeline-2026.webp",
    imageAlt: "Marathi cultural delegation at Cannes",
  },
  {
    year: "2027",
    title: "Suman Entertainment is going public by 2027.",
    image: "/images/about/timeline-2027.webp",
    imageAlt: "Stock exchange listing concept for Suman Entertainment",
  },
  {
    year: "2029",
    title:
      "Began building a global Marathi diaspora strategy, with the ambition of creating a 1-crore-member Marathi family by 2029.",
    // The supplied 2027 and 2029 timeline references use the same exchange visual.
    // Reuse one optimized asset instead of shipping a duplicate file.
    image: "/images/about/timeline-2027.webp",
    imageAlt: "Suman Entertainment global growth roadmap",
  },
];

const NOTABLE_IMAGES: ImageSlide[] = [
  {
    src: "/images/about/notable-01.webp",
    alt: "Portrait from the Suman Entertainment personalities archive",
  },
  {
    src: "/images/about/notable-02.webp",
    alt: "Portrait from the Suman Entertainment personalities archive",
  },
  {
    src: "/images/about/notable-03.webp",
    alt: "Portrait from the Suman Entertainment personalities archive",
  },
  {
    src: "/images/about/notable-04.webp",
    alt: "Portrait from the Suman Entertainment personalities archive",
  },
];

const NOTABLE_NAMES = [
  "Ashok Saraf",
  "Prajakta Mali",
  "Nivedita Saraf",
  "Sayali Sanjeev",
  "Ankita Walawalkar",
  "Deesha Katkar",
  "Jayanti Waghdhare",
];

const GOVERNMENT_IMAGES: ImageSlide[] = [
  {
    src: "/images/about/government-01.webp",
    alt: "Abhijat Marathi event with Government of Maharashtra representatives",
  },
  {
    src: "/images/about/government-02.webp",
    alt: "Abhijat Marathi launch ceremony",
  },
  {
    src: "/images/about/government-03.webp",
    alt: "Suman Entertainment at a public cultural event",
  },
  {
    src: "/images/about/government-04.webp",
    alt: "Suman Entertainment recognition moment",
  },
];

const MEDIA_NAMES = [
  "ANI",
  "ThePrint",
  "ABP Majha",
  "Brut.",
  "REPUBLIC",
  "THE WIRE",
  "Sakal",
  "FORTUNE",
  "Business Standard",
  "The Tribune",
  "Pudhari",
  "Lokmat Filmy",
];

const NEWS_ITEMS = [
  {
    image: "/images/about/news-01.webp",
    title: "Suman Entertainment & Media Pvt. Ltd.",
    date: "Aug 7, 2026",
  },
  {
    image: "/images/about/news-02.webp",
    title: "Why Kedar Joshi wore this outfit?",
    date: "Aug 7, 2026",
  },
  {
    image: "/images/about/news-03.webp",
    title: "Digital Platforms and OTT",
    date: "Aug 7, 2026",
  },
];

const CONTACT_CARDS = [
  {
    image: "/images/about/contact-01.webp",
    eyebrow: "Contact us",
    title: "Start a conversation with our team.",
    cta: "Contact us",
    href: "/contact",
  },
  {
    image: "/images/about/contact-02.webp",
    eyebrow: "Partner with us",
    title:
      "From films and music to technology and distribution, create, build and reach new audiences with us.",
    cta: "Become a partner",
    href: "/partners",
  },
  {
    image: "/images/about/contact-03.webp",
    eyebrow: "Grow with us",
    title:
      "Join a growing media ecosystem built around content, technology, regional IP and global opportunities.",
    cta: "Explore opportunities",
    href: "/careers",
  },
];

function ArrowIcon({ left = false }: { left?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={left ? styles.arrowIconLeft : styles.arrowIcon}
    >
      <path
        d="M4 10h12M11 5l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function useCarouselActiveIndex(
  railRef: RefObject<HTMLDivElement | null>,
  itemCount: number,
) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || itemCount < 2) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const center = rail.scrollLeft + rail.clientWidth / 2;
      const items = Array.from(
        rail.querySelectorAll<HTMLElement>("[data-carousel-item]"),
      );

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      items.forEach((item, index) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(itemCenter - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex((current) =>
        current === closestIndex ? current : closestIndex,
      );
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    rail.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();

    return () => {
      window.cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [itemCount, railRef]);

  return [activeIndex, setActiveIndex] as const;
}

function DragCarousel({
  ariaLabel,
  children,
  autoplayMs,
  className = "",
  controls = true,
  dots = true,
}: CarouselProps) {
  const items = useMemo(() => Children.toArray(children), [children]);
  const railRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() === true;
  const [activeIndex, setActiveIndex] = useCarouselActiveIndex(
    railRef,
    items.length,
  );
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const paused = hovered || focused || dragging;
  const pointerState = useRef({
    id: -1,
    startX: 0,
    startScrollLeft: 0,
  });

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const rail = railRef.current;
      if (!rail || items.length === 0) return;

      const normalized = ((index % items.length) + items.length) % items.length;
      const item = rail.querySelectorAll<HTMLElement>("[data-carousel-item]")[
        normalized
      ];
      if (!item) return;

      rail.scrollTo({ left: item.offsetLeft, behavior });
      setActiveIndex(normalized);
    },
    [items.length, setActiveIndex],
  );

  useEffect(() => {
    if (!autoplayMs || autoplayMs < 1000 || reducedMotion || paused) return;
    if (items.length < 2) return;

    const timer = window.setInterval(() => {
      scrollToIndex((activeIndex + 1) % items.length);
    }, autoplayMs);

    return () => window.clearInterval(timer);
  }, [activeIndex, autoplayMs, items.length, paused, reducedMotion, scrollToIndex]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail) return;

    pointerState.current = {
      id: event.pointerId,
      startX: event.clientX,
      startScrollLeft: rail.scrollLeft,
    };

    rail.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    const pointer = pointerState.current;
    if (!rail || pointer.id !== event.pointerId) return;

    const delta = event.clientX - pointer.startX;
    rail.scrollLeft = pointer.startScrollLeft - delta;
  };

  const finishPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    const pointer = pointerState.current;
    if (!rail || pointer.id !== event.pointerId) return;

    if (rail.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }

    pointerState.current.id = -1;
    setDragging(false);
  };

  return (
    <div
      className={`${styles.carousel} ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={() => setFocused(false)}
    >
      <div
        ref={railRef}
        className={styles.carouselRail}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        data-dragging={dragging}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={finishPointer}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollToIndex(activeIndex - 1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollToIndex(activeIndex + 1);
          }
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            data-carousel-item
            className={styles.carouselItem}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${items.length}`}
          >
            {item}
          </div>
        ))}
      </div>

      {(controls || dots) && items.length > 1 ? (
        <div className={styles.carouselControls}>
          {dots ? (
            <div className={styles.carouselDots} aria-label="Slide position">
              {items.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={styles.carouselDot}
                  data-active={activeIndex === index}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  onClick={() => scrollToIndex(index)}
                />
              ))}
            </div>
          ) : (
            <span />
          )}

          {controls ? (
            <div className={styles.carouselArrows}>
              <button
                type="button"
                className={styles.carouselArrow}
                aria-label="Previous slide"
                onClick={() => scrollToIndex(activeIndex - 1)}
              >
                <ArrowIcon left />
              </button>
              <button
                type="button"
                className={styles.carouselArrow}
                aria-label="Next slide"
                onClick={() => scrollToIndex(activeIndex + 1)}
              >
                <ArrowIcon />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function SectionEyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={styles.eyebrow} data-dark={dark}>
      {children}
    </p>
  );
}

function AboutIntro() {
  return (
    <section className={`${styles.aboutIntro} site-section`}>
      <div className={styles.twoColumnIntro}>
        <SectionEyebrow>ABOUT SUMAN ENTERTAINMENT</SectionEyebrow>
        <h2 className={styles.aboutIntroHeading}>
          Suman Entertainment &amp; Media is building an integrated ecosystem across
          entertainment, content, digital platforms, technology and communications —{" "}
          <span>rooted in Marathi culture and designed for a global audience.</span>
        </h2>
      </div>

      <div className={styles.brandRail} aria-label="Suman Entertainment ecosystem brands">
        {BRAND_LOGOS.map((brand) => (
          <div className={styles.brandLogo} key={brand.src}>
            <Image
              src={brand.src}
              alt={brand.alt}
              fill
              sizes="(min-width: 1024px) 12vw, (min-width: 640px) 20vw, 35vw"
              className={styles.containImage}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function StickyGlobalReach() {
  const stageRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion() === true;
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 28,
    restDelta: 0.001,
  });

  const pairOpacity = useTransform(progress, [0, 0.36, 0.52], [1, 1, 0]);
  const pairY = useTransform(progress, [0, 0.42], [0, -80]);
  const pairScale = useTransform(progress, [0, 0.38], [1, 1.035]);
  const storyOpacity = useTransform(progress, [0.36, 0.54], [0, 1]);
  const storyScale = useTransform(progress, [0.34, 1], [1.08, 1]);
  const storyCopyOpacity = useTransform(progress, [0.5, 0.68], [0, 1]);
  const surface = useTransform(
    progress,
    [0, 0.36, 0.52],
    ["#ffffff", "#ffffff", "#050505"],
  );

  return (
    <>
      <section className={`${styles.globalHeader} site-section`}>
        <div className={styles.twoColumnIntro}>
          <SectionEyebrow>GLOBAL REACH</SectionEyebrow>
          <h2 className={styles.sectionHeading}>
            More than what we do.
            <br />
            <span>It&apos;s why we do it.</span>
          </h2>
        </div>
      </section>

      <section ref={stageRef} className={styles.globalStage} aria-label="Global reach story">
        <motion.div
          className={styles.globalSticky}
          style={reducedMotion ? undefined : { backgroundColor: surface }}
        >
          <motion.div
            className={styles.globalPair}
            style={
              reducedMotion
                ? undefined
                : { opacity: pairOpacity, y: pairY, scale: pairScale }
            }
          >
            <figure className={styles.globalPairCard}>
              <Image
                src="/images/about/global-reach-press.webp"
                alt="Suman Entertainment at a media and cultural event"
                fill
                sizes="(min-width: 900px) 46vw, 92vw"
                className={styles.coverImage}
              />
            </figure>
            <figure className={styles.globalPairCard}>
              <Image
                src="/images/about/global-reach-launch.webp"
                alt="Abhijat Marathi launch ceremony"
                fill
                sizes="(min-width: 900px) 46vw, 92vw"
                className={styles.coverImage}
              />
            </figure>
          </motion.div>

          <motion.div
            className={styles.globalStory}
            style={
              reducedMotion
                ? undefined
                : { opacity: storyOpacity, scale: storyScale }
            }
          >
            <Image
              src="/images/about/global-reach-story.webp"
              alt="Backlit figure representing media, culture and performance"
              fill
              sizes="100vw"
              className={styles.coverImage}
            />
            <div className={styles.globalStoryShade} />
            <motion.div
              className={`${styles.globalStoryCopy} site-gutter`}
              style={reducedMotion ? undefined : { opacity: storyCopyOpacity }}
            >
              <p>
                More than what we do.
                <br />
                <strong>It&apos;s why we do it.</strong>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

function MissionSection() {
  return (
    <section className={styles.missionSection}>
      <div className={`${styles.missionCopy} site-section`}>
        <p>
          At the heart of our mission is the vision of taking the Marathi language
          to the world. We are dedicated to promoting, preserving, and expanding
          the reach of Marathi through technology, innovation, and meaningful
          digital experiences — connecting Marathi speakers globally and
          introducing the richness of the language to a wider audience.
        </p>

        <div className={styles.statsGrid} aria-label="Suman Entertainment statistics">
          <div className={styles.statItem}>
            <strong>100+</strong>
            <span>Projects delivered</span>
          </div>
          <div className={styles.statItem}>
            <strong>00mn</strong>
            <span>People reached</span>
          </div>
          <div className={styles.statItem}>
            <strong>10+</strong>
            <span>Markets served</span>
          </div>
        </div>
      </div>

      <div className={styles.missionGallery} aria-label="Global Suman Entertainment moments">
        {MISSION_IMAGES.map((item, index) => (
          <figure className={styles.missionGalleryCard} key={item.src} data-tall={index % 3 === 0}>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 24vw, (min-width: 640px) 38vw, 64vw"
              className={styles.coverImage}
            />
          </figure>
        ))}
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section className={`${styles.timelineSection} site-section`}>
      <div className={styles.timelineHeadingRow}>
        <div>
          <SectionEyebrow dark>OUR JOURNEY</SectionEyebrow>
          <h2 className={styles.darkHeading}>
            From where we started to where we&apos;re going.
          </h2>
        </div>
        <p className={styles.timelineSubheading}>
          Every milestone has shaped the organization we are today.
        </p>
      </div>

      <DragCarousel
        ariaLabel="Suman Entertainment interactive timeline"
        autoplayMs={5600}
        className={styles.timelineCarousel}
      >
        {TIMELINE.map((item) => (
          <article className={styles.timelineSlide} key={item.year}>
            <div className={styles.timelineCopy}>
              <span className={styles.timelineYear}>{item.year.slice(2)}</span>
              <h3>{item.title}</h3>
            </div>
            <figure className={styles.timelineImage}>
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(min-width: 1024px) 48vw, 90vw"
                className={styles.coverImage}
              />
            </figure>
          </article>
        ))}
      </DragCarousel>
    </section>
  );
}

function LeadershipSection() {
  return (
    <section className={`${styles.leadershipSection} site-section`}>
      <div className={styles.leadershipHeading}>
        <SectionEyebrow dark>LEADERSHIP</SectionEyebrow>
        <h2 className={styles.darkHeading}>The people shaping our next chapter.</h2>
        <p>
          Our leadership brings together experience, diverse perspectives and a
          shared ambition to move the organisation forward.
        </p>
      </div>

      <div className={styles.leadershipGrid}>
        <article className={styles.leaderCard}>
          <div className={styles.leaderMonogram} aria-hidden="true">
            KJ
          </div>
          <div>
            <h3>Kedar Joshi</h3>
            <p>Founder and CEO</p>
          </div>
        </article>
      </div>
    </section>
  );
}

function NotablePersonalitiesSection() {
  return (
    <section className={`${styles.notableSection} site-section`}>
      <div className={styles.sectionHeadingRow}>
        <div>
          <SectionEyebrow>PEOPLE &amp; CULTURE</SectionEyebrow>
          <h2 className={styles.sectionHeading}>Notable personalities</h2>
        </div>
        <p>Selected moments from the Suman Entertainment archive.</p>
      </div>

      <DragCarousel
        ariaLabel="Notable personalities image gallery"
        controls
        dots={false}
        className={styles.notableCarousel}
      >
        {NOTABLE_IMAGES.map((item) => (
          <figure className={styles.notableCard} key={item.src}>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 24vw, (min-width: 640px) 42vw, 76vw"
              className={styles.coverImage}
            />
          </figure>
        ))}
      </DragCarousel>

      <div className={styles.nameChips} aria-label="Notable personalities listed in the supplied reference">
        {NOTABLE_NAMES.map((name) => (
          <span key={name}>{name}</span>
        ))}
      </div>
    </section>
  );
}

function GovernmentSection() {
  return (
    <section className={`${styles.governmentSection} site-section`}>
      <div className={styles.governmentHeading}>
        <SectionEyebrow>AWARDS AND RECOGNITIONS</SectionEyebrow>
        <h2 className={styles.sectionHeading}>
          Empaneled with the Government of Maharashtra
        </h2>
        <p>
          Abhijat Marathi OTT is Maharashtra&apos;s first dedicated regional streaming
          platform for Marathi cinema, theatre, and culture, launched officially by
          Chief Minister Devendra Fadnavis.
        </p>
      </div>

      <DragCarousel
        ariaLabel="Government of Maharashtra recognition slideshow"
        autoplayMs={4800}
        className={styles.governmentCarousel}
      >
        {GOVERNMENT_IMAGES.map((item) => (
          <figure className={styles.governmentSlide} key={item.src}>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 78vw, 94vw"
              className={styles.coverImage}
            />
          </figure>
        ))}
      </DragCarousel>
    </section>
  );
}

function MediaCoverageSection() {
  return (
    <section className={`${styles.mediaSection} site-section`}>
      <div className={styles.mediaHeading}>
        <SectionEyebrow>MEDIA COVERAGE</SectionEyebrow>
        <h2 className={styles.sectionHeading}>Featured media</h2>
      </div>
      <div className={styles.mediaGrid}>
        {MEDIA_NAMES.map((name) => (
          <div className={styles.mediaLogoText} key={name}>
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}

function NewsSection() {
  return (
    <section className={`${styles.newsSection} site-section`}>
      <div className={styles.sectionHeadingRow}>
        <div>
          <SectionEyebrow>LATEST ANNOUNCEMENTS</SectionEyebrow>
          <h2 className={styles.sectionHeading}>News</h2>
        </div>
        <Link className={styles.textLink} href="/news-and-blogs">
          View all <ArrowIcon />
        </Link>
      </div>

      <div className={styles.newsGrid}>
        {NEWS_ITEMS.map((item) => (
          <article className={styles.newsCard} key={item.title}>
            <Link href="/news-and-blogs" className={styles.newsImageLink}>
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 92vw"
                className={styles.coverImage}
              />
            </Link>
            <div className={styles.newsMeta}>
              <span>New launches</span>
              <span>{item.date}</span>
            </div>
            <h3>
              <Link href="/news-and-blogs">{item.title}</Link>
            </h3>
            <Link className={styles.readMore} href="/news-and-blogs">
              Read more <ArrowIcon />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactCardsSection() {
  return (
    <section className={`${styles.contactCardsSection} site-section`}>
      <div className={styles.contactCardsGrid}>
        {CONTACT_CARDS.map((card) => (
          <article className={styles.contactCard} key={card.eyebrow}>
            <figure className={styles.contactCardImage}>
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw"
                className={styles.coverImage}
              />
            </figure>
            <SectionEyebrow>{card.eyebrow}</SectionEyebrow>
            <h3>{card.title}</h3>
            <Link className={styles.textLink} href={card.href}>
              {card.cta} <ArrowIcon />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function CareersBanner() {
  return (
    <section className={`${styles.careersBanner} site-gutter`}>
      <div className={styles.careersBannerInner}>
        <Image
          src="/images/about/join-banner.webp"
          alt="Suman Entertainment team in the workplace"
          fill
          sizes="100vw"
          className={styles.coverImage}
        />
        <div className={styles.careersBannerShade} />
        <div className={styles.careersBannerCopy}>
          <SectionEyebrow dark>CAREERS</SectionEyebrow>
          <h2>Join us to start a New Chapter in Media and Entertainment</h2>
          <Link href="/careers" className={styles.lightButton}>
            View Open Roles <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}

function AboutHero() {
  return (
    <section className={styles.hero} aria-labelledby="about-hero-title">
      <Image
        src="/images/about/hero-office.webp"
        alt="Suman Entertainment office interior"
        fill
        priority
        sizes="100vw"
        className={styles.heroImage}
      />
      <div className={styles.heroShade} />
      <h1 id="about-hero-title" className={`${styles.heroTitle} site-gutter`}>
        <span>About</span>
        <span>us</span>
      </h1>
    </section>
  );
}

export function AboutPageContent() {
  return (
    <main className={`${styles.page} ${plusJakartaSans.className}`}>
      <AboutHero />
      <AboutIntro />
      <StickyGlobalReach />
      <MissionSection />
      <TimelineSection />
      <LeadershipSection />
      <NotablePersonalitiesSection />
      <GovernmentSection />
      <MediaCoverageSection />
      <NewsSection />
      <ContactCardsSection />
      <CareersBanner />
    </main>
  );
}
