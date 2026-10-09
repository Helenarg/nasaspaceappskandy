# Post-fix inspection results

Branch: space-apps-rebrand. Ten separate specialist reviewers reviewed the revised project. Their individual reports are preserved beside this document; findings reflect their inspection time, with final resolutions below.

| Reviewer | Scope |
|---|---|
| 01 | Tamil copy, grammar and script typography |
| 02 | Sinhala copy, grammar and script typography |
| 03 | Personal data, validation, receipt safety and Firestore rules |
| 04 | Motion, reduced motion, lifecycle and performance |
| 05 | Keyboard use, semantics, focus and accessibility |
| 06 | Mobile/tablet layout, spacing and overflow |
| 07 | Every page, content accuracy and official-event boundaries |
| 08 | Forms, selection behavior, errors and resets |
| 09 | Assets, fonts, static rendering and resource cost |
| 10 | Dependencies, native compatibility and deployment |

## Resolved in the final integration

- Replaced fabricated local speakers, schedules, sponsors, news and prizes with honest announcement states and working official/contact links. Shared global event dates are November 14–15, 2026; local venue/schedule remain unconfirmed. Official registration is distinct from local interest.
- Unified section spacing, increased form readability, stacked registration tracks at tighter widths, constrained the contact graphic and allowed statistics units to wrap.
- Expanded whole-sentence Sinhala/Tamil dictionaries across all twelve content routes, forms, notices and accessible labels. Persisted native language selection and guarded asynchronous preference reads.
- Named the outer navigation dialog, added first-invalid input focus, linked field errors/hints and exposed current/selected/required states. Language buttons provide adequate touch targets.
- Repaired stopped animation loops, paused background/inactive-route work, persisted motion preferences, and applied the pause setting to CSS transitions as well as JavaScript animation. Reduced-motion navigation avoids fades.
- Locked details during uncertain receipts, reused the attempt ID/payload, prevented concurrent sends, retained truthful error messages, reset selected dates and stopped active-tab clicks from clearing skills. Corrected skill/date choices clear stale errors.
- Closed local submissions until explicitly configured; initialized App Check before writes, disabled analytics, tightened create-only field rules and supplied privacy/participation guidance.
- Supplied the missing social image, retained the orbital favicon, compressed Cosmic Cliffs from 2.88 MB to 181 KB, and imported only required font weights.
- Aligned Reanimated/Worklets with the installed Expo57 native version declarations. Rewrote deployment and language documentation to describe actual behavior.

## Verification and limits

The form receipt tests use mocked Firestore and exercise concurrent requests, timeout uncertainty, stable identity, frozen payload, cached success and honest errors. They send no data. Final lint, typecheck, export and browser evidence are recorded below after completion.

Live Firebase provisioning, App Check enforcement, deployed rules/headers, real email operation, emulator rules testing and native device behavior are not certified. Forms remain paused by default until organizer configuration and policy details are verified. Reload-safe idempotency requires backend work. Static locale SEO begins in English; dedicated localized exports/hreflang remain future work. Language reviews do not replace a native-speaker editorial review. Remaining dependency advisories need a compatible vendor path rather than a forced SDK downgrade.

## Final browser evidence

All twelve content routes rendered with one main landmark and a primary heading at the browser's actual 1280px width. No visible actionable control extended beyond the viewport; the intentionally offscreen honeypot is aria-hidden and removed from tab order. Registration validation focused TEAM NAME and exposed aria-required, aria-invalid and linked error descriptions. The outer navigation dialog has role=dialog, aria-modal=true and an accessible name. Tamil ambassador fields, all nine provinces and privacy links were verified in the rendered DOM. Sinhala homepage headings, dates, controls and body copy were verified; its global pause control set data-motion-paused=true and was restored.

The viewport API accepted a 320px request but both DOM measurements and screenshots remained 1280px, including in a new tab. The override was reset. Therefore this inspection does **not** claim successful rendered mobile/tablet testing. Narrow-width fixes have source-review evidence, and require a working responsive browser/device check before release.

The online Expo check passed after supported patch updates. Compatible security leaf updates removed the critical advisory; 32 high/moderate dependency findings remain (22 high,10 moderate). These are package advisory counts, not demonstrated website exploits.

## Completed build checks

- npm run lint: passed.
- npm run typecheck: passed.
- node scripts/postfix-formtests.cjs: passed.
- npx expo install --check (online): dependencies up to date.
- npm run build:web: passed; 14 exported routes including sitemap/not-found, bundle entry-8be1afcbc0e8104a1aab758f89c73444.js.
- The rebuilt hydrated DOM verifies both homepage hackathon links point to the official website and the map accessible label is localized.
- Font export: 9 TTF files, 2121116 bytes.

Screenshots: [Sinhala homepage](screenshots/sinhala-home.png), [Tamil ambassadors](screenshots/tamil-ambassadors.png), [English homepage](screenshots/english-home.png).
