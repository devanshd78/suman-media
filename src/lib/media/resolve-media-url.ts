export function resolveMediaUrl(keyOrUrl: string): string {
  if (/^https?:\/\//i.test(keyOrUrl)) return keyOrUrl;

  const baseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.trim();
  if (!baseUrl) return keyOrUrl.startsWith("/") ? keyOrUrl : `/${keyOrUrl}`;

  return `${baseUrl.replace(/\/$/, "")}/${keyOrUrl.replace(/^\//, "")}`;
}
