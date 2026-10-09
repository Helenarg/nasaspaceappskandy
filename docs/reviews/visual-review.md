# Visual and motion inspection

Date: 2026-10-09. Viewpoint: demanding art director, evaluating hierarchy, visual rhythm, brand expression, and useful motion. Read-only review of the current local build and source; no app code changed and no forms submitted.

## Coverage and confidence

Live desktop inspection at 1280 × 720: homepage, ambassadors (Tamil), challenges, and news, including scrolling. Reviewed shared components and route styles. Mobile observations use the existing `docs/design-reference/tamil-mobile.jpg` screenshot from the preceding implementation verification, **not a new mobile run**. No shared viewport or language setting was changed by this reviewer. Language changed between navigations because another parallel inspector was inspecting Tamil.

Live reference screenshots: Planet Ventures, Laika Ventures, and Hera. Web retrieval also checked all six supplied references; the official 2026 URL returned 502, Constellation failed to fetch, and SpaceX supplied no extractable text. Therefore this report does not establish official brand compliance or make current visual claims about those unavailable references. The parent review separately inspected the official website.

Severity: P1 = significant user-facing improvement; P2 = design consistency/quality improvement; P3 = optional art direction. These are visual findings, not claims that every issue in the project has been identified.

## Findings

### V1 — P1: the hero's main actions almost disappear below the first screen

**Observed:** at 1280 × 720, the homepage `JOIN HACKATHON` anchor begins at y = 703.4 and is 54px tall. Only its top edge fits in the viewport. The navigation registration action is visible, but the main invitation and the secondary challenge action require scrolling. The prior 390px Tamil screenshot also places both actions near the bottom of a very tall introduction.

**Evidence:** `src/components/HeroSection.tsx:21` uses 112px desktop/72px mobile top padding; line 24 uses a three-line headline at 88px on desktop; lines 25–28 add the description and action margins. The live headline rectangle was 294px high.

**Impact:** the first impression is strong, but the immediate next step is weak on common laptop screens and particularly text-heavy localizations.

**Fix:** use viewport-height-aware hero padding and a fluid headline range; shorten the mobile introduction with approved copy; preserve at least one complete primary action in a 720px desktop and common mobile viewport. Do not shrink Sinhala/Tamil into illegibility. Planet's live hero keeps its two actions visible alongside the headline and description.

### V2 — P1: interior information is much smaller than the welcoming introduction

**Observed:** challenge descriptions, ambassador privileges, news descriptions, metadata and actions feel dense and small relative to the spacious 18px introductions. The crowded desktop navigation is especially small.

**Evidence:** `Navbar.tsx:82` uses 12px navigation text; `news.tsx:261` uses 10px dates, line 278 uses 13px description text, and line 291 uses 11px read actions; `events.tsx:648` uses 13px workshop descriptions with 20px line height; `ambassadors.tsx:427` uses 13px privilege descriptions. This is a readability finding, **not an unmeasured WCAG font-size failure**.

**Impact:** the primary decisions and supporting details are visually secondary to decoration, harder to scan, and less comfortable for participants with limited English.

**Fix:** establish role-based type tokens: typically 16px body, 14px important labels/actions, and 12–13px incidental metadata. Use fewer navigation destinations or group them before enlarging navigation text. Keep script-specific spacing and line height. Retain Fira Sans/Overpass and approved colors rather than importing reference-site branding.

### V3 — P2: section padding accumulates into unintentional empty bands

**Observed:** news cards and the media-kit block have a conspicuous uninterrupted blank band between them; challenge results begin well below the filters. The gutters are already consistent, so this is a vertical rhythm issue.

**Evidence:** `PageHeader.tsx:15` adds 40px bottom padding; `layout.ts:6` and lines 12–13 add another 88px top padding to the next desktop section, producing 128px before content. Adjacent `layout.section` blocks produce 176px combined vertical padding. Both `news.tsx:196` and line 297 use this full-section preset.

**Impact:** disconnected sections and extra scrolling dilute the otherwise coherent grid layout.

**Fix:** assign spacing to the boundary once. Add compact first-content and adjacent-section variants, or let the page stack own vertical gaps. Keep generous breathing room for cinematic image sections but use smaller gaps between task-related controls and results. Verify the same spacing roles across all routes and scripts.

### V4 — P2: percentage-based grids do not consistently fill the shared column system

**Observed:** the three news cards leave unused trailing horizontal space while the media-kit block reaches the shared right gutter. Other routes use their own 48%, 47%, 31%, or 23% calculations.

**Evidence:** `news.tsx:218` sets 20px grid gaps and line 229 sets each card to 31%; `events.tsx:611` chooses 31%/47%; `sponsors.tsx:322` chooses 23%/47%. At a 1136px content width, three 31% cards plus two 20px gaps leave about 39.5px unused.

**Impact:** the background grid promises precision, while content edges fail to align consistently.

**Fix:** introduce one responsive grid primitive using available container width minus gaps divided by column count, with a web/native-compatible implementation. Choose columns from minimum useful card widths rather than global viewport guesses. Test 900–1100px transitions and all localized content lengths.

### V5 — P2: component shape and surface choices remain inconsistent

**Observed:** homepage actions are crisp, nearly square; interior cards and subpanels alternate among many radii, translucent fills, rounded icon containers and pills. News media-kit UI looks like a separate dashboard within the same site.

