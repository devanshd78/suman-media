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

export function getImageProps(props: ImageProps) {
  return getNextImageProps(withSanityLoader(props));
}

export default function Image(props: ImageProps) {
  return <NextImage {...withSanityLoader(props)} />;
}
