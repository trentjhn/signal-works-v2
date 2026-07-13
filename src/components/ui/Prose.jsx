import React from 'react'
import FlashlightCard from './FlashlightCard'

// Cursor-follow glow border overlays — same treatment as the homepage cards.
const GlowOverlays = () => (
  <>
    <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)', zIndex: 1 }} />
    <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(168, 85, 247, 0.4), transparent 40%)', zIndex: 1, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1px' }} />
  </>
)

const headingSize = {
  standard: 'text-2xl md:text-3xl lg:text-4xl',
  display: 'text-3xl md:text-5xl lg:text-6xl',
}

// A titled content section. Leads with an animated beam divider + ambient side rules.
// size="display" gives homepage-scale headers; "standard" is for long-form body sections.
export function Section({ title, lede, children, divider = true, glow = false, size = 'standard', beamDelay = 0, className = '' }) {
  return (
    <section className={`relative w-full py-16 lg:py-24 overflow-hidden ${className}`}>
      {/* Animated beam on the top border + ambient vertical rules */}
      {divider && (
        <div className="absolute top-0 left-0 right-0 h-px bg-white/5 overflow-hidden">
          <div className="beam-h" style={{ animation: `beam-h ${9 + (beamDelay % 4)}s ${beamDelay}s infinite linear` }}></div>
        </div>
      )}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="absolute top-0 bottom-0 left-[6%] w-px bg-white/5"></div>
        <div className="absolute top-0 bottom-0 right-[6%] w-px bg-white/5"></div>
      </div>
      {glow && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[360px] bg-purple-900/[0.07] rounded-full blur-[150px]"></div>
        </div>
      )}

      <div className="relative z-10 px-6 lg:px-[6%] max-w-[1200px] mx-auto">
        {title && (
          <h2 className={`${headingSize[size]} font-medium text-white tracking-tight mb-5 scroll-reveal`}>
            {title}
          </h2>
        )}
        {lede && (
          <p className="text-base lg:text-lg text-white/60 font-light leading-relaxed max-w-2xl mb-10 scroll-reveal reveal-delay-100">
            {lede}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}

// One card with the opaque surface treatment + glow border + icon chip.
function Card({ item, large = false, index = 0 }) {
  return (
    <FlashlightCard
      className={`card-surface flex flex-col h-full rounded-sm relative scroll-reveal ${large ? 'p-8 lg:p-10' : 'p-6 lg:p-8'}`}
      style={{ animationDelay: `${(index % 3) * 90}ms` }}
    >
      <GlowOverlays />
      <div className="relative z-10">
        {item.icon && (
          <div className={`rounded-md bg-purple-500/12 border border-purple-400/20 flex items-center justify-center mb-5 ${large ? 'w-14 h-14' : 'w-11 h-11'}`}>
            <iconify-icon icon={item.icon} class={`text-purple-300 ${large ? 'text-2xl' : 'text-xl'}`}></iconify-icon>
          </div>
        )}
        <h3 className={`font-medium text-white tracking-tight mb-3 ${large ? 'text-xl lg:text-2xl' : 'text-lg'}`}>{item.title}</h3>
        <p className={`text-white/60 font-light leading-relaxed ${large ? 'text-base max-w-xl' : 'text-sm'}`}>{item.body}</p>
      </div>
    </FlashlightCard>
  )
}

// Grid of {title, body, icon} cards. variant="balanced" uses 3 columns (good for 5-6 items
// so nothing orphans); featured makes the first item a full-width lead card (bento).
export function CardGrid({ items, variant = 'two', featured = false }) {
  if (featured && items.length) {
    const [lead, ...rest] = items
    return (
      <div className="space-y-5 lg:space-y-6">
        <Card item={lead} large />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {rest.map((it, i) => (
            <Card key={it.title} item={it} index={i} />
          ))}
        </div>
      </div>
    )
  }
  const cols = variant === 'balanced' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'
  return (
    <div className={`grid grid-cols-1 ${cols} gap-5 lg:gap-6`}>
      {items.map((it, i) => (
        <Card key={it.title} item={it} index={i} />
      ))}
    </div>
  )
}

// Two-column checklist of surface rows with a check chip.
export function BulletList({ items }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 scroll-reveal">
      {items.map((it) => (
        <div key={it} className="card-surface flex items-start gap-4 rounded-sm p-5">
          <div className="relative z-10 w-7 h-7 rounded-full bg-purple-500/15 border border-purple-400/25 flex items-center justify-center shrink-0 mt-0.5">
            <iconify-icon icon="solar:check-read-linear" class="text-purple-300 text-sm"></iconify-icon>
          </div>
          <span className="relative z-10 text-sm lg:text-[15px] text-white/70 font-light leading-relaxed">{it}</span>
        </div>
      ))}
    </div>
  )
}
