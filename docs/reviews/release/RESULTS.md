# Release verification — 9 October 2026

Branch: space-apps-rebrand. Environment: Windows, Node 24.18.1, npm 11.16.0, Expo 57.0.27. This report distinguishes completed local checks from external release gates. No production deployment, production data writes, App Check enforcement changes or EAS project creation occurred.

## Completed checks

| Check | Result and scope |
| --- | --- |
| Locked install | `npm ci` passed; installed 902 packages and applied all six version/hash-pinned source patches. Windows Expo file locks were released before retrying. |
| npm script approvals | `npm approve-scripts --allow-scripts-pending`: no unreviewed scripts. Three reviewed approvals are pinned by package version. |
| Audit | 32 findings reduced to 18 high; zero moderate/critical. All remaining findings propagate from braces and node-forge. See raw before/after JSON and [maintenance details](../../DEPENDENCIES.md). This is not a clean audit. |
| Dependency regression tests | Passed valid/malformed URI behavior, Unicode query strings, bounded brace and direct AST nesting, normal globs, valid RSA signatures and rejection of malformed nested DigestInfo. |
| Submission regression tests | Passed concurrency, timeout, stable document identity, frozen payload, successful receipt cache and truthful error handling. These do not verify hosted App Check. |
| Firestore rules emulator | **86 assertions passed** against demo-space-apps-release on 127.0.0.1:8090, using official Firestore Emulator 1.22.0 and Java 21. Valid creates accepted; reads, overwrites, updates, deletes, unknown fields, invalid types/choices and malformed emails rejected. A tab-containing email was accepted before the rules fix and rejected afterward. |
| Lint and typecheck | `npm run lint` and `npm run typecheck` passed after the final layout fix. |
| Expo Doctor | 21/21 checks passed on the clean dependency tree. |
| Web export | Final `npm run build:web -- --max-workers 2` passed; 14 static routes emitted, including 12 public pages and framework routes. Deployable output remains in dist. |
| Native bundle generation | Final `expo export -p all --output-dir .expo/release-all --max-workers 2` passed for Android, iOS and web after the final shared footer correction. Native output is Hermes bytecode. This is not a signed native build or device test. |
| Responsive layouts | **180 combinations passed**: all 12 public routes, English/Sinhala/Tamil, and actual iframe widths 320/390/768/1024/1440. Tests awaited language hydration and inspected page scroll width plus interactive element bounds. Selection-chip wrapping was fixed; all Tamil 768 px routes were repeated after the footer fix. Aggregated evidence is in responsive-results.json. |

The responsive harness is local-only tooling, outside the production export. Run `npm run preview:release`, then open http://127.0.0.1:8099/__responsive. It measures a real iframe CSS viewport; it does not emulate a mobile keyboard, touch engine, Safari, Android WebView or OS accessibility settings. Screenshots: [Tamil form at 320 px](tamil-320-form.png) and [Tamil footer at 768 px](tamil-768-footer.png). The final preview was restored at http://127.0.0.1:8088/ after stopping Metro for the locked dependency reinstall. The browser inspection reported no captured warning/error logs in the release harness.

The first export discarded an incompatible old Metro cache. A clean-cache all-platform export succeeded. Conflicting NO_COLOR/FORCE_COLOR environment variables were resolved for the verification commands by removing inherited NO_COLOR only in those shell processes; no global settings or warning suppression changed.

## Outstanding external release gates

1. **Live host/TLS/headers:** https://nasaspaceapps.lk returned a certificate principal mismatch during curl verification. Certificate validation was not bypassed. Supply a working staging/production URL and fix the hosting certificate before live checks. The exported _headers file is present, but it does not prove the selected host applies its contents. Verify live security headers, caching, redirects, assets, routes and social metadata after deployment.
2. **Hosted Firebase/App Check:** no dedicated test project or allowed-domain/site-key provisioning was supplied. Verify accepted/rejected App Check requests and organizer access in that project before enabling collection. Local rules tests are complete; hosted enforcement remains unverified. Local collection stays paused by default.
3. **Physical native testing/signing:** no Android/iOS device or configured EAS project was available. Bundle generation passed; SecureStore persistence, keyboard behavior, screen readers, reduced motion, touch interactions, signing and installation still require devices and project/account configuration. No native directories were created by hand.
4. **Language editorial review:** layout and glyph presentation were checked in all three languages. Native-speaker approval of final Sinhala/Tamil copy remains an organizer gate.
5. **Upstream dependency maintenance:** published node-forge/braces fixes and Expo-compatible ESLint 10 plugin support remain unavailable in the verified dependency tree. The guarded mitigations and passing regressions reduce known exposure but do not remove the audit findings or certify all future behavior. Firebase CLI's deprecated transitive dependencies also remain upstream warnings.

The current state is locally verified with the listed limitations. It is not a claim that all production or native release gates are complete.
