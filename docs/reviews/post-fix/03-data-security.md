# Review 03 — Data security and submission reliability

Reviewed 2026-10-09. Scope: four local forms, Firebase initialization, submitted payloads, rules, retry/timeout behavior, bot trap, reset behavior and published data notice. Source inspection and an isolated Node mock were used. No Firebase writes, deployment, authentication or private configuration inspection occurred.

## Findings

### Medium — Edited forms retry the original captured payload

`src/lib/useFormSubmit.ts:20–28` validates and builds only before the first attempt. `src/lib/submissions.ts:9` captures that payload. After a failure/timeout, text and choice inputs remain editable, but another Submit resends the original payload. Changing a name/email, role, availability or consent can therefore produce a different record from the displayed form. Capturing a stable payload is appropriate for uncertain receipt; leaving the form apparently editable is not.

Resolution: the hook now exposes `attemptLocked`, set when an attempt is captured and cleared on reset. The parent is wiring that state to all fields and choices so displayed data remains the captured snapshot. Preserve the stable ID for an uncertain write. Acceptance: reject a mock write, edit a field and submit; the UI must explicitly prevent or deliberately adopt that change, never silently ignore it.

### Medium — Retry wording promises a receipt check the backend cannot perform

`src/lib/submissions.ts:23` says “Retry checks the same submission.” The implementation performs `setDoc` again, while `firestore.rules` permits create only and denies reads/updates. If the first create committed but its acknowledgement was lost, retry to the same ID will be denied as an update; that does not prove the original succeeded or failed. Stable identity prevents a duplicate record, but cannot guarantee eventual receipt confirmation with these rules.

Resolution: the retry error now states that retry repeats the original attempt, cannot read saved records, and asks users to contact organizers before a new response or reload. A future reliable receipt endpoint should return only a receipt status for an unguessable token, without granting public access to submitted personal data. Do not permit anonymous unrestricted updates or reads to solve this.

### Low — Volunteer reset retains prior availability

`src/app/join.tsx:236–243` clears personal strings and skills, but leaves `selectedDates` from the prior response. A “submit another response” user can accidentally reuse availability. Reset to the defined initial days or an explicit empty choice, consistently with the form's initial defaults.

## Verified improvements

- One reference/ID is generated per attempt; concurrent sends share one pending promise.
- A timeout does not cancel or duplicate the write. A retry while the promise is pending reuses it. After acknowledged success, the successful receipt is cached.
- `useFormSubmit` has an immediate ref guard against duplicate clicks, field validation, a readiness check before attempt creation and a bot-trap check. The honeypot is hidden from assistive technology and keyboard focus. It is a client convenience, not a server security boundary.
- Local collection defaults to disabled in `.env.example`. Readiness additionally requires web platform and an App Check site key. Native submissions therefore remain deliberately unavailable.
- Supplied rules are create-only with a deny-all fallback; metadata is constrained, timestamp must match server request time, keys have allowlists, strings have bounds, team size is an integer in the real range, solo size is one, arrays contain unique allowed values, availability uses November 14/15, and all nine provinces are allowed.
- Register, ambassador and contact reset handlers clear the collected personal fields. Volunteer clears its personal fields too; its availability reset issue is listed above.
- Analytics is disabled. The data notice identifies Firebase, collection categories, preferences and protection behavior, and explicitly says retention/contact arrangements are unpublished. It does not assert approved policies or deployed rules.

## Mock results

Run `node scripts/postfix-formtests.cjs`. An isolated transpiled copy of `submissions.ts` was executed with mocked Firestore functions and no network. Passed assertions: concurrent pending deduplication; a 5 ms timeout retaining the pending promise; no duplicate write on timeout retry; acknowledged-success caching; stable ID after rejected retry; original payload retained after rejection; truthful receipt wording; offline error. The original-payload check demonstrates why captured-attempt behavior must be explicit in the UI.

The attempt identity lives in memory. Reload or route unmount loses it; a new attempt can then create a second record if the previous write committed. The UI now warns against reloading during uncertainty. A durable nonpersonal receipt token and server receipt endpoint remain a future improvement; this review does not claim exactly-once delivery across reloads.

## Deployment verification still required

The checked-in rules were inspected, not executed in the Firebase emulator. Actual deployed rules, App Check enforcement, authorized domains, retention, administrator access and verified organizer contact were not inspected. A public environment flag only gates this UI; it cannot prevent direct API clients from creating documents. Keep local forms paused until rules emulator/staging tests and server-side App Check enforcement are verified. App Check initialization alone does not establish enforcement.

Primary references: [Firestore rule conditions and create/update operations](https://firebase.google.com/docs/firestore/security/rules-conditions), [App Check reCAPTCHA setup and enforcement](https://firebase.google.com/docs/app-check/web/recaptcha-provider).
