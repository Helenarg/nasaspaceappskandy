# Review 05 — accessibility and keyboard interaction

Reviewer viewpoint: a keyboard user and assistive-technology user completing local participation forms. Reviewed 9 October 2026. Read-only source review plus an isolated hidden browser tab. No language/storage/viewport preferences changed, no consent accepted, and no valid submission sent.

## Scope and evidence

- Shared PageShell, Navbar, Footer, FormField, ActionLink, LanguageToggle, MotionToggle, Honeypot, and all four form pages.
- Browser: `/contact` and `/register` on `http://127.0.0.1:8088`. The initial inspected bundle was `entry-e486846375a035d3d70e489720e40668.js`; source changes newer than that bundle were distinguished from runtime evidence.
- Expo SDK version read from package.json: 57. Versioned [SDK documentation](https://docs.expo.dev/versions/v57.0.0/) consulted. Installed react-native-web ModalContent and Modal implementation inspected to establish actual outer-dialog behavior.

## Verified improvements

1. Browser main/banner/contentinfo landmarks exist. Activating “Skip to main content” with Enter sets document.activeElement.id to `main-content`, a focusable main landmark.
2. Empty Contact submit produces three field errors and no valid payload. FULL NAME, EMAIL ADDRESS and MESSAGE expose `aria-required=true`; after validation they expose `aria-invalid=true` and `aria-describedby` pointing to the actual error text. Error nodes have alert semantics in source.
3. Contact drawer identifies the active Contact link with `aria-current=page`. Escape closes the drawer and restores focus to “Open navigation menu”. Tab from the final registration link wraps to the modal’s Close control; reverse Tab remains inside the modal focus trap.
4. Current source gives language and single-choice chips button roles plus `aria-pressed`; true consent checkboxes receive checked states. Source is newer than the initial export, so initial browser checkbox rendering is not a final-build finding.
5. Form controls, language choices, motion controls, footer links and action links have explicit 44px-or-greater heights; menu buttons are 48px; FormField inputs are 56px. This is source evidence, not a claim every rendered hit area was measured.
6. Main palette text contrast against solid Deep Blue / card surface is strong: white 17.45 / 15.68; muted text 10.23 / 9.19; error text 9.64 / 8.66; Blue Yonder 5.65 / 5.07; neon yellow 15.52 / 13.94. These computed ratios do not certify imagery, opacity effects or every state.
7. Source provides a visible yellow keyboard focus outline; hidden honeypot is aria-hidden and removed from the tab order; global motion pause is a named button in updated source.

## Findings sent for correction

**A05-01 — duplicate, partly unnamed navigation dialogs (medium).** Initial DOM contained two `role=dialog` elements: the outer react-native-web Modal dialog had no name, while the inner drawer was named “Open navigation menu”. Initial focus went to the backdrop Close control outside the inner named dialog but inside the unnamed outer dialog. The focus trap itself worked. Installed Modal forwards accessibility props to its generated outer View: name that actual Modal and avoid a second nested modal role. Sent to the lead for correction and final-build verification.

**A05-02 — invalid submission does not move focus to an error (improvement).** Error association and alert announcements exist, but empty Contact submission leaves focus on the submit button rather than moving it to the first invalid field or a linked error summary. Adding a navigable error summary would shorten correction on long mobile forms. This is a usability enhancement, not proof that current errors are inaccessible.

## Limits

No real NVDA/VoiceOver/TalkBack session, physical touch-device test, OS high-contrast mode or browser zoom session was performed. No full WCAG conformance claim is made. Final exported bundle recheck is required for source changes made while this review was running.
