# Accessibility, language and inclusive mobile review

Reviewed 9 October 2026. Independent inspection viewpoint: a keyboard user, a screen-reader user, a motion-sensitive visitor and a Sinhala/Tamil-speaking applicant should be able to understand the site and complete the same journeys as an English-speaking mouse user.

## Coverage and evidence

Live production preview inspected in a new hidden tab: `/`, `/contact`, `/register`, `/join`, `/ambassadors`. Tamil selection, radio keyboard behavior, menu opening/closing and input keyboard focus were inspected; English was restored afterward. No forms were submitted, no consent was accepted and user tabs were untouched. Shared browser viewport settings were not changed. Mobile typography evidence includes existing `docs/design-reference/tamil-mobile.jpg`, not a new device test. Shared components, language dictionaries, form source, motion components and installed React Native Web DOM mapping were inspected.

This is an issue review, not WCAG certification. No NVDA/VoiceOver/TalkBack session, native device test, zoom/reflow test or OS reduced-motion emulation was performed. Sinhala and Tamil translations have not been certified by native speakers. Findings below distinguish live observations from source-based risks.

## Findings

### A11Y-01 — High: checkable controls do not expose checked state on web

**Routes:** all language pickers; `/register` and `/ambassadors` consent controls.

**Live evidence:** the three language controls have `role="radio"` and `tabindex="0"`, but none has `aria-checked`. Selecting Tamil visibly changes language and `html[lang]` to `ta`, while the accessibility tree still exposes all three radio values as 0. Registration and ambassador checkboxes also have no `aria-checked` even in their initial unchecked state. Consent was not toggled.

**Source:** `src/components/LanguageToggle.tsx:22`, `src/app/register.tsx:336`, `src/app/ambassadors.tsx:319` supply `accessibilityState`. Installed React Native Web `dist/modules/createDOMProps/index.js:56` and `:221` map individual `aria-checked`/`accessibilityChecked` props; that mapper contains no `accessibilityState` mapping. This is a cross-platform compatibility gap, despite apparently correct native-oriented source.

**Fix:** explicitly expose the supported web ARIA checked state while retaining the appropriate native state. Verify actual exported DOM, not only TypeScript. Apply the same audit to expanded, busy and current-navigation state; the source uses `accessibilityState` for those too. Correct the statement in `docs/I18N.md` that the selected radio state is already announced.

**Acceptance:** exactly one language radio is checked; both consent controls always expose a boolean checked state. Verify with a real screen reader as well as DOM inspection.

### A11Y-02 — High: selected form choices are conveyed only visually

**Routes:** `/contact`, `/register`, `/join`, `/ambassadors`.

**Live evidence:** subject categories, registration tracks/challenge interests, volunteer skills/availability and province options are buttons without `aria-pressed`, `aria-selected` or `aria-checked`. The initial volunteer availability is already selected in source, but the tree presents ordinary indistinguishable buttons.

**Source:** `src/app/contact.tsx:230`, `src/app/register.tsx:203` and `:314`, `src/app/join.tsx:328` and `:353`, `src/app/ambassadors.tsx:267`.

**Fix:** single-selection choices should expose a labeled radio group and checked state, or use an appropriate native select. Multiple selections should use checkboxes or toggle buttons with pressed state. Keep visible selected styling, and expose group instructions/required selection. Use radio semantics only when implementing their keyboard contract.

### A11Y-03 — Medium: language radios lack expected arrow-key behavior

**Routes:** shared navigation.

**Live evidence:** pressing ArrowLeft on the selected Tamil radio left focus and selected language unchanged. All three radios are separate tab stops. `LanguageToggle.tsx` has only `onPress`, with no arrow-key behavior or roving focus.

**Fix:** implement standard radio keyboard interaction, including arrows selecting adjacent options and one tab stop for the selected item. Alternatively use ordinary language-switch buttons with an accurately exposed current state rather than announcing a radio widget with a different interaction pattern. See [WAI radio group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/).

### A11Y-04 — Medium: required fields and field descriptions lack web associations

**Routes:** all four application/contact forms.

**Live evidence:** Contact required name/email/message inputs have accessible labels and `aria-invalid="false"`, but no `aria-required`. Inspected inputs have no `aria-describedby`. The required asterisk is separate visual text, excluded from the explicit accessible input name.

**Source:** `src/components/FormField.tsx:18` consumes `required` but uses it only for the mark; `:37` uses native-oriented `accessibilityHint` for errors/hints, without a web description/error association. Errors render separately as alerts at `:43`.

**Fix:** expose required state, assign stable IDs to hints/errors and associate them with the input on web. Preserve native hint behavior. Add a concise error summary and move focus to it or the first invalid field when validation fails. Current alert rendering is a helpful foundation, but actual screen-reader error announcement remains untested in this review.

### A11Y-05 — Medium: no landmarks or skip link for repeated navigation

**Routes:** shared shell; live confirmed on `/` and `/join`.

**Live evidence:** no `main`, `nav`, `header`, `footer`, `role="main"` or `role="navigation"` elements are present. There is no skip-to-content link. Each page begins with the same eight navigation links plus language controls and registration link.

**Source:** `src/components/PageShell.tsx:8`, `src/components/Navbar.tsx:29`, `src/components/Footer.tsx` use generic View containers.

**Fix:** provide web banner/navigation/main/contentinfo landmarks and a keyboard-visible skip link targeting main content inside the actual scroll container. Preserve existing heading hierarchy. After route changes, verify focus reaches a useful new-page location instead of relying solely on visual navigation.

### A11Y-06 — High: incomplete localization creates broken mixed-language phrases

