# 002 — Extend prefers-reduced-motion to all CSS motion

- **Status**: DONE
- **Commit**: 920814a
- **Severity**: HIGH
- **Category**: Accessibility
- **Estimated scope**: 2 files (`src/index.css`, `src/components/ui/SplitHeading.jsx`), ~30 lines

## Problem

The reduced-motion block in `src/index.css:29-31` covers only the body fade:

```css
/* src/index.css:29-31 — current */
@media (prefers-reduced-motion: reduce) {
  body { animation: none; }
}
```

Users with `prefers-reduced-motion: reduce` still get: 40px slide-up reveals on every section (`.scroll-reveal`), a 1s clip-path + 40px rise on the navbar and mobile menu (`.animate-reveal`), growing chart bars (`.bar-grow`), continuously drifting marquees (`.animate-marquee`, `.animate-marquee-slow`), purple light beams (`.beam-h`/`.beam-v`), and word-by-word heading slides (`SplitHeading.jsx`, inline styles). The JS components (`UnicornBackground`, `Hero`, `CountUp`, `TypedSearch`, `SwipeableMarquee`) already gate correctly — the CSS layer and SplitHeading do not.

Reduced motion means gentler, not zero: keep opacity/color feedback, remove movement (translate/clip-path/continuous drift).

## Target

```css
/* target — replaces src/index.css:29-31 */
@media (prefers-reduced-motion: reduce) {
  body { animation: none; }

  /* Reveals: keep a short fade, drop the movement */
  .scroll-reveal { opacity: 1; }
  .scroll-reveal.is-visible { animation: fade-in 0.3s ease-out backwards; }
  .animate-reveal { animation: fade-in 0.3s ease-out forwards; }

  /* Chart bars render at full value instantly */
  .bar-grow { animation: none; width: var(--bar-width, 0%); }

  /* Ambient motion stops entirely */
  .animate-marquee, .animate-marquee-slow { animation: none; }
  .beam-h, .beam-v { animation: none !important; }

  /* Dropdown appears instantly (still functional) */
  .dropdown-panel { animation: none; }
}
```

Notes on each choice:
- `.scroll-reveal` base is `opacity: 0` (after plan 001) — setting `opacity: 1` inside the media query means content is never hidden for reduced-motion users even before the observer fires; the `.is-visible` fade is a gentle non-vestibular acknowledgment. `fade-in` already exists at `src/index.css:66-69`.
- `.beam-h`/`.beam-v` have `opacity: 0` at rest and only become visible via animation — `animation: none !important` (the `!important` beats any inline `animation` style applied where beams are instantiated) leaves them invisible, which is correct: they're pure decoration.
- Marquees: `animation: none` freezes the strip at `translateX(0)` showing the first copy statically — content remains readable. (`SwipeableMarquee` is JS-driven and already gates itself; this covers the CSS `.animate-marquee*` users: the hero trusted-by strip.)
- `.bar-grow`: after plan 007 converts bars to `scaleX`, revisit this line to `transform: scaleX(1); animation: none;` — plan 007's Steps include that coordination; if 007 runs first, write it that way here.

And in `src/components/ui/SplitHeading.jsx` (inline-styled transitions can't be reached from CSS): bail out of the animated path when reduced motion is on.

**SSR constraint (do not deviate):** this site prerenders (`vite build --ssr` + `prerender.js`). `matchMedia` must NOT be read at render scope — server renders `false`, a reduced-motion client's first render would be `true`, and React hydration mismatches. Read it inside the effect and store in state, so the first client render matches the server exactly:

```jsx
/* target — inside SplitHeading */
const [reduceMotion, setReduceMotion] = useState(false)

useEffect(() => {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setReduceMotion(true)
    setIsVisible(true)
    return
  }
  // ...existing observer code unchanged
}, [])

/* on each word <span>'s style: when reduceMotion, no transition/transform */
style={{
  transitionProperty: reduceMotion ? 'none' : undefined,
  transform: reduceMotion ? 'none' : (isVisible ? 'translateY(0)' : 'translateY(28px)'),
  opacity: isVisible ? 1 : 0,
  // ...rest unchanged
}}
```

While in the file: the word spans use `transition-all duration-700` (`SplitHeading.jsx:37`) — scope it to `transition-[opacity,transform] duration-700` (only these two properties ever change).

## Repo conventions to follow

- Match the existing matchMedia guard style used in `src/components/ui/TypedSearch.jsx:12-14` (`typeof window !== 'undefined' && window.matchMedia && ...`).
- Keep the explanatory comment style of `index.css` (short, above the rule).

## Steps

1. Replace the `@media (prefers-reduced-motion: reduce)` block in `src/index.css` with the target block above. Place it at the END of the file so it wins the cascade over everything it overrides (its current position at line 29 is before `.scroll-reveal` etc. — media queries don't add specificity, so position matters).
2. Edit `src/components/ui/SplitHeading.jsx` per the target: reduced-motion users get instant, static headings (opacity flips with no transition).
3. Grep `src` for `animationDelay` inline styles (`MentionBars.jsx:31` uses one) — confirm the CSS `animation: none` covers them (it does: `animation: none` zeroes the whole animation regardless of delay).

## Boundaries

- Do NOT touch the JS components that already gate (`UnicornBackground`, `Hero`, `CountUp`, `TypedSearch`, `SwipeableMarquee`).
- Do NOT remove any animation for non-reduced-motion users.
- No new dependencies.
- If plan 001 has not been executed yet, STOP — this plan assumes `.scroll-reveal` is animation-driven.

## Verification

- **Mechanical**: `npm run build` passes.
- **Feel check**: `npm run dev`, then DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`:
  - Reload: no 40px slides anywhere; sections fade in gently; navbar appears without the clip-path rise.
  - The AEO mention bars render at their full widths immediately.
  - The hero trusted-by marquee is static; testimonial wall (JS-driven) is static.
  - Headings (SplitHeading) appear instantly, no word cascade.
  - Turn emulation OFF and reload: everything animates exactly as before.
- **Done when**: with reduced motion emulated, nothing on the page translates, clips, drifts, or grows — only gentle opacity fades remain — and the default experience is unchanged.
