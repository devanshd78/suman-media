"use client";

import Image from "@/components/ui/image";
import Link from "next/link";
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type FocusEvent as ReactFocusEvent,
    type PointerEvent as ReactPointerEvent,
} from "react";

import { inter, plusJakartaSans } from "@/lib/fonts";
import type {
    InsightCategory,
    InsightListItem,
} from "@/types/news-and-blogs";

import styles from "./news-blogs.module.css";

type Props = {
    posts: InsightListItem[];
};

type FilterOption = {
    label: string;
    value: string;
};

const PRESS_DRAG_THRESHOLD = 7;

const FILTERS: readonly FilterOption[] = [
    { label: "All Articles", value: "all" },
    { label: "Events", value: "Events" },
    { label: "New added", value: "New added" },
    { label: "Press", value: "Press" },
    { label: "Case study", value: "Case study" },
];

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
});

function FilterRadio({ active }: { active: boolean }) {
    return (
        <svg
            className={styles.filterRadio}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            {active ? (
                <>
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                        fill="#111111"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                        fill="white"
                    />
                </>
            ) : (
                <circle
                    cx="12"
                    cy="12"
                    r="11.25"
                    stroke="rgba(0, 6, 38, 0.45)"
                    strokeWidth="1.5"
                />
            )}
        </svg>
    );
}

function categoryLabel(post: InsightListItem) {
    return post.categories?.[0]?.title?.trim() || "New launches";
}

function formatDate(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return DATE_FORMATTER.format(date);
}

function imagePosition(post: InsightListItem) {
    if (
        typeof post.imageHotspotX !== "number" ||
        typeof post.imageHotspotY !== "number"
    ) {
        return "center";
    }

    return `${Math.round(post.imageHotspotX * 100)}% ${Math.round(
        post.imageHotspotY * 100,
    )}%`;
}

function matchesFilter(post: InsightListItem, filter: string) {
    if (filter === "all") {
        return true;
    }

    return (
        post.categories?.some(
            (category: InsightCategory) =>
                category.title.toLowerCase() === filter.toLowerCase(),
        ) ?? false
    );
}

function Meta({
    post,
    inverse = false,
}: {
    post: InsightListItem;
    inverse?: boolean;
}) {
    return (
        <div
            className={styles.meta}
            data-inverse={inverse ? "true" : "false"}
        >
            <span className={styles.categoryPill}>
                {categoryLabel(post)}
            </span>

            <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
            </time>
        </div>
    );
}

