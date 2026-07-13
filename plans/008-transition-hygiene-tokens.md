# 008 — Transition hygiene: tokens + property-scoped transitions

- **Status**: DONE
- **Commit**: 920814a
- **Severity**: LOW (cohesion + performance)
- **Category**: Cohesion & tokens / performance
- **Estimated scope**: `tailwind.config.js` + ~10 component files, mechanical sweep

## Problem

1. The strong curve `cubic-bezier(0.16, 1, 0.3, 1)` is hand-typed in 6+ places with no token; `duration-400` was invented in one place because the scale lacks it (plan 004's bug).
2. `transition-all` appears ~20 times where only colors/transform/filter change — it animates unintended properties and invites exactly the cascade-class conflicts plan 001 fixed.
3. `TestimonialsMarquee.jsx:62` transitions a `grayscale` filter over 700ms via `transition-all` — paint-heavy and beyond the ~300ms interactive budget.

## Target

**Tokens** in `tailwind.config.js`:

```js
theme: {
  extend: {
    fontFamily: { sans: ['Inter', 'sans-serif'] },
    colors: { sakura: { dark: '#0a051e' } },
    transitionTimingFunction: {
      swift: 'cubic-bezier(0.16, 1, 0.3, 1)',
    },
    transitionDuration: {
      400: '400ms',
    },
  },
},
```

**Property-scoped transitions** at these exact call sites (the full inventory of `transition-all` at 920814a; each line shows the replacement class only — everything else on the element stays):

**FlashlightCard caveat (critical-pass finding 3):** on any element that is a `FlashlightCard` root, className transition utilities are INERT — the component's inline `style.transition` overrides them. Plan 005 carries the color durations there. For those rows the correct move is to REMOVE the transition classes with no replacement. Verify per element whether it's a FlashlightCard root before choosing the replacement column.

| File:line | Current | Replace with |
| --- | --- | --- |
| `TestimonialsMarquee.jsx:62` (portrait `<img>`) | `transition-all duration-700` | `transition-[filter] duration-300 ease-swift` |
| `TestimonialsMarquee.jsx:49` (card) | `transition-all duration-500` | FlashlightCard root → remove both classes (plan 005 inline owns it); if NOT a FlashlightCard, `transition-colors duration-500 ease-swift` |
| `Validation.jsx:63` (card) | `transition-all duration-500` | same rule as above |
| `Validation.jsx:91` (book card) | `transition-all duration-500` | same rule as above |
| `Validation.jsx:92` (gradient sheen) | `transition-all duration-1000` | `transition-[background-position] duration-1000` |
| `Validation.jsx:99` (calendly btn) | `transition-all transform` | `transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-swift` — and delete the stray `transform` class (no-op holdover) |
| `Navbar.jsx:89` (nav bar) | `transition-all duration-300` | `transition-[background-color,border-color,backdrop-filter] duration-300` |
| `Navbar.jsx:120` (nav CTA) | `transition-all duration-300` | `transition-[transform,box-shadow] duration-300 ease-swift` |
| `Hero.jsx:203` (hero CTA) | `transition-all duration-300` | `transition-[transform,box-shadow] duration-300 ease-swift` |
| `AeoFeature.jsx:64` (CTA) | `transition-all duration-300` | `transition-[transform,box-shadow] duration-300 ease-swift` |
| `Features.jsx:41,70,92,109,125` (5 cards) | `transition-all duration-500` | FlashlightCard roots → remove both classes (plan 005 inline owns colors) |
| `FinalCta.jsx:13` (card) | `transition-all duration-500` | same FlashlightCard rule |
| `FinalCta.jsx:15` (gradient sheen) | `transition-all duration-1000` | `transition-[background-position] duration-1000` |
| `FinalCta.jsx:22` (calendly btn) | `transition-all transform` | `transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-swift` + delete stray `transform` |
| `FaqSection.jsx:13` (card) | `transition-all` | `transition-[color,background-color,border-color,transform] duration-300 ease-swift` |
| `FaqSection.jsx:26` | `transition-all` | scope to the properties that element actually changes (read it; likely `transition-colors duration-300`) |
| `SwipeableMarquee.jsx:119,127` (arrows) | `transition-all` | `transition-colors duration-300` |
| `CtaBand.jsx:19,20,31` (shared page-end CTA band) | `transition-all` (×3) | 19/20: scope to actual hover properties (read element); 31 (CTA button): `transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-swift` |
| `RelatedLinks.jsx:19` | `transition-all` | scope to actual hover properties (likely `transition-colors duration-300`) |
| `PageHero.jsx:41` (service-page hero CTA) | `transition-all duration-300` | `transition-[transform,box-shadow] duration-300 ease-swift` |
| `CustomAiSoftware.jsx:45` (CTA) | `transition-all duration-300` | `transition-[transform,box-shadow] duration-300 ease-swift` |
| `AiSearchVisibility.jsx:49` (CTA) | `transition-all duration-300` | `transition-[transform,box-shadow] duration-300 ease-swift` |
| `SplitHeading.jsx:37` | `transition-all duration-700` | owned by plan 002 (skip here; the zero-grep gate runs AFTER 002) |

Notes:
- Tailwind arbitrary transition lists need real CSS property names (`transition-[color,background-color,...]`), never the shorthand `colors`. The built-in `transition-colors` utility is fine where colors are all that change.
- Non-FlashlightCard cards keep `duration-500`: after plan 001 these durations actually apply, and a 500ms surface tint on large hover targets suits the premium register (deliberate — the sub-300ms rule targets interactive feedback like buttons/dropdowns).
- The 700ms→300ms portrait change: grayscale-to-color is hover feedback; 300ms reads snappier and halves paint time. Keep `grayscale`/`group-hover:grayscale-0` as-is.
- This table was verified against 920814a by a critical-pass sweep, but the authoritative source is `grep -rn "transition-all" src` at execution time — cover every hit, using the patterns above.

## Repo conventions to follow

- After this plan, `ease-swift` and `duration-400` are the canonical tokens — plans 003/004/006 written with arbitrary values can be normalized to tokens if executed after this one (each notes it).

## Steps

1. Add the two token blocks to `tailwind.config.js`.
2. Apply the table row by row; `grep -rn "transition-all" src` afterwards must return zero hits.
3. Visual spot-check each changed element (hover it) — property-scoping means anything that used to change on hover but isn't in the new property list will SNAP; if you find such a property, add it to that element's transition list rather than reverting to `all`.

## Boundaries

- Do NOT change any duration except the portrait 700→300 row.
- Do NOT touch `index.css` (owned by plans 001/002/006/007).
- No dependencies.

## Verification

- **Mechanical**: `npm run build`; `grep -rn "transition-all" src` → 0 results.
- **Feel check**: hover every changed element (cards, CTAs, nav, portraits, arrows): all previously-animated hover properties still animate (no snapping), portraits colorize in ~300ms.
- **Done when**: zero `transition-all` in src, tokens exist, no hover regressions.
