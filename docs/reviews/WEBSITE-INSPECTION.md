# Website inspection and improvement plan

**Reviewed:** 9 October 2026, Asia/Colombo. **Baseline:** `space-apps-rebrand`, implementation commit `34fab26`. **Target:** local production preview at `http://127.0.0.1:8088/` and current source/export.

The site has a strong visual foundation, but several user-facing actions and event claims are still mockup behavior. Correctness, accessibility and participation clarity should take priority over adding more animation. The homepage rebrand has not yet become a complete design system for every interior page.

## Review team

Three independent specialist reviewers reviewed the project in parallel. The lead reviewer supplied the fourth viewpoint and reconciled their findings.

| Reviewer | Attributes and intention | Questions it prioritized | Detailed report |
|---|---|---|---|
| Visual design review | Critical art director; consistency-focused; attentive to cinematic references | Does every page share the same spacing, typography, imagery and interaction language? Is motion purposeful? | [Visual review](visual-review.md) |
| Accessibility and language review | Keyboard/screen-reader perspective; inclusive; motion-sensitive; attentive to Sinhala/Tamil | Can users perceive selected states, understand complete instructions and use the same journeys? | [Accessibility review](accessibility-review.md) |
| Technical review | Skeptical reliability engineer; data integrity and mobile-performance focus | Do actions do what they say? Are data writes robust? Does the site ship and share correctly? | [Technical review](technical-review.md) |
| Coordinating participant reviewer | Beginner participant, parent/teacher and potential partner; clarity/trust focus | What is happening, when/where, who can join, and does the local form complete official participation? | [Participant review](participant-review.md) |

## Coverage and confidence

All ten content routes were inspected live by the coordinator: home, About, Events, Challenges, Ambassadors, Join, Sponsors, News, Contact and Register. All ten route sources plus shared presentation, motion, localization and submission code were reviewed. Independent reviewers added visual desktop observations, Tamil switching/keyboard checks, selected-state DOM checks, source/export inspection and comparison with references. Existing 320/390px Sinhala/Tamil artifacts supplement this review; they are prior evidence, not fresh device tests.

Current `npm run lint` and `npm run typecheck` passed. They establish static code health, not working downloads, accessible state or successful event registration. No implementation changes were made by this review. No valid form submission, consent acceptance, Firebase write probe, deployment or external account action was performed. The user's browser tabs were preserved; reviewers used separate tabs and restored English after language checks.

This is a broad, evidence-based inspection, not a guarantee that every possible issue has been discovered. Native devices, actual screen readers, production Firebase configuration, external email automation, cold-load performance under throttling, zoom/reflow and OS reduced-motion emulation remain unverified. The reports identify source-only risks and design suggestions separately from observed defects.

## Highest-priority findings

**P0 = resolve before public launch or recruitment; P1 = next reliability/accessibility/design pass; P2 = refinement or measurement.** These priorities describe this site's event journeys, not a formal security severity score. Related observations are grouped rather than counted repeatedly across reviewers.

