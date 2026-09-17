import Image from "@/components/ui/image";
import Link from "next/link";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";

import {
    inter,
    plusJakartaSans,
} from "@/lib/fonts";

import type {
    InsightDetail,
    InsightListItem,
    PortableTextBlock,
    PortableTextMarkDef,
    PortableTextNode,
    PortableTextSpan,
} from "@/types/news-and-blogs";

import styles from "./news-blog-detail.module.css";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
    display: "swap",
});

const DATE_FORMATTER =
    new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

type Props = {
    article: InsightDetail;
};

function Arrow({
    direction = "right",
}: {
    direction?: "left" | "right";
}) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
        >
            <path
                d={
                    direction === "right"
                        ? "M4 10h11M11 6l4 4-4 4"
                        : "M16 10H5M9 6l-4 4 4 4"
                }
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function formatDate(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return DATE_FORMATTER.format(date);
}

function categoryLabel(
    article: InsightDetail,
) {
    return (
        article.categories?.[0]?.title?.trim() ||
        "New launches"
    );
}

function imagePosition(
    item: InsightListItem,
) {
    if (
        typeof item.imageHotspotX !== "number" ||
        typeof item.imageHotspotY !== "number"
    ) {
        return "center";
    }

    return `${Math.round(
        item.imageHotspotX * 100,
    )}% ${Math.round(
        item.imageHotspotY * 100,
    )}%`;
}

function calculateReadingTime(
    body:
        | PortableTextNode[]
        | null
        | undefined,
) {
    const wordCount = (body ?? []).reduce(
        (sum, node) => {
            if (node._type !== "block") {
                return sum;
            }

            const text =
                node.children
                    ?.map(
                        (child: PortableTextSpan) =>
                            child.text,
                    )
                    .join(" ") ?? "";

            return (
                sum +
                text
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean).length
            );
        },
        0,
    );

    return Math.max(
        1,
        Math.ceil(wordCount / 200),
    );
}

function renderSpan(
    span: PortableTextSpan,
    block: PortableTextBlock,
): ReactNode {
    let content: ReactNode = span.text;

    for (const mark of span.marks ?? []) {
        if (mark === "strong") {
            content = (
                <strong
                    key={`${span._key}-strong`}
                >
                    {content}
                </strong>
            );
            continue;
        }

        if (mark === "em") {
            content = (
                <em key={`${span._key}-em`}>
                    {content}
                </em>
            );
            continue;
        }

        if (mark === "code") {
            content = (
                <code
                    key={`${span._key}-code`}
                >
                    {content}
                </code>
            );
            continue;
        }

        const def =
            block.markDefs?.find(
                (
                    item: PortableTextMarkDef,
                ) => item._key === mark,
            );

        if (!def?.href) {
            continue;
        }

        const external =
            /^https?:\/\//i.test(def.href);

        const openInNewTab =
            Boolean(def.openInNewTab) ||
            external;

        content = (
            <a
                key={`${span._key}-${mark}`}
                href={def.href}
                target={
                    openInNewTab
                        ? "_blank"
                        : undefined
                }
                rel={
                    openInNewTab
                        ? "noopener noreferrer"
                        : undefined
                }
            >
                {content}
            </a>
        );
    }

    return content;
}

function blockChildren(
    block: PortableTextBlock,
) {
    return (
        block.children?.map(
            (span: PortableTextSpan) =>
                renderSpan(span, block),
        ) ?? null
    );
}

