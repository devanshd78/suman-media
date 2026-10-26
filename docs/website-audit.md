# Website audit and implementation

## Route registry

`src/config/website-pages.json` owns canonical page paths and aliases. Header/footer menus use `src/config/navigation.ts`; locale handling and the sitemap share the registry. Old paths remain permanent redirects and preserve the requested language.

| Previous paths | Canonical path |
| --- | --- |
| `/become-a-partner` | `/partners` |
| `/case-studies` | `/portfolio` |
| `/insights` | `/news-and-blogs` |
| `/abhijat-marathi`, `/companies/abhijat-marathi` | `/products/ott-digital-platforms-streaming` |
| `/monetization`, `/products/monetization` | `/products/content-monetization` |
| `/ai-capibilities` | `/products/ai-emerging-technology` |
| `/products/publication-knowledge-platforms` | `/products/publications-knowledge-platforms` |
| `/media` | `/services/media-content-syndication` |
| `/music-audio` | `/services/music-audio-experiences` |
| `/event-experience` | `/services/live-experiences-events` |
| `/degital-media-networks`, `/services/technology-digital-transformation` | `/services/digital-media-networks` |
| `/creator-ecosystem` | `/services/talent-creator-ecosystem` |
| `/capital-market`, `/capitalmarket` | `/solutions/capital-markets-investor-communications` |
| `/business` | `/solutions/international-business-partnerships` |
| `/content-acquisition-and-distribution`, `/contentAcquisition&distribution` | `/solutions/content-acquisition-distribution` |

## Shared pre-footer banner

Use `PreFooterBanner` from `src/components/shared/pre-footer-banner.tsx`. Optional `content` overrides preserve page-specific copy and images; do not create another banner implementation.

| Type | Purpose |
| --- | --- |
| 1 | Careers |
| 2 | Partnership with brand badge |
| 3 | Partnership without badge |
| 4 | Content licensing |
| 5 | Institutional / market communications |
| 6 | Content monetization |

## Motion and localization

The shared text entrance observer uses the homepage animation classes. Custom motion, carousels and sticky sections opt out with `data-motion-managed`. Reduced-motion preferences are respected. About Us retains its draggable/slideshow timeline without pause/play or previous/next controls.

English and Marathi dictionaries include loading quotes, historical headings, loading status, accessible labels and the progress counter. Navigation retains the same page, query and hash when changing language. Marathi remains the default.

## Repeatable checks

```sh
node scripts/check-localization.mjs
node scripts/check-media-assets.mjs
node scripts/check-website-routes.mjs
python scripts/audit-website.py http://localhost:3008
python scripts/audit-localization.py http://localhost:3008
npx tsc --noEmit
npm run build
```

The HTTP audits cover rendered HTML, internal links, fragment destinations, canonical URLs, locale attributes and public Marathi text; they do not substitute for browser animation or responsive testing.

## Content limitations

Financial statements and legal documents have no implemented destination/content in this project. Their footer entries are marked Soon instead of sending users to unrelated pages. CMS content and social destinations are preserved. External video links open the existing channel or channel search; they do not imply an implemented subscription or checkout service.

## Media and About Us

Duplicate files are consolidated at their canonical public URLs with legacy asset redirects. Repeated carousel slides used for continuous loops intentionally reference the same file; they are not duplicate assets. About Us uses the supplied PDF images and timeline layout, with the sticky global-reach sequence, draggable timeline, notable-personality gallery and awards slideshow preserved.

## Verification limits

The production build and type checks pass. Targeted lint passes for the new loader, shared reveal, navigation configuration, and corrected internal links. The full source lint run still reports 10 existing React-hook errors and 22 warnings; see `reports/eslint-audit.json`.

Desktop and mobile About Us timeline checks were performed earlier in this task. The final in-app browser session could not attach a working preview, so a final whole-site visual/responsive and interaction pass is not claimed. Form submissions were not sent to live endpoints. Figma design context could not be retrieved because the connector reported no selected layer; the supplied PDF and local implementation were used instead.

## Final automated results — 26 October 2026

- Production build and TypeScript: passed.
- 104 English/Marathi page URLs: no broken internal links, missing anchors or canonical URL failures in the crawl.
- 52 Marathi pages: no untranslated public text detected by the rendered-HTML audit.
- 1,506 matching dictionary entries, including every loading quote, heading and status label.
- 344 HTTP redirect cases: passed with locale/query preservation.
- 345 unique media assets and 269 source media references: passed.
- Full evidence: `reports/website-verification.json` and `reports/website-route-audit.json`.
