import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'iconify-icon'

const rootElement = document.getElementById('root')

if (rootElement) {
  const app = (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  // Production builds ship prerendered HTML inside #root (see prerender.mjs), so
  // hydrate it. The dev server serves an empty shell, so mount fresh there.
  if (rootElement.hasChildNodes()) {
    ReactDOM.hydrateRoot(rootElement, app)
  } else {
    ReactDOM.createRoot(rootElement).render(app)
  }
}
