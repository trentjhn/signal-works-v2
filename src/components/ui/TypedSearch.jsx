import React, { useState, useEffect } from 'react'

// A mock "ask your company" search. The full question is the initial render (so the
// prerendered HTML carries real text and hydration matches), then it re-types once on
// mount for life. The answer row is always in the DOM. Respects reduced-motion.
const QUESTION = 'How do we handle a refund after 30 days?'

function TypedSearch() {
  const [text, setText] = useState(QUESTION)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    let i = 0
    setText('')
    const id = setInterval(() => {
      i += 1
      setText(QUESTION.slice(0, i))
      if (i >= QUESTION.length) clearInterval(id)
    }, 45)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="card-surface rounded-md p-5 lg:p-6 max-w-xl scroll-reveal">
      <div className="relative z-10">
        {/* Search field */}
        <div className="flex items-center gap-3 border border-white/10 rounded-md px-4 py-3 bg-[#0a051e]/60">
          <iconify-icon icon="solar:magnifer-linear" class="text-white/40 text-lg shrink-0"></iconify-icon>
          <span className="text-sm lg:text-base text-white/85 font-light">
            {text}
            <span className="inline-block w-px h-4 bg-purple-400 align-middle ml-0.5 animate-pulse"></span>
          </span>
        </div>
        {/* Grounded answer */}
        <div className="mt-3 flex items-start gap-3 px-4 py-3 rounded-md bg-purple-500/[0.06] border border-purple-400/15">
          <iconify-icon icon="solar:arrow-right-up-linear" class="text-purple-300 text-base shrink-0 mt-0.5"></iconify-icon>
          <div>
            <p className="text-sm text-white/80 font-light leading-relaxed">After 30 days, refunds need manager approval and a credit memo.</p>
            <p className="text-[11px] font-mono text-white/40 mt-1">from Operations Handbook, section 2.3</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypedSearch
