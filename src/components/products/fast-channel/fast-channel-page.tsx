"use client";

import Image from "@/components/ui/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { inter, plusJakartaSans } from "@/lib/fonts";

import styles from "./fast-channel-page.module.css";

type Channel = {
  id: string;
  name: string;
  handle: string;
  subscribers: string;
  views: string;
  category: string;
  description: string;
  image: string;
  logo?: string;
  logoLabel?: string;
  imagePosition?: string;
};

type NewsItem = {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
  imagePosition?: string;
};

const CHANNELS: readonly Channel[] = [
  {
    id: "suman-music-marathi",
    name: "Suman Music Marathi",
    handle: "@sumanmusicmarathi",
    subscribers: "243K",
    views: "1.63M",
    category: "Music",
    description:
      "Suman Entertainment and Media Pvt Ltd is a Marathi music channel dedicated to the Marathi music community. Here, we showcase Marathi music, musical art, song lyrics, and promote indie artists. Our mission is to present Marathi music on a global platform and support new talents for technological advancements.",
    image: "/images/fast-channel/suman-music-marathi.webp",
    logo: "/images/fast-channel/suman-music-marathi-logo.webp",
  },
  {
    id: "abhijat-marathi-ott",
    name: "Abhijat Marathi OTT",
    handle: "@abhijaatmarathiott",
    subscribers: "128K",
    views: "147.3K",
    category: "Culture and Marathi Language",
    description:
      "Abhijat Marathi OTT brings you the richness of Marathi cinema, web series, comedy and Non Fiction content on YouTube. From timeless classics to bold new stories, we celebrate the essence of Marathi culture, language, and creativity. Whether you are in Maharashtra or anywhere across the globe, Abhijat Marathi connects every Marathi heart.",
    image: "/images/fast-channel/abhijat-marathi-ott.webp",
    logo: "/images/fast-channel/abhijat-marathi-ott-logo.webp",
  },
  {
    id: "pba-music",
    name: "PBA Music",
    handle: "@pbamusicofficial",
    subscribers: "23K",
    views: "8.809K",
    category: "Music",
    description:
      "We are lovers of music who collaborate with some of the finest independent artists and labels within India and around the world. We specialize in marketing, promoting, distributing and licensing great records. Our mission is to empower artists to thrive independently, with honesty, creative thinking and passion.",
    image: "/images/fast-channel/pba-music.webp",
    logoLabel: "PBA",
  },
  {
    id: "adlibs-production",
    name: "Adlibs Production",
    handle: "@adlibsproduction",
    subscribers: "22K",
    views: "8.80K",
    category: "Music",
    description: "Film Production House",
    image: "/images/fast-channel/adlibs-production.webp",
    logo: "/images/fast-channel/adlibs-production-logo.webp",
  },
  {
    id: "adidev-bhakti",
    name: "Adidev Bhakti",
    handle: "@adidevbhakti",
    subscribers: "90K",
    views: "451K",
    category: "Devotion",
    description:
      "India is a land of multiple faiths and religions but one spirit. Being spiritual is getting connected to the universe. Adidev Bhakti offers thousands of religious songs, bhakti geets and bhajans, with daily updates dedicated to Gods, Goddesses and Deities.",
    image: "/images/fast-channel/adidev-bhakti.webp",
    logo: "/images/fast-channel/adidev-bhakti-logo.webp",
  },
  {
    id: "abhijat-marathi-vishesh",
    name: "Abhijat Marathi Vishesh",
    handle: "@abhijatmarathivishesh",
    subscribers: "16K",
    views: "7.241K",
    category: "Current Affairs",
    description:
      "Abhijat Marathi Vishesh brings Marathi audiences current affairs, conversations, interviews and special programming through a channel rooted in Marathi culture, language and identity.",
    image: "/images/fast-channel/abhijat-marathi-vishesh.webp",
    logo: "/images/fast-channel/abhijat-marathi-vishesh-logo.webp",
  },
  {
    id: "suman-music-bhakti",
    name: "Suman Music Bhakti",
    handle: "@sumanmusicbhakti",
    subscribers: "31K",
    views: "164.58K",
    category: "Devotion",
    description:
      "Suman Entertainment Music aspires to be the go-to music platform for upcoming musicians to showcase their talents and for the new-age listener who wants to be musically nourished. Music awakens the mind and the soul at the same time.",
    image: "/images/fast-channel/suman-music-bhakti.webp",
    logo: "/images/fast-channel/suman-music-bhakti-logo.webp",
  },
  {
    id: "abhijat-marathi-filmy",
    name: "Abhijat Marathi Filmy",
    handle: "@abhijatmarathifilmy",
    subscribers: "34.4K",
    views: "329K",
    category: "Films & Entertainment",
    description:
      "Movies are just the beginning. We bring you stories behind the screen, filmy thoughts, stories, celebrity bytes, real talks and more. Abhijat Marathi Filmy is made for hearts that feel cinema.",
    image: "/images/fast-channel/abhijat-marathi-filmy.webp",
    logo: "/images/fast-channel/abhijat-marathi-filmy-logo.webp",
  },
  {
    id: "suman-bhakti",
    name: "Suman Bhakti",
    handle: "@sumanbhakti1",
    subscribers: "71.8K",
    views: "10.92K",
    category: "Devotion",
    description:
      "Suman Entertainment Music aspires to be the go-to music platform for upcoming musicians to showcase their talents and for the new-age listener who wants to be musically nourished, while presenting Marathi and regional music across languages.",
    image: "/images/fast-channel/suman-bhakti.webp",
    logo: "/images/fast-channel/suman-bhakti-logo.webp",
  },
] as const;

