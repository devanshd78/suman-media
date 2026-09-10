import Image from "@/components/ui/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { inter, plusJakartaSans } from "@/lib/fonts";
import type {
    InsightDetail,
    InsightListItem,
    PortableTextBlock,
    PortableTextMarkDef,
    PortableTextNode,
    PortableTextSpan,
} from "@/types/insights";

import styles from "./news-blog-detail.module.css";

type Props = {
    article: InsightDetail;
};

function Arrow({ direction = "right" }: { direction?: "left" | "right" }) {
    return (
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
            <path
                d={direction === "right" ? "M4 10h11M11 6l4 4-4 4" : "M16 10H5M9 6l-4 4 4 4"}
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
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
}

function categoryLabel(article: InsightDetail) {
    return article.categories?.[0]?.title?.trim() || "New launches";
}

function calculateReadingTime(body: PortableTextNode[] | null | undefined) {
    const wordCount = (body ?? []).reduce((sum, node) => {
        if (node._type !== "block") return sum;
        const text = node.children?.map((child: PortableTextSpan) => child.text).join(" ") ?? "";
        return sum + text.trim().split(/\s+/).filter(Boolean).length;
    }, 0);

    return Math.max(1, Math.ceil(wordCount / 200));
}

function renderSpan(span: PortableTextSpan, block: PortableTextBlock): ReactNode {
    let content: ReactNode = span.text;

    for (const mark of span.marks ?? []) {
        if (mark === "strong") content = <strong key={`${span._key}-strong`}>{content}</strong>;
        else if (mark === "em") content = <em key={`${span._key}-em`}>{content}</em>;
        else if (mark === "code") content = <code key={`${span._key}-code`}>{content}</code>;
        else {
            const def = block.markDefs?.find((item: PortableTextMarkDef) => item._key === mark);
            if (def?.href) {
                const external = /^https?:\/\//i.test(def.href);
                content = (
                    <a
                        key={`${span._key}-${mark}`}
                        href={def.href}
                        target={def.openInNewTab || external ? "_blank" : undefined}
                        rel={def.openInNewTab || external ? "noreferrer" : undefined}
                    >
                        {content}
                    </a>
                );
            }
        }
    }

    return content;
}

function blockChildren(block: PortableTextBlock) {
    return block.children?.map((span: PortableTextSpan) => renderSpan(span, block)) ?? null;
}

function ArticleBody({ body }: { body?: PortableTextNode[] | null }) {
    const nodes = body ?? [];
    const rendered: ReactNode[] = [];
    let index = 0;

    while (index < nodes.length) {
        const node = nodes[index];

        if (node._type === "mediaImage") {
            rendered.push(
                <figure className={styles.articleFigure} key={node._key}>
                    <div className={styles.articleFigureImage}>
                        <Image
                            src={node.imageUrl}
                            alt={node.imageAlt?.trim() || ""}
                            fill
                            loading="lazy"
                            sizes="(max-width: 767px) 92vw, 760px"
                            className={styles.articleImage}
                        />
                    </div>
                    {node.caption ? <figcaption>{node.caption}</figcaption> : null}
                </figure>,
            );
            index += 1;
            continue;
        }

        if (node.listItem) {
            const listType = node.listItem;
            const listNodes: PortableTextBlock[] = [];
            let cursor = index;

            while (
                cursor < nodes.length &&
                nodes[cursor]._type === "block" &&
                (nodes[cursor] as PortableTextBlock).listItem === listType
            ) {
                listNodes.push(nodes[cursor] as PortableTextBlock);
                cursor += 1;
            }

            const ListTag = listType === "number" ? "ol" : "ul";
            rendered.push(
                <ListTag className={styles.articleList} key={`list-${node._key}`}>
                    {listNodes.map((listNode) => (
                        <li key={listNode._key}>{blockChildren(listNode)}</li>
                    ))}
                </ListTag>,
            );
            index = cursor;
            continue;
        }

        const children = blockChildren(node);
        if (node.style === "h2") rendered.push(<h2 key={node._key}>{children}</h2>);
        else if (node.style === "h3") rendered.push(<h3 key={node._key}>{children}</h3>);
        else if (node.style === "h4") rendered.push(<h4 key={node._key}>{children}</h4>);
        else if (node.style === "blockquote") rendered.push(<blockquote key={node._key}>{children}</blockquote>);
        else rendered.push(<p key={node._key}>{children}</p>);

        index += 1;
    }

    return <div className={styles.articleBody}>{rendered}</div>;
}

function SmallArticleCard({ post }: { post: InsightListItem }) {
    return (
        <article className={styles.relatedCard}>
            <Link href={`/insights/${post.slug}`}>
                <div className={styles.relatedImageWrap}>
                    <Image
                        src={post.imageUrl}
                        alt={post.imageAlt?.trim() || post.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 767px) 92vw, 30vw"
                        className={styles.relatedImage}
                    />
                </div>
                <div className={styles.relatedMeta}>
                    <span>{post.categories?.[0]?.title || "New launches"}</span>
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
            </Link>
        </article>
    );
}

export function NewsBlogDetail({ article }: Props) {
    const readingTime = article.readingTimeMinutes ?? calculateReadingTime(article.body);
    const related = article.relatedPosts ?? [];

    return (
        <main className={`${plusJakartaSans.variable} ${inter.variable} ${styles.page}`}>
            <header className={styles.articleHeader}>
                <div className={styles.articleHeaderGrid}>
                    <h1>{article.title}</h1>
                    <p>{article.excerpt}</p>
                </div>
                <div className={styles.articleMetaRow}>
                    <span className={styles.categoryPill}>{categoryLabel(article)}</span>
                    <span>{readingTime} min read</span>
                    <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                </div>
            </header>

            <section className={styles.heroMedia} aria-label="Article hero image">
                <Image
                    src={article.imageUrl}
                    alt={article.imageAlt?.trim() || article.title}
                    fill
                    priority
                    sizes="100vw"
                    className={styles.heroImage}
                />
            </section>

            {article.imageCredit ? (
                <p className={styles.imageCredit}>Image credit: {article.imageCredit}</p>
            ) : null}

            <section className={styles.contentSection}>
                <div className={styles.contentGrid}>
                    <article className={styles.articleColumn}>
                        <ArticleBody body={article.body} />
                    </article>

                    <aside className={styles.sidebar}>
                        <div className={styles.sidebarSticky}>
                            <p className={styles.sidebarEyebrow}>Related articles</p>
                            <div className={styles.sidebarLinks}>
                                {related.slice(0, 3).map((post: InsightListItem) => (
                                    <Link href={`/insights/${post.slug}`} key={post._id}>
                                        {post.title}
                                        <Arrow />
                                    </Link>
                                ))}
                            </div>

                            <div className={styles.connectBox}>
                                <h2>Connect with Domingo</h2>
                                <p>Credits: Marissa Grootes</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <nav className={styles.articlePager} aria-label="Article navigation">
                <div>
                    {article.previousPost ? (
                        <Link href={`/insights/${article.previousPost.slug}`}>
                            <span>Previous article</span>
                            <strong>{article.previousPost.title}</strong>
                        </Link>
                    ) : (
                        <span />
                    )}
                </div>
                <div>
                    {article.nextPost ? (
                        <Link href={`/insights/${article.nextPost.slug}`} data-align="right">
                            <span>Next article</span>
                            <strong>{article.nextPost.title}</strong>
                        </Link>
                    ) : null}
                </div>
            </nav>

            {related.length > 0 ? (
                <section className={styles.exploreSection} aria-labelledby="explore-other-articles-heading">
                    <div className={styles.exploreHeading}>
                        <h2 id="explore-other-articles-heading">Explore other articles</h2>
                        <Link href="/insights">View all</Link>
                    </div>
                    <div className={styles.relatedGrid}>
                        {related.slice(0, 3).map((post: InsightListItem) => (
                            <SmallArticleCard post={post} key={post._id} />
                        ))}
                    </div>
                </section>
            ) : null}
        </main>
    );
}
