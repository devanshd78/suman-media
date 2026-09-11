import type { CmsCareersCta, CmsFaqSection } from "@/types/cms";
import type {
    InsightDetail,
    InsightListItem,
    PortableTextNode,
} from "@/types/news-and-blogs";

const DATE = "2026-08-07T10:00:00.000Z";
const BASE = "/images/news-and-blogs/news-blogs";
const DEFAULT_EXCERPT =
    "Suman Entertainment & Media Pvt. Ltd. brings together platforms, content, technology and experiences under one growing media ecosystem.";

function item(
    id: string,
    title: string,
    slug: string,
    image: string,
    category: string,
    featured = false,
    excerpt = DEFAULT_EXCERPT,
): InsightListItem {
    return {
        _id: id,
        title,
        slug,
        excerpt,
        imageUrl: `${BASE}/${image}`,
        imageAlt: title,
        publishedAt: DATE,
        featured,
        authorName: "Suman Entertainment & Media Pvt. Ltd.",
        categories: [{ title: category, slug: category.toLowerCase().replace(/\s+/g, "-") }],
    };
}

export const REFERENCE_POSTS: InsightListItem[] = [
    item(
        "reference-hero",
        "One Content Ecosystem. Four Ways to Monetise.",
        "one-content-ecosystem-four-ways-to-monetise",
        "news-hero-cannes.jpg",
        "New launches",
        true,
        "Different content calls for different revenue models. Choose the approach that fits your audience, content library and growth strategy.",
    ),
    item(
        "reference-prajakta",
        "Prajakta Mali Cannes Moments 2026",
        "prajakta-mali-cannes-moments-2026",
        "featured-prajakta-cannes.jpg",
        "Latest Articles",
        true,
    ),
    item(
        "reference-feature-1",
        "Suman Entertainment & Media Pvt. Ltd.",
        "suman-media-cultural-stories",
        "featured-folk-performer.jpg",
        "New launches",
        true,
    ),
    item(
        "reference-feature-2",
        "Suman Entertainment & Media Pvt. Ltd.",
        "suman-media-cultural-celebrations",
        "featured-cultural-child.jpg",
        "New launches",
        true,
    ),
    item(
        "reference-bappa",
        "Bappa is coming",
        "bappa-is-coming",
        "news-bappa.jpg",
        "Articles",
    ),
    item(
        "reference-culture",
        "Essence of Marathi culture",
        "essence-of-marathi-culture",
        "news-marathi-culture.jpg",
        "New launches",
    ),
    item(
        "reference-karan",
        "Suman entertainment X Karan Aujla",
        "suman-entertainment-x-karan-aujla",
        "news-karan-aujla.jpg",
        "New launches",
    ),
    item(
        "reference-community",
        "Suman Entertainment & Media Pvt. Ltd.",
        "suman-community-stories",
        "news-community-dance.jpg",
        "Events",
    ),
    item(
        "reference-digital",
        "Suman Entertainment & Media Pvt. Ltd.",
        "suman-digital-platforms",
        "news-digital-team.jpg",
        "New added",
    ),
    item(
        "reference-festival-1",
        "Suman Entertainment & Media Pvt. Ltd.",
        "suman-festival-experiences-1",
        "news-festival-lights.jpg",
        "New launches",
    ),
    item(
        "reference-festival-2",
        "Suman Entertainment & Media Pvt. Ltd.",
        "suman-festival-experiences-2",
        "news-festival-lights.jpg",
        "New launches",
    ),
    item(
        "reference-press-1",
        "Suman Entertainment & Media Pvt. Ltd.",
        "suman-press-coverage-1",
        "press-temple.jpg",
        "Press",
    ),
    item(
        "reference-press-2",
        "Suman Entertainment & Media Pvt. Ltd.",
        "suman-press-coverage-2",
        "press-temple.jpg",
        "Press",
    ),
    item(
        "reference-case-study",
        "Suman Entertainment & Media Pvt. Ltd.",
        "suman-case-study",
        "press-temple.jpg",
        "Case study",
    ),
];

