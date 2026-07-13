# 006 — Services dropdown: interruptible enter + real exit

- **Status**: DONE
- **Commit**: 920814a
- **Severity**: MEDIUM
- **Category**: Interruptibility
- **Estimated scope**: 2 files (`src/components/Navbar.jsx`, `src/index.css`), ~30 lines

## Problem

The desktop Services dropdown animates in with a keyframe and unmounts with no exit:

```css
/* src/index.css:189-196 — current */
@keyframes dropdown-in {
  from { opacity: 0; transform: translateY(-8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.dropdown-panel {
  animation: dropdown-in 200ms cubic-bezier(0.16, 1, 0.3, 1) both;
  transform-origin: top center;
}
```

```jsx
/* src/components/Navbar.jsx:135-137 — current */
{servicesOpen && menuPos && typeof document !== 'undefined' &&
  createPortal(
    <div style={{ position: 'fixed', left: menuPos.left, top: menuPos.top, transform: 'translateX(-50%)' }} className="z-[9999]">
```

The 200ms duration, values (`translateY(-8px) scale(0.98)`, never `scale(0)`), and top origin are all correct — keep them. The problems: keyframes restart from zero if the panel is toggled rapidly, and closing is an instant vanish (enter and exit should mirror).

## Target

State machine with a closing phase; transitions instead of keyframes.

```jsx
/* target — Navbar.jsx */
// replace: const [servicesOpen, setServicesOpen] = useState(false)
const [servicesState, setServicesState] = useState('closed') // 'closed' | 'open' | 'closing'
const servicesOpen = servicesState !== 'closed'          // keeps aria-expanded + solid nav logic working
const closeTimerRef = useRef(null)

const openServices = () => {
  if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null }
  if (btnRef.current) {
    const r = btnRef.current.getBoundingClientRect()
    setMenuPos({ left: r.left + r.width / 2, top: r.bottom + 14 })
  }
  setServicesState('open')
}

const closeServices = () => {
  setServicesState((s) => {
    if (s !== 'open') return s
    closeTimerRef.current = setTimeout(() => setServicesState('closed'), 160)
    return 'closing'
  })
}

const toggleServices = () => (servicesState === 'open' ? closeServices() : openServices())
```

Every existing `setServicesOpen(false)` call site (outside-click, Escape, route change) becomes `closeServices()`; the render condition `servicesOpen && menuPos && ...` stays (true during `closing`, so the exit is visible). The panel gets a data attribute and CSS transitions:

```jsx
/* panel div */
<div
  ref={panelRef}
  data-state={servicesState}
  className="dropdown-panel w-[320px] rounded-md border border-white/15 bg-[#140b35] shadow-2xl shadow-purple-950/60 ring-1 ring-black/40 p-2"
>
```

```css
/* target — replaces .dropdown-panel block in index.css */
.dropdown-panel {
  transform-origin: top center;
  transition: opacity 200ms cubic-bezier(0.16, 1, 0.3, 1), transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 1;
  transform: translateY(0) scale(1);
}
/* Entry without JS double-render: hold the pre-open state for the first styled frame.
   Written UN-NESTED deliberately — the toolchain (tailwindcss + autoprefixer, no nesting
   plugin) is not guaranteed to lower nested at-rules; the standalone form needs nothing. */
@starting-style {
  .dropdown-panel {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
  }
}
.dropdown-panel[data-state='closing'] {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
  transition-duration: 150ms;
  pointer-events: none;
}
```

Delete the `dropdown-in` keyframes. `@starting-style` is Baseline 2024; on the small share of older browsers the panel simply appears instantly (graceful degradation — no broken state). Exit at 150ms (slightly snappier than enter — system response), `pointer-events: none` while closing so a dying panel can't swallow clicks.

**Reduced-motion coordination (plan 002 wrote `animation: none` for the old keyframe — now dead).** In the `prefers-reduced-motion` block, replace the `.dropdown-panel { animation: none; }` line with:

```css
.dropdown-panel,
.dropdown-panel[data-state='closing'] {
  transition: none;
  transform: none;
}
```

(Panel appears/disappears instantly for reduced-motion users; the state machine still unmounts it after the timer.)

## Repo conventions to follow

- Keep the portal, positioning logic, and the explanatory portal comment (`Navbar.jsx:25-28`) untouched.
- Timer constant 160ms = exit duration 150ms + small buffer; keep them paired if either changes.

## Steps

1. Apply the state-machine change in `Navbar.jsx`; update the three `setServicesOpen` call sites (`toggleServices`, outside-click/Escape effect, pathname effect) plus `aria-expanded={servicesState === 'open'}`.
2. Add `data-state={servicesState}` to the panel div.
3. Replace the `.dropdown-panel` CSS block per the target; remove `@keyframes dropdown-in`.
4. Clear `closeTimerRef` in a `useEffect` cleanup on unmount.

## Boundaries

- Do NOT change panel content, positioning math, or the portal approach.
- Do NOT touch the mobile menu (plan 003).
- The chevron's `rotate-180` should track `servicesState === 'open'` so it un-rotates during closing.
- If the cited code has drifted from 920814a, STOP and report.

## Verification

- **Mechanical**: `npm run build` passes.
- **Feel check**: `npm run dev`, desktop viewport:
  - Click Services: panel drops in from the button (200ms, top origin) — unchanged feel.
  - Click again / press Escape / click outside: panel animates OUT (150ms up-and-fade), then unmounts.
  - Rapid toggle: reopening mid-close retargets smoothly from the panel's current position (no restart-from-invisible).
  - Navigate to a service page while open: panel exits cleanly, no orphaned portal.
- **Done when**: enter unchanged, exit mirrors it at 150ms, rapid toggling never snaps.
