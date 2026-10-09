# Specialist review 08 — Forms UX and business rules

Reviewed on 9 October 2026. Independent post-fix review of registration, contact, volunteer/mentor, and ambassador flows. This is a source-level audit of the current working tree, with executable source-callback checks. It does not claim production export, native-device, screen-reader, or live backend verification. No backend writes were made, and no user browser tabs or consent/preferences were changed.

## Result

The main previously reported form issues are corrected. Two small interaction refinements remain in the reviewed Join source; neither invalidates the corrected business rules.

## Verified fixes and evidence

- **Actual team size:** `register.tsx` requires an integer from 2 through 6 for the team track, builds the entered number rather than a hard-coded four, and builds solo entries with `memberCount: 1` and `teamName: null` even when an old team name remains in local state. Executed each valid size and rejected empty, 1, 7, a letter, and 2.5 using the actual validator callback extracted with the TypeScript AST.
- **Province coverage:** `ambassadors.tsx` has all nine Sri Lankan provinces. The payload uses the selected province. Executed a Uva Province payload check; no backend request.
- **Role and availability:** `join.tsx` builds the selected `mentor` or `volunteer` role, selected skills, and `nov14`/`nov15` availability. Switching roles clears skills so skills from an incompatible role cannot leak into the payload. The validator rejects no skills and no days. Executed these callbacks with local fixture values.
- **Lengths and normalization:** all personal text inputs have explicit length caps matching their validators, including 2,000-character contact messages and 1,000-character ambassador motivation. Shared email validation limits addresses to 200 characters; phone validation limits input to 30. Executed overlong contact message rejection and trimmed/lowercased email payload checks. Registration, Join, and ambassador validators check their optional bounded fields too.
- **Notice and truthful receipt:** registration and ambassador acknowledgement refer to local participation and privacy information and have actual links to those pages. Contact and Join also link both notices. Registration distinguishes local interest from official registration; success messages do not promise roles, toolkit delivery, or confirmation emails.
- **Readiness gate:** every form displays a paused notice when `submissionsReady()` is false. The submit hook rejects readiness before creating a submission. Native submissions remain paused by the current explicit web-only readiness predicate. This is an honest restriction rather than an apparent native submission success. Fields remain editable while paused, but the warning explicitly advises against sensitive information.
- **Retry and locked inputs:** once an attempt exists, all visible personal fields use `editable={!attemptLocked}` and all choice/acknowledgement controls use `disabled={attemptLocked}`. A whole-message warning explains that retry repeats the same details. Crucially, submit buttons are disabled only while `submitting`, allowing a retry after a timeout/error even while other controls stay locked. The hook reuses `attempt.current` and skips fresh validation/build on retry.
- **Disabled mapping:** installed React Native Pressable merges `disabled` into native `accessibilityState.disabled`; installed React Native Web Pressable emits `aria-disabled`, removes disabled buttons from normal tab order, and suppresses interaction. These mappings were checked in the installed implementation, rather than assuming missing explicit state properties imply a native bug. FormField forwards `editable` to TextInput.
- **Complete successful reset:** source inspection confirms all four success reset actions clear every personal field plus choice state, including contact subject, registration track/member count/challenge preference/acknowledgement, ambassador province/academic year/email/phone/acknowledgement, and Join role/skills/days/affiliation. The shared reset clears errors, receipt state, trap, and retained attempt.
- **Keyboard flow:** FormField exposes refs for next-field focus. PageShell retains native keyboard-dismiss behavior while using `none` on web to avoid losing field focus during auto-scroll. First invalid web field is focused after validation using the main landmark and `aria-invalid`.

## Remaining practical refinements

### P3 — Pressing the already selected role clears selected skills

Evidence: in `src/app/join.tsx`, both role button handlers unconditionally call `setSelectedSkills([])` even if that role is already active. A participant who has selected volunteer skills and taps the active Volunteer button loses the selection without actually changing roles.

Suggested fix: return early when the requested role equals `activeTab`; clear skills only when moving to the other role. Acceptance: pressing the active role preserves selected skills; changing role clears them.

### P3 — Choice errors remain visible after the choice is corrected

Evidence: `toggleSkill` and `toggleDate` in `src/app/join.tsx` change the selected arrays but do not call `clearError('skills')` or `clearError('dates')`. After an empty invalid submission, selecting a skill/day leaves the corresponding error message visible until a second submit. This differs from the personal fields, which clear their errors as they are edited.

Suggested fix: clear the relevant error when a skill or date changes, or revalidate the affected group after its state update. Acceptance: the required-skill/date error disappears when the group gains a valid selection, and is shown again on a later submit if it becomes empty.

## Optional UX improvements

- Add a short readiness explanation near the submit CTA as well as above the fields on long forms; participants can otherwise scroll beyond the paused notice. Preserve the backend gate regardless of presentation.
- Label the idle retry CTA explicitly as retrying the retained attempt after uncertainty, while keeping the existing complete warning. Avoid suggesting that editing the locked application is possible.
- On native, add a manual keyboard and screen-reader test for group-only errors. Web first-invalid focus currently handles TextInputs, while a skills-only error has no invalid TextInput to focus.

## Safe executable check outcome

PASS: five valid and five invalid team sizes; solo payload behavior; mentor role/skills/day validation; ambassador province/notice validation; contact message length and email normalization. Actual validators and payload builders were extracted from current TypeScript source and executed with local fixtures. Firebase modules and submit functions were never called.

Remaining confidence limits: receipt timeout/late completion and server rejection paths need isolated mocked or emulator tests, and actual device accessibility/keyboard behavior requires device verification. Other reviewers own language correctness, broader accessibility, and backend/security inspection.
