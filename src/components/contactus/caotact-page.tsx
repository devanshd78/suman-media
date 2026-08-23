import Image from "next/image";
import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";
import type { CmsContactPage } from "@/types/cms";
import styles from "./contact-page.module.css";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const PARTNER_LOGOS = [
  {
    name: "Attentive",
    src: "/images/partners/Frame%20156.svg",
    width: 202,
  },
  {
    name: "Calendly",
    src: "/images/partners/Frame%20183.svg",
    width: 224,
  },
  {
    name: "Mailchimp",
    src: "/images/partners/Frame%20170.svg",
    width: 224,
  },
  {
    name: "Automation Anywhere",
    src: "/images/partners/Frame%20161.svg",
    width: 224,
  },
  {
    name: "Razorpay",
    src: "/images/partners/Frame%20204.svg",
    width: 224,
  },
  {
    name: "Dropbox",
    src: "/images/partners/dropbox-com.svg",
    width: 122,
  },
  {
    name: "Atlassian",
    src: "/images/partners/Atlassian.png",
    width: 224,
  },
] as const;

const FALLBACK_CONTACT_CARDS = [
  {
    _key: "contact-general",
    title: "Contact us",
    description:
      "Have a question, project or idea? Connect with the right team and let’s start a conversation.",
    imageUrl: "/images/contactus/ContactUs.png",
    imageAlt: "A business professional speaking on the phone",
    href: "/contact?type=general",
  },
  {
    _key: "contact-investor",
    title: "Contact as investor",
    description:
      "Explore investment opportunities and learn more about Suman Media’s growth journey.",
    imageUrl: "/images/contactus/ContactAsInvester.png",
    imageAlt: "A business professional in an investor meeting",
    href: "/contact?type=investor",
  },
  {
    _key: "contact-partner",
    title: "Join as a partner",
    description:
      "Collaborate with us across media, technology and entertainment to build what’s next.",
    imageUrl: "/images/contactus/JoinAsPartner.png",
    imageAlt: "A filmmaker collaborating with a production crew",
    href: "/contact?type=partnership",
  },
] as const;

const FALLBACK_CONNECTED_WORLD = {
  heading: "Connecting the world",
  description:
    "What begins in Maharashtra travels through content, technology and partnerships to audiences and markets around the world.",
  imageUrl: "/images/contactus/image2.png",
} as const;

const FALLBACK_CONTACT_DETAILS = {
  address:
    "501, Royal Chambers, Opposite Jyoti Stores, Charai, Thane, Maharashtra, 400601, India",
  email: "Suman@gmail.com",
  phone: "+91 5262-529-552",
} as const;

const SOCIAL_ICONS = [
  {
    platform: "X",
    aliases: ["x", "twitter"],
    src: "/images/socialmediaicon/XLogo.svg",
  },
  {
    platform: "Facebook",
    aliases: ["facebook"],
    src: "/images/socialmediaicon/Facebook.svg",
  },
  {
    platform: "Instagram",
    aliases: ["instagram"],
    src: "/images/socialmediaicon/InstagramLogo.svg",
  },
  {
    platform: "YouTube",
    aliases: ["youtube"],
    src: "/images/socialmediaicon/YouTube.svg",
  },
  {
    platform: "LinkedIn",
    aliases: ["linkedin"],
    src: "/images/socialmediaicon/LinkedIn.svg",
  },
] as const;

const FALLBACK_CAREERS_CTA = {
  heading: "Join us to start a New Chapter in Media and Entertainment",
  buttonLabel: "View Open Roles",
  href: "/careers",
  imageUrl: "/images/contactus/image3.png",
  imageAlt: "Team members collaborating at work",
} as const;

