import { localizeMetadata } from "@/i18n/server";

import { LocalizedContent } from "@/components/localization/localized-server-content";
import { BrandLibraryPage } from "@/components/products/brand-solutions-and-content-library/brand-solutions-and-content-library-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() { return localizeMetadata(createPageMetadata("Content & Music Library Management", "Discover film, music and cultural catalogues, publishing rights, synchronization and digital rights management.", "/products/content-music-library")); }

export default function Page() { return <LocalizedContent>{<BrandLibraryPage kind="library" />}</LocalizedContent>; }
