import React from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../components/ui/Prose'
import CtaBand from '../components/ui/CtaBand'
import RelatedLinks from '../components/ui/RelatedLinks'
import BrandImage from '../components/ui/BrandImage'
import { CALENDLY } from '../lib/constants'
import laFreeway from '../assets/img/la-freeway-dusk.webp'

const verticals = [
  { industry: 'Independent production and post houses', problem: 'Turning footage, scripts, and contracts into searchable, structured assets a small team can actually find.' },
  { industry: 'DTC food, beverage, and apparel brands', problem: 'Keeping brand voice consistent across thousands of product descriptions and posts, and surfacing in AI search.' },
  { industry: 'Law firms and professional-services practices', problem: 'Document drafting, intake, and knowledge systems that respect confidentiality by design.' },
  { industry: 'Real estate teams and brokerages', problem: 'Listing research, lead routing, and follow-up that runs itself instead of eating an assistant’s week.' },
  { industry: 'Agencies and studios', problem: 'AI builds delivered to their own clients, behind their brand, by a team that ships production work.' },
]

const services = [
  { to: '/services/ai-automations', label: 'AI Automations' },
  { to: '/services/custom-ai-software', label: 'Custom AI Software' },
  { to: '/services/knowledge-systems', label: 'Knowledge Systems' },
  { to: '/services/ai-search-visibility', label: 'AI Search Visibility' },
  { to: '/services/ai-security-governance', label: 'AI Security & Governance' },
]

function AiAgencyLosAngeles() {
  return (
    <>
      {/* Hero: pitch left, locality block right. */}
      <section className="relative w-full pt-[150px] md:pt-[180px] pb-20 lg:pb-24 px-6 lg:px-[6%] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[30%] left-[16%] w-[800px] h-[420px] bg-purple-900/[0.10] rounded-full blur-[150px]"></div>
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-400/20 bg-purple-400/[0.06] backdrop-blur-sm mb-8 animate-reveal">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-200/90">AI Agency / Los Angeles</span>
            </div>
            <h1 className="leading-[1.04] animate-reveal reveal-delay-100 text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight mb-8">
              An AI agency in Los Angeles
              <span className="text-white/30"> that ships production work.</span>
            </h1>
            <p className="text-base lg:text-lg text-white/60 font-light leading-relaxed max-w-xl animate-reveal reveal-delay-200">
              SignalWorks is a senior-led custom-AI engineering studio based in Los Angeles. We build, deploy, and maintain AI automation and software for businesses across LA and the San Francisco Bay Area, and remotely anywhere.
            </p>
          </div>
          <div className="lg:col-span-5 animate-reveal reveal-delay-200">
            <div className="card-surface group rounded-sm">
              <BrandImage
                src={laFreeway}
                alt="The 110 freeway leading into the Downtown Los Angeles skyline at night"
                bordered={false}
                className="relative z-10 h-44 lg:h-52 border-b border-white/10"
                imgClassName="object-[center_38%]"
              />
              <div className="relative z-10 p-7 lg:p-8">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-5">Where we are</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <iconify-icon icon="solar:map-point-bold-duotone" class="text-purple-300 text-lg"></iconify-icon>
                    <span className="text-sm text-white/80">Los Angeles, California</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <iconify-icon icon="solar:map-point-bold-duotone" class="text-purple-300 text-lg"></iconify-icon>
                    <span className="text-sm text-white/80">San Francisco Bay Area</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <iconify-icon icon="solar:global-bold-duotone" class="text-purple-300 text-lg"></iconify-icon>
                    <span className="text-sm text-white/80">Clients anywhere</span>
                  </div>
                </div>
                <p className="mt-6 pt-5 border-t border-white/10 text-sm text-white/55 font-light leading-relaxed">
                  Senior-led from first call to final handoff. The people who scope your build are the ones who build it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real LA specificity: industries + the AI problems they bring. */}
      <Section title="Built for how LA actually works" lede="The work changes by industry. These are the businesses we build for, and the problems they bring us." size="display" beamDelay={0}>
        <div className="card-surface rounded-sm overflow-hidden scroll-reveal">
          <div className="relative z-10 divide-y divide-white/10">
            <div className="hidden md:grid grid-cols-[1fr_1.4fr] gap-8 px-6 lg:px-8 py-4 text-[10px] font-mono uppercase tracking-widest text-white/40">
              <span>Industry</span>
              <span>What they bring us</span>
            </div>
            {verticals.map((v) => (
              <div key={v.industry} className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-1.5 md:gap-8 px-6 lg:px-8 py-5 lg:py-6">
                <div className="text-sm lg:text-base font-medium text-white">{v.industry}</div>
                <div className="text-sm text-white/60 font-light leading-relaxed">{v.problem}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Services as a horizontal strip, not the homepage cards. */}
      <Section title="What we do" lede="Five service lines, all senior-built, all shipped in your infrastructure." beamDelay={2}>
        <div className="flex flex-wrap gap-3 scroll-reveal">
          {services.map((s) => (
            <Link key={s.to} to={s.to} className="card-surface group rounded-full px-5 py-3 flex items-center gap-2.5">
              <span className="relative z-10 text-sm text-white/75 group-hover:text-white transition-colors">{s.label}</span>
              <iconify-icon icon="solar:arrow-right-up-linear" class="relative z-10 text-sm text-white/30 group-hover:text-purple-300 transition-colors"></iconify-icon>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand heading="Looking for an AI partner in Los Angeles?" sub="A 30-minute call is enough to know if we are a fit. You leave with a roadmap either way." ctaHref={CALENDLY} />

      <RelatedLinks
        title="Explore more"
        links={[
          { to: '/work', label: 'Our Work' },
          { to: '/approach', label: 'Our Approach' },
          { to: '/about', label: 'About SignalWorks' },
        ]}
      />
    </>
  )
}

export default AiAgencyLosAngeles