function normalizePlatform(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function SmallArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
    >
      <path
        d="M4.1665 9.99984H15.8332M9.99984 15.8332L15.8332 9.99984L9.99984 4.1665"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={styles.cardArrowIcon}
    >
      <path
        d="M8 24L24 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 8H24V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

export function ContactPageContent({
  content = null,
}: {
  content?: CmsContactPage | null;
}) {
  const cmsCards =
    content?.cards?.filter(
      (card) =>
        card?.title?.trim() &&
        card?.description?.trim() &&
        card?.imageUrl?.trim() &&
        card?.href?.trim(),
    ) ?? [];
  const contactCards =
    cmsCards.length > 0 ? cmsCards.slice(0, 3) : FALLBACK_CONTACT_CARDS;
  const connectedWorldHeading =
    content?.connectedWorld?.heading?.trim() ||
    FALLBACK_CONNECTED_WORLD.heading;
  const connectedWorldDescription =
    content?.connectedWorld?.description?.trim() ||
    FALLBACK_CONNECTED_WORLD.description;
  const connectedWorldImage =
    content?.connectedWorld?.imageUrl?.trim() ||
    FALLBACK_CONNECTED_WORLD.imageUrl;
  const contactAddress =
    content?.contactDetails?.address?.trim() ||
    FALLBACK_CONTACT_DETAILS.address;
  const contactEmail =
    content?.contactDetails?.email?.trim() || FALLBACK_CONTACT_DETAILS.email;
  const contactPhone =
    content?.contactDetails?.phone?.trim() || FALLBACK_CONTACT_DETAILS.phone;
  const socialLinks =
    content?.contactDetails?.socialLinks?.filter(
      (item) => item?.platform?.trim() && item?.url?.trim(),
    ) ?? [];
  const careersCtaHeading =
    content?.careersCta?.heading?.trim() || FALLBACK_CAREERS_CTA.heading;
  const careersCtaButtonLabel =
    content?.careersCta?.buttonLabel?.trim() ||
    FALLBACK_CAREERS_CTA.buttonLabel;
  const careersCtaHref =
    content?.careersCta?.href?.trim() || FALLBACK_CAREERS_CTA.href;
  const careersCtaImage =
    content?.careersCta?.imageUrl?.trim() || FALLBACK_CAREERS_CTA.imageUrl;
  const careersCtaImageAlt =
    content?.careersCta?.imageAlt?.trim() || FALLBACK_CAREERS_CTA.imageAlt;

  return (
    <main className="relative mx-auto w-full max-w-[90rem] overflow-x-hidden bg-white">
      <section
        aria-labelledby="contact-page-heading"
        className="flex w-full flex-col items-center gap-[3.5rem] bg-white px-5 py-16 sm:px-8 lg:px-[3.5rem] lg:py-[6.25rem]"
      >
        <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-[3.5rem]">
          <div className="flex min-w-0 flex-1 flex-col items-start">
            <p
              className={`${inter.className} text-sm font-semibold leading-5 text-[rgba(0,9,51,0.65)]`}
              style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
            >
              CONTACT US
            </p>

            <h1
              id="contact-page-heading"
              className={`${exo2.className} w-full text-[2rem] font-semibold leading-10 tracking-[-0.03125rem] text-black sm:text-[2.5rem] sm:leading-[3rem]`}
              style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
            >
              Let&apos;s Start a Conversation.
            </h1>
          </div>

          <p
            className={`${inter.className} min-w-0 flex-1 text-base font-normal leading-6 text-[rgba(0,9,51,0.65)]`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            Whether you have a business opportunity, partnership idea, media
            enquiry or simply want to know more about Suman, we&apos;d love to hear
            from you.
          </p>
        </div>
      </section>

      <section
        aria-label="Our partners"
        className="flex w-full flex-col items-center justify-center gap-6 bg-white px-5 py-4 sm:px-8 lg:px-[3.5rem]"
      >
        <div className={`${styles.marquee} h-[6.25rem] w-full`}>
          <div className={styles.marqueeTrack}>
            <PartnerLogoRow />
            <PartnerLogoRow duplicate />
          </div>
        </div>
      </section>

      <section
        aria-label="Start a conversation with Suman Media"
        className="relative aspect-[1440/861] w-full overflow-hidden bg-[#d3d3d3]"
      >
        <Image
          src="/images/contactus/image1.png"
          alt="A business professional having a conversation in a sunlit office"
          fill
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="object-cover"
          style={{ objectPosition: "center 40.16%" }}
        />
      </section>

      <section
        aria-label="Ways to contact Suman Media"
        className="flex w-full flex-col items-center gap-[3.5rem] bg-white px-5 py-16 sm:px-8 lg:px-[3.5rem] lg:py-[6.25rem]"
      >
        <div className="grid w-full grid-cols-1 justify-items-center gap-8 lg:grid-cols-3">
          {contactCards.map((card) => (
            <Link
              key={card._key}
              href={card.href}
              className={`${styles.contactCard} group relative flex aspect-[422/495] w-full max-w-[26.33331rem] flex-col items-end justify-between overflow-hidden p-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8F6C1A] lg:h-[30.9375rem] lg:max-w-none lg:aspect-auto`}
              aria-label={`${card.title}: ${card.description}`}
            >
              <Image
                src={card.imageUrl}
                alt={card.imageAlt || card.title}
                fill
                sizes="(min-width: 1024px) 30vw, calc(100vw - 2.5rem)"
                className={`${styles.cardImage} object-cover`}
              />

              <span className={styles.cardOverlay} aria-hidden="true" />

              <span className={styles.cardArrow}>
                <ArrowUpRightIcon />
              </span>

              <span className="relative z-10 flex w-full max-w-[15.3125rem] self-start flex-col items-start">
                <span
                  className={`${inter.className} text-2xl font-semibold leading-8 text-white`}
                  style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
                >
                  {card.title}
                </span>

                <span
                  className={`${styles.cardDescription} ${inter.className} text-base font-normal leading-6 text-white/90`}
                  style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
                >
                  {card.description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="connected-world-heading"
        className={`${styles.connectedWorld} flex min-h-[56rem] w-full flex-col items-start justify-start gap-8 px-5 py-16 sm:px-8 lg:h-[81.0625rem] lg:min-h-0 lg:flex-row lg:justify-center lg:gap-[3.5rem] lg:px-[3.5rem] lg:py-[6.25rem]`}
        style={{ backgroundImage: `url("${connectedWorldImage}")` }}
      >
        <h2
          id="connected-world-heading"
          className={`${exo2.className} w-full text-[2rem] font-semibold leading-10 tracking-[-0.03125rem] text-white sm:text-[2.5rem] sm:leading-[3rem] lg:w-[40.5rem] lg:flex-none lg:self-stretch`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        >
          {connectedWorldHeading}
        </h2>

        <p
          className={`${inter.className} w-full text-base font-normal leading-6 text-[#F9F9F9] lg:min-w-0 lg:flex-1`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        >
          {connectedWorldDescription}
        </p>
      </section>

      <section
        aria-label="Suman Media address and contact details"
        className="flex w-full flex-col items-start justify-center gap-[3.5rem] bg-white px-5 py-16 sm:px-8 lg:flex-row lg:px-[3.5rem] lg:py-[6.25rem]"
      >
        <div className="flex w-full min-w-0 flex-1 flex-col items-start gap-8 pb-4">
          <h2
            className={`${exo2.className} text-[2rem] font-semibold leading-10 tracking-[-0.03125rem] text-[#1A1A1A] sm:text-[2.5rem] sm:leading-[3rem]`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            Address
          </h2>

          <address
            className={`${inter.className} w-full max-w-[28.5625rem] whitespace-pre-line text-base font-normal not-italic leading-6 text-black`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            {contactAddress}
          </address>

          <div className="flex w-full flex-wrap items-center gap-2.5">
            {SOCIAL_ICONS.map((socialIcon) => {
              const socialHref = socialLinks.find((item) =>
                socialIcon.aliases.some(
                  (alias) => alias === normalizePlatform(item.platform),
                ),
              )?.url;
              const icon = (
                <Image
                  src={socialIcon.src}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 shrink-0"
                />
              );
              const iconClassName =
                "inline-flex h-14 w-14 items-center justify-center rounded-[6.25rem] bg-white/10 p-3 backdrop-blur-[4px] transition-colors sm:h-[4.5rem] sm:w-[4.5rem] sm:p-5";

              return socialHref ? (
                <a
                  key={socialIcon.platform}
                  href={socialHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Follow Suman Media on ${socialIcon.platform}`}
                  className={`${iconClassName} hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F6C1A]`}
                >
                  {icon}
                </a>
              ) : (
                <span
                  key={socialIcon.platform}
                  aria-label={socialIcon.platform}
                  role="img"
                  className={iconClassName}
                >
                  {icon}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex w-full min-w-0 flex-1 flex-col items-start gap-8 pb-4">
          <h2
            className={`${exo2.className} text-[2rem] font-semibold leading-10 tracking-[-0.03125rem] text-[#1A1A1A] sm:text-[2.5rem] sm:leading-[3rem]`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            Contact
          </h2>

          <div className="flex w-full flex-col items-start gap-6">
            <div className="flex items-start gap-2">
              <Image
                src="/images/icons/EnvelopeSimple.svg"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 shrink-0"
              />
              <p
                className={`${inter.className} text-base font-normal leading-6 text-black`}
                style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
              >
                <span>E-mail:&nbsp; </span>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-[#8F6C1A] transition-opacity hover:opacity-70"
                >
                  {contactEmail}
                </a>
              </p>
            </div>

            <div className="flex items-start gap-2">
              <Image
                src="/images/icons/Phone.svg"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 shrink-0"
              />
              <p
                className={`${inter.className} text-base font-normal leading-6 text-black`}
                style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
              >
                <span>Contact Number:&nbsp; </span>
                <a
                  href={`tel:${contactPhone.replace(/[^+\d]/g, "")}`}
                  className="text-[#8F6C1A] transition-opacity hover:opacity-70"
                >
                  {contactPhone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="contact-careers-heading"
        className="relative flex h-[30rem] w-full flex-col items-end justify-between overflow-hidden p-8"
      >
        <Image
          src={careersCtaImage}
          alt={careersCtaImageAlt}
          fill
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="z-0 object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 z-10 bg-[radial-gradient(118.01%_73.86%_at_57.53%_72.82%,rgba(0,0,0,0)_42.15%,rgba(0,0,0,0.76)_85.74%)]"
        />

        <div className="relative z-20 flex w-full max-w-[35.9375rem] self-start flex-col items-start gap-7">
          <h2
            id="contact-careers-heading"
            className={`${exo2.className} w-full text-[2rem] font-semibold leading-10 tracking-[-0.03125rem] text-white sm:text-[2.5rem] sm:leading-[3rem]`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            {careersCtaHeading}
          </h2>

          <Link
            href={careersCtaHref}
            className={`${inter.className} group inline-flex items-center justify-center gap-1 rounded-lg p-0 text-sm font-semibold leading-5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white`}
          >
            <span>{careersCtaButtonLabel}</span>
            <SmallArrowRightIcon />
          </Link>
        </div>

        <Link
          href="/"
          aria-label="Suman Media home"
          className="relative z-20 inline-flex items-center transition-opacity hover:opacity-80"
        >
          <Image
            src="/images/logo.png"
            alt="Suman Entertainment & Media"
            width={134}
            height={39}
            className="h-auto w-[8.375rem] opacity-50"
          />
        </Link>
      </section>
    </main>
  );
}
