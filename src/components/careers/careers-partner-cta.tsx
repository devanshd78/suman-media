import { PreFooterBanner } from "@/components/shared/pre-footer-banner";
import type { CmsCareersPartnerCta } from "@/types/cms";

export function CareersPartnerCta({ content }: { content?: CmsCareersPartnerCta | null }) {
  return <PreFooterBanner type={3} content={{
    heading: content?.heading?.trim() || "Have a story worth telling? Let's bring it to the world.",
    imageUrl: content?.imageUrl?.trim() || "/images/landing/background3.png",
  }} />;
}
