"use client";

import NextImage, {
  getImageProps as getNextImageProps,
  type ImageLoaderProps,
  type ImageProps,
} from "next/image";

function isSanityCdnImage(src: ImageProps["src"]): src is string {
  if (typeof src !== "string") return false;

  try {
    const url = new URL(src);

    return (
      url.protocol === "https:" &&
      url.hostname === "cdn.sanity.io" &&
      url.pathname.startsWith("/images/")
    );
  } catch {
    return false;
  }
}

function sanityImageLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);

  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  url.searchParams.set("w", width.toString());

  if (quality) {
    url.searchParams.set("q", quality.toString());
  }

  return url.toString();
}

function withSanityLoader(props: ImageProps): ImageProps {
  if (props.loader || !isSanityCdnImage(props.src)) return props;

  return {
    ...props,
    loader: sanityImageLoader,
  };
}

/**
 * Website-wide image defaults.
 *
 * `next/image` already lazily loads non-priority images, but keeping the
 * behaviour explicit here means every current and future image that uses the
 * shared component follows the same policy automatically:
 *
 * - above-the-fold / explicitly priority images keep Next.js priority behaviour
 * - every other image -> lazy
 * - async decoding for non-blocking image decode
 *
 * A component can still override `loading` or `decoding` when there is a
 * measured reason to do so.
 */
function withImageDefaults(props: ImageProps): ImageProps {
  const loadedProps = withSanityLoader(props);
  return {
    ...loadedProps,
    ...(loadedProps.priority
      ? {}
      : { loading: loadedProps.loading ?? "lazy" }),
    decoding: loadedProps.decoding ?? "async",
  };
}

export function getImageProps(props: ImageProps) {
  return getNextImageProps(withImageDefaults(props));
}

export default function Image(props: ImageProps) {
  return <NextImage {...withImageDefaults(props)} />;
}
