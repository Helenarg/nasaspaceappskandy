# Specialist review 07 — Page content, trust and participant journey

Inspected October 9, 2026, Asia/Colombo. Read-only audit; no application edits, personal data, form submissions or shared language/viewport changes.

## Scope and evidence

Reviewed current source for all 12 content routes: home, about, events, challenges, register, join, ambassadors, news, sponsors, contact, participation and privacy; shared hero, mission, expansion, navigation/footer; event constants; Firebase readiness and supplied Firestore rules. Independently inspected rendered English participation, challenges and privacy in a newly created hidden localhost browser tab. The served export predates some concurrent source repairs: its navbar and footer still target `/register`, while current source targets the official site and `/participation` respectively. This is an export-refresh observation, not an unresolved source defect.

Checked the official [2026 Space Apps page](https://www.spaceappschallenge.org/2026/) through its indexed content. It confirms November 14–15, teams of no more than six, and project submission from November 14 at 9:00 AM through November 15 at 11:59 PM local time. It links submission to participant certificates and Global Judging eligibility. Direct web fetch returned an intermittent 502; indexed page content was available. [NASA open data](https://data.nasa.gov/) fetched successfully. Direct web fetches of brand/challenge links timed out or returned 502, so this audit does not claim live HTTP availability for those destinations.

## Repairs verified

- Global dates have a single `SPACE_APPS_EVENT` source and no visible October 3–5 schedule in current route/component source. Countdown explicitly states its Sri Lankan midnight reference is not a confirmed local opening time.
- Invented venue, committee profiles, named sponsors, press releases and guaranteed awards/access have been removed from the reviewed public page bodies. Unconfirmed local details are plainly labelled.
- Participation now explains official account/event/team/project steps. Local interest does not create official registration, a competition entry or a team.
- Registration now captures actual team size (2–6); solo records one participant. Client and supplied rules agree.
- Toolkits, media packages and sponsorship prospectuses are described as unavailable rather than triggering pretend download success. Workshop pages do not issue fake seat confirmations.
- News and sponsors use useful honest pending states with official-information and local-contact paths. Challenge learning prompts are labelled local practice rather than NASA competition briefs.
- Form receipts describe saved local review, without promising email delivery, acceptance, role assignment or reply times.
- The privacy notice explains the Firebase destination, time/version/platform metadata, disabled analytics, device preferences and pending organizer policy. The default readiness guard pauses local collection. This is an implementation notice; deployed server rules, retention and organizational approvals are not independently verified.

## Remaining findings sent to implementation owner

**P2 — Make practice versus competition timing explicit.** `/challenges` invites prototypes before the event. Existing disclaimers distinguish official briefs, but do not state when the competition solution may be built. The official [Santiago 2026 local-event guidance](https://www.spaceappschallenge.org/2026/local-events/santiago-dominican-republic/) specifically distinguishes preparation from building a submission and says competition work belongs during November 14–15. Add a short warning beside the practice introduction and point to current official participation requirements. Acceptance: visitors can distinguish learning exercises from an eligible competition project without inference.

**P2 — Remove remaining aspirational wording that sounds established.** Ambassador benefit heading `National Innovation Network` can imply an existing national program, despite its more careful paragraph. Prefer student-connections wording. Events introduction still says `find a workshop`, although no workshop is published; use global dates/local-status/preparation wording. Acceptance: headings and descriptions match the pending local state of their actual content.

**Operational verification — Responsible contact remains unverified.** `info@nasaspaceapps.lk` is a plausible repository-provided public email, but this review found no authoritative ownership or monitored-delivery evidence. Do not invent a replacement. Organizer must verify this mailbox and publish the responsible data contact/retention policy before enabling local forms. The default collection pause already limits the immediate exposure.

## Limits

This audit concerns content and truthful journeys, not native-device QA, copyeditor certification, deployed Firebase settings or successful external form delivery. Sinhala/Tamil linguistic accuracy is delegated to separate language reviewers. No review can certify that all future event facts remain current; official information should remain the linked source of truth.
