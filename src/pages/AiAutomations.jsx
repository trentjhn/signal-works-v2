import React from 'react'
import PageHero from '../components/ui/PageHero'
import { Section, CardGrid } from '../components/ui/Prose'
import StepRail from '../components/ui/StepRail'
import CtaBand from '../components/ui/CtaBand'
import RelatedLinks from '../components/ui/RelatedLinks'

const automate = [
  { icon: 'solar:inbox-archive-bold-duotone', title: 'Lead-gen pipelines', body: 'Inbound and outbound flows that capture, enrich, score, and route leads into your CRM without manual copy-paste.' },
  { icon: 'solar:document-add-bold-duotone', title: 'Document generation', body: 'Proposals, reports, summaries, and contracts drafted from your data and templates, ready for a human to review and send.' },
  { icon: 'solar:filter-bold-duotone', title: 'Intent classification', body: 'Incoming messages, tickets, and forms sorted and tagged so the right work reaches the right person automatically.' },
  { icon: 'solar:pen-new-square-bold-duotone', title: 'Content drafting', body: 'First drafts for the recurring content your team writes by hand, grounded in your voice and source material.' },
  { icon: 'solar:checklist-minimalistic-bold-duotone', title: 'Meeting-to-action wiring', body: 'Calls and meetings turned into structured notes, action items, and follow-ups pushed to the tools you already use.' },
]

const steps = [
  { n: '01', title: 'Map where the hours go', body: 'We find the recurring, rules-and-judgment work eating your week. The highest-leverage step gets automated first.' },
  { n: '02', title: 'Scope one automation', body: 'A single job, defined tightly. No boil-the-ocean platform, no generic chatbot bolted onto your stack.' },
  { n: '03', title: 'Build and ship it', body: 'In your own infrastructure, with a dashboard a non-technical user can operate. Two to four weeks for most builds.' },
  { n: '04', title: 'Train and support', body: 'A walkthrough, a runbook, a live training session, and 30 days of support after handoff.' },
]

function AiAutomations() {
  return (
    <>
      <PageHero
        eyebrow="Service / AI Automations"
        title="AI workflow automation,"
        titleMuted="built to run in your business."
        intro="Background workflows that run quietly and produce structured output. We build the lead-gen pipelines, document generation, intent classification, content drafting, and meeting-to-action wiring you wish your AI tools did on their own, then ship them in your infrastructure with documentation and team training."
        ctaLabel="Book an intro call"
      />

      {/* Concrete before/after, the thing that separates a builder from a vendor. */}
      <Section divider={false} beamDelay={0}>
        <div className="card-surface rounded-sm p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 scroll-reveal">
          <div className="relative z-10">
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">Before</p>
            <p className="text-base lg:text-lg text-white/70 font-light leading-relaxed">
              A marketing team hand-copies every new lead from a web form into three spreadsheets and a CRM. It takes minutes per lead, it happens all day, and someone always forgets a field.
            </p>
          </div>
          <div className="relative z-10 lg:border-l border-white/10 lg:pl-12">
            <p className="text-[10px] font-mono uppercase tracking-widest text-purple-300/70 mb-3">After</p>
            <p className="text-base lg:text-lg text-white/85 font-light leading-relaxed">
              One pipeline captures, deduplicates, enriches, and routes every lead in under 90 seconds, with nothing forgotten. The team stops doing data entry and starts following up.
            </p>
          </div>
        </div>
      </Section>

      <Section title="What we automate" lede="The recurring, rules-and-judgment work that eats hours every week. Each automation is scoped to a specific job." beamDelay={2}>
        <CardGrid items={automate} variant="balanced" />
      </Section>

      <Section title="How a build goes" lede="Most automations scope, build, and ship in two to four weeks. The first value shows up before the full build is done." size="display" beamDelay={1}>
        <StepRail steps={steps} />
      </Section>

      <Section title="When automation makes sense" lede="If ten hours a week are lost to work that should run itself, that is what this is for." beamDelay={3} glow>
        <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-3xl scroll-reveal">
          Every build ships with a security-first methodology grounded in NIST AI RMF and the OWASP LLM Top 10. Most clients keep us on as their ongoing AI department after the first automation lands. The code lives in your repository either way.
        </p>
      </Section>

      <CtaBand heading="Have a workflow that should run itself?" sub="Tell us where the hours go. A 30-minute call is enough to know if we are a fit." />

      <RelatedLinks
        title="Explore more"
        links={[
          { to: '/services/custom-ai-software', label: 'Custom AI Software' },
          { to: '/services/knowledge-systems', label: 'Knowledge Systems' },
          { to: '/work', label: 'Our Work' },
        ]}
      />
    </>
  )
}

export default AiAutomations
