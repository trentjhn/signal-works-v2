import React from 'react'
import FlashlightCard from './ui/FlashlightCard'

// Featured offering: AI Search Visibility (AEO). Promoted out of the old bento
// card grid into its own section. Leads with the brand-defense angle (the most
// urgent, visceral hook), backed by an illustrative mention-rate board showing
// what a brand's visibility looks like across AI surfaces.
const engines = [
  { name: 'ChatGPT', pct: 82 },
  { name: 'Perplexity', pct: 68 },
  { name: 'Gemini', pct: 41 },
  { name: 'Claude', pct: 57 },
  { name: 'Google AI Overviews', pct: 73 }
]

const proof = [
  '5 engines measured',
  '95% confidence intervals',
  'T+30 re-baseline',
  'Measured movement, not article volume'
]

const AeoFeature = () => {
  return (
    <section className="relative w-full py-24 lg:py-32 overflow-hidden z-20 border-t border-white/5">
      {/* Background grid + glow */}
      <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block">
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/5 left-[6%]"></div>
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/5 right-[6%]"></div>
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[600px] h-[400px] bg-purple-900/10 rounded-full blur-[130px]"></div>
      </div>

      <div className="relative z-10 px-6 lg:px-[6%] max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left: pitch */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-400/20 bg-purple-400/[0.06] backdrop-blur-sm mb-8 scroll-reveal">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-200/90">Featured / AI Search Visibility</span>
            </div>

            <h2 className="leading-[1.02] scroll-reveal delay-100 lg:text-6xl text-4xl font-medium text-white tracking-tighter mb-8">
              When buyers ask AI,
              <span className="text-white/30"> does your brand come up?</span>
            </h2>

            <p className="text-base lg:text-lg text-white/60 font-light leading-relaxed max-w-xl mb-8 scroll-reveal delay-200">
              When someone asks ChatGPT or Gemini about your brand, you don't control what comes back. These engines get brands wrong all the time. They confuse you with a competitor, invent details that were never real, or leave you out of the answer completely. Buyers trust what the AI tells them. We find out what the engines actually say about you, fix what's wrong, and re-measure at 30 days so you can see it move.
            </p>

            <div className="flex flex-wrap gap-2 mb-10 scroll-reveal delay-300">
              {proof.map((p) => (
                <span key={p} className="text-[11px] font-mono tracking-wide text-white/50 border border-white/10 bg-white/[0.03] rounded-sm px-3 py-1.5">
                  {p}
                </span>
              ))}
            </div>

            <a
              href="https://calendly.com/hello-signalworks"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider bg-white text-black py-4 px-6 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_-8px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 scroll-reveal delay-300"
            >
              <span>Get your visibility baseline</span>
              <iconify-icon icon="solar:arrow-right-linear" class="text-base group-hover:translate-x-1 transition-transform duration-300"></iconify-icon>
            </a>
          </div>

          {/* Right: measurement board */}
          <div className="lg:col-span-6 xl:col-span-5 scroll-reveal delay-200">
            <FlashlightCard className="border border-white/10 hover:border-white/20 transition-colors duration-500 rounded-sm backdrop-blur-lg p-6 lg:p-8 relative overflow-hidden bg-white/[0.02]">
              <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)', zIndex: 0 }}></div>
              <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.4), transparent 40%)', zIndex: 0, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1px' }}></div>
              <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Mention rate / category queries</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400/70">Illustrative example</span>
              </div>
              <div className="space-y-4">
                {engines.map((e) => (
                  <div key={e.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-white/70 font-light">{e.name}</span>
                      <span className="text-xs font-mono text-white/40 tabular-nums">{e.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500/60 to-purple-400 rounded-full"
                        style={{ width: `${e.pct}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 pt-5 border-t border-white/5 text-xs text-white/40 font-light leading-relaxed">
                58% of shoppers now use AI tools to research products. If you're not cited, you're not considered.
              </p>
              <p className="mt-2 text-[10px] font-mono uppercase tracking-widest text-white/25">ChannelEngine, 2025</p>
              </div>
            </FlashlightCard>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AeoFeature
