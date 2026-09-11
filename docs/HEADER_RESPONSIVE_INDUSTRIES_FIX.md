> Historical notes for the earlier header patch. The current delivery is described in SCROLL_RESPONSIVE_FIX.md. Its Services timing and scroll controllers supersede the earlier behavior below.

# Header, responsive typography and Industries patch

## Baseline and scope

Built specifically against `suman-media-latest(7).zip`.

Source ZIP SHA-256:
`238a4b6ff7da1f9c27737da045372a158800925ec6228c0343e87ddcbe4d9d65`

This is a targeted code patch, not a new visual redesign. It retains the section order, existing copy, route destinations, shared fonts, palettes, media assets, CMS schema/query contracts and current animation libraries. No dependencies or lockfiles were changed. No secrets or font binaries are included.

## Findings and implemented changes

### Header

The uploaded header already selected a transparent/absolute style on `/`, while other routes selected a white background. In an isolated homepage rendering, the original top bar was transparent; a completely white homepage bar could not be reproduced without the user's full local runtime. The white mega-menu is a different element from the top bar.

The old dropdown trigger mixed hover opening, focus opening and click toggling, followed by immediate mouse-leave closing. That can create conflicting input transitions. It did not establish a single clear pointer/keyboard interaction model. This was a source-level finding, not proof that it was the only cause of the reported invisible words.

The patch gives the top bar and dropdown independent CSS-module surfaces. The bar is explicitly transparent, remains absolute over the homepage, and retains dark readable navigation on light internal pages. The homepage logo is rendered white using its original image shape. The dropdown remains an opaque white panel for legibility. Navigation labels never receive a fade-out state.

Hover and keyboard handling now use one controlled dropdown state, a 140 ms pointer-leave grace period, cancellation on pointer re-entry, conditional panel removal, Escape/outside-click dismissal and focus restoration. Pointer click no longer instantly closes the menu that hover just opened. ArrowUp/ArrowDown open the panel and focus a link. Mobile navigation has a scrollable portaled dialog, focus containment, body-scroll locking and focus restoration. Desktop navigation begins at 1120 CSS pixels; smaller widths use the menu button rather than squeezing desktop links.

### Typography and short laptops

An unlayered `button, a, input, textarea, select { font: inherit; }` reset took precedence over layered Tailwind utilities. The image-height reset had the same cascade risk. Resets are now in `@layer base`, leaving component utilities in control.

Shared, explicitly assigned landing typography classes replace isolated miniature sizes without applying a global zoom or scaling the whole page:

- Major section headings: fluid 32-48 px.
- Hero heading: fluid 40-84 px.
- Main body copy: approximately 16-18 px; selected lead text approximately 16-22 px.
- Header links and CTA: 14-16 px, appropriate line height and weight.
- Eyebrows: 14/20 px.
- Footer links: 14 px; its introduction/cards receive larger text.

The source font families and weights remain in `src/lib/fonts.ts`. Laptop layout is based on browser CSS width and height, not physical screen inches. About, Partner and FAQ no longer force narrow copy columns at intermediate widths. Founder copy has a wider reading column. Careers and Story sections use content-safe minimum heights rather than a rigid short aspect ratio. Client carousel media height responds to short windows; its existing carousel movement logic was not rewritten.

### Industries and supplied SVGs

The category list remains code-controlled and section copy/CTA remains CMS-capable. The seven existing gradient palettes and category URLs are retained. Artwork is separated into `industry-artwork.tsx`.

- Enterprises: supplied cube path, 322x277 viewBox and white-to-transparent gradient. Removed the old compensating rotation.
- Brands: supplied seven concentric polygon paths, 340x335 viewBox and opacity gradient.
- Investors: both supplied 283x155 dome paths and their distinct gradients; not a replacement oval approximation.
- Public Sector: supplied 320x304 polyhedron path and gradient.
- Creators: supplied 325x325 diamond and 230x230 square paths as separate layers, with their different gradients. The diamond is no longer simulated by rotating the square.
- Entertainment and Government retain their existing artwork; no replacement was requested for them.

Some of these SVG paths already existed in the ZIP. The patch retains matching paths and corrects the orientations, missing diamond geometry, lower-dome coordinates, viewBoxes and composition. Identical gradient definitions inside a single artwork are shared without altering the path geometry.