function ArticleBody({
    body,
}: {
    body?: PortableTextNode[] | null;
}) {
    const nodes = body ?? [];
    const rendered: ReactNode[] = [];

    let index = 0;

    while (index < nodes.length) {
        const node = nodes[index];

        if (node._type === "mediaImage") {
            rendered.push(
                <figure
                    className={`${styles.articleFigure} ${styles.scrollReveal}`}
                    key={node._key}
                >
                    <div
                        className={
                            styles.articleFigureImage
                        }
                    >
                        <Image
                            src={node.imageUrl}
                            alt={
                                node.imageAlt?.trim() ||
                                ""
                            }
                            fill
                            loading="lazy"
                            sizes="(max-width: 767px) 92vw, 760px"
                            className={
                                styles.articleImage
                            }
                        />
                    </div>

                    {node.caption ? (
                        <figcaption>
                            {node.caption}
                        </figcaption>
                    ) : null}
                </figure>,
            );

            index += 1;
            continue;
        }

        if (node.listItem) {
            const listType = node.listItem;
            const listNodes: PortableTextBlock[] =
                [];

            let cursor = index;

            while (
                cursor < nodes.length &&
                nodes[cursor]._type === "block" &&
                (
                    nodes[
                    cursor
                    ] as PortableTextBlock
                ).listItem === listType
            ) {
                listNodes.push(
                    nodes[
                    cursor
                    ] as PortableTextBlock,
                );

                cursor += 1;
            }

            const ListTag =
                listType === "number"
                    ? "ol"
                    : "ul";

            rendered.push(
                <ListTag
                    className={`${styles.articleList} ${styles.scrollReveal}`}
                    key={`list-${node._key}`}
                >
                    {listNodes.map(
                        (listNode) => (
                            <li key={listNode._key}>
                                {blockChildren(
                                    listNode,
                                )}
                            </li>
                        ),
                    )}
                </ListTag>,
            );

            index = cursor;
            continue;
        }

        const children =
            blockChildren(node);

        if (node.style === "h2") {
            rendered.push(
                <h2 className={styles.scrollReveal} key={node._key}>
                    {children}
                </h2>,
            );
        } else if (
            node.style === "h3"
        ) {
            rendered.push(
                <h3 className={styles.scrollReveal} key={node._key}>
                    {children}
                </h3>,
            );
        } else if (
            node.style === "h4"
        ) {
            rendered.push(
                <h4 className={styles.scrollReveal} key={node._key}>
                    {children}
                </h4>,
            );
        } else if (
            node.style === "blockquote"
        ) {
            rendered.push(
                <blockquote
                    className={styles.scrollReveal}
                    key={node._key}
                >
                    {children}
                </blockquote>,
            );
        } else {
            rendered.push(
                <p className={styles.scrollReveal} key={node._key}>
                    {children}
                </p>,
            );
        }

        index += 1;
    }

    return (
        <div className={styles.articleBody}>
            {rendered}
        </div>
    );
}

