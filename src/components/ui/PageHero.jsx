import React from 'react'
import { CALENDLY } from '../../lib/constants'

// Hero block for a content page. The <h1> carries the page's target query in real words
// (prerendered, so engines read it). pt clears the fixed 100px navbar.
function PageHero({ eyebrow, title, titleMuted, intro, ctaLabel = 'Book an intro call', ctaHref = CALENDLY }) {
  return (
    <section className="relative w-full pt-[140px] md:pt-[160px] pb-16 lg:pb-20 px-6 lg:px-[6%] overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-purple-900/[0.08] rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-400/20 bg-purple-400/[0.06] backdrop-blur-sm mb-8 scroll-reveal">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-200/90">{eyebrow}</span>
          </div>
        )}

        <h1 className="leading-[1.04] scroll-reveal delay-100 text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight mb-8 max-w-4xl">
          {title}
          {titleMuted ? <span className="text-white/30">{` ${titleMuted}`}</span> : null}
        </h1>

        {intro && (
          <p className="text-base lg:text-lg text-white/60 font-light leading-relaxed max-w-2xl mb-10 scroll-reveal delay-200">
            {intro}
          </p>
        )}

        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider bg-white text-black py-4 px-6 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_-8px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 scroll-reveal delay-300"
        >
          <span>{ctaLabel}</span>
          <iconify-icon icon="solar:arrow-right-linear" class="text-base group-hover:translate-x-1 transition-transform duration-300"></iconify-icon>
        </a>
      </div>
    </section>
  )
}

export default PageHero
