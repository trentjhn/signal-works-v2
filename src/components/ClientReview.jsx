import React from 'react'
import FlashlightCard from './ui/FlashlightCard'

// Featured verified-client review. One review, one voice, attributed honestly, with a
// live "Verified on Clutch" link. Quotes are verbatim from Refugio Barba's 5.0 Clutch
// review (verified 2026-07). Do NOT slice this into multiple pseudo-testimonials — it is
// one client, shown with two of their own sentences.
const CLUTCH_URL = 'https://clutch.co/profile/signalworks-0'

const ClientReview = () => {
  return (
    <section className="relative w-full py-24 lg:py-32 overflow-hidden z-20 bg-indigo-950/20 border-t border-white/5">
      {/* Ambient backdrop */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute left-[6%] right-[6%] top-0 bottom-0 border-l border-r border-white/5 hidden lg:block"></div>
        <div className="absolute top-1/2 right-[12%] -translate-y-1/2 w-[600px] h-[380px] bg-purple-900/10 rounded-full blur-[130px]"></div>
      </div>

      <div className="relative z-10 px-6 lg:px-[6%] max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8 scroll-reveal">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">Verified client</span>
          </div>
          <h2 className="leading-[1.0] scroll-reveal reveal-delay-100 lg:text-6xl text-4xl font-medium text-white tracking-tighter">
            What it is like
            <span className="text-white/30"> to work with us.</span>
          </h2>
        </div>

        {/* Review card */}
        <FlashlightCard className="hover:bg-white/[0.04] border border-white/5 hover:border-white/10 rounded-sm backdrop-blur-lg p-8 lg:p-14 relative overflow-hidden scroll-reveal reveal-delay-200">
          <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)', zIndex: 0 }}></div>
          <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.4), transparent 40%)', zIndex: 0, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1px' }}></div>

          <div className="relative z-10 max-w-4xl">
            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-8">
              {[0, 1, 2, 3, 4].map((i) => (
                <iconify-icon key={i} icon="solar:star-bold" class="text-purple-300 text-lg"></iconify-icon>
              ))}
              <span className="ml-3 text-sm font-mono text-white/50 tabular-nums">5.0</span>
            </div>

            {/* Lead quote (verbatim) */}
            <blockquote className="text-xl lg:text-[2rem] font-light text-white leading-[1.4] tracking-tight mb-8">
              &ldquo;Smaller companies can sometimes be overlooked when working on projects at this level, but SignalWorks has given us the attention, care, and confidence we would expect from a true long-term partner.&rdquo;
            </blockquote>

            {/* Supporting line (verbatim) */}
            <p className="text-base lg:text-lg text-white/50 font-light leading-relaxed mb-10 max-w-2xl">
              &ldquo;They are talented young professionals who take the time to understand our business and treat our goals as important.&rdquo;
            </p>

            {/* Attribution + verified badge */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pt-8 border-t border-white/5">
              <div>
                <div className="text-white font-medium tracking-tight">Refugio Barba</div>
                <div className="text-white/40 text-sm">President, Integrity Decks &amp; Restoration</div>
              </div>
              <a
                href={CLUTCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/badge inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/60 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.02] rounded-sm px-4 py-2.5 transition-colors duration-300 ease-swift w-max"
              >
                <iconify-icon icon="solar:verified-check-bold" class="text-purple-300 text-base"></iconify-icon>
                Verified on Clutch
                <iconify-icon icon="solar:arrow-right-up-linear" class="text-sm group-hover/badge:translate-x-0.5 group-hover/badge:-translate-y-0.5 transition-transform duration-300"></iconify-icon>
              </a>
            </div>
          </div>
        </FlashlightCard>
      </div>
    </section>
  )
}

export default ClientReview
