# 005 — FlashlightCard: gate tilt to fine pointers + throttle var writes

- **Status**: DONE
- **Commit**: 920814a
- **Severity**: MEDIUM
- **Category**: Performance + accessibility
- **Depends on**: plan 001 (executed first)
- **Estimated scope**: 1 file (`src/components/ui/FlashlightCard.jsx`), ~25 lines

## Problem

```jsx
/* src/components/ui/FlashlightCard.jsx:9-26 — current (excerpt) */
const handleMouseMove = (e) => {
  if (!cardRef.current) return
  const rect = cardRef.current.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  cardRef.current.style.setProperty('--mouse-x', `${x}px`)
  cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  ...
  cardRef.current.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`
}
```

Three issues:
1. **No pointer gating** — touch devices fire `mousemove` on tap, producing a false one-frame tilt; there's also no `prefers-reduced-motion` gate on a purely decorative 3D effect.
2. **Un-throttled per-event writes** — `getBoundingClientRect()` (layout read) + two CSS-variable writes + a transform write run on every `mousemove` event (can exceed frame rate). Setting a CSS custom property on the card triggers style recalculation for all its descendants each time.
3. After plan 001, the inline `opacity 800ms` transition (added to cooperate with the old `.scroll-reveal` transition) is dead weight — the reveal is animation-driven now.

## Target

```jsx
/* target — full component body shape */
import React, { useRef, useEffect } from 'react'

const FlashlightCard = ({ children, className = '', style = {}, tilt = true, ...props }) => {
  const cardRef = useRef(null)
  const frameRef = useRef(null)
  const lastEventRef = useRef(null)
  const enabledRef = useRef(false)

  useEffect(() => {
    // Decorative pointer-tracking: fine pointers that can hover, and no reduced-motion.
    enabledRef.current =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [])

  const applyFrame = () => {
    frameRef.current = null
    const e = lastEventRef.current
    if (!e || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
    if (tilt) {
      const nx = (x / rect.width - 0.5) * 2
      const ny = (y / rect.height - 0.5) * 2
      const maxTilt = 3
      cardRef.current.style.transform =
        `perspective(900px) rotateX(${-ny * maxTilt}deg) rotateY(${nx * maxTilt}deg) translateZ(0)`
    }
  }

  const handleMouseMove = (e) => {
    if (!enabledRef.current) return
    lastEventRef.current = e
    if (frameRef.current == null) frameRef.current = requestAnimationFrame(applyFrame)
  }

  const handleMouseLeave = () => {
    if (!enabledRef.current || !cardRef.current || !tilt) return
    cardRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group ${className}`}
      style={{
        ...style,
        // Smooths the tilt (pseudo-spring) AND carries the hover surface-tint durations.
        // This inline shorthand overrides className transition utilities entirely, so any
        // property consumers animate on hover MUST be listed here — that's why
        // background-color/border-color are included (critical-pass finding: they were
        // snapping, never animating, because the old list was transform+opacity only).
        // Reveal opacity is animation-driven by .scroll-reveal (plan 001) — not needed here.
        transition: tilt
          ? 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1), background-color 500ms cubic-bezier(0.16, 1, 0.3, 1), border-color 500ms cubic-bezier(0.16, 1, 0.3, 1)'
          : style.transition,
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export default FlashlightCard
```

Key properties: at most one layout-read + var-write batch per frame (`requestAnimationFrame` coalescing); the effect simply never engages on touch or reduced-motion (the flashlight gradient falls back to its resting state, cards remain fully functional); transforms stay written directly on the element (correct — never via a parent variable).

## Repo conventions to follow

- matchMedia guard style as in `src/components/ui/TypedSearch.jsx:12` — but here inside `useEffect` (component renders on the server via `entry-server.jsx`; `window` must not be touched at module/render scope).

## Steps

1. Replace `src/components/ui/FlashlightCard.jsx` with the target shape above (it preserves the public API: `children/className/style/tilt/...props`).
2. Grep for `FlashlightCard` consumers (`Features.jsx` and others) — confirm none pass a `style.transition` that the tilt branch would drop (at 920814a none do; if one does now, STOP and report).

## Boundaries

- Do NOT change the flashlight gradient CSS that consumes `--mouse-x/y` (lives in consumers).
- Do NOT convert the tilt to a JS spring library — no new dependencies; the 450ms transform transition already smooths it.
- If plan 001 hasn't run, keep the `opacity 800ms` term in the inline transition and note it.

## Verification

- **Mechanical**: `npm run build` passes (also confirms no `window` access at SSR scope — the prerender step would throw).
- **Feel check**: `npm run dev`:
  - Desktop: hover a Features card — the background tint and border-brighten now ANIMATE over ~500ms (before this plan they snapped instantly; this is the finding-3 fix canary).
  - Tilt + flashlight track the cursor as before, smooth during fast circular mouse movement (Performance panel: no long style-recalc storms).
  - DevTools device toolbar (touch emulation): tapping a card produces NO tilt jump.
  - Rendering → emulate reduced motion: no tilt on hover.
  - Cards still scroll-reveal correctly (opacity fade intact).
- **Done when**: tilt is desktop-hover-only, one rAF batch per frame, reveal unaffected.
