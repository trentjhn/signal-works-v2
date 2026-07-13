import React from 'react'
import FlashlightCard from '../components/ui/FlashlightCard'
import { Section } from '../components/ui/Prose'
import CtaBand from '../components/ui/CtaBand'
import RelatedLinks from '../components/ui/RelatedLinks'

const founders = [
  {
    photo: '/trent.jpg',
    name: 'Trenton Johnson',
    role: 'Co-founder, Engineering',
    bio: 'Former Product Manager at PayPal and a Yale computer science graduate. Left to build AI systems that run in production, not ones that only demo well. That is still the bar: systems a business can depend on from day one, built for real use, real data, and real teams.',
  },
  {
    photo: '/jahleel.jpg',
    name: 'Jahleel Heath',
    role: 'Co-founder, Product',
    bio: 'Built and led product strategy for an enterprise K-12 SaaS platform, from architecture to launch. Background in NIL marketing, brand activation, and nonprofit operations. Finds where AI creates real value inside a business, then makes sure the systems actually get used.',
  },
]

const steps = [
  { n: '01', title: 'A short discovery questionnaire', body: 'Ten minutes, sent before we talk, so the first call is about your business and not your tech stack.' },
  { n: '02', title: 'A free opportunity audit', body: 'A 45 to 60 minute call where we map where AI would actually save you time or money. You leave with a written roadmap whether you hire us or not. No follow-up pitch.' },
  { n: '03', title: 'A scoped build', body: 'We build the thing, ship it in your own infrastructure, and hand it over with a walkthrough, a runbook, a training session, and 30 days of support. Two to six weeks for most builds.' },
  { n: '04', title: 'An ongoing AI department, if you want one', body: 'Most clients keep us on by the month after the first build. The code lives in your repository either way. The work is yours.' },
]

const notFit = [
  'You want the cheapest option. We are not the budget choice, and a client who picks on price alone was never the right fit for us.',
  'You need a media buyer or an ad agency. We build the AI engineering layer that those teams cannot deliver alone. We do not run paid campaigns.',
  'You want a demo that wows in the room. We optimize for what holds in production, which is a different and less flashy thing.',
  'You need a vendor you never speak to again. We hand off and train, and most of our work is with clients we stay close to.',
]

function About() {
  return (
    <>
      {/* Distinct hero: centered editorial pull-quote, no eyebrow pill, no CTA button. */}
      <section className="relative w-full pt-[150px] md:pt-[190px] pb-20 lg:pb-28 px-6 lg:px-[6%] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[24%] left-1/2 -translate-x-1/2 w-[1000px] h-[440px] bg-purple-900/[0.10] rounded-full blur-[150px]"></div>
        </div>
        <div className="relative z-10 max-w-[1000px] mx-auto text-center">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-200/70 mb-8 animate-reveal">About SignalWorks</p>
          <h1 className="leading-[1.06] text-3xl md:text-5xl lg:text-[3.5rem] font-medium text-white tracking-tight animate-reveal reveal-delay-100">
            We left bigger companies to build the
            <span className="text-white/30"> AI department we wished existed.</span>
          </h1>
          <p className="mt-10 text-base lg:text-lg text-white/60 font-light leading-relaxed max-w-2xl mx-auto animate-reveal reveal-delay-200">
            SignalWorks is a senior-led AI engineering studio in Los Angeles and the San Francisco Bay Area. We build, deploy, and maintain custom AI systems for small businesses, founder-led brands, and agencies. The people who scope your build are the ones who build it.
          </p>
        </div>
      </section>

      {/* Founder magazine cards: photo fills its own column (fixes centering), text reads alongside. */}
      <Section title="Who you work with" lede="Senior-built is not a tagline. It is the operating model: the founders scope, build, and ship the work themselves." beamDelay={0}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {founders.map((f) => (
            <FlashlightCard key={f.name} className="card-surface rounded-sm overflow-hidden flex flex-col sm:flex-row scroll-reveal">
              <div className="sm:w-[40%] lg:w-[260px] shrink-0 bg-[#0a051e] relative z-10">
                <img src={f.photo} alt={f.name} className="w-full h-full object-cover object-center min-h-[260px] sm:min-h-[340px]" loading="lazy" />
              </div>
              <div className="relative z-10 p-7 lg:p-9 flex flex-col justify-center">
                <h3 className="text-xl font-medium text-white tracking-tight">{f.name}</h3>
                <p className="text-xs font-mono uppercase tracking-widest text-purple-300/70 mt-1 mb-4">{f.role}</p>
                <p className="text-sm text-white/60 font-light leading-relaxed">{f.bio}</p>
              </div>
            </FlashlightCard>
          ))}
        </div>
      </Section>

      {/* Net-new: what working together actually looks like (not on the homepage). */}
      <Section title="How working together starts" lede="No long sales cycle. The first real value shows up on the first call." beamDelay={1.5}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {steps.map((s) => (
            <div key={s.n} className="card-surface rounded-sm p-7 lg:p-8 scroll-reveal">
              <div className="relative z-10">
                <span className="text-3xl font-mono text-purple-300/40 tabular-nums">{s.n}</span>
                <h3 className="text-lg font-medium text-white tracking-tight mt-3 mb-2">{s.title}</h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Net-new: anti-persona. Honesty about who we are not for reads as credibility. */}
      <Section title="When we are not the right fit" lede="The fastest way to trust a team is to hear who they turn away." beamDelay={3}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {notFit.map((t) => (
            <div key={t} className="flex items-start gap-4 scroll-reveal">
              <iconify-icon icon="solar:close-circle-linear" class="text-white/30 text-xl shrink-0 mt-0.5"></iconify-icon>
              <span className="text-sm lg:text-[15px] text-white/65 font-light leading-relaxed">{t}</span>
            </div>
          ))}
        </div>
        <p className="text-sm lg:text-base text-white/50 font-light leading-relaxed max-w-2xl mt-10 scroll-reveal">
          If you are not sure whether your problem fits, reach out anyway. The worst outcome is a 30-minute call that is not a match, and you still leave with a roadmap.
        </p>
      </Section>

      {/* Concise facts (kept short; the depth lives on /approach). */}
      <Section title="The basics" beamDelay={0.5}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { k: 'Founded', v: '2025' },
            { k: 'Based in', v: 'Los Angeles and the San Francisco Bay Area.' },
            { k: 'Built to', v: 'NIST AI RMF, OWASP LLM Top 10, ABA Rule 1.6, AICPA SSTS 1.4' },
          ].map((b) => (
            <div key={b.k} className="card-surface rounded-sm p-6 scroll-reveal">
              <div className="relative z-10">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">{b.k}</p>
                <p className="text-sm text-white/75 font-light leading-relaxed">{b.v}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand heading="Want to talk through what we could build?" sub="A 30-minute call is enough to know if we are a fit. You leave with a roadmap either way." />

      <RelatedLinks
        title="Keep exploring"
        links={[
          { to: '/approach', label: 'Our Approach' },
          { to: '/work', label: 'Our Work' },
          { to: '/services/ai-automations', label: 'What we build' },
        ]}
      />
    </>
  )
}

export default About
