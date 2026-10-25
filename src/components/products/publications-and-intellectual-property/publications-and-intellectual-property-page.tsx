
import { PreFooterBanner } from "@/components/shared/pre-footer-banner";
import { LocalizedContent } from "@/components/localization/localized-server-content";
import Image from "next/image";
import Link from "next/link";
import { NewsBlogsSection } from "@/components/landing/news-blogs-section";
import { ScrollFormats } from "./idea-formats-scroll-section";
import styles from "./publications-and-intellectual-property-page.module.css";

const publicationCapabilities = [
  "AI Publications Backend Support", "Digital Publishing Platforms", "Research Reports",
  "Knowledge Portals", "Industry Indices", "Editorial Services", "Thought Leadership Programs",
];
const ipCapabilities = [
  "Original Show Formats", "Entertainment Franchises", "Character IPs", "Documentary Properties",
  "Digital Assets", "Licensing", "Rights Monetisation", "Syndication",
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
        <Image src={`/images/publications-and-intellectual-property/${isIp ? "intellectual-property" : "publication"}-hero.png`} alt="" fill sizes="100vw" preload unoptimized className={styles.heroImage} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{name}</p>
          <h1 id="product-heading" className={styles.heroTitle}>{isIp ? "From Original Ideas\nto Lasting IP." : "Turning Information\nInto Knowledge."}</h1>
          <p className={styles.intro}>{isIp
            ? "Developing entertainment concepts, original formats and creative properties with potential to grow across content, platforms, licensing and distribution."
            : "From digital publishing and research reports to industry insights and knowledge platforms, we support the creation and dissemination of useful, accessible information."}</p>
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
              <h2 id="potential-heading" className={styles.subheading}>Creative Ideas Can Travel Beyond One Format.</h2>
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
          <p className={styles.eyebrow}>{isIp ? "Explore our IP capabilities" : name}</p>
          <h2 id="capabilities-heading" className={styles.heading}>{isIp ? "One Idea. Multiple Possibilities." : "Knowledge Across Formats."}</h2>
        </header>
        <ul className={styles.cards}>
          {(isIp ? ipCapabilities : publicationCapabilities).map((title, index) => (
            <li key={title}>
              <Link href="/contact/form" aria-label={`Discuss ${title}`} className={styles.capabilityCard} data-tone={!isIp && index === 6 ? 7 : index}>
                <span>{title}</span>
                <ChevronRight className={styles.cardArrow} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {!isIp && <ScrollFormats formats={publicationFormats} />}

      <section className={`${styles.projectCta} site-section`} aria-labelledby="project-cta-heading">
        <div>
          <h2 id="project-cta-heading" className={styles.subheading}>{isIp ? "Have an Idea Worth\nDeveloping?" : "Have Knowledge\nWorth Publishing?"}</h2>
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