function StandardCard({ post }: { post: InsightListItem }) {
    return (
        <article className={`${styles.newsCard} ${styles.motionCard}`}>
            <Link
                href={`/news-and-blogs/${post.slug}`}
                className={styles.cardLink}
            >
                <div className={styles.newsCardImageWrap}>
                    <Image
                        src={post.imageUrl}
                        alt={post.imageAlt?.trim() || post.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 31vw"
                        style={{ objectPosition: imagePosition(post) }}
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
        <article className={`${styles.featureLarge} ${styles.motionCard}`}>
            <Link
                href={`/news-and-blogs/${post.slug}`}
                className={styles.cardLink}
            >
                <div className={styles.featureLargeImageWrap}>
                    <Image
                        src={post.imageUrl}
                        alt={post.imageAlt?.trim() || post.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 767px) 92vw, 50vw"
                        style={{ objectPosition: imagePosition(post) }}
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
        <article className={`${styles.featureCompact} ${styles.motionCard}`}>
            <Link
                href={`/news-and-blogs/${post.slug}`}
                className={styles.compactLink}
            >
                <div className={styles.featureCompactImageWrap}>
                    <Image
                        src={post.imageUrl}
                        alt={post.imageAlt?.trim() || post.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 767px) 36vw, 18vw"
                        style={{ objectPosition: imagePosition(post) }}
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
    const [pressDragging, setPressDragging] = useState(false);
    const [pressPaused, setPressPaused] = useState(false);

    const pressRailRef = useRef<HTMLDivElement>(null);
    const pressDragStartRef = useRef({ x: 0, scrollLeft: 0 });
    const pressPointerIdRef = useRef<number | null>(null);
    const pressDidDragRef = useRef(false);
    const suppressPressClickRef = useRef(false);

    const {
        hero,
        featureLarge,
        featureCompact,
        latestPool,
        pressItems,
    } = useMemo(() => {
        const first = posts[0];
        const large = posts[1] ?? first;

        const compact = [
            posts[2] ?? first,
            posts[3] ?? posts[1] ?? first,
        ].filter(
            (post): post is InsightListItem => Boolean(post),
        );

        const latest =
            posts.length > 4
                ? posts.slice(4)
                : posts.slice(1);

        const pressPosts = posts.filter((post) =>
            matchesFilter(post, "Press"),
        );

        return {
            hero: first,
            featureLarge: large,
            featureCompact: compact,
            latestPool: latest,
            pressItems:
                pressPosts.length > 0
                    ? pressPosts
                    : posts.slice(0, 4),
        };
    }, [posts]);

    const filteredLatest = useMemo(
        () =>
            latestPool.filter((post) =>
                matchesFilter(post, filter),
            ),
        [filter, latestPool],
    );

    const visibleLatest = useMemo(
        () => filteredLatest.slice(0, visibleCount),
        [filteredLatest, visibleCount],
    );

    const scrollPressToNearest = useCallback(() => {
        const rail = pressRailRef.current;

        if (!rail) {
            return;
        }

        const cards = Array.from(
            rail.querySelectorAll<HTMLElement>(
                "[data-press-card]",
            ),
        );

        if (cards.length === 0) {
            return;
        }

        const computed =
            window.getComputedStyle(rail);

        const leftPadding =
            Number.parseFloat(
                computed.paddingLeft,
            ) || 0;

        const currentLeft =
            rail.scrollLeft + leftPadding;

        let nearest = cards[0];
        let nearestDistance =
            Number.POSITIVE_INFINITY;

        for (const card of cards) {
            const distance = Math.abs(
                card.offsetLeft - currentLeft,
            );

            if (distance < nearestDistance) {
                nearest = card;
                nearestDistance = distance;
            }
        }

        rail.scrollTo({
            left: Math.max(
                0,
                nearest.offsetLeft - leftPadding,
            ),
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches
                ? "auto"
                : "smooth",
        });
    }, []);

    const advancePressCarousel =
        useCallback(() => {
            const rail = pressRailRef.current;

            if (!rail) {
                return;
            }

            const cards = Array.from(
                rail.querySelectorAll<HTMLElement>(
                    "[data-press-card]",
                ),
            );

            if (cards.length < 2) {
                return;
            }

            const computed =
                window.getComputedStyle(rail);

            const leftPadding =
                Number.parseFloat(
                    computed.paddingLeft,
                ) || 0;

            const currentLeft =
                rail.scrollLeft + leftPadding;

            let currentIndex = 0;
            let closestDistance =
                Number.POSITIVE_INFINITY;

            cards.forEach((card, index) => {
                const distance = Math.abs(
                    card.offsetLeft - currentLeft,
                );

                if (distance < closestDistance) {
                    currentIndex = index;
                    closestDistance = distance;
                }
            });

            const nextIndex =
                (currentIndex + 1) % cards.length;

            const nextCard = cards[nextIndex];

            rail.scrollTo({
                left:
                    nextIndex === 0
                        ? 0
                        : Math.max(
                            0,
                            nextCard.offsetLeft -
                            leftPadding,
                        ),
                behavior: "smooth",
            });
        }, []);

    useEffect(() => {
        if (
            pressItems.length < 2 ||
            pressDragging ||
            pressPaused ||
            window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches
        ) {
            return;
        }

        const timer = window.setInterval(
            advancePressCarousel,
            4500,
        );

        return () => {
            window.clearInterval(timer);
        };
    }, [
        advancePressCarousel,
        pressDragging,
        pressItems.length,
        pressPaused,
    ]);

    const handlePressPointerDown =
        useCallback(
            (
                event: ReactPointerEvent<HTMLDivElement>,
            ) => {
                if (
                    event.pointerType === "mouse" &&
                    event.button !== 0
                ) {
                    return;
                }

                const rail = pressRailRef.current;

                if (!rail) {
                    return;
                }

                suppressPressClickRef.current = false;
                pressPointerIdRef.current =
                    event.pointerId;
                pressDidDragRef.current = false;

                pressDragStartRef.current = {
                    x: event.clientX,
                    scrollLeft: rail.scrollLeft,
                };

                setPressPaused(true);
            },
            [],
        );

    const handlePressPointerMove =
        useCallback(
            (
                event: ReactPointerEvent<HTMLDivElement>,
            ) => {
                if (
                    pressPointerIdRef.current !==
                    event.pointerId
                ) {
                    return;
                }

                const rail = pressRailRef.current;

                if (!rail) {
                    return;
                }

                const delta =
                    event.clientX -
                    pressDragStartRef.current.x;

                if (!pressDidDragRef.current) {
                    if (
                        Math.abs(delta) <
                        PRESS_DRAG_THRESHOLD
                    ) {
                        return;
                    }

                    pressDidDragRef.current = true;
                    setPressDragging(true);

                    if (
                        !rail.hasPointerCapture(
                            event.pointerId,
                        )
                    ) {
                        rail.setPointerCapture(
                            event.pointerId,
                        );
                    }
                }

                rail.scrollLeft =
                    pressDragStartRef.current.scrollLeft -
                    delta;
            },
            [],
        );

    const finishPressDrag = useCallback(
        (
            event: ReactPointerEvent<HTMLDivElement>,
        ) => {
            if (
                pressPointerIdRef.current !==
                event.pointerId
            ) {
                return;
            }

            const rail = pressRailRef.current;

            if (!rail) {
                pressPointerIdRef.current = null;
                setPressDragging(false);
                return;
            }

            if (
                rail.hasPointerCapture(
                    event.pointerId,
                )
            ) {
                rail.releasePointerCapture(
                    event.pointerId,
                );
            }

            const didDrag =
                pressDidDragRef.current;

            if (didDrag) {
                suppressPressClickRef.current = true;

                window.setTimeout(() => {
                    suppressPressClickRef.current = false;
                }, 120);
            }

            pressPointerIdRef.current = null;
            pressDidDragRef.current = false;
            setPressDragging(false);
            setPressPaused(false);

            if (didDrag) {
                window.requestAnimationFrame(
                    scrollPressToNearest,
                );
            }
        },
        [scrollPressToNearest],
    );

    const handlePressBlur = useCallback(
        (
            event: ReactFocusEvent<HTMLDivElement>,
        ) => {
            const nextTarget =
                event.relatedTarget;

            if (
                nextTarget instanceof Node &&
                event.currentTarget.contains(
                    nextTarget,
                )
            ) {
                return;
            }

            setPressPaused(false);
        },
        [],
    );

    if (!hero || !featureLarge) {
        return null;
    }

    return (
        <main
            className={`${plusJakartaSans.variable} ${inter.variable} ${styles.page}`}
        >
            <section
                className={`${styles.hero} ${styles.heroEnter}`}
                aria-labelledby="news-blogs-hero-title"
            >
                <Link
                    href={`/news-and-blogs/${hero.slug}`}
                    className={styles.heroLink}
                >
                    <Image
                        src={hero.imageUrl}
                        alt={
                            hero.imageAlt?.trim() ||
                            hero.title
                        }
                        fill
                        priority
                        sizes="100vw"
                        style={{
                            objectPosition:
                                imagePosition(hero),
                        }}
                        className={styles.heroImage}
                    />

                    <div
                        className={styles.heroShade}
                        aria-hidden="true"
                    />

                    <div className={`${styles.heroCopy} ${styles.heroCopyEnter}`}>
                        <Meta post={hero} inverse />

                        <h1 id="news-blogs-hero-title">
                            {hero.title}
                        </h1>

                        <p>{hero.excerpt}</p>
                    </div>
                </Link>
            </section>

            <section
                className={styles.featured}
                aria-label="Featured articles"
            >
                <div
                    className={styles.featuredGrid}
                >
                    <FeatureLarge
                        post={featureLarge}
                    />

                    <div
                        className={
                            styles.featureCompactStack
                        }
                    >
                        {featureCompact.map((post) => (
                            <FeatureCompact
                                key={post._id}
                                post={post}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section
                className={styles.latestSection}
                aria-labelledby="latest-news-heading"
            >
                <div
                    className={`${styles.sectionHeadingRow} ${styles.sectionReveal}`}
                >
                    <h2 id="latest-news-heading">
                        Latest News
                    </h2>

                    <div
                        className={styles.filters}
                        role="group"
                        aria-label="Filter latest news"
                    >
                        {FILTERS.map((option) => {
                            const active =
                                filter === option.value;

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={
                                        styles.filterButton
                                    }
                                    data-active={
                                        active
                                            ? "true"
                                            : "false"
                                    }
                                    aria-pressed={active}
                                    onClick={() => {
                                        setFilter(
                                            option.value,
                                        );
                                        setVisibleCount(9);
                                    }}
                                >
                                    <FilterRadio
                                        active={active}
                                    />

                                    <span>
                                        {option.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {visibleLatest.length > 0 ? (
                    <div className={styles.newsGrid}>
                        {visibleLatest.map((post) => (
                            <StandardCard
                                key={post._id}
                                post={post}
                            />
                        ))}
                    </div>
                ) : (
                    <p className={`${styles.emptyState} ${styles.sectionReveal}`}>
                        No articles are available in this
                        category yet.
                    </p>
                )}

                {visibleLatest.length <
                    filteredLatest.length ? (
                    <button
                        type="button"
                        className={styles.loadMore}
                        onClick={() =>
                            setVisibleCount(
                                (count) => count + 6,
                            )
                        }
                    >
                        load more
                    </button>
                ) : null}
            </section>

            {pressItems.length > 0 ? (
                <section
                    className={styles.pressSection}
                    aria-labelledby="press-heading"
                >
                    <div
                        className={`${styles.pressHeadingRow} ${styles.sectionReveal}`}
                    >
                        <h2 id="press-heading">
                            Press
                        </h2>

                        <nav
                            className={
                                styles.pressLinks
                            }
                            aria-label="Press links"
                        >
                            <Link href="/contact">
                                Contact us
                            </Link>

                            <Link href="/case-studies">
                                Case study
                            </Link>
                        </nav>
                    </div>

                    <div
                        ref={pressRailRef}
                        className={styles.pressRail}
                        data-dragging={
                            pressDragging
                                ? "true"
                                : "false"
                        }
                        data-lenis-prevent-horizontal
                        role="region"
                        aria-label="Press carousel"
                        tabIndex={0}
                        onPointerEnter={() =>
                            setPressPaused(true)
                        }
                        onPointerLeave={() => {
                            if (!pressDragging) {
                                setPressPaused(false);
                            }
                        }}
                        onFocusCapture={() =>
                            setPressPaused(true)
                        }
                        onBlurCapture={
                            handlePressBlur
                        }
                        onPointerDown={
                            handlePressPointerDown
                        }
                        onPointerMove={
                            handlePressPointerMove
                        }
                        onPointerUp={
                            finishPressDrag
                        }
                        onPointerCancel={
                            finishPressDrag
                        }
                        onClickCapture={(event) => {
                            if (
                                !suppressPressClickRef.current
                            ) {
                                return;
                            }

                            event.preventDefault();
                            event.stopPropagation();
                        }}
                    >
                        {pressItems.map(
                            (post, index) => (
                                <article
                                    className={`${styles.pressCard} ${styles.motionCard}`}
                                    key={`${post._id}-${index}`}
                                    data-press-card
                                >
                                    <Link
                                        href={`/news-and-blogs/${post.slug}`}
                                        className={
                                            styles.cardLink
                                        }
                                    >
                                        <div
                                            className={
                                                styles.pressImageWrap
                                            }
                                        >
                                            <Image
                                                src={post.imageUrl}
                                                alt={
                                                    post.imageAlt?.trim() ||
                                                    post.title
                                                }
                                                fill
                                                loading="lazy"
                                                sizes="(max-width: 767px) 86vw, 46vw"
                                                style={{
                                                    objectPosition:
                                                        imagePosition(
                                                            post,
                                                        ),
                                                }}
                                                className={
                                                    styles.cardImage
                                                }
                                            />
                                        </div>

                                        <div
                                            className={
                                                styles.pressBody
                                            }
                                        >
                                            <Meta post={post} />
                                            <h3>
                                                {post.title}
                                            </h3>
                                            <p>
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    </Link>
                                </article>
                            ),
                        )}
                    </div>
                </section>
            ) : null}
        </main>
    );
}
