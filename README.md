# NASA Space Apps Kandy

[![Next.js](https://img.shields.io/badge/Next.js-16.4-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase&logoColor=051A2C)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

The community website for the NASA International Space Apps Challenge in Kandy, Sri Lanka. It brings local event details, the programme, official challenge briefs, NASA Space Apps news, and participation paths into one responsive web experience.

[Live website](https://nasaspaceapps.lk) | [Development deployment](https://nasaspaceappskandy.vercel.app) | [Official Kandy event](https://www.spaceappschallenge.org/2026/local-events/kandy/)

## Highlights

- Responsive event experience built with the Next.js App Router
- Event schedule and registration guidance sourced from the official Kandy listing
- Hourly official news refresh through Incremental Static Regeneration
- Static fallback news bundled with the repository for upstream outages
- Search metadata, Open Graph images, a sitemap, and crawler guidance
- Installable web app manifest and mobile friendly navigation
- English, Sinhala, and Tamil interface dictionaries
- Firebase backed bootcamp interest, volunteer, ambassador, and contact forms

## Rendering and freshness

Stable pages are prerendered during the production build. The `/news` route uses Incremental Static Regeneration with a one hour revalidation window. After that window, visitors continue to receive the cached page while Next.js refreshes official content in the background.

The news loader queries the public NASA Space Apps GraphQL endpoint on the server. It validates official article and image hosts before rendering them. If the endpoint is unavailable, the page uses `src/content/official-news.json` so the route remains useful and indexable.

## Technology

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI | React 19, TypeScript, Motion, Lenis |
| Styling | Project CSS, Overpass Variable, Fira Code Variable |
| Icons | Phosphor Icons |
| Data | Firebase Firestore Lite |
| Rendering | Prerendering and ISR |
| Image delivery | Next.js Image Optimization with Sharp |
| Tests | Node test runner through TSX |

## Local development

Requirements:

- Node.js 20.9 or newer
- npm

Install and start the development server:

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production checks

```sh
npm run lint
npm run typecheck
npm test
npm run build:web
npm start
```

`npm run build:web` creates the server capable Next.js output in `.next/`. `npm start` serves that production build and preserves ISR and optimized image delivery.

The ignored `out/` directory is not used by the current ISR deployment. It is only relevant to a separate static export workflow, which would not provide the hourly server refresh used by `/news`.

## Environment variables

The public Firebase web identifiers are kept in the client configuration because Firebase access is enforced by Firestore rules and App Check. App Check is optional during local development.

Create `.env.local` only when enabling it:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_v3_site_key
```

Register each deployed domain in Firebase App Check before enabling enforcement. Do not place Firebase Admin credentials or other private keys in variables prefixed with `NEXT_PUBLIC_`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Next.js development server |
| `npm run lint` | Check JavaScript, TypeScript, and React rules |
| `npm run typecheck` | Generate Next.js route types and run TypeScript |
| `npm test` | Run form and mission data tests |
| `npm run build:web` | Create the production Next.js build |
| `npm start` | Serve the completed production build |
| `npm run news:sync` | Refresh the bundled news fallback |
| `npm run locations:sync` | Refresh the official event location snapshot |
| `npm run deploy:rules` | Deploy Firestore security rules |

## Deployment

### Vercel

Vercel is the direct deployment target for the current Next.js configuration. Connect the Git repository, keep the Next.js framework preset, and deploy. No output directory override is required. Pull request deployments receive preview URLs, and the production branch can use `nasaspaceapps.lk`.

### Firebase

Use Firebase App Hosting when hosting this server capable Next.js application on Firebase. Classic Firebase Hosting is designed around static assets unless it is paired with additional server infrastructure, so it is not configured in `firebase.json`. Firestore and its security rules remain usable from any supported web host.

### Cloudflare

Use Cloudflare Workers with a supported Next.js adapter for server rendering and ISR. Cloudflare Pages static export does not provide the runtime used by the hourly news refresh. Review the current Cloudflare Next.js guidance before adding an adapter because platform support changes over time.

Choose one provider for the production website. Firebase can continue to provide application data when the frontend runs on Vercel or Cloudflare.

## Project structure

```text
src/
  app/          Routes, metadata, sitemap, and crawler rules
  components/   Shared navigation, sections, forms, and motion UI
  content/      Event settings and verified content snapshots
  i18n/         English, Sinhala, and Tamil interface dictionaries
  lib/          Validation, submissions, Firebase, and official feeds
  styles/       Global, programme, and motion styles
public/         Images, icons, manifest, and static assets
scripts/        Official content synchronization tools
tests/          Validation and submission outcome tests
```

## Application data

Public forms write through the Firebase Lite SDK to the `nasaspaceappskandy` project.

| Page | Collection |
| --- | --- |
| `/join` | `volunteers` |
| `/event-details` bootcamp form | `bootcamps` |
| `/ambassadors` | `ambassadors` |
| `/contact` | `messages` |

The registration page sends participants to the official NASA Space Apps Kandy event listing. Local registration data is not collected by this website.

The bootcamp form records one selected city from Colombo, Kandy, Galle, or Kurunegala. Deploy the updated Firestore rules before enabling the form on a live site.

Form records include server timestamps, their source, application version, and an initial status. Success is shown only after Firebase confirms a write. A timeout is presented as unconfirmed instead of being reported as a definite failure. The website does not read private submissions or claim to send email.

## Official content

The 2026 theme, dates, hybrid participation details, local schedule, and registration flow follow the [official Kandy event listing](https://www.spaceappschallenge.org/2026/local-events/kandy/). Event settings live in `src/content/event.ts`.

The world map uses a bundled snapshot of the official 2026 location directory. Refresh it with `npm run locations:sync`, review the resulting changes, and rebuild. Kandy is the featured local marker. The Universal Event is counted without an invented physical location.

Challenge and award source links are recorded in `src/content/official-program.json`, with optimized local images under `public/images/official/`. Challenge cards link to their official briefs. Award categories are labelled with their published event year.

The official news page refreshes automatically during ISR. `npm run news:sync` updates the bundled fallback snapshot for resilience and reviewable source control changes.

## Brand system

The interface uses a fixed dark space palette with deep blue surfaces, Electric Blue gradients, Neon Yellow calls to action, and Rocket Red location markers. Overpass and Fira Code are self hosted through Fontsource. The layout uses structured rails, clear typography, compact data labels, and responsive card compositions.

## Contributing

1. Create a focused branch.
2. Keep event claims tied to an official source.
3. Preserve responsive behavior and keyboard access.
4. Run every production check listed above.
5. Open a pull request with screenshots for visual changes.

Do not send test form submissions to the production Firebase project.
