import React from 'react'
import CountUp from './ui/CountUp'
import SplitHeading from './ui/SplitHeading'

// Replaces aura's plain "What we believe" manifesto with the SAKURA floating-wall layout.
// Cards contain SignalWorks brand statements (no fake names, no fake companies, no quotation marks).
// Visual structure (5 columns of cards with staggered offsets, horizontal marquee scroll, edge mask)
// is lifted directly from SAKURA's TestimonialsMarquee.

const StatementCard = ({ children, accent = false }) => (
  <div
    className={`backdrop-blur-md border border-white/5 p-5 rounded-sm hover:bg-white/[0.06] transition-all hover:-translate-y-1 group min-h-[180px] flex flex-col justify-between ${
      accent ? 'bg-gradient-to-br from-purple-900/20 to-transparent border-purple-500/20' : 'bg-white/[0.03]'
    }`}
  >
    <div className="text-purple-400/70">
      <iconify-icon icon="solar:quote-up-square-bold-duotone" class="text-xl"></iconify-icon>
    </div>
    <p className="text-sm text-white/85 font-light leading-relaxed">{children}</p>
  </div>
)

// numericValue is the integer to count up to. value (string) optional override; falls back to numericValue+suffix.
const StatCard = ({ numericValue, suffix = '', prefix = '', label }) => (
  <div className="bg-white/[0.03] backdrop-blur-md border border-white/5 p-5 rounded-sm flex items-center gap-4 hover:bg-white/[0.06] transition-all min-h-[90px]">
    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
      <iconify-icon icon="solar:graph-new-up-bold-duotone" class="text-xl"></iconify-icon>
    </div>
    <div>
      <div className="text-xl font-semibold text-white tracking-tight leading-none">
        <CountUp value={numericValue} prefix={prefix} suffix={suffix} />
      </div>
      <div className="text-[10px] font-mono text-white/40 uppercase mt-1.5">{label}</div>
    </div>
  </div>
)

const FrameworkCard = () => (
  <div className="bg-white/[0.03] border border-white/5 p-5 rounded-sm min-h-[180px]">
    <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-4">Frameworks we build to</p>
    <div className="space-y-2.5">
      {['NIST AI RMF', 'OWASP LLM Top 10', 'ABA Rule 1.6', 'AICPA SSTS 1.4'].map((f) => (
        <div key={f} className="flex items-center gap-2 text-xs text-white/70 font-mono">
          <span className="w-1 h-1 rounded-full bg-purple-400/70"></span>
          <span>{f}</span>
        </div>
      ))}
    </div>
  </div>
)

const FaqSection = () => {
  // Stagger offsets restrained: 0 / 6 / 12 / 6 / 0 (was 0 / 12 / 24 / 0 / 24 — too jagged)
  const Column1 = () => (
    <div className="flex flex-col gap-6 mt-0 w-[300px] flex-shrink-0">
      <StatementCard>
        The search bar is moving inside AI assistants. Most businesses have not noticed yet.
      </StatementCard>
      <StatCard numericValue={5} label="AI engines tracked" />
    </div>
  )

  const Column2 = () => (
    <div className="flex flex-col gap-6 mt-6 lg:mt-12 w-[300px] flex-shrink-0">
      <StatementCard accent>
        We know the difference between what demos well and what actually works.
      </StatementCard>
      <StatCard numericValue={30} suffix="d" label="Post-handoff support" />
    </div>
  )

  const Column3 = () => (
    <div className="flex flex-col gap-6 mt-12 lg:mt-20 w-[300px] flex-shrink-0">
      <StatementCard>
        If ten hours a week are lost to work that should run itself, this is what the audit is for.
      </StatementCard>
      <FrameworkCard />
    </div>
  )

  const Column4 = () => (
    <div className="flex flex-col gap-6 mt-6 lg:mt-12 w-[300px] flex-shrink-0">
      <StatementCard>
        Two senior operators. No account managers, no junior staff, no offshore handoffs.
      </StatementCard>
      <StatCard numericValue={100} suffix="%" label="Code owned by you" />
    </div>
  )

  const Column5 = () => (
    <div className="flex flex-col gap-6 mt-0 w-[300px] flex-shrink-0">
      <StatementCard accent>
        Every build is yours. Code in your infrastructure, infrastructure-as-code, runbooks. Walk away with everything intact.
      </StatementCard>
      <StatCard numericValue={100} suffix="%" label="Yours to keep" />
    </div>
  )

  return (
    <section className="relative w-full py-24 lg:py-32 overflow-hidden z-20 border-t border-white/5">
      {/* Ambient gradient + side rules to match SAKURA */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-[#0a051e] via-[#0a051e]/80 to-transparent z-10"></div>
        <div className="absolute left-[6%] right-[6%] top-0 bottom-0 border-l border-r border-white/5 hidden lg:block"></div>
      </div>

      <div className="relative z-10 px-6 lg:px-[6%] max-w-[1600px] mx-auto">
        {/* Floating columns marquee */}
        <div
          className="relative w-full overflow-hidden mb-20 lg:mb-24"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <div className="flex w-max gap-6 animate-marquee-slow items-start">
            <Column1 />
            <Column2 />
            <Column3 />
            <Column4 />
            <Column5 />
            {/* Duplicate set for seamless infinite loop */}
            <Column1 />
            <Column2 />
            <Column3 />
            <Column4 />
            <Column5 />
          </div>
        </div>

        {/* Bottom: pill + headline + subhead */}
        <div className="relative z-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8 scroll-reveal">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">What we believe</span>
          </div>

          {/* Word-by-word reveal: indices 2 and 3 ("Owned by") and 4 ("you.") get the muted-gray accent */}
          <SplitHeading
            text="Built for production. Owned by you."
            accentWords={[3, 4, 5]}
            className="leading-[1.1] md:text-5xl lg:text-7xl text-4xl font-medium text-white tracking-tight mb-6"
          />

          <p className="text-lg text-white/50 font-light leading-relaxed scroll-reveal delay-200">
            Code lives in your repo. Deploys to your infrastructure. Documented, tested, and yours to redeploy or modify with us or without us. We do not lock anyone in.
          </p>
        </div>
      </div>
    </section>
  )
}

export default FaqSection
