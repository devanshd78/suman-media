import type { CmsCareersCta, CmsFaqSection, CmsSeo } from "@/types/cms";

export type InsightCategory = {
    title: string;
    slug: string;
};

export type InsightAuthor = {
    name: string;
    role?: string | null;
    imageUrl?: string | null;
    imageAlt?: string | null;
};

export type InsightListItem = {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    imageUrl: string;
    imageAlt?: string | null;
    imageHotspotX?: number | null;
    imageHotspotY?: number | null;
    publishedAt: string;
    featured?: boolean | null;
    authorName?: string | null;
    categories?: InsightCategory[] | null;
};

export type PortableTextSpan = {
    _key: string;
    _type: "span";
    text: string;
    marks?: string[];
};

export type PortableTextMarkDef = {
    _key: string;
    _type: string;
    href?: string | null;
    openInNewTab?: boolean | null;
};

export type PortableTextBlock = {
    _key: string;
    _type: "block";
    style?: "normal" | "h2" | "h3" | "h4" | "blockquote" | string;
    listItem?: "bullet" | "number" | string;
    level?: number;
    children?: PortableTextSpan[];
    markDefs?: PortableTextMarkDef[];
};

export type PortableTextImage = {
    _key: string;
    _type: "mediaImage";
    imageUrl: string;
    imageAlt?: string | null;
    caption?: string | null;
};

export type PortableTextNode = PortableTextBlock | PortableTextImage;

export type InsightDetail = InsightListItem & {
    _type: "post";
    _updatedAt: string;
    body?: PortableTextNode[] | null;
    author?: InsightAuthor | null;
    imageCredit?: string | null;
    readingTimeMinutes?: number | null;
    relatedPosts?: InsightListItem[] | null;
    previousPost?: Pick<InsightListItem, "title" | "slug"> | null;
    nextPost?: Pick<InsightListItem, "title" | "slug"> | null;
    seo?: CmsSeo | null;
};

export type NewsBlogsSharedContent = {
    faqSection?: CmsFaqSection | null;
    careersCta?: CmsCareersCta | null;
};