**Routes:** live `/contact` in Tamil; shared literal-text translation design affects other interiors.

**Live evidence:** the form title renders `SEND US A செய்தி`, translating only the nested word MESSAGE. `DIRECT EMAIL`, `ORGANIZING HEADQUARTERS`, `SUBJECT CATEGORY` and the communication-hours paragraph remain English. The root document is `lang="ta"`, but English text fragments have no `lang="en"`, so assistive pronunciation can use the wrong language. This goes beyond the already documented untranslated long articles.

**Source:** `src/app/contact.tsx:182` splits a grammatical phrase across nested Text nodes; `src/components/LocalizedText.tsx:30–34` translates each string independently and uses script detection only for font choice; `src/i18n/copy.ts:120–124` silently falls back to English.

**Fix:** translate complete messages with explicit keyed strings and placeholders for highlighted terms, rather than reverse-looking-up arbitrary fragments. Complete functional copy first: form instructions, choices, required/error messages and consent wording. Mark intentional language changes in web text and native accessibility language where supported. Add missing-key reporting in development and sentence-level translation review by Sinhala/Tamil-speaking organizers.

**Positive evidence:** script-specific fonts, zero letter spacing and line-height accommodations are implemented. The existing Tamil 390px mobile screenshot shows readable shaped text and intact headline words. That does not establish layout quality at all widths or translation accuracy.

### A11Y-07 — Medium: normal input boundaries have only 2.46:1 contrast

**Routes:** all forms using FormField.

**Live evidence:** Ambassador input computed background is `rgb(7,23,63)` and border is `rgba(255,255,255,0.28)`. Source uses the same background for the surrounding form surface. Composited border is approximately `#4C5875`; its contrast against `#07173F` is 2.46:1. The fill does not separately distinguish the input.

**Source:** `src/components/FormField.tsx` input style uses this border/background pair.

**Fix:** strengthen the normal input boundary or introduce a distinct accessible fill to identify controls at a minimum 3:1 against adjacent colors. Recheck all interactive boundaries separately from decorative grid lines. This is a concrete control-boundary concern, not a blanket claim that the palette fails: muted text on Deep Blue is approximately 10.23:1.

**Positive live evidence:** keyboard Tab into the Ambassador email field produced a clearly visible neon-yellow focus outline. Keep that treatment.

### A11Y-08 — Medium: persistent decorative motion has no page-level pause

**Route:** homepage.

**Source-based evidence:** `SpaceScene.tsx` continuously drifts images over 32 seconds and adds scroll parallax; `OrbitMotif.tsx` continuously rotates over 70 seconds. Both respect OS/browser reduced motion and pause offscreen. The ticker has its own pause button, but there is no equivalent in-page stop control for the hero/background motion.

**Fix:** offer an accessible page-wide motion toggle, or make hero drift/orbit motion end after a short introductory sequence. Persist user preference and combine it with OS reduced motion. Avoid interpreting reference websites as a requirement to animate every section. Review persistent decorative motion against [WCAG Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html). This review did not emulate reduced motion, and does not claim the implemented OS preference is broken.

### A11Y-09 — High: five provinces cannot be selected in ambassador form

**Route:** `/ambassadors`.

**Live evidence:** options are Central, Western, Southern and Northern only, despite the site describing all nine provinces.

**Source:** `src/app/ambassadors.tsx:263` explicitly uses `PROVINCES.slice(0, 4)`.

**Fix:** show all nine provinces, preferably in a fully labeled compact select or wrap-safe radio group. Include a separate district control only if the organization actually needs it; the current combined `DISTRICT / PROVINCE` label is ambiguous. Applicants from the remaining provinces must be able to represent their location truthfully.

### A11Y-10 — Low: compact language targets and unnamed menu dialog

**Live evidence:** desktop language controls measure 32px high (English 36px wide); other desktop nav links are about 43px high. These meet or approach the smaller WCAG minimum targets, so do not call them an automatic target-size failure, but 44px is a more comfortable touch goal. The Tamil menu exposes `role="dialog"` and `aria-modal="true"` with no dialog accessible name. Opening focuses a close button; Tab moves into language controls. Escape does dismiss and focus returns to the opener after the fade settles.

**Source:** `LanguageToggle.tsx` `itemCompact` styles; `Navbar.tsx:49` modal wrapper.

**Fix:** keep compact targets at least 44px high where space permits and give the dialog a localized name such as Navigation. Continue testing focus containment and return with real assistive technology. Do not report Escape as broken: its dismissal was verified.

## Suggested remediation order

1. Repair actual exported accessibility states and form choice semantics, and restore all nine provinces.
2. Complete functional translations using whole messages; mark deliberate English passages and obtain native-speaker review.
3. Add required/description associations, landmarks and skip navigation; strengthen input contrast.
4. Add an in-page motion preference, name the drawer and improve compact targets.
5. Run keyboard and screen-reader task tests for language change, registration, volunteer selection and ambassador application, plus 200–400% zoom, narrow layouts, reduced motion and actual Android/iOS assistive technology.

## Documentation consulted

Version inspected in `package.json`: Expo `~57.0.24`, React Native `0.86.3`, React Native Web `^0.21.2`. [Expo SDK 57 documentation](https://docs.expo.dev/versions/v57.0.0/) and [React Native 0.86 accessibility documentation](https://reactnative.dev/docs/0.86/accessibility) were consulted before cross-platform API recommendations. Browser ARIA behavior was cross-checked against installed mapping code and live DOM; native API validity alone does not prove web output. [WAI language-of-parts guidance](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html) supports explicit language annotation for intentional language changes.
