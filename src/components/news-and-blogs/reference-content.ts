import type { CmsCareersCta, CmsFaqSection } from "@/types/cms";
import type {
  InsightDetail,
  InsightListItem,
  PortableTextNode,
} from "@/types/news-and-blogs";

const DATE = "2026-08-07T10:00:00.000Z";
const DEFAULT_EXCERPT =
  "Suman Entertainment & Media Pvt. Ltd. brings together platforms, content, technology and experiences under one growing media ecosystem.";

const CANNES_IMAGE_POSITIONS: Record<string, [number, number]> = {
  "/cannes/cannes-red-carpet-group-01.jpg": [0.5, 0.46],
  "/cannes/cannes-red-carpet-group-02.jpg": [0.5, 0.43],
  "/cannes/cannes-red-carpet-blue-look-01.jpg": [0.64, 0.5],
  "/cannes/cannes-red-carpet-blue-look-02.jpg": [0.58, 0.5],
  "/cannes/cannes-pavilion-guests-01.jpg": [0.5, 0.34],
  "/cannes/cannes-pavilion-guests-02.jpg": [0.5, 0.34],
  "/cannes/cannes-riviera-portrait-01.jpg": [0.34, 0.46],
};

function item(
  id: string,
  title: string,
  slug: string,
  imageUrl: string,
  category: string,
  featured = false,
  excerpt = DEFAULT_EXCERPT,
): InsightListItem {
  const hotspot = CANNES_IMAGE_POSITIONS[imageUrl];

  return {
    _id: id,
    title,
    slug,
    excerpt,
    imageUrl,
    imageAlt: title,
    imageHotspotX: hotspot?.[0],
    imageHotspotY: hotspot?.[1],
    publishedAt: DATE,
    featured,
    authorName: "Suman Entertainment & Media Pvt. Ltd.",
    categories: [
      {
        title: category,
        slug: category.toLowerCase().replace(/\s+/g, "-"),
      },
    ],
  };
}

/*
 * Production-safe News & Blogs fallback.
 *
 * These cards intentionally reuse the exact Cannes media shipped in
 * /public/cannes. Sanity remains the source of truth: this data is shown only
 * when no valid CMS posts are available.
 */
