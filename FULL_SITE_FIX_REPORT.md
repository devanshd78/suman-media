# Suman Media full-site UI fix pass

Date: 2026-09-14

## Main changes

- Header height and page-anchor offset are now consistently 64px.
- Header gutters match the landing page gutters: 20px mobile, 32px small/tablet, 56px desktop.
- `/`, `/news-and-blogs`, and `/abhijat-marathi` use the overlay header treatment; normal pages remain solid.
- Header Contact us and other primary action controls use the shared 4px action radius.
- Hero heading now has a controlled responsive max width and both hero CTAs use 4px radius.
- Landing/About/News navigation and major Careers/Contact/OTT action buttons use the same 4px action radius.
- Smooth-scroll/hash offset was updated from 88px to 64px to match the real header.

## Cannes gallery

- Local fallback is curated to landscape media only; portrait assets are not used in the two-row wall.
- Top track has 6 landscape items.
- Bottom track has 5 unique landscape items and repeats one item only at the end when a sixth item is needed for stable travel.
- Runtime aspect-ratio removal was removed so a row can no longer collapse from 5/6 cards down to 3 after media metadata loads.
- Top and bottom rows now calculate independent horizontal travel distances.
- Top row opens on the first real pair, then travels left through the row.
- Bottom row moves in the opposite direction.
- `cannes-red-carpet-interview.mp4` remains first and receives a visual crop that removes the baked-in side panels without modifying the source MP4.
- All gallery media fills its card with cover behavior.
- Repeated visual fillers are marked decorative for accessibility.

## Full-project integrity fixes

- Fixed Linux case-sensitive `/images/ott/Image2.png` references.
- Replaced three missing OTT artwork references with existing project assets so there are no broken local media URLs.
- Verified 155 local `/images`, `/videos`, `/cannes`, and `/documents` references: 0 missing.
- Verified 340 local TypeScript import references: 0 missing.

## Validation

- Parsed 165 TypeScript/TSX source files with TypeScript 5.8.3: 0 syntax diagnostics.
- Parsed all 12 CSS files with tinycss2: 0 CSS parser errors.
- Local asset audit: 155 references, 0 missing.
- Local import audit: 340 references, 0 missing.

## Build limitation

A production Next.js build could not run in this sandbox because the uploaded ZIP does not include `node_modules`. `npm run build` stops at `prisma generate` with `prisma: not found`, and the runtime cannot resolve the npm registry to install dependencies. No dependency versions were changed.

Run locally before deployment:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
```
