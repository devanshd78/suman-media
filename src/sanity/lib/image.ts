import imageUrlBuilder from "@sanity/image-url";
import { sanityEnv } from "@/sanity/env";

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

const builder =
  sanityEnv.projectId && sanityEnv.dataset
    ? imageUrlBuilder({ projectId: sanityEnv.projectId, dataset: sanityEnv.dataset })
    : null;

export function sanityImage(source: SanityImageSource) {
  if (!builder) return null;
  return builder.image(source).auto("format").fit("max");
}

export function sanityImageUrl(
  source: SanityImageSource,
  options: { width?: number; height?: number; quality?: number } = {},
) {
  const image = sanityImage(source);
  if (!image) return null;

  let output = image;
  if (options.width) output = output.width(options.width);
  if (options.height) output = output.height(options.height);
  if (options.quality) output = output.quality(options.quality);

  return output.url();
}
