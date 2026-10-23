# Cannes + News & Blogs Update

This project update keeps the existing `/news-and-blogs` URL for backward compatibility, while the website and Sanity Studio now present the feature to editors and visitors as **News & Blogs**.

## Landing page: Cannes Moments

The old generic film-image wall has been converted into a dedicated `CannesSection`:

- Component: `src/components/landing/cannes-section.tsx`
- Styles: `src/components/landing/cannes-section.module.css`
- Anchor: `#cannes-gallery`
- Supports a mixed sequence of photographs and videos.
- Videos are muted, looped, `playsInline`, and autoplay when the Cannes section/card is in view.
- Videos pause when they are no longer near the viewport.
- Users who request reduced motion are not forced into autoplay and receive video controls in the static fallback layout.
- Sanity media takes precedence when at least one valid Cannes media item is configured.
- If Sanity is unavailable, the Home Page document does not exist, or the Cannes media list is empty, the frontend automatically uses the local files in `public/cannes`.

### Local Cannes fallback assets

Photos:

- `cannes-red-carpet-group-01.jpg`
- `cannes-red-carpet-portrait-01.jpg`
- `cannes-red-carpet-group-02.jpg`
- `cannes-red-carpet-blue-look-01.jpg`
- `cannes-red-carpet-blue-look-02.jpg`
- `cannes-red-carpet-guests-01.jpg`
- `cannes-pavilion-guests-01.jpg`
- `cannes-riviera-portrait-01.jpg`
- `cannes-pavilion-guests-02.jpg`

Videos:

- `cannes-interview-group-short.mp4`
- `cannes-interview-group.mp4`
- `cannes-interview-indoor.mp4`
- `cannes-red-carpet-interview.mp4`
- `cannes-red-carpet-portrait-video.mp4`
- `cannes-red-carpet-walk.mp4`

All timestamp-based and malformed Cannes filenames from the supplied archive were replaced with these descriptive filenames.

## Sanity: Cannes Moments

`Home Page` now contains a dedicated **Cannes Moments** object with:

- heading
- description
- CTA
- ordered mixed media list
- photo/video selector
- image or Sanity file asset
- video accessibility label
- optional video poster
- optional caption
- optional CSS object-position
- per-item show/hide toggle

The Sanity query resolves image URLs and file/video URLs and sends the normalized media array to the landing page. Old Cannes fields that previously lived inside `partnerSection` are kept hidden only as a migration fallback so existing production content is not destroyed.

## Landing page: News & Blogs

The old landing `InsightsSection` has been renamed to `NewsBlogsSection`:

- Component: `src/components/landing/news-blogs-section.tsx`
- Visible heading fallback: `News & Blogs`
- Sanity homepage fields control the eyebrow, heading, CTA, and featured article references.
- If valid featured Sanity posts are available, those are rendered.
- If Sanity has no valid featured posts, the existing local fallback cards are rendered.

The public page URL remains `/news-and-blogs` so existing links, bookmarks, SEO references, and article URLs do not break.

## Sanity: News & Blogs

Editor-facing names were cleaned up to **News & Blogs** / **News & Blog Article**. The post schema also now includes fields already required by the article page:

- `imageCredit`
- `readingTimeMinutes` optional override

The News & Blogs listing and detail pages continue to use Sanity first and their local reference content only when CMS content is unavailable.

## Other cleanup

- Corrected the fallback article title to `Prajakta Mali Cannes Moments 2026`.
- Renamed the landing film component/files to Cannes-specific names.
- Renamed the landing insights component to News & Blogs terminology.
- Removed 22 macOS AppleDouble `._*` metadata files from the supplied archive. These files were being included by TypeScript and can cause invalid-character/binary-file errors on Windows/Next.js tooling.
- Removed stale `tsconfig.tsbuildinfo` from the delivery source.

## Validation performed

- 163 TypeScript/TSX files parsed/transpiled with the TypeScript compiler: **0 syntax errors**.
- Local `@/`, `./`, and `../` source import targets checked: **0 missing local imports**.
- Updated Cannes, News & Blogs and global CSS brace structure checked successfully.
- All 15 local Cannes fallback paths resolve to files.
- All 6 Cannes videos were checked with `ffprobe` and contain H.264 video streams.

A full `npm run check` could not be executed in the artifact environment because dependency installation did not complete within the available execution window. After installing dependencies locally, run:

```bash
npm ci
npm run sanity:typegen
npm run check
```

`src/sanity/sanity.types.ts` is generated output and should be refreshed by `npm run sanity:typegen` after dependencies are installed; schema and GROQ source files are the source of truth included in this update.
