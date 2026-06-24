import React from 'react'
import PageHero from '../components/ui/PageHero'
import { Section, CardGrid, BulletList } from '../components/ui/Prose'
import FaqList from '../components/ui/FaqList'
import CtaBand from '../components/ui/CtaBand'
import RelatedLinks from '../components/ui/RelatedLinks'
import { aeoFaq } from '../seo'

const what = [
  { icon: 'solar:radar-bold-duotone', title: 'We measure what the engines say', body: 'We run your category and brand queries across ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews and record exactly how each one describes you.' },
  { icon: 'solar:bug-bold-duotone', title: 'We find what is wrong', body: 'Engines confuse you with competitors, invent details that were never real, or leave you out of the answer completely. We surface every miss.' },
  { icon: 'solar:wrench-bold-duotone', title: 'We fix the inputs', body: 'We fix the entity signals, structured data, and source content the engines read, so the answers about you start to change.' },
  { icon: 'solar:graph-new-up-bold-duotone', title: 'We re-measure at 30 days', body: 'A re-baseline at T+30 shows movement, with 95% confidence intervals. We report measured change, not article volume.' },
]

const proof = [
  '5 AI engines measured: ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews.',
  '95% confidence intervals on every measurement, so you know what moved and what is noise.',
  'A T+30 re-baseline that shows movement, not a one-time snapshot.',
  'We report measured movement, not the number of articles we published.',
]

function AiSearchVisibility() {
  return (
    <>
      <PageHero
        eyebrow="Service / AI Search Visibility"
        title="Answer engine optimization (AEO)"
        titleMuted="so your brand surfaces when buyers ask AI."
        intro="When someone asks ChatGPT or Gemini about your brand, you don’t control what comes back. These engines get brands wrong all the time. We find out what the engines actually say about you, fix what’s wrong, and re-measure at 30 days so you can see it move."
        ctaLabel="Get your visibility baseline"
      />

      <Section title="How answer engine optimization works" lede="AEO is search engine optimization for the AI answer. The question is no longer just where you rank on Google, but whether the engine names you at all when a buyer asks.">
        <CardGrid items={what} />
      </Section>

      <Section title="What you get" lede="A measurement-first engagement. The methodology is the differentiator, not the volume of content.">
        <BulletList items={proof} />
      </Section>

      <Section title="Why it matters" lede="58% of shoppers now use AI tools to research products. If you’re not cited, you’re not considered.">
        <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-3xl scroll-reveal">
          Buyers trust what the AI tells them. If the engine describes you wrong, or names a competitor instead, that happens silently and at scale, in conversations you never see. AEO is how you find out what is being said and change it.
        </p>
      </Section>

      <Section title="Frequently asked questions">
        <FaqList items={aeoFaq} />
      </Section>

      <CtaBand
        heading="Want to see what AI says about your brand?"
        sub="We’ll run your baseline across five engines. A 30-minute call is enough to start."
        ctaLabel="Get your visibility baseline"
      />

      <RelatedLinks
        title="Explore more"
        links={[
          { to: '/services/ai-automations', label: 'AI Automations' },
          { to: '/about', label: 'About SignalWorks' },
          { to: '/ai-agency-los-angeles', label: 'AI Agency in Los Angeles' },
        ]}
      />
    </>
  )
}

export default AiSearchVisibility
