# File and folder naming

- Use lowercase kebab-case for application files, folders, routes, and assets.
- Describe a component's purpose: `revenue-models-section.tsx`, not `middlepage.tsx`.
- Give shared components descriptive filenames; reserve `page.tsx` for Next.js routes.
- Keep CSS modules beside their component with the same descriptive base name.
- Name assets after their content or role. Use numbered sequences only for related gallery items.
- Spell out domain names in folders, such as `publications-and-intellectual-property`.
- Keep established technical terms such as `api`, `ui`, `http`, and `seo` where appropriate.
- Preserve framework, tooling, generated-client, and database-migration naming requirements. Do not manually rename generated files.
- Update imports, stylesheet URLs, asset references, navigation, and sitemap entries when renaming files. Add redirects when changing public routes.
- Match import casing exactly so the application works on both Windows and Linux.
