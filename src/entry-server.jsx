import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'

// Server entry used only at build time by prerender.js.
// Deliberately does NOT import './index.css' or 'iconify-icon' — those touch the
// DOM/custom-element registry and only belong on the client (see main.jsx).
//
// render(url) renders the app at a specific route via StaticRouter so each route can
// be baked to its own static HTML. seoRoutes is re-exported so prerender.js can read
// per-route <head> metadata + the sitemap from the same source of truth.
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
}

export { seoRoutes } from './seo.js'
