import React from 'react'
import { Sparkles, Database } from 'lucide-react'
import FlashlightCard from './ui/FlashlightCard'

const Features = () => {
  return (
    <section className="z-10 lg:py-32 bg-indigo-950/20 w-full border-white/5 border-t pt-24 pb-24 relative" data-motion-scope="">
      
      {/* Background Grid & Beams */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block z-0">
        <div className="absolute top-0 bottom-0 left-[6%] w-[1px] bg-white/5"></div>
        <div className="absolute top-0 bottom-0 left-[28%] w-[1px] bg-white/5">
          <div className="beam-v" style={{ animation: 'beam-v 7s infinite linear' }}></div>
        </div>
        <div className="absolute top-0 bottom-0 left-[62%] w-[1px] bg-white/5">
           <div className="beam-v" style={{ animation: 'beam-v 5s infinite 2s linear' }}></div>
        </div>
        <div className="absolute top-0 bottom-0 right-[6%] w-[1px] bg-white/5"></div>
      </div>

      <div className="absolute top-0 left-[6%] right-[6%] h-[1px] bg-white/5 hidden lg:block z-10"></div>
      
      <div className="relative z-10 lg:px-[6%] max-w-[1600px] mr-auto ml-auto pr-6 pl-6">
        
        {/* Section Header */}
        <div className="mb-20 lg:mb-24 max-w-4xl">
          <h2 className="lg:text-8xl text-4xl font-normal text-white tracking-tight mb-8 scroll-reveal">
            What we <span className="text-white/30">build.</span>
          </h2>
          <div className="scroll-reveal reveal-delay-100">
            <p className="text-lg text-white/60 font-light leading-relaxed max-w-2xl">
              Custom AI engineering for businesses that need it built right, not demoed well. Every engagement ships in your infrastructure with documentation and team training.
            </p>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 gap-x-6 gap-y-6">

          {/* Card 1 */}
          <FlashlightCard className="scroll-reveal reveal-delay-200 col-span-1 lg:col-span-2 hover:bg-white/[0.04] flex flex-col hover:border-white/10 h-full border-white/5 border rounded-sm pt-8 pr-8 pb-8 pl-8 relative backdrop-blur-lg justify-between overflow-hidden">
            <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)', zIndex: 0 }}></div>
            <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.4), transparent 40%)', zIndex: 0, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1px' }}></div>
            
            <div className="h-48 mb-8 relative flex items-center justify-center bg-black/20 rounded-sm border border-white/5 overflow-hidden z-10">
              <div className="w-3/4 p-4 border border-white/10 bg-[#0e0829] rounded-sm shadow-2xl transform group-hover:-translate-y-1 transition-transform duration-200 ease-swift">
                <div className="flex gap-1.5 mb-3 opacity-50">
                  <div className="w-1 h-1 rounded-full bg-white"></div>
                  <div className="w-1 h-1 rounded-full bg-white"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-1 w-full bg-white/10 rounded-full"></div>
                  <div className="h-1 w-2/3 bg-white/10 rounded-full"></div>
                  <div className="h-1 w-5/6 bg-purple-500/40 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-medium text-white mb-3 tracking-tight flex items-center gap-2">
                AI Automations
                <Sparkles className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-white/50 font-light leading-relaxed">
                Background workflows that run quietly and produce structured output. Lead-gen pipelines, document generation, intent classification, content drafting, and meeting-to-action wiring.
              </p>
            </div>
          </FlashlightCard>

          {/* Card 2 */}
          <FlashlightCard className="scroll-reveal reveal-delay-300 col-span-1 lg:col-span-2 hover:bg-white/[0.04] flex flex-col hover:border-white/10 h-full border-white/5 border rounded-sm pt-8 pr-8 pb-8 pl-8 relative backdrop-blur-lg justify-between overflow-hidden">
            <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)', zIndex: 0 }}></div>
            <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.4), transparent 40%)', zIndex: 0, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1px' }}></div>
            
            <div className="h-48 mb-8 relative flex items-center justify-center overflow-hidden z-10">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-swift"></div>
              <div className="relative z-10 grid grid-cols-2 gap-4 opacity-60 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/5 border-white/5 border rounded p-3 flex items-center justify-center"><iconify-icon icon="cib:google-cloud" class="text-2xl text-white"></iconify-icon></div>
                <div className="bg-white/5 border-white/5 border rounded p-3 flex items-center justify-center"><iconify-icon icon="cib:amazon-aws" class="text-2xl text-white"></iconify-icon></div>
                <div className="bg-white/5 border-white/5 border rounded p-3 flex items-center justify-center"><iconify-icon icon="cib:amazon-aws" class="text-2xl text-white"></iconify-icon></div>
                <div className="p-3 bg-white/5 rounded border border-white/5 flex items-center justify-center"><Database className="w-6 h-6 text-white" /></div>
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-medium text-white mb-3 tracking-tight">AI Tooling Setup</h3>
              <p className="text-sm text-white/50 font-light leading-relaxed">
                Custom GPTs, tool and data integrations, agents, prompt libraries, and team training. For teams that already have AI tools but aren't getting full value out of them.
              </p>
            </div>
          </FlashlightCard>

          {/* Card 3 */}
          <FlashlightCard className="scroll-reveal reveal-delay-500 col-span-1 lg:col-span-2 hover:bg-white/[0.04] flex flex-col hover:border-white/10 h-full border-white/5 border rounded-sm pt-8 pr-8 pb-8 pl-8 relative backdrop-blur-lg justify-between overflow-hidden">
            <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)', zIndex: 0 }}></div>
            <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.4), transparent 40%)', zIndex: 0, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1px' }}></div>

            <div className="h-48 mb-8 relative flex items-center justify-center overflow-hidden z-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
              <iconify-icon icon="solar:library-bold-duotone" class="text-6xl text-white/20 group-hover:text-purple-400/80 transition-colors duration-300"></iconify-icon>
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-medium text-white mb-3 tracking-tight">Knowledge Systems</h3>
              <p className="text-sm text-white/50 font-light leading-relaxed">
                Your scattered docs, Slack, and drives turned into one searchable brain your team can just ask. Permission-aware, so the right people see the right answers, and nothing leaks.
              </p>
            </div>
          </FlashlightCard>

          {/* Card 4 */}
          <FlashlightCard className="scroll-reveal reveal-delay-200 col-span-1 lg:col-span-3 hover:bg-white/[0.04] flex flex-col min-h-[320px] hover:border-white/10 border-white/5 border rounded-sm pt-8 pr-8 pb-8 pl-8 relative backdrop-blur-lg justify-between overflow-hidden">
            <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)', zIndex: 0 }}></div>
            <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.4), transparent 40%)', zIndex: 0, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1px' }}></div>

            {/* Mini dashboard vignette — same crafted-mockup family as Card 1's browser frame. */}
            <div className="h-40 mb-8 relative flex items-center justify-center bg-black/20 rounded-sm border border-white/5 overflow-hidden z-10">
              <div className="w-2/3 p-4 border border-white/10 bg-[#0e0829] rounded-sm shadow-2xl transform group-hover:-translate-y-1 transition-transform duration-500">
                <div className="flex items-center justify-between mb-3 opacity-60">
                  <div className="h-1 w-1/4 bg-white/20 rounded-full"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></div>
                </div>
                <div className="flex items-end gap-1.5 h-10">
                  <div className="w-full h-[35%] bg-white/10 rounded-sm"></div>
                  <div className="w-full h-[55%] bg-white/10 rounded-sm"></div>
                  <div className="w-full h-[40%] bg-white/10 rounded-sm"></div>
                  <div className="w-full h-[75%] bg-purple-500/40 rounded-sm"></div>
                  <div className="w-full h-[60%] bg-white/10 rounded-sm"></div>
                  <div className="w-full h-[90%] bg-purple-500/60 rounded-sm"></div>
                </div>
              </div>
            </div>
            <div className="mt-auto relative z-10">
              <h3 className="text-xl font-medium text-white mb-3 tracking-tight">Intelligence Systems &amp; Custom Software</h3>
              <p className="text-sm text-white/50 font-light leading-relaxed max-w-md">
                Multi-source monitoring with full dashboards. Governance trackers, competitive intelligence, custom agentic systems with backend integration, and bespoke web applications built around your specific workflow.
              </p>
            </div>
          </FlashlightCard>

          {/* Card 5 */}
          <FlashlightCard className="scroll-reveal reveal-delay-300 col-span-1 lg:col-span-3 hover:bg-white/[0.04] flex flex-col min-h-[320px] hover:border-white/10 border-white/5 border rounded-sm pt-8 pr-8 pb-8 pl-8 relative backdrop-blur-lg justify-between overflow-hidden">
            <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)', zIndex: 0 }}></div>
            <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.4), transparent 40%)', zIndex: 0, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1px' }}></div>

            {/* Dot-grid + glyph vignette — mirrors Card 3's Knowledge Systems treatment. */}
            <div className="h-40 mb-8 relative flex items-center justify-center overflow-hidden z-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
              <iconify-icon icon="solar:shield-check-bold-duotone" class="text-6xl text-white/20 group-hover:text-purple-400/80 transition-colors duration-300"></iconify-icon>
            </div>
            <div className="mt-auto relative z-10">
              <h3 className="text-xl font-medium text-white mb-3 tracking-tight">AI Security &amp; Governance</h3>
              <p className="text-sm text-white/50 font-light leading-relaxed max-w-md">
                Security assessments of existing AI deployments. Vendor and contract audits. Internal AI usage policies. Compliance mapping for the regulations that apply to your industry.
              </p>
            </div>
          </FlashlightCard>

        </div>
      </div>
    </section>
  )
}

export default Features