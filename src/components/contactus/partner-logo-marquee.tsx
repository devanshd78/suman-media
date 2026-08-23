import Image from "next/image";
import styles from "./contact-page.module.css";

const PARTNER_LOGOS = [
  { name: "Attentive", src: "/images/partners/Frame%20156.svg", width: 202 },
  { name: "Calendly", src: "/images/partners/Frame%20183.svg", width: 224 },
  { name: "Mailchimp", src: "/images/partners/Frame%20170.svg", width: 224 },
  {
    name: "Automation Anywhere",
    src: "/images/partners/Frame%20161.svg",
    width: 224,
  },
  { name: "Razorpay", src: "/images/partners/Frame%20204.svg", width: 224 },
  { name: "Dropbox", src: "/images/partners/dropbox-com.svg", width: 122 },
  { name: "Atlassian", src: "/images/partners/Atlassian.png", width: 224 },
] as const;

function PartnerLogoRow({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className={styles.logoRow}
      aria-hidden={duplicate ? "true" : undefined}
    >
      {PARTNER_LOGOS.map((logo) => (
        <div
          key={logo.name}
          className="relative h-[3.5625rem] shrink-0"
          style={{ width: `${logo.width}px` }}
        >
          <Image
            src={logo.src}
            alt={duplicate ? "" : logo.name}
            fill
            sizes={`${logo.width}px`}
            className="pointer-events-none select-none object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export function PartnerLogoMarquee() {
  return (
    <div className={`${styles.marquee} h-[6.25rem] w-full`}>
      <div className={styles.marqueeTrack}>
        <PartnerLogoRow />
        <PartnerLogoRow duplicate />
      </div>
    </div>
  );
}
