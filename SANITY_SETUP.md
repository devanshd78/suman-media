# Sanity setup

The project contains an embedded Sanity Studio at `/studio` plus production-ready CMS infrastructure. Existing website UI remains intentionally untouched during this setup phase.

## Environment

Copy `.env.example` to `.env.local` and set:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-08-21
NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL=http://localhost:3000
SANITY_API_READ_TOKEN=
SANITY_REVALIDATE_SECRET=
```

`SANITY_API_READ_TOKEN` must be a server-only Viewer token. Never prefix it with `NEXT_PUBLIC_`.

## Install

```bash
npm install
npm run sanity:typegen
npm run dev
```

Studio: `http://localhost:3000/studio`

## CORS

For embedded Studio / Presentation:

```bash
npx sanity cors add http://localhost:3000 --credentials
npx sanity cors add https://YOUR_DOMAIN --credentials
```

## Webhook

Endpoint:

```text
POST https://YOUR_DOMAIN/api/webhooks/sanity
```

Secret: use `SANITY_REVALIDATE_SECRET`.

Recommended webhook projection:

```groq
{
  "paths": array::compact([
    "/",
    select(
      _type == "service" => "/services",
      _type == "company" => "/companies",
      _type == "post" => "/insights",
      _type == "project" => "/portfolio",
      _type == "job" => "/careers",
      null
    ),
    select(_type == "service" && defined(slug.current) => "/services/" + slug.current, null),
    select(_type == "company" && defined(slug.current) => "/companies/" + slug.current, null),
    select(_type == "post" && defined(slug.current) => "/insights/" + slug.current, null),
    "/sitemap.xml"
  ])
}
```

Do not add future Project/Job/Industry detail paths until those routes actually exist.

## Draft preview

The Presentation Tool is configured with secure Draft Mode endpoints:

- `/api/draft-mode/enable`
- `/api/draft-mode/disable`

Current route resolvers cover Home, Services, Companies and Insights because those routes already exist. Future route resolvers can be added when the full website is created.

## TypeGen

```bash
npm run sanity:typegen
```

The command extracts the Studio schema and generates query/schema types into:

`src/sanity/sanity.types.ts`

## Validation

```bash
npm run sanity:validate
sh infrastructure/scripts/check-sanity.sh
```

## Backup

```bash
npm run sanity:backup
```

See `PRODUCTION_SETUP.md` for the complete production runbook.
