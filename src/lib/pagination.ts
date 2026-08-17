import type { PaginatedData, PaginationMeta } from "@/types/api";

export function parsePositiveInteger(
  value: string | string[] | undefined,
  fallback: number,
): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function createPaginationMeta(
  page: number,
  pageSize: number,
  totalItems: number,
): PaginationMeta {
  const safePageSize = Math.max(1, Math.floor(pageSize));
  const safeTotalItems = Math.max(0, Math.floor(totalItems));
  const totalPages = Math.max(1, Math.ceil(safeTotalItems / safePageSize));
  const safePage = Math.min(Math.max(1, Math.floor(page)), totalPages);

  return {
    page: safePage,
    pageSize: safePageSize,
    totalItems: safeTotalItems,
    totalPages,
    hasPreviousPage: safePage > 1,
    hasNextPage: safePage < totalPages,
  };
}

export function paginateArray<T>(
  items: T[],
  page: number,
  pageSize: number,
): PaginatedData<T> {
  const pagination = createPaginationMeta(page, pageSize, items.length);
  const start = (pagination.page - 1) * pagination.pageSize;
  return {
    items: items.slice(start, start + pagination.pageSize),
    pagination,
  };
}
