import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Runs after the client + SSR builds. For every route in src/seo.js it renders <App/>
// at that route to static HTML and writes dist/<route>/index.html with the per-page
// <head> injected. AI engines (and search crawlers) do not run JS, so this is what makes
// each page's content and metadata visible to them. Also regenerates the sitemap from the
// same route list so it can never drift from what actually ships.
const here = dirname(fileURLToPath(import.meta.url))
const dist = resolve(here, 'dist')
const SITE = 'https://www.signalworks.live'

const template = readFileSync(resolve(dist, 'index.html'), 'utf-8')
if (!template.includes('<!--SEO-->')) {
  throw new Error('index.html template is missing the <!--SEO--> placeholder to inject per-route head into.')
}
const { render, seoRoutes } = await import(resolve(dist, 'server/entry-server.js'))

// Escape a string for use inside an HTML double-quoted attribute / text node.
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// Build the per-route <head> fragment that replaces <!--SEO-->.
function buildHead({ title, description, canonical, jsonLd }) {
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': jsonLd })
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${esc(canonical)}" />`,
    `<meta property="og:url" content="${esc(canonical)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<script type="application/ld+json">${ld}</script>`,
  ].join('\n    ')
}

// dist output path for a route: '/' -> dist/index.html, '/about' -> dist/about/index.html
function outPathFor(routePath) {
  if (routePath === '/') return resolve(dist, 'index.html')
  const dir = resolve(dist, routePath.replace(/^\//, ''))
  mkdirSync(dir, { recursive: true })
  return join(dir, 'index.html')
}

for (const route of seoRoutes) {
  const appHtml = render(route.path)
  if (!appHtml || appHtml.length < 500) {
    throw new Error(
      `Prerender of "${route.path}" produced suspiciously little HTML (${appHtml?.length ?? 0} bytes). ` +
        'Likely a missing <Route> for this path in App.jsx. Aborting.'
    )
  }

  let out = template.replace('<!--SEO-->', buildHead(route))
  if (out === template) {
    throw new Error(`Could not inject <head> for "${route.path}" (placeholder not replaced).`)
  }
  out = out.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  if (!out.includes(`<div id="root">${appHtml.slice(0, 24)}`)) {
    throw new Error(`Could not find <div id="root"></div> to inject body for "${route.path}".`)
  }

  writeFileSync(outPathFor(route.path), out)
  console.log(`Prerendered ${route.path} (${appHtml.length} bytes of app HTML).`)
}

// Regenerate the sitemap from the route list (single source of truth).
const today = new Date().toISOString().slice(0, 10)
const urls = seoRoutes
  .map(
    (r) =>
      `  <url>\n    <loc>${SITE}${r.path === '/' ? '/' : r.path}</loc>\n` +
      `    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n` +
      `    <priority>${r.path === '/' ? '1.0' : '0.8'}</priority>\n  </url>`
  )
  .join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
writeFileSync(resolve(dist, 'sitemap.xml'), sitemap)
console.log(`Wrote sitemap.xml with ${seoRoutes.length} routes.`)
