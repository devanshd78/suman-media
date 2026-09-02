# Suman Media — Responsive, Animation & Loading Audit

Date: 2026-09-02

## Scope reviewed

The pass covered the current implemented website surfaces in this repository, with emphasis on the landing page, careers flow, contact page/form, shared header/footer, shared image component, and site-wide motion/scroll behavior. Placeholder routes remain placeholders and were not redesigned.

## What was changed

### 1. Website-wide image loading

- Centralized loading behavior in `src/components/ui/image.tsx`.
- Every non-priority image using the shared Image component now explicitly uses lazy loading and async decoding.
- Priority behavior is preserved for genuine high-priority images rather than forcing `loading` alongside `priority`.
- Sanity CDN optimization/loader behavior is preserved.
- Converted CSS background-image implementations on the careers partner CTA and the contact connected-world section to the shared Image component so those assets can participate in responsive image optimization and lazy loading.
- The remaining native `<img>` usage is the local SVG partner strip; it explicitly uses `loading="lazy"` and `decoding="async"`.
- Removed carousel priority loading from below-the-fold client slides.
- Kept only two intentional priority images: the shared header logo and the careers hero image.

Static image audit after the changes:

- 31 shared `<Image>` usages checked.
- 0 `fill` images missing a `sizes` prop.
- 0 shared images missing an `alt` prop.
- 0 direct `next/image` imports outside the shared Image wrapper.
- 0 CSS `background: url(...)` / `background-image: url(...)` image implementations in `src`.

### 2. Global responsive baseline

Updated `src/app/globals.css` to provide safer responsive defaults:

- `box-sizing: border-box` for elements and pseudo-elements.
- Prevent accidental horizontal overflow.
- `min-width: 0` protection for flex/grid children.
- Responsive media max-width behavior.
- Browser text-size adjustment protection.
- Balanced heading wrapping and improved paragraph wrapping.
- Touch-friendly interaction defaults.
- Consistent smooth-scroll padding for the header offset.
- Reduced-motion behavior remains supported site-wide.

### 3. Global landing text reveal

The former reveal approach was made cheaper for mobile GPUs:

- Removed expensive global blur/filter animation.
- Uses only opacity + translate3d.
- Mobile uses a shorter travel distance and shorter transition.
- Tablet/desktop receives the larger editorial reveal.
- `will-change` is released after the element is visible.
- Components with their own Framer Motion system are excluded from the global reveal so two animation engines do not fight over the same transform.

### 4. Smooth scrolling

`SmoothScrollProvider` now uses Lenis only where it adds value:

- Desktop wheel/trackpad keeps smooth Lenis scrolling.
- Coarse-pointer devices use native touch scrolling, which avoids extra interpolation overhead in long sticky/3D sections on phones/tablets.
- Reduced-motion users bypass smooth-scroll animation.
- Hash navigation/header offset behavior remains intact.

### 5. Hero

- Responsive typography and CTA layout retained/improved.
- Buttons stack on narrow screens and return to side-by-side when space permits.
- Text springs were softened to remove abrupt movement.
- Mobile eyebrow size was increased for readability.
- Video uses metadata preload rather than eagerly downloading the complete video before it is needed.
- Reduced-motion preference now also prevents automatic background-video playback.

### 6. About section

- Removed animated blur from the word reveal.
- Replaced it with a lighter opacity/rise spring.
- Prevented the global text reveal from applying a second transform to the same content.
- Improved narrow-screen heading/body sizing and wrapping.

### 7. Business Ecosystem / client carousel

- Updated to five slides using `Image1.png` through `Image5.png`.
- Text/buttons are overlaid directly on artwork to match the supplied reference.
- Pause/resume control is vertically aligned to the text block rather than the full image.
- Every slide image/card uses the requested `0.25rem` radius.
- Primary and secondary CTAs use the requested `1rem` radius.
- Section eyebrow/heading matches the supplied desktop typography while remaining responsive below desktop.
- Infinite-loop clone transitions were hardened so clone resets do not create a visible jump.
- Incoming slide becomes active during motion for a more natural text/image transition.
- Only the actual physical active slide is interactive/animated, avoiding duplicate clone animation/accessibility states.
- Autoplay pauses when appropriate, resets after manual interaction, and does not run while the section is well outside the viewport.
- Mobile/tablet swipe is supported while normal vertical page scrolling remains native.
- Slide movement uses a tuned spring rather than competing fixed tweens.

### 8. Services 3D gallery

- One responsive 3D motion system is used across mobile, tablet and desktop rather than replacing mobile with a completely different static implementation.
- Device-specific perspective/depth values keep the same visual behavior without using desktop depth on a phone.
- Scroll spring was softened.
- Mobile text/button sizes were raised for readability.
- Reduced-motion receives a non-3D fallback.
- Motion-managed content is isolated from the global landing reveal.

