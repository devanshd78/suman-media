# Project analysis — 22 October 2026

## Assessment

This is a substantial corporate media website with a sensible separation between public editorial content, private submissions, and uploaded documents. It is not yet ready for a clean production release: the existing quality checks fail, several advertised destinations are incomplete, and the deployment context needs hardening.

This review covers the route inventory, shared UI, CMS integration, form APIs, validation, storage, database schema, SEO, media assets, and Docker/Nginx configuration. Findings below distinguish observed code problems from deployment-dependent risks. No application code was changed.

## Architecture

| Area | Implementation |
| --- | --- |
| Application | Next.js 16.2.12 App Router, React 19.2.4, strict TypeScript |
| Public site | 23 page files under `src/app/(website)`, including three dynamic detail routes |
| Styling and motion | Tailwind 4, CSS modules, Framer Motion, GSAP, Lenis; Three.js/React Three Fiber code also present |
| Content | Sanity schemas and GROQ queries, embedded `/studio`, live fetching and draft previews |
| Private records | PostgreSQL through Prisma 7 and the PostgreSQL adapter |
| APIs | 10 route handlers covering contact, newsletter, careers, upload signing, country codes, health, preview, and CMS webhooks |
| Uploads | Short-lived S3 PUT URLs for private résumé storage |
| Deployment | Standalone Next.js image, separate migration service, PostgreSQL, Nginx TLS proxy |

The website layout supplies the shared header, footer, scrolling behavior and Sanity live integration. Server-side data helpers feed CMS content into presentation components. Business vertical pages are largely custom client-side compositions. Contact requests pass through validation, rate limiting and Turnstile before being stored. Career applications additionally check that a résumé object exists.

## Confirmed release issues

### 1. TypeScript fails on import casing — high priority

`src/app/(website)/abhijat-marathi/page.tsx:1–4` imports `@/components/Abhijat-Marathi/...`, while the actual directory is `src/components/abhijat-marathi`.

`npm run typecheck` reports four TS1261 errors. This also creates a module-resolution problem on case-sensitive Linux deployments. Normalize the imports to the actual directory spelling before release.

### 2. The lint gate fails — high priority

`npm run lint` reports **33 problems: 10 errors and 23 warnings**. The script uses `--max-warnings=0`, so both categories matter.

Errors include synchronous state updates inside effects in the creator ecosystem page and the client, FAQ, header, and monetization components. These are failures of the configured lint rules; they do not establish that every affected interaction crashes. Refactor initialization and derived state deliberately, then rerun the existing check command.

### 3. Docker includes the unrestricted local build context — high priority

There is no `.dockerignore`. `Dockerfile:12` uses `COPY . .`, and this checkout contains `.env`, `node_modules`, and build outputs.

Local environment files can enter builder layers and influence `next build`. Host dependencies and build artifacts can also overwrite or contaminate the Linux builder's inputs. This is a concrete packaging problem; the review does not establish that secrets have been published or that every builder file reaches the final image.

Add a Docker ignore policy for secrets, local dependencies, build artifacts, Git metadata, backups and certificates. Supply build configuration explicitly and keep runtime credentials outside the build context.

### 4. Public routes expose unfinished content — high priority

`/services`, `/companies`, and `/portfolio` render `PagePlaceholder`, including “Component handover point” and instructions for developers. All three appear in the sitemap.

Build their intended listings or remove them from public navigation and indexing until complete.

### 5. Footer destinations have no corresponding routes — high priority

`src/components/landing/footer.tsx` renders links for `/leadership`, `/case-studies`, `/terms`, `/privacy`, multiple `/products/...`, `/investors/...`, and `/solutions/...` destinations that are absent from the route tree. The configured redirects cover only legacy insights URLs.

For example, the footer links to `/products/monetization`, while the implemented page is `/monetization`. Map navigation to real routes and add intended missing pages. CMS-backed service slugs require separate verification against the published dataset.

### 6. Contact form rejects the no-Turnstile development path — medium priority

`src/components/contactus/contact-form/page.tsx:181` always sends `turnstileToken` as a string, falling back to `""`. `src/lib/validation/contact.ts:19` accepts an absent token but rejects an empty string. Parsing happens before the development bypass in `requireTurnstile`.

Consequently, an otherwise valid local submission without a configured widget fails validation. Omit an absent token or normalize empty values before validation. The widget lifecycle also deserves a browser test across navigation, success and retries; the current component uses implicit script rendering and does not explicitly reset the widget.

### 7. Careers backend is not connected to an in-site application flow — medium priority

The project has résumé signing and career submission endpoints, but no frontend callers were found for those helpers. `career-openings.tsx` links to a CMS `applyUrl` or defaults to `/contact`. “Share your CV” also leads to `/contact`, whose form has no upload field.

