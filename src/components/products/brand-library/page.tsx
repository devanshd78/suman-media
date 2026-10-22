import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { NewsBlogsSection } from "@/components/landing/news-blogs-section";
import shared from "../knowledge-ip/product-page.module.css";
import styles from "./page.module.css";
import { Catalogue } from "./catalogue";

const brandServices = [
  ["Integrated Marketing Campaigns", "Connecting multiple channels through a unified brand message.", "CAMPAIGNS"],
  ["Sponsorship Sales", "Connecting sponsorship opportunities with relevant brands and partners.", "BRAND / EXPERIENCE"],
  ["Brand Partnerships", "Building collaborations between brands, platforms and properties.", "CONNECTIONS"],
  ["Product Placement", "Integrating brands into relevant entertainment and media content.", "CONTENT / BRAND"],
  ["Branded Entertainment", "Bringing brands into engaging content and entertainment experiences.", "ENTERTAINMENT"],
  ["Media Buying & Planning", "Planning advertising placements across relevant media channels.", "OUTDOOR / DIGITAL / MEDIA"],
];
const rights = [
  ["Publishing Rights", "Publishing-related rights and ownership information."],
  ["Synchronization Rights", "Opportunities to license music for use alongside visual content."],
  ["Digital Rights Management", "Organising and managing relevant digital content rights."],
];
const steps = [
  ["Understand", "Identify brand goals and audience needs."],
  ["Plan", "Define the campaign approach and media opportunities."],
  ["Connect", "Align brands with relevant platforms and partnerships."],
  ["Activate", "Coordinate campaign execution across selected channels."],
];
function Chevron() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>;
}
function Action({ children, gold = false, href = "/contact/form" }: { children: ReactNode; gold?: boolean; href?: string }) {
  return <Link href={href} className={`${shared.action} ${gold ? shared.goldAction : styles.textAction}`}>{children}<Chevron /></Link>;
}
export function BrandLibraryPage({ kind }: { kind: "brand" | "library" }) {
  const brand = kind === "brand";
  const name = brand ? "Brand Solutions & Advertising" : "Content & Music Library Management";
  return <main className={shared.page}>
    <section className={`${shared.hero} ${shared.publicationHero} ${styles.hero} site-gutter`} aria-labelledby="page-title">
      <Image src="/images/knowledge-ip/publication-hero.png" alt="" fill preload unoptimized sizes="100vw" className={shared.heroImage} />
      <div className={styles.heroContent}>
        <p className={shared.eyebrow}>{name}</p>
        <h1 id="page-title" className={shared.heroTitle}>{brand ? "Bringing Brands and\nAudiences Together." : "A library of films, music and cultural content—organised for discovery, rights management, licensing and digital distribution."}</h1>
        {brand && <p className={shared.intro}>We connect brands with relevant audiences through integrated campaigns, strategic partnerships, branded entertainment and media opportunities.</p>}
        <div className={styles.heroAction}><Action href={brand ? "/contact/form" : "/partners"}>{brand ? "Discuss a Campaign" : "Explore Partnerships"}</Action></div>
      </div>
    </section>
    <section className={`${brand ? styles.services : ""} site-section`} aria-labelledby="capabilities-title">
      <header className={`${shared.sectionHeader} ${!brand ? styles.center : ""}`}>
        <p className={shared.eyebrow}>{brand ? "What We Do" : "Our Capabilities"}</p>
        <h2 id="capabilities-title" className={shared.heading}>{brand ? "Brand Solutions That\nCreate Connections." : "Knowledge Across Formats."}</h2>
      </header>
      {brand ? <ul className={styles.grid}>{brandServices.map(([title, description, label], i) => <li key={title}>
        <Link href="/contact/form" className={styles.card} aria-label={`Discuss ${title}`}>
          <div className={styles.cardArt} data-tone={i} aria-hidden="true"><span>{label}</span>{i === 2 && <div className={styles.rings} />}</div>
          <div className={styles.cardBody}><span className={styles.number}>{String(i + 1).padStart(2, "0")} —</span><h3>{title}</h3><p>{description}</p><span className={styles.cardLink}>Discuss a Campaign <Chevron /></span></div>
        </Link>
      </li>)}</ul> : <Catalogue />}
    </section>
    {brand ? <>
      <section className="site-section" aria-labelledby="journey-title">
        <header className={`${shared.sectionHeader} ${styles.center}`}><p className={shared.eyebrow}>How the Journey Starts</p><h2 id="journey-title" className={shared.heading}>From Content to Audience.</h2></header>
        <ol className={styles.steps}>{steps.map(([title, description], i) => <li key={title}><span className={styles.stepNumber}>{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
      </section>
      <section className={`${shared.projectCta} ${styles.project} site-section`} aria-labelledby="project-title"><div><h2 id="project-title" className={shared.subheading}>{"Have a Brand\nOpportunity in Mind?"}</h2><p className={shared.ctaDescription}>Let&apos;s explore campaign ideas, partnerships and advertising opportunities that align with your goals.</p></div><Action gold>Discuss a Campaign</Action></section>
    </> : <section className={`${styles.rights} site-section`} aria-labelledby="rights-title">
      <div className={styles.rightsHeader}><div><p className={shared.eyebrow}>AI in Action</p><h2 id="rights-title" className={shared.heading}>{"From Content\nto Intelligence"}</h2></div><div><p>Explore rights-related services and opportunities for content use, licensing and monetization.</p><Action>Discuss a Project</Action></div></div>
      <ul className={styles.grid}>{rights.map(([title, description], i) => <li key={title} className={styles.rightsCard}><span className={styles.number}>{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p><Action>Talk to an Expert</Action></li>)}</ul>
    </section>}
    <NewsBlogsSection />
    <section className={`${shared.contactBanner} site-section`} aria-labelledby="contact-title">
      <Image src="/images/knowledge-ip/ip-hero.png" alt="" fill unoptimized sizes="100vw" className={shared.heroImage} />
      <h2 id="contact-title" className={shared.subheading}>{brand ? "Have a story worth telling?\nLet's bring it to the world." : "Looking for Content or\nLicensing Opportunities?"}</h2>
      <Link href={brand ? "/partners" : "/contact/form"} className={`${shared.action} ${shared.heroAction}`}>{brand ? "Join as a Partner" : "Contact us"}<Chevron /></Link>
    </section>
  </main>;
}

