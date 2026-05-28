import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Server entry used only at build time by prerender.mjs.
// Deliberately does NOT import './index.css' or 'iconify-icon' — those touch the
// DOM/custom-element registry and only belong on the client (see main.jsx).
export function render() {
  return renderToString(<App />)
}
