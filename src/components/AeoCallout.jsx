import React from 'react'

// Standalone interlude that sits between the hero and the services bento.
// Surfaces the AEO positioning line as a breakout statement — the strongest piece
// of writing on the old site, demoted to a card on the floating wall in the v2 export.
const AeoCallout = () => {
  return (
    <section className="relative w-full py-32 lg:py-44 overflow-hidden z-20 border-t border-white/5">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[400px] bg-purple-900/[0.07] rounded-full blur-[160px]"></div>
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-[6%] text-center">
        {/* Eyebrow label */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-10 scroll-reveal">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">What we do</span>
        </div>

        {/* The line */}
        <h2 className="leading-[1.05] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-medium text-white tracking-tight scroll-reveal delay-100">
          Keeping up with AI is
          <span className="text-white/40"> a full-time job.</span>
          <br />
          <span>That is the work we </span>
          <span className="text-white/40">take off your plate.</span>
        </h2>

        {/* Subtle context line */}
        <p className="mt-10 text-base lg:text-lg text-white/50 font-light max-w-2xl mx-auto scroll-reveal delay-200">
          We build, deploy, and maintain custom AI systems for small businesses, founder-led brands, and agencies.
        </p>
      </div>
    </section>
  )
}

export default AeoCallout
