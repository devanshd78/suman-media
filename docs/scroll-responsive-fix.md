# Suman Media: cumulative scroll, header and responsive fix

## Source and compatibility

Cumulative baseline: the uploaded `suman-media-latest(7).zip`, with Windows ZIP
path separators normalized. A second patch supports that same baseline with the
previous `suman-header-responsive-industries.patch` already applied.

The PowerShell installer selects known file versions individually, so mixed original/previous-header-patch trees are supported. Already-updated files are skipped. It validates applicability before writing. It does not
force hunks, silently overwrite a different local version, or automatically
merge unknown manual replacements. It backs up the affected existing files and
then verifies the resulting files against a SHA-256 manifest. Run it from the
project root. Git must be installed, but a Git repository is not required.

## Implemented changes

- Direction-aware header: transparent over the homepage hero; hidden on downward
  scroll and revealed upward. A dark translucent surface is used when the
  homepage header returns over lower sections. Menus and keyboard focus keep it
  visible. Internal routes reserve the header's normal space.
- Hero text starts its own intersection animation. The highlighted hero eyebrow
  is removed from rendering, without changing the Sanity schema. About retains
  its word reveals; its CTA now has the requested white/gold button treatment.
- Clients becomes a finite, page-scroll-driven horizontal rail. All five supplied
  slides/links remain; infinite clones, autoplay, playback and navigation controls
  are removed. Content on narrow/touch/short windows uses a native swipe rail.
- A shared horizontal controller uses a single coordinate system. The pinned
  stage reserves the viewport height plus measured horizontal travel and a short
  final hold, so the next section cannot rise during unfinished travel. This
  viewport reservation is necessary for the requested pinned interaction; it is
  not an extra empty section. Natural content is measured before pinning.
- Services has independent arrival/read/exit slices. Reading is 52% of each
  slice; it is scroll distance, not forced seconds. Only the current card moves.
  Scrolling upward does not rewind Services during the current mounted visit.
  The camera exit stays before the perspective singularity. Viewport-dependent
  geometry fits the resting foreground card; reduced-motion/very short layouts
  have a full static list instead. Existing CMS service order is reversed for
  the front-to-back 08-to-01 presentation.
- Industries retains the previously supplied SVG geometry, gradient palettes,
  categories and links. Adds actual SVG grain, gentle artwork hover, and short
  code-controlled descriptions. Descriptions appear on hover/focus and stay
  visible on touch/reduced-motion devices. The descriptions are editable draft
  presentation copy in industries-section.tsx, not new verified company facts.
- Testimonial gains an independent intersection reveal, a larger logo, larger
  quote and more vertical space. CMS data and attribution remain unchanged.
- Desktop major content padding is 100px at the named sections. Mobile spacing
  remains smaller. Partner/Stats retain their shared background and rhythm;
  arbitrary negative overlap is not added.
- The earlier responsive typography/header/artwork fixes are included in the
  cumulative patch. The Services wrapper is not transformed by an outer parallax
  effect. The stale CMS props to code-only Insights are removed.

No package dependency, lockfile, environment file, source image, font binary,
Sanity schema, API, or database migration is changed by this delivery.

## Verification and boundaries

Current-delivery verification:
- TypeScript/TSX syntax parse: 152 source files; zero syntax diagnostics.
- Local module path check: zero unresolved local imports.
- Deterministic Services geometry checked at 1920x1080, 1440x900, 1300x800,
  1300x650, 810x1080, 440x956 and 320x568. Foreground card fits when pinned;
  the smallest short viewport uses the static fallback.
- Exclusive per-card slices and monotonic Services progress checked.
- Both patches are checked/applied to independent clean baselines; resulting
  normalized UTF-8 content hashes and reverse applicability are verified during packaging.

The earlier browser-results.json belongs to the preceding isolated fixture
work, not a full Next application test. It is not reused as proof of this
packaged revision. This environment cannot resolve the npm registry, so full
project lint, semantic typecheck, build, actual Sanity/Lenis integration and
production browser frame rate are NOT verified. Run `npm run check` locally.
PowerShell itself is not installed in the container: Git application is tested,
but the installer needs its first PowerShell execution on your machine.

## After applying

Stop the dev server first. Run `npm run check`, then `npm run dev`. Test the
actual CMS content, long text, each rail to completion, upward Services scroll,
header menus and mobile navigation. Reduced motion deliberately disables the
larger movement. Do not add overflow:hidden or transforms to the sticky
sections' ancestors.

## Rollback

The installer creates a sibling backup directory with original files and a
restore manifest. An untouched post-patch tree can also be checked with
`git apply --reverse --check <the-patch-that-was-applied>` and then reversed.
Do not reverse after further edits without first reviewing the conflicts.
