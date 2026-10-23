# Suman Entertainment — Main PDF Landing Page Alignment

Reference used: `Main(3).pdf`, supplied with the project update request.

## Scope completed

The landing page implementation was aligned section-by-section to the supplied Main PDF while preserving the existing production architecture:

1. Transparent hero/header treatment
2. Hero platform badge, pause/play control, slide progress and optional QR download card
3. About section typography/copy/CTA treatment
4. Client bubble section and responsive falling-bubble behavior
5. Services stacked 3D desktop interaction plus responsive tablet/mobile cards
6. Government empanelment reveal-grid section
7. Industries horizontal card system
8. Thin four-column animated statistics strip
9. Why Partner With Us benefit list
10. Cannes feature banner
11. Testimonial + partner/client logo strip
12. Join Abhijat Marathi banner
13. Media Coverage logo wall
14. Founder letter card over monochrome background
15. Latest Announcements / News & Blogs carousel
16. FAQ accordion
17. Careers image CTA
18. Footer CTA, four-column sitemap, social icons and crowd image

## Responsive behavior

### Mobile

- Header collapses into the existing mobile navigation.
- Hero is full-height; QR card is hidden to avoid covering primary copy.
- Client bubbles become a 2-column falling grid.
- Services become stacked image/content cards.
- Industries remain horizontally scrollable/swipeable.
- Statistics become a 2 × 2 layout with short dividers.
- Why Partner, FAQ and footer columns stack.
- Cannes, Join and Careers banners use portrait-friendly aspect ratios.
- News cards use touch horizontal scrolling.

### Tablet

- Header continues to use compact navigation until desktop breakpoint.
- Services use a 54/46 text/image split.
- Client bubbles use 3 columns.
- Why Partner and FAQ move to two-column layouts from the medium breakpoint.
- Join/Careers use wider landscape aspect ratios.

### Desktop

- Transparent navigation overlays the hero.
- Services use the existing scroll-driven 3D fly-through system.
- Industries use the full horizontal card track.
- Statistics render in one four-column row.
- Why Partner is a left-copy/right-benefits split.
- Media Coverage renders as the PDF-style 5 / 4 / 3 logo composition when 12 items are supplied.
- Founder letter is centered over a full monochrome background.
- News uses a large lead card + smaller following cards with arrow controls.
- Footer uses four vertical sitemap columns.

## CMS / Sanity additions

### Hero slide

Added optional fields:

- Platform / product badge
- Download QR code
- Download card title
- Download card caption
- Download card link

The frontend still uses the existing desktop/mobile hero images from Sanity.

### Why Partner

Default editor values now match the Main PDF:

- Why Partner With us?
- Future-ready Media Infrastructure
- Technology-led Innovation
- Integrated Ecosystem
- Scalable Partnerships
- Enterprise Delivery
- Cannes launch heading
- View Our Cannes Monument

### Testimonial

The schema keeps:

- Quote
- Person name
- Person role
- Company name
- Company logo
- Partner/client logos

The Main PDF reference copy, `Founder and CEO`, and `Automation Anywhere` are supplied as editor defaults. Confirm the attribution is approved before publishing it as a testimonial.

### Media Coverage

- Media item image label changed to `Publication logo`.
- Maximum media items increased to 12 so the reference 5 / 4 / 3 logo layout can be reproduced.

### Founder Letter

Added:

- Optional founder signature image

Reference text, Kedar Joshi and Founder and CEO are supplied as editor defaults.

### FAQ / Careers source wording

Two source strings appear to contain spelling errors in the Main PDF and were deliberately kept source-faithful in the schema defaults:

- `still have a quarry?`
- `CARRERS`

If these are not intentional, change them in Sanity to:

- `Still have a question?`
- `CAREERS`

## Content that must remain verified

Do not replace the Main PDF statistics placeholders (`000+`, `00+`, `00mn`, `00+`) with invented numbers. The existing `Verified statistics` CMS array remains numeric so the frontend can animate real figures.

The 2027 production statement in the founder letter is present in the supplied reference. Confirm that forward-looking statement is still approved before production publishing.

## Images / logos still required in Sanity

No reference images were recreated or substituted in this update. To match the PDF exactly, supply/upload the approved assets below:

### Hero

- Desktop image per hero slide
- Mobile image per hero slide where needed
- Abhijat Marathi/platform badge
- QR code image for the download card

### Clients and services

- Featured company/client logos for the bubble section
- Featured service image for each service document

### Achievement

- Marathi Language Department emblem
- Government of Maharashtra seal
- Bottom Marathi cultural artwork

### Industries

- Transparent/vector artwork for each industry card (the gradient/card treatment is frontend-controlled)

### Cannes

- Cannes/Bharat Pavilion feature photo
- Festival/event badge/logo

### Testimonial

Reference logo row:

1. Automation Anywhere
2. Attentive
3. Razorpay
4. Mailchimp
5. Freshworks

### Join Abhijat Marathi

- Full-width Join banner photograph
- Abhijat Marathi badge/logo

### Media Coverage

Upload the approved publication logos shown in the Main PDF. Clearly identifiable examples include ANI, ThePrint, ABP Majha, Brut., Republic, The Wire, Sakal, Fortune, Business Standard, The Tribune and Pudhari, plus the final approved publication logo shown in the reference.

### Founder

- Monochrome founder-section background image
- Optional Kedar Joshi signature image

### News & Blogs

- Featured image comes from each Sanity Post/Insight document

### Careers

- Careers/team background photograph

### Footer

- The existing project already contains `public/images/footer/footer.png`; it remains untouched.

## Technical architecture preserved

- Homepage remains ISR/server-rendered rather than being converted to full client rendering.
- Interaction-heavy pieces remain isolated client components.
- Existing Lenis smooth scrolling is preserved.
- Landing section IntersectionObserver transition is preserved.
- Reduced-motion behavior remains supported.
- Sanity stays the content source of truth.
- Existing manual-featured-content + `featured=true` fallback behavior is preserved.
- Footer social URLs now resolve from Sanity Site Settings when supplied; the reference icons remain visible if a URL is not yet configured.

## After installing dependencies

Run:

```bash
npm run sanity:typegen
npm run typecheck
npm run lint
npm run build
```

The uploaded archive did not contain `node_modules`. Dependency installation was attempted in the analysis environment but timed out before packages became available, so a full Next/Sanity build could not be run here. The changed TypeScript/TSX files were separately syntax-transpiled with TypeScript and passed without syntax diagnostics.