If external recruitment URLs are intentional, configure them consistently. Otherwise implement the upload/application UI and retain the selected job reference.

## CMS and content behavior

- **Empty and unavailable content are conflated.** Career fetching returns an empty array on failure or no openings; the UI then shows four hardcoded jobs. Intentionally closing all vacancies therefore restores fallback vacancies. News similarly replaces an empty result with reference articles. Use distinct empty, failed and configured states.
- **Fallback editorial text includes implementation copy.** `reference-content.ts:240` tells public readers that Sanity can replace local fallback assets. Review fallback content as publishable content rather than developer scaffolding.
- **Revalidation parameters are misleading.** `src/sanity/lib/live.ts` accepts `revalidate` but does not forward it. Callers specify 60-, 900- and 3600-second values that do not control this wrapper. Live invalidation may be intentional, but comments promising timed refreshes should match actual behavior.
- **CMS capability is broader than UI coverage.** The schemas support services, companies and projects, but their public listing pages remain placeholders. Several business pages contain hardcoded presentation content instead of editorial data.

## Security and operations

Existing strengths include Zod validation, normalized email addresses, honeypots, action-aware Turnstile verification, bounded in-process rate-limit storage, private S3 uploads, request IDs, generic unexpected-error responses, signed CMS webhooks, and production environment validation. The production container runs as a non-root user with a read-only filesystem, restricted capabilities and a writable cache volume. Migrations run before the app starts.

Remaining risks:

- `getClientIp` trusts `CF-Connecting-IP` or the first forwarded IP. Nginx also trusts the incoming Cloudflare header and appends forwarded values. If the origin is directly reachable without a trusted-proxy restriction, callers can spoof these values and evade IP limits. Verify the actual network boundary; it is not established by this repository.
- The limiter is per process. Replicas and restarts do not share counters. A shared limiter is needed if deployment scales beyond this design assumption.
- `readJson` buffers the full body before checking its measured size. Nginx imposes a 1 MB cap in the supplied deployment, but application-only hosting does not gain a streaming limit from this helper.
- Résumé acceptance checks object existence, not ownership, file contents or malware. The application API also accepts a job reference without verifying that the job is open. Consider an upload receipt tied to the application and a file-validation workflow before staff consume uploads.
- Newsletter persistence is implemented, but no delivery integration, confirmation flow or unsubscribe endpoint was found. Treat it as stored subscription intent until those workflows exist.
- Backup scripts exist; scheduling, off-host retention and restoration were not demonstrated by this review.

## SEO, performance and maintainability

The shared metadata helpers, canonical URLs, robots file and escaped JSON-LD provide a useful foundation. However, business, media, government, capital-market and other vertical pages lack route-specific metadata. The sitemap omits these implemented vertical pages while including unfinished listings. The metadata helper also defaults to `index: true` independently of the global indexing flag; the configured response header still supplies protection when indexing is disabled, but metadata should agree with it.

The `public` directory contains **300 files totaling 286,119,722 bytes (about 273 MiB)**. The largest video is approximately 25.4 MiB; several source images are 7–9 MiB. This is repository asset size, not the transfer size of a page. Image optimization, responsive sizes, video visibility gating and real browser measurements must determine actual page cost.

There are positive performance choices: a shared Sanity image loader, lazy image defaults, centralized font instances, visibility helpers, reduced-motion handling and native scrolling for coarse pointers. Several large client components and overlapping animation libraries still increase maintenance complexity. Some TSX files exceed 80 KB, and shared header/footer files are unusually long. Extract cohesive sections and isolate interactive portions after correctness issues are resolved.

No automated test suite or tracked GitHub Actions workflow was found. Existing lint/type/build scripts are valuable, but do not verify forms, links, responsive behavior or CMS failure modes. Add targeted route/link checks and end-to-end tests for contact submission and the chosen recruitment flow.

## Recommended sequence

1. Fix import casing and the existing lint failures; establish a passing build.
2. Add `.dockerignore` and verify the deployment's trusted-proxy boundary.
3. Replace placeholders and repair navigation destinations.
4. Correct contact token handling and complete or clarify recruitment integration.
5. Separate CMS empty states from fallbacks and align caching documentation with implementation.
6. Complete metadata/sitemap coverage, then measure mobile performance and accessibility in a browser.

## Verification boundaries

Prisma client generation succeeded. TypeScript and lint failed as detailed above. `npm run build` remained at the compilation stage without further output for several minutes and was interrupted; production build success is unverified, and no cause for the delay was established. No database records, CMS documents, S3 objects or external messages were created. Live service connectivity, production credentials, browser interaction, accessibility and load performance were not verified. Existing audit documents were treated as historical context rather than evidence that the current checkout passes.
