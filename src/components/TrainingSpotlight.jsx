import React from 'react'
import { Link } from 'react-router-dom'
import PromptLift from './ui/PromptLift'

// Homepage training spotlight — first section after the hero, per the 2026-08-22
// positioning call: training is the top of the funnel (teams meet us as the people
// who made them good at AI, the build work follows from that trust), so it leads
// and the rest of the menu reads as what comes after. Reuses the PromptLift
// before/after demo from /services/ai-training so home shows the same product
// the page sells.
function TrainingSpotlight() {
  return (
    <section id="training" className="relative w-full py-20 lg:py-28 px-6 lg:px-[6%] overflow-hidden scroll-mt-[100px]">
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="absolute top-0 bottom-0 left-[6%] w-px bg-white/5"></div>
        <div className="absolute top-0 bottom-0 right-[6%] w-px bg-white/5"></div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-purple-900/[0.09] rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-400/20 bg-purple-400/[0.06] backdrop-blur-sm mb-8 scroll-reveal">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-purple-200/90">Start here / AI Training</span>
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-[1.06] max-w-3xl mb-6 scroll-reveal reveal-delay-100">
          First, we make your team good at AI.
          <span className="text-white/30"> Everything else builds on that.</span>
        </h2>

        <p className="text-base lg:text-lg text-white/60 font-light leading-relaxed max-w-2xl mb-12 scroll-reveal reveal-delay-200">
          Hands-on training for teams: Claude, ChatGPT, Gemini, Copilot, and the agents
          behind them, taught in plain language through the work your team already does.
          Half day or full day, in person or remote. Most clients start here.
        </p>

        <div className="scroll-reveal reveal-delay-300">
          <PromptLift />
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-6 scroll-reveal reveal-delay-300">
          <Link
            to="/services/ai-training"
            className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider bg-white text-black py-4 px-6 rounded-sm overflow-hidden transition-[transform,box-shadow] duration-300 ease-swift hover:shadow-[0_0_30px_-8px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 active:scale-[0.97]"
          >
            <span>Explore AI training</span>
            <iconify-icon icon="solar:arrow-right-linear" class="text-base group-hover:translate-x-1 transition-transform duration-300"></iconify-icon>
          </Link>
          <span className="text-sm text-white/40 font-light">
            Workshops, team sessions, and the judgment to use it all well.
          </span>
        </div>
      </div>
    </section>
  )
}

export default TrainingSpotlight
