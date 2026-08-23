import Image from "next/image";
import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";
import type { CmsCta, CmsFeaturedInsight } from "@/types/cms";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 shrink-0" fill="none">
      <path d="M3.5 8h8M8.5 5l3 3-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatPublishedAt(publishedAt: string): string | null {
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function InsightCard({ post }: { post: CmsFeaturedInsight }) {
  const metaItems = [
    post.category,
    formatPublishedAt(post.publishedAt),
    post.authorName ? `By ${post.authorName}` : null,
  ].filter((item): item is string => Boolean(item));

  return (
    <Link
      href={`/insights/${post.slug}`}
      className="group flex flex-col border border-black/[0.04] bg-white shadow-[0_0.75rem_2rem_rgba(0,0,0,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6C1A]/35"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#eee9dc]">
        <Image
          src={post.imageUrl}
          alt={post.imageAlt?.trim() || post.title}
          fill
          sizes="(max-width: 1023px) 100vw, 33vw"
          className="select-none object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        {metaItems.length > 0 ? (
          <p className={`${inter.className} text-[0.625rem] font-semibold uppercase leading-[0.875rem] tracking-[-0.00625rem] text-[rgba(0,9,51,0.65)]`}>
            {metaItems.join(" · ")}
          </p>
        ) : null}

        <h3 className={`${inter.className} text-lg font-semibold leading-6 text-black transition-colors group-hover:text-[#8F6C1A]`}>
          {post.title}
        </h3>

        {post.excerpt ? (
          <p className={`${inter.className} line-clamp-3 text-sm font-normal leading-5 text-[rgba(0,9,51,0.65)]`}>
            {post.excerpt}
          </p>
        ) : null}
      </div>
    </Link>
  );
}

type InsightsSectionProps = {
  eyebrow?: string | null;
  heading?: string | null;
  cta?: CmsCta | null;
  posts: CmsFeaturedInsight[];
};

export function InsightsSection({ eyebrow, heading, cta, posts }: InsightsSectionProps) {
  const visiblePosts = posts
    .filter((post) => Boolean(post?.title?.trim() && post?.slug && post?.imageUrl && post?.publishedAt))
    .slice(0, 3);

  if (visiblePosts.length === 0) return null;

  return (
    <section
      id="insights"
      aria-labelledby="insights-heading"
      className="landing-section-transition mx-auto flex w-full max-w-[90rem] flex-col gap-10 bg-white px-5 py-16 sm:px-8 lg:gap-16 lg:px-[3.5rem] lg:py-[6.25rem]"
    >
      <div className="flex w-full flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        <div className="flex min-w-0 flex-col items-start gap-4">
          <p className={`${inter.className} text-[0.625rem] font-semibold uppercase leading-[0.875rem] tracking-[-0.00625rem] text-[rgba(0,9,51,0.65)]`}>
            {eyebrow?.trim() || "Latest Announcements"}
          </p>
          <h2 id="insights-heading" className={`${exo2.className} text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.03125rem] text-black lg:text-[2.5rem] lg:leading-[3rem]`}>
            {heading?.trim() || "News and Blogs"}
          </h2>
        </div>

        <Link
          href={cta?.href || "/insights"}
          className={`${inter.className} inline-flex shrink-0 items-center justify-center gap-1 rounded-lg p-4 text-center text-sm font-semibold leading-5 text-[#8F6C1A] transition-colors hover:bg-[#8F6C1A]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6C1A]/35`}
        >
          <span>{cta?.label || "Explore all"}</span>
          <ArrowRightIcon />
        </Link>
      </div>

      <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
        {visiblePosts.map((post) => <InsightCard key={post._id} post={post} />)}
      </div>
    </section>
  );
}
