# 007 — Mention bars: composited growth, triggered in view

- **Status**: DONE
- **Commit**: 920814a
- **Severity**: MEDIUM-LOW
- **Category**: Performance + purpose
- **Coordinates with**: plan 002 (reduced-motion block references `.bar-grow`)
- **Estimated scope**: 2 files (`src/index.css`, `src/components/ui/MentionBars.jsx`), ~30 lines

## Problem

```css
/* src/index.css:199-206 — current */
@keyframes bar-grow {
  from { width: 0; }
  to { width: var(--bar-width, 0%); }
}
.bar-grow {
  width: 0;
  animation: bar-grow 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

```jsx
/* src/components/ui/MentionBars.jsx:31 — current */
<div className="bar-grow absolute top-0 bottom-0 left-0 bg-gradient-to-r from-purple-500/70 to-purple-400 rounded-full" style={{ '--bar-width': `${e.pct}%`, animationDelay: `${i * 110}ms` }}></div>
```

Two problems: `width` is a layout property (layout + paint per frame, 5 bars staggered), and the animation fires **on mount** — the component sits below the fold on the AI Search Visibility page, so the grow usually finishes before anyone scrolls to it. The confidence-interval story this chart tells never actually animates for the user.

## Target

Composited `scaleX` growth, triggered by an IntersectionObserver exactly like the repo's own `CountUp`:

```css
/* target — replaces the bar-grow block */
@keyframes bar-grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
.bar-grow {
  transform: scaleX(0);
  transform-origin: left center;
}
.bar-grow.is-grown {
  transform: scaleX(1);
  animation: bar-grow 900ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
}
```

(`backwards` fill so the stagger delay holds the empty state; no `forwards` fill — the end state comes from `.is-grown`'s own `transform`, mirroring plan 001's fill-mode rationale.)

```jsx
/* target — MentionBars.jsx */
import React, { useEffect, useRef, useState } from 'react'
// ...data unchanged...

function MentionBars() {
  const ref = useRef(null)
  const [grown, setGrown] = useState(false)

  // Same in-view one-shot pattern as CountUp.jsx
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGrown(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="card-surface rounded-sm p-6 lg:p-8 scroll-reveal">
      {/* ...unchanged until the bar div: */}
      <div
        className={`bar-grow absolute top-0 bottom-0 left-0 bg-gradient-to-r from-purple-500/70 to-purple-400 rounded-full ${grown ? 'is-grown' : ''}`}
        style={{ width: `${e.pct}%`, animationDelay: `${i * 110}ms` }}
      ></div>
      {/* ... */}
```

The bar's final `width` is now a static inline style; only `transform` animates. The `--bar-width` custom property is gone.

**Plan 002 coordination:** the reduced-motion block's `.bar-grow` line must become:

```css
.bar-grow { animation: none; transform: scaleX(1); }
```

(If 002 already executed with the width-based line, update it here; if 002 runs after, its author uses this form — the 002 plan text calls this out.)

**Known visual tradeoff (accepted):** `scaleX` squashes the bar's rounded end-cap during the 900ms grow. At `h-2.5` this is barely perceptible; the parent track already has `overflow-hidden rounded-full` which masks the left edge. Do not add wrapper elements to "fix" it.

## Steps

1. Replace the `bar-grow` CSS block in `src/index.css` per the target.
2. Apply the MentionBars.jsx changes: observer hook, `ref` on the root, `is-grown` class toggle, `width` inline style replacing `--bar-width`.
3. Update the reduced-motion `.bar-grow` line per the coordination note.

## Boundaries

- Do NOT touch the CI band div (`left/width` inline styles — static, never animated) or the copy.
- Do NOT extract a shared observer hook — the repo deliberately keeps small local observers (`CountUp`, `SplitHeading`, `Layout`); match that.
- If the cited code drifted, STOP and report.

## Verification

- **Mechanical**: `npm run build` passes.
- **Feel check**: `npm run dev` → page containing MentionBars (AI Search Visibility service page):
  - Bars are empty until the card scrolls into view, then grow left-to-right, staggered 110ms.
  - DevTools Performance during the grow: no layout thrash (transform-only).
  - Reduced-motion emulation: bars render full-width instantly.
- **Done when**: growth is in-view-triggered, transform-only, staggered, and reduced-motion shows static full bars.