The rail now measures actual header/panel size and horizontal overflow. It pins only on fine-pointer desktop layouts when the content fits the visible height; otherwise it uses native horizontal scrolling. It reserves actual panel height plus horizontal travel, not a forced full-screen blank panel or artificial final hold. Relative target offsets replace a cached absolute page coordinate. Keyboard focus also brings a clipped card into view. Reduced-motion preference uses the non-pinned version. No Previous/Next buttons were added.

### Services and integration

The outer ParallaxBlackSection was removed only around Services: that ancestor transformed/clipped the entire long sticky gallery. Founder/Careers parallax wrappers remain. Service motion constants, ordering and scroll cadence were not changed. Copy receives readable sizing, larger short-laptop card height and internal overflow handling for unusually long text.

LandingPage's obsolete CMS props to the now argument-free `InsightsSection` were removed. The original call and component signature did not match. Insights itself remains code-controlled.

The global landing-text observer now explicitly ignores independently managed motion, header/navigation/dialog/menu, inert and aria-hidden regions, and does not hide text when IntersectionObserver is unavailable. The original observer already scoped itself to the landing `<main>`; this is defensive isolation, not a claim that it directly caused header fading.

## Files in the patch

| File | Change |
| --- | --- |
| `src/app/globals.css` | Base cascade fix and opt-in readable typography classes. |
| `src/components/landing/header.tsx` | Header state, transparent surface, pointer/keyboard and mobile-dialog implementation; original navigation data preserved. |
| `src/components/landing/header.module.css` | New scoped header, dropdown and mobile styles. |
| `src/components/landing/industries-section.tsx` | Content-fit horizontal rail; no artificial full-height viewport or stale document offset. |
| `src/components/landing/industries-section.module.css` | New responsive rail, artwork and heading styles. |
| `src/components/landing/industry-artwork.tsx` | New module containing the supplied/reused SVG paths and proper composite layers. |
| `src/components/landing/landing-page.tsx` | Services wrapper correction; stale Insights props removed. |
| `src/components/landing/landing-text-reveal.tsx` | Exclusions and safe observer fallback. |
| `src/components/landing/services-scroll-gallery.tsx` | Readable card copy and short-laptop height; motion constants preserved. |
| `src/components/landing/hero-section.tsx` | Fluid heading/lead classes and long-word wrapping. |
| `src/components/landing/about-section.tsx` | Responsive columns and readable typography. |
| `src/components/landing/client-section.tsx` | Shared section title and height-aware media; carousel engine unchanged. |
| `src/components/landing/partner-section.tsx` | Flexible two-column layout and typography. |
| `src/components/landing/film-section.tsx` | Shared section-title class. |
| `src/components/landing/faq-section.tsx` | Readable question/answer sizes and later two-column breakpoint. |
| `src/components/landing/media-coverage-section.tsx` | Shared section-title class. |
| `src/components/landing/founder-letter-section.tsx` | Wider editorial column and larger reading text. |
| `src/components/landing/news-and-blogs-section.tsx` | Shared section-title class only. |
| `src/components/landing/careers-cta-section.tsx` | Content-safe height and responsive text. |
| `src/components/landing/testimonial-section.tsx` | Content-safe Story height and readable text. |
| `src/components/landing/footer.tsx` | Larger typography and less restrictive column spacing. |
| `docs/HEADER_RESPONSIVE_INDUSTRIES_FIX.md` | This review and application guide. |

## Validation and limitations

### Completed

- Parsed 150 source TS/TSX files: zero syntax diagnostics.
- Checked relative/aliased local import targets and named/default export contracts: no unresolved local paths or mismatches found. This is not a replacement for TypeScript semantic checking.
- Compared Services desktop/tablet/mobile motion constants, scroll-per-card, final hold and spring parameters against the uploaded baseline: unchanged.
- Compiled styles in an isolated browser harness and tested actual Header React state/DOM behavior.
- Tested dropdown hover/open/leave/close repeatedly, retained top-bar text visibility, keyboard opening, Escape focus restoration, mobile focus containment and mobile scroll unlock.
- Tested the responsive component layout at the sizes listed below. No document-level horizontal overflow or measured non-carousel heading/paragraph horizontal overflow was detected in these fixtures.
- Checked that the final Industry card is reachable in native and pinned modes. Checked reduced-motion fallback at 1366x768.
- The delivered patch is checked against a fresh extraction of the source ZIP, then applied and compared with the edited files. Reverse applicability is also checked.

