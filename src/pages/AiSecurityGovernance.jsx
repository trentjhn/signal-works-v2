import React from 'react'
import { Section } from '../components/ui/Prose'
import RiskTable from '../components/ui/RiskTable'
import CtaBand from '../components/ui/CtaBand'
import RelatedLinks from '../components/ui/RelatedLinks'
import { CALENDLY } from '../lib/constants'

const rows = [
  { assess: 'Existing AI deployments', look: 'Prompt injection, data leakage, insecure output handling, and the rest of the standard model-security risks.', std: 'OWASP LLM Top 10' },
  { assess: 'Vendors and contracts', look: 'What your AI vendors actually do with your data, what their terms commit to, and where the retention and training risk sits.', std: 'No-train + DPA terms' },
  { assess: 'Team usage', look: 'What tools are allowed, what data can go where, and who is accountable when something goes wrong.', std: 'A policy your team will follow' },
  { assess: 'Compliance fit', look: 'Where your AI use meets, or misses, the rules and standards that apply to your industry.', std: 'NIST AI RMF · ABA 1.6 · Op. 512' },
]

const deliverables = [
  { icon: 'solar:clipboard-list-bold-duotone', title: 'A prioritized risk register', body: 'Every finding, ranked by severity, with a plain-language explanation and a recommended fix.' },
  { icon: 'solar:star-shine-bold-duotone', title: 'A vendor scorecard', body: 'Each AI tool you use, graded on data handling, contract terms, and fit for sensitive work.' },
  { icon: 'solar:document-text-bold-duotone', title: 'A draft usage policy', body: 'A practical internal policy your team will actually follow, ready to adopt or adapt.' },
]

function AiSecurityGovernance() {
  return (
    <>
      {/* Editorial single-column hero with an amber risk register (the off-brand accent). */}
      <section className="relative w-full pt-[150px] md:pt-[190px] pb-16 lg:pb-20 px-6 lg:px-[6%] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[22%] left-[24%] w-[700px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[160px]"></div>
          <div className="absolute top-[40%] right-[16%] w-[700px] h-[400px] bg-purple-900/[0.09] rounded-full blur-[150px]"></div>
        </div>
        <div className="relative z-10 max-w-[760px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-400/25 bg-amber-400/[0.06] backdrop-blur-sm mb-8 animate-reveal">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-200/90">Risk: unassessed</span>
          </div>
          <h1 className="leading-[1.05] animate-reveal reveal-delay-100 text-4xl md:text-5xl font-medium text-white tracking-tight mb-7">
            Find the risk in your AI before it finds you.
          </h1>
          <p className="text-base lg:text-lg text-white/65 font-light leading-relaxed animate-reveal reveal-delay-200">
            Most businesses adopt AI faster than they secure it. We assess the AI you already run, audit the vendors behind it, write the usage policy your team will follow, and map your use to the regulations that apply to your industry. You get a clear picture of where you stand and what to fix first.
          </p>
        </div>
      </section>

      <Section title="What we assess" lede="A structured review, not a sales call dressed up as one. Here is the shape of it." beamDelay={0}>
        <RiskTable rows={rows} />
      </Section>

      <Section title="What you walk away with" lede="An assessment is only useful if it tells you what to do. You leave with three things you can act on." beamDelay={2}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {deliverables.map((d, i) => (
            <div key={d.title} className="card-surface rounded-sm p-6 lg:p-8 scroll-reveal" style={{ animationDelay: `${i * 90}ms` }}>
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-md bg-purple-500/12 border border-purple-400/20 flex items-center justify-center mb-5">
                  <iconify-icon icon={d.icon} class="text-purple-300 text-xl"></iconify-icon>
                </div>
                <h3 className="text-lg font-medium text-white tracking-tight mb-3">{d.title}</h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">{d.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Why it matters now" lede="A capable AI system that leaks data or sends a confident wrong answer is worse than no system at all." beamDelay={1} glow>
        <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-3xl scroll-reveal">
          If you are deploying AI that touches customer data, internal documents, or regulated work, an assessment up front is far cheaper than an incident later. Security is also how we build everything else, not a separate product. You can read how on{' '}
          <a href="/approach" className="text-purple-300 hover:text-purple-200 underline underline-offset-4 decoration-purple-400/30">our approach</a>.
        </p>
      </Section>

      <CtaBand
        heading="Not sure how exposed your AI use is?"
        sub="An assessment up front beats an incident later. A 30-minute call is enough to start."
        ctaLabel="Book a call"
        ctaHref={CALENDLY}
      />

      <RelatedLinks
        title="Explore more"
        links={[
          { to: '/approach', label: 'Our Approach' },
          { to: '/services/custom-ai-software', label: 'Custom AI Software' },
          { to: '/services/knowledge-systems', label: 'Knowledge Systems' },
        ]}
      />
    </>
  )
}

export default AiSecurityGovernance
