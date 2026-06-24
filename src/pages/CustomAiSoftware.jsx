import React from 'react'
import PageHero from '../components/ui/PageHero'
import { Section, CardGrid, BulletList } from '../components/ui/Prose'
import CtaBand from '../components/ui/CtaBand'
import RelatedLinks from '../components/ui/RelatedLinks'

const build = [
  { icon: 'solar:monitor-smartphone-bold-duotone', title: 'Bespoke web applications', body: 'Custom apps built around your specific workflow, not bent to fit an off-the-shelf tool that almost works.' },
  { icon: 'solar:radar-2-bold-duotone', title: 'Multi-source monitoring', body: 'Dashboards that pull from every source you care about and surface what changed, with the full picture in one place.' },
  { icon: 'solar:shield-network-bold-duotone', title: 'Governance trackers', body: 'Systems that track decisions, approvals, and policy adherence so oversight is a dashboard, not a spreadsheet.' },
  { icon: 'solar:graph-up-bold-duotone', title: 'Competitive intelligence', body: 'Always-on tracking of competitors, markets, and signals, summarized into the view your team actually reads.' },
  { icon: 'solar:cpu-bolt-bold-duotone', title: 'Custom agentic systems', body: 'Agents with real backend integration that take multi-step actions against your systems, safely and observably.' },
]

const principles = [
  'We know the difference between what demos well and what actually works. The bar is a system you can depend on from day one, built for real use, real data, and real teams.',
  'Code lives in your repository and deploys to your infrastructure. You can modify, redeploy, or decommission without us.',
  'Every build ships with documentation, infrastructure-as-code, and a handoff training session.',
  'Security-first methodology grounded in NIST AI RMF and the OWASP LLM Top 10.',
]

function CustomAiSoftware() {
  return (
    <>
      <PageHero
        eyebrow="Service / Custom AI Software"
        title="Custom AI software development"
        titleMuted="for the workflow you actually have."
        intro="When the tool you need does not exist off the shelf, we build it. Intelligence systems, custom agents with backend integration, and bespoke web applications built around your specific workflow, shipped to production in your own infrastructure."
        ctaLabel="Book an intro call"
      />

      <Section title="What we build" lede="Custom AI engineering for businesses that need it built right, not demoed well. Every engagement ships in your infrastructure with documentation and team training.">
        <CardGrid items={build} />
      </Section>

      <Section title="How we build" lede="Built for production. Owned by you.">
        <BulletList items={principles} />
      </Section>

      <Section title="Senior-led, start to finish" lede="The people who scope your build are the ones who build and ship it. No handoff to a junior team after the sales call.">
        <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-3xl scroll-reveal">
          Most clients keep us on as their ongoing AI department after the first build; the work is yours either way. If a custom build is the right call, we say so. If a smaller automation or an off-the-shelf tool would serve you better, we say that too.
        </p>
      </Section>

      <CtaBand heading="Need something built that does not exist yet?" sub="Bring the problem. A 30-minute call is enough to know if we are a fit." />

      <RelatedLinks
        title="Explore more"
        links={[
          { to: '/services/ai-automations', label: 'AI Automations' },
          { to: '/services/knowledge-systems', label: 'Knowledge Systems' },
          { to: '/services/ai-security-governance', label: 'AI Security & Governance' },
        ]}
      />
    </>
  )
}

export default CustomAiSoftware
