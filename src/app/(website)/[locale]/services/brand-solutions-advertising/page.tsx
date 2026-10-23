import { localizeMetadata } from "@/i18n/server";

import { LocalizedContent } from "@/components/localization/localized-server-content";
import { BrandLibraryPage } from "@/components/products/brand-solutions-and-content-library/brand-solutions-and-content-library-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() { return localizeMetadata(createPageMetadata("Brand Solutions & Advertising", "Connect brands and audiences through integrated campaigns, sponsorships, branded entertainment and media planning.", "/services/brand-solutions-advertising")); }

export default function Page() { return <LocalizedContent>{<BrandLibraryPage kind="brand" />}</LocalizedContent>; }
