'use client';


import { LocalizedContent } from "@/components/localization/localized-content";
import { NewsBlogsSection } from '@/components/landing/news-blogs-section';
import { useEffect, useRef, useState } from 'react';

export default function CreatorEcosystemPage() {
  const imageCardRef = useRef<HTMLElement | null>(null);
  const partnershipsSectionRef = useRef<HTMLElement | null>(null);
  const videoSectionRef = useRef<HTMLElement | null>(null);
  const testimonialsSectionRef = useRef<HTMLElement | null>(null);
  const partnerCtaRef = useRef<HTMLElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageIsVisible, setImageIsVisible] = useState(false);
  const [partnershipsAreVisible, setPartnershipsAreVisible] = useState(false);
  const [videoSectionIsVisible, setVideoSectionIsVisible] = useState(false);
  const [testimonialsAreVisible, setTestimonialsAreVisible] = useState(false);
  const [partnerCtaIsVisible, setPartnerCtaIsVisible] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const creatorVideos = [
    { src: '/images/creator-ecosystem/video1.mp4', label: 'Featured video 1' },
    { src: '/images/creator-ecosystem/video2.mp4', label: 'Featured video 2' },
    { src: '/images/creator-ecosystem/video3.mp4', label: 'Featured video 3' },
    { src: '/images/creator-ecosystem/video4.mp4', label: 'Featured video 4' },
  ];

  const creatorTestimonials = [
    {
      quote:
        'Representing Marathi entertainment on a global stage was a special moment. Cannes offered a meaningful opportunity to celebrate our language, culture and creative identity.',
      name: 'Ananya Shah',
      role: 'Actress & Creator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      quote:
        'Cannes was a beautiful opportunity to celebrate Marathi culture on an international platform. The experience made our regional identity feel even more meaningful.',
      name: 'Meera Kulkarni',
      role: 'Actor',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      quote:
        'Every opportunity to bring Marathi stories to a wider audience matters. Celebrating our creative culture on a global platform is something to be proud of.',
      name: 'Riya Deshmukh',
      role: 'Digital Creator',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      quote:
        'Working with artists and creators who share the same passion creates collaborations that feel authentic, inspiring and connected to our roots.',
      name: 'Sana Patil',
      role: 'Actor & Creator',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      quote:
        'It is exciting to see Marathi talent reach new audiences. These partnerships help our stories travel further while staying true to who we are.',
      name: 'Aditi Joshi',
      role: 'Influencer',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      quote:
        'Being part of a community that supports creativity and meaningful storytelling makes every collaboration feel special.',
      name: 'Kavya Rao',
      role: 'Performer',
      avatar: 'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=120&h=120&q=80',
    },
  ];

  useEffect(() => {
    const loadFrame = window.requestAnimationFrame(() => setIsLoaded(true));
    const target = imageCardRef.current;

    if (!target) {
      return () => window.cancelAnimationFrame(loadFrame);
    }

    if (!('IntersectionObserver' in window)) {
      setImageIsVisible(true);
      return () => window.cancelAnimationFrame(loadFrame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(target);
    return () => {
      window.cancelAnimationFrame(loadFrame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const target = partnershipsSectionRef.current;

    if (!target) return;

    if (!('IntersectionObserver' in window)) {
      setPartnershipsAreVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPartnershipsAreVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = videoSectionRef.current;

    if (!target) return;

    if (!('IntersectionObserver' in window)) {
      setVideoSectionIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoSectionIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = testimonialsSectionRef.current;

    if (!target) return;

    if (!('IntersectionObserver' in window)) {
      setTestimonialsAreVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTestimonialsAreVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = partnerCtaRef.current;

    if (!target) return;

    if (!("IntersectionObserver" in window)) {
      setPartnerCtaIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPartnerCtaIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return <LocalizedContent>{(
    <main className="creator-ecosystem-page">
      <section
        className={`intro-section${isLoaded ? ' is-loaded' : ''}`}
        aria-labelledby="creator-ecosystem-heading"
      >
        <div className="intro-copy">
          <p className="intro-eyebrow hero-reveal hero-reveal--1">
            TALENT &amp; CREATOR ECOSYSTEM
          </p>

          <h1
            className="intro-heading hero-reveal hero-reveal--2"
            id="creator-ecosystem-heading"
          >
            Connecting artists, creators and brands through talent collaborations,
            creator partnerships and opportunities that take Marathi entertainment
            to wider audiences.
          </h1>
        </div>

        <a className="partnership-link hero-reveal hero-reveal--3" href="#partnerships">
          <span>Explore Partnerships</span>
          <svg
            className="partnership-chevron"
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 13L7 7L1 1"
              stroke="#8F6C1A"
              strokeOpacity="0.2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </section>

      <section
        ref={imageCardRef}
        className={`feature-card${imageIsVisible ? ' is-visible' : ''}`}
        id="featured-creator"
        aria-label="Creator partnerships"
      >
        <div className="feature-image-wrap">
          <img
            className="feature-image"
            src="/images/creator-ecosystem/creator-ecosystem-gallery-1.png"
            alt="A content creator recording a video with a phone and camera setup"
            loading="lazy"
          />
        </div>
      </section>

      <section
        ref={partnershipsSectionRef}
        className={`partnerships-section${partnershipsAreVisible ? ' is-visible' : ''}`}
        id="partnerships"
        aria-labelledby="partnerships-heading"
      >
        <header className="partnerships-header">
          <p className="partnerships-eyebrow section-reveal section-reveal--1">
            WHAT WE DO
          </p>
          <h2
            className="partnerships-heading section-reveal section-reveal--2"
            id="partnerships-heading"
          >
            Creating Connections
            <br />
            Between Talent &amp; Opportunity
          </h2>
        </header>

        <div className="partnerships-grid">
          <article className="partnership-card partnership-card--1">
            <img
              className="partnership-card-image"
              src="/images/creator-ecosystem/creator-ecosystem-gallery-2.png"
              alt="Artist and celebrity in a cream traditional outfit in front of red curtains"
              loading="lazy"
            />
            <div className="partnership-card-shade" aria-hidden="true" />
            <h3 className="partnership-card-title">Artist &amp; Celebrity Partnerships</h3>
          </article>

          <article className="partnership-card partnership-card--2">
            <img
              className="partnership-card-image"
              src="/images/creator-ecosystem/creator-ecosystem-gallery-3.png"
              alt="Creator and influencer in a colorful outfit outdoors"
              loading="lazy"
            />
            <div className="partnership-card-shade" aria-hidden="true" />
            <h3 className="partnership-card-title">Creator &amp; Influencer Partnerships</h3>
          </article>

          <article className="partnership-card partnership-card--3">
            <img
              className="partnership-card-image"
              src="/images/creator-ecosystem/creator-ecosystem-gallery-4.png"
              alt="Brand campaign and partnership advertisement on a red vehicle"
              loading="lazy"
            />
            <div className="partnership-card-shade" aria-hidden="true" />
            <h3 className="partnership-card-title">
              Brand Endorsements &amp; Talent Collaborations
            </h3>
          </article>
        </div>
      </section>

      <section
        ref={videoSectionRef}
        className={`video-feature-section${videoSectionIsVisible ? ' is-visible' : ''}`}
        aria-labelledby="video-feature-heading"
      >
        <div className="video-feature-inner">
          <h2 className="video-feature-heading video-reveal" id="video-feature-heading">
            <span className="video-heading-primary">
              At Cannes 2026, Abhijit Marathi&apos;s global launch at the Bharat Pavilion brought
            </span>{' '}
            <span className="video-heading-secondary">
              Marathi entertainment and cultural identity into an international spotlight, with
              celebrated artists and creators joining the occasion.
            </span>
          </h2>

          <div
            className="video-layout video-reveal video-reveal--media"
            aria-label="Featured video carousel"
          >
            {activeVideoIndex > 0 && (
              <div className="video-stack video-stack--left" aria-label="Previously featured videos">
                {creatorVideos.slice(0, activeVideoIndex).map((video, index) => (
                  <button
                    className="video-thumbnail"
                    type="button"
                    key={video.src}
                    onClick={() => setActiveVideoIndex(index)}
                    aria-label={`Play ${video.label}`}
                    aria-pressed={false}
                  >
                    <video
                      className="video-thumbnail-media"
                      src={video.src}
                      muted
                      autoPlay
                      loop
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                      tabIndex={-1}
                    />
                    <span className="video-thumbnail-play" aria-hidden="true">
                      <svg viewBox="0 0 18 22" focusable="false">
                        <path d="M2 1.5L16.5 11L2 20.5V1.5Z" fill="currentColor" />
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div className="video-main-frame">
              <video
                className="video-main-media"
                key={creatorVideos[activeVideoIndex].src}
                src={creatorVideos[activeVideoIndex].src}
                controls
                autoPlay
                muted
                playsInline
                preload="auto"
                aria-label={creatorVideos[activeVideoIndex].label}
              >
                Your browser does not support HTML video.
              </video>
              <div className="video-main-gradient" aria-hidden="true" />
            </div>

            {activeVideoIndex < creatorVideos.length - 1 && (
              <div className="video-stack video-stack--right" aria-label="More featured videos">
                {creatorVideos.slice(activeVideoIndex + 1).map((video, offset) => {
                  const index = activeVideoIndex + offset + 1;
                  return (
                    <button
                      className="video-thumbnail"
                      type="button"
                      key={video.src}
                      onClick={() => setActiveVideoIndex(index)}
                      aria-label={`Play ${video.label}`}
                      aria-pressed={false}
                    >
                      <video
                        className="video-thumbnail-media"
                        src={video.src}
                        muted
                        autoPlay
                        loop
                        playsInline
                        preload="metadata"
                        aria-hidden="true"
                        tabIndex={-1}
                      />
                      <span className="video-thumbnail-play" aria-hidden="true">
                        <svg viewBox="0 0 18 22" focusable="false">
                          <path d="M2 1.5L16.5 11L2 20.5V1.5Z" fill="currentColor" />
                        </svg>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <p className="video-feature-caption video-reveal video-reveal--caption">
            Featured personalities: Ashok Saraf, Prajakta Mali, Nivedita Saraf, Sayali Sanjeev,
            Ankita Walawalkar, Desha Katkar, Jayanti Waghadhare, other participating creators and
            personalities.
          </p>
        </div>
      </section>

      <section
        ref={testimonialsSectionRef}
        className={`testimonials-section${testimonialsAreVisible ? ' is-visible' : ''}`}
        aria-labelledby="testimonials-heading"
      >
        <header className="testimonials-header testimonial-reveal testimonial-reveal--header">
          <p className="testimonials-eyebrow">WHAT CREATORS SAY ABOUT US</p>
          <h2 className="testimonials-heading" id="testimonials-heading">
            Built on Relationships.
            <br />
            Driven by Collaboration.
          </h2>
        </header>

        <div className="testimonials-carousel testimonial-reveal testimonial-reveal--carousel" aria-label="Creator testimonials, continuously scrolling">
          <div className="testimonials-track">
            <div className="testimonial-group">
              {creatorTestimonials.map((testimonial) => (
                <article className="testimonial-card" key={testimonial.name}>
                  <p className="testimonial-quote">“{testimonial.quote}”</p>
                  <div className="testimonial-author">
                    <img
                      className="testimonial-avatar"
                      src={testimonial.avatar}
                      alt=""
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="testimonial-author-copy">
                      <p className="testimonial-name">{testimonial.name}</p>
                      <p className="testimonial-role">{testimonial.role}</p>
                    </div>
                  </div>
                  <img
                    className="testimonial-decoration"
                    src="/images/creator-ecosystem/creator-ecosystem-artwork-523.svg"
                    alt=""
                    aria-hidden="true"
                  />
                </article>
              ))}
            </div>

            <div className="testimonial-group testimonial-group--duplicate" aria-hidden="true">
              {creatorTestimonials.map((testimonial) => (
                <article className="testimonial-card" key={`duplicate-${testimonial.name}`}>
                  <p className="testimonial-quote">“{testimonial.quote}”</p>
                  <div className="testimonial-author">
                    <img
                      className="testimonial-avatar"
                      src={testimonial.avatar}
                      alt=""
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="testimonial-author-copy">
                      <p className="testimonial-name">{testimonial.name}</p>
                      <p className="testimonial-role">{testimonial.role}</p>
                    </div>
                  </div>
                  <img
                    className="testimonial-decoration"
                    src="/images/creator-ecosystem/creator-ecosystem-artwork-523.svg"
                    alt=""
                    aria-hidden="true"
                  />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <NewsBlogsSection />

      <section
        ref={partnerCtaRef}
        className={`join-partner-section${partnerCtaIsVisible ? ' is-visible' : ''}`}
        aria-labelledby="join-partner-heading"
      >
        <div className="join-partner-copy">
          <h2 className="join-partner-heading join-partner-reveal" id="join-partner-heading">
            Have a story worth telling?
            <br />
            Let’s bring it to the world.
          </h2>

          <a className="join-partner-button join-partner-reveal join-partner-reveal--button" href="#partnerships">
            <span>Join as Partner</span>
            <svg
              className="join-partner-chevron"
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 13L7 7L1 1"
                stroke="currentColor"
                strokeOpacity="0.72"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <img
          className="join-partner-logo join-partner-reveal join-partner-reveal--logo"
          src="/images/abhijat-logo.png"
          alt="Abhijat"
          loading="lazy"
        />
      </section>

      <style jsx>{`
        .creator-ecosystem-page {
          width: 100%;
          overflow: hidden;
          background: #f9f9f9;
          color: #000;
          font-family: var(--Font-family-Body, Inter, Arial, sans-serif);
        }

        .join-partner-section {
          position: relative;
          box-sizing: border-box;
          display: flex;
          width: 100%;
          height: 30rem;
          min-height: 30rem;
          padding: 2rem;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          align-self: stretch;
          overflow: hidden;
          isolation: isolate;
          border-radius: var(--Corner-radius-0, 0);
          background-color: #171717;
          color: var(--Text-Inverse-strong, #fff);
        }

        .join-partner-section::before {
          position: absolute;
          z-index: -1;
          inset: 0;
          content: '';
          background-image: radial-gradient(
              118.01% 73.86% at 57.53% 72.82%,
              rgba(0, 0, 0, 0) 42.15%,
              rgba(0, 0, 0, 0.76) 85.74%
            ),
            url('/images/join-as-partner-background.png');
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          transform: scale(1.005);
        }

        .join-partner-copy {
          position: relative;
          z-index: 1;
          display: flex;
          align-self: flex-start;
          width: min(100%, 48rem);
          height: auto;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 2rem;
        }

        .join-partner-heading {
          box-sizing: border-box;
          width: 100%;
          max-width: 43rem;
          margin: 0;
          color: var(--Text-Inverse-strong, #fff);
          font-family: var(--Font-family-Heading, 'Plus Jakarta Sans', sans-serif);
          font-size: var(--Font-size-Heading-1, 2.5rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Heading-1, 3rem);
          letter-spacing: -0.03125rem;
          font-feature-settings: 'liga' off, 'clig' off;
          text-wrap: pretty;
        }

        .join-partner-button {
          display: inline-flex;
          flex: 0 0 auto;
          width: fit-content;
          max-width: 100%;
          align-items: center;
          justify-content: center;
          gap: var(--Spacing-4, 0.25rem);
          padding: var(--Spacing-16, 1rem);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: var(--Corner-radius-8, 0.5rem);
          background: rgba(0, 0, 0, 0.18);
          color: var(--Text-Inverse-strong, #fff);
          font-family: var(--Font-family-Body, 'Plus Jakarta Sans', sans-serif);
          font-size: var(--Font-size-Small, 1rem);
          font-weight: 600;
          line-height: var(--Line-height-Small, 1.5rem);
          text-decoration: none;
          backdrop-filter: blur(6px);
          transition:
            color 180ms ease,
            background-color 180ms ease,
            border-color 180ms ease;
        }

        .join-partner-button:hover {
          border-color: #fff;
          background: #fff;
          color: #111;
        }

        .join-partner-button:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 4px;
        }

        .join-partner-chevron {
          width: 0.5rem;
          height: 0.875rem;
          flex: 0 0 auto;
          transition: transform 180ms ease;
        }

        .join-partner-button:hover .join-partner-chevron {
          transform: translateX(3px);
        }

        .join-partner-logo {
          position: absolute;
          z-index: 1;
          right: 2rem;
          bottom: 2rem;
          display: block;
          width: 4.6875rem;
          height: 5rem;
          flex-shrink: 0;
          aspect-ratio: 15 / 16;
          object-fit: cover;
          object-position: center;
          mix-blend-mode: luminosity;
        }

        .join-partner-reveal {
          opacity: 0;
          transform: translateY(1rem);
        }

        .join-partner-section.is-visible .join-partner-reveal {
          animation: reveal-up 720ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
        }

        .join-partner-section.is-visible .join-partner-reveal--button {
          animation-delay: 140ms;
        }

        .join-partner-section.is-visible .join-partner-reveal--logo {
          animation-delay: 220ms;
        }

        .intro-section {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          align-self: stretch;
          gap: 3.5rem;
          padding: 8.75rem 3.5rem 3.5rem;
          text-align: center;
        }

        .intro-copy {
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .intro-eyebrow {
          align-self: stretch;
          margin: 0;
          color: var(--Light-Border-Text-Tertiary, #b8b8b8);
          font-family: var(--Font-family-Heading, 'Plus Jakarta Sans', sans-serif);
          font-size: var(--Font-size-Tiny, 0.875rem);
          font-weight: 600;
          font-style: normal;
          line-height: var(--Line-height-Tiny, 1.25rem);
          font-feature-settings: 'liga' off, 'clig' off;
        }

        .intro-heading {
          width: 100%;
          max-width: 77.875rem;
          margin: 0;
          color: #000;
          font-family: var(--Font-family-Heading, 'Plus Jakarta Sans', sans-serif);
          font-size: var(--Font-size-Display, 3.5rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Display, 4rem);
          letter-spacing: -0.0625rem;
          font-feature-settings: 'liga' off, 'clig' off;
          text-wrap: balance;
        }

        .partnership-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--Spacing-4, 0.25rem);
          padding: var(--Spacing-16, 1rem);
          border-radius: var(--Spacing-12, 0.75rem);
          color: var(--Text-Warning, #8f6c1a);
          font-family: var(--Font-family-Body, Inter, Arial, sans-serif);
          font-size: var(--Font-size-Small, 1rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Small, 1.5rem);
          text-align: center;
          text-decoration: none;
          font-feature-settings: 'liga' off, 'clig' off;
          transition: background-color 180ms ease, color 180ms ease;
        }

        .partnership-link:hover {
          background-color: rgba(143, 108, 26, 0.06);
          color: #765714;
        }

        .partnership-link:focus-visible {
          outline: 2px solid #8f6c1a;
          outline-offset: 3px;
        }

        .partnership-chevron {
          width: 0.5rem;
          height: 0.875rem;
          flex: 0 0 auto;
          transition: transform 180ms ease;
        }

        .partnership-link:hover .partnership-chevron {
          transform: translateX(3px);
        }

        .feature-card {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 3.5rem;
          width: min(100%, 90rem);
          height: 43.75rem;
          margin: 0 auto;
          padding: 3.5rem;
          background: #fff;
          opacity: 0;
          transform: translateY(1.5rem);
        }

        .feature-image-wrap {
          flex: 1 0 0;
          min-height: 0;
          align-self: stretch;
          overflow: hidden;
          border-radius: 1rem;
          background: #e5e5e5;
        }

        .feature-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: scale(1.025);
          transition: transform 1.1s cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .feature-card.is-visible {
          animation: reveal-up 850ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
        }

        .feature-card.is-visible .feature-image {
          transform: scale(1);
        }

        .partnerships-section {
          box-sizing: border-box;
          display: flex;
          width: min(100%, 90rem);
          margin: 0 auto;
          padding: 6.25rem 3.5rem;
          flex-direction: column;
          align-items: center;
          gap: 6.25rem;
          background: #fff;
        }

        .partnerships-header {
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          text-align: center;
        }

        .partnerships-eyebrow {
          align-self: stretch;
          margin: 0;
          color: var(--Light-Border-Text-Secondary, #969696);
          font-family: var(--Font-family-Heading, 'Plus Jakarta Sans', sans-serif);
          font-size: var(--Font-size-Tiny, 0.875rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Tiny, 1.25rem);
          text-align: center;
          font-feature-settings: 'liga' off, 'clig' off;
        }

        .partnerships-heading {
          margin: 0;
          color: #000;
          font-family: var(--Font-family-Heading, 'Plus Jakarta Sans', sans-serif);
          font-size: var(--Font-size-Heading-1, 2.5rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Heading-1, 3rem);
          letter-spacing: -0.03125rem;
          text-align: center;
          font-feature-settings: 'liga' off, 'clig' off;
          text-wrap: balance;
        }

        .partnerships-grid {
          display: grid;
          width: 100%;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }

        .partnership-card {
          position: relative;
          box-sizing: border-box;
          display: flex;
          min-width: 0;
          height: 30.9375rem;
          padding: 2rem;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          overflow: hidden;
          isolation: isolate;
          border-radius: var(--Corner-radius-16, 1rem);
          background: #242424;
          opacity: 0;
          transform: translateY(1.5rem) scale(0.985);
        }

        .partnership-card-image {
          position: absolute;
          z-index: -2;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 750ms cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .partnership-card-shade {
          position: absolute;
          z-index: -1;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            101.5% 87.32% at 53.02% 2.59%,
            rgba(0, 0, 0, 0) 48%,
            rgba(0, 0, 0, 0.45) 100%
          );
          pointer-events: none;
        }

        .partnership-card-title {
          align-self: flex-start;
          margin: auto 0 0;
          color: var(--Text-Inverse-strong, #fff);
          font-family: var(--Font-family-Heading, 'Plus Jakarta Sans', sans-serif);
          font-size: var(--Font-size-Heading-3, 1.5rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Heading-3, 2rem);
          font-feature-settings: 'liga' off, 'clig' off;
          text-wrap: balance;
        }

        .partnership-card:hover .partnership-card-image {
          transform: scale(1.045);
        }

        .section-reveal {
          opacity: 0;
          transform: translateY(1rem);
        }

        .partnerships-section.is-visible .section-reveal,
        .partnerships-section.is-visible .partnership-card {
          animation: reveal-up 720ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
        }

        .partnerships-section.is-visible .section-reveal--1 {
          animation-delay: 60ms;
        }

        .partnerships-section.is-visible .section-reveal--2 {
          animation-delay: 170ms;
        }

        .partnerships-section.is-visible .partnership-card--1 {
          animation-delay: 270ms;
        }

        .partnerships-section.is-visible .partnership-card--2 {
          animation-delay: 390ms;
        }

        .partnerships-section.is-visible .partnership-card--3 {
          animation-delay: 510ms;
        }

        .hero-reveal {
          opacity: 0;
          transform: translateY(1.125rem);
        }

        .is-loaded .hero-reveal {
          animation: reveal-up 720ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
        }

        .is-loaded .hero-reveal--1 {
          animation-delay: 80ms;
        }

        .is-loaded .hero-reveal--2 {
          animation-delay: 220ms;
        }

        .is-loaded .hero-reveal--3 {
          animation-delay: 390ms;
        }

        @keyframes reveal-up {
          from {
            opacity: 0;
            transform: translateY(1.5rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes thumbnail-collapse {
          from {
            opacity: 0;
            transform: scaleX(0.25);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        .video-feature-section {
          box-sizing: border-box;
          width: 100%;
          padding: 6.25rem 3.5rem;
          background: #000;
          color: #f9f9f9;
        }

        .video-feature-inner {
          display: flex;
          width: 100%;
          max-width: 83rem;
          margin: 0 auto;
          flex-direction: column;
          align-items: center;
          gap: 6.25rem;
        }

        .video-feature-heading {
          align-self: stretch;
          margin: 0;
          color: var(--Light-Border-Text-PrimaryInverse, #f9f9f9);
          font-family: var(--Font-family-Heading, 'Plus Jakarta Sans', sans-serif);
          font-size: var(--Font-size-Heading-1, 2.5rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Heading-1, 3rem);
          letter-spacing: -0.03125rem;
          font-feature-settings: 'liga' off, 'clig' off;
          text-wrap: pretty;
        }

        .video-heading-primary {
          color: var(--Light-Border-Text-PrimaryInverse, #f9f9f9);
        }

        .video-heading-secondary {
          color: var(--Light-Border-Text-Secondary, #969696);
        }

        .video-layout {
          display: flex;
          width: 100%;
          align-items: stretch;
          gap: 2rem;
          min-width: 0;
        }

        .video-main-frame {
          position: relative;
          flex: 1 1 0;
          min-width: 0;
          height: 34.875rem;
          overflow: hidden;
          isolation: isolate;
          border-radius: 1rem;
          background: #151515;
        }

        .video-main-media {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: #151515;
        }

        .video-main-gradient {
          position: absolute;
          z-index: 1;
          right: 0;
          bottom: 0;
          left: 0;
          height: 28%;
          background: linear-gradient(
            181deg,
            rgba(0, 0, 0, 0) 15%,
            rgba(0, 0, 0, 0.56) 100%
          );
          pointer-events: none;
        }

        .video-stack {
          display: flex;
          flex: 0 0 auto;
          width: max-content;
          min-width: 0;
          height: 34.875rem;
          align-items: stretch;
          gap: 0.875rem;
        }

        .video-thumbnail {
          position: relative;
          display: block;
          flex: 0 0 6.6667rem;
          width: 6.6667rem;
          min-width: 0;
          height: 100%;
          padding: 0;
          overflow: hidden;
          border: 0;
          border-radius: 0.75rem;
          background: #202020;
          color: #fff;
          cursor: pointer;
          isolation: isolate;
          transform-origin: center;
          animation: thumbnail-collapse 420ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
          transition: border-radius 200ms ease, opacity 200ms ease;
        }

        .video-stack--left .video-thumbnail {
          transform-origin: right center;
        }

        .video-stack--right .video-thumbnail {
          transform-origin: left center;
        }

        .video-thumbnail::after {
          position: absolute;
          z-index: 1;
          inset: 0;
          background: linear-gradient(
            181deg,
            rgba(0, 0, 0, 0) 55%,
            rgba(0, 0, 0, 0.56) 100%
          );
          content: '';
          pointer-events: none;
        }

        .video-thumbnail-media {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 500ms cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .video-thumbnail:hover .video-thumbnail-media,
        .video-thumbnail:focus-visible .video-thumbnail-media {
          transform: scale(1.06);
        }

        .video-thumbnail:hover {
          border-radius: 0.875rem;
        }

        .video-thumbnail-play {
          position: absolute;
          z-index: 2;
          top: 50%;
          left: 50%;
          display: grid;
          width: 2.5rem;
          height: 2.5rem;
          place-items: center;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.68);
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.9);
          transition: opacity 180ms ease, transform 180ms ease;
          pointer-events: none;
        }

        .video-thumbnail-play svg {
          width: 0.75rem;
          height: 1rem;
          margin-left: 0.125rem;
        }

        .video-thumbnail:hover .video-thumbnail-play,
        .video-thumbnail:focus-visible .video-thumbnail-play {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        .video-thumbnail:focus-visible {
          outline: 2px solid #f9f9f9;
          outline-offset: 4px;
        }

        .video-feature-caption {
          align-self: stretch;
          margin: -5rem 0 0;
          color: var(--Text-Inverse-strong, #fff);
          font-family: var(--Font-family-Body, 'Plus Jakarta Sans', sans-serif);
          font-size: var(--Font-size-Small, 1rem);
          font-style: normal;
          font-weight: 500;
          line-height: var(--Line-height-Small, 1.5rem);
          font-feature-settings: 'liga' off, 'clig' off;
        }

        .video-reveal {
          opacity: 0;
          transform: translateY(1.5rem);
        }

        .video-feature-section.is-visible .video-reveal {
          animation: reveal-up 760ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
        }

        .video-feature-section.is-visible .video-reveal--media {
          animation-delay: 150ms;
        }

        .video-feature-section.is-visible .video-reveal--caption {
          animation-delay: 260ms;
        }

        .testimonials-section {
          box-sizing: border-box;
          display: flex;
          width: min(100%, 90rem);
          margin: 0 auto;
          padding: 6.25rem 3.5rem;
          flex-direction: column;
          align-items: center;
          gap: 6.25rem;
          overflow: hidden;
          background: #fff;
        }

        .testimonials-header {
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          text-align: center;
        }

        .testimonials-eyebrow {
          align-self: stretch;
          margin: 0;
          color: var(--Light-Border-Text-Secondary, #969696);
          font-family: var(--Font-family-Heading, 'Plus Jakarta Sans', sans-serif);
          font-size: var(--Font-size-Tiny, 0.875rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Tiny, 1.25rem);
          text-align: center;
          font-feature-settings: 'liga' off, 'clig' off;
        }

        .testimonials-heading {
          margin: 0;
          color: #000;
          font-family: var(--Font-family-Heading, 'Plus Jakarta Sans', sans-serif);
          font-size: var(--Font-size-Heading-1, 2.5rem);
          font-style: normal;
          font-weight: 600;
          line-height: var(--Line-height-Heading-1, 3rem);
          letter-spacing: -0.03125rem;
          text-align: center;
          font-feature-settings: 'liga' off, 'clig' off;
          text-wrap: balance;
        }

        .testimonials-carousel {
          width: 100%;
          min-width: 0;
          overflow: hidden;
        }

        .testimonials-track {
          display: flex;
          width: max-content;
          align-items: stretch;
          animation: testimonials-marquee 48s linear infinite;
          animation-play-state: paused;
          will-change: transform;
        }

        .testimonials-section.is-visible .testimonials-track {
          animation-play-state: running;
        }

        .testimonials-carousel:hover .testimonials-track,
        .testimonials-carousel:focus-within .testimonials-track {
          animation-play-state: paused;
        }

        .testimonial-group {
          display: flex;
          flex: 0 0 auto;
          align-items: stretch;
          gap: 1rem;
          padding-right: 1rem;
        }

        .testimonial-card {
          position: relative;
          box-sizing: border-box;
          display: flex;
          flex: 0 0 29.5rem;
          width: 29.5rem;
          height: 17.625rem;
          padding: 1.25rem;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          overflow: hidden;
          border-radius: 1rem;
          border: 1px solid rgba(214, 204, 163, 0.02);
          background: rgba(214, 204, 163, 0.1);
          opacity: 0;
          transform: translateY(1rem);
        }

        .testimonial-quote {
          position: relative;
          z-index: 1;
          max-width: 100%;
          margin: 0;
          color: var(--Light-Border-Text-Secondary, #969696);
          font-family: var(--Font-family-Body, 'Plus Jakarta Sans', sans-serif);
          font-size: var(--Font-size-Small, 1rem);
          font-style: normal;
          font-weight: 400;
          line-height: var(--Line-height-Small, 1.5rem);
          font-feature-settings: 'liga' off, 'clig' off;
        }

        .testimonial-author {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }

        .testimonial-avatar {
          display: block;
          width: 2rem;
          height: 2rem;
          flex: 0 0 2rem;
          border-radius: 0.45rem;
          object-fit: cover;
          background: #e3ded0;
        }

        .testimonial-author-copy {
          display: flex;
          flex-direction: column;
          gap: 0.0625rem;
        }

        .testimonial-name,
        .testimonial-role {
          margin: 0;
          font-family: var(--Font-family-Body, 'Plus Jakarta Sans', sans-serif);
          font-size: 0.6875rem;
          line-height: 0.875rem;
        }

        .testimonial-name {
          color: #252525;
          font-weight: 600;
        }

        .testimonial-role {
          color: #a8a8a8;
          font-weight: 400;
        }

        .testimonial-decoration {
          position: absolute;
          right: -0.1rem;
          bottom: -0.15rem;
          z-index: 0;
          display: block;
          width: 8.5rem;
          height: 5.5rem;
          object-fit: contain;
          object-position: right bottom;
          opacity: 0.7;
          pointer-events: none;
        }

        .testimonial-reveal {
          opacity: 0;
          transform: translateY(1.25rem);
        }

        .testimonials-section.is-visible .testimonial-reveal,
        .testimonials-section.is-visible .testimonial-card {
          animation: reveal-up 720ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
        }

        .testimonials-section.is-visible .testimonial-reveal--header {
          animation-delay: 60ms;
        }

        .testimonials-section.is-visible .testimonial-reveal--carousel {
          animation-delay: 170ms;
        }

        .testimonial-group .testimonial-card:nth-child(1) { animation-delay: 180ms; }
        .testimonial-group .testimonial-card:nth-child(2) { animation-delay: 260ms; }
        .testimonial-group .testimonial-card:nth-child(3) { animation-delay: 340ms; }
        .testimonial-group .testimonial-card:nth-child(4) { animation-delay: 420ms; }
        .testimonial-group .testimonial-card:nth-child(5) { animation-delay: 500ms; }
        .testimonial-group .testimonial-card:nth-child(6) { animation-delay: 580ms; }

        @keyframes testimonials-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 1024px) {
          .intro-section {
            gap: 2.5rem;
            padding: 7rem 2.5rem 2.5rem;
          }

          .intro-heading {
            font-size: clamp(2.5rem, 5.2vw, 3.5rem);
            line-height: 1.14;
          }

          .feature-card {
            height: 36rem;
            padding: 2.5rem;
          }

          .partnerships-section {
            padding: 5rem 2.5rem;
            gap: 4rem;
          }

          .partnerships-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .partnership-card {
            height: 29rem;
            padding: 1.5rem;
          }

          .partnership-card-title {
            font-size: 1.25rem;
            line-height: 1.6;
          }

          .video-feature-section {
            padding: 5rem 2.5rem;
          }

          .video-feature-inner {
            gap: 4rem;
          }

          .video-feature-heading {
            font-size: clamp(2rem, 4.6vw, 2.5rem);
            line-height: 1.2;
          }

          .video-layout {
            gap: 1.25rem;
          }

          .video-main-frame {
            height: clamp(24rem, 49vw, 34.875rem);
          }

          .video-stack {
            height: clamp(24rem, 49vw, 34.875rem);
            gap: 0.5rem;
          }

          .video-thumbnail {
            flex-basis: clamp(3.5rem, 6.2vw, 6.6667rem);
            width: clamp(3.5rem, 6.2vw, 6.6667rem);
          }

          .video-feature-caption {
            margin-top: -2.75rem;
          }

          .testimonials-section {
            padding: 5rem 2.5rem;
            gap: 4rem;
          }

          .testimonials-heading {
            font-size: clamp(2rem, 4.6vw, 2.5rem);
            line-height: 1.2;
          }

          .testimonial-card {
            flex-basis: 27rem;
            width: 27rem;
          }
        }

        @media (max-width: 640px) {
          .intro-section {
            gap: 1.75rem;
            padding: 5.5rem 1.25rem 2.25rem;
          }

          .intro-eyebrow {
            font-size: 0.75rem;
            line-height: 1.125rem;
          }

          .intro-heading {
            font-size: clamp(2rem, 8.5vw, 2.75rem);
            line-height: 1.12;
            letter-spacing: -0.04rem;
          }

          .partnership-link {
            padding: 0.75rem;
            font-size: 0.9375rem;
          }

          .feature-card {
            height: 23rem;
            padding: 1.25rem;
          }

          .feature-image-wrap {
            border-radius: 0.75rem;
          }

          .partnerships-section {
            padding: 4rem 1.25rem;
            gap: 2.5rem;
          }

          .partnerships-header {
            gap: 0.5rem;
          }

          .partnerships-heading {
            font-size: clamp(1.875rem, 7vw, 2.5rem);
            line-height: 1.15;
            letter-spacing: -0.025rem;
          }

          .partnerships-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 1rem;
            max-width: 27rem;
          }

          .partnership-card {
            height: min(30.9375rem, 115vw);
            min-height: 23rem;
            padding: 1.5rem;
            border-radius: 0.875rem;
          }

          .partnership-card-title {
            font-size: 1.25rem;
            line-height: 1.5;
          }

          .video-feature-section {
            padding: 4rem 1.25rem;
          }

          .video-feature-inner {
            gap: 2.5rem;
          }

          .video-feature-heading {
            font-size: clamp(1.75rem, 7.5vw, 2.25rem);
            line-height: 1.18;
            letter-spacing: -0.025rem;
          }

          .video-layout {
            flex-direction: column;
            gap: 1rem;
          }

          .video-main-frame {
            order: 1;
            flex: none;
            width: 100%;
            height: auto;
            aspect-ratio: 16 / 9;
            border-radius: 0.75rem;
          }

          .video-stack {
            flex: none;
            width: 100%;
            height: 8.5rem;
            gap: 0.625rem;
            overflow-x: auto;
            overflow-y: hidden;
          }

          .video-stack--left {
            order: 0;
          }

          .video-stack--right {
            order: 2;
          }

          .video-thumbnail {
            flex: 0 0 4.5rem;
            width: 4.5rem;
            border-radius: 0.5rem;
          }

          .video-thumbnail-play {
            width: 2rem;
            height: 2rem;
            opacity: 0.85;
            transform: translate(-50%, -50%);
          }

          .video-feature-caption {
            margin: -1.5rem 0 0;
            font-size: 0.875rem;
            line-height: 1.45;
          }

          .join-partner-section {
            height: 26rem;
            min-height: 26rem;
            padding: 1.25rem;
          }

          .join-partner-copy {
            width: 100%;
          }

          .join-partner-heading {
            max-width: calc(100% - 2rem);
            font-size: clamp(1.75rem, 7vw, 2.5rem);
            line-height: 1.2;
          }

          .join-partner-logo {
            right: 1.25rem;
            bottom: 1.25rem;
            width: 3.5rem;
            height: 3.75rem;
          }

          .testimonials-section {
            padding: 4rem 1.25rem;
            gap: 2.5rem;
          }

          .testimonials-heading {
            font-size: clamp(1.875rem, 7vw, 2.5rem);
            line-height: 1.15;
            letter-spacing: -0.025rem;
          }

          .testimonials-track {
            animation-duration: 38s;
          }

          .testimonial-group {
            gap: 0.75rem;
            padding-right: 0.75rem;
          }

          .testimonial-card {
            flex-basis: min(82vw, 25rem);
            width: min(82vw, 25rem);
            height: 17.625rem;
            padding: 1.125rem;
          }

          .testimonial-quote {
            font-size: 0.9375rem;
            line-height: 1.45;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-reveal,
          .feature-card,
          .section-reveal,
          .partnership-card,
          .video-reveal,
          .video-thumbnail,
          .testimonial-reveal,
          .testimonial-card,
          .join-partner-reveal {
            opacity: 1;
            transform: none;
            animation: none !important;
          }

          .testimonials-track {
            animation: none !important;
            transform: none;
          }

          .feature-image,
          .partnership-card-image,
          .partnership-chevron,
          .video-thumbnail-media,
          .video-thumbnail,
          .video-thumbnail-play,
          .join-partner-button,
          .join-partner-chevron {
            transition: none;
            transform: none;
          }
        }
      `}</style>
    </main>
  )}</LocalizedContent>;
}
