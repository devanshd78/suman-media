import { cache } from "react";

import { sanityFetch } from "@/sanity/lib/live";
import {
    NEWS_BLOG_BY_SLUG_QUERY,
    NEWS_BLOGS_LIST_QUERY,
    NEWS_BLOGS_SHARED_QUERY,
} from "@/sanity/queries/news-and-blogs";
import type {
    InsightDetail,
    InsightListItem,
    NewsBlogsSharedContent,
} from "@/types/news-and-blogs";

const REVALIDATE = process.env.NODE_ENV === "development" ? 0 : 900;

export const getNewsBlogs = cache(async (): Promise<InsightListItem[]> => {
    try {
        const posts = await sanityFetch<InsightListItem[] | null>({
            query: NEWS_BLOGS_LIST_QUERY,
            revalidate: REVALIDATE,
        });

        return (posts ?? []).filter(
            (post) =>
                Boolean(post?.title) &&
                Boolean(post?.slug) &&
                Boolean(post?.excerpt) &&
                Boolean(post?.imageUrl) &&
                Boolean(post?.publishedAt),
        );
    } catch (error) {
        console.error("Failed to load News & Blogs from Sanity", error);
        return [];
    }
});

export const getNewsBlogBySlug = cache(
    async (slug: string, metadata = false): Promise<InsightDetail | null> => {
        try {
            return await sanityFetch<InsightDetail | null>({
                query: NEWS_BLOG_BY_SLUG_QUERY,
                params: { slug },
                revalidate: REVALIDATE,
                metadata,
            });
        } catch (error) {
            console.error(`Failed to load News & Blog article: ${slug}`, error);
            return null;
        }
    },
);

export const getNewsBlogsSharedContent = cache(
    async (): Promise<NewsBlogsSharedContent | null> => {
        try {
            return await sanityFetch<NewsBlogsSharedContent | null>({
                query: NEWS_BLOGS_SHARED_QUERY,
                revalidate: REVALIDATE,
            });
        } catch (error) {
            console.error("Failed to load News & Blogs shared sections", error);
            return null;
        }
    },
);