### Browser viewport matrix

| CSS viewport | Header | Industries |
| --- | --- | --- |
| 320x568 | Mobile dialog | Native horizontal rail |
| 375x667 | Mobile dialog | Native horizontal rail |
| 390x844 | Mobile dialog | Native horizontal rail |
| 768x1024 | Mobile dialog | Native horizontal rail |
| 853x480 | Mobile dialog | Native horizontal rail |
| 1024x480 | Mobile dialog | Non-pinned when content cannot fit |
| 1024x600 | Mobile dialog | Content-fit pinned rail |
| 1120x700 | Desktop dropdowns | Content-fit pinned rail |
| 1280x600 | Desktop dropdowns | Content-fit pinned rail |
| 1280x720 | Desktop dropdowns | Content-fit pinned rail |
| 1366x768 | Desktop dropdowns | Content-fit pinned rail |
| 1440x900 | Desktop dropdowns | Content-fit pinned rail |
| 1920x1080 | Desktop dropdowns | Content-fit pinned rail |

### Not verified here

The upload does not contain installed dependencies. The registry was unreachable from this runtime; an offline install failed with ENOTCACHED for React. Consequently, the exact project `npm run typecheck`, lint and Next production build were not completed. Dependency versions were not changed or force-upgraded.

The Chromium review used an isolated component harness: real React hooks/DOM for Header, adapters for Next Link/Image/navigation and Framer Motion, local media fixtures, and Arial fallback fonts. Tailwind utilities were generated with the locally available Tailwind 4.1.10, not the project's locked version. These checks establish useful layout/interaction coverage but are not an end-to-end test of Next 16.2.12, Sanity, Lenis, the real font assets or real 3D frame-rate performance. Actual CMS content, Safari/iOS, OS scaling and production delivery should still be checked locally. No 60fps guarantee, Lighthouse score or complete cross-device certification is claimed.

## Apply in PowerShell

Stop the running dev server with Ctrl+C. Back up or commit your current work first. Place `suman-header-responsive-industries.patch` in Downloads. Run from the project root (the folder containing package.json):

```powershell
$Patch = Join-Path $HOME "Downloads\suman-header-responsive-industries.patch"
if (-not (Test-Path $Patch)) { throw "Patch file not found: $Patch" }
if (-not (Test-Path ".\package.json")) { throw "Open PowerShell in the suman-media project root first." }

git apply --check --ignore-space-change "$Patch"
if ($LASTEXITCODE -ne 0) { throw "Patch does not match this working copy. No changes applied. Do not force it." }

git apply --ignore-space-change --whitespace=nowarn "$Patch"
if ($LASTEXITCODE -ne 0) { throw "Patch application failed. Stop and inspect the error." }

npm run typecheck
if ($LASTEXITCODE -ne 0) { throw "Typecheck failed. Keep the output and fix it before deployment." }

npm run lint
if ($LASTEXITCODE -ne 0) { throw "Lint failed. Review the output before deployment." }

npm run dev
```

Git for Windows must be installed. `git apply` can apply a patch to a working directory even when it is not initialized as a Git repository. Do not use --reject or --force to bypass a mismatch. No npm install is required solely for this patch when the existing dependencies are already installed. On a fresh extraction, run npm install before the checks. No next.config or dependency changes require mandatory cache deletion.

Before deployment, also run `npm run build`. Review the real homepage using your CMS content, including long headings and the Services/Industries endpoints.

### Reverse this patch

Only while subsequent changes still allow a clean reverse application:

```powershell
$Patch = Join-Path $HOME "Downloads\suman-header-responsive-industries.patch"
git apply --reverse --check --ignore-space-change "$Patch"
if ($LASTEXITCODE -ne 0) { throw "Reverse check failed; do not overwrite later work." }
git apply --reverse --ignore-space-change --whitespace=nowarn "$Patch"
```

## Technical references

- Tailwind CSS base/utility layering: <https://tailwindcss.com/docs/preflight>
- Git patch verification and reverse application: <https://git-scm.com/docs/git-apply>
