import { pageLink, websitePages } from "./website-routes";

export type NavMenu = {
  id: string;
  label: string;
  columns: {
    heading: string;
    entries: { label: string; href: string; sublines?: string[]; subtext?: string }[];
    image?: { src: string; alt: string };
  }[];
  featured?: { href: string; imageSrc: string; imageAlt: string; tag: string; title: string };
  gridColumns: string;
};

export const NAV_MENUS: NavMenu[] = [
  {
    id: "product", label: "Product", gridColumns: "1fr 1fr 1.5fr", columns: [
      { heading: "Digital Platforms", entries: [pageLink("ott"), pageLink("monetization"), pageLink("fast"), pageLink("ai")] },
      { heading: "Content Assets", entries: [pageLink("library"), pageLink("publications"), pageLink("ip")] },
    ], featured: { href: websitePages.ott.path, imageSrc: "/images/about/news-03.webp", imageAlt: "Raja Shivchhatrapati on Abhijat Marathi OTT", tag: "OTT", title: "Abhijat Marathi OTT" }
  },
  {
    id: "services", label: "Services", gridColumns: "1fr 1fr 1.1fr 0.7fr", columns: [
      { heading: "Media and Production", entries: [pageLink("media"), pageLink("music"), pageLink("events")] },
      {
        heading: "Marketing and Brand Services",
        entries: [
          pageLink("brand"),
          pageLink("networks"),
          {
            label: "Digital Marketing & Communication",
            href: "/services/digital-marketing-communication",
          },
        ],
      },
      { heading: "Creator Services", entries: [{ ...pageLink("creators"), sublines: ["Artist, Celebrity, Influencer Management", "Speaker Bureau", "Brand Endorsements", "Content Creator Network"] }] },
      {
        heading: "Any Specific Need?",
        entries: [
          { label: "Call now?", href: websitePages.contact.path },
        ],
      },
    ]
  },
  {
    id: "solutions", label: "Solutions", gridColumns: "1.1fr 1.1fr 1fr", columns: [
      { heading: "Government & Institutional", entries: [{ ...pageLink("government"), sublines: ["State/Central Government Empanelment", "Citizen Engagement Programs", "Tourism Promotion", "Heritage Promotion", "IEC & Public Awareness Campaigns", "Event Management"] }] },
      {
        heading: "Capital & Business Growth", entries: [
          { ...pageLink("capital"), subtext: "Investor Relations, Shareholder Communications, Digital Roadshow, Financial PR, Listed Company Communication" },
          { ...pageLink("international"), subtext: "Co-Productions, Film Festivals, International Markets, Global Distribution, Strategic Alliances, Market Representation" },
        ]
      },
      { heading: "Distribution & Licensing", entries: [{ ...pageLink("distribution"), subtext: "Film & Music Rights Acquisition, OTT Rights, Satellite Rights, FAST Channel Content Acquisition, International Distribution, Syndication" }], image: { src: "/images/about/news-01.webp", alt: "Live concert audience" } },
    ]
  },
];

export const NAV_LINKS = [
  pageLink("partners"),
  pageLink("careers"),
];

export type FooterLink = { label: string; href: string | null; arrow?: boolean; soon?: boolean };
export const FOOTER_LINKS: Record<string, FooterLink[]> = {
  COMPANY: [pageLink("about"), pageLink("careers"), { label: "Leadership", href: "/about#leadership" }, { label: "Our Journey", href: "/about#our-journey" }, pageLink("companies"), pageLink("contact"), pageLink("partners")],
  RESOURCES: [pageLink("news"), pageLink("portfolio"), { label: "FAQ", href: "/#faq" }, pageLink("terms"), pageLink("privacy")],
  PRODUCT: [pageLink("ott"), pageLink("monetization"), pageLink("fast"), pageLink("ai"), pageLink("library"), pageLink("publications"), pageLink("ip")],
  SERVICES: [
    pageLink("brand"),
    pageLink("media"),
    pageLink("music"),
    pageLink("events"),
    pageLink("networks"),
    {
      label: "Digital Marketing & Communication",
      href: "/services/digital-marketing-communication",
    },
    pageLink("creators"),
    pageLink("services"),
  ],
  SOLUTIONS: [pageLink("government"), pageLink("capital"), pageLink("international"), pageLink("distribution")].map(link => ({ ...link, arrow: true })),
  INVESTOR: [{ label: "Investor enquiries", href: "/contact/form?type=investor" }, { label: "Roadmap", href: "/about#our-journey" }, { label: "Company Profile", href: "/about" }, { label: "Financials Data", href: null, soon: true }, { label: "IPO 2027", href: null, soon: true }],
  CONTACT: [{ label: "Contact Information", href: "/contact", arrow: true }, { label: "Business Enquiry", href: "/contact/form?type=general", arrow: true }, { label: "Partnership Enquiry", href: "/contact/form?type=partnership", arrow: true }],
};
