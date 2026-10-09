# Deployment and form readiness

Use Node 22.13.1 or a newer version supported by Expo SDK 57. Install locked dependencies with npm ci. Run npm run lint, npm run typecheck, node scripts/postfix-formtests.cjs, and npm run build:web. Publish the resulting dist directory. Cloudflare Pages can apply public/_headers; verify headers on the actual host. Check provider pricing and plan limits directly before selecting a plan.

## Collection is paused by default

Run `npm run test:dependencies` and `npm run test:forms` after installation. Review [dependency maintenance](DEPENDENCIES.md) for the pinned postinstall mitigations and outstanding upstream warnings. For isolated security-rule checks, install Java 21, run `npx firebase-tools@15.33.0 setup:emulators:firestore`, then `npm run test:rules`. This uses only the localhost emulator and the demo-space-apps-release project; it does not deploy or test production rules. Firebase emulator configuration is included in firebase.json.

The forms collect local interest and enquiries, not official NASA registration. Main registration buttons link to the official event website. .env.example defaults EXPO_PUBLIC_ENABLE_LOCAL_FORMS=false. Web submissions require both an explicit true flag and EXPO_PUBLIC_RECAPTCHA_SITE_KEY. Public Expo environment variables are bundled into the client; never put secrets in them. Native submission support is not enabled by this web App Check integration.

Before enabling collection, organizers must verify the mailbox, publish actual retention and responsible-contact details, approve the privacy notice, and provision Firebase. The checked-in rules validate create requests by collection and reject client reads, updates and deletes. Test them with the Firebase Emulator Suite before production. Mocked submission tests do not substitute for rules tests.

Register the web app in Firebase App Check with reCAPTCHA v3, configure allowed domains, and inspect preview metrics before enabling Firestore enforcement. App Check helps reject unverified clients; it does not guarantee spam prevention or replace monitoring and rate limiting. Use the approved Firebase deployment process. No remote rules deployment or enforcement change was performed during this UI work. After verification, configure the flag/site key in the hosting build environment and rebuild. Test accepted and rejected requests in a dedicated test project before collecting real data.

## Uncertain receipts

One mounted submission attempt reserves one document ID and freezes its details. Retries reuse that ID and payload. After 12 seconds the UI reports an uncertain receipt and locks edits. The timeout does not cancel the Firebase operation or prove failure. Client reads are blocked, so a receipt lost during reload cannot be recovered by the app. Organizers should reconcile uncertain receipts. Durable idempotency and a receipt lookup service remain future backend work.

No confirmation emails or response times are promised. Analytics initialization is disabled. Read/export personal data only through approved organizer tooling and access controls; no public export endpoint exists.

## Native release and attribution

SecureStore and Localization require verification in Android/iOS development builds, including language persistence, accessibility, keyboard behavior and reduced motion. Do not hand-edit generated native directories. Preserve NASA image and geoBoundaries/ODbL map credits. scripts/optimize-space-images.cjs regenerates the smaller JPEG; scripts/build-share-image.ps1 regenerates the code-drawn social image.
