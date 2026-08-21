# Suman Media corporate website

Next.js corporate website for Suman Media & Entertainment with Sanity CMS for public editorial content and PostgreSQL/Prisma for private form submissions.

## Local development

1. Copy `.env.example` to `.env.local` and configure the required values.
2. Install dependencies:

```bash
npm install
```

3. Generate Prisma and start Next.js:

```bash
npm run dev
```

Website: `http://localhost:3000`

Sanity Studio: `http://localhost:3000/studio`

See `SANITY_SETUP.md` for the CMS model, CORS configuration and webhook setup.

## Architecture

- **Next.js 16 / React 19** — frontend and server routes
- **Sanity** — company website content, SEO, services, companies, industries, projects, insights and jobs
- **PostgreSQL + Prisma** — contact, newsletter and career application records
- **S3** — private resume/document storage

## Checks

```bash
npm run check
```

This runs ESLint, TypeScript/Prisma checks and the production Next.js build.
