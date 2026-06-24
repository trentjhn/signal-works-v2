import React from 'react'
import PageHero from '../components/ui/PageHero'
import { Section, CardGrid, BulletList } from '../components/ui/Prose'
import CtaBand from '../components/ui/CtaBand'
import RelatedLinks from '../components/ui/RelatedLinks'

const includes = [
  { icon: 'solar:database-bold-duotone', title: 'Connected to your sources', body: 'Docs, Slack, drives, wikis, and tickets pulled into one place your team can just ask, instead of hunting across ten tools.' },
  { icon: 'solar:lock-keyhole-bold-duotone', title: 'Permission-aware', body: 'The right people see the right answers and nothing leaks. Access mirrors the permissions you already have in your source systems.' },
  { icon: 'solar:chat-square-like-bold-duotone', title: 'Answers with citations', body: 'Every answer points back to the source document, so your team can trust it and verify it, not guess whether the model made it up.' },
  { icon: 'solar:refresh-circle-bold-duotone', title: 'Stays current', body: 'The index updates as your content changes, so the brain reflects what is true now, not a snapshot from setup day.' },
]

const why = [
  'Knowledge that lives in scattered docs, Slack threads, and people’s heads is knowledge your team cannot reliably find.',
  'New hires ramp faster when the answer to "how do we do this" is one question away.',
  'Built on retrieval-augmented generation (RAG): the system retrieves your actual content and grounds every answer in it, rather than relying on what a general model happens to know.',
]

function KnowledgeSystems() {
  return (
    <>
      <PageHero
        eyebrow="Service / Knowledge Systems"
        title="Internal AI search"
        titleMuted="that turns scattered docs into one searchable brain."
        intro="Your scattered docs, Slack, and drives turned into one searchable brain your team can just ask. Permission-aware, so the right people see the right answers and nothing leaks. Built on retrieval-augmented generation and shipped in your own infrastructure."
        ctaLabel="Book an intro call"
      />

      <Section title="What a knowledge system includes" lede="Not a generic chatbot. A retrieval system grounded in your real content, with access controls and citations built in.">
        <CardGrid items={includes} />
      </Section>

      <Section title="Why teams build one" lede="If your team spends real time hunting for answers that already exist somewhere, the knowledge is there. It is just not findable.">
        <BulletList items={why} />
      </Section>

      <Section title="How it ships" lede="Built for production, owned by you.">
        <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-3xl scroll-reveal">
          Code lives in your repository and deploys to your infrastructure, with a dashboard a non-technical user can operate, a runbook, and a live training session. Built with a security-first methodology grounded in NIST AI RMF and the OWASP LLM Top 10, because a knowledge system touches sensitive internal data.
        </p>
      </Section>

      <CtaBand heading="Tired of hunting for answers that already exist?" sub="A 30-minute call is enough to know if we are a fit." />

      <RelatedLinks
        title="Explore more"
        links={[
          { to: '/services/custom-ai-software', label: 'Custom AI Software' },
          { to: '/services/ai-security-governance', label: 'AI Security & Governance' },
          { to: '/services/ai-automations', label: 'AI Automations' },
        ]}
      />
    </>
  )
}

export default KnowledgeSystems
