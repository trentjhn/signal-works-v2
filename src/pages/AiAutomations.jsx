import React from 'react'
import PageHero from '../components/ui/PageHero'
import { Section, CardGrid, BulletList } from '../components/ui/Prose'
import CtaBand from '../components/ui/CtaBand'
import RelatedLinks from '../components/ui/RelatedLinks'

const automate = [
  { icon: 'solar:inbox-archive-bold-duotone', title: 'Lead-gen pipelines', body: 'Inbound and outbound flows that capture, enrich, score, and route leads into your CRM without manual copy-paste.' },
  { icon: 'solar:document-add-bold-duotone', title: 'Document generation', body: 'Proposals, reports, summaries, and contracts drafted from your data and templates, ready for a human to review and send.' },
  { icon: 'solar:filter-bold-duotone', title: 'Intent classification', body: 'Incoming messages, tickets, and forms sorted and tagged so the right work reaches the right person automatically.' },
  { icon: 'solar:pen-new-square-bold-duotone', title: 'Content drafting', body: 'First drafts for the recurring content your team writes by hand, grounded in your voice and source material.' },
  { icon: 'solar:checklist-minimalistic-bold-duotone', title: 'Meeting-to-action wiring', body: 'Calls and meetings turned into structured notes, action items, and follow-ups pushed to the tools you already use.' },
]

const ships = [
  'A working dashboard a non-technical user can operate. No command-line handoffs.',
  'Code in your own AWS, GCP, or Azure account, with infrastructure-as-code so you can redeploy or decommission without us.',
  'A walkthrough video, a one-page runbook, and a live training session for the team running the system.',
  '30 days of post-handoff support to fix anything that breaks and answer questions.',
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

      <Section title="What we automate" lede="The recurring, rules-and-judgment work that eats hours every week. Each automation is scoped to a specific job, not a generic chatbot bolted onto your stack.">
        <CardGrid items={automate} />
      </Section>

      <Section title="How every automation ships" lede="Built for production, owned by you. The same handoff standard applies to every engagement.">
        <BulletList items={ships} />
      </Section>

      <Section title="When automation makes sense" lede="If ten hours a week are lost to work that should run itself, that is what this is for. We start by mapping where the time goes, then automate the highest-leverage steps first so you see value before the full build is done.">
        <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-3xl scroll-reveal">
          Every build is shipped with a security-first methodology grounded in NIST AI RMF and the OWASP LLM Top 10. Most clients keep us on as their ongoing AI department after the first automation lands; the work is yours either way.
        </p>
      </Section>

      <CtaBand heading="Have a workflow that should run itself?" sub="Tell us where the hours go. A 30-minute call is enough to know if we are a fit." />

      <RelatedLinks
        title="Explore more"
        links={[
          { to: '/services/custom-ai-software', label: 'Custom AI Software' },
          { to: '/services/knowledge-systems', label: 'Knowledge Systems' },
          { to: '/ai-agency-los-angeles', label: 'AI Agency in Los Angeles' },
        ]}
      />
    </>
  )
}

export default AiAutomations
