# Animation & Experience Enhancement Plans

Source: `improve-animations` audit of 2026-07-13 against commit `920814a` (the code serving signalworks.live). Each plan is self-contained — an executor needs zero context beyond the plan file.

## Execution order

| # | Plan | Severity | Status | Depends on |
| --- | --- | --- | --- | --- |
| 1 | [001-scroll-reveal-cascade-fix](001-scroll-reveal-cascade-fix.md) | HIGH | DONE | — |
| 2 | [002-reduced-motion-coverage](002-reduced-motion-coverage.md) | HIGH | DONE | 001 |
| 3 | [008-transition-hygiene-tokens](008-transition-hygiene-tokens.md) | LOW | DONE | 001 (durations only apply after it) |
| 4 | [003-mobile-menu-enter-exit](003-mobile-menu-enter-exit.md) | MEDIUM | DONE | — (uses 008 tokens if present) |
| 5 | [006-services-dropdown-transitions](006-services-dropdown-transitions.md) | MEDIUM | DONE | — |
| 6 | [004-accordion-duration-fix](004-accordion-duration-fix.md) | MEDIUM | DONE | — (uses 008 tokens if present) |
| 7 | [005-flashlight-card-gating](005-flashlight-card-gating.md) | MEDIUM | DONE | 001 |
| 8 | [007-bar-grow-scalex-inview](007-bar-grow-scalex-inview.md) | MED-LOW | DONE | coordinates w/ 002 |
| 9 | [009-press-feedback-route-fade](009-press-feedback-route-fade.md) | ADDITIVE | DONE | 008 (transform in transition lists) |

## Cross-plan notes

- **Critical-pass 2026-07-13**: a fresh-context review found 9 gaps in the v1 plans; all amended in place (001 stagger regression + Tailwind `delay-*` collision + corrected symptom analysis; 005 owns FlashlightCard hover colors; 006 reduced-motion + un-nested `@starting-style`; 008/009 inventory completion incl. CtaBand/PageHero; 002 SSR-safe matchMedia; 003 motion-reduce variants).
- **001 first, always.** It renames the stagger classes and frees the transition channel every later plan's feel-check depends on.
- **index.css ownership**: 001/002/006/007/009 all touch `index.css`, and 002/006/007/009 all touch the SAME `prefers-reduced-motion` block — execute strictly sequentially, never in parallel.
- **002 ↔ 007**: the reduced-motion `.bar-grow` line differs depending on which runs first; both plans carry the coordination note. **002 ↔ 006**: 006 replaces 002's `.dropdown-panel` reduced-motion line with transition-none form.
- **FlashlightCard rule**: className transition utilities are inert on FlashlightCard roots (inline `style.transition` wins). Plan 005 owns those colors; plan 008 removes the dead classes.
- **Deliberate non-findings** (respected, do not "fix"): body FOUC fade (documented, `index.css:16-22`), SwipeableMarquee's JS-driven scroll (documented rationale in-file), Accordion's always-in-DOM body text (SEO decision), card `duration-500` surface tints (premium register), CountUp/TypedSearch (already correct).

## Verification after all plans

1. `npm run build` — clean.
2. Full feel pass at `npm run dev`: every plan's own feel-check section.
3. DevTools reduced-motion emulation sweep across Home, a service page, Approach, Work.
4. Real phone check for the mobile menu (003) if available.
