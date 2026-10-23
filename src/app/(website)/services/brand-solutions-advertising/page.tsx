import { BrandLibraryPage } from "@/components/products/brand-solutions-and-content-library/brand-solutions-and-content-library-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("Brand Solutions & Advertising", "Connect brands and audiences through integrated campaigns, sponsorships, branded entertainment and media planning.", "/services/brand-solutions-advertising");

export default function Page() { return <BrandLibraryPage kind="brand" />; }