let key = 0;
const block = (
    text: string,
    style: "normal" | "h2" | "h3" | "h4" | "blockquote" = "normal",
    listItem?: "bullet" | "number",
): PortableTextNode => ({
    _key: `reference-block-${++key}`,
    _type: "block",
    style,
    ...(listItem ? { listItem, level: 1 } : {}),
    children: [
        {
            _key: `reference-span-${key}`,
            _type: "span",
            text,
            marks: [],
        },
    ],
    markDefs: [],
});

const image = (src: string, alt: string, caption?: string): PortableTextNode => ({
    _key: `reference-image-${++key}`,
    _type: "mediaImage",
    imageUrl: `${BASE}/${src}`,
    imageAlt: alt,
    caption,
});

const REFERENCE_BODY: PortableTextNode[] = [
    block(
        "Discover how to master SaaS UX challenges at scale with Domingo’s proven framework—ensuring growth without sacrificing user experience.",
    ),
    block("Growing Pains in SaaS UX — What Does Scaling Really Mean?", "h2"),
    block(
        "Picture this: Your SaaS product has found its market fit and is growing fast. More users, more features, more revenue—but with growth comes complexity. Have you noticed bottlenecks creeping into your user experience? Is your once-simple UI starting to feel tangled? Building for scale isn’t just about adding servers or databases; it’s about evolving your UX to keep pace without losing clarity or delight.",
    ),
    block(
        "Building for scale means designing UX systems that not only support rapid growth but also prevent chaos from creeping into your product. It’s about foresight—anticipating challenges and turning them into opportunities for smoother, faster, and more intuitive user journeys. In SaaS, this is vital to retain users, reduce churn, and efficiently onboard new customers at any volume.",
    ),
    block("Common User Experience Bottlenecks in Rapid Growth", "h2"),
    block("Scaling SaaS products faces several persistent UX hurdles:"),
    block(
        "Feature bloat and complexity: Adding new capabilities often disrupts the flow, confusing users.",
        "normal",
        "bullet",
    ),
    block(
        "Inconsistent design and fragmented UI: Fast-paced releases without cohesive designs create visual and interaction chaos.",
        "normal",
        "bullet",
    ),
    block(
        "Performance and usability trade-offs: As user numbers swell, slow load times and clunky interfaces can hurt engagement.",
        "normal",
        "bullet",
    ),
    block(
        "Sound familiar? How much time does your team spend fixing user complaints from confusing navigation or rearranging UI elements that don’t align? These are growing pains that, when unchecked, increase support costs and risk user abandonment.",
    ),
    block("Domingo-Lean Framework: A Scalable UX Roadmap for Growth", "h2"),
    block("Domingo’s lean six-phase framework offers a pragmatic path to master rapid SaaS scaling:"),
    block("Rapid Repair Audit: Diagnose urgent UX issues that could exacerbate with growth.", "normal", "number"),
    block("Core UI Repair: Standardize and refine UI components for consistency and ease of use.", "normal", "number"),
    block("System Foundation: Build a flexible design system that supports scalable patterns and reusable assets.", "normal", "number"),
    block("AI Workflow Setup: Employ AI to maintain design quality and spot emerging UX debt early.", "normal", "number"),
    block("Validation & Handoff: Streamline handoffs between design, product, and engineering for speed and quality.", "normal", "number"),
    block("Sprint Roadmap: Prioritize UX improvements aligned with scaling goals and user impact.", "normal", "number"),
    block(
        "This iterative approach helps teams stay ahead of complexity, ensuring UX remains a growth enabler—not a bottleneck.",
    ),
    block(
        "Domingo Designing Agency applied their exceptional UI/UX expertise to elevate our site’s user experience. They were proactive in communication, collaborative in their approach, and ensured the entire process was seamless — delivering the finished product exactly as promised and on time. Managing Director, Bubbles, Hair & Beauty",
        "blockquote",
    ),
    block("Why Early Planning Is the Secret Sauce for Scalable UX", "h2"),
    block(
        "Think of scaling UX like city planning. Placing roads, utilities, and traffic controls early avoids future gridlock. Similarly, SaaS UX built without scalable infrastructure quickly turns into a maze of patches and band-aids.",
    ),
    block(
        "Early investment in scalable UX design disciplines—like building robust design systems and establishing clear style guides—saves teams countless hours in redesigns and helps maintain a seamless, intuitive user experience despite rapid changes.",
    ),
    block("Do you have the roadmap to plan your SaaS UX’s infrastructure today so it supports tomorrow’s growth?"),
    image(
        "article-red-carpet.jpg",
        "Cannes red carpet moment",
        "Credits: Marissa Grootes",
    ),
    block("Cross-Industry Innovation: AI and Automation in SaaS Growth", "h2"),
    block(
        "At Domingo, we blend lessons from eCommerce, fintech, and healthcare to fuel smarter, faster UX scaling. AI-powered tools monitor design consistency and user behavior continuously, helping teams catch and fix UX debt before it snowballs.",
    ),
    block(
        "AI also accelerates collaboration through instant feedback loops, predictive analyses, and automated usability testing—turning the usual UX bottlenecks into competitive advantages.",
    ),
    block(
        "Imagine a future where your SaaS UX team can preemptively solve scaling challenges—no guesswork, just data-driven confidence.",
    ),
    block(
        "Domingo is more than a design agency: they are partners in success. The level of collaboration, creativity and professionalism they bring to the table is unparalleled. Dr. Hassan Yasin, CEO at Moodit",
        "blockquote",
    ),
    image(
        "article-workshop.jpg",
        "Team collaborating around a table",
        "Credits: airfocus",
    ),
    block("Aligning Stakeholders for Scalable UX Excellence", "h2"),
    block(
        "Scaling UX requires tight alignment across product, design, engineering, and business teams. Domingo facilitates this through collaborative workshops to align goals, clear KPIs tied to user experience and business outcomes, and shared dashboards supported by AI analytics.",
    ),
    block(
        "When all hands understand the UX vision and their role in executing it, the product scales faster with fewer costly detours or redesigns.",
    ),
    block("The Power of UX Scalability in SaaS Growth Horizons", "h2"),
    block(
        "SaaS teams scaling rapidly risk creating a patchwork of UI patterns, inconsistent styles, and fragmented experiences.",
    ),
    block("This leads to design debt, inflated maintenance costs, slower engineering cycles, and a diluted brand identity."),
    block(
        "A well defined design system solves these issues by providing reusable components, clear style guidelines, and a unified design language.",
    ),
    block("Real SaaS Success Stories", "h2"),
    block(
        "Domingo Designing Agency helped us cut page load time by 40%, reduce bounce rate by 25%, and increase average session duration by 35%. They boosted our traffic, improved conversions, and helped us achieve an over 90 PageSpeed Insights score for both mobile and desktop. — Co-Founder & Director, One Orange Digital",
        "blockquote",
    ),
    block(
        "Domingo is more than a design agency: they are partners in success. The level of collaboration, creativity and professionalism they bring to the table is unparalleled. I’m grateful for the positive impact they’ve had on our projects. — Dr. Hassan Yasin, CEO at Moodit",
        "blockquote",
    ),
    block(
        "Pleasure working with Domingo. Effortlessly brings ideas to life through modern UI design. Deep understanding of UX exceeded expectations. Look forward to future collaborations. — Peter J Goodman, CEO at Kazoo",
        "blockquote",
    ),
    block(
        "Choosing Domingo was a game-changer. The synergy between Domingo’s cutting-edge design, Sanchit’s leadership, and their deep understanding of UX creates an unbeatable combination. Results consistently surpass expectations. — Jason Dowell, Creative Director at Savills",
        "blockquote",
    ),
    block("…and many more."),
    block("Connect with us", "h2"),
    block(
        "Book a strategy call directly with Domingo’s founder today to tailor your fractional design leadership journey.",
    ),
    block(
        "Hear what leading customers say: “Domingo revolutionized our design process with AI and expert leadership—we've scaled without the full-time overhead.”",
    ),
    block(
        "Follow us on Behance, Instagram, YouTube, and Twitter to stay updated on the latest innovations and case studies.",
    ),
    block(
        "Domingo — Your fractional C-Suite design partner enabling fast releases, happier users, and scalable success on a flexible monthly retainer.",
    ),
];

