import React from 'react'

// A titled content section with optional lede + free children. Used to give each page
// genuinely useful body copy (not a thin doorway page).
export function Section({ title, lede, children, className = '' }) {
  return (
    <section className={`relative w-full py-16 lg:py-24 px-6 lg:px-[6%] border-b border-white/5 ${className}`}>
      <div className="relative z-10 max-w-[1100px] mx-auto">
        {title && (
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white tracking-tight mb-5 scroll-reveal">
            {title}
          </h2>
        )}
        {lede && (
          <p className="text-base lg:text-lg text-white/60 font-light leading-relaxed max-w-2xl mb-10 scroll-reveal delay-100">
            {lede}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}

// Grid of {title, body} cards describing what a service includes.
export function CardGrid({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
      {items.map((it, i) => (
        <div
          key={it.title}
          className="border border-white/5 hover:border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 rounded-sm p-6 lg:p-8 backdrop-blur-sm scroll-reveal"
          style={{ transitionDelay: `${(i % 2) * 0.1}s` }}
        >
          {it.icon && (
            <iconify-icon icon={it.icon} class="text-purple-400 text-2xl mb-5 block"></iconify-icon>
          )}
          <h3 className="text-lg font-medium text-white tracking-tight mb-3">{it.title}</h3>
          <p className="text-sm text-white/55 font-light leading-relaxed">{it.body}</p>
        </div>
      ))}
    </div>
  )
}

// Plain bulleted list with purple markers.
export function BulletList({ items }) {
  return (
    <ul className="space-y-3 scroll-reveal">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 text-sm lg:text-base text-white/70 font-light leading-relaxed">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400/80 shrink-0"></span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}
