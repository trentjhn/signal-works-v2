# 003 — Mobile menu: fast interruptible enter + real exit

- **Status**: DONE
- **Commit**: 920814a
- **Severity**: MEDIUM
- **Category**: Interruptibility / frequency
- **Estimated scope**: 1 file (`src/components/Navbar.jsx`), ~10 lines

## Problem

The mobile menu overlay enters with `animate-reveal` — a 1-second clip-path + 40px-rise keyframe designed for page-load hero reveals — and has no exit at all (conditional unmount = instant vanish):

```jsx
/* src/components/Navbar.jsx:158-159 — current */
{mobileMenuOpen && (
  <div className="md:hidden fixed inset-0 z-[60] bg-[#0a051e]/95 backdrop-blur-xl flex flex-col pt-28 px-8 animate-reveal overflow-y-auto">
```

A menu is a high-frequency control: 1s to open feels broken on a phone, the keyframe restarts from zero if toggled rapidly, and enter-slow/exit-instant violates spatial consistency (it should leave the way it came).

## Target

Keep the overlay mounted; drive visibility with transitions (interruptible, retargets mid-flight) and `visibility` for a free exit that also removes the layer from paint and the accessibility tree when closed:

```jsx
/* target */
<div
  className={`md:hidden fixed inset-0 z-[60] bg-[#0a051e]/95 backdrop-blur-xl flex flex-col pt-28 px-8 overflow-y-auto
    transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
    motion-reduce:transition-none motion-reduce:translate-y-0
    ${mobileMenuOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-3'}`}
>
```

(The `motion-reduce:` variants keep reduced-motion users slide-free — plan 002's CSS block can't reach these utility-driven transforms; the overlay then simply appears/disappears via visibility.)

- Enter: 300ms fade + small 12px descent (top-down, matching where the menu comes from). Exit: same path reversed — `visibility` flips to `hidden` only when the transition ends (CSS transitions visibility discretely at the correct edge in each direction), so the exit is visible, then the layer stops painting and can't be focused.
- Transitions (not keyframes) mean a rapid open-close-open retargets smoothly from the current state.

## Repo conventions to follow

- The strong curve `cubic-bezier(0.16, 1, 0.3, 1)` as arbitrary-value easing — same curve the site uses everywhere (`src/index.css:73`).
- The mobile close button, links, and scroll-lock effect (`Navbar.jsx:55-60`) all stay exactly as they are — the `mobileMenuOpen` state still drives them.

## Steps

1. In `src/components/Navbar.jsx`, remove the `{mobileMenuOpen && (` conditional around the mobile overlay (lines 158–190) so the overlay always renders; close the JSX accordingly.
2. Replace the overlay's className with the target above (drop `animate-reveal`).
3. The overlay children (nav links, CTA) render even when closed now — confirm none of them run effects on mount that assumed "mounted = open". (They don't at 920814a: it's static links.)
4. Keep the body scroll-lock effect keyed on `mobileMenuOpen` unchanged.

## Boundaries

- Do NOT touch the desktop services dropdown (plan 006 owns it).
- Do NOT change the nav bar element itself or its `animate-reveal` page-load entrance.
- Do NOT add a dependency or a portal.
- If the JSX at those lines differs from the excerpt (drift since 920814a), STOP and report.

## Verification

- **Mechanical**: `npm run build` passes.
- **Feel check**: `npm run dev` in a mobile viewport (DevTools device toolbar):
  - Tap the burger: menu appears in ~300ms, sliding down slightly — no 1s clip-path crawl.
  - Tap X: menu fades/slides OUT (not instant vanish).
  - Spam open/close rapidly: motion retargets smoothly from wherever it is; no restart-from-zero jumps.
  - With the menu closed, tab through the page: no focus lands on hidden menu links (visibility:hidden removes them).
  - Rotate to desktop width with menu open: auto-close still works (resize handler unchanged).
- **Done when**: open ≈300ms, close ≈300ms mirrored, rapid toggling is smooth, closed menu is unfocusable.
