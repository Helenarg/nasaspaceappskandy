# Post-fix inspection 04: motion and lifecycle

Reviewed 9 October 2026. Viewpoint: a motion designer and performance reviewer who values purposeful pacing, stable content and user control. Scope: the current shared motion store, route transitions, reveals, orbital imagery, ticker, viewport subscriptions and event timer. This is source inspection with an isolated runtime test of the installed React Native Web loop implementation; it is not a fresh browser/device recording.

## Confirmed findings supplied to the lead reviewer

### M04-01 — P1: image drift does not restart after becoming visible again

`src/components/SpaceScene.tsx` creates one `Animated.loop` per effect. Its IntersectionObserver calls `loop.stop()` when the scene leaves the viewport and `loop.start()` on re-entry. The installed `react-native-web/src/vendor/react-native/Animated/AnimatedImplementation.js` sets its internal `isFinished` flag to true in `stop()`. A subsequent `start()` exits without starting the underlying animation unless `reset()` clears the flag. An initially offscreen scene may stop before its first entrance and therefore never animate.

I extracted the actual installed `loop` function, stripped its Flow annotations with the installed Babel plugin, and executed it against a fake animation counter in an isolated VM. Result:

```json
{"firstStart":1,"startAfterStop":1,"startAfterReset":2,"stops":1}
```

Recommended correction: reset the loop before a stopped-to-visible restart, or create a new loop on each visibility transition. Ignore redundant observer callbacks while already visible. Acceptance: enter, leave and re-enter both homepage image scenes; drift must advance again while offscreen drift must stop.

### M04-02 — P2: the global pause does not cover CSS movement

`src/theme/motion.ts` combines OS preference and a persisted user pause for the React hooks. `src/app/+html.tsx` only suppresses CSS transition durations for the OS `prefers-reduced-motion` media query. The user pause has no matching root attribute/CSS selector. Action buttons still translate by 4px, arrows by 7px, and pressed controls by 1px with transition feedback when the global control says animations are paused.

Recommended correction: reflect effective reduced motion to the HTML root and disable motion-producing transforms/transitions for that state while preserving color/focus feedback. Acceptance: global pause with normal OS settings suppresses hover/press travel as well as loops; resume restores motion only if the OS permits it.

### M04-03 — P2: native stored preference can overwrite a new user choice

During native initialization, `SecureStore.getItemAsync` later assigns `userPaused` unconditionally. A user choosing Pause while that read is pending can be unpaused when an older stored value resolves. This is an execution-order risk inferred directly from the store, not reproduced on a native device.

Recommended correction: capture a preference revision at read start and apply the stored value only when no explicit choice has occurred meanwhile. Acceptance: resolve a stored false value after selecting Pause and verify that Pause remains active.

## Checks that support the implementation

- Reveals begin visible in static HTML and only hide during progressive enhancement. Reduced motion restores fully visible content immediately. Effects disconnect their observer and stop their animation on cleanup.
- Masked headlines observe the untransformed wrapper, avoiding the earlier failure where a translated line was outside its clipping region. Complete lines preserve Sinhala and Tamil grapheme sequences. Entrance durations are finite (620–650ms), with small line delays rather than an indefinite introduction.
- Route fade is 180ms and becomes `none` with effective reduced motion. Navbar modal also reads the same preference. The former unconditional challenge modal has been replaced with inline practice notes.
- Orbit and ticker recreate their animation effects when reduced motion or visibility changes; this avoids the specific stopped-loop reuse defect found in SpaceScene.
- Ticker has a 44px pause control, translated action name and a static single-group arrangement under reduced motion. Its duplicated visual groups are hidden from assistive technology and the shell supplies one content label.
- Viewport changes use one shared Dimensions subscription that is removed when the last consumer unsubscribes. The shared motion store likewise cleans up its single OS/storage listener when the last hook unsubscribes.
- SpaceScene scroll scheduling is gated by visibility and at most one pending requestAnimationFrame. Cleanup cancels that frame and removes its passive scroll listener.
- Event countdown schedules only while upcoming, schedules its end transition once when live, and schedules nothing after ending. Cleanup clears the outstanding timeout; the earlier perpetual expired countdown is removed.

## Remaining test coverage and refinements

`useMotionVisibility` is web-only and returns visible on native platforms. There is also no explicit browser-document-hidden/AppState/route-focus suspension. Browser throttling may reduce background work, but it is not a tested pause policy. Native inactive-screen and app-background behavior should be checked on a real device before claiming platform-wide offscreen suspension.

No OS preference emulation, real-device lifecycle test or screen-reader announcement test was performed in this focused inspection. Global persistence, OS precedence and pause/resume deserve integration checks after the fixes above.

Laika's staged hierarchy and Planet's orbital accents remain useful inspiration, as described in the earlier project reference review. The current design already uses both principles. More loops are not a remedy for lifecycle faults: prioritize reliable re-entry, restrained staging and meaningful static alternatives.

## Coordination status

M04-01 through M04-03 were sent to the lead reviewer for implementation. This reviewer did not modify application code or submit forms. Findings above describe the inspection snapshot; the summary report should record any subsequently applied fixes and their verification.
