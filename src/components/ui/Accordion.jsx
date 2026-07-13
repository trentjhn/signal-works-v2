import React, { useState } from 'react'

// Full-width expandable rows (read as a list, not a card grid). The body text is always
// present in the DOM so crawlers and AI engines read it even when a row is collapsed; the
// grid-rows 1fr/0fr trick animates height. First row open by default, matching SSR.
function Accordion({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="space-y-3 lg:space-y-4">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={it.title} className="card-surface rounded-sm scroll-reveal">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="relative z-10 w-full flex items-center justify-between gap-4 px-6 lg:px-8 py-5 lg:py-6 text-left outline-none"
              aria-expanded={isOpen}
            >
              <span className="text-base lg:text-lg font-medium text-white tracking-tight">{it.title}</span>
              <iconify-icon icon="solar:alt-arrow-down-linear" class={`text-lg text-purple-300/70 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></iconify-icon>
            </button>
            <div className={`relative z-10 grid transition-[grid-template-rows,opacity] duration-400 ease-swift ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-70'}`}>
              <div className="overflow-hidden">
                <p className="px-6 lg:px-8 pb-6 lg:pb-7 text-sm lg:text-[15px] text-white/60 font-light leading-relaxed max-w-3xl">{it.body}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
