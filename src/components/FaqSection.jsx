import React from 'react'
import FlashlightCard from './ui/FlashlightCard'

// Brand statements (no fake names, no attribution)
const STATEMENTS = {
  A: "The search bar is moving inside AI assistants. Most businesses haven't noticed yet.",
  B: "We know the difference between what demos well and what actually works.",
  C: "We live inside the AI stack so your team doesn't have to.",
  D: "If ten hours a week are lost to work that should run itself, this is what the audit is for.",
  E: "Every build is yours. Code in your infrastructure, infrastructure-as-code, documentation. You can walk away with everything intact.",
  F: "Two senior operators. No account managers, no junior staff, no offshore handoffs."
}

const wordmarks = ['Casa Mate', 'MyHR Specialist', 'Gusdorf Marketing Group']

const StatementCard = ({ text, className = '', size = 'md', delay = 0 }) => {
  const sizeClasses = {
    sm: 'text-sm lg:text-base',
    md: 'text-base lg:text-lg',
    lg: 'text-lg lg:text-xl',
    xl: 'text-xl lg:text-2xl'
  }
  return (
    <FlashlightCard
      className={`group hover:bg-white/[0.04] transition-all duration-500 border border-white/5 hover:border-white/10 rounded-sm backdrop-blur-lg p-6 lg:p-7 relative overflow-hidden flex flex-col justify-center animate-reveal ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)', zIndex: 0 }}></div>
      <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.4), transparent 40%)', zIndex: 0, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1px' }}></div>
      <p className={`relative z-10 italic font-light text-white/85 leading-[1.55] tracking-tight ${sizeClasses[size]}`}>
        {text}
      </p>
    </FlashlightCard>
  )
}

const FaqSection = () => {
  return (
    <section className="z-20 w-full border-white/5 border-t relative overflow-hidden">
      {/* Ambient backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-purple-900/[0.07] rounded-full blur-[140px]"></div>
      </div>

      <div className="lg:px-[6%] max-w-[1600px] mr-auto ml-auto pr-6 pl-6 relative z-10">
        <div className="pt-28 pb-32 lg:pt-40 lg:pb-44">

          {/* Section label */}
          <div className="mb-12 lg:mb-16 flex items-center justify-between flex-wrap gap-6">
            <h2 className="leading-[1.0] lg:text-7xl text-4xl font-medium text-white tracking-tighter animate-reveal max-w-3xl">
              What we
              <span className="text-white/30"> believe.</span>
            </h2>
          </div>

          {/* Floating wall grid */}
          <div className="grid grid-cols-12 auto-rows-[120px] lg:auto-rows-[140px] gap-4 lg:gap-5">

            {/* Row 1 */}
            <StatementCard
              text={STATEMENTS.A}
              size="lg"
              className="col-span-12 md:col-span-7 row-span-2"
              delay={0.0}
            />
            <StatementCard
              text={STATEMENTS.F}
              size="md"
              className="col-span-12 md:col-span-5 row-span-2"
              delay={0.05}
            />

            {/* Row 2: text-only "Built like an engineering team" card */}
            <FlashlightCard
              className="group col-span-12 md:col-span-4 row-span-2 hover:bg-white/[0.04] transition-all duration-500 border border-white/5 hover:border-white/10 rounded-sm backdrop-blur-lg p-6 lg:p-7 relative overflow-hidden flex flex-col justify-between animate-reveal"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)', zIndex: 0 }}></div>
              <div className="relative z-10">
                <iconify-icon icon="solar:code-square-bold-duotone" class="text-purple-400 text-2xl mb-4"></iconify-icon>
                <h4 className="text-lg lg:text-xl font-medium text-white tracking-tight leading-tight mb-2">
                  Built like an engineering team.
                </h4>
                <p className="text-sm text-white/55 font-light leading-relaxed">
                  Two operators. Senior on every call.
                </p>
              </div>
            </FlashlightCard>

            <StatementCard
              text={STATEMENTS.B}
              size="md"
              className="col-span-12 md:col-span-8 row-span-2"
              delay={0.15}
            />

            {/* Row 3 */}
            <StatementCard
              text={STATEMENTS.E}
              size="md"
              className="col-span-12 md:col-span-6 row-span-2"
              delay={0.2}
            />
            <StatementCard
              text={STATEMENTS.C}
              size="lg"
              className="col-span-12 md:col-span-6 row-span-2"
              delay={0.25}
            />

            {/* Row 4 */}
            <StatementCard
              text={STATEMENTS.D}
              size="md"
              className="col-span-12 md:col-span-8 row-span-2"
              delay={0.3}
            />

            {/* TRUSTED BY mini-block (static wordmarks) */}
            <FlashlightCard
              className="group col-span-12 md:col-span-4 row-span-2 hover:bg-white/[0.04] transition-all duration-500 border border-white/5 hover:border-white/10 rounded-sm backdrop-blur-lg p-6 lg:p-7 relative overflow-hidden flex flex-col justify-center animate-reveal"
              style={{ animationDelay: '0.35s' }}
            >
              <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)', zIndex: 0 }}></div>
              <div className="relative z-10">
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-4 flex items-center gap-2">
                  <span className="w-6 h-px bg-white/20"></span>
                  Trusted by
                </div>
                <ul className="space-y-2">
                  {wordmarks.map((w, i) => (
                    <li key={i} className="text-white/70 font-medium tracking-tight text-sm lg:text-base">
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </FlashlightCard>

          </div>

          {/* Bottom pill */}
          <div className="mt-14 flex justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">What we believe</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default FaqSection