function SmallArticleCard({
    post,
}: {
    post: InsightListItem;
}) {
    return (
        <article
            className={`${styles.relatedCard} ${styles.cardReveal}`}
        >
            <Link
                href={`/news-and-blogs/${post.slug}`}
            >
                <div
                    className={
                        styles.relatedImageWrap
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
                        sizes="(max-width: 767px) 92vw, 30vw"
                        style={{
                            objectPosition:
                                imagePosition(post),
                        }}
                        className={
                            styles.relatedImage
                        }
                    />
                </div>

                <div
                    className={styles.relatedMeta}
                >
                    <span>
                        {post.categories?.[0]
                            ?.title || "New launches"}
                    </span>

                    <time
                        dateTime={
                            post.publishedAt
                        }
                    >
                        {formatDate(
                            post.publishedAt,
                        )}
                    </time>
                </div>

                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
            </Link>
        </article>
    );
}

export function NewsBlogDetail({
    article,
}: Props) {
    const readingTime =
        article.readingTimeMinutes ??
        calculateReadingTime(
            article.body,
        );

    const related =
        article.relatedPosts ?? [];

    return (
        <main
            className={`${plusJakartaSans.variable} ${inter.variable} ${manrope.variable} ${styles.page}`}
        >
            <header
                className={styles.articleHeader}
            >
                <div
                    className={
                        styles.articleHeaderGrid
                    }
                >
                    <h1 className={styles.headerTitleReveal}>{article.title}</h1>
                    <p className={styles.headerExcerptReveal}>{article.excerpt}</p>
                </div>

                <div
                    className={`${styles.articleMetaRow} ${styles.headerMetaReveal}`}
                >
                    <span
                        className={
                            styles.categoryPill
                        }
                    >
                        {categoryLabel(article)}
                    </span>

                    <span>
                        {readingTime} min read
                    </span>

                    <time
                        dateTime={
                            article.publishedAt
                        }
                    >
                        {formatDate(
                            article.publishedAt,
                        )}
                    </time>
                </div>
            </header>

            <section
                className={`${styles.heroMedia} ${styles.heroMediaReveal}`}
                aria-label="Article hero image"
            >
                <Image
                    src={article.imageUrl}
                    alt={
                        article.imageAlt?.trim() ||
                        article.title
                    }
                    fill
                    priority
                    sizes="100vw"
                    style={{
                        objectPosition:
                            imagePosition(article),
                    }}
                    className={`${styles.heroImage} ${styles.heroImageReveal}`}
                />
            </section>

            {article.imageCredit ? (
                <p
                    className={`${styles.imageCredit} ${styles.scrollReveal}`}
                >
                    Image credit:{" "}
                    {article.imageCredit}
                </p>
            ) : null}

            <section
                className={
                    styles.contentSection
                }
            >
                <div
                    className={styles.contentGrid}
                >
                    <article
                        className={
                            styles.articleColumn
                        }
                    >
                        <ArticleBody
                            body={article.body}
                        />
                    </article>

                    <aside
                        className={`${styles.sidebar} ${styles.sidebarReveal}`}
                    >
                        <div
                            className={
                                styles.sidebarSticky
                            }
                        >
                            <div
                                className={
                                    styles.sidebarHeadingRow
                                }
                            >
                                <h2
                                    className={
                                        styles.sidebarEyebrow
                                    }
                                >
                                    Related articles
                                </h2>

                                <Link
                                    href="/news-and-blogs"
                                    className={
                                        styles.sidebarArrowButton
                                    }
                                    aria-label="View all related articles"
                                >
                                    <Arrow />
                                </Link>
                            </div>

                            {related.length > 0 ? (
                                <div
                                    className={
                                        styles.sidebarLinks
                                    }
                                >
                                    {related
                                        .slice(0, 3)
                                        .map(
                                            (
                                                post: InsightListItem,
                                            ) => (
                                                <Link
                                                    href={`/news-and-blogs/${post.slug}`}
                                                    key={
                                                        post._id
                                                    }
                                                >
                                                    {
                                                        post.title
                                                    }
                                                </Link>
                                            ),
                                        )}
                                </div>
                            ) : null}

                            <div
                                className={
                                    styles.sidebarRule
                                }
                                aria-hidden="true"
                            />

                            <div
                                className={
                                    styles.connectBox
                                }
                            >
                                <Link href="/contact">
                                    Connect with Suman
                                    Entertainment
                                </Link>

                                <p>
                                    Cannes 2026 · Bharat
                                    (India) Pavilion
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {(article.previousPost ||
                article.nextPost) && (
                    <nav
                        className={`${styles.articlePager} ${styles.sectionReveal}`}
                        aria-label="Article navigation"
                    >
                        <div>
                            {article.previousPost ? (
                                <Link
                                    href={`/news-and-blogs/${article.previousPost.slug}`}
                                >
                                    <Arrow direction="left" />
                                    <span>
                                        Previous article
                                    </span>
                                </Link>
                            ) : null}
                        </div>

                        <div>
                            {article.nextPost ? (
                                <Link
                                    href={`/news-and-blogs/${article.nextPost.slug}`}
                                    data-align="right"
                                >
                                    <span>
                                        Next article
                                    </span>
                                    <Arrow />
                                </Link>
                            ) : null}
                        </div>
                    </nav>
                )}

            {related.length > 0 ? (
                <section
                    className={
                        styles.exploreSection
                    }
                    aria-labelledby="explore-other-articles-heading"
                >
                    <div
                        className={`${styles.exploreHeading} ${styles.sectionReveal}`}
                    >
                        <h2 id="explore-other-articles-heading">
                            Explore other articles
                        </h2>

                        <Link href="/news-and-blogs">
                            View all
                        </Link>
                    </div>

                    <div
                        className={
                            styles.relatedGrid
                        }
                    >
                        {related
                            .slice(0, 3)
                            .map(
                                (
                                    post: InsightListItem,
                                ) => (
                                    <SmallArticleCard
                                        post={post}
                                        key={post._id}
                                    />
                                ),
                            )}
                    </div>
                </section>
            ) : null}
        </main>
    );
}
