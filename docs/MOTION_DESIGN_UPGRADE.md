# Suman Entertainment — Motion & Cultural Design Upgrade

## Direction

The landing page now uses a shared motion language instead of isolated one-off fades:

- cinematic image movement and masked typography
- section-level reveal orchestration
- restrained gold thread transitions
- abstract Maharashtra-inspired stepped-diamond weave motifs
- parallax only on large editorial imagery
- scroll-driven depth only where it adds meaning (services)
- reduced-motion fallbacks for all new motion

The cultural layer is intentionally abstract and contemporary. It references Maharashtra through gold textile-like threads, stepped geometry and selective Marathi micro-typography without turning the site into a tourism/traditional-theme design.

## Architecture

### Global motion

- `src/components/layout/smooth-scroll-provider.tsx`
  - keeps a single site-wide Lenis instance
  - tighter 0.92s response so scrolling remains smooth without feeling delayed
  - no section-level Lenis instances

- `src/components/landing/landing-section-observer.tsx`
  - one IntersectionObserver controls progressive section visibility
  - does not transform section roots, protecting sticky/3D layouts

- `src/app/globals.css`
  - section fade/sharpen transitions
  - major heading rise/blur-to-sharp reveal
  - reusable gold thread transition
  - abstract Maharashtra weave utility
  - reduced-motion behavior

### Reusable motion primitives

- `src/components/motion/reveal.tsx`
  - `Reveal`
  - `RevealSpan`
  - `Parallax`

- `src/components/motion/text-reveal.tsx`
  - semantic live-text word reveal
  - no canvas/image-rendered text
  - reduced-motion fallback

## Section upgrades

### Hero
`src/components/landing/hero-section.tsx`

- cinematic zoom/pan image deck
- animated slide copy entry/exit
- masked headline rise
- animated CTA and badge
- timed progress indicators
- subtle gold thread and Marathi cultural microtype
- pause/play remains accessible

### About
`src/components/landing/about-section.tsx`

- word-by-word headline reveal
- paragraph/CTA stagger
- abstract Maharashtra weave background
- gold cultural thread transition

### Clients & partners
`src/components/landing/client-section.tsx`
`src/components/landing/clients-bubbles.tsx`

- staged heading reveal
- stronger bubble depth and hover response
- existing falling/bounce behavior retained and polished

### Services
`src/components/landing/services-section.tsx`
`src/components/landing/services-scroll-gallery.tsx`

- replaced the aggressive long 3D cascade with a controlled active-card depth gallery
- shorter scroll distance per card
- only the active card reaches full opacity/interaction
- adjacent cards become atmospheric depth rather than unreadable overlapping content
- alternating perspective movement, scale, rotation and z-depth
- mobile/tablet uses animated readable static cards
- reduced-motion uses static cards

### Government / Maharashtra achievement
`src/components/landing/achievement-reveal-grid.tsx`

- retained the interactive reveal-grid concept
- added semantic headline word reveal
- added shared cultural weave/thread treatment

### Industries
`src/components/landing/industries-section.tsx`

- retained existing horizontal interaction and artwork behavior
- upgraded section entrance and headline motion
- integrated shared transition language

### Statistics
`src/components/landing/stats-section.tsx`

- existing animated counters retained
- staggered metric entrance
- interactive gold hover state
- subtle geometric cultural accents

### Partner / Cannes
`src/components/landing/partner-section.tsx`

- word-reveal headline
- staggered partner benefits
- cinematic event image parallax
- geometric gold accent
- animated CTA

### Testimonials / Join Abhijat Marathi
`src/components/landing/testimonial-section.tsx`

- testimonial/logo reveals
- partner-logo stagger and hover depth
- story banner parallax
- stronger headline and CTA motion

### Media coverage
`src/components/landing/media-coverage-section.tsx`

- staggered logo entrance
- premium hover lift and grayscale-to-color response
- shared heading animation

### Founder letter
`src/components/landing/founder-letter-section.tsx`

- editorial paper-card treatment retained and strengthened
- background parallax
- title word reveal
- paragraph-by-paragraph stagger
- subtle Marathi cultural side detail

### Insights
`src/components/landing/insights-section.tsx`

- scroll-entering card stagger
- richer image reveal/hover
- title color response
- animated navigation controls
- shared headline motion

### FAQ
`src/components/landing/faq-section.tsx`

- replaced abrupt native open/close behavior with accessible controlled accordion motion
- smooth height/opacity transition
- plus icon rotates into close state
- keeps `aria-expanded`, `aria-controls` and labelled regions

### Careers CTA
`src/components/landing/careers-cta-section.tsx`

- cinematic image parallax
- word-by-word headline reveal
- geometric gold motion accents
- subtle Marathi/English cultural line

### Footer
`src/components/landing/footer.tsx`

- preserves four-column Figma information architecture
- full-width layout retained
- `Get started` receives subtle word reveal
- crowd image moved to `/images/gfooter/footer.png`
- exact logo shape continues through `/images/logo.png` CSS mask
- social SVG artwork preserved
- social glass button treatment set to:
  - `border-radius: 6.25rem`
  - `background: rgba(255, 255, 255, 0.10)`
  - `backdrop-filter: blur(4px)`
- logo/social/legal row positioned in the upper part of the crowd image so the photograph continues below, matching the Figma composition

## CMS / Sanity impact

No Sanity schema or query changes were required.

All existing editor-managed content remains editor-managed:

- hero slides
- section headings/descriptions
- CTAs
- client/company entries
- services
- industries
- statistics
- government/achievement content
- partner/Cannes content
- testimonials
- founder letter
- media coverage
- insights
- FAQs
- careers content
- social URLs

Animation configuration remains in frontend code.

## Dependencies

No new dependency was added. The upgrade uses the project's existing:

- Next.js
- React
- Tailwind CSS
- Framer Motion
- Lenis

## Validation

All `src/**/*.ts` and `src/**/*.tsx` files were parsed with the TypeScript compiler API after the changes and returned zero syntax diagnostics.

A full `npm run check` could not be executed in the artifact environment because `npm ci` did not complete within the available execution window, so the project should still be run through the repository's normal `npm run check` command after dependencies are available locally/CI.
