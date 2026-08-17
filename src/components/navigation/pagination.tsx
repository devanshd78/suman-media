import Link from "next/link";

export type PaginationSearchParams = Record<
  string,
  string | string[] | undefined
>;

type PaginationProps = {
  pathname: string;
  currentPage: number;
  totalPages: number;
  searchParams?: PaginationSearchParams;
  siblingCount?: number;
};

type PageItem = number | "ellipsis-left" | "ellipsis-right";

function createHref(
  pathname: string,
  page: number,
  searchParams?: PaginationSearchParams,
) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (key === "page" || value === undefined) continue;
    if (Array.isArray(value)) value.forEach((item) => params.append(key, item));
    else params.set(key, value);
  }

  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

function pageItems(currentPage: number, totalPages: number, siblingCount: number): PageItem[] {
  const visibleCount = siblingCount * 2 + 5;
  if (totalPages <= visibleCount) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const left = Math.max(2, currentPage - siblingCount);
  const right = Math.min(totalPages - 1, currentPage + siblingCount);
  const items: PageItem[] = [1];

  if (left > 2) items.push("ellipsis-left");
  for (let page = left; page <= right; page += 1) items.push(page);
  if (right < totalPages - 1) items.push("ellipsis-right");
  items.push(totalPages);
  return items;
}

export function Pagination({
  pathname,
  currentPage,
  totalPages,
  searchParams,
  siblingCount = 1,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const baseClass =
    "inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2";

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2">
      {safeCurrentPage > 1 ? (
        <Link
          rel="prev"
          href={createHref(pathname, safeCurrentPage - 1, searchParams)}
          className={`${baseClass} border-zinc-300 hover:bg-zinc-50`}
        >
          Previous
        </Link>
      ) : (
        <span aria-disabled="true" className={`${baseClass} cursor-not-allowed border-zinc-200 text-zinc-400`}>
          Previous
        </span>
      )}

      {pageItems(safeCurrentPage, totalPages, siblingCount).map((item) =>
        typeof item === "number" ? (
          <Link
            key={item}
            href={createHref(pathname, item, searchParams)}
            aria-current={item === safeCurrentPage ? "page" : undefined}
            className={`${baseClass} ${
              item === safeCurrentPage
                ? "border-zinc-950 bg-zinc-950 text-white"
                : "border-zinc-300 hover:bg-zinc-50"
            }`}
          >
            <span className="sr-only">Page </span>
            {item}
          </Link>
        ) : (
          <span key={item} aria-hidden="true" className="px-1 text-zinc-500">
            …
          </span>
        ),
      )}

      {safeCurrentPage < totalPages ? (
        <Link
          rel="next"
          href={createHref(pathname, safeCurrentPage + 1, searchParams)}
          className={`${baseClass} border-zinc-300 hover:bg-zinc-50`}
        >
          Next
        </Link>
      ) : (
        <span aria-disabled="true" className={`${baseClass} cursor-not-allowed border-zinc-200 text-zinc-400`}>
          Next
        </span>
      )}
    </nav>
  );
}
