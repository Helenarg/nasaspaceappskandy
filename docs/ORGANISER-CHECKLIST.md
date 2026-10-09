# Organizer release checklist

Updated 9 October 2026. The previous checklist described early mockups; this checklist reflects the current app. Local collection is paused by default, official participation links are available, invented event/person/prize claims were removed, response times are not promised, and local notices plus a social image and official brand assets are present.

Read [release verification](reviews/release/RESULTS.md), [deployment instructions](DEPLOY.md) and [dependency maintenance](DEPENDENCIES.md) before release.

## Hosting and content

- Supply the actual staging and production URLs and the hosting/domain owner. The configured nasaspaceapps.lk address returned a certificate mismatch during verification. Fix the certificate and verify live routes, assets, redirects, security headers and social previews.
- Confirm local dates, venue, agenda, workshops, speakers, committee identities, sponsors, contact mailbox and social URLs before publishing them. The website distinguishes global event information from unconfirmed local arrangements.
- Approve all public claims and supplied photographs/logo usage. Preserve the checked-in NASA image and map attribution.

## Before enabling local collection

- Supply a dedicated Firebase test project and approved organizer access. Deploy and verify the checked-in rules through the approved process. The 86 local emulator assertions passed; production rules and App Check have not been verified.
- Provision the web App Check reCAPTCHA v3 site key and authorized domains. Test accepted and rejected requests in the dedicated project before enabling collection/enforcement.
- Verify the responsible contact, monitored mailbox, real retention period, access/deletion process and privacy notice. Confirm the organizer's requirements for minors and participant photography where applicable.
- Decide who handles each enquiry/application and how uncertain receipts are reconciled. No confirmation emails or response times are currently promised. Any notification service is additional backend work.
- Set EXPO_PUBLIC_ENABLE_LOCAL_FORMS=true only after the above checks, supply the public site key, and rebuild. Never put secrets in EXPO_PUBLIC variables. Native submission support remains disabled by the current web App Check integration.

## Language and native release

- Obtain native-speaker approval of final Sinhala and Tamil copy. All 12 public pages passed responsive layout checks in all three languages at five widths; that does not certify editorial correctness.
- If shipping Android/iOS, supply an EAS project/account, application identifiers and test devices. Verify language persistence, keyboard behavior, screen readers, reduced motion, touch targets, native icon presentation, signed installation and startup. Bundle generation already passed; device/signing checks remain open.

## Maintenance

- Review the 18 remaining high npm audit findings and documented source mitigations. Replace temporary patches when upstream fixes are available. Do not suppress audit output or force incompatible SDK downgrades.
- Track Expo-compatible support for maintained ESLint versions and the Firebase CLI's deprecated transitive dependencies.
- Analytics is currently disabled. Any decision to enable it or add receipt recovery/team matchmaking needs its own implementation and notice review.