### 9. Industries

- Desktop keeps the sticky vertical-to-horizontal experience.
- Mobile/tablet use native horizontal touch scrolling instead of converting vertical scroll into JS-driven horizontal motion.
- Added scroll snapping on smaller screens.
- Removed unnecessary permanent artwork layer promotion on small screens.
- Hover-only rotation is limited to devices that actually have hover/fine pointers.

### 10. Film / Cannes gallery

- Row motion remains scroll-linked with a smoothed spring.
- Image zoom was reduced to lower repaints and make the movement less aggressive on phones.
- Only the row is permanently GPU-promoted; individual image layers no longer all request `will-change` simultaneously.
- Responsive image widths/gaps remain breakpoint-aware.
- Exact supplied heading/body/button typography is preserved on desktop.

### 11. White-to-black section transitions

`ParallaxBlackSection` no longer animates a large `clip-path` surface.

- Uses compositor-friendly transform + opacity instead.
- Keeps the intended depth/handoff effect with much less paint work on mobile.

### 12. Careers

- Horizontal culture section now uses Framer Motion scroll progress/spring instead of a manual scroll listener that wrote transforms on every event.
- Reduced-motion receives a normal vertical layout.
- Careers typewriter caret stops animating after the section leaves view.
- Infinite careers image marquee uses translate3d/backface protection and hover pause is limited to actual hover devices.
- Main careers image remains intentionally priority because it functions as the route hero/LCP media.
- Partner CTA CSS background was converted to the shared responsive Image component.

### 13. Contact page and form

- Connected-world CSS background was converted to the shared responsive/lazy Image component.
- Responsive min-height and typography were adjusted so the section is not excessively tall on small phones.
- Partner marquee uses translate3d and has a reduced-motion fallback.
- Contact cards already reveal their descriptions by default on non-hover devices, so mobile users do not lose hover-only content.
- Existing form controls already have responsive widths, touch-friendly heights and mobile stacking.

### 14. Remaining landing sections and typography

- Media coverage logo dimensions no longer overflow a two-column mobile grid; exact desktop dimensions are retained at `lg`.
- Partner logo strip remains horizontally scrollable on mobile/tablet instead of clipping logos through premature centered overflow hiding.
- FAQ, Insights, Careers CTA, testimonial/story eyebrows were raised from very small mobile sizes to more readable responsive sizes.
- Insights now uses horizontal scroll snapping.
- Founder-letter body/byline typography was increased on small screens.
- Footer typography was normalized so key links/copy no longer shrink to extremely small desktop values.
- Inter now loads the `400`, `500` and `600` weights actually used by the components instead of loading only 600 and synthesizing normal/medium text.

## Animation principles now used

- Prefer `transform` + `opacity` for animated surfaces.
- Avoid full-section `filter` and `clip-path` animation where the same effect can be compositor-driven.
- Avoid `transition-all`; all current occurrences were removed.
- Use springs for scroll-linked/physical motion and short explicit transitions for hover/focus UI.
- Use native touch scrolling for mobile horizontal scrollers and long-page scrolling where it is smoother than a JS interpolation layer.
- Stop or simplify motion when `prefers-reduced-motion` is enabled.
- Avoid unnecessary permanent `will-change` declarations, especially on many child image layers.

## Validation completed in this environment

- TS/TSX syntax scan: **149 files, 0 syntax diagnostics**.
- Shared image audit: **31 Image tags, 0 fill-without-sizes, 0 missing-alt**.
- Direct `next/image` imports outside shared wrapper: **0**.
- CSS/local `background url()` image implementations: **0**.
- `transition-all` occurrences in `src`: **0**.

## Validation limitation

A full `npm run check` (ESLint + Prisma/TypeScript typecheck + Next production build) could not be completed in this sandbox because the uploaded archive does not contain `node_modules` and dependency installation/network access timed out. The source has therefore been syntax-validated, but the production build must still be run in the normal project environment before deployment.

Recommended local command:

```bash
npm ci
npm run check
```

## Production asset note

Responsive/lazy delivery is now handled in code, but several source assets are still large. Examples from `public` include the ~6.1 MB hero MP4 and several 2–4.7 MB PNGs. Next Image will optimize images at delivery time, but the hero MP4 should ideally also be encoded into a smaller web delivery version before production if visual quality allows.

## Visual QA matrix recommended before deployment

At minimum test:

- 320 × 568
- 360 × 800
- 390 × 844
- 430 × 932
- 768 × 1024
- 1024 × 768
- 1366 × 768
- 1440 × 900
- 1920 × 1080

And verify on:

- iOS Safari
- Android Chrome
- desktop Chrome/Edge
- desktop Safari
- keyboard-only navigation
- `prefers-reduced-motion: reduce`

