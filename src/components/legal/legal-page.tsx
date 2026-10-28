import Link from "@/components/navigation/website-link";
import { LocalizedContent } from "@/components/localization/localized-server-content";
import content from "./legal-content.json";
import styles from "./legal-page.module.css";

export function LegalPage({ kind }: { kind: "terms" | "privacy" }) {
  const title = kind === "terms" ? "Terms & Conditions" : "Privacy Policy";
  const sections = content[kind];
  return <LocalizedContent><main id="legal-top" className={styles.page}>
    <header className={`${styles.hero} site-gutter`}>
      <p className={styles.eyebrow}>LEGAL &amp; INFORMATION</p>
      <h1>{title}</h1>
      <p className={styles.lead}>Clear information. Confident choices.</p>
      <p className={styles.updated}>Updated 26 October 2026</p>
    </header>
    <div className={`${styles.layout} site-gutter`}>
      <nav aria-label="On this page" className={styles.contents}>
        <p>On this page</p>
        {sections.map((section, index) => <a href={`#${section.id}`} key={section.id}>
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{section.heading}
        </a>)}
      </nav>
      <div className={styles.body}>
        {sections.map(section => <section id={section.id} key={section.id} className={styles.section}>
          <h2>{section.heading}</h2><p>{section.body}</p>
        </section>)}
        <div className={styles.contact}>
          <h2>Questions about this page?</h2>
          <Link href="/contact/form?type=general">Talk to our team <span aria-hidden="true">›</span></Link>
          <Link href={kind === "terms" ? "/privacy-policy" : "/terms-and-conditions"}>
            {kind === "terms" ? "Read our Privacy Policy" : "Read our Terms & Conditions"}<span aria-hidden="true">›</span>
          </Link>
        </div>
        <a className={styles.back} href="#legal-top">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </div>
  </main></LocalizedContent>;
}
