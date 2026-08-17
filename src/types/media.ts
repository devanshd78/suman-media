export type MediaKind = "image" | "video" | "document";

export type MediaAsset = {
  kind: MediaKind;
  key: string;
  url?: string;
  title?: string;
  alt?: string;
  mimeType?: string;
  width?: number;
  height?: number;
};
