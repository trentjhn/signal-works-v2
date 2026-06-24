import React from 'react'
import PageHero from '../components/ui/PageHero'
import { Section, CardGrid, BulletList } from '../components/ui/Prose'
import CtaBand from '../components/ui/CtaBand'
import RelatedLinks from '../components/ui/RelatedLinks'

const services = [
  { icon: 'solar:shield-check-bold-duotone', title: 'Security assessments', body: 'Reviews of your existing AI deployments against the OWASP LLM Top 10: prompt injection, data leakage, insecure output handling, and the rest.' },
  { icon: 'solar:document-text-bold-duotone', title: 'Vendor and contract audits', body: 'A clear read on what your AI vendors actually do with your data, what their contracts commit to, and where the risk sits.' },
  { icon: 'solar:users-group-rounded-bold-duotone', title: 'Internal AI usage policies', body: 'Practical policies your team will actually follow, covering what tools are allowed, what data can go where, and who is accountable.' },
  { icon: 'solar:scale-bold-duotone', title: 'Compliance mapping', body: 'Your AI use mapped against the regulations and standards that apply to your industry, with the gaps called out plainly.' },
]

const frameworks = [
  'NIST AI RMF — the risk-management framework we build and assess against.',
  'OWASP LLM Top 10 — the standard list of large-language-model security risks.',
  'ABA Rule 1.6 — confidentiality obligations relevant to legal and professional-services clients.',
  'AICPA SSTS 1.4 — standards relevant to accounting and tax work.',
]

function AiSecurityGovernance() {
  return (
    <>
      <PageHero
        eyebrow="Service / AI Security & Governance"
        title="AI security audits and governance"
        titleMuted="for the AI you already run."
        intro="Most businesses adopt AI faster than they secure it. We assess existing AI deployments, audit vendors and contracts, write the internal usage policies your team will follow, and map your AI use to the regulations that apply to your industry."
        ctaLabel="Book an intro call"
      />

      <Section title="What we assess and build" lede="Whether you have AI in production or are about to, this is how you find the risk before it finds you.">
        <CardGrid items={services} />
      </Section>

      <Section title="Frameworks we build and assess to" lede="Not invented checklists. The recognized standards for AI risk, security, and professional confidentiality.">
        <BulletList items={frameworks} />
      </Section>

      <Section title="Why this matters now" lede="A capable AI system that leaks data or invents a confident wrong answer is worse than no system at all.">
        <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-3xl scroll-reveal">
          We build to a security-first methodology on every engagement, not just the security ones. If you are deploying AI that touches customer data, internal documents, or regulated work, an assessment up front is far cheaper than an incident later. Every recommendation is backed by current research, not yesterday’s playbook.
        </p>
      </Section>

      <CtaBand heading="Not sure how exposed your AI use is?" sub="An assessment up front beats an incident later. A 30-minute call is enough to start." />

      <RelatedLinks
        title="Explore more"
        links={[
          { to: '/services/custom-ai-software', label: 'Custom AI Software' },
          { to: '/services/knowledge-systems', label: 'Knowledge Systems' },
          { to: '/about', label: 'About SignalWorks' },
        ]}
      />
    </>
  )
}

export default AiSecurityGovernance
