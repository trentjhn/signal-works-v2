import React from 'react'
import PageHero from '../components/ui/PageHero'
import { Section, BulletList } from '../components/ui/Prose'
import CtaBand from '../components/ui/CtaBand'
import RelatedLinks from '../components/ui/RelatedLinks'

const founders = [
  {
    photo: '/trent.jpg',
    name: 'Trenton Johnson',
    role: 'Co-founder',
    bio: 'Former Product Manager at PayPal. Yale Computer Science. Left PayPal to build AI systems that run in production. That is still the bar: systems a business can depend on from day one, built for real use, real data, and real teams.',
  },
  {
    photo: '/jahleel.jpg',
    name: 'Jahleel Heath',
    role: 'Co-founder',
    bio: 'Built and led product strategy for an enterprise K-12 SaaS platform, from architecture to launch. Background in NIL marketing, brand activation, and nonprofit operations. Finds where AI creates real value inside a business, then builds the systems that make it land.',
  },
]

const beliefs = [
  'We know the difference between what demos well and what actually works.',
  'Every recommendation is backed by current research, not yesterday’s playbook. Keeping up with AI is a full-time job. That is the work we take off your plate.',
  'Senior-led from first call to final handoff. The people who scope your build are the ones who build and ship it.',
  'Builds ship in your infrastructure with documentation, infrastructure-as-code, and a handoff training session.',
]

const frameworks = ['NIST AI RMF', 'OWASP LLM Top 10', 'ABA Rule 1.6', 'AICPA SSTS 1.4']

function About() {
  return (
    <>
      <PageHero
        eyebrow="About SignalWorks"
        title="Your AI department,"
        titleMuted="sized to how you want to work."
        intro="SignalWorks is a custom-AI engineering agency. We build, deploy, and maintain AI systems for small businesses, founder-led brands, and agencies. We build the thing, ship it in your infrastructure, document it, and train your team to run it. The code lives in your repository. Most clients keep us on as their ongoing AI department; the work is yours either way."
        ctaLabel="Book an intro call"
      />

      <Section title="Who you work with" lede="Senior-built means the people who scope your build are the ones who build it.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {founders.map((f) => (
            <div key={f.name} className="border border-white/5 bg-white/[0.02] rounded-sm p-8 lg:p-10 scroll-reveal">
              <div className="w-[160px] h-[160px] rounded-sm border border-white/10 overflow-hidden mb-7">
                <img src={f.photo} alt={f.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h3 className="text-xl font-medium text-white tracking-tight">{f.name}</h3>
              <p className="text-xs font-mono uppercase tracking-widest text-purple-300/70 mt-1 mb-4">{f.role}</p>
              <p className="text-sm text-white/60 font-light leading-relaxed">{f.bio}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="What we believe" lede="Built for production. Owned by you.">
        <BulletList items={beliefs} />
      </Section>

      <Section title="Frameworks we build to" lede="We build to recognized standards for AI risk, security, and professional confidentiality.">
        <div className="flex flex-wrap gap-3 scroll-reveal">
          {frameworks.map((f) => (
            <span key={f} className="text-xs lg:text-sm font-mono tracking-wide text-white/60 border border-white/10 bg-white/[0.03] rounded-sm px-4 py-2">
              {f}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Where we are" lede="Based in Los Angeles, also serving the San Francisco Bay Area. Remote-first, working with clients anywhere.">
        <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-3xl scroll-reveal">
          Founded in 2025. Reach us at hello@signalworks.live, or book a 30-minute intro call to scope an engagement.
        </p>
      </Section>

      <CtaBand heading="Want to talk through what we could build?" sub="A 30-minute call is enough to know if we are a fit." />

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

export default About