const NEWS: readonly NewsItem[] = [
  {
    id: "suman-media-ecosystem",
    category: "New launches",
    date: "Aug 7, 2026",
    title: "Suman Entertainment & Media Pvt. Ltd.",
    excerpt:
      "Suman Entertainment & Media Pvt. Ltd. brings together platforms, content, technology and experiences under one growing media ecosystem.",
    image: "/images/fast-channel/news-suman.webp",
    href: "/news-and-blogs/abhijat-marathi-at-cannes-2026",
  },
  {
    id: "kedar-joshi-cannes",
    category: "New launches",
    date: "Aug 7, 2026",
    title: "Why Kedar Joshi wore this outfit?",
    excerpt:
      "A closer look at the Cannes 2026 appearance and the cultural thinking behind a distinctive international red-carpet moment.",
    image: "/images/fast-channel/news-kedar.webp",
    href: "/news-and-blogs/inside-bharat-pavilion-cannes-2026",
  },
  {
    id: "digital-platforms-ott",
    category: "New launches",
    date: "Aug 7, 2026",
    title: "Digital Platforms and OTT",
    excerpt:
      "How always-on channels, connected TV and digital distribution can extend regional stories to audiences across devices and markets.",
    image: "/images/fast-channel/news-digital-ott.webp",
    href: "/news-and-blogs",
    imagePosition: "center",
  },
] as const;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const blockVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.92,
      ease: EASE,
      staggerChildren: 0.12,
      delayChildren: 0.04,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.86, ease: EASE },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "112%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.92, ease: EASE },
  },
};

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path
        d={
          direction === "right"
            ? "M4 10h11M11 6l4 4-4 4"
            : "M16 10H5M9 6l-4 4 4 4"
        }
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8.5 16 12l-6 3.5v-7Z" fill="currentColor" />
    </svg>
  );
}

function SubscribersIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 28 28" fill="none">
      <path d="M17.989 21.397C18.0751 21.529 18.124 21.6819 18.1304 21.8393C18.1368 21.9968 18.1006 22.1531 18.0255 22.2917C17.9504 22.4303 17.8393 22.546 17.7039 22.6267C17.5685 22.7074 17.4138 22.75 17.2562 22.75H1.11903C0.96142 22.75 0.806737 22.7074 0.671329 22.6267C0.535921 22.546 0.424815 22.4303 0.349749 22.2917C0.274684 22.1531 0.238447 21.9968 0.244867 21.8393C0.251287 21.6819 0.300125 21.529 0.386221 21.397C1.6179 19.5011 3.42957 18.0543 5.55091 17.2725C4.37819 16.4917 3.48785 15.3543 3.01155 14.0285C2.53525 12.7026 2.49828 11.2586 2.9061 9.91012C3.31393 8.56161 4.1449 7.38013 5.27613 6.54041C6.40736 5.7007 7.77879 5.24731 9.18763 5.24731C10.5965 5.24731 11.9679 5.7007 13.0991 6.54041C14.2304 7.38013 15.0613 8.56161 15.4692 9.91012C15.877 11.2586 15.84 12.7026 15.3637 14.0285C14.8874 15.3543 13.9971 16.4917 12.8243 17.2725C14.9457 18.0543 16.7574 19.5011 17.989 21.397ZM27.6042 21.3806C26.3722 19.4927 24.5646 18.0521 22.4493 17.2725C23.8338 16.3399 24.8108 14.9148 25.1816 13.2872C25.5524 11.6597 25.289 9.95199 24.445 8.51179C23.6011 7.07159 22.24 6.00711 20.6389 5.53504C19.0378 5.06297 17.317 5.21878 15.8267 5.97076C15.7697 6.00018 15.7199 6.04177 15.6808 6.09259C15.6416 6.14341 15.6142 6.2022 15.6003 6.26482C15.5864 6.32743 15.5865 6.39233 15.6004 6.45492C15.6144 6.51751 15.642 6.57626 15.6812 6.62701C16.7894 8.0093 17.4258 9.71011 17.4972 11.4803C17.5687 13.2505 17.0714 14.9971 16.0783 16.4642C16.0141 16.5601 15.9903 16.6774 16.0123 16.7907C16.0342 16.904 16.1 17.004 16.1953 17.069C17.4902 17.9728 18.5987 19.1177 19.4601 20.4411C19.8076 20.9731 19.9495 21.6135 19.8593 22.2425C19.8492 22.305 19.8528 22.3691 19.8698 22.4301C19.8869 22.4912 19.917 22.5478 19.9581 22.5961C19.9992 22.6443 20.0503 22.6831 20.1078 22.7097C20.1654 22.7362 20.228 22.75 20.2914 22.75H26.8867C27.0794 22.75 27.2667 22.6865 27.4195 22.5692C27.5724 22.4519 27.6823 22.2875 27.7322 22.1014C27.7626 21.979 27.7669 21.8516 27.7449 21.7274C27.7228 21.6032 27.6749 21.485 27.6042 21.3806Z" fill="currentColor" />
    </svg>
  );
}

function ViewsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 28 28" fill="none">
      <path d="M27.0495 13.6456C27.0112 13.5592 26.0848 11.5041 24.0253 9.44453C21.2811 6.70031 17.815 5.25 14 5.25C10.185 5.25 6.7189 6.70031 3.97468 9.44453C1.91515 11.5041 0.984365 13.5625 0.950458 13.6456C0.900707 13.7575 0.875 13.8786 0.875 14.0011C0.875 14.1236 0.900707 14.2447 0.950458 14.3566C0.98874 14.443 1.91515 16.497 3.97468 18.5566C6.7189 21.2997 10.185 22.75 14 22.75C17.815 22.75 21.2811 21.2997 24.0253 18.5566C26.0848 16.497 27.0112 14.443 27.0495 14.3566C27.0993 14.2447 27.125 14.1236 27.125 14.0011C27.125 13.8786 27.0993 13.7575 27.0495 13.6456ZM14 18.375C13.1347 18.375 12.2888 18.1184 11.5694 17.6377C10.8499 17.1569 10.2892 16.4737 9.95802 15.6742C9.62688 14.8748 9.54024 13.9951 9.70905 13.1465C9.87786 12.2978 10.2945 11.5183 10.9064 10.9064C11.5183 10.2946 12.2978 9.87787 13.1465 9.70906C13.9951 9.54025 14.8748 9.62689 15.6742 9.95803C16.4737 10.2892 17.1569 10.8499 17.6377 11.5694C18.1184 12.2888 18.375 13.1347 18.375 14C18.375 15.1603 17.9141 16.2731 17.0936 17.0936C16.2731 17.9141 15.1603 18.375 14 18.375Z" fill="currentColor" />
    </svg>
  );
}

function CategoryIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 28 28" fill="none">
      <path d="M12.2052 19.8483C12.2491 19.9798 12.261 20.1199 12.2401 20.257C12.2192 20.394 12.166 20.5242 12.085 20.6366C12.0039 20.7491 11.8972 20.8407 11.7738 20.9039C11.6504 20.9671 11.5137 21 11.3751 21H2.62506C2.48641 21 2.34974 20.9671 2.22632 20.9039C2.10289 20.8407 1.99625 20.7491 1.91518 20.6366C1.8341 20.5242 1.78092 20.394 1.76001 20.257C1.7391 20.1199 1.75106 19.9798 1.79491 19.8483L6.16991 6.72328C6.22796 6.54902 6.33937 6.39744 6.48837 6.29002C6.63737 6.18261 6.81639 6.12481 7.00006 6.12481C7.18374 6.12481 7.36276 6.18261 7.51176 6.29002C7.66076 6.39744 7.77217 6.54902 7.83022 6.72328L12.2052 19.8483ZM22.7501 8.3125C22.7501 7.18762 22.4165 6.088 21.7915 5.1527C21.1666 4.21739 20.2783 3.48841 19.2391 3.05794C18.1998 2.62746 17.0563 2.51483 15.953 2.73429C14.8497 2.95374 13.8363 3.49542 13.0409 4.29083C12.2455 5.08624 11.7038 6.09966 11.4843 7.20293C11.2649 8.30619 11.3775 9.44976 11.808 10.489C12.2385 11.5283 12.9675 12.4165 13.9028 13.0415C14.8381 13.6664 15.9377 14 17.0626 14C18.5704 13.9983 20.0161 13.3985 21.0823 12.3323C22.1486 11.266 22.7483 9.82039 22.7501 8.3125ZM24.5001 15.75H14.8751C14.643 15.75 14.4204 15.8422 14.2563 16.0063C14.0923 16.1704 14.0001 16.3929 14.0001 16.625V22.75C14.0001 22.9821 14.0923 23.2046 14.2563 23.3687C14.4204 23.5328 14.643 23.625 14.8751 23.625H24.5001C24.7321 23.625 24.9547 23.5328 25.1188 23.3687C25.2829 23.2046 25.3751 22.9821 25.3751 22.75V16.625C25.3751 16.3929 25.2829 16.1704 25.1188 16.0063C24.9547 15.8422 24.7321 15.75 24.5001 15.75Z" fill="currentColor" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 28 28" fill="none">
      <path d="M14 2.625C11.7502 2.625 9.551 3.29213 7.68039 4.54203C5.80978 5.79193 4.35182 7.56847 3.49088 9.64698C2.62993 11.7255 2.40467 14.0126 2.84357 16.2192C3.28248 18.4257 4.36584 20.4525 5.95667 22.0433C7.54749 23.6342 9.57432 24.7175 11.7809 25.1564C13.9874 25.5953 16.2745 25.3701 18.353 24.5091C20.4315 23.6482 22.2081 22.1902 23.458 20.3196C24.7079 18.449 25.375 16.2498 25.375 14C25.3718 10.9841 24.1724 8.09271 22.0398 5.96018C19.9073 3.82764 17.0159 2.62818 14 2.625ZM18.9941 11.9941L12.8691 18.1191C12.7878 18.2004 12.6913 18.265 12.5851 18.309C12.4789 18.353 12.365 18.3757 12.25 18.3757C12.135 18.3757 12.0212 18.353 11.9149 18.309C11.8087 18.265 11.7122 18.2004 11.6309 18.1191L9.00594 15.4941C8.84176 15.3299 8.74952 15.1072 8.74952 14.875C8.74952 14.6428 8.84176 14.4201 9.00594 14.2559C9.17013 14.0918 9.39281 13.9995 9.625 13.9995C9.8572 13.9995 10.0799 14.0918 10.2441 14.2559L12.25 16.263L17.7559 10.7559C17.8372 10.6746 17.9338 10.6102 18.04 10.5662C18.1462 10.5222 18.26 10.4995 18.375 10.4995C18.49 10.4995 18.6038 10.5222 18.71 10.5662C18.8163 10.6102 18.9128 10.6746 18.9941 10.7559C19.0754 10.8372 19.1399 10.9337 19.1838 11.04C19.2278 11.1462 19.2505 11.26 19.2505 11.375C19.2505 11.49 19.2278 11.6038 19.1838 11.71C19.1399 11.8163 19.0754 11.9128 18.9941 11.9941Z" fill="currentColor" />
    </svg>
  );
}

