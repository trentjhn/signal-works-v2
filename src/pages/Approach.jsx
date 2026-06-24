import React from 'react'
import { Section } from '../components/ui/Prose'
import CtaBand from '../components/ui/CtaBand'
import RelatedLinks from '../components/ui/RelatedLinks'
import { CALENDLY } from '../lib/constants'

// The 5-layer production harness — the real internal security model, made public-safe.
const harness = [
  { n: '01', title: 'Vendor and contract', body: 'Commercial API tiers with contractual no-training terms and data-processing agreements. Your data is never used to train anyone’s model.' },
  { n: '02', title: 'Data minimization', body: 'The system only ever sees the data it needs. We strip, redact, and scope inputs before they reach a model.' },
  { n: '03', title: 'Infrastructure', body: 'Everything runs in your own cloud account, defined as infrastructure-as-code. You can audit it, redeploy it, or shut it down without us.' },
  { n: '04', title: 'Prompt and output', body: 'Structured input and output at every model call, with validation, so the system never blindly trusts what a model returns. This is the defense against prompt injection and unsafe output handling.' },
  { n: '05', title: 'Observability and audit', body: 'Every model call is logged and auditable. If something goes wrong, you can see exactly what happened and when.' },
]

const discipline = [
  'We threat-model at scoping, before a line of code is written.',
  'Code is reviewed by a human, not an AI.',
  'Secrets live in vaults, always. Never in code, never in prompts.',
  'Structured input and output at every model call.',
  'Dependencies are pinned and reviewed.',
  'Documentation that survives us, so your team can run it.',
]

const frameworks = [
  { term: 'NIST AI RMF', def: 'The U.S. risk-management framework for AI. We build and assess against it.' },
  { term: 'OWASP LLM Top 10', def: 'The standard list of the ten most common large-language-model security risks. We test for all ten.' },
  { term: 'ABA Rule 1.6 + Formal Opinion 512', def: 'The confidentiality bar for legal and professional-services work. A commercial API with no-training terms, audit logs, and your own infrastructure meets the "reasonable precautions" standard. Consumer chatbots do not.' },
  { term: 'AICPA SSTS 1.4', def: 'The standard relevant to accounting and tax work.' },
]

const options = [
  { label: 'Hire a senior AI engineer', body: 'A six-figure commitment, and they only know what they know. They go on vacation. They leave.' },
  { label: 'Hire a large agency', body: 'You become one of fifty accounts, and the senior people from the sales call are not the ones doing your work.' },
  { label: 'Work with us', body: 'The same outcomes, senior-built from first call to final handoff, no hiring risk, and you own the result.', us: true },
]

