import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { CSSProperties } from "react";

import type { CmsFeaturedService } from "@/types/cms";

import { ServicesScrollGallery } from "./services-scroll-gallery";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

/**
 * The final scroll hand-off is calibrated to the supplied recording.
 *
 * Once card 01 has left the viewport, the sticky gallery remains pinned for
 * another 46svh. The real partner strip overlaps the gallery by 92svh, so it
 * enters at roughly 54% of the viewport and rises to roughly 8% before the
 * sticky stage releases. The following section remains attached immediately
 * below the partner strip throughout that hand-off.
 */
const HANDOFF_SCROLL_VH = 46;
const PARTNER_OVERLAP_VH = 92;
const MAX_SERVICES = 8;

type ServicesSectionProps = {
  eyebrow?: string | null;
  heading?: string | null;
  services: CmsFeaturedService[];
};

const PARTNER_LOGOS = [
  {
    src: "/images/landing/partners/partner1.svg",
    alt: "Laminar",
    width: 216,
    height: 56,
  },
  {
    src: "/images/landing/partners/partner2.svg",
    alt: "AWS",
    width: 112,
    height: 64,
  },
  {
    src: "/images/landing/partners/partner3.svg",
    alt: "Festival de Cannes",
    width: 168,
    height: 64,
  },
  {
    src: "/images/landing/partners/partner4.svg",
    alt: "Zee Marathi",
    width: 144,
    height: 64,
  },
  {
    src: "/images/landing/partners/partner5.svg",
    alt: "Government of Maharashtra",
    width: 92,
    height: 64,
  },
] as const;

function PartnersStrip() {
  return (
    <div
      role="group"
      aria-label="Selected industry partners"
      className="flex min-h-[11rem] w-full items-center justify-start gap-14 overflow-x-auto bg-black px-6 py-14 [scrollbar-width:none] sm:justify-center sm:overflow-hidden sm:px-8 [&::-webkit-scrollbar]:hidden"
      style={{ transform: "rotate(0.003deg)" }}
    >
      {PARTNER_LOGOS.map((partner) => (
        <Image
          key={partner.src}
          src={partner.src}
          alt={partner.alt}
          width={partner.width}
          height={partner.height}
          unoptimized
          className="h-12 w-auto shrink-0 object-contain md:h-14 lg:h-16"
        />
      ))}
    </div>
  );
}

export function ServicesSection({
  eyebrow,
  heading,
  services,
}: ServicesSectionProps) {
  /**
   * Do not filter on shortDescription or slug here. The earlier version did
   * that and silently reduced an eight-item CMS list to six cards whenever two
   * records had incomplete optional copy. Card content now handles those
   * optional fields safely, so all of the first eight CMS records are kept.
   */
  const visibleServices = services.slice(0, MAX_SERVICES);

  if (visibleServices.length === 0) return null;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className={`${plusJakarta.className} relative w-full bg-black [overflow-x:clip]`}
      style={
        {
          "--services-partner-overlap": `${PARTNER_OVERLAP_VH}svh`,
        } as CSSProperties
      }
    >
      <ServicesScrollGallery
        eyebrow={eyebrow?.trim() || "Our Services"}
        heading={heading?.trim() || "What we really do?"}
        services={visibleServices}
        handoffScrollVh={HANDOFF_SCROLL_VH}
      />

      <div className="services-partner-handoff relative z-30 w-full">
        <PartnersStrip />
      </div>
    </section>
  );
}
