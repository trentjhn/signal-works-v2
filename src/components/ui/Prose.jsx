import React from 'react'
import FlashlightCard from './FlashlightCard'
import SectionDivider from './SectionDivider'

// Shared radial-glow border overlays — the same treatment the homepage bento/deliverable
// cards use, so inner-page cards read at the same premium bar.
const GlowOverlays = () => (
  <>
    <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)', zIndex: 0 }} />
    <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.4), transparent 40%)', zIndex: 0, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1px' }} />
  </>
)

// A titled content section. Leads with an animated beam divider + ambient side rules and a
// soft glow, matching the homepage's section rhythm and depth. divider defaults on; pass
// divider={false} for the first section after a hero.
export function Section({ title, lede, children, divider = true, glow = false, className = '' }) {
  return (
    <>
      {divider && <SectionDivider duration={10} />}
      <section className={`relative w-full py-16 lg:py-24 overflow-hidden ${className}`}>
        {/* Ambient framing: vertical rules at the content gutters + optional glow */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <div className="absolute top-0 bottom-0 left-[6%] w-px bg-white/5"></div>
          <div className="absolute top-0 bottom-0 right-[6%] w-px bg-white/5"></div>
        </div>
        {glow && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[360px] bg-purple-900/[0.06] rounded-full blur-[150px]"></div>
          </div>
        )}

        <div className="relative z-10 px-6 lg:px-[6%] max-w-[1200px] mx-auto">
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
    </>
  )
}

// Grid of {title, body, icon} cards using the homepage FlashlightCard treatment:
// cursor-follow glow border + subtle 3D tilt + treated icon chip.
export function CardGrid({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
      {items.map((it, i) => (
        <FlashlightCard
          key={it.title}
          className="flex flex-col h-full border border-white/5 hover:border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 rounded-sm p-6 lg:p-8 relative overflow-hidden backdrop-blur-lg scroll-reveal"
          style={{ transitionDelay: `${(i % 2) * 0.1}s` }}
        >
          <GlowOverlays />
          <div className="relative z-10">
            {it.icon && (
              <div className="w-11 h-11 rounded-sm bg-purple-500/10 border border-purple-400/15 flex items-center justify-center mb-5 group-hover:border-purple-400/30 transition-colors">
                <iconify-icon icon={it.icon} class="text-purple-300 text-xl"></iconify-icon>
              </div>
            )}
            <h3 className="text-lg font-medium text-white tracking-tight mb-3">{it.title}</h3>
            <p className="text-sm text-white/55 font-light leading-relaxed">{it.body}</p>
          </div>
        </FlashlightCard>
      ))}
    </div>
  )
}

// Checklist of items — bordered rows with a check-icon chip. Reads richer than plain bullets
// and stays on-brand. Two columns on wide screens.
export function BulletList({ items }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 scroll-reveal">
      {items.map((it) => (
        <div key={it} className="flex items-start gap-4 border border-white/5 bg-white/[0.02] rounded-sm p-5 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300">
          <div className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-400/20 flex items-center justify-center shrink-0 mt-0.5">
            <iconify-icon icon="solar:check-read-linear" class="text-purple-300 text-sm"></iconify-icon>
          </div>
          <span className="text-sm lg:text-[15px] text-white/70 font-light leading-relaxed">{it}</span>
        </div>
      ))}
    </div>
  )
}