function Approach() {
  return (
    <>
      {/* Distinct hero: serious editorial register, amber risk accent (the one off-brand color). */}
      <section className="relative w-full pt-[150px] md:pt-[190px] pb-20 lg:pb-28 px-6 lg:px-[6%] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-[700px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[160px]"></div>
          <div className="absolute top-[40%] right-[10%] w-[700px] h-[400px] bg-purple-900/[0.10] rounded-full blur-[150px]"></div>
        </div>
        <div className="relative z-10 max-w-[1100px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-400/25 bg-amber-400/[0.06] backdrop-blur-sm mb-8 animate-reveal">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-200/90">Our approach / security first</span>
          </div>
          <h1 className="leading-[1.04] animate-reveal delay-100 text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight mb-8 max-w-4xl">
            We build so the AI horror stories
            <span className="text-white/30"> don’t happen to you.</span>
          </h1>
          <p className="text-base lg:text-lg text-white/60 font-light leading-relaxed max-w-2xl animate-reveal delay-200">
            Most businesses adopt AI faster than they secure it. The result is the stories you have read: leaked client data, a confident wrong answer sent to a customer, a tool that quietly trained on everything you fed it. We engineer the boring safeguards that keep those stories from being yours.
          </p>
        </div>
      </section>

      {/* The scenario — full-width amber-bordered block, distinct from any card grid. */}
      <Section divider beamDelay={0}>
        <div className="card-surface rounded-sm p-8 lg:p-12 relative scroll-reveal border-l-2 border-l-amber-400/50">
          <div className="relative z-10 max-w-3xl">
            <p className="text-[10px] font-mono uppercase tracking-widest text-amber-200/80 mb-5">A true-to-life scenario</p>
            <p className="text-xl lg:text-2xl text-white/85 font-light leading-relaxed">
              An employee pastes a client contract into a free chatbot to summarize it. That contract is now in a third party’s system, possibly in a training set. Nobody decided this. Nobody logged it. You find out when the client asks.
            </p>
            <p className="text-base text-white/55 font-light leading-relaxed mt-6">
              Every safeguard below exists to make that impossible by design, not by asking people to be careful.
            </p>
          </div>
        </div>
      </Section>

      {/* The 5-layer harness — a numbered vertical stack (signature layout for this page). */}
      <Section title="The production harness" lede="Five layers wrap every system we ship. None of them are optional, and none of them are visible to your customers. That is the point." size="display" beamDelay={2}>
        <div className="space-y-4 lg:space-y-5">
          {harness.map((l) => (
            <div key={l.n} className="card-surface rounded-sm p-6 lg:p-8 flex flex-col sm:flex-row gap-5 lg:gap-8 scroll-reveal">
              <span className="relative z-10 text-4xl lg:text-5xl font-mono text-purple-300/35 tabular-nums shrink-0 leading-none">{l.n}</span>
              <div className="relative z-10">
                <h3 className="text-lg lg:text-xl font-medium text-white tracking-tight mb-2">{l.title}</h3>
                <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-2xl">{l.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* The 6-step discipline — compact two-column list. */}
      <Section title="The discipline behind every build" lede="Security is not a feature we add at the end. It is how the work is done from the first call." beamDelay={1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {discipline.map((d) => (
            <div key={d} className="flex items-start gap-4 scroll-reveal">
              <iconify-icon icon="solar:shield-check-bold-duotone" class="text-purple-300 text-xl shrink-0 mt-0.5"></iconify-icon>
              <span className="text-sm lg:text-[15px] text-white/70 font-light leading-relaxed">{d}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Frameworks as a definition list (distinct from cards). */}
      <Section title="The standards we build to" lede="Not invented checklists. The recognized frameworks for AI risk, security, and professional confidentiality." beamDelay={3}>
        <dl className="divide-y divide-white/5 border-t border-white/5">
          {frameworks.map((f) => (
            <div key={f.term} className="py-6 lg:py-7 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-2 md:gap-8 scroll-reveal">
              <dt className="text-base font-medium text-white">{f.term}</dt>
              <dd className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-2xl">{f.def}</dd>
            </div>
          ))}
        </dl>
        <p className="text-sm text-white/45 font-light leading-relaxed mt-8 scroll-reveal">
          One honest note: we are not SOC 2 certified, and we will tell you plainly when a control is outside our scope. Architecture is something we can promise. A certification we do not hold is not.
        </p>
      </Section>

      {/* Ownership + the three-options frame (the strongest sales asset). */}
      <Section title="Your options, honestly" lede="There are three ways to get serious AI built. We will tell you when we are not the cheapest, because we are usually not the point of comparison anyway." beamDelay={0.5} glow>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {options.map((o) => (
            <div key={o.label} className={`card-surface rounded-sm p-7 lg:p-8 scroll-reveal ${o.us ? 'ring-1 ring-purple-400/40' : ''}`}>
              <div className="relative z-10">
                <h3 className={`text-lg font-medium tracking-tight mb-3 ${o.us ? 'text-purple-200' : 'text-white/80'}`}>{o.label}</h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">{o.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-base lg:text-lg text-white/70 font-light leading-relaxed mt-10 scroll-reveal">
          Same outcomes. A fraction of the cost. No hiring risk. And the code lives in your repository, so you are never locked in.
        </p>
      </Section>

      <CtaBand
        heading="Want your current AI use stress-tested?"
        sub="We will tell you where the risk is before it finds you. A 30-minute call is enough to start."
        ctaLabel="Book a call"
        ctaHref={CALENDLY}
      />

      <RelatedLinks
        title="Keep exploring"
        links={[
          { to: '/services/ai-security-governance', label: 'AI Security & Governance' },
          { to: '/work', label: 'Our Work' },
          { to: '/about', label: 'About SignalWorks' },
        ]}
      />
    </>
  )
}

export default Approach
