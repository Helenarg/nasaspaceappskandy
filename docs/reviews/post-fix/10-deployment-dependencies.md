# Reviewer 10 — deployment, dependencies and native compatibility

Inspection date: 9 October 2026, Asia/Colombo. Read-only review of the post-fix working tree. No packages upgraded, backend requests sent, rules deployed or native directories generated.

## Result

The web/native boundaries and static output configuration are mostly deliberate, but the dependency tree has a confirmed native peer mismatch and unresolved security advisories. Deployment instructions lag behind the new closed-by-default form policy. This review does not certify the production Firebase rules, App Check enforcement, deployed headers or native device behavior.

## Verified checks

- `package.json`: Expo `~57.0.24`, Router `~57.0.22`, React Native `0.86.3`; SecureStore `~57.0.4` and Localization `~57.0.2` match the installed SDK's bundledNativeModules declarations.
- Native language persistence calls SecureStore only outside web; locale detection uses `getLocales()[0]?.languageCode`, supported by [SDK 57 Localization](https://docs.expo.dev/versions/v57.0.0/sdk/localization/). Async preference loading checks a revision counter, avoiding overwriting a user's newer choice.
- Web localStorage/window access occurs behind platform/browser guards or post-mount effects. Static initial language remains English to avoid a hydration mismatch.
- `app.json` registers both config plugins; no manually generated `ios/` or `android/` directories required.
- App Check initializes only on web with a site key. Submission readiness additionally requires `EXPO_PUBLIC_ENABLE_LOCAL_FORMS === 'true'`; native submissions remain closed. This is frontend gating, not proof of backend enforcement.
- Sitemap includes all twelve content routes, including privacy and participation; the static HTML shell has the versioned orbital SVG favicon and baseline CSS.
- Source `_headers` contains HSTS, frame denial, nosniff, referrer policy and permissions policy. Actual server delivery remains unverified.
- `npm audit --json` fetched advisory metadata without dependency changes. It reported **35 package findings: 1 critical, 24 high, 10 moderate**. These include propagated findings and are not 35 independently demonstrated website exploits.
- Offline `expo install --check` printed “Dependencies are up to date” **and** “Dependency validation is unreliable in offline-mode.” Treat this as an incomplete compatibility check. expo-doctor was not installed locally and was not downloaded; no doctor pass is claimed.

## Findings and acceptance criteria

### P1 — installed Worklets/Reanimated versions conflict with SDK 57

`npm ls react-native-reanimated react-native-worklets --all` flags Worklets `0.13.0` invalid for `expo-modules-core@57.0.18`, whose declared peer supports `^0.7.4 || ^0.8.0 || ^0.9.0 || ^0.10.0`. Router's transitive Reanimated `4.7.0` pulls Worklets `0.13.0`. Installed `expo/bundledNativeModules.json` instead specifies Reanimated `4.5.1` and Worklets `0.10.1`.

Recommended bounded remediation: `npx expo install react-native-reanimated react-native-worklets`, resolving the SDK-supported direct pair. Do not adopt the newest Reanimated by memory. Acceptance: `npm ls` has no invalid worklets peer, online `expo install --check` and expo-doctor pass, then typecheck/lint/export and a development build/device smoke test. No native compatibility claim should precede that device test.

### P1 — security advisory remediation requires a bounded dependency update

Confirmed installed leaf versions:

| Package | Installed | Audit-supported patched target / caveat |
|---|---|---|
| shell-quote | 1.10.0 | 1.11.0; compatible with react-devtools-core's `^1.6.1` range |
| source-map-js | 1.2.1 | 1.2.2; compatible with PostCSS's `^1.2.1` range |
| @grpc/grpc-js | 1.9.16 | >=1.13.6; **outside** Firestore's `~1.9.0` range, so needs vendor update or separately validated override |
| decode-uri-component | audit says <=0.4.2 | Router path; audit proposes SDK58 Router migration, not an established SDK57-compatible patch |

The [critical shell-quote advisory](https://github.com/advisories/GHSA-pqg4-j6r4-53mv) involves a line terminator following a comment token being passed into a shell command. Presence in development tooling does not demonstrate exploitability in exported browser code. It still merits patching before accepting untrusted development inputs. Use bounded leaf updates for shell-quote/source-map-js, re-audit, and inspect remaining vendor release paths separately.

**Do not run `npm audit fix --force`.** The audit suggests Expo44, RN0.72 and Firebase9 downgrades for some propagated findings; these break the current SDK57 stack. Reanimated/native dependencies also need Expo version resolution. Braces, node-forge, uuid and other findings remain vendor/dependency triage items until a compatible tested resolution exists.

Acceptance: lockfile contains patched compatible leaves, fresh audit is recorded, SDK checks/typecheck/lint/static export pass; remaining advisories have explicit disposition and do not disappear behind a “security passed” claim.

### P2 — deployment documentation describes obsolete form behavior

`docs/DEPLOY.md` currently says forms normally write to Firestore and time out after twelve seconds until Firestore setup. Actual `submissionsReady()` now requires a web runtime, a built-in site key and the explicit enable flag. Document both build-time flags, default-closed behavior, authorized-domain configuration and the separate organizer obligation to deploy and verify rules/App Check. Rebuilding the static bundle is necessary when public environment variables change.

The document also omits lint from deployment checks and states dynamic service/pricing limits as guarantees. Its `firebase-tools firestore:export` example should be checked against official current Firebase backup/export documentation before use. No backup path was executed in this review.

Acceptance: a fresh organizer can follow docs to build the closed state, configure a deliberate opening, verify deployment controls and run lint/typecheck/export without relying on false readiness or a broken backup command.

### P3 — native locale fallback and app branding remain polish opportunities

If SecureStore rejects, the catch currently leaves English rather than applying the device locale. A safe fallback can call `getLocales()` even after a storage failure while retaining the revision guard. This affects language convenience, not successful manual switching. Android device-language changes during a running session are not observed; the SDK docs recommend rereading locale on foreground if automatic synchronization is desired. A saved manual choice should continue to take priority.

Only the web favicon was redesigned; app icon and Android adaptive assets retain their existing files and pale background. Native branding is separate scope and should be visually checked before a native release.

## Limits

No live hosting/Firebase inspection, production submission, emulator/native build, real screen reader or SecureStore failure simulation. Versioned SecureStore docs URL failed through the web tool, so the exact installed types/config were inspected instead; no unsupported new API was added. This is source and dependency review evidence, not a deployment certificate.

## Root integration resolution

**Release-check follow-up, 9 October 2026:** see [current release evidence](../release/RESULTS.md). The clean install, Expo Doctor (21/21), lint/typecheck, all-platform bundle generation and 86 isolated Firestore rule assertions now pass. Auditing fell from 32 findings to 18 high findings after tested overrides; guarded local mitigations and remaining upstream warnings are documented in [dependency maintenance](../../DEPENDENCIES.md). Responsive checks now use real iframe CSS widths rather than the unsupported browser viewport override. Live-host/App Check, physical devices and native-speaker approval remain external gates. Earlier findings retain their historical context.

Expo's online compatibility check requested SDK57 patch updates. The official installer aligned Expo57.0.27, Constants57.0.21, Linking57.0.12 and Router57.0.25, plus Reanimated4.5.1/Worklets0.10.1. The repeated online check reports dependencies up to date. Compatible transitive updates installed shell-quote1.12.0 and source-map-js1.2.2. The final install audit reports 32 findings (22 high,10 moderate) and no critical findings; unresolved vendor advisories remain. No forced SDK/Firebase downgrade was applied. Deployment instructions now describe paused forms and required flags. SecureStore failure now falls back to device locale with the same revision guard. Native device validation and expo-doctor remain unperformed.
