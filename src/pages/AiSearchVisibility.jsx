import React from 'react'
import { Section, CardGrid } from '../components/ui/Prose'
import MentionBars from '../components/ui/MentionBars'
import FaqList from '../components/ui/FaqList'
import CtaBand from '../components/ui/CtaBand'
import RelatedLinks from '../components/ui/RelatedLinks'
import { aeoFaq } from '../seo'
import { CALENDLY } from '../lib/constants'

const what = [
  { icon: 'solar:radar-bold-duotone', title: 'We measure what the engines say', body: 'We run your category and brand queries across ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews and record exactly how each one describes you.' },
  { icon: 'solar:bug-bold-duotone', title: 'We find what is wrong', body: 'Engines confuse you with competitors, invent details that were never real, or leave you out of the answer completely. We surface every miss.' },
  { icon: 'solar:wrench-bold-duotone', title: 'We fix the inputs', body: 'We fix the entity signals, structured data, and source content the engines read, so the answers about you start to change.' },
  { icon: 'solar:graph-new-up-bold-duotone', title: 'We re-measure at 30 days', body: 'A re-baseline at T+30 shows movement, with 95% confidence intervals. We report measured change, not article volume.' },
]

const method = [
  { k: 'Five engines, every time', v: 'ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews. Engines disagree with each other, so measuring one tells you almost nothing.' },
  { k: 'Many runs, not a screenshot', v: 'We run each prompt multiple times across separate sessions. A single screenshot is theater; repetition is evidence.' },
  { k: 'Confidence intervals on everything', v: 'Every cite rate comes with a Wilson 95% confidence interval, so we can say whether movement is real or sampling noise.' },
  { k: 'Published measurement conditions', v: 'Engine versions, region, session mode, and runs times prompts, disclosed on every result. No black box.' },
]

function AiSearchVisibility() {
  return (
    <>
      {/* Split hero: pitch left, live mention board right. */}
      <section className="relative w-full pt-[150px] md:pt-[180px] pb-16 lg:pb-20 px-6 lg:px-[6%] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <div className="absolute top-0 bottom-0 left-[6%] w-px bg-white/5"></div>
          <div className="absolute top-0 bottom-0 right-[6%] w-px bg-white/5"></div>
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[34%] right-[10%] w-[700px] h-[400px] bg-purple-900/[0.10] rounded-full blur-[140px]"></div>
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-400/20 bg-purple-400/[0.06] backdrop-blur-sm mb-8 animate-reveal">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-200/90">Service / AI Search Visibility</span>
            </div>
            <h1 className="leading-[1.04] animate-reveal delay-100 text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight mb-8">
              When buyers ask AI,
              <span className="text-white/30"> does your brand come up?</span>
            </h1>
            <p className="text-base lg:text-lg text-white/60 font-light leading-relaxed max-w-xl mb-9 animate-reveal delay-200">
              When someone asks ChatGPT or Gemini about your brand, you do not control what comes back. We find out what the engines actually say about you, fix what is wrong, and re-measure at 30 days so you can see it move.
            </p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider bg-white text-black py-4 px-6 rounded-sm transition-all duration-300 hover:shadow-[0_0_30px_-8px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 animate-reveal delay-300">
              <span>Get your visibility baseline</span>
              <iconify-icon icon="solar:arrow-right-linear" class="text-base group-hover:translate-x-1 transition-transform duration-300"></iconify-icon>
            </a>
          </div>
          <div className="lg:col-span-6 xl:col-span-5 animate-reveal delay-200">
            <MentionBars />
          </div>
        </div>
      </section>

      <Section title="How answer engine optimization works" lede="AEO is search engine optimization for the AI answer. The question is no longer just where you rank on Google, but whether the engine names you at all when a buyer asks." beamDelay={0}>
        <CardGrid items={what} variant="balanced" />
      </Section>

      {/* The method — the actual differentiator, spelled out. */}
      <Section title="The method is the differentiator" lede="Every AEO vendor runs roughly the same pipeline. Almost none of them publish their confidence intervals or their measurement conditions. We do." size="display" beamDelay={2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {method.map((m, i) => (
            <div key={m.k} className="card-surface rounded-sm p-6 lg:p-8 scroll-reveal" style={{ transitionDelay: `${(i % 2) * 90}ms` }}>
              <div className="relative z-10">
                <h3 className="text-base lg:text-lg font-medium text-white tracking-tight mb-2">{m.k}</h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">{m.v}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="What happens if you do nothing" beamDelay={1} glow>
        <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-3xl scroll-reveal">
          The engines keep answering with or without you. If they describe you wrong, or name a competitor instead, that happens silently and at scale, in conversations you never see. Buyers trust what the AI tells them. Every month you wait is a month of answers you did not shape. We have run this on our own brand and watched the number move, so we know it can.
        </p>
      </Section>

      <Section title="Frequently asked questions" beamDelay={3}>
        <FaqList items={aeoFaq} />
      </Section>

      <CtaBand
        heading="Want to see what AI says about your brand?"
        sub="We will run your baseline across five engines. A 30-minute call is enough to start."
        ctaLabel="Get your visibility baseline"
        ctaHref={CALENDLY}
      />

      <RelatedLinks
        title="Explore more"
        links={[
          { to: '/work', label: 'Our Work' },
          { to: '/services/ai-automations', label: 'AI Automations' },
          { to: '/about', label: 'About SignalWorks' },
        ]}
      />
    </>
  )
}

export default AiSearchVisibility
