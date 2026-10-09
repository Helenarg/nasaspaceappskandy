# Specialist review 09 — Performance, loading, asset delivery and SEO

Reviewed 2026-10-09. Independent viewpoint: a visitor on a constrained mobile connection, and a crawler that may not execute JavaScript. Read-only source inspection; no live submissions, network throttling, or production deployment. This is not a measured Core Web Vitals report.

## Confirmed improvements

- `MissionSection.tsx` now references `cosmic-cliffs.jpg`: **181,336 bytes**, compared with the retained original PNG at **2,884,319 bytes**. This reduces that image's source bytes by approximately **93.7%**. The hero image is **119,859 bytes**. These are filesystem sizes, not compressed HTTP transfer measurements.
- `useViewport.ts` consolidates all consumers onto one `Dimensions` event subscription, tears it down when the last consumer leaves, and supplies a stable server snapshot through `useSyncExternalStore`. `LocalizedText` still updates with viewport changes, but no longer creates an OS dimension listener per text node.
- `Reveal.tsx` begins with progress 1, keeping static HTML readable. Motion enhances already-present content. The server and initial hydrated language both begin in English; the viewport server snapshot is also shared during hydration.
- `motion.ts` shares OS preference and visibility subscriptions, pauses motion when the browser tab is hidden, and respects the visitor's persisted pause preference. `SpaceScene.tsx` uses passive scroll events, schedules at most one frame at a time, and stops its image drift while offscreen. Cleanup removes the observer/listener and cancels outstanding frames.
- `PageMeta.tsx` supplies per-route title, description, canonical, Open Graph and Twitter tags. `public/og-image.png` exists at **36,977 bytes**; the favicon SVG is **332 bytes**. Sitemap entries include the new participation and privacy routes.
- `public/_headers` specifies immutable one-year caching for fingerprinted bundle and asset paths. Verify that the selected production host interprets this file; the local Node preview is not evidence that production headers are configured.
- Firestore imports use `firebase/firestore/lite`. Analytics is intentionally inactive, so no analytics initialization cost is introduced by the current implementation.

## Remaining findings and recommendations

### P2 — Locale link previews are still client-dependent

`I18nProvider` resolves `?lang=si` and `?lang=ta` after mount. Static rendering starts with English. `PageMeta` updates locale and canonical URL in the hydrated app, but a non-JavaScript social crawler fetching one of those URLs receives the English static document. This is an architectural limit, not proof that the user-facing picker is broken.

**Recommendation:** if multilingual search and social sharing become a requirement, generate separate locale routes/documents or use server-rendered locale resolution. Supply corresponding language alternates and localized metadata. Avoid claiming that query parameters alone provide fully localized static SEO.

**Acceptance check:** fetch each deployed locale URL without JavaScript and verify title, description, language attribute and visible body language directly in its response HTML.

### P2 — Shared font loading may be expensive on slow mobile links

`_layout.tsx` loads nine faces: two Fira Sans, three Overpass, two Sinhala Noto Sans and two Tamil Noto Sans. All are requested irrespective of the active language. Render-before-font-load preserves content, but font substitution and the post-hydration language switch can change wrapping and layout. No actual cumulative layout shift value was measured.

**Recommendation:** measure an uncached visit on a representative mobile connection before introducing conditional loading. If font transfer dominates, retain only the body/display weights needed for the current language, with an explicit strategy for language-picker scripts and fallback shaping. Do not sacrifice script correctness for fewer bytes.

**Acceptance check:** record requested font count, transferred bytes, visible fallback behavior and layout shift on English, Sinhala and Tamil cold starts and language changes.

### P3 — Font barrel imports expand exported asset inventory

The inspected installed Google-font package index files statically require every weight. The earlier export contained **54 TTF files totaling 14,183,408 bytes**. That is an export footprint, **not** evidence that all 54 files are downloaded by a visitor. Per-weight import subpaths exist in the installed packages and can limit the reachable export assets.

**Recommendation:** import the specific weight modules and `useFonts` from the font runtime, then compare the next export. Parent notified so this inexpensive optimization can be applied before the final build. Verify types/build and script rendering after any import change.

### P3 — Establish an actual mobile performance budget

The previous export's JavaScript file was **1,762,481 bytes uncompressed**. It predates the final fixes and must not be reported as the final bundle measurement. Large asset files and dependency entries alone do not prove runtime bottlenecks. `expo-blur`, Plus Jakarta Sans and Space Grotesk have no direct `src` references in the inspected search, but removing package entries without bundle evidence is not a performance fix.

**Recommendation:** record the final exported bundle size, then measure cold-load transfer and execution on the deployed host. Prioritize the dominant costs; preserve supported native dependencies unless their purpose is reviewed. Confirm Brotli/gzip delivery and immutable caching on the actual host. Use real mobile traces for LCP, CLS and responsiveness.

## Evidence boundaries

- Asset sizes were read from the current source tree. The existing `dist` at inspection time was stale: it still included the old cosmic PNG and its HTML timestamp was 00:31 on 2026-10-09. Final-export evidence belongs in the parent verification report.
- No actual LCP, INP, CLS, transfer compression, host headers, memory usage or battery measurements were collected. No native-device benchmark was performed.
- Fonts, language metadata, subscriptions and motion behavior were reviewed from implementation. A performance recommendation is distinguished from a reproduced functional failure.
- No application code was changed by this reviewer.
