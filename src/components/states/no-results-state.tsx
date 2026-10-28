
import { LocalizedContent } from "@/components/localization/localized-server-content";
import Link from "@/components/navigation/website-link";
import { EmptyState } from "@/components/states/empty-state";

export function NoResultsState({ resetHref }: { resetHref: string }) {
  return <LocalizedContent>{(
    <EmptyState
      title="No matching results"
      description="Try changing your search or clearing the selected filters."
      action={
        <Link
          href={resetHref}
          className="inline-flex min-h-10 items-center rounded-[0.25rem] border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50"
        >
          Clear filters
        </Link>
      }
    />
  )}</LocalizedContent>;
}