export const REFERENCE_POSTS: InsightListItem[] = [
  item(
    "reference-hero",
    "Abhijat Marathi at Cannes 2026",
    "abhijat-marathi-at-cannes-2026",
    "/cannes/cannes-red-carpet-group-01.jpg",
    "New launches",
    true,
    "A look at Abhijat Marathi's Cannes 2026 presence, from the Bharat Pavilion to red-carpet moments celebrating Marathi culture on a global stage.",
  ),
  item(
    "reference-prajakta",
    "Prajakta Mali Cannes Moments 2026",
    "prajakta-mali-cannes-moments-2026",
    "/cannes/cannes-riviera-portrait-01.jpg",
    "Latest Articles",
    true,
    "Selected photographs from Cannes 2026 featuring Marathi culture, fashion and the international festival atmosphere.",
  ),
  item(
    "reference-feature-pavilion",
    "Inside the Bharat Pavilion at Cannes",
    "inside-bharat-pavilion-cannes-2026",
    "/cannes/cannes-pavilion-guests-01.jpg",
    "New launches",
    true,
    "Conversations, meetings and cultural exchange from the Bharat Pavilion during Cannes 2026.",
  ),
  item(
    "reference-feature-blue-look",
    "Marathi Culture on the Cannes Red Carpet",
    "marathi-culture-cannes-red-carpet",
    "/cannes/cannes-red-carpet-blue-look-01.jpg",
    "New launches",
    true,
    "A visual moment from the Cannes red carpet bringing regional identity and contemporary presentation together.",
  ),
  item(
    "reference-guests",
    "Cannes Red Carpet: Festival Guests",
    "cannes-red-carpet-festival-guests",
    "/cannes/cannes-red-carpet-group-02.jpg",
    "Articles",
  ),
  item(
    "reference-blue-look-two",
    "A Cannes Moment in Blue",
    "cannes-moment-in-blue",
    "/cannes/cannes-red-carpet-blue-look-02.jpg",
    "New launches",
  ),
  item(
    "reference-group-two",
    "India at Cannes: Red Carpet Moments",
    "india-at-cannes-red-carpet-moments",
    "/cannes/cannes-red-carpet-group-02.jpg",
    "Events",
  ),
  item(
    "reference-pavilion-two",
    "People and Conversations at Cannes 2026",
    "people-and-conversations-cannes-2026",
    "/cannes/cannes-pavilion-guests-02.jpg",
    "Events",
  ),
  item(
    "reference-riviera",
    "Cannes Riviera Portraits",
    "cannes-riviera-portraits",
    "/cannes/cannes-riviera-portrait-01.jpg",
    "New added",
  ),
  item(
    "reference-press-one",
    "Abhijat Marathi's Cannes 2026 Showcase",
    "abhijat-marathi-cannes-showcase-press",
    "/cannes/cannes-pavilion-guests-01.jpg",
    "Press",
  ),
  item(
    "reference-press-two",
    "Cannes 2026: Cultural Presence on the Red Carpet",
    "cannes-2026-cultural-presence-press",
    "/cannes/cannes-red-carpet-group-01.jpg",
    "Press",
  ),
  item(
    "reference-press-three",
    "Bharat Pavilion Conversations at Cannes",
    "bharat-pavilion-conversations-press",
    "/cannes/cannes-pavilion-guests-02.jpg",
    "Press",
  ),
  item(
    "reference-press-four",
    "Marathi Stories Meet a Global Audience",
    "marathi-stories-global-audience-press",
    "/cannes/cannes-red-carpet-blue-look-02.jpg",
    "Press",
  ),
  item(
    "reference-case-study",
    "Building a Global Moment for Regional Storytelling",
    "global-moment-regional-storytelling-case-study",
    "/cannes/cannes-riviera-portrait-01.jpg",
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

const image = (
  imageUrl: string,
  alt: string,
  caption?: string,
): PortableTextNode => ({
  _key: `reference-image-${++key}`,
  _type: "mediaImage",
  imageUrl,
  imageAlt: alt,
  caption,
});

const REFERENCE_BODY: PortableTextNode[] = [
  block(
    "Cannes 2026 created a global setting for Abhijat Marathi to introduce its vision, meet audiences and industry participants, and present Marathi culture through a contemporary media lens.",
  ),
  block("A Marathi Story on a Global Stage", "h2"),
  block(
    "The Cannes Film Festival brings together cinema, media, culture and international conversations. Abhijat Marathi's presence placed regional storytelling within that wider global context while keeping Marathi identity at the centre of the experience.",
  ),
  image(
    "/cannes/cannes-red-carpet-group-01.jpg",
    "Guests representing Indian culture on the Cannes red carpet",
    "Cannes 2026",
  ),
  block("Moments from the Bharat Pavilion", "h2"),
  block(
    "The Bharat Pavilion offered a space for conversations around Indian stories, creators, platforms and new opportunities for distribution. The photographs in this story capture meetings and moments from that shared environment.",
  ),
  image(
    "/cannes/cannes-pavilion-guests-01.jpg",
    "Guests meeting at the Bharat Pavilion during Cannes 2026",
    "Bharat Pavilion, Cannes 2026",
  ),
  block("Culture, Fashion and the Red Carpet", "h2"),
  block(
    "Beyond screenings and meetings, Cannes is also a visual platform. Traditional and contemporary Marathi presentation became part of that international festival setting through red-carpet appearances and portraits.",
  ),
  image(
    "/cannes/cannes-red-carpet-blue-look-01.jpg",
    "Traditional blue look on the Cannes red carpet",
    "Cannes red carpet, 2026",
  ),
  block("Why the Moment Matters", "h2"),
  block(
    "For Suman Entertainment & Media, the Cannes presence represents the broader opportunity to connect regional intellectual property, digital platforms, creators and audiences across markets. It is one step in taking culturally rooted stories to wider audiences.",
  ),
  block(
    "The Cannes Moments gallery on the homepage brings together the photographs and videos from this visit. Sanity can replace these local fallback assets whenever editors publish the final approved media and copy.",
  ),
];

const hero = REFERENCE_POSTS[0];

export const REFERENCE_ARTICLE: InsightDetail = {
  ...hero,
  _type: "post",
  _updatedAt: DATE,
  body: REFERENCE_BODY,
  imageCredit: "Cannes 2026",
  readingTimeMinutes: 4,
  author: {
    name: "Suman Entertainment & Media Pvt. Ltd.",
  },
  relatedPosts: [REFERENCE_POSTS[1], REFERENCE_POSTS[2], REFERENCE_POSTS[3]],
  previousPost: {
    title: REFERENCE_POSTS[8].title,
    slug: REFERENCE_POSTS[8].slug,
  },
  nextPost: {
    title: REFERENCE_POSTS[1].title,
    slug: REFERENCE_POSTS[1].slug,
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
    relatedPosts: REFERENCE_POSTS.filter((post) => post.slug !== fallback.slug).slice(0, 3),
    seo: {
      title: fallback.title,
      description: fallback.excerpt,
    },
  };
}

export const REFERENCE_FAQ: CmsFaqSection = {
  eyebrow: "FAQ",
  heading: "Questions people asked?",
  contactText: "Still have a query?",
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
        "Abhijat Marathi is presented across Suman Entertainment's ecosystem as a Marathi-focused platform and content initiative.",
    },
    {
      _key: "faq-3",
      question: "How does Suman Entertainment work with institutions?",
      answer:
        "Suman Entertainment supports institutional communication, content, media, technology and distribution initiatives through project-specific engagements.",
    },
  ],
};

export const REFERENCE_CAREERS_CTA: CmsCareersCta = {
  eyebrow: "CAREERS",
  heading: "Join us to start a New Chapter in Media and Entertainment",
  description: null,
  imageUrl: "/images/careers/slideimg3.jpg",
  imageAlt: "Media and entertainment team at work",
  cta: {
    label: "View Open Roles",
    href: "/careers",
    style: "text" as const,
  },
};
