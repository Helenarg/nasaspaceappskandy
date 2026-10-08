# Deploying nasaspaceapps.lk

Everything here runs on free tiers: Cloudflare Pages (hosting) + Firebase Spark
(form submissions). No server to run, no card on file.

## 1. Build

```bash
npm run build:web
```

Output lands in `dist/`: one pre-rendered HTML file per route (`/`, `/about`,
`/events`, …), the JS bundle under `_expo/static/`, and everything from `public/`
(`_headers`, `robots.txt`, `sitemap.xml`).

Because the routes are pre-rendered, crawlers and link previews get real titles,
descriptions and page text rather than an empty SPA shell.

## 2. Cloudflare Pages

Dashboard → Workers & Pages → Create → Pages → Connect to Git.

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | `npm run build:web` |
| Build output directory | `dist` |
| Node version | 20 or newer (set `NODE_VERSION=20` under Environment variables) |

Then Custom domains → add `nasaspaceapps.lk` and `www.nasaspaceapps.lk`.
Cloudflare issues the TLS certificate automatically once the domain's nameservers
point at Cloudflare.

Free tier limits that matter: unlimited bandwidth, unlimited sites, 500 builds per
month, 100 custom domains. A hackathon site will not come close.

`public/_headers` already sets HSTS, `X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`, and immutable caching for fingerprinted
assets. Cloudflare applies it automatically — no extra configuration.

### Vercel instead

Build command `npm run build:web`, output directory `dist`, framework preset
"Other". Note the Hobby tier is for non-commercial use; a sponsored event site may
need the Pro plan, which is why Cloudflare Pages is the primary target.

## 3. Firebase (form submissions)

The four forms (`/register`, `/join`, `/ambassadors`, `/contact`) write to
Firestore collections `registrations`, `volunteers`, `ambassadors`, `messages`.

One-time setup by whoever owns the Firebase project:

1. Firebase console → Build → Firestore Database → Create database.
   Pick **production mode** and location **asia-south1 (Mumbai)** — closest region
   to Sri Lanka. The location cannot be changed later.
2. Deploy the rules in this repo:
   ```bash
   npx firebase-tools login
   npx firebase-tools deploy --only firestore:rules --project nasaspaceappskandy
   ```
   `firestore.rules` allows create-only access with per-field type and length
   checks, and blocks every read, update and delete from the client. Organisers
   read submissions in the Firebase console (or export with the Admin SDK).
3. Turn on **App Check** (console → Build → App Check) with reCAPTCHA v3 for the
   web app, then enforce it on Cloud Firestore. This is what stops a scripted flood
   of fake registrations. It needs a reCAPTCHA v3 site key — see the organiser
   checklist.

Until step 1 is done, forms show "The server is not responding…" after 12 seconds
rather than hanging or silently pretending to succeed.

Spark (free) tier gives 1 GiB storage, 50k document reads and 20k writes per day.
A 500-participant event uses a fraction of one day's quota.

### Exporting submissions

Firebase console → Firestore → collection → ⋮ → Export, or:

```bash
npx firebase-tools firestore:export gs://<bucket>/backups/$(date +%F) --project nasaspaceappskandy
```

## 4. Checks before each deploy

```bash
npm run typecheck   # tsc, with a larger V8 stack (see package.json)
npm run build:web   # must finish with "Exported: dist"
```

## Regenerating the map outline

`src/theme/sriLankaGeo.ts` holds the Sri Lanka coastline path, derived from
geoBoundaries gbOpen LKA ADM0 (OpenStreetMap data, ODbL 1.0) — not drawn by hand.
To refresh it, download
`geoBoundaries-LKA-ADM0_simplified.geojson` from geoboundaries.org and re-run the
projection described in the file header. Keep the attribution line in the footer:
ODbL requires it.
