# Suman Media - Scroll, Interaction, and CSS Compatibility Audit

Date: 2026-09-15

## Applied fixes

### 1. Smooth-scroll architecture
- Removed global CSS `scroll-behavior: smooth` from the document scroll path so it no longer competes with Lenis.
- Updated the Lenis provider to use Lenis 1.3.x `autoRaf` instead of maintaining a second custom RAF loop.
- Enabled `stopInertiaOnNavigate` so SPA route changes do not carry stale scroll inertia into the next page.
- Kept Lenis desktop/fine-pointer only; touch/coarse-pointer devices use native browser scrolling.
- Kept smooth same-page hash navigation for both Lenis and native-scroll modes, with the existing 64px header offset.
- Updated the global Lenis CSS baseline to include directional prevent attributes and iframe handling.

### 2. Horizontal carousel / vertical page-scroll conflicts
Horizontal rails now use `data-lenis-prevent-horizontal` instead of generic `data-lenis-prevent` where appropriate. This lets horizontal gestures remain native while vertical wheel/trackpad gestures continue to drive the page smooth-scroll system.

Updated areas include:
- landing Clients carousel
- landing Industries rail
- landing News & Blogs carousel
- Services partner-logo strip
- News & Blogs Press rail
- Partner-page media rails

### 3. Pinned Industries rail performance
- Removed `getBoundingClientRect()` from the normal scroll-frame path.
- The section top is measured only when layout changes and ordinary scroll frames now use `window.scrollY` arithmetic.
- Avoided repeated dataset writes and MotionValue writes when values have not changed.
- Added layout re-measurement for body/font/page-show changes.

### 4. Drag/click reliability
The draggable landing Clients carousel and News & Blogs Press carousel no longer capture the pointer immediately on pointer-down.
- A normal click remains a normal link click.
- Pointer capture starts only after a real horizontal drag threshold is crossed.
- Drag-release clicks are suppressed only for the drag that produced them.

### 5. Carousel layout-read reductions
- Landing Clients nearest-slide calculations now use `scrollLeft` + `offsetLeft` instead of reading every card's transformed rectangle.
- Partner-page rail index tracking is requestAnimationFrame-throttled and offset-based.
- News & Blogs Press snap calculations are offset-based.

### 6. Cannes gallery load / decode pressure
- Repeated decorative clone videos no longer autoplay, avoiding duplicate video decoding during the pinned Cannes sequence.
- Cannes images remain lazy-loaded instead of switching the whole nearby wall to eager image loading.
- The existing zoom and opposing-row animation math was not changed.

### 7. Scroll-linked text performance
The per-character reveal keeps its progressive opacity timing but no longer applies a live CSS blur to every character on every scroll frame. This removes a high-cost paint operation on Abhijat Marathi and Careers pages.

### 8. Browser compatibility warnings
Removed active uses of the warning patterns supplied in the audit request:
- `text-wrap`
- `scrollbar-width`
- `-webkit-overflow-scrolling`
- `-webkit-user-drag`

WebKit scrollbar hiding rules remain where already present; browsers that do not support them simply show their native scrollbar rather than receiving a compatibility-warning declaration.

### 9. Abhijat Marathi renamed route
Added a permanent compatibility redirect:
- `/Abhijat-Marathi` -> `/abhijat-marathi`

The actual App Router page remains at:
- `src/app/(website)/abhijat-marathi/page.tsx`

## Validation performed
- Scanned the entire `src` tree for the browser-warning CSS patterns above: no active declarations remain.
- Parsed all `.ts` and `.tsx` files with the available TypeScript compiler in syntax-only/no-resolve mode: no TypeScript parser (`TS1xxx`) errors were found.
- Re-checked the lowercase Abhijat Marathi route and old-case references.

## Validation limitation
The sandbox did not contain project `node_modules`, and two `npm ci` attempts exceeded the available execution window. Because of that, a dependency-resolved `npm run lint`, `npm run typecheck`, and `npm run build` could not be completed here.

After extracting on the development machine, run:

```bash
npm ci
npm run check
```

## Navigation paths that still need product/content decisions
The codebase contains links to routes for which no matching App Router page currently exists, including examples such as `/case-studies`, `/investors/...`, `/leadership`, `/privacy`, `/products/...`, `/solutions/...`, and `/terms`.

These were not silently redirected because the repository does not establish the intended destination/content for them. They should be implemented or mapped intentionally rather than redirected to unrelated pages.
