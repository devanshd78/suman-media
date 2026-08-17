type PaginationSummaryProps = {
  page: number;
  pageSize: number;
  totalItems: number;
  itemLabel?: string;
};

export function PaginationSummary({
  page,
  pageSize,
  totalItems,
  itemLabel = "results",
}: PaginationSummaryProps) {
  if (totalItems === 0) return <p className="text-sm text-zinc-600">No {itemLabel}</p>;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  return (
    <p className="text-sm text-zinc-600">
      Showing {from}–{to} of {totalItems} {itemLabel}
    </p>
  );
}