function StaggerWords({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const words = useMemo(() => text.trim().split(/\s+/), [text]);

  return (
    <motion.span
      className={`${styles.staggerWords} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.72 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.085,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <span className={styles.wordMask} key={`${word}-${index}`}>
          <motion.span className={styles.word} variants={wordVariants}>
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.span>
  );
}

function ChannelBrand({ channel }: { channel: Channel }) {
  if (channel.logo) {
    return (
      <span className={styles.channelLogoFrame}>
        <Image
          src={channel.logo}
          alt=""
          fill
          sizes="72px"
          className={styles.channelLogo}
        />
      </span>
    );
  }

  return (
    <span className={`${styles.channelLogoFrame} ${styles.channelLogoFallback}`} aria-hidden="true">
      {channel.logoLabel ?? channel.name.slice(0, 3).toUpperCase()}
    </span>
  );
}

const cardGroupVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.08,
    },
  },
};

const cardTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.74,
      ease: EASE,
    },
  },
};

function ChannelArtwork({
  channel,
  renderMedia,
  eager,
  mediaY,
  mediaScale,
}: {
  channel: Channel;
  renderMedia: boolean;
  eager?: boolean;
  mediaY?: MotionValue<string>;
  mediaScale?: MotionValue<number>;
}) {
  return (
    <div className={styles.channelCardInner} aria-hidden="true">
      <motion.div
        className={styles.channelMedia}
        style={{ y: mediaY, scale: mediaScale }}
      >
        {renderMedia ? (
          <Image
            src={channel.image}
            alt=""
            fill
            priority={eager}
            quality={88}
            sizes="(max-width: 767px) 94vw, (max-width: 1199px) 94vw, 92vw"
            style={{ objectPosition: channel.imagePosition ?? "center" }}
            className={styles.channelImage}
          />
        ) : (
          <div className={styles.channelMediaPlaceholder} />
        )}
      </motion.div>

      <div className={styles.channelShade} />
    </div>
  );
}

function ChannelOverlay({
  channel,
  interactive = true,
}: {
  channel: Channel;
  interactive?: boolean;
}) {
  return (
    <motion.div
      className={styles.channelTextLayer}
      variants={cardGroupVariants}
      initial="hidden"
      animate="visible"
      exit={{
        opacity: 0,
        transition: { duration: 0.18, ease: "easeOut" },
      }}
    >
      <div className={styles.channelStats}>
        <motion.div className={styles.channelStat} variants={cardTextVariants}>
          <div className={styles.channelStatValueRow}>
            <span className={styles.channelStatIcon}>
              <SubscribersIcon />
            </span>
            <strong>{channel.subscribers}</strong>
          </div>
          <span className={styles.channelStatLabel}>SUBSCRIBERS</span>
        </motion.div>

        <motion.div className={styles.channelStat} variants={cardTextVariants}>
          <div className={styles.channelStatValueRow}>
            <span className={styles.channelStatIcon}>
              <ViewsIcon />
            </span>
            <strong>{channel.views}</strong>
          </div>
          <span className={styles.channelStatLabel}>TOTAL VIEWS</span>
        </motion.div>

        <motion.div className={styles.channelStat} variants={cardTextVariants}>
          <div className={styles.channelStatValueRow}>
            <span className={styles.channelStatIcon}>
              <CategoryIcon />
            </span>
            <strong>{channel.category}</strong>
          </div>
          <span className={styles.channelStatLabel}>CATEGORY</span>
        </motion.div>
      </div>

      <div className={styles.channelCopy}>
        <motion.div className={styles.channelIdentity} variants={cardTextVariants}>
          <ChannelBrand channel={channel} />

          <div className={styles.channelIdentityCopy}>
            <h2>
              <span>{channel.name}</span>
              <CheckCircleIcon />
            </h2>
            <p>{channel.handle}</p>
          </div>
        </motion.div>

        <motion.p className={styles.channelDescription} variants={cardTextVariants}>
          {channel.description}
        </motion.p>
      </div>

      <motion.a
        href={`https://www.youtube.com/${channel.handle}`}
        target="_blank"
        rel="noreferrer"
        className={styles.youtubeLink}
        aria-label={`Open ${channel.name} on YouTube`}
        tabIndex={interactive ? 0 : -1}
        variants={cardTextVariants}
      >
        <span>Open YouTube</span>
        <PlayIcon />
      </motion.a>
    </motion.div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function reelOffset(relative: number) {
  const percent = relative * 100;
  const gapRem = relative * 2.5;
  const gapOperator = gapRem >= 0 ? "+" : "-";

  // One physical reel: every neighbouring frame is exactly one card height
  // plus the 2.5rem reference gap away from the active frame.
  return `calc(${percent}% ${gapOperator} ${Math.abs(gapRem)}rem)`;
}

function ChannelSlide({
  channel,
  index,
  count,
  progress,
  renderMedia,
}: {
  channel: Channel;
  index: number;
  count: number;
  progress: MotionValue<number>;
  renderMedia: boolean;
}) {
  const relativeAt = (value: number) => {
    const position = count > 1 ? value * (count - 1) : 0;
    return index - position;
  };

  const y = useTransform(progress, (value) =>
    reelOffset(relativeAt(value)),
  );

  const opacity = useTransform(progress, (value) => {
    const distance = Math.abs(relativeAt(value));
    if (distance <= 1.12) return 1;
    return clamp(1 - (distance - 1.12) * 1.8, 0, 1);
  });

  // The centred/active image is always exactly scale(1) and translateY(0),
  // so it is rendered sharply. Only travelling neighbour frames receive a
  // tiny image-only parallax; readable text is never transformed with them.
  const mediaY = useTransform(progress, (value) => {
    const relative = clamp(relativeAt(value), -1, 1);
    return `${relative * -0.45}rem`;
  });

  const mediaScale = useTransform(progress, (value) => {
    const distance = clamp(Math.abs(relativeAt(value)), 0, 1);
    return 1 + distance * 0.008;
  });

  return (
    <div
      className={styles.channelSlideSlot}
      aria-hidden="true"
      style={{ zIndex: count - index }}
    >
      <motion.article
        className={styles.channelSlide}
        style={{ y, opacity }}
      >
        <div className={styles.channelCard}>
          <ChannelArtwork
            channel={channel}
            renderMedia={renderMedia}
            eager={index === 0}
            mediaY={mediaY}
            mediaScale={mediaScale}
          />
        </div>
      </motion.article>
    </div>
  );
}

function StaticChannelDeck() {
  return (
    <section className={styles.staticDeck} aria-label="OUR CHANNEL ECOSYSTEM">
      {CHANNELS.map((channel, index) => (
        <article className={styles.staticCard} key={channel.id}>
          <div className={styles.channelCard}>
            <ChannelArtwork channel={channel} renderMedia eager={index === 0} />
            <ChannelOverlay channel={channel} />
          </div>
        </article>
      ))}
    </section>
  );
}

function MotionChannelDeck() {
  const trackRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hudVisible, setHudVisible] = useState(true);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const position = value * (CHANNELS.length - 1);
    const nearest = Math.round(position);
    const distance = Math.abs(position - nearest);
    const settled = distance <= 0.16;

    setHudVisible((current) => (current === settled ? current : settled));

    if (settled) {
      const next = Math.max(0, Math.min(CHANNELS.length - 1, nearest));
      setActiveIndex((current) => (current === next ? current : next));
    }
  });

  const activeChannel = CHANNELS[activeIndex];

  return (
    <section
      ref={trackRef}
      className={styles.deckTrack}
      aria-label="OUR CHANNEL ECOSYSTEM"
      style={{
        "--deck-height-desktop": `${100 + (CHANNELS.length - 1) * 86}svh`,
        "--deck-height-tablet": `${100 + (CHANNELS.length - 1) * 90}svh`,
        "--deck-height-mobile": `${100 + (CHANNELS.length - 1) * 94}svh`,
      } as CSSProperties}
    >
      <div className={styles.deckSticky}>
        <div className={styles.deckBackdrop} aria-hidden="true" />
        <div className={styles.deckTopFade} aria-hidden="true" />
        <div className={styles.deckBottomFade} aria-hidden="true" />

        {CHANNELS.map((channel, index) => (
          <ChannelSlide
            key={channel.id}
            channel={channel}
            index={index}
            count={CHANNELS.length}
            progress={scrollYProgress}
            renderMedia={Math.abs(index - activeIndex) <= 2}
          />
        ))}

        <div className={styles.deckHudShell}>
          <div className={styles.channelHud}>
            <AnimatePresence mode="wait" initial={false}>
              {hudVisible ? (
                <ChannelOverlay key={activeChannel.id} channel={activeChannel} />
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChannelDeck() {
  const reduceMotion = useReducedMotion();

  return reduceMotion ? <StaticChannelDeck /> : <MotionChannelDeck />;
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <motion.article className={styles.newsCard} variants={childVariants}>
      <Link href={item.href} className={styles.newsCardLink}>
        <div className={styles.newsImageWrap}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 31vw"
            style={{ objectPosition: item.imagePosition ?? "center" }}
            className={styles.newsImage}
          />
        </div>

        <div className={styles.newsMeta}>
          <span>{item.category}</span>
          <time>{item.date}</time>
        </div>

        <h3>{item.title}</h3>
        <p>{item.excerpt}</p>

        <span className={styles.readMore}>
          Read more
          <ArrowIcon />
        </span>
      </Link>
    </motion.article>
  );
}

function LatestAnnouncements() {
  return (
    <section className={styles.newsSection} aria-labelledby="fast-channel-news-heading">
      <motion.div
        className={styles.newsHeadingRow}
        variants={blockVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
      >
        <motion.div variants={childVariants}>
          <p className={styles.sectionEyebrow}>Latest Announcements</p>
          <h2 id="fast-channel-news-heading">News</h2>
        </motion.div>

        <motion.div variants={childVariants}>
          <Link href="/news-and-blogs" className={styles.viewAll}>
            View all
            <ArrowIcon />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.newsGrid}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.13, delayChildren: 0.08 },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
      >
        {NEWS.map((item) => (
          <NewsCard item={item} key={item.id} />
        ))}
      </motion.div>
    </section>
  );
}

function PartnerCta() {
  return (
    <section className={styles.partnerCta} aria-labelledby="fast-channel-partner-heading">
      <Image
        src="/images/fast-channel/partner-cta.webp"
        alt=""
        fill
        sizes="100vw"
        className={styles.partnerCtaImage}
      />
      <div className={styles.partnerCtaShade} aria-hidden="true" />

      <motion.div
        className={styles.partnerCtaCopy}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.48 }}
        transition={{ duration: 0.94, ease: EASE }}
      >
        <h2 id="fast-channel-partner-heading">
          <StaggerWords text="Have a story worth telling? Let's bring it to the world." delay={0.06} />
        </h2>

        <Link href="/partners" className={styles.partnerCtaLink}>
          Join as a Partner
          <ArrowIcon />
        </Link>
      </motion.div>
    </section>
  );
}

export function FastChannelPage() {
  return (
    <main className={`${plusJakartaSans.variable} ${inter.variable} ${styles.page}`}>
      <section className={styles.intro} aria-labelledby="fast-channel-title">
        <div className={styles.introInner}>
          <motion.p
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.12, ease: EASE }}
          >
            OUR CHANNEL ECOSYSTEM
          </motion.p>

          <h1 id="fast-channel-title" className={styles.introTitle}>
            <StaggerWords text="Always On. Always Something to Watch." delay={0.14} />
          </h1>

          <motion.p
            className={styles.introDescription}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.02, delay: 0.7, ease: EASE }}
          >
            Curated, always-on channels bringing movies, music, culture, devotion and
            entertainment to audiences across connected TV and digital platforms.
          </motion.p>
        </div>
      </section>

      <ChannelDeck />
      <LatestAnnouncements />
      <PartnerCta />
    </main>
  );
}
