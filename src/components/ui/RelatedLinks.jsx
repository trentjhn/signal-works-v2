import React from 'react'
import { Link } from 'react-router-dom'

// Internal cross-links between pages. Real <Link>s so they render as crawlable <a href>
// in the prerendered HTML and use client-side navigation in the browser.
function RelatedLinks({ title = 'Related', links }) {
  return (
    <section className="relative w-full py-14 lg:py-16 px-6 lg:px-[6%] border-t border-white/5">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group flex items-center justify-between gap-3 border border-white/5 hover:border-white/15 bg-white/[0.02] hover:bg-white/[0.04] rounded-sm px-5 py-4 transition-all duration-300"
            >
              <span className="text-sm text-white/75 group-hover:text-white transition-colors">{l.label}</span>
              <iconify-icon icon="solar:arrow-right-up-linear" class="text-base text-white/30 group-hover:text-purple-300 group-hover:translate-x-0.5 transition-all"></iconify-icon>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedLinks
