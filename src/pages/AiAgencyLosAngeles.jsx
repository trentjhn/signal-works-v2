import React from 'react'
import PageHero from '../components/ui/PageHero'
import { Section, CardGrid, BulletList } from '../components/ui/Prose'
import CtaBand from '../components/ui/CtaBand'
import RelatedLinks from '../components/ui/RelatedLinks'

const services = [
  { icon: 'solar:sparkles-bold-duotone', title: 'AI Automations', body: 'Background workflows that run quietly and produce structured output: lead-gen, document generation, intent classification, content drafting.' },
  { icon: 'solar:code-square-bold-duotone', title: 'Custom AI Software', body: 'Intelligence systems, custom agents, and bespoke web apps built around your specific workflow.' },
  { icon: 'solar:library-bold-duotone', title: 'Knowledge Systems', body: 'Your scattered docs and Slack turned into one searchable, permission-aware brain.' },
  { icon: 'solar:shield-keyhole-bold-duotone', title: 'AI Security & Governance', body: 'Assessments, vendor audits, internal policies, and compliance mapping for your industry.' },
  { icon: 'solar:magnifer-zoom-in-bold-duotone', title: 'AI Search Visibility', body: 'Answer engine optimization: measuring and fixing whether your brand surfaces in AI search.' },
]

const local = [
  'Based in Los Angeles, also serving the San Francisco Bay Area. Remote-first, working with clients anywhere.',
  'Senior-led from first call to final handoff. The people who scope your build are the ones who build and ship it.',
  'Every build ships in your own infrastructure with documentation, infrastructure-as-code, and a training session.',
  'Built to NIST AI RMF and the OWASP LLM Top 10.',
]

function AiAgencyLosAngeles() {
  return (
    <>
      <PageHero
        eyebrow="AI Agency / Los Angeles"
        title="AI automation agency in Los Angeles"
        titleMuted="building AI that actually ships."
        intro="SignalWorks is a custom-AI engineering agency based in Los Angeles. We build, deploy, and maintain AI automation and software for small businesses, founder-led brands, and agencies across LA and the Bay Area, and remotely anywhere."
        ctaLabel="Book an intro call"
      />

      <Section title="What we do for LA businesses" lede="Your AI department, sized to how you want to work. Five service lines, all senior-built, all shipped in your infrastructure.">
        <CardGrid items={services} />
      </Section>

      <Section title="Why work with a local senior-led team" lede="The same people from the first call to the final handoff.">
        <BulletList items={local} />
      </Section>

      <Section title="How we work" lede="Built for production. Owned by you.">
        <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-3xl scroll-reveal">
          We build the thing, ship it in your infrastructure, document it, and train your team to run it. The code lives in your repository. Most clients keep us on as their ongoing AI department; the work is yours either way. Whether you are in Los Angeles, the Bay Area, or elsewhere, the engagement is the same.
        </p>
      </Section>

      <CtaBand heading="Looking for an AI partner in Los Angeles?" sub="A 30-minute call is enough to know if we are a fit." />

      <RelatedLinks
        title="Explore our services"
        links={[
          { to: '/services/ai-automations', label: 'AI Automations' },
          { to: '/services/custom-ai-software', label: 'Custom AI Software' },
          { to: '/services/ai-search-visibility', label: 'AI Search Visibility (AEO)' },
        ]}
      />
    </>
  )
}

export default AiAgencyLosAngeles
