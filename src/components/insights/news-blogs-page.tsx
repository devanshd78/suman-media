"use client";

import Image from "@/components/ui/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { inter, plusJakartaSans } from "@/lib/fonts";
import type { InsightCategory, InsightListItem } from "@/types/insights";

import styles from "./news-blogs.module.css";

type Props = {
    posts: InsightListItem[];
};

type FilterOption = {
    label: string;
    value: string;
};

const FILTERS: FilterOption[] = [
    { label: "All Articles", value: "all" },
    { label: "Events", value: "Events" },
    { label: "New added", value: "New added" },
    { label: "Press", value: "Press" },
    { label: "Case study", value: "Case study" },
];

function ArrowRight() {
    return (
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
            <path
                d="M4 10h11M11 6l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function categoryLabel(post: InsightListItem) {
    return post.categories?.[0]?.title?.trim() || "New launches";
}

function formatDate(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
}

function matchesFilter(post: InsightListItem, filter: string) {
    if (filter === "all") return true;

    return (
        post.categories?.some(
            (category: InsightCategory) => category.title.toLowerCase() === filter.toLowerCase(),
        ) ?? false
    );
}

function Meta({ post, inverse = false }: { post: InsightListItem; inverse?: boolean }) {
    return (
        <div className={styles.meta} data-inverse={inverse ? "true" : "false"}>
            <span className={styles.categoryPill}>{categoryLabel(post)}</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>
    );
}

function StandardCard({ post }: { post: InsightListItem }) {
    return (
        <article className={styles.newsCard}>
            <Link href={`/insights/${post.slug}`} className={styles.cardLink}>
                <div className={styles.newsCardImageWrap}>
                    <Image
                        src={post.imageUrl}
                        alt={post.imageAlt?.trim() || post.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 31vw"
                        className={styles.cardImage}
                    />
                </div>
                <div className={styles.cardBody}>
                    <Meta post={post} />
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                </div>
            </Link>
        </article>
    );
}

function FeatureLarge({ post }: { post: InsightListItem }) {
    return (
        <article className={styles.featureLarge}>
            <Link href={`/insights/${post.slug}`} className={styles.cardLink}>
                <div className={styles.featureLargeImageWrap}>
                    <Image
                        src={post.imageUrl}
                        alt={post.imageAlt?.trim() || post.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 767px) 92vw, 62vw"
                        className={styles.cardImage}
                    />
                </div>
                <div className={styles.featureLargeBody}>
                    <Meta post={post} />
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                </div>
            </Link>
        </article>
    );
}

function FeatureCompact({ post }: { post: InsightListItem }) {
    return (
        <article className={styles.featureCompact}>
            <Link href={`/insights/${post.slug}`} className={styles.compactLink}>
                <div className={styles.featureCompactImageWrap}>
                    <Image
                        src={post.imageUrl}
                        alt={post.imageAlt?.trim() || post.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 767px) 36vw, 18vw"
                        className={styles.cardImage}
                    />
                </div>
                <div className={styles.featureCompactBody}>
                    <Meta post={post} />
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                </div>
            </Link>
        </article>
    );
}

export function NewsBlogsPage({ posts }: Props) {
    const [filter, setFilter] = useState("all");
    const [visibleCount, setVisibleCount] = useState(9);

    const hero = posts[0];
    const featureLarge = posts[1] ?? posts[0];
    const featureCompact = [posts[2] ?? posts[0], posts[3] ?? posts[1] ?? posts[0]].filter(Boolean);
    const latestPool = posts.length > 4 ? posts.slice(4) : posts.slice(1);

    const filteredLatest = useMemo(
        () => latestPool.filter((post) => matchesFilter(post, filter)),
        [filter, latestPool],
    );

    const visibleLatest = filteredLatest.slice(0, visibleCount);
    const pressPosts = posts.filter((post) => matchesFilter(post, "Press"));
    const pressItems = pressPosts.length > 0 ? pressPosts : posts.slice(0, 4);

    if (!hero) return null;

    return (
        <main className={`${plusJakartaSans.variable} ${inter.variable} ${styles.page}`}>
            <section className={styles.hero} aria-labelledby="news-blogs-hero-title">
                <Link href={`/insights/${hero.slug}`} className={styles.heroLink}>
                    <Image
                        src={hero.imageUrl}
                        alt={hero.imageAlt?.trim() || hero.title}
                        fill
                        priority
                        sizes="100vw"
                        className={styles.heroImage}
                    />
                    <div className={styles.heroShade} aria-hidden="true" />
                    <div className={styles.heroCopy}>
                        <Meta post={hero} inverse />
                        <h1 id="news-blogs-hero-title">{hero.title}</h1>
                        <p>{hero.excerpt}</p>
                    </div>
                </Link>
            </section>

            <section className={styles.featured} aria-label="Featured articles">
                <div className={styles.featuredGrid}>
                    <FeatureLarge post={featureLarge} />
                    <div className={styles.featureCompactStack}>
                        {featureCompact.map((post) => (
                            <FeatureCompact key={post._id} post={post} />
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.latestSection} aria-labelledby="latest-news-heading">
                <div className={styles.sectionHeadingRow}>
                    <h2 id="latest-news-heading">Latest News</h2>
                    <div className={styles.filters} role="group" aria-label="Filter latest news">
                        {FILTERS.map((option) => {
                            const active = filter === option.value;
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={styles.filterButton}
                                    data-active={active ? "true" : "false"}
                                    aria-pressed={active}
                                    onClick={() => {
                                        setFilter(option.value);
                                        setVisibleCount(9);
                                    }}
                                >
                                    <span className={styles.filterDot} aria-hidden="true" />
                                    <span>{option.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className={styles.newsGrid}>
                    {visibleLatest.map((post) => (
                        <StandardCard key={post._id} post={post} />
                    ))}
                </div>

                {visibleLatest.length < filteredLatest.length ? (
                    <button
                        type="button"
                        className={styles.loadMore}
                        onClick={() => setVisibleCount((count) => count + 6)}
                    >
                        load more
                    </button>
                ) : null}
            </section>

            <section className={styles.pressSection} aria-labelledby="press-heading">
                <div className={styles.pressHeadingRow}>
                    <h2 id="press-heading">Press</h2>
                    <nav className={styles.pressLinks} aria-label="Press links">
                        <Link href="/contact">Contact us</Link>
                        <Link href="/contact">Contact us</Link>
                        <Link href="/case-studies">case study</Link>
                    </nav>
                </div>

                <div className={styles.pressRail} data-lenis-prevent>
                    {pressItems.map((post, index) => (
                        <article className={styles.pressCard} key={`${post._id}-${index}`}>
                            <Link href={`/insights/${post.slug}`} className={styles.cardLink}>
                                <div className={styles.pressImageWrap}>
                                    <Image
                                        src={post.imageUrl}
                                        alt={post.imageAlt?.trim() || post.title}
                                        fill
                                        loading="lazy"
                                        sizes="(max-width: 767px) 86vw, 46vw"
                                        className={styles.cardImage}
                                    />
                                </div>
                                <div className={styles.pressBody}>
                                    <Meta post={post} />
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </section>

            <div className={styles.mobileViewAll}>
                <Link href="#latest-news-heading">
                    View all <ArrowRight />
                </Link>
            </div>
        </main>
    );
}
