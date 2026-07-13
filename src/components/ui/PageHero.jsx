import React from 'react'
import { CALENDLY } from '../../lib/constants'

// Hero block for a content page. The <h1> carries the page's target query in real words
// (prerendered, so engines read it). pt clears the fixed 100px navbar.
function PageHero({ eyebrow, title, titleMuted, intro, ctaLabel = 'Book an intro call', ctaHref = CALENDLY }) {
  return (
    <section className="relative w-full pt-[150px] md:pt-[180px] pb-20 lg:pb-28 px-6 lg:px-[6%] overflow-hidden">
      {/* Ambient framing to match the homepage sections: side rules + soft glow */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="absolute top-0 bottom-0 left-[6%] w-px bg-white/5"></div>
        <div className="absolute top-0 bottom-0 right-[6%] w-px bg-white/5"></div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[1000px] h-[440px] bg-purple-900/[0.10] rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-400/20 bg-purple-400/[0.06] backdrop-blur-sm mb-8 animate-reveal">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-200/90">{eyebrow}</span>
          </div>
        )}

        <h1 className="leading-[1.04] animate-reveal reveal-delay-100 text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight mb-8 max-w-4xl">
          {title}
          {titleMuted ? <span className="text-white/30">{` ${titleMuted}`}</span> : null}
        </h1>

        {intro && (
          <p className="text-base lg:text-lg text-white/60 font-light leading-relaxed max-w-2xl mb-10 animate-reveal reveal-delay-200">
            {intro}
          </p>
        )}

        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider bg-white text-black py-4 px-6 rounded-sm overflow-hidden transition-[transform,box-shadow] duration-300 ease-swift hover:shadow-[0_0_30px_-8px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 active:scale-[0.97] animate-reveal reveal-delay-300"
        >
          <span>{ctaLabel}</span>
          <iconify-icon icon="solar:arrow-right-linear" class="text-base group-hover:translate-x-1 transition-transform duration-300"></iconify-icon>
        </a>
      </div>
    </section>
  )
}

export default PageHero
