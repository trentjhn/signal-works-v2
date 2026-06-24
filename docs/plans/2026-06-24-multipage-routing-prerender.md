# Multi-page routing + per-route prerender Implementation Plan

> **For Claude:** Phase 1 of `~/signal-works-internal/strategy/signalworks-site-content-plan.md`.

**Goal:** Turn the single-page Vite/React SPA into a multi-page site (router + 8 new routes) without losing the per-page static HTML that AI crawlers depend on.

**Architecture:** Add `react-router-dom@7`. One shared `<Layout>` (background + Navbar + `<main><Outlet/></main>` + Footer) wraps every route, so background/nav persist across client navigation and each route body still matches its baked HTML. SEO metadata + JSON-LD live in one plain-data module (`src/seo.js`) consumed by the prerender loop AND the sitemap generator (single source of truth). `prerender.js` loops the route manifest, renders each via `StaticRouter`, injects per-page `<head>` + body, and writes `dist/<route>/index.html`.

**Tech Stack:** React 18.3.1, Vite 5, react-router-dom 7.18.0 (verified), Tailwind 3.

---

## Locked decisions

- **Import surface:** everything from `react-router-dom` (re-exports `react-router`). `StaticRouter` (server), `BrowserRouter`/`Routes`/`Route`/`Link`/`NavLink`/`Outlet`/`useLocation` (client). Verified against installed v7.18.0 d.ts.
- **Homepage output must be byte-equivalent.** Current homepage `<head>` (title, desc, canonical, OG/Twitter, Organization+WebSite JSON-LD) becomes the `/` entry in `seo.js`; same components in same order become `src/pages/Home.jsx`. Same wrapper divs/classes in `Layout`.
- **`index.html` template:** page-specific head tags replaced by a single `<!--SEO-->` placeholder. Global tags (charset, viewport, favicon, theme-color, og:type/site_name/locale/image, twitter:card/image, preconnects, fonts) stay. Every route (incl. `/`) gets its head injected from `seo.js`.
- **Audit CTA** = the Calendly link (`https://calendly.com/hello-signalworks`) under a "Get your visibility baseline" / "Book an intro call" band. Every new page links to it + cross-links to ≥1 sibling page.
- **Sitemap generated from `seo.js`** during prerender → never drifts from routes.
- **Org schema on every page:** each page's JSON-LD `@graph` includes the shared Organization node (by full node, DRY via helper) + its page-specific node (Service / AboutPage / FAQPage / LocalBusiness).

## Routes (8 new + home)

| path | h1 / target query | schema |
|---|---|---|
| `/` | (unchanged) | Organization + WebSite |
| `/services/ai-automations` | AI workflow automation | Service |
| `/services/custom-ai-software` | custom AI software development | Service |
| `/services/knowledge-systems` | internal AI search / RAG | Service |
| `/services/ai-security-governance` | AI security audit & governance | Service |
| `/services/ai-search-visibility` | answer engine optimization (AEO) | Service + FAQPage |
| `/ai-agency-los-angeles` | AI automation agency Los Angeles | Service + LocalBusiness |
| `/about` | about / founders / frameworks | AboutPage |

## Task slices (vertical, AFK)

1. **Router skeleton** — `Layout`, `Home` (extracted), `App` as `<Routes>`, `main.jsx`→BrowserRouter, `entry-server.jsx`→StaticRouter + export seo. Verify homepage still prerenders identically.
2. **seo.js + prerender loop + template placeholder + sitemap gen.** Verify `/` head unchanged, dist has per-route dirs.
3. **Page primitives** — `PageHero`, `PageSection`, `CtaBand`, `FaqList`, `ScrollToTop`.
4. **5 service pages** (reuse Features/Validation/Faq copy).
5. **/ai-agency-los-angeles + /about.**
6. **Footer service links → real `<Link>`s; sitemap.xml/robots verify; build + verify every route prerenders real content (>500 bytes, contains h1 text).**
7. **PR.**

## Verification per route

`npm run build` then for each route assert `dist/<route>/index.html` contains the route's `<h1>` text and a `<title>` matching `seo.js`. A route whose body is <500 bytes fails the existing prerender guard.
