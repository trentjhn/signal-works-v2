import React from 'react'

// Static Q&A list. Rendered as real, always-visible text (not a JS-only accordion) so AI
// engines and crawlers read every answer. The same {q, a} array feeds the FAQPage JSON-LD
// in seo.js, so the visible content and the structured data stay in sync.
function FaqList({ items }) {
  return (
    <div className="divide-y divide-white/5 border-t border-white/5">
      {items.map((item) => (
        <div key={item.q} className="py-6 lg:py-8 scroll-reveal">
          <h3 className="text-base lg:text-lg font-medium text-white mb-3">{item.q}</h3>
          <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-3xl">{item.a}</p>
        </div>
      ))}
    </div>
  )
}

export default FaqList
