import { defineArrayMember, defineField, defineType } from "sanity";

const imageField = (name: string, title: string, required = false) =>
  defineField({
    name,
    title,
    type: "mediaImage",
    validation: required ? (rule) => rule.required() : undefined,
  });

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "content", title: "Page sections" },
    { name: "featured", title: "Featured content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "heroSlides",
      title: "Legacy hero slides",
      type: "array",
      group: "hero",
      hidden: true,
      description: "Legacy carousel content retained for migration safety.",
      of: [
        defineArrayMember({
          name: "heroSlide",
          title: "Hero slide",
          type: "object",
          fields: [
            defineField({
              name: "internalName",
              title: "Internal name",
              type: "string",
              description: "Only used inside Sanity Studio to identify the slide.",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "eyebrow",
              title: "Category / eyebrow",
              type: "string",
              description: "The slide number is added by the frontend.",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              validation: (rule) => rule.required().max(120),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required().max(360),
            }),
            imageField("image", "Desktop image", true),
            imageField("mobileImage", "Mobile image"),
            imageField("badge", "Platform / product badge"),
            imageField("qrCode", "Download QR code"),
            defineField({
              name: "downloadTitle",
              title: "Download card title",
              type: "string",
              description: "Example: Abhijat Marathi OTT.",
              validation: (rule) => rule.max(80),
            }),
            defineField({
              name: "downloadCaption",
              title: "Download card caption",
              type: "string",
              description: "Example: SCAN TO DOWNLOAD.",
              validation: (rule) => rule.max(80),
            }),
            defineField({
              name: "downloadHref",
              title: "Download card link",
              type: "string",
              description: "Optional internal path or https:// URL opened when the QR card is selected.",
              validation: (rule) => rule.max(500),
            }),
            defineField({
              name: "cta",
              title: "Button",
              type: "cta",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "enabled",
              title: "Enabled",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: "internalName",
              subtitle: "heading",
              media: "image",
              enabled: "enabled",
            },
            prepare: ({ title, subtitle, media, enabled }) => ({
              title: title || "Hero slide",
              subtitle: `${enabled === false ? "Disabled · " : ""}${subtitle || ""}`,
              media,
            }),
          },
        }),
      ],
      validation: (rule) => rule.max(5),
    }),

    defineField({
      name: "heroVideo",
      title: "Hero video",
      type: "file",
      group: "hero",
      description:
        "Optional MP4 background video. If empty, /public/videos/MediaVedio.mp4 is used without re-encoding.",
      options: { accept: "video/mp4" },
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero eyebrow",
      type: "string",
      group: "hero",
      initialValue: "DIGITAL ENTERTAINMENT & PLATFORM",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "heroHeading",
      title: "Hero heading",
      type: "string",
      group: "hero",
      initialValue: "Abhijat Marathi OTT",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "heroDescription",
      title: "Hero description",
      type: "text",
      rows: 4,
      group: "hero",
      initialValue:
        "A dedicated Marathi OTT platform bringing regional stories, films and content to audiences worldwide.",
      validation: (rule) => rule.max(360),
    }),
    defineField({
      name: "heroLearnMoreCta",
      title: "Learn more button",
      type: "cta",
      group: "hero",
      initialValue: {
        label: "Learn more",
        href: "/companies/abhijat-marathi",
        style: "primary",
      },
    }),
    defineField({
      name: "heroJoinNowCta",
      title: "Join now button",
      type: "cta",
      group: "hero",
      initialValue: { label: "Join now", href: "/contact", style: "text" },
    }),

    // Kept hidden so existing content is not destroyed during migration.
    defineField({ name: "heroImage", title: "Hero image", type: "mediaImage", group: "hero", hidden: true }),
    defineField({ name: "heroCtas", title: "Hero calls to action", type: "array", group: "hero", hidden: true, of: [defineArrayMember({ type: "cta" })] }),

    defineField({ name: "aboutEyebrow", title: "About eyebrow", type: "string", group: "content", initialValue: "ABOUT SUMAN ENTERTAINMENT", validation: (rule) => rule.max(80) }),
    defineField({ name: "aboutHeading", title: "About heading", type: "string", group: "content", initialValue: "We're a team of creatives, music lovers and audio obsessives, developing products building India's Next Generation Media Ecosystem", validation: (rule) => rule.max(180) }),
    defineField({ name: "aboutDescription", title: "About description", type: "text", rows: 6, group: "content", initialValue: "Suman Entertainment & Media Pvt. Ltd. brings together digital platforms, premium content, music, technology, strategic communications, and enterprise partnerships to create, distribute, and scale media experiences across industries. From one of India's dedicated Marathi OTT platforms to government communication initiatives, original content production, music publishing, AI-powered technologies, and global partnerships, we're building an integrated ecosystem designed for the future of media.", validation: (rule) => rule.max(900) }),
    defineField({ name: "aboutCta", title: "About call to action", type: "cta", group: "content", initialValue: { label: "Explore Capabilities", href: "/services", style: "text" } }),

    defineField({ name: "clientsEyebrow", title: "Clients eyebrow", type: "string", group: "content", initialValue: "OUR SERVICES", validation: (rule) => rule.max(80) }),
    defineField({ name: "clientsHeading", title: "Clients heading", type: "string", group: "content", initialValue: "Our Clients", validation: (rule) => rule.max(100) }),

    defineField({ name: "servicesEyebrow", title: "Services eyebrow", type: "string", group: "content", initialValue: "Our Services", validation: (rule) => rule.max(80) }),
    defineField({ name: "servicesHeading", title: "Services heading", type: "string", group: "content", initialValue: "What we really do?", validation: (rule) => rule.max(120) }),

    // ============================================================
    // GOVERNMENT EMPANELMENT / ACHIEVEMENT
    // ============================================================

    defineField({
      name: "achievementEyebrow",
      title: "Achievement eyebrow",
      type: "string",
      group: "content",
      initialValue: "ACHIEVEMENT",
      validation: (rule) => rule.max(80),
    }),

    defineField({
      name: "achievementHeading",
      title: "Achievement heading",
      type: "string",
      group: "content",
      initialValue:
        "Empanelled with the Government of Maharashtra for initiatives promoting Marathi language, culture and heritage.",
      validation: (rule) => rule.max(240),
    }),

    defineField({
      name: "achievementDescription",
      title: "Achievement description",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "Optional supporting copy. Leave empty if the heading already communicates the full achievement.",
      validation: (rule) => rule.max(500),
    }),

    defineField({
      name: "achievementDepartmentEmblem",
      title: "Marathi Language Department Emblem",
      type: "mediaImage",
      group: "content",
      description:
        "Official Marathi Language Department emblem shown on the upper-left side of the Government empanelment section.",
    }),

    defineField({
      name: "achievementGovernmentSeal",
      title: "Government of Maharashtra Seal",
      type: "mediaImage",
      group: "content",
      description:
        "Official Government of Maharashtra seal displayed in the upper-right corner of the achievement section.",
    }),

    defineField({
      name: "achievementBottomArtwork",
      title: "Bottom Marathi Cultural Artwork",
      type: "mediaImage",
      group: "content",
      description:
        "Wide decorative Marathi cultural artwork displayed along the bottom edge of the achievement section. Mark this image as decorative.",
    }),

    defineField({
      name: "achievementCta",
      title: "Achievement call to action",
      type: "cta",
      group: "content",
      initialValue: {
        label: "View more",
        href: "/about",
        style: "text",
      },
    }),

    defineField({ name: "industriesEyebrow", title: "Industries eyebrow", type: "string", group: "content", initialValue: "INDUSTRIES WE WORK WITH", validation: (rule) => rule.max(80) }),
    defineField({ name: "industriesHeading", title: "Industries heading", type: "string", group: "content", initialValue: "The Industries we work with?", validation: (rule) => rule.max(120) }),
    defineField({ name: "industriesDescription", title: "Industries description", type: "text", rows: 4, group: "content", initialValue: "From creating original content and building digital platforms to strategic communications and global distribution, our integrated capabilities help businesses, creators, governments, and brands grow through media and technology.", validation: (rule) => rule.max(500) }),
    defineField({ name: "industriesCta", title: "Industries button", type: "cta", group: "content", initialValue: { label: "Explore Capabilities", href: "/services", style: "text" } }),

    // Legacy storage keys are intentionally retained so existing Sanity documents
    // do not need a destructive migration. The GROQ query exposes them to the
    // frontend as newsBlogsEyebrow / newsBlogsHeading / newsBlogsCta.
    defineField({ name: "insightsEyebrow", title: "News & Blogs eyebrow", type: "string", group: "content", initialValue: "LATEST ANNOUNCEMENTS", validation: (rule) => rule.max(80) }),
    defineField({ name: "insightsHeading", title: "News & Blogs heading", type: "string", group: "content", initialValue: "News & Blogs", validation: (rule) => rule.max(120) }),
    defineField({ name: "insightsCta", title: "News & Blogs button", type: "cta", group: "content", initialValue: { label: "View all", href: "/news-and-blogs", style: "text" } }),

    defineField({
      name: "partnerSection",
      title: "Why partner section",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string", initialValue: "Why Partner With us?", validation: (rule) => rule.max(120) }),
        defineField({ name: "description", title: "Description", type: "text", rows: 4, initialValue: "From creating original content and building digital platforms to strategic communications and global distribution, our integrated capabilities help businesses, creators, governments, and brands grow through media and technology.", validation: (rule) => rule.max(500) }),
        defineField({ name: "cta", title: "Partner contact button", type: "cta", initialValue: { label: "Contact us", href: "/contact", style: "primary" } }),
        defineField({
          name: "benefits",
          title: "Partner benefits",
          type: "array",
          initialValue: [
            { _key: "future-ready-media-infrastructure", title: "Future-ready Media Infrastructure" },
            { _key: "technology-led-innovation", title: "Technology-led Innovation" },
            { _key: "integrated-ecosystem", title: "Integrated Ecosystem" },
            { _key: "scalable-partnerships", title: "Scalable Partnerships" },
            { _key: "enterprise-delivery", title: "Enterprise Delivery" },
          ],
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required().max(100) }),
                defineField({ name: "href", title: "Link", type: "string", description: "Use /path or https:// URL." }),
              ],
            }),
          ],
          validation: (rule) => rule.max(8),
        }),
        defineField({ name: "eventHeading", title: "Legacy Cannes heading", type: "string", hidden: true, initialValue: "Abhijat Marathi made its Global Alpha Launch at the Cannes Film Festival 2026, at the Bharat (India) Pavilion.", validation: (rule) => rule.max(220) }),
        defineField({ name: "eventImage", title: "Legacy Cannes image", type: "mediaImage", hidden: true }),
        defineField({ name: "eventBadge", title: "Legacy Cannes badge / logo", type: "mediaImage", hidden: true }),
        defineField({ name: "eventCta", title: "Legacy Cannes button", type: "cta", hidden: true, initialValue: { label: "Explore Cannes Moments", href: "#cannes-gallery", style: "text" } }),
      ],
    }),

    defineField({
      name: "cannesSection",
      title: "Cannes Moments",
      type: "object",
      group: "content",
      description:
        "Homepage Cannes photo/video section. If this media list is empty, the website automatically uses the files in /public/cannes.",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue:
            "Abhijat Marathi made its Global Alpha Launch at the Cannes Film Festival 2026, at the Bharat (India) Pavilion.",
          validation: (rule) => rule.max(220),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
          initialValue:
            "Explore photographs and video moments from Abhijat Marathi's Cannes 2026 presence at the Bharat (India) Pavilion.",
          validation: (rule) => rule.max(500),
        }),
        defineField({
          name: "cta",
          title: "Button",
          type: "cta",
          initialValue: {
            label: "Explore Cannes Moments",
            href: "#cannes-gallery",
            style: "text",
          },
        }),
        defineField({
          name: "media",
          title: "Cannes photos & videos",
          type: "array",
          description:
            "Add and order photos/videos here. When at least one valid item exists, Sanity media replaces the local /public/cannes fallback gallery.",
          of: [
            defineArrayMember({
              name: "cannesMediaItem",
              title: "Cannes media item",
              type: "object",
              fields: [
                defineField({
                  name: "mediaType",
                  title: "Media type",
                  type: "string",
                  initialValue: "image",
                  options: {
                    layout: "radio",
                    list: [
                      { title: "Photo", value: "image" },
                      { title: "Video", value: "video" },
                    ],
                  },
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "image",
                  title: "Photo",
                  type: "mediaImage",
                  description: "Used when Media type is Photo.",
                  hidden: ({ parent }) => parent?.mediaType === "video",
                }),
                defineField({
                  name: "video",
                  title: "Video",
                  type: "file",
                  description:
                    "Used when Media type is Video. MP4 is recommended for reliable muted autoplay.",
                  options: { accept: "video/mp4,video/webm" },
                  hidden: ({ parent }) => parent?.mediaType !== "video",
                }),
                defineField({
                  name: "videoLabel",
                  title: "Video accessibility label",
                  type: "string",
                  description:
                    "Short description of the video for accessibility. Example: Cannes red carpet interview.",
                  validation: (rule) => rule.max(160),
                  hidden: ({ parent }) => parent?.mediaType !== "video",
                }),
                defineField({
                  name: "poster",
                  title: "Video poster image",
                  type: "mediaImage",
                  description: "Optional preview shown while the video loads.",
                  hidden: ({ parent }) => parent?.mediaType !== "video",
                }),
                defineField({
                  name: "caption",
                  title: "Internal caption / fallback label",
                  type: "string",
                  validation: (rule) => rule.max(180),
                }),
                defineField({
                  name: "objectPosition",
                  title: "Crop position",
                  type: "string",
                  description:
                    "Optional CSS object-position, for example: center, center 30%, 60% center. For photos, the Sanity hotspot is used automatically when this is empty.",
                  validation: (rule) => rule.max(40),
                }),
                defineField({
                  name: "objectFit",
                  title: "Media fit",
                  type: "string",
                  description:
                    "Contain is the safe default so faces, full outfits and portrait video are not cropped. Choose Cover only when edge-to-edge framing is preferred.",
                  initialValue: "contain",
                  options: {
                    layout: "radio",
                    list: [
                      { title: "Cover the card", value: "cover" },
                      { title: "Show the full photo/video", value: "contain" },
                    ],
                  },
                }),
                defineField({
                  name: "enabled",
                  title: "Show on website",
                  type: "boolean",
                  initialValue: true,
                }),
              ],
              validation: (rule) =>
                rule.custom((value) => {
                  const item = value as
                    | {
                      mediaType?: "image" | "video";
                      image?: { asset?: unknown };
                      video?: { asset?: unknown };
                      videoLabel?: string;
                    }
                    | undefined;

                  if (!item) return true;

                  if (item.mediaType === "video") {
                    if (!item.video?.asset) return "Upload a video for this item.";
                    if (!item.videoLabel?.trim()) {
                      return "Add a short accessibility label for this video.";
                    }
                    return true;
                  }

                  if (!item.image?.asset) return "Upload a photo for this item.";
                  return true;
                }),
              preview: {
                select: {
                  mediaType: "mediaType",
                  caption: "caption",
                  videoLabel: "videoLabel",
                  image: "image",
                  poster: "poster",
                },
                prepare: ({ mediaType, caption, videoLabel, image, poster }) => ({
                  title:
                    caption ||
                    videoLabel ||
                    (mediaType === "video" ? "Cannes video" : "Cannes photo"),
                  subtitle: mediaType === "video" ? "Video" : "Photo",
                  media: mediaType === "video" ? poster : image,
                }),
              },
            }),
          ],
          validation: (rule) => rule.max(18),
        }),
      ],
    }),

    defineField({
      name: "stats",
      title: "Verified statistics",
      type: "array",
      group: "content",
      description: "Only publish figures that the company can verify.",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", title: "Value", type: "number", validation: (rule) => rule.required().min(0) }),
            defineField({ name: "prefix", title: "Prefix", type: "string", validation: (rule) => rule.max(10) }),
            defineField({ name: "suffix", title: "Suffix", type: "string", validation: (rule) => rule.max(10) }),
            defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required().max(80) }),
          ],
          preview: {
            select: { title: "label", value: "value", prefix: "prefix", suffix: "suffix" },
            prepare: ({ title, value, prefix, suffix }) => ({ title, subtitle: `${prefix ?? ""}${value ?? ""}${suffix ?? ""}` }),
          },
        }),
      ],
      validation: (rule) => rule.max(6),
    }),

    defineField({
      name: "testimonialSection",
      title: "Testimonial section",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "quote",
          title: "Quote",
          type: "text",
          rows: 5,
          initialValue: "From creating original content and building digital platforms to strategic communications and global distribution, our integrated capabilities help businesses, creators, governments, and brands grow through media and technology.",
          description: "Matches the Main PDF reference. Confirm testimonial/attribution approval before production publishing.",
          validation: (rule) => rule.max(700),
        }),
        defineField({ name: "personName", title: "Person name", type: "string", validation: (rule) => rule.max(100) }),
        defineField({ name: "personRole", title: "Person role", type: "string", initialValue: "Founder and CEO", validation: (rule) => rule.max(140) }),
        defineField({ name: "companyName", title: "Company name", type: "string", initialValue: "Automation Anywhere", validation: (rule) => rule.max(100) }),
        imageField("companyLogo", "Company logo"),
        defineField({
          name: "partnerLogos",
          title: "Partner / client logos",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required().max(100) }),
                imageField("image", "Logo image", true),
              ],
            }),
          ],
          validation: (rule) => rule.max(10),
        }),
      ],
    }),

    defineField({
      name: "storyBanner",
      title: "Join Abhijat Marathi banner",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "JOIN ABHIJAT MARATHI", validation: (rule) => rule.max(80) }),
        defineField({ name: "heading", title: "Heading", type: "string", initialValue: "Have a story worth telling? Let's bring it to the world.", validation: (rule) => rule.max(180) }),
        imageField("image", "Background image"),
        imageField("badge", "Badge / logo image"),
        defineField({ name: "cta", title: "Button", type: "cta", initialValue: { label: "Join as Partner", href: "/contact", style: "text" } }),
      ],
    }),

    defineField({
      name: "mediaCoverage",
      title: "Media coverage",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "Media Coverage", validation: (rule) => rule.max(80) }),
        defineField({ name: "heading", title: "Heading", type: "string", initialValue: "Featured media", validation: (rule) => rule.max(120) }),
        defineField({
          name: "items",
          title: "Media items",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required().max(160) }),
                defineField({ name: "source", title: "Publication / source", type: "string", validation: (rule) => rule.max(100) }),
                defineField({ name: "href", title: "Article URL", type: "url", validation: (rule) => rule.uri({ scheme: ["https"] }) }),
                imageField(
                  "image",
                  "Publication logo",
                ),
              ],
            }),
          ],
          validation: (rule) => rule.max(12),
        }),
      ],
    }),

    defineField({
      name: "founderLetter",
      title: "Founder letter",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "A Letter", validation: (rule) => rule.max(100) }),
        defineField({ name: "heading", title: "Heading", type: "string", initialValue: "from the founder", validation: (rule) => rule.max(160) }),
        defineField({ name: "body", title: "Letter body", type: "text", rows: 14, description: "Separate paragraphs with a blank line.", initialValue: "We believe the stories, music, culture and talent of Maharashtra, India (Bharat) deserve a global audience.\n\nWith Abhijat Marathi, we are building more than a regional OTT platform we are creating a home for Marathi storytelling and taking it beyond geographical boundaries. Our ambition is to make Marathi content discoverable, accessible and celebrated by audiences across India and around the world.\n\nBut our vision goes beyond streaming. We are building an integrated media ecosystem that brings together content production, music, technology, intellectual property and digital distribution. As part of this journey, we are working towards expanding our production capabilities, with our next phase of production initiatives planned for 2027.\n\nWe want to create original stories, build enduring intellectual properties and give regional creators the platforms and opportunities to reach a much larger world.\n\nFrom Bharat to the world that is the journey we are building.\n\nWarmly", validation: (rule) => rule.max(6000) }),
        defineField({ name: "founderName", title: "Founder name", type: "string", initialValue: "Kedar Joshi", validation: (rule) => rule.max(100) }),
        defineField({ name: "founderRole", title: "Founder role", type: "string", initialValue: "Founder and CEO", validation: (rule) => rule.max(120) }),
        imageField("image", "Founder / section image"),
        imageField("signature", "Founder signature image"),
      ],
    }),

    defineField({
      name: "faqSection",
      title: "FAQ section",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "FAQ", validation: (rule) => rule.max(80) }),
        defineField({ name: "heading", title: "Heading", type: "string", initialValue: "Questions people asked?", validation: (rule) => rule.max(120) }),
        defineField({ name: "contactText", title: "Contact helper text", type: "string", initialValue: "still have a quarry?", description: "Matches the approved Main PDF. Change here if you want to correct the source wording.", validation: (rule) => rule.max(140) }),
        defineField({ name: "contactEmail", title: "Contact email", type: "string", initialValue: "Contact@sumanentertainment.com", validation: (rule) => rule.email() }),
        defineField({
          name: "items",
          title: "FAQs",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "question", title: "Question", type: "string", validation: (rule) => rule.required().max(180) }),
                defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (rule) => rule.required().max(1200) }),
              ],
            }),
          ],
          validation: (rule) => rule.max(12),
        }),
      ],
    }),

    defineField({
      name: "careersCta",
      title: "Careers CTA",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "CARRERS", description: "Matches the Main PDF spelling. Edit to CAREERS in Sanity if you want the corrected spelling.", validation: (rule) => rule.max(80) }),
        defineField({ name: "heading", title: "Heading", type: "string", initialValue: "Join us to start a New Chapter in Media and Entertainment", validation: (rule) => rule.max(180) }),
        defineField({ name: "description", title: "Description", type: "text", rows: 4, validation: (rule) => rule.max(500) }),
        imageField("image", "Background image"),
        defineField({ name: "cta", title: "Button", type: "cta", initialValue: { label: "View Open Roles", href: "/careers", style: "text" } }),
      ],
    }),

    defineField({ name: "featuredCompanies", title: "Featured companies / client logos", type: "array", group: "featured", description: "Optional manual selection and order for the homepage. If left empty, published Company / Platform documents marked Featured company are used automatically. A logo is required to render a client bubble.", of: [defineArrayMember({ type: "reference", to: [{ type: "company" }] })], validation: (rule) => rule.unique().max(8) }),
    defineField({ name: "featuredServices", title: "Featured services", type: "array", group: "featured", description: "Optional manual selection and order. If empty, published Service documents marked Featured service are used automatically.", of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })], validation: (rule) => rule.unique().max(8) }),
    defineField({ name: "featuredIndustries", title: "Featured industries", type: "array", group: "featured", description: "Optional manual selection and order. If empty, published Industry documents marked Featured industry are used automatically.", of: [defineArrayMember({ type: "reference", to: [{ type: "industry" }] })], validation: (rule) => rule.unique().max(12) }),
    defineField({ name: "featuredProjects", title: "Featured projects", type: "array", group: "featured", description: "Optional manual selection and order. If empty, published Project documents marked Featured project are used automatically.", of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })], validation: (rule) => rule.unique().max(8) }),
    defineField({ name: "featuredInsights", title: "Featured News & Blog articles", type: "array", group: "featured", description: "Optional manual selection and order. If empty, published News & Blog articles marked Featured article are used automatically.", of: [defineArrayMember({ type: "reference", to: [{ type: "post" }] })], validation: (rule) => rule.unique().max(6) }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page", subtitle: "Homepage content, media and featured items" }),
  },
});
