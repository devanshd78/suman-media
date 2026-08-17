import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { createPageMetadata, titleFromSlug } from "@/lib/seo/metadata";

type InsightPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = titleFromSlug(slug);
  return createPageMetadata(title, `Read ${title}.`, `/insights/${slug}`);
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  return (
    <PagePlaceholder
      title={`Insight: ${titleFromSlug(slug)}`}
      description="Fetch this article from Sanity in this Server Component and pass it to the final article components."
    />
  );
}
