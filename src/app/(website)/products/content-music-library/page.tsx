import { BrandLibraryPage } from "@/components/products/brand-solutions-and-content-library/brand-solutions-and-content-library-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("Content & Music Library Management", "Discover film, music and cultural catalogues, publishing rights, synchronization and digital rights management.", "/products/content-music-library");

export default function Page() { return <BrandLibraryPage kind="library" />; }
