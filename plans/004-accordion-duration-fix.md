# 004 — Accordion: apply the intended 400ms + strong curve

- **Status**: DONE
- **Commit**: 920814a
- **Severity**: MEDIUM
- **Category**: Intent bug (easing & duration)
- **Estimated scope**: 1 file (`src/components/ui/Accordion.jsx`), 1 line

## Problem

```jsx
/* src/components/ui/Accordion.jsx:22 — current */
<div className={`relative z-10 grid transition-all duration-400 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-70'}`}>
```

`duration-400` does not exist — it's not in Tailwind 3's default duration scale (75/100/150/200/300/500/700/1000) and `tailwind.config.js` doesn't extend it, so the class generates nothing and the accordion animates at `transition-all`'s default **150ms**, not the intended 400ms. `ease-out` is also the weak built-in curve; the repo's convention is the strong `cubic-bezier(0.16, 1, 0.3, 1)`. And `transition-all` on a grid row transitions every property, when only `grid-template-rows` and `opacity` change.

## Target

```jsx
/* target */
<div className={`relative z-10 grid transition-[grid-template-rows,opacity] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-70'}`}>
```

(If plan 008 has already been executed, use its tokens instead: `duration-400 ease-swift`.)

The `grid-rows-[1fr]/[0fr]` height trick stays — it's the accepted no-JS way to animate an accordion to auto height, it's transition-based (interruptible), and the body text stays in the DOM for crawlers (documented at the top of the file — a settled decision, respect it).

## Repo conventions to follow

- Arbitrary-value classes are already used in this codebase (`grid-rows-[1fr]`, `bg-[#0a051e]/60`), so `duration-[400ms]` / `ease-[cubic-bezier(...)]` match the local idiom.

## Steps

1. Apply the one-line class change in `src/components/ui/Accordion.jsx:22`.

## Boundaries

- Only this line. Do NOT restructure the accordion, touch the chevron (its `duration-300` works), or change the open/close logic.
- If the line differs from the excerpt, STOP and report.

## Verification

- **Mechanical**: `npm run build` passes; inspect the built CSS or DevTools computed styles to confirm `transition-duration: 400ms` actually applies (this is the regression the bug hid).
- **Feel check**: `npm run dev` → Approach or a services page with the accordion:
  - Open/close a row: expansion runs noticeably smoother/slower than before (400ms vs 150ms) with the springy strong-curve settle.
  - Click another row mid-animation: motion retargets (transitions, not keyframes).
- **Done when**: DevTools shows 400ms + the custom curve on `grid-template-rows`, and open/close feels deliberate rather than snappy-abrupt.
