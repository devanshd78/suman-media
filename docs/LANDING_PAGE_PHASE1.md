# Landing Page Phase 1 — CMS, smooth scroll and technical SEO

This phase keeps the current Suman Media visual direction but changes the homepage architecture so that editorial content and visual assets are controlled from Sanity instead of being embedded inside React components.

## Rendering strategy

- `/` uses **ISR** with a one-hour fallback revalidation window (`export const revalidate = 3600`).
- Sanity's signed webhook should continue to revalidate `/` immediately after a publish, so the one-hour window is a safety net rather than the normal publishing delay.
- Homepage metadata is generated server-side from `homePage.seo`, with `siteSettings` as the CMS fallback.
- Organization, WebSite and visible FAQ structured data are rendered in the initial HTML; Organization/WebSite values use `siteSettings` where available.
- Interactive parts (hero controls, service fly-through, achievement reveal and industry scroller) hydrate as client islands; the surrounding landing content remains server-rendered.

## Smooth scrolling and section transitions

- `SmoothScrollProvider` is mounted in `src/app/(website)/layout.tsx`, so all public website pages receive Lenis smooth scrolling.
- `prefers-reduced-motion` disables the enhanced scrolling and animated transitions.
- Landing sections use `.landing-section-transition` from `globals.css`; one lightweight `IntersectionObserver` progressively reveals each section as it enters the viewport.
- The transition does not hide server-rendered content, so crawlers, no-JS users and accessibility tools still receive the page normally.
- Do not add mandatory scroll snapping to the homepage: it conflicts with the long sticky Services gallery and makes normal wheel/touch navigation feel constrained.

## Homepage section order

1. Hero
2. About
3. Clients
4. Services
5. Government / achievement
6. Industries
7. Why partner + Cannes/event moment
8. Verified statistics
9. Testimonial + Join Abhijat banner
10. Media coverage
11. Founder letter
12. Latest announcements / insights
13. FAQ
14. Careers CTA
15. Global footer

`Featured Projects` is no longer mounted on the homepage in this phase because it is not part of the supplied landing-page reference. The component remains available for the Portfolio area.

## Sanity image checklist

Populate these before production launch. Every meaningful image should have descriptive alt text in the `mediaImage` field; mark truly decorative images as decorative.

| CMS location | Image needed | Suggested working ratio | Notes |
| --- | --- | --- | --- |
| Home Page -> Hero slides | Desktop hero | 16:9 or wider | 3–5 slides; upload the final approved Figma exports. |
| Home Page -> Hero slides | Mobile hero | 4:5 / 9:16 | Optional but recommended when desktop crop does not work on mobile. |
| Company / Platform documents | Company logo | SVG/PNG, transparent | Used by the Clients bubble section. Do not recreate brand marks in React/SVG. |
| Service documents | Featured image | ~4:5 / 3:4 | One approved image per featured service. |
| Home Page -> Government / achievement | Background image | 16:9 / wide | Replace the local development fallback before production. |
| Industry documents | Featured image / artwork | 4:5 | Upload the exact industry artwork from the design instead of drawing it in JSX. |
| Home Page -> Why partner + Cannes | Event image | 16:9 / wide | Cannes or other approved event photograph. |
| Home Page -> Why partner + Cannes | Event badge | SVG/PNG transparent | Festival/event mark. |
| Home Page -> Testimonial | Company logo | SVG/PNG transparent | Only use after quote/brand approval. |
| Home Page -> Testimonial | Partner logos | SVG/PNG transparent | Approved partner/client marks only. |
| Home Page -> Join Abhijat banner | Background image | 16:9 / wide | Final campaign/brand visual. |
| Home Page -> Join Abhijat banner | Badge | SVG/PNG transparent | Optional festival/platform badge. |
| Home Page -> Media coverage | Card image | 16:10 | Publication artwork/screenshot with permission. |
| Home Page -> Founder letter | Background/founder image | 16:9 / portrait-compatible | Optional; section still works without it. |
| Insight documents | Featured image | 16:10 | Used by homepage Latest Announcements cards. |
| Home Page -> Careers CTA | Background image | 16:9 / wide | Final team/culture image. |
| Home Page -> SEO | Social sharing image | 1.91:1 | Recommended 1200x630 Open Graph image. |

## Important CMS rules

- Statistics are intentionally **not** given `000+`, `00mn`, or similar production fallbacks. Add only verified numbers in Sanity.
- Services, industries, clients, media coverage and insights disappear when no valid CMS items are selected; this prevents invented content from being published.
- The current hero and achievement local assets are development safety fallbacks only. Production should be fully populated in Sanity.
- Keep one semantic `h1` in the hero; section headings use `h2`/`h3`.
- Do not publish testimonial/client logos unless Suman Media is allowed to make the association publicly.

## Sanity fields added to Home Page

The Home Page singleton now includes CMS controls for:

- hero slides
- About copy + CTA
- Clients labels + featured company references
- Services labels + featured service references
- Government/achievement content + image
- Industries copy + featured industry references
- Why Partner benefits + Cannes/event image/badge/CTA
- verified statistics
- testimonial/company/partner logos
- Join Abhijat banner
- media coverage
- founder letter
- FAQs
- Careers CTA
- featured insights
- SEO

After pulling this code, run:

```bash
npm install
npm run sanity:typegen
npm run check
```

The project uses Next.js 16, so keep implementation changes aligned with the installed Next.js 16 documentation and deprecation notices.

## Files changed in this phase

- `src/app/(website)/page.tsx`
- `src/app/(website)/layout.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/layout/smooth-scroll-provider.tsx`
- `src/components/landing/landing-page.tsx`
- `src/components/landing/hero-section.tsx`
- `src/components/landing/about-section.tsx`
- `src/components/landing/client-section.tsx`
- `src/components/landing/clients-bubbles.tsx`
- `src/components/landing/services-section.tsx`
- `src/components/landing/services-scroll-gallery.tsx`
- `src/components/landing/achievement-reveal-grid.tsx`
- `src/components/landing/industries-section.tsx`
- `src/components/landing/partner-section.tsx`
- `src/components/landing/stats-section.tsx`
- `src/components/landing/testimonial-section.tsx`
- `src/components/landing/insights-section.tsx`
- `src/components/landing/media-coverage-section.tsx` (new)
- `src/components/landing/founder-letter-section.tsx` (new)
- `src/components/landing/faq-section.tsx` (new)
- `src/components/landing/careers-cta-section.tsx` (new)
- `src/types/cms.ts`
- `src/sanity/schemaTypes/documents/home-page.ts`
- `src/sanity/queries/content.ts`
- `src/sanity/lib/data.ts`
- `src/lib/seo/structured-data.ts`
- `docs/LANDING_PAGE_PHASE1.md` (new)
