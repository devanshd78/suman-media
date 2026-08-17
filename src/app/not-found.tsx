import Link from "next/link";
import { EmptyState } from "@/components/states/empty-state";

export default function NotFoundPage() {
  return (
    <EmptyState
      title="Page not found"
      description="The page may have been removed, renamed, or is temporarily unavailable."
      action={
        <Link
          href="/"
          className="inline-flex min-h-10 items-center rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white"
        >
          Return home
        </Link>
      }
    />
  );
}
