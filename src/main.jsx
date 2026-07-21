import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import 'iconify-icon'
import './lib/icon-bundle'

const rootElement = document.getElementById('root')

if (rootElement) {
  const app = (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
  // Production builds ship prerendered HTML inside #root (see prerender.js), so
  // hydrate it. The dev server serves an empty shell, so mount fresh there.
  if (rootElement.hasChildNodes()) {
    ReactDOM.hydrateRoot(rootElement, app)
  } else {
    ReactDOM.createRoot(rootElement).render(app)
  }
}