**Evidence:** `ActionLink.tsx:20` uses radius 4; `news.tsx` uses radius 8 at line 304, 14 at line 372, 18 at line 416 and 30 at line 423; `events.tsx:445` uses a radius-20 countdown panel; many surfaces repeat hard-coded rgba values instead of theme roles.

**Impact:** the design has shared colors but not yet a shared component language.

**Fix:** define a small radius/surface/border system, then migrate cards, nested panels, buttons, pills and icon containers by role. Keep a deliberate exception only when it communicates meaning. Hera's aligned numbered structure and Planet's restrained edges provide useful inspiration; their exact typography and colors should not replace Space Apps branding.

### V6 — P2: motion is concentrated on the homepage and every page's introduction

**Observed:** the homepage has imagery drift, an orbit, staged headlines and a ticker. Challenge results, news cards and ambassador content enter as static dense blocks after their animated introductions.

**Evidence:** shared `PageHeader` animates all route headings, but the route bodies in `news.tsx`, `events.tsx`, and `ambassadors.tsx` do not use `Reveal`. The source motion map places `SpaceScene`, `OrbitMotif`, and `MissionTicker` on the homepage.

**Impact:** this likely explains why the site can still feel less choreographed than the supplied references despite having several effects.

**Fix:** add short, restrained group reveals to section headings and the first visible row of informational cards, with small stagger and immediate interactive readiness. Animate filter-result changes and drawer transitions where motion clarifies state. Avoid animating every form field or making users wait for content. Preserve the existing reduced-motion and offscreen-pausing behavior.

### V7 — P2: default entrance timing is slow for repeat navigation

**Evidence:** `Headline.tsx:19` uses 1050ms travel plus 100ms + 130ms per-line delays, so the third hero line reaches its final state around 1410ms. `Reveal.tsx:6` defaults to 900ms for other content. Live route screenshots caught partially faded headings during entry, later confirmed fully visible.

**Impact:** each navigation initially feels theatrical rather than immediately readable. This is a timing/design finding, not a claim of permanent clipped or missing content.

**Fix:** separate motion roles: short route-entry transitions, slightly longer single hero staging, and subtle ambient loops. Consider 350–600ms for ordinary content and a shorter hero stagger. Keep complete Indic lines rather than splitting graphemes. Laika and Hera are inspiration, but their observed overflowing/initially blank states show why their animation decisions should not be copied uncritically.

### V8 — P3: interior art direction loses the human side of a local community event

**Observed:** the homepage has two striking NASA image scenes; inspected interior pages mostly use repeated icons and dark cards. There is little visual evidence of the people, venue, teamwork or local participation described by the text.

**Evidence:** `HeroSection.tsx:19` and `MissionSection.tsx:32` hold the photographic scenes; route card bodies largely use icon components. The organizing committee uses generic avatar containers in `about.tsx:203`.

**Impact:** the site presents space excitement more effectively than local belonging and event credibility.

**Fix:** when organizers supply approved real assets, add one carefully composed venue/team/workshop image where it helps the page's purpose. Use genuine photographs and confirmed people; do not fabricate proof with stock images or invented portraits. Preserve credits and legibility. NASA imagery can establish wonder, while local imagery should substantiate participation.

## Reference interpretation

- [Planet Ventures](https://www.planetventuresinc.com/): strong separation of headline, description and actions; prominent orbital line composition and visible grid; borrow hierarchy and restrained geometry.
- [Laika Ventures](https://laika-ventures-staging.webflow.io/): ambient planets, large headline composition and varied editorial blocks; borrow layered depth and selective staging. Its live screenshot showed horizontal overflow at the inspected viewport, so it is not a responsive-quality benchmark.
- [Hera](https://www.heratechnologies.com/): clear grid lines, dramatic launch imagery and numbered editorial structure; borrow alignment and pacing. It initially showed a blank content region before the image/headline appeared in this inspection, so avoid reproducing load-dependent blank states.
- [Official 2026 site](https://www.spaceappschallenge.org/2026/), [SpaceX](https://www.spacex.com/), and [Constellation](https://constellation-global-a45b00480fa468ff6c.webflow.io/): no fresh visual conclusion from this reviewer because retrieval was unavailable or empty; consult the parent's live official-site inspection and prior documented reference research.

## What already works

The shared navy/yellow/blue palette, official wordmark, common page gutters, consistent page-heading structure, original favicon, real NASA imagery credits, and script-aware fonts provide a strong foundation. The current motion system already includes important reduced-motion/offscreen behavior and a pausable ticker. Preserve these while making the site clearer and more consistent; more animation alone will not solve the hierarchy and content-density problems.

## Suggested acceptance checks

1. Full primary hero action visible on a 1280 × 720 desktop and an agreed mobile baseline in all three languages.
2. Essential prose and actions comfortably readable without zoom; native-speaker review of localized layout/copy.
3. Card columns reach the same content edges as adjacent sections, with consistent gaps through breakpoint changes.
4. Section boundaries use intentional spacing once, and filters remain visually connected to results.
5. Route content becomes promptly readable, remains interactive during motion, and is static for reduced-motion preferences.
6. Genuine local images and confirmed organizer content are used only after appropriate assets are available.
