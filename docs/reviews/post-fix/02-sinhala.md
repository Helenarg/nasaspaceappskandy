# Specialist review 02 — Sinhala language and functional-copy review

Reviewed 9 October 2026. Viewpoint: a Sinhala-first participant who needs complete instructions, accurate expectations and understandable errors rather than translated headings alone.

## Scope and method

Source reviewed: all 12 content routes (home, about, events, challenges, ambassadors, join, sponsors, news, contact, register, participation and privacy), shared homepage sections, footer, navigation, localized text/fonts, fields, motion toggle, event content and submission/readiness errors. Reviewed the previous inspection findings. No Firebase write, real application submission or account operation was made. The running preview was the previous export during this reviewer's source pass; this report does not claim fresh screenshots, screen-reader tests or native-device validation.

## Changes supplied

Created `src/i18n/sinhala-copy.ts`, exporting a normalized `SI_COPY` dictionary with 307 entries at initial verification. It supplements the existing homepage/header/shared dictionary and must be merged into `translateCopy` by the primary reviewer with Sinhala override precedence.

- Complete local-interest instructions, official-registration distinction and honest receipt messages.
- All six participation-information sections and all six local-data-notice sections, including paused collection, retention/access limitations and guardian guidance.
- The rewritten About, Events, Challenges, News and Sponsors page bodies and actions. Practice ideas, descriptions, notes, empty-search state and NASA resources are translated without presenting local prompts as official briefs.
- Team-size instructions, skill choices, availability labels, all nine province names, field labels, example placeholders, validation limits and acknowledgement notices.
- Network/uncertain-receipt/retry/locked-attempt errors with their original action constraints preserved.
- Image/map credits, homepage fragments that previously failed whole-string lookup, accessibility-label copy and metadata text.

Proper names, NASA/Space Apps identifiers, email addresses, dataset/tool names and stored payload enums are preserved. Technical terms are translated descriptively while recognized names such as Python, NASA API and Firebase remain intact.

## Findings passed to the coordinator

1. Contact/Join/Ambassador confirmations concatenated English fragments around a name/subject/institution, making grammatical Sinhala impossible through independent string replacement. Requested complete translated confirmation sentences, with user data presented separately if needed. Supplied matching whole-sentence keys.
2. Ambassador province display used the first word, conflating North Western and North Central. Requested full province labels; supplied complete and shortened distinct Sinhala province names.
3. Some direct `Pressable`/`View`/SVG accessibility labels bypass presentation text translation. Supplied the dictionary keys; the accessibility integration must translate those labels explicitly.
4. Register metadata still described a team-registration/solo-pool action. Requested an honest local-interest description matching the revised page.

## Verification and limits

TypeScript transpilation of the dictionary passed. All 307 initial entries have normalized keys, nonempty values and Sinhala script; no literal English-only translation value remains. Source extraction checked JSX text/labels/placeholders/metadata against this supplement and the existing dictionary; remaining deliberate English values are proper names, emails and illustrative internal code tokens. Final integrated lint/typecheck/export and browser reflow checks belong to the coordinating verification pass.

This is a comprehensive implementation translation pass, not native-speaker certification. A Sinhala-speaking organizing-team editor should review tone, preferred technical terminology, school/guardian wording and published participation/data-policy accuracy. Actual screen-reader pronunciation, native-font rendering and narrow-device text wrapping require integrated runtime checks. External official pages remain governed by their own available languages.
