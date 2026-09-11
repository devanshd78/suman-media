# Cannes + News & Blogs UI Update V2

## What changed

### Cannes Moments gallery
- Kept the existing two-row scroll choreography and muted autoplay videos.
- All local `/public/cannes` fallback photos and videos now use face-safe `contain` framing so full faces, outfits, groups, and portrait footage are not clipped by the fixed gallery cards.
- The gallery card ratio was made slightly wider/shorter to better match the source media.
- Sanity media now supports `objectFit` (`contain` / `cover`) and explicit `objectPosition`.
- Sanity image hotspots are projected and automatically used as CSS `object-position` when no explicit crop position is supplied.
- `contain` is the default for new Cannes Sanity media items; editors can opt into `cover` per item.

### News & Blogs fallback images
- The News & Blogs listing fallback uses the actual images from `/public/cannes` rather than separate placeholder artwork.
- The homepage News & Blogs carousel also uses six of those exact Cannes images when Sanity has no valid featured posts.
- Portrait-only source imagery is avoided in card fallbacks where the horizontal card ratio would crop faces.
- Fallback and Sanity featured images now carry focal-position data. Sanity hotspots are projected into both the listing page and homepage cards.
- Article hero/related-card images also respect Sanity/fallback focal positions.

### Sanity fallback behavior
- Sanity remains the source of truth whenever valid content exists.
- If the homepage or Cannes media cannot be loaded from Sanity, the current local Cannes media remains visible.
- If no valid News & Blogs posts/featured posts are returned, the Cannes-backed reference content is used.
- Existing Sanity storage keys such as `insightsEyebrow` are retained for migration safety, but the homepage query exposes clean `newsBlogs*` names to the frontend.

### News & Blogs layout
- Text regions retain sensible maximum widths.
- Featured cards, Latest News grids, Press headings, Press carousel, and other visual content fill the available page width inside the existing responsive page padding instead of being constrained to an unnecessary fixed content width.
- Press keeps the two-card desktop presentation with 16px spacing, right-aligned action links, drag interaction, and autoplay.
- Legacy `/insights` and `/insights/:slug` URLs permanently redirect to `/news-and-blogs` equivalents.

### Navigation dropdown
- Desktop dropdown open and close now use an eased reveal/collapse animation based on opacity, vertical motion, and clipping rather than squashing the panel contents.
- Exit animation remains mounted through `AnimatePresence`, so closing no longer disappears abruptly.
- Reduced-motion preference is still respected.

### “What we really do?” reverse scroll
- The existing downward card animation is unchanged.
- On upward scrolling, cards now return one-by-one on their own scroll slice with a simpler fade/light-tilt motion, rather than replaying the dramatic forward exit in reverse.

## Validation performed
- TypeScript/TSX syntactic transpile check: 0 diagnostics across project TS/TSX files (excluding generated `next-env.d.ts`, which `transpileModule` does not emit).
- Non-generated local import resolution scan: 0 missing local imports.
- CSS structural brace checks passed for the modified modules.
- 78 referenced public asset paths checked: 0 missing.
- 15 unique Cannes fallback assets checked: 0 missing.
- All 6 local Cannes MP4 files validated with ffprobe as H.264 video streams.

## Local follow-up
Dependencies are intentionally not bundled. Run:

```bash
npm ci
npm run sanity:typegen
npm run check
```

`sanity.types.ts` is generated output and should be refreshed with `npm run sanity:typegen` after dependencies are installed.
