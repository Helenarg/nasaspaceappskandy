# Post-fix inspection 06: Responsiveness and reflow

Reviewer viewpoint: a participant using a small phone, enlarged browser text, or a tablet, with longer Sinhala/Tamil labels. Reviewed 2026-10-09.

## Evidence and boundaries

Read all route layouts (12 content routes), shared layout tokens, PageShell, Navbar, HeroSection, Footer, StatsSection, PageHeader, ActionLink, FormField, InformationPage, LocalizedText, and useViewport. Independently opened the newly exported `/challenges` page in a separate hidden browser tab at its existing 1280px viewport. Live DOM measurement returned viewport 1280px, document width 1280px, and no main-content elements outside either horizontal edge. Desktop screenshot showed the header, headline, and first resource card aligned on the same gutter.

No global viewport, language preference, user tab, form state, or motion setting was changed. Narrow-width findings below are quantified source findings, not falsely reported as live mobile failures. Parent reviewer owns fresh 320/390/768/1280 checks; browser zoom, native text scaling, and native devices were not tested here.

## Improvements verified in current source

- Shared container maximum 1280px, horizontal gutters 24/40/64px, vertical section rhythm 56/88px, and card padding 24/32px replace inconsistent interior layouts.
- About, challenges, events, news, and sponsors use flexible cards with `minWidth: 0`; their card groups stack below 900px.
- Register/contact/join/ambassadors main columns stack through 900px; registration field pairs and track cards stack through 600px.
- Primary and secondary actions have flexible text, 54px minimum height, and multiline capacity. Hero actions stack below 600px.
- Localized display typography scales down at 380/600px thresholds and expands line height to at least 1.55 times font size; it does not truncate headings to a fixed number of lines.
- Header local-event microcopy hides below 380px; full navigation only appears at 1440px in English. This avoids long translated desktop navigation fighting the logo and action controls.
- useViewport shares one Dimensions subscription and supplies a matching server snapshot, avoiding independent fixed viewport assumptions across components.

## Remaining source findings

### R06-1 — Contact illustration intrudes into phone card padding (medium)

`src/app/contact.tsx`, `mapGraphic`: fixed width 240px. At a 320px viewport the mobile card content width is approximately `320 − 48 outer gutters − 48 card padding − 2 border = 222px`. A centered 240px illustration therefore occupies about 9px of padding on each side. This does not necessarily overflow the document, but breaks the intended card rhythm and becomes more restrictive with browser enlargement.

Suggested fix: `width: '100%'`, `maxWidth: 240` (retain the existing circles, whose largest diameter is 160px). Acceptance: visible illustration stays inside its padded content area at 320px; no decorative part overlaps card copy.

### R06-2 — Translated statistic units can outgrow tablet cells (medium, hypothesis awaiting live check)

`src/components/StatsSection.tsx`: three columns begin at 700px; the value/unit row has a 64px numeric value, a 16px gap, and an unconstrained unit. At 700px the inner width is approximately `(700 − 80) / 3 − 48 = 158.7px`. Long Sinhala/Tamil units compete with the number for this space.

Suggested fix: permit wrapping or stack value/unit at narrow tablet widths. Acceptance: all three localized units are visible inside their own cells at 700/768px, with no collision with separators. A document-width-only check is insufficient: compare text rectangles to cell rectangles.

### R06-3 — Registration options become cramped just above 900px (low)

`register.tsx`: the form moves into a desktop column above 900px while `trackRow` remains two columns from 601px. At 901px, after container gutters and the main gap, the form has approximately 460px external width; subtract its padding and divide across tracks, then subtract another 64px track-card padding. Each option has roughly 125px of usable text width. Longer translated option descriptions will wrap into tall narrow blocks. This is a readability concern, not a proven clipping defect.

Suggested improvement: base track layout on actual form-card width or retain stacked tracks below 1100px, and use smaller track padding than the outer card. Acceptance: registration options remain easy to scan in all languages at 901/1024px and 200% zoom.

### R06-4 — Three-card grids jump directly from one column to three (low)

Challenges/sponsors/events/news switch at 900px. For three-card groups the content width at 900px is about `(900 − 80 − 64) / 3 − 66 = 186px` per card. At this threshold 30px card headings and long translated phrases will occupy many lines. Existing `minWidth: 0` prevents minimum-content expansion, but does not solve readability.

Suggested improvement: one column below 700/768px, two columns on tablets, three only when a minimum readable card width can be maintained. Keep gaps shared rather than adding page-specific exceptions. Acceptance: translated headings avoid excessively narrow word fragments; controls remain discoverable beneath comparable card content.

### R06-5 — Information-page spacing differs from the repaired interior pattern (low)

Privacy and participation use `InformationPage`, whose body begins with `layout.section(width)`. PageHeader already supplies its own bottom spacing; the additional 56/88px top padding recreates the double gap removed from the other pages via `contentSection`.

Suggested fix: use `layout.contentSection(width)` for the information body. Acceptance: title/description-to-content rhythm matches about/events without collapsing space inside the sections.

## Recommended final validation

Check all 12 routes at 320, 390, 768, and 1280px in all three languages, and specifically include breakpoint neighbors 599/600/601, 899/900/901, 1099/1100, and 1439/1440px. Check both document width and descendants extending beyond their intended card boundaries. Open navigation and expand practice notes; validate forms so long error messages participate in the layout. At 200%/400% zoom verify that controls remain operable through vertical scrolling. Native devices and large native text settings need separate checks.

Reference intent: Hera's consistent grid/spacing is a useful target for aligned gutters and minimum readable card widths. SpaceX/Laika-style imagery and animation should remain decorative; neither visual prominence nor motion should require fixed-height text containers.