const hero = REFERENCE_POSTS[0];

export const REFERENCE_ARTICLE: InsightDetail = {
    ...hero,
    _type: "post",
    _updatedAt: DATE,
    body: REFERENCE_BODY,
    imageCredit: "Caanes.com",
    readingTimeMinutes: 4,
    author: {
        name: "Suman Entertainment & Media Pvt. Ltd.",
    },
    relatedPosts: [REFERENCE_POSTS[4], REFERENCE_POSTS[1], REFERENCE_POSTS[5]],
    previousPost: {
        title: "Essence of Marathi culture",
        slug: "essence-of-marathi-culture",
    },
    nextPost: {
        title: "Prajakta Mali Cannes Moments 2026",
        slug: "prajakta-mali-cannes-moments-2026",
    },
    seo: {
        title: hero.title,
        description: hero.excerpt,
    },
};

export function getReferenceArticle(slug: string): InsightDetail | null {
    if (slug === REFERENCE_ARTICLE.slug) return REFERENCE_ARTICLE;

    const fallback = REFERENCE_POSTS.find((post) => post.slug === slug);
    if (!fallback) return null;

    return {
        ...REFERENCE_ARTICLE,
        ...fallback,
        _id: fallback._id,
        slug: fallback.slug,
        title: fallback.title,
        excerpt: fallback.excerpt,
        imageUrl: fallback.imageUrl,
        imageAlt: fallback.imageAlt,
        categories: fallback.categories,
        seo: {
            title: fallback.title,
            description: fallback.excerpt,
        },
    };
}

