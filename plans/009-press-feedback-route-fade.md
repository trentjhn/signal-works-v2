# 009 — Press feedback on CTAs + route-change fade

- **Status**: DONE
- **Commit**: 920814a
- **Severity**: ADDITIVE (missed opportunities)
- **Category**: Feedback + continuity
- **Estimated scope**: ~7 files, small class additions + 1 Layout change + ~8 lines CSS

## Problem

Two things the site never does:

1. **No press feedback.** Every CTA has hover states but nothing on `:active` — pressing the site's most important buttons (Book an intro call) gives zero tactile acknowledgment. The standard fix: a subtle scale-down on press, via CSS transitions so it's interruptible.
2. **Hard route cuts.** Client-side navigation swaps `<Outlet/>` content and jumps to top instantly — a jarring teleport between pages. A short fade-in on the incoming route prevents the jar without slowing navigation.

## Target

**Press feedback** — add `active:scale-[0.97]` to every primary CTA and ensure `transform` is in that element's transition list (plan 008 already put `transform` in the CTA transition lists):

| File:line (at 920814a) | Element | Add |
| --- | --- | --- |
| `Navbar.jsx:120` | nav "Book an intro call" | `active:scale-[0.97]` |
| `Navbar.jsx:185` | mobile menu CTA | `active:scale-[0.97] transition-transform duration-150 ease-swift` (this one had `transition-colors` only — extend to `transition-[color,background-color,transform]`) |
| `Hero.jsx:203` | hero CTA | `active:scale-[0.97]` |
| `AeoFeature.jsx:64` | section CTA | `active:scale-[0.97]` |
| `Validation.jsx:99` | book-card CTA | `active:scale-[0.97]` |
| `FinalCta.jsx:22` | final CTA | `active:scale-[0.97]` |
| `CtaBand.jsx:31` | shared page-end CTA (closes every content page) | `active:scale-[0.97]` |
| `PageHero.jsx:41` | shared service-page hero CTA | `active:scale-[0.97]` |
| `CustomAiSoftware.jsx:45`, `AiSearchVisibility.jsx:49` | page-local hero CTAs | `active:scale-[0.97]` |
| `SwipeableMarquee.jsx:119,127` | arrow buttons | `active:scale-95` (smaller element, slightly stronger scale reads right) + extend transition list with `transform` |

Value discipline: `0.97` on large CTAs, never below `0.95` anywhere. The press must use transitions (all these elements have them after 008) so releasing mid-press smoothly returns.

**Route fade** — in `src/components/Layout.jsx`:

```jsx
/* current */
<main className="w-full">
  <Outlet />
</main>

/* target */
<main key={pathname} className="w-full route-fade">
  <Outlet />
</main>
```

```css
/* add to src/index.css, above the reduced-motion block */
@keyframes route-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.route-fade {
  animation: route-fade-in 240ms ease-out;
}
```

And inside the `prefers-reduced-motion` block (plan 002's): `.route-fade { animation: none; }` — though a pure opacity fade is reduced-motion-safe, page-level flashes are worth suppressing.

Why `key={pathname}`: forces the `<main>` to remount on navigation so the animation replays; the routes already remount their page components, so the marginal cost is nil, and `useScrollToTop` runs in the same commit — the fade starts from the top position (no visible scroll-then-fade).

## Repo conventions to follow

- `ease-swift` / tokens exist if plan 008 ran first (it should — see plans/README.md order). If not, use `ease-[cubic-bezier(0.16,1,0.3,1)]`.
- Keyframe + comment style per `index.css`.

## Steps

1. Add the press classes per the table (verify each element's transition list covers `transform`; extend the list where the table says so).
2. Apply the Layout + CSS route-fade changes.
3. Add the reduced-motion line to the media block.

## Boundaries

- Press feedback ONLY on the listed elements — not on nav links, accordion rows, or cards (rows/cards aren't buttons; scaling them reads as gimmick).
- Route fade is fade-ONLY — no slide, no scale, and never longer than 240ms; navigation speed is sacred.
- Do NOT introduce a transition library or AnimatePresence.

## Verification

- **Mechanical**: `npm run build` passes.
- **Feel check**: `npm run dev`:
  - Click-and-hold any CTA: it compresses subtly; release: smooth return; mid-press mouse-out: no snap.
  - Navigate Home → Work → a service page: each page fades in over ~240ms starting at top; back/forward buttons same.
  - Reduced-motion emulation: no route fade, pages appear instantly.
- **Done when**: every listed CTA has press acknowledgment, route changes no longer hard-cut, and nothing got slower.
