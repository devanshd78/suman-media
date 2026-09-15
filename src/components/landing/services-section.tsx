import {
  plusJakartaSans as plusJakarta,
} from "@/lib/fonts";

import type {
  CmsFeaturedService,
} from "@/types/cms";

import {
  ServicesScrollGallery,
} from "./services-scroll-gallery";

/* ============================================================
   CONFIG
   ============================================================ */

const MAX_SERVICES = 8;

/* ============================================================
   TYPES
   ============================================================ */

type ServicesSectionProps = {
  eyebrow?: string | null;
  heading?: string | null;
  services: CmsFeaturedService[];
};

type PartnerLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/* ============================================================
   PARTNERS
   ============================================================ */

const PARTNER_LOGOS: readonly PartnerLogo[] = [
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
];

/* ============================================================
   PARTNERS STRIP
   ============================================================ */

function PartnersStrip() {
  return (
    <div
      role="group"
      aria-label="Selected industry partners"
      className="
        flex
        min-h-[8rem]
        w-full
        items-center
        justify-start
        gap-8
        overflow-x-auto
        overscroll-x-contain
        scroll-smooth
        bg-black
        px-6
        py-10

        [scrollbar-width:none]

        sm:min-h-[9rem]
        sm:gap-12
        sm:px-8
        sm:py-12

        lg:min-h-[11rem]
        lg:gap-14
        lg:py-14

        xl:justify-center
        xl:overflow-hidden

        [&::-webkit-scrollbar]:hidden
      "
      style={{
        transform:
          "rotate(0.003deg)",
      }}
    >
      {PARTNER_LOGOS.map(
        (partner) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={partner.src}
            src={partner.src}
            alt={partner.alt}
            width={partner.width}
            height={partner.height}
            loading="lazy"
            decoding="async"
            className="
              h-12
              w-auto
              shrink-0
              object-contain

              md:h-14
              lg:h-16
            "
          />
        ),
      )}
    </div>
  );
}

/* ============================================================
   SERVICES
   ============================================================ */

export function ServicesSection({
  eyebrow,
  heading,
  services,
}: ServicesSectionProps) {
  const visibleServices =
    services.slice(
      0,
      MAX_SERVICES,
    );

  if (
    visibleServices.length ===
    0
  ) {
    return null;
  }

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className={`
        ${plusJakarta.className}

        relative
        w-full
        bg-black
        [overflow-x:clip]
      `}
    >
      <ServicesScrollGallery
        eyebrow={
          eyebrow?.trim() ||
          "Our Services"
        }
        heading={
          heading?.trim() ||
          "What we really do?"
        }
        services={
          visibleServices
        }
      />

      <div
        className="
          relative
          z-30
          w-full
        "
      >
        <PartnersStrip />
      </div>
    </section>
  );
}