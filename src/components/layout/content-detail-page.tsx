
import { LocalizedContent } from "@/components/localization/localized-server-content";
import Link from "@/components/navigation/website-link";
import { TextReveal } from "@/components/motion/text-reveal";
import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";

type ContentDetailPageProps = {
  eyebrow: string;
  title: string;
  description?: string | null;
  backHref: string;
  backLabel: string;
};

export function ContentDetailPage({
  eyebrow,
  title,
  description,
  backHref,
  backLabel,
}: ContentDetailPageProps) {
  return <LocalizedContent>{(
    <main className="site-gutter mx-auto flex min-h-[65vh] w-full max-w-full flex-col justify-center py-16 sm:py-24">
      <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[14px] font-semibold uppercase leading-[20px] text-[#969696]">
        {eyebrow}
      </p>
      <TextReveal
        as="h1"
        className="mt-1 max-w-4xl font-[family-name:var(--font-plus-jakarta-sans)] text-[36px] font-semibold leading-[44px] tracking-[-0.5px] sm:text-[48px] sm:leading-[56px] lg:text-[56px] lg:leading-[64px] lg:tracking-[-1px]"
        text={title}
        effect="mask"
        split="words"
        delay={0.15}
      />
      {description ? (
        <ScrollTextReveal>
          <p className="mt-4 max-w-[832px] font-[family-name:var(--font-plus-jakarta-sans)] text-[16px] font-normal leading-[24px] text-[#969696] md:text-[20px] md:leading-[28px]">
            {description}
          </p>
        </ScrollTextReveal>
      ) : null}
      <Link
        href={backHref}
        className="mt-8 w-fit font-[family-name:var(--font-inter)] text-[16px] font-semibold leading-[24px] text-[#8f6c1a] underline underline-offset-4"
      >
        {backLabel}
      </Link>
    </main>
  )}</LocalizedContent>;
}
