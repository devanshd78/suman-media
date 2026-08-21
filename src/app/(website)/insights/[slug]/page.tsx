import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDetailPage } from "@/components/layout/content-detail-page";
import { createCmsMetadata, createNotFoundMetadata } from "@/lib/seo/metadata";
import { getInsightBySlug } from "@/sanity/lib/data";

type InsightPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug, true);

  if (!insight) return createNotFoundMetadata("Insight not found");
  return createCmsMetadata(insight, `/insights/${slug}`);
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);

  if (!insight) notFound();

  return (
    <ContentDetailPage
      eyebrow="Insight"
      title={insight.title}
      description={insight.description}
      backHref="/insights"
      backLabel="View all insights"
    />
  );
}
