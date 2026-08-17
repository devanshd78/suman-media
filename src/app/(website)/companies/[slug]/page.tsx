import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { createPageMetadata, titleFromSlug } from "@/lib/seo/metadata";

type CompanyPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: CompanyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = titleFromSlug(slug);
  return createPageMetadata(title, `Learn more about ${title}.`, `/companies/${slug}`);
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params;
  return (
    <PagePlaceholder
      title={`Company: ${titleFromSlug(slug)}`}
      description="Fetch this company from Sanity in this Server Component and pass it to the final company components."
    />
  );
}
