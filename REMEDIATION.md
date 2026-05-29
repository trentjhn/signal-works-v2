# signalworks.live — SEO/AEO Remediation

Status tracker for fixing the marketing site's search + AI-search visibility.
Diagnosis run 2026-05-27. Branch: `fix/prerender-and-seo`.

## Root cause (what was actually wrong)

The site is a client-rendered Vite/React SPA. It shipped an empty `<div id="root"></div>`
shell, so:
- **AI crawlers (GPTBot, ClaudeBot, PerplexityBot) saw nothing** — they do not run JS.
  This made the site structurally invisible to the exact engines we sell AEO for.
- **Google saw it late/incompletely** (JS rendering is a slow second pass).
- **"Sometimes doesn't load"** = blank page until JS executes, plus a heavy WebGL
  background (`unicornstudio-react`) loaded from a third-party CDN.

Ruled out (checked 2026-05-27): no Google Safe Browsing flag ("No unsafe content found");
Cloudflare not blocking AI crawlers; Under Attack / Dev mode both off. So the problem was
the render architecture, not an external block.

## Pre-flight note (why this approach)

Verified prerender libraries before building: `vite-react-ssg` latest is a beta and
requires `react-router-dom` (this app has no router); `react-snap` is unmaintained since
2022 with React 18 hydration issues. Chose a minimal custom Vite SSR prerender
(`react-dom/server` + `hydrateRoot`) — zero new runtime deps, no router needed.

## Track 1 — Crawlability (DONE on this branch)

- [x] `src/entry-server.jsx` — SSR entry, renders `<App/>` to string.
- [x] `prerender.js` — injects rendered HTML into built `index.html` after the client +
      SSR builds. Aborts if output is suspiciously small or the root div is missing.
- [x] `src/main.jsx` — `hydrateRoot` when prerendered HTML exists, `createRoot` for dev.
- [x] `src/components/UnicornBackground.jsx` — WebGL now loads client-only via dynamic
      import; static gradient renders server-side (and is a fallback if WebGL fails).
- [x] `package.json` build = client build + SSR build + prerender.
- [x] Verified: built `dist/index.html` contains ~6.6k chars of real copy, 0 empty shells.
- [x] Hydration verified clean in a real browser (Vite preview + playwright): 0 console
      errors. Fixed `Hero.jsx` scramble, which used `Math.random()` during render — that
      both broke hydration (21 React #418/#425 errors) and put random hex in the H1 instead
      of real text. Now the H1 prerenders the real words; scramble animates after mount.

## Track 3 — SEO/AEO hygiene (DONE on this branch)

- [x] `public/robots.txt` — allow all, explicitly welcome AI bots, link sitemap.
- [x] `public/sitemap.xml` — homepage entry.
- [x] JSON-LD structured data (Organization + WebSite, real founders, machine-readable
      `dateModified`) added to `index.html` head. No FAQPage (FAQ section is beliefs, not
      Q&A) and no `sameAs` (no public socials) — only asserted facts. Bump `dateModified`
      on content changes.
- [x] Canonical/OG/Twitter URLs aligned to `https://www.signalworks.live/` to match the
      current apex→www redirect (was pointing at the apex while the site forces www — a
      self-contradicting signal). **Decision:** www chosen because Vercel's primary domain
      currently redirects apex→www. *Alternative:* if you prefer the bare apex as canonical,
      flip Vercel's primary domain to apex and revert these tags. Reversible either way.

## Track 2 — Dashboard items (OWNER: Trent, not code)

- [ ] Cloudflare → set **Manage robots.txt = "Disable robots.txt configuration"** so the
      repo's `public/robots.txt` serves instead of Cloudflare's managed one (`ai-train=no`).
- [ ] Confirm where the "fraud" warning was seen (not a Google Safe Browsing flag as of
      2026-05-27 — likely transient, antivirus, or a DNS filter).
- [ ] After deploy: submit `sitemap.xml` in Google Search Console; request indexing.

## Track 4 — Then the AEO playbook

Once crawlable + deployed, run the 7-layer playbook
(`signal-works-internal/strategy/aeo-discoverability-playbook.md`) on the live site.
Prerendering removes the floor blocker; it does not by itself rank or earn citations —
content depth, entity signals, and the Reddit/listing footprint do that.

## Known minor follow-ups (cosmetic, non-blocking)

- ~~CountUp stats render as `0` in static HTML~~ — FIXED. CountUp now initializes to the
  real value, so the prerender shows the true number (e.g. "5 AI engines tracked"); the
  count-up animation replays from 0 on scroll.
- ~~Scramble placeholder string in the prerendered hero~~ — FIXED (see Track 1).

## Verify locally

```
npm run build
grep -c '<div id="root"></div>' dist/index.html   # expect 0
sed 's/<[^>]*>//g' dist/index.html | head          # expect real copy
```
