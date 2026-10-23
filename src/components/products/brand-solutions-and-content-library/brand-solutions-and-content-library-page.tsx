import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { NewsBlogsSection } from "@/components/landing/news-blogs-section";
import styles from "./brand-solutions-and-content-library-page.module.css";
import { Catalogue, LibraryGallery } from "./content-library-catalogue";

const brandServices = [
  ["Integrated Marketing Campaigns", "Connecting multiple channels through a unified brand message.", "campaigns.jpg"],
  ["Sponsorship Sales", "Connecting sponsorship opportunities with relevant brands and partners.", "sponsorship.png"],
  ["Brand Partnerships", "Building collaborations between brands, platforms and properties.", "partnerships.png"],
  ["Product Placement", "Integrating brands into relevant entertainment and media content.", "placement.jpg"],
  ["Branded Entertainment", "Bringing brands into engaging content and entertainment experiences.", "entertainment.jpg"],
  ["Media Buying & Planning", "Planning advertising placements across relevant media channels.", "media.png"],
];
const rights = [
  ["Publishing Rights", "Publishing-related rights and ownership information."],
  ["Synchronization Rights", "Opportunities to license music for use alongside visual content."],
  ["Digital Rights Management", "Organising and managing relevant digital content rights."],
];
const steps = [
  ["Understand", "Identify brand goals and audience needs."],
  ["Active", "Define the campaign approach and media opportunities."],
  ["Connect", "Align brands with relevant platforms and partnerships."],
  ["Active", "Coordinate campaign execution across selected channels."],
];
function Chevron() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>;
}
function Action({ children, gold = false, href = "/contact/form" }: { children: ReactNode; gold?: boolean; href?: string }) {
  return <Link href={href} className={`${styles.action} ${gold ? styles.goldAction : ""}`}>{children}<Chevron /></Link>;
}
function StepIcon({ index }: { index: number }) {
  return <svg className={styles.stepIcon} width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {index === 0 ? <><rect x="5" y="7" width="36" height="34" rx="2" fill="#f1ead9"/><path d="M30 7v34M35 15h2M35 23h2M35 31h2"/><circle cx="17" cy="20" r="5"/><path d="M9 34c0-9 16-9 16 0"/></> : index === 1 ? <><path d="M23 3v5M14 45l9-11 10 11"/><rect x="4" y="8" width="38" height="26" rx="2" fill="#f1ead9"/><path d="M15 27v-7M23 27V14M31 27V18"/></> : <><path d="m14 3 10 9L34 3"/><rect x="5" y="12" width="37" height="29" rx="2" fill="#f1ead9"/><path d="M32 12v29M37 20h1M37 28h1M13 33V22"/></>}
  </svg>;
}
export function BrandLibraryPage({ kind }: { kind: "brand" | "library" }) {
  const brand = kind === "brand";
  return <main className={`${styles.page} ${brand ? styles.brandPage : styles.libraryPage}`}>
    <section className={styles.hero} aria-labelledby="page-title">
      <div className={styles.heroContent}>
        <p className={styles.eyebrow}>{brand ? "Brand Solutions & Advertising" : "Content & Music Library Management"}</p>
        <h1 id="page-title">{brand ? "Bringing Brands and\nAudiences Together." : "A library of films, music and cultural content—\norganised for discovery, rights management,\nlicensing and digital distribution."}</h1>
        {brand && <p className={styles.intro}>We connect brands with relevant audiences through integrated campaigns,<br className={styles.desktopBreak}/> strategic partnerships, branded entertainment and media opportunities.</p>}
        <Action href={brand ? "/contact/form" : "/partners"}>{brand ? "Discuss a Campaign" : "Explore Partnerships"}</Action>
      </div>
    </section>
    {brand ? <div className={styles.heroMedia}><Image src="/images/brand-solutions-and-content-library/brand-hero.jpg" alt="A creator connecting a brand with an audience through a live broadcast" width={1328} height={588} priority sizes="(max-width: 639px) 100vw, 92vw" /></div> : <LibraryGallery />}
    <section className={`${styles.section} ${brand ? styles.services : styles.library}`} aria-labelledby="capabilities-title">
      <header className={`${styles.sectionHeader} ${!brand ? styles.center : ""}`}>
        <p className={styles.eyebrow}>{brand ? "What We Do" : "Our Capabilities"}</p>
        <h2 id="capabilities-title">{brand ? "Brand Solutions That\nCreate Connections." : "Knowledge Across Formats."}</h2>
      </header>
      {brand ? <ul className={styles.grid}>{brandServices.map(([title, description, asset], i) => <li key={title}>
        <Link href="/contact/form" className={styles.card} aria-label={`Discuss ${title}`}>
          <Image className={styles.cardArt} src={`/images/brand-solutions-and-content-library/${asset}`} alt="" width={428} height={190} sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 30vw" />
          <div className={styles.cardBody}><span className={styles.number}>{String(i + 1).padStart(2, "0")} —</span><h3>{title}</h3><p>{description}</p><span className={styles.cardLink}><Chevron /></span></div>
        </Link>
      </li>)}</ul> : <Catalogue />}
    </section>
    {brand ? <>
      <section className={`${styles.section} ${styles.journey}`} aria-labelledby="journey-title">
        <header className={`${styles.sectionHeader} ${styles.center}`}><p className={styles.eyebrow}>How Global Journey Starts</p><h2 id="journey-title">From Content to Audience.</h2></header>
        <ol className={styles.steps}>{steps.map(([title, description], i) => <li key={i}><StepIcon index={i}/><h3>{title}</h3><p>{description}</p></li>)}</ol>
      </section>
      <section className={styles.project} aria-labelledby="project-title"><div><h2 id="project-title">{"Have a Brand\nOpportunity in Mind?"}</h2><p>Let&apos;s explore campaign ideas, partnerships and advertising opportunities that align with your goals.</p></div><Action gold>Discuss a Campaign</Action></section>
    </> : <section className={`${styles.section} ${styles.rights}`} aria-labelledby="rights-title">
      <div className={styles.rightsHeader}><div><p className={styles.eyebrow}>AI in Action</p><h2 id="rights-title">{"From Content\nto Intelligence"}</h2></div><div><p>Explore rights-related services and opportunities for content use, licensing and monetization.</p><Action>Discuss a Project</Action></div></div>
      <ul className={styles.grid}>{rights.map(([title, description], i) => <li key={title} className={styles.rightsCard}><h3>{String(i + 1).padStart(2, "0")}. {title}</h3><p>{description}</p><Action>Talk to an Expert</Action></li>)}</ul>
    </section>}
    <NewsBlogsSection eyebrow="Latest Announcements" heading="News" />
    <section className={styles.contactBanner} aria-labelledby="contact-title">
      <Image src={`/images/brand-solutions-and-content-library/${brand ? "brand" : "library"}-contact.jpg`} alt="" fill sizes="100vw" className={styles.contactImage} />
      <div className={styles.contactContent}><h2 id="contact-title">{brand ? "Have a story worth telling?\nLet's bring it to the world." : "Looking for Content or\nLicensing Opportunities?"}</h2>
      <Action href={brand ? "/partners" : "/contact/form"}>{brand ? "Join as a Partner" : "Contact us"}</Action></div>
    </section>
  </main>;
}
