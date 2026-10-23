# English and Marathi content

The public website uses `/en/...` and `/mr/...` routes. Unprefixed links redirect to the visitor's selected language (English by default). API endpoints, Sanity Studio and asset URLs retain their original paths.

The English / मराठी pill sits at the bottom-right of the viewport. It links to the same page in the other language and preserves query parameters and anchors. The locale cookie remembers the selection.

## Editing translations

- `messages/en.json` contains the original English text and `messages/mr.json` contains its Marathi translation, with matching keys. Use complete phrases, not individual animated letters. Whitespace and typographic apostrophes are normalized at lookup.
- For CMS-managed copy, publish an **English / Marathi Translations** document in Sanity Studio. Enter the exact English phrase or paragraph and its Marathi equivalent. Published editorial translations override the JSON dictionary. Updates are cached for up to 60 seconds.
- Names, email addresses, URLs, file paths, form values and technical identifiers retain their original values. Text embedded inside images or third-party videos requires a separately localized asset.
- New English text without a translation falls back to English. Add its Marathi counterpart when publishing new content; arbitrary new CMS articles are not automatically machine translated.

## Components

Server-only components use `localized-server-content.tsx`. Client components, including modules imported by client components, use `localized-content.tsx`. These translate React content before rendering and preserve event handlers, refs and submitted values. Use `useTextTranslation()` before splitting animated strings, and `graphemes()` for character animations so Marathi vowel marks and conjuncts stay together. `translate="no"` opts a subtree out.

Metadata and the sitemap provide both language URLs. Marathi uses the bundled Noto Sans Devanagari font with readable line spacing.

Run `node scripts/check-localization.mjs` for dictionary parity, routing, Unicode and React-prop checks. Also verify the affected page in both languages when editing copy or layout.
