# SignalWorks

The marketing site for **SignalWorks**, an AI automation studio that wires up AI systems businesses actually ship.

**Live:** https://www.signalworks.live/

A single-page site with an animated hero, a trusted-by marquee, testimonials, an FAQ wall, and motion throughout. Prerendered to static HTML at build time so it loads fast and indexes cleanly.

## Stack

- React 18 + Vite 5
- Tailwind CSS 3
- Prerendered output (SSR build + static prerender pass) for SEO and fast first paint

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # client build + SSR build + prerender to dist/
npm run preview  # serve the production build
```

## Structure

```
src/
  components/   page sections (hero, marquee, testimonials, FAQ, ...)
  components/ui/  small motion + layout primitives
  entry-server.jsx  SSR entry used by the prerender step
prerender.js    walks routes and writes static HTML to dist/
public/         static assets
```

Deployed on Vercel.
