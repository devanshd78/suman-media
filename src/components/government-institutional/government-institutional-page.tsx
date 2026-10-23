import Image from "next/image";
import Link from "next/link";
import { NewsBlogsSection } from "@/components/landing/news-blogs-section";
import { Chevron, GovernmentHero } from "./government-institutional-hero";
import styles from "./government-institutional-page.module.css";
const services = [
  {title:"Public Awareness Campaign", description:"Communication campaigns designed to inform people about public initiatives, services and important issues.",image:"awareness",alt:"Public-awareness signage along a city street"},
  {title:"Tourism & Heritage Promotion",description:"Premium content behind a recurring subscription — built for audiences who want continuous access to a curated entertainment library.",image:"tourism",alt:"An elephant at a historic Indian fort"},
  {title:"Cultural Documentation",description:"Showcasing regional culture, traditions, people and stories through media and content production.",image:"culture",alt:"Traditional musicians taking part in a cultural procession"},
  {title:"Government & Institutional Events",description:"Supporting the communication and execution of public, cultural and institutional events.",image:"events",alt:"Participants gathered on stage for an institutional event"},
];
export function GovernmentPage() {
  return <main className={styles.page}>
    <GovernmentHero />
    <section className={styles.services} aria-labelledby="impact-title">
      <header className={styles.sectionHeader}><p className={styles.eyebrow}>Government, PSU &amp; Institutional Services</p><h2 id="impact-title">Communication for Public Impact</h2><p>Different content calls for different revenue models. Choose the approach that<br className={styles.desktopBreak}/> fits your audience, content library and growth strategy.</p></header>
      <div className={styles.serviceList}>{services.map((service,index)=><article className={styles.service} key={service.image} aria-labelledby={`service-${service.image}`}>
        <Image src={`/images/government-institutional/${service.image}.jpg`} alt={service.alt} width={636} height={368} sizes="(max-width: 767px) 90vw, 45vw" className={styles.serviceImage}/>
        <div className={styles.serviceCopy}><h3 id={`service-${service.image}`}>{String(index+1).padStart(2,"0")}. {service.title}</h3><p>{service.description}</p><Link href="/contact/form" className={styles.action} aria-label={`Learn more about ${service.title}`}>Learn more <Chevron /></Link></div>
      </article>)}</div>
    </section>
    <NewsBlogsSection eyebrow="Latest Announcements" heading="News" />
    <section className={styles.contactBanner} aria-labelledby="government-contact-title">
      <Image src="/images/brand-solutions-and-content-library/library-contact.jpg" alt="" fill sizes="100vw" className={styles.contactImage}/>
      <h2 id="government-contact-title">{"Have a Market\nStory to Communicate?"}</h2><Link href="/contact/form" className={styles.action}>Contact us <Chevron /></Link>
    </section>
  </main>;
}
