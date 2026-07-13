# 001 — Fix the scroll-reveal cascade: animation-driven reveals, collision-free stagger classes

- **Status**: DONE
- **Commit**: 920814a
- **Severity**: HIGH
- **Category**: Easing & duration (cascade bug)
- **Estimated scope**: `src/index.css` + ~12 JSX files (class renames + inline delay prop changes)
- **Amended**: 2026-07-13 after critical-pass (stagger regression, Tailwind delay-* collision, corrected symptom analysis)

## Problem

`.scroll-reveal` drives reveals with `transition: all 1s` plus `transition-delay` from `.delay-*` classes (`src/index.css:76-90`). Because transitions on an element are ONE shared mechanism, this collides with every other transition source on the same element. The actual symptoms, verified per element class:

1. **Elements with no competing transition source** (e.g. `FaqSection.jsx:13` cards with `transition-all` utility, plain `scroll-reveal` blocks): `.scroll-reveal`'s rule wins the cascade (defined after `@tailwind utilities`) → their hover states run at **1s with up to 0.5s dead delay**.
2. **Page-hero CTAs** (`PageHero.jsx:41`, `AeoFeature.jsx:64`, `CustomAiSoftware.jsx:45`, `AiSearchVisibility.jsx:49`): they carry `delay-300` for reveal stagger — but Tailwind ALSO generates its built-in `delay-300` utility (`transition-delay: 300ms`) for those literal class names, so the **hover lift on primary CTAs waits 300ms** even where other transition rules apply.
3. **FlashlightCard roots** (Features/Validation/Testimonials cards): the component's **inline** `style.transition` (`FlashlightCard.jsx:44-46`) beats all classes → their hover background/border changes currently **snap with no animation at all** (the inline list only covers `transform, opacity`). Plan 005 owns restoring animated colors there.
4. **`.card-surface` elements**: define their own later transition (`index.css:165`) — unaffected. Do not "fix" them.

Root cause for 1–3 is the same: reveals implemented as transitions occupy the element's only transition channel. Moving reveals to a one-shot keyframe animation frees transitions for interaction states. Scroll reveals fire once and never reverse, so keyframe non-interruptibility is fine.

```css
/* src/index.css:76-90 — current */
.scroll-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.delay-100 { animation-delay: 0.1s; transition-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; transition-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; transition-delay: 0.3s; }
.delay-500 { animation-delay: 0.5s; transition-delay: 0.5s; }
```

## Target

```css
/* target */
@keyframes scroll-reveal-in {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

.scroll-reveal {
  opacity: 0;
}

.scroll-reveal.is-visible {
  opacity: 1;
  animation: scroll-reveal-in 1s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

/* Reveal stagger. Renamed from .delay-* — those names collide with Tailwind's built-in
   transition-delay utilities, which is exactly the hover-lag bug this plan removes. */
.reveal-delay-100 { animation-delay: 0.1s; }
.reveal-delay-200 { animation-delay: 0.2s; }
.reveal-delay-300 { animation-delay: 0.3s; }
.reveal-delay-500 { animation-delay: 0.5s; }
```

**Why exactly this shape — do not deviate:**
- `animation-fill-mode: backwards` (NOT `forwards`, NOT `both`): during a stagger delay the element holds the `from` state (invisible) — no flash. After the animation ends there is NO forwards fill, so computed style falls back to `.is-visible { opacity: 1 }` and the element's `transform` becomes free again. A `forwards`/`both` fill sits at animation-cascade priority and would permanently override FlashlightCard's inline tilt transform and every `hover:-translate-y-*`.
- Base `.scroll-reveal` keeps only `opacity: 0` — the keyframe's `from` supplies the offset.
- The rename (not just editing) of `.delay-*` is mandatory: as long as markup contains literal `delay-300`, Tailwind emits its `transition-delay: 300ms` utility for it. The class must stop existing in markup.

## Repo conventions to follow

- Strong curve `cubic-bezier(0.16, 1, 0.3, 1)` — site-wide reveal easing, keep.
- The reveal trigger is the global IntersectionObserver in `src/components/Layout.jsx:12-31` — **do not touch it**; it works unchanged.

## Steps

1. In `src/index.css`, replace the `.scroll-reveal` block and `.delay-*` rules per the target (add `scroll-reveal-in` keyframes above them).
2. **Rename every markup usage** of the stagger classes: `grep -rnE '\bdelay-(100|200|300|500)\b' src --include="*.jsx"` and replace each with `reveal-delay-N`. Known sites at 920814a include `Features.jsx` (×5), `AeoFeature.jsx:64`, `Navbar.jsx` (if present), `Hero.jsx`, `PageHero.jsx:41`, `CustomAiSoftware.jsx:45`, `AiSearchVisibility.jsx:49`, `TestimonialsMarquee.jsx`, `Validation.jsx` — but the grep is authoritative, not this list. Elements that used `delay-*` for reveal stagger get the rename; if you find an element using `delay-*` deliberately for a hover/transition delay (none known), STOP and report.
3. **Convert inline stagger delays from transition to animation** — after this plan, `style={{ transitionDelay }}` on scroll-reveal elements is inert. Run `grep -rn "transitionDelay" src` and change each scroll-reveal-related one to `animationDelay` (same value). Known sites at 920814a:
   - `src/components/ui/StepRail.jsx:9`
   - `src/components/ui/SystemDiagram.jsx:24`
   - `src/components/TestimonialsMarquee.jsx:50`
   - `src/components/Validation.jsx:64`
   - `src/components/ui/Prose.jsx:60`
   - `src/pages/AiSecurityGovernance.jsx:51`
   - `src/pages/AiSearchVisibility.jsx:68`
   EXCEPTION: `src/components/ui/SplitHeading.jsx` uses `transitionDelay` for its own word-level transition system (not scroll-reveal) — leave it alone.
4. Confirm `grep -rnE '\bdelay-(100|200|300|500)\b' src` returns zero and `grep -rn "transitionDelay" src` returns only SplitHeading.

## Boundaries

- Do NOT touch `Layout.jsx`, `FlashlightCard.jsx` (plan 005), `.card-surface` rules, or `.animate-reveal`.
- Do NOT change any hover/transition utility classes in this plan (plan 008 owns hygiene).
- No new dependencies.
- If cited code has drifted from 920814a, STOP and report.

## Verification

- **Mechanical**: `npm run build` passes; the two greps in Step 4 are clean.
- **Feel check**: `npm run dev`:
  - Scroll the homepage: all reveals still stagger exactly as before (Features cards cascade, testimonials stagger, StepRail steps sequence — this is the Finding-1 regression canary; if everything reveals simultaneously, Step 3 was missed).
  - Hover a FaqSection card: lift + tint respond **instantly** (previously ~1s crawl).
  - Hover the CTA on any service-page hero (e.g. /services/custom-ai-software): the `-translate-y-0.5` lift starts **instantly** (previously 300ms dead delay).
  - Mouse over a Features FlashlightCard after it revealed: tilt still works (fill-mode canary).
  - DevTools Animations panel: reveals show as `scroll-reveal-in` animations with correct per-element delays.
- **Done when**: staggered reveals unchanged, FaqSection/CTA hovers instant, tilt intact, greps clean.