export const REFERENCE_FAQ: CmsFaqSection = {
    eyebrow: "FAQ",
    heading: "Questions people asked?",
    contactText: "still have a quarry?",
    contactEmail: "Contact@sumanentertainment.com",
    items: [
        {
            _key: "faq-1",
            question: "What is Suman Entertainment?",
            answer:
                "From creating original content and building digital platforms to strategic communications and global distribution, our integrated capabilities help businesses, creators, governments, and brands grow through media and technology.",
        },
        {
            _key: "faq-2",
            question: "Is Abhijat Marathi part of Suman Entertainment?",
            answer:
                "Abhijat Marathi is presented across Suman Entertainment’s ecosystem as a Marathi-focused platform and content initiative.",
        },
        {
            _key: "faq-3",
            question: "How we work with govt?",
            answer:
                "Suman Entertainment supports institutional communication, content, media, technology and distribution initiatives through project-specific engagements.",
        },
        {
            _key: "faq-4",
            question: "How we work with govt?",
            answer:
                "Engagements can include strategy, production, digital execution, event experiences and communication support depending on the project scope.",
        },
        {
            _key: "faq-5",
            question: "How we work with govt?",
            answer:
                "Each engagement is structured around the institution’s requirements, approvals, delivery milestones and communication objectives.",
        },
    ],
};

export const REFERENCE_CAREERS_CTA: CmsCareersCta = {
    eyebrow: "CAREERS",
    heading: "Join us to start a New Chapter in Media and Entertainment",
    description: null,
    imageUrl: `${BASE}/careers-banner.jpg`,
    imageAlt: "Team collaborating in an office",
    cta: {
        label: "View Open Roles",
        href: "/careers",
        style: "text" as const,
    },
};