| Priority | Issue | Evidence | Action and completion criterion |
|---|---|---|---|
| P0 | Event dates conflict with the official 2026 event | Local Events/Register/Join use Oct 3–5; live [official 2026 page](https://www.spaceappschallenge.org/2026/) lists Nov 14–15. P01 | Verify Kandy's local schedule and reconcile all visible dates, metadata, volunteer availability and countdown. Distinguish any separate local activity explicitly. |
| P0 | Local interest form implies official hackathon registration | Header says interest, button/success say confirmed entry/official registration; backend only stores a local document. P02/T03 | Explain official account → registration → local event → team → project steps. Link verified official local listing; local receipt must accurately describe its scope. |
| P0 | Unsupported event, affiliation and benefit claims remain | NASA headquarters verified ambassador credentials, UNESCO judging, AI judges, partner/reach assertions, invented names/venue/challenges documented in organizer checklist. P03/P09 | Content owner verifies each current claim with evidence; unconfirmed assertions removed or clearly labeled. Confirm local benefits rather than implying global guarantees. |
| P0 | Local challenges are presented alongside official-sounding resources | Six invented local briefs vs 14 official challenge summaries currently announced. P04 | Publish verified official summaries/source links and separate practice ideas. Check titles and datasets, not merely counts. |
| P0 | Downloads falsely report success | Challenges toolkit/template/API guide, News ZIP and Sponsors PDF only toggle state. T01 | Real files and working links, or clear unavailable status. Each claimed download must deliver its named file. |
| P0 | Workshop registration is only transient state | Events toggles a React array; reload loses it. T02 | Actual booking/receipt or rename as a shortlist interaction. Never imply a seat reservation without one. |
| P0 | Team count is always four | `memberCount` initialized to4 without a setter/input. T04 | Explicit validated actual count or omit unknown count; client/server agree on accepted range. |
| P0 | Forms lack readable privacy and participant documents | No privacy notice in form/footer; demanded agreement has no linked terms. P07/T08 | Organizer-reviewed documents linked near collection and consent; explain storage, use, contacts and chosen analytics behavior. Legal applicability needs appropriate review. |
| P0 | Checked state is missing in exported web UI | Language radios and consent checkboxes have no `aria-checked`; all language options appear unchecked. A11Y-01 | Correct platform mappings; one checked language radio and boolean consent state verified in DOM and screen reader. |
| P0 | Five provinces cannot be selected | Ambassador uses `PROVINCES.slice(0,4)`. A11Y-09 | All nine selectable and label clearly distinguishes district from province. |
| P0 | App Check deployment instructions lack client initialization | Source no attestation initialization; guide instructs enforcement. T05 | Confirm staging client tokens before enforcement; verify legitimate submissions plus abuse strategy. Actual deployed enforcement remains unknown. |
| P1 | Submission schema and client/server limits differ | Rules allow extra keys and incomplete invariants; overlong valid-looking client input can fail server checks. T06/T11 | Per-collection allowlists/ranges/enums and mirrored field limits, backed by emulator rule tests. |
| P1 | Timeout/retry can create duplicate submissions | Promise timeout doesn't cancel write; retry uses new ID. T07 | Stable/idempotent submission identity; distinguish uncertain receipt; verify delayed response then retry. |
| P1 | Fast autofill can receive success without saving | Under2sec branch silently drops otherwise valid submissions. T12 | Treat speed as an abuse signal without silently losing plausible human submissions. Verify autofill/reset flows. |
| P1 | Success copy promises emails not implemented here | Firestore write only; email delivery/external automation unverified. T03 | Accurate receipt copy now; claim dispatch only after verified workflow/delivery status. |
| P1 | Inactive statement/social/call/profile controls | No handlers; News statement click produces no change. P05/P06/T09 | Reviewed working destinations or remove pending controls. Make email text actionable. |
| P1 | Future/mockup news is displayed as published fact | October15 announcement is visible on October9 and after locally stated event. P05 | Real publication dates/body; planned announcements separate from latest news. |
| P1 | Functional translation is incomplete and fragments break sentences | Tamil Contact shows SEND US A செய்தி; remaining English lacks language annotations. A11Y-06 | Whole keyed messages, translated functional instructions/choices/errors/consent, deliberate language-of-parts markup and native-speaker review. |
| P1 | Choice state and radio keyboard behavior are absent | Subject/track/skill/date/province buttons lack semantic state; language arrows don't move selection. A11Y-02/03 | Correct single/multiple selection semantics and keyboard contract; selected values perceivable without color. |
| P1 | Form requirements and errors lack associations | Required marker only visual; no described-by input association. A11Y-04 | Required/error/hint relationships, useful error summary/focus behavior tested with assistive technology. |
| P1 | Shared shell lacks landmarks and skip navigation | Generic containers, repeated menu before content. A11Y-05 | Banner/nav/main/footer landmarks and visible-on-focus skip action; verify scroll and route focus behavior. |
| P1 | Normal input boundary contrast is weak | Computed white28% border over Deep Blue about2.46:1. A11Y-07 | Distinguishable accessible normal fill/boundary; preserve strong yellow focus outline. |
| P1 | Homepage and interior layouts lack one rhythm | Large stacked section gaps, dense small interior type/cards, hero action low in720px viewport. Visual report | One spacing/type/component system across routes; primary event action visible or easy to reach at common heights. |
| P1 | Basic event logistics are hard to find | Hero lacks date/venue/status; no consolidated beginner FAQ. P08 | Confirmed event facts and participation steps near top; eligibility/cost/team/equipment/access FAQ approved by organizers. |
| P1 | Reset leaves applicant data behind | Ambassador reset retains email/phone/year/province. T13 | Clear every personal field or clearly label intentional reuse. |
| P1 | Share image is missing | PageMeta points to absent `/og-image.png`. T10 | Real branded image with accessible metadata and verified production share URL. |
| P1 | Deployment runtime recipe is outdated | Guide Node20 vs SDK57 minimum22.13.x. T14 | Supported pinned runtime; reproduce documented build in clean CI. |
| P2 | Payload and hydration need measurement | Cosmic Cliffs PNG2.88MB; JS entry2.26MB uncompressed; SSR width0 and per-text viewport subscriptions. T15/T16 | Optimized images/shared responsive strategy after measuring actual cold mobile transfer, LCP, CLS and interactions. Sizes alone do not prove poor Core Web Vitals. |
| P2 | Motion policy is inconsistent | New loops pause offscreen; About loop doesn't, expired timer runs, challenge modal always fades. A11Y-08/T17/T18 | Shared visibility/focus/reduced-motion policy, finite introductions or page-level motion control, expired countdown lifecycle. |
| P2 | Multilingual discovery/persistence is incomplete | English metadata, no localized URLs/hreflang, no native language persistence. T19 | Deliberate multilingual URL/metadata/native preference strategy when publishing translated pages. |
| P2 | Empty search recovery, compact targets and unnamed dialog | Zero-results count only; icon controls unnamed; compact language buttons32px high; unnamed drawer. P10/A11Y-10 | Clear empty state/reset, labels for icons, localized dialog name and comfortable touch controls. |

Detailed reports retain source locations and additional design opportunities. A measured defect, an inferred execution risk and a subjective art-direction suggestion should not be treated as equivalent evidence.

## How to use the reference websites

| Reference | Useful principle for this site | Concrete application |
|---|---|---|
| [Official Space Apps 2026](https://www.spaceappschallenge.org/2026/) | Authority, accurate participation steps and official brand resources | Correct global facts, link the real event/team/project journey; verify current official assets/guidance before claiming compliance. |
| [Hera Technologies](https://www.heratechnologies.com/) | Structural grid, disciplined alignment and editorial rhythm | Quiet grid tied to a shared container; consistent section edges and spacing instead of unrelated local card rules. |
| [SpaceX](https://www.spacex.com/) | Large imagery, decisive hierarchy, few strong actions | More deliberate image crops and readable overlays; pair hero atmosphere with immediately useful event facts. |
| [Constellation](https://constellation-global-a45b00480fa468ff6c.webflow.io/) | Space imagery and modular storytelling | Introduce verified local community/project visuals and distinct sections without turning every page into a full cinematic hero. |
| [Laika Ventures](https://laika-ventures-staging.webflow.io/) | Staged headlines and controlled pacing | Coordinate entrance timing and a small number of orbital/reveal accents; preserve complete Sinhala/Tamil lines and accessible motion alternatives. |
| [Planet Ventures](https://www.planetventuresinc.com/) | Orbital motifs, layered transitions and coherent interactive emphasis | Reuse one motion vocabulary on cards, navigation and resource actions; keep forms steady while users type. |

These are inspiration, not code/artwork licenses or NASA compliance evidence. Reference availability and what was observed live versus inferred from earlier project notes are documented in the visual report. More motion will not repair false feedback, unreadable instructions or missing destinations.

## Recommended implementation sequence

### 1. Make recruitment and actions truthful

Correct approved dates and event states; verify local claims and challenge sources; make local vs official registration clear. Replace fake downloads/bookings, remove dead actions, repair team count/all provinces, provide privacy/terms and truthful success messages. Content approvals must concern concrete assertions and documents, not an abstract redesign plan.

### 2. Repair shared accessibility and language behavior

Fix emitted web states first, then choice semantics and keyboard behavior. Add required/error relationships, landmarks, skip navigation and named dialogs. Translate whole functional messages using explicit keys, preserve fonts and request native-speaker review of actual copy. Check English, Sinhala and Tamil with real screen readers as well as DOM inspection.

### 3. Extend one visual system to every page

Define shared container, outer section rhythm, card padding, gaps, body/metadata scales, buttons, fields, cards and modal shells. Avoid adding both a header bottom gap and another full section top gap by accident. Give dense resource/form pages sufficient readable type while retaining the homepage's brand hierarchy. Add real people/community evidence after permissions/content are confirmed.

### 4. Make data handling and deployment dependable

Align validation/rules, introduce idempotent receipts, complete form resets and eliminate silent human submission drops. Verify App Check/email workflows in staging. Fix runtime guidance and the share image. Optimize and measure imagery/hydration before adding animation dependencies.

### 5. Refine motion with a clear budget

Use a finite hero introduction, short interaction feedback and selective section reveals. Keep background motion optional; stop invisible work and respect OS/user preferences. Match the spirit of Laika/Planet with coherent timing, not by moving everything. Keep forms and reading surfaces stable.

## Follow-up acceptance matrix

| Area | Required evidence |
|---|---|
| Responsive layout | Fresh320/390/768/1024/1280/1440px checks plus short/tall viewports, all routes and languages, text zoom/reflow and open drawers/modals. No clipped content or unexplained gaps; readable type. |
| Participation | Beginner can explain event facts and local/official steps; approved logistics/FAQ; before/during/after date tests including Sri Lanka offset. |
| Actions | Every CTA/link/download has a real verified result or honest unavailable state; zero-result search recovers. |
| Forms | All provinces/team sizes, required/length limits, autofill, invalid input, reset, timeout/retry/idempotency tested in emulator/staging. No live write tests without an approved test destination. |
| Accessibility | Keyboard tasks, semantics/checked states, focus/skip/error behavior, NVDA/VoiceOver/TalkBack where applicable, contrast and motion toggle. |
| Languages | Complete functional sentences and selected values, correct script font/shaping, intentional English annotation, native-speaker review and persistence behavior. |
| Performance | Cold throttled mobile measurements for LCP/CLS/interaction/transfer; optimized image variants and paused hidden effects; actual devices if native distribution is intended. |
| Publishing | Working share image, canonical/language strategy, clean supported-runtime build, actual hosting fallback/headers and verified Firebase rules/App Check/notification operations. |

## Supporting material and limitations

- [Visual review](visual-review.md), [accessibility review](accessibility-review.md), [technical review](technical-review.md), [participant review](participant-review.md).
- Existing [localization and motion verification](../UI-LOCALIZATION-MOTION.md) describes the previous implementation's checks; this review adds findings and does not rewrite historical results.
- [Organizer checklist](../ORGANISER-CHECKLIST.md) is historical context, not proof that every old item is still present. For example the current logo has already changed; obsolete logo warnings were not carried over as current defects.
- Official `/2026/` was verified directly in browser after web-fetch502 responses. It explicitly lists the November weekend and official participation steps. Local venue approval, real partnerships and external backend automations remain organizer/deployment verification items.

Preserve the official wordmark, restrained grid, space-image credits, script-aware fonts, inclusive beginner message and reduced-motion/offscreen foundations. Build the next pass around reliable participation and a consistent system across the entire site.
