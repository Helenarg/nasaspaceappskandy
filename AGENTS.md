# NASA Space Apps Kandy repository guidance

## Architecture

- Use the Next.js App Router and the Node.js runtime.
- Keep stable routes prerenderable. Use Incremental Static Regeneration for official content that needs scheduled refreshes.
- The official news feed refreshes every hour and must keep the bundled snapshot as its failure fallback.
- Read the installed Next.js guides in `node_modules/next/dist/docs/` before changing framework code.
- Pages live in `src/app/`, shared UI in `src/components/`, content in `src/content/`, and application services in `src/lib/`.

## Content and design

- Follow the dark space design, responsive layouts, dashed structural rails, and established footer composition.
- Use Neon Yellow for primary calls to action and Rocket Red for location markers.
- Do not invent event dates, schedules, sponsors, prizes, people, attendance figures, or official claims.
- Link official NASA Space Apps material to its source and keep local Kandy content clearly identified.

## Data and safety

- Preserve Firebase collection and validation contracts.
- Never submit test data to the production Firebase project.
- Keep private credentials out of browser code and public environment files.
- Treat the generated `.next/` directory and ignored `out/` directory as build artifacts.

## Quality gates

Run these commands before finishing code changes:

```sh
npm run lint
npm run typecheck
npm test
npm run build:web
```

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev`. Verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
