import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { createPageMetadata, titleFromSlug } from "@/lib/seo/metadata";

type ServicePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = titleFromSlug(slug);
  return createPageMetadata(title, `Learn more about ${title}.`, `/services/${slug}`);
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  return (
    <PagePlaceholder
      title={`Service: ${titleFromSlug(slug)}`}
      description="Fetch this service from Sanity in this Server Component and pass it to the final service components."
    />
  );
}
