# Suman Media - Production CMS & SEO Infrastructure

This repository intentionally keeps the current visual website implementation unchanged. The production foundation is prepared so the final website can later consume the CMS without redesigning the infrastructure again.

## 1. Architecture

- Next.js 16 App Router: public frontend and server routes
- Sanity Content Lake: public/editorial content
- Embedded Sanity Studio: `/studio`
- PostgreSQL + Prisma: contact, newsletter, career application and other transactional data
- S3: private resume/application uploads
- Cloudflare Turnstile: form abuse protection
- Signed Sanity webhook: cache revalidation
- Sanity Viewer token: server-only draft preview access

Never store private applications, CVs, secrets or transactional form data in public Sanity documents.

## 2. Sanity environments

Recommended minimum:

- `production`: live editorial content
- `staging`: optional pre-production testing dataset

Do not share write tokens with the public frontend. `SANITY_API_READ_TOKEN` is server-only and must have Viewer/read permissions only.

## 3. Required production environment variables

Use `infrastructure/env/production.env.example` as the deployment template.

Important CMS variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL`
- `SANITY_API_READ_TOKEN` - server-only Viewer token
- `SANITY_REVALIDATE_SECRET` - random 32+ character webhook secret

Important SEO safety variable:

- `NEXT_PUBLIC_ALLOW_INDEXING=true` on production
- set it to `false` on staging/preview deployments

Production startup validation fails fast when mandatory secrets/configuration are missing or invalid.

## 4. Install and generate CMS types

```bash
npm install
npm run sanity:typegen
```

TypeGen performs:

1. `sanity schema extract`
2. `sanity typegen generate`

Generated types are written to `src/sanity/sanity.types.ts`.

Run before merging schema/query changes:

```bash
npm run cms:check
```

## 5. Studio

Local website + embedded Studio:

```bash
npm run dev
```

Open:

- Website: `http://localhost:3000`
- Studio: `http://localhost:3000/studio`

The Studio contains two protected singletons:

- Site Settings
- Home Page

and collections for Services, Companies, Industries, Projects, Insights, Authors, Categories and Jobs.

## 6. CORS

The embedded Studio and Presentation preview require trusted origins with credentials enabled.

Development:

```bash
npx sanity cors add http://localhost:3000 --credentials
```

Production:

```bash
npx sanity cors add https://www.example.com --credentials
```

Do not grant credentialed wildcard access to domains you do not fully control.

Inspect existing origins:

```bash
npx sanity cors list
```

## 7. Draft Mode / Presentation Tool

Infrastructure is configured for secure Draft Mode:

- `/api/draft-mode/enable`
- `/api/draft-mode/disable`
- Presentation Tool in Sanity Studio
- document-to-route resolvers for the routes that currently exist

The Viewer token remains server-side. Do not rename it to a `NEXT_PUBLIC_*` variable.

The final UI can later add Sanity Visual Editing overlays and draft-aware rendering. They are deliberately not injected into the current UI in this infrastructure phase.

## 8. Webhook revalidation

Create a Sanity webhook pointing to:

`https://YOUR_DOMAIN/api/webhooks/sanity`

Use the same secret as `SANITY_REVALIDATE_SECRET`.

Recommended trigger:

- Create
- Update
- Delete

Use the projection documented in `SANITY_SETUP.md`. The endpoint verifies Sanity's signature before accepting paths.

## 9. CMS health monitoring

Application/database readiness:

`GET /api/health`

Sanity readiness:

`GET /api/health/cms`

The CMS endpoint does not expose tokens or content. It performs a minimal Content Lake query and reports status/latency.

Use both endpoints in monitoring. A database outage and CMS outage are different failure modes.

## 10. Sanity backup

Manual backup:

```bash
npm run sanity:backup
```

Default location:

`./backups/sanity/`

Default retention: 30 days.

Override with:

- `SANITY_BACKUP_DIR`
- `SANITY_BACKUP_RETENTION_DAYS`

Schedule this command through your deployment platform/cron and copy backups to durable encrypted storage.

PostgreSQL has a separate backup script at `infrastructure/scripts/backup-db.sh`.

## 11. Sanity configuration check

```bash
sh infrastructure/scripts/check-sanity.sh
```

It checks schema extraction, document validation and current CORS configuration.

## 12. SEO infrastructure already prepared

The infrastructure includes:

- canonical metadata helpers
- Open Graph/Twitter metadata support
- no-index controls
- CMS-aware sitemap foundation
- robots rules
- staging-wide indexing kill switch
- reusable JSON-LD builders for Organization, WebSite, Breadcrumb, Article and JobPosting
- safe JSON-LD serialization

The JSON-LD utilities are intentionally not injected into current UI/page markup yet. They are ready for the later full-site implementation.

## 13. Sanity image infrastructure

`src/sanity/lib/image.ts` provides the image builder for future CMS-driven UI.

It enables Sanity's image pipeline with automatic output format and optional width/height/quality settings. `next.config.ts` permits optimized Next.js image requests from `cdn.sanity.io`.

No existing image component has been replaced in this phase.

## 14. Production Next.js configuration

`next.config.ts` now includes:

- standalone output required by the Docker runner
- removal of the `X-Powered-By` header
- safe baseline security headers
- HSTS in production
- API `no-store` response policy
- Sanity CDN image allow-list

A restrictive site-wide CSP is intentionally not hardcoded yet because the final website may use analytics, embedded media, Sanity Presentation, third-party players and other domains. Define the final CSP only after the final integration inventory is known.

## 15. Indexing policy

Production:

```env
NEXT_PUBLIC_ALLOW_INDEXING=true
```

Staging / preview:

```env
NEXT_PUBLIC_ALLOW_INDEXING=false
```

When disabled:

- root metadata returns `noindex, nofollow`
- `robots.txt` disallows crawling

This protects staging from accidental search-engine indexing.

## 16. Deployment sequence

Recommended release sequence:

```bash
npm ci
npm run sanity:typegen
npm run lint
npm run typecheck
npm run build
npm run db:deploy
```

Then deploy and check:

- `/api/health`
- `/api/health/cms`
- `/robots.txt`
- `/sitemap.xml`
- `/studio`
- Sanity draft-mode preview
- Sanity webhook revalidation

## 17. Secrets policy

Never commit:

- Sanity Viewer tokens
- Sanity webhook secrets
- AWS credentials
- Turnstile secret
- database passwords
- `IP_HASH_SECRET`

Rotate a secret immediately if it appears in git history, logs, screenshots or client-side bundles.

## 18. Dataset/content security

For normal public marketing content, a public dataset is operationally simple and the frontend can use the API CDN.

If the dataset is made private, all public frontend reads must remain server-side and use a read token. Never ship a Sanity token into browser JavaScript.

Treat sensitive Media Library assets separately; editorial assets should not be assumed confidential merely because document access is restricted.

## 19. Before the final website build

The infrastructure is ready. The later website implementation should wire, not reinvent:

- CMS data into visual sections
- Portable Text renderer
- Sanity images into `next/image`
- dynamic Project/Job/Industry pages
- generated JSON-LD into page markup
- Visual Editing overlays
- CMS references into internal links
- all dynamic document types into sitemap only after corresponding public routes exist

That later work can happen without changing the production CMS architecture established here.
