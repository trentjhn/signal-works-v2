import React from 'react'
import { Section } from '../components/ui/Prose'
import TypedSearch from '../components/ui/TypedSearch'
import CtaBand from '../components/ui/CtaBand'
import RelatedLinks from '../components/ui/RelatedLinks'
import { CALENDLY } from '../lib/constants'

const sources = [
  { label: 'Slack', icon: 'cib:slack' },
  { label: 'Google Drive', icon: 'cib:google-drive' },
  { label: 'Notion', icon: 'cib:notion' },
  { label: 'Confluence', icon: 'cib:confluence' },
  { label: 'Tickets', icon: 'solar:ticket-linear' },
]

function KnowledgeSystems() {
  return (
    <>
      {/* Centered hero with a live "ask your company" demo. */}
      <section className="relative w-full pt-[150px] md:pt-[180px] pb-16 lg:pb-20 px-6 lg:px-[6%] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[1000px] h-[440px] bg-purple-900/[0.10] rounded-full blur-[150px]"></div>
        </div>
        <div className="relative z-10 max-w-[1000px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-400/20 bg-purple-400/[0.06] backdrop-blur-sm mb-8 animate-reveal">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-200/90">Service / Knowledge Systems</span>
          </div>
          <h1 className="leading-[1.04] animate-reveal reveal-delay-100 text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight mb-7">
            Let your team just ask.
          </h1>
          <p className="text-base lg:text-lg text-white/60 font-light leading-relaxed max-w-2xl mx-auto mb-10 animate-reveal reveal-delay-200">
            Your scattered docs, Slack, and drives turned into one searchable brain. Permission-aware, so the right people see the right answers and nothing leaks. Built on retrieval-augmented generation and shipped in your own infrastructure.
          </p>
          <div className="flex justify-center animate-reveal reveal-delay-300">
            <TypedSearch />
          </div>
        </div>
      </section>

      {/* Source tiles -> one brain. */}
      <Section title="Connected to where your knowledge already lives" lede="No migration. We connect to the tools your team already uses and index what is in them." beamDelay={0}>
        <div className="flex flex-wrap items-center gap-3 lg:gap-4 scroll-reveal">
          {sources.map((s) => (
            <div key={s.label} className="card-surface rounded-md px-4 py-3 flex items-center gap-2.5">
              <iconify-icon icon={s.icon} class="relative z-10 text-lg text-white/70"></iconify-icon>
              <span className="relative z-10 text-sm text-white/70 font-light">{s.label}</span>
            </div>
          ))}
          <iconify-icon icon="solar:arrow-right-linear" class="text-xl text-purple-300/50 mx-1"></iconify-icon>
          <div className="card-surface rounded-md px-5 py-3 flex items-center gap-2.5 border border-purple-400/25">
            <iconify-icon icon="solar:library-bold-duotone" class="relative z-10 text-lg text-purple-300"></iconify-icon>
            <span className="relative z-10 text-sm text-white/90 font-medium">One searchable brain</span>
          </div>
        </div>
      </Section>

      {/* Q&A-shaped sections (the section title IS the question). */}
      <Section title="Why can’t my team just use the search we already have?" beamDelay={2}>
        <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-3xl scroll-reveal">
          Normal search finds documents. It does not answer the question, and it only looks inside one tool at a time. A knowledge system retrieves your actual content across every source and grounds a written answer in it, with a citation back to the source so your team can trust it and verify it. The difference is hunting through ten tabs versus asking once and getting the answer with a receipt.
        </p>
      </Section>

      <Section title="We already have Notion and a shared drive. Why is this better?" beamDelay={1}>
        <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-3xl scroll-reveal">
          Those tools store knowledge. They do not answer across all of it at once, and they cannot tell a new hire how something is done without that person knowing exactly where to look. This sits on top of what you already have, reads across all of it, respects the permissions you have already set, and answers in plain language. You keep your tools. You just stop digging through them.
        </p>
      </Section>

      <Section title="Does it stay current, and is it secure?" beamDelay={3} glow>
        <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-3xl scroll-reveal">
          The index updates as your content changes, so answers reflect what is true now, not a snapshot from setup day. Access mirrors the permissions in your source systems, so the right people see the right answers and nothing leaks. The whole system runs in your own infrastructure, built to a security-first methodology grounded in NIST AI RMF and the OWASP LLM Top 10, because a knowledge system touches your most sensitive internal data.
        </p>
      </Section>

      <CtaBand heading="Tired of hunting for answers that already exist?" sub="A 30-minute call is enough to know if we are a fit." ctaHref={CALENDLY} />

      <RelatedLinks
        title="Explore more"
        links={[
          { to: '/services/custom-ai-software', label: 'Custom AI Software' },
          { to: '/approach', label: 'Our Approach' },
          { to: '/services/ai-automations', label: 'AI Automations' },
        ]}
      />
    </>
  )
}

export default KnowledgeSystems
