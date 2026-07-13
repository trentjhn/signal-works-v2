import React from 'react'
import { Section } from '../components/ui/Prose'
import CtaBand from '../components/ui/CtaBand'
import RelatedLinks from '../components/ui/RelatedLinks'

// Dogfood result — measured on SignalWorks' own brand, fully shareable.
const engines = [
  { name: 'Gemini', before: 0, after: 52 },
  { name: 'ChatGPT', before: 12, after: 32 },
  { name: 'Claude', before: 0, after: 0 },
]

const capabilities = [
  {
    icon: 'solar:graph-new-up-bold-duotone',
    tag: 'Intelligence system',
    title: 'A zero-hallucination governance dashboard',
    body: 'A daily digest that pulls five public government bodies into one view and refuses to report anything it cannot cite.',
  },
  {
    icon: 'solar:magnifer-zoom-in-bold-duotone',
    tag: 'AI search visibility',
    title: 'Our own AI-visibility measurement system',
    body: 'The tool we built to track how AI engines describe a brand across five engines, with real statistical confidence behind every number. It is what our search-visibility work runs on.',
  },
  {
    icon: 'solar:inbox-archive-bold-duotone',
    tag: 'Automation',
    title: 'A prospecting agent for a marketing firm',
    body: 'Maps the businesses around a client site and returns verified contacts on demand. The manual version took days.',
  },
]

const benchmarks = [
  { stat: '58%', label: 'of shoppers now use AI tools when researching products.', src: 'ChannelEngine, 2025 (4,500+ shoppers)' },
  { stat: '~67%', label: 'success rate when buying AI from a specialist vendor, versus about one-third when building in-house.', src: 'MIT study of 300+ corporate AI deployments, 2025' },
  { stat: '0.66', label: 'correlation between branded web mentions and AI visibility, far above backlinks (0.22).', src: 'Ahrefs 75,000-brand study, Aug 2025' },
]

function Bar({ pct }) {
  return (
    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
      <div className="bar-grow h-full bg-gradient-to-r from-purple-500/70 to-purple-400 rounded-full" style={{ '--bar-width': `${pct}%` }}></div>
    </div>
  )
}

function Work() {
  return (
    <>
      {/* Distinct hero: measurement register. */}
      <section className="relative w-full pt-[150px] md:pt-[190px] pb-20 lg:pb-28 px-6 lg:px-[6%] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[28%] right-[14%] w-[900px] h-[420px] bg-purple-900/[0.10] rounded-full blur-[150px]"></div>
        </div>
        <div className="relative z-10 max-w-[1100px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-400/20 bg-purple-400/[0.06] backdrop-blur-sm mb-8 animate-reveal">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-200/90">Our work / measured</span>
          </div>
          <h1 className="leading-[1.04] animate-reveal reveal-delay-100 text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight mb-8 max-w-4xl">
            Proof, not promises.
            <span className="text-white/30"> We measure our own work the way we measure yours.</span>
          </h1>
          <p className="text-base lg:text-lg text-white/60 font-light leading-relaxed max-w-2xl animate-reveal reveal-delay-200">
            We are an early team and we would rather show you one real, measured result than a wall of logos. Here is the work, reported the same honest way we would report yours.
          </p>
        </div>
      </section>

      {/* Marquee proof: the dogfood before/after. */}
      <Section title="We ran our own tool on our own brand" size="display" lede="When we first measured how AI engines described SignalWorks, they barely recognized us. Worse, they confused us with same-named companies. We fixed the entity signals and re-measured in about three weeks." beamDelay={0} glow>
        <div className="card-surface rounded-sm p-8 lg:p-10 scroll-reveal">
          <div className="relative z-10">
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-6xl lg:text-7xl font-semibold text-white tracking-tight tabular-nums leading-none">7&times;</span>
              <span className="text-base lg:text-lg text-white/70 font-light max-w-xs">more often recognized as the right company by AI engines</span>
            </div>
            <p className="text-sm text-white/55 font-light mb-8 max-w-xl">In about three weeks, after we fixed our own entity signals, correct recognition across engines went from 4% to 28%. Here is the per-engine movement.</p>

            <div className="space-y-5">
              {engines.map((e) => (
                <div key={e.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-white/70 font-light">{e.name}</span>
                    <span className="text-xs font-mono text-white/45 tabular-nums">{e.before}% → {e.after}%</span>
                  </div>
                  <Bar pct={e.after} />
                </div>
              ))}
            </div>

            <p className="mt-8 pt-6 border-t border-white/5 text-xs text-white/40 font-light leading-relaxed max-w-2xl">
              Reported honestly: this is a strong directional signal from a single re-measure, not a locked statistical finding. Claude still resolves us to a namesake, which we traced to a search-indexing gap, not a memory gap. That is the level of candor a client gets too.
            </p>
          </div>
        </div>
      </Section>

      {/* Anonymized capability examples. */}
      <Section title="Some of the things we have built" beamDelay={2}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {capabilities.map((c) => (
            <div key={c.title} className="card-surface rounded-sm p-6 lg:p-8 scroll-reveal">
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-md bg-purple-500/12 border border-purple-400/20 flex items-center justify-center mb-5">
                  <iconify-icon icon={c.icon} class="text-purple-300 text-xl"></iconify-icon>
                </div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-purple-300/60 mb-2">{c.tag}</p>
                <h3 className="text-lg font-medium text-white tracking-tight mb-3">{c.title}</h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Cited benchmarks (directional context, not promises). */}
      <Section title="Why this matters now" lede="The ground is moving. A few numbers worth knowing, from sources worth trusting." beamDelay={1}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {benchmarks.map((b) => (
            <div key={b.src} className="card-surface rounded-sm p-6 lg:p-8 scroll-reveal">
              <div className="relative z-10">
                <p className="text-4xl font-semibold text-white tracking-tight mb-3 tabular-nums">{b.stat}</p>
                <p className="text-sm text-white/65 font-light leading-relaxed mb-4">{b.label}</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/35">{b.src}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand heading="Want a measured baseline for your brand?" sub="We will show you exactly where you stand before we change anything. A 30-minute call is enough to start." />

      <RelatedLinks
        title="Keep exploring"
        links={[
          { to: '/services/ai-search-visibility', label: 'AI Search Visibility (AEO)' },
          { to: '/approach', label: 'Our Approach' },
          { to: '/about', label: 'About SignalWorks' },
        ]}
      />
    </>
  )
}

export default Work
