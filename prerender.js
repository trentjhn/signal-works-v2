import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// Runs after the client + SSR builds. Renders <App/> to static HTML and injects it
// into the built index.html so crawlers (and AI engines, which do not run JS) get
// real content instead of an empty <div id="root">.
const here = dirname(fileURLToPath(import.meta.url))
const dist = resolve(here, 'dist')

const template = readFileSync(resolve(dist, 'index.html'), 'utf-8')
const { render } = await import(resolve(dist, 'server/entry-server.js'))
const appHtml = render()

if (!appHtml || appHtml.length < 500) {
  throw new Error(`Prerender produced suspiciously little HTML (${appHtml?.length ?? 0} bytes). Aborting.`)
}

const out = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
if (out === template) {
  throw new Error('Could not find <div id="root"></div> in dist/index.html to inject into.')
}

writeFileSync(resolve(dist, 'index.html'), out)
console.log(`Prerendered dist/index.html (${appHtml.length} bytes of app HTML injected).`)
