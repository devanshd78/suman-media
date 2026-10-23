# FAST Channel - scroll filmstrip implementation

## What was added

- New `/products/fast-channel` page.
- Full-bleed black hero using the supplied FAST Channel reference copy.
- Slower staggered word reveal on the hero heading.
- Section 2 is a sticky `100svh` stage.
- Nine channel cards from the supplied Card List PDF.
- Desktop mouse-wheel / trackpad and mobile swipe both use native page scrolling.
- The active channel frame moves through a vertical filmstrip with previous/next frame peeks, reversible movement and image parallax.
- Card copy reveals in a separate stagger after a frame becomes active.
- Reduced-motion users receive a normal static card list.
- Exact reference imagery was extracted from the supplied PDFs and optimized to WebP.
- Latest Announcements and final Partner CTA were rebuilt from the supplied FAST Channel reference.
- Existing site gutters are retained: 20px mobile, 32px small/tablet and 56px desktop.
- `/products/fast-channel` now uses the website's overlay header so the first black section matches the rest of the full-bleed visual pages.
- Header Fast Channel navigation now points to the real page.
- Sitemap includes `/products/fast-channel`.

## Scroll implementation choice

The reference Siena Film Foundation experience is a scroll-driven vertical filmstrip. This implementation intentionally does not intercept `wheel` or `touchmove`. The document's normal vertical scroll drives a sticky viewport and MotionValues instead. This gives the same up/down and swipe reversibility while avoiding the scroll-lock problems that were previously fixed elsewhere in the site.

## Main files

- `src/app/(website)/products/fast-channel/page.tsx`
- `src/components/products/fast-channel/fast-channel-page.tsx`
- `src/components/products/fast-channel/fast-channel-page.module.css`
- `src/components/landing/header.tsx`
- `src/app/sitemap.ts`
- `public/images/fast-channel/*`

## Validation performed

- Parsed all 170 TypeScript / TSX source files with the TypeScript compiler API: 0 syntax errors.
- Checked every CSS module class referenced by the new component: all are defined.
- Checked CSS brace balance: valid.
- Checked all nine channel banner assets: present.
- Optimized FAST Channel assets total roughly 2.8 MB.

A full `npm run check` was not completed in the artifact environment because `npm ci` exceeded the available execution window. Run locally:

```bash
npm ci
npm run check
npm run dev
```
