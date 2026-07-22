import React from 'react'

// Standalone interlude that sits between the hero and the services bento.
// Surfaces the AEO positioning line as a breakout statement — the strongest piece
// of writing on the old site, demoted to a card on the floating wall in the v2 export.
const AeoCallout = () => {
  return (
    <section className="relative w-full py-32 lg:py-44 overflow-hidden z-20 bg-indigo-950/20 border-t border-white/5">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[400px] bg-purple-900/[0.07] rounded-full blur-[160px]"></div>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-[6%] text-center">
        {/* Eyebrow label */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-10 scroll-reveal">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">Why we exist</span>
        </div>

        {/* Four-line stacked headline. Each phrase is its own row via `block` so wrapping
            never splits a hyphenated word. Sizes scaled down one notch from previous so
            the longest line ("That is the work we") fits comfortably on lg viewports. */}
        <h2 className="leading-[1.15] text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-medium text-white tracking-tight scroll-reveal reveal-delay-100">
          <span className="block">Keeping up with AI is</span>
          <span className="block text-white/40">a full-time job.</span>
          <span className="block mt-3 lg:mt-5">That is the work</span>
          <span className="block text-white/40">we take off your plate.</span>
        </h2>

        {/* Subtle context line */}
        <p className="mt-12 text-base lg:text-lg text-white/50 font-light max-w-2xl mx-auto scroll-reveal reveal-delay-200">
          We build, deploy, and maintain custom AI systems for small businesses, founder-led brands, and agencies.
        </p>
      </div>
    </section>
  )
}

export default AeoCallout
