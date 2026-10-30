import { PreFooterBanner } from "@/components/shared/pre-footer-banner";
import { LocalizedContent } from "@/components/localization/localized-server-content";
import Image from "next/image";
import Link from "@/components/navigation/website-link";
import { NewsBlogsSection } from "@/components/landing/news-blogs-section";
import { ScrollFormats } from "./idea-formats-scroll-section";
import { TextReveal } from "@/components/motion/text-reveal";
import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";
import { InteractiveCapabilities, type CapabilityItem } from "./interactive-capabilities";
import styles from "./publications-and-intellectual-property-page.module.css";

const publicationCapabilities: CapabilityItem[] = [
  {
    title: "AI Publications Backend Support",
    description: "Supporting publishing workflows and backend requirements for AI-enabled publications.",
  },
  {
    title: "Digital Publishing Platforms",
    description: "Digital platforms for presenting, organising and distributing published content.",
  },
  {
    title: "Research Reports",
    description: "Structured reports that present research, findings and relevant insights.",
  },
  {
    title: "Knowledge Portals",
    description: "Organised digital destinations for accessing information and resources.",
  },
  {
    title: "Industry Indices",
    description: "Structured indices designed to present industry information and trends.",
  },
  {
    title: "Editorial Services",
    description: "Content editing, refinement and preparation for publication.",
  },
  {
    title: "Thought Leadership Programs",
    description: "Developing expert-led content and perspectives around relevant subjects.",
  },
];

const ipCapabilities: CapabilityItem[] = [
  {
    title: "Original Show Formats",
    description: "Developing concepts and formats for original entertainment programming.",
  },
  {
    title: "Entertainment Franchises",
    description: "Exploring entertainment properties that can extend across multiple instalments or formats.",
  },
  {
    title: "Character IPs",
    description: "Creating distinctive characters with storytelling and licensing potential.",
  },
  {
    title: "Documentary Properties",
    description: "Developing documentary concepts and properties around real stories and subjects.",
  },
  {
    title: "Digital Assets",
    description: "Developing creative digital properties and content assets.",
  },
  {
    title: "Licensing",
    description: "Exploring opportunities to license intellectual property for approved uses.",
  },
  {
    title: "Rights Monetisation",
    description: "Identifying potential commercial opportunities from intellectual property rights.",
  },
  {
    title: "Syndication",
    description: "Exploring opportunities to distribute content and formats across platforms or markets.",
  },
];

const ipFormats = ["Shows & Films", "Documentaries", "Characters", "Franchises", "Digital Assets", "Licensing", "Rights Monetization", "Syndication and platforms"];
const publicationFormats = ["Research reports", "White papers", "Digital articles", "Industry insights", "Knowledge portals"];

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export function ProductPage({ kind }: { kind: "publication" | "ip" }) {
  const isIp = kind === "ip";
  const name = isIp ? "Intellectual Property Development" : "Publications & Knowledge Platforms";
  const cta = isIp ? "Discuss an IP Opportunity" : "Discuss a Publishing Project";

  return <LocalizedContent>{(
    <main className={`${styles.page} ${isIp ? "" : styles.publicationPage}`}>
      <section className={`${styles.hero} ${isIp ? styles.ipHero : styles.publicationHero} site-gutter`} aria-labelledby="product-heading">
        <div className={styles.heroBackdrop} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{name}</p>
          <TextReveal
            as="h1"
            id="product-heading"
            className={styles.heroTitle}
            text={isIp ? "From Original Ideas\nto Lasting IP." : "Turning Information\nInto Knowledge."}
            effect="mask"
            split="words"
            delay={0.15}
          />
          <ScrollTextReveal>
            <p className={styles.intro}>
              {isIp
                ? "Developing entertainment concepts, original formats and creative properties with potential to grow across content, platforms, licensing and distribution."
                : "From digital publishing and research reports to industry insights and knowledge platforms, we support the creation and dissemination of useful, accessible information."}
            </p>
          </ScrollTextReveal>
          <Link className={`${styles.action} ${styles.heroAction}`} href="/contact/form">{cta}<ChevronRight /></Link>
        </div>
      </section>

      {!isIp && <div className={styles.officePhoto}>
        <Image src="/images/publications-and-intellectual-property/publication-office.jpg" alt="An editorial team collaborating in a shared office" width={1440} height={628} sizes="100vw" />
      </div>}

      {isIp ? (
        <section className={`${styles.potential} site-section`} aria-labelledby="potential-heading">
          <div className={styles.potentialHeading}>
            <p className={styles.eyebrow}>The potential of an idea</p>
            <div>
              <TextReveal as="h2" id="potential-heading" className={styles.subheading} text="Creative Ideas Can Travel Beyond One Format." effect="mask" split="words" />
              <p className={styles.intro}>Explore the types of creative properties and commercial opportunities within intellectual property development.</p>
            </div>
          </div>
          <ul className={`${styles.pills} ${styles.ipPills}`}>
            {ipFormats.map((format) => <li key={format}>{format}</li>)}
          </ul>
        </section>
      ) : null}

      <section className={`${styles.capabilities} site-section`} aria-labelledby="capabilities-heading">
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>{isIp ? "EXPLORE OUR IP CAPABILITIES" : name}</p>
          <TextReveal as="h2" id="capabilities-heading" className={styles.heading} text={isIp ? "One Idea. Multiple Possibilities." : "Knowledge Across Formats."} effect="mask" split="words" />
        </header>
        <InteractiveCapabilities items={isIp ? ipCapabilities : publicationCapabilities} isIp={isIp} />
      </section>

      {!isIp && <ScrollFormats formats={publicationFormats} />}

      <section className={`${styles.projectCta} site-section`} aria-labelledby="project-cta-heading">
        <div>
          <TextReveal as="h2" id="project-cta-heading" className={styles.subheading} text={isIp ? "Have an Idea Worth\nDeveloping?" : "Have Knowledge\nWorth Publishing?"} effect="mask" split="words" />
          <p className={styles.ctaDescription}>{isIp
            ? "Let's explore opportunities to develop, extend and commercialise creative properties through suitable content and licensing partnerships."
            : "Let's explore opportunities across research, editorial development, digital publishing and knowledge platforms."}</p>
        </div>
        <Link className={`${styles.action} ${styles.goldAction}`} href="/contact/form">{isIp ? cta : "Discuss a Project"}<ChevronRight /></Link>
      </section>
      <NewsBlogsSection eyebrow="Latest Announcements" heading="News" />
      <PreFooterBanner type={4} />
    </main>
  )}</LocalizedContent>;
}
