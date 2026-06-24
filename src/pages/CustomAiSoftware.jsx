import React from 'react'
import { Section, BulletList } from '../components/ui/Prose'
import Accordion from '../components/ui/Accordion'
import SystemDiagram from '../components/ui/SystemDiagram'
import CtaBand from '../components/ui/CtaBand'
import RelatedLinks from '../components/ui/RelatedLinks'
import { CALENDLY } from '../lib/constants'

const build = [
  { title: 'Bespoke web applications', body: 'Custom apps built around your specific workflow, not bent to fit an off-the-shelf tool that almost works. Your interface, your logic, your data model.' },
  { title: 'Multi-source monitoring dashboards', body: 'Systems that pull from every source you care about and surface what changed, with the full picture in one place instead of ten tabs.' },
  { title: 'Governance and intelligence trackers', body: 'Decisions, approvals, competitors, and signals tracked automatically and summarized into the one view your team actually reads.' },
  { title: 'Custom agentic systems', body: 'Agents with real backend integration that take multi-step actions against your systems, safely, observably, and with a human in the loop where it matters.' },
]

const rightCall = [
  'Off-the-shelf tools keep almost working, then failing in the one place that matters to you.',
  'You need to integrate with an internal system that has no clean API or no integration at all.',
  'You have tried two or three no-code tools and hit their ceiling.',
  'The workflow is specific enough that a generic product would mean changing how you work to fit the software.',
]

function CustomAiSoftware() {
  return (
    <>
      {/* Split hero: pitch left, system diagram right (the recurring motif). */}
      <section className="relative w-full pt-[150px] md:pt-[180px] pb-20 lg:pb-24 px-6 lg:px-[6%] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <div className="absolute top-0 bottom-0 left-[6%] w-px bg-white/5"></div>
          <div className="absolute top-0 bottom-0 right-[6%] w-px bg-white/5"></div>
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[30%] right-[12%] w-[800px] h-[420px] bg-purple-900/[0.10] rounded-full blur-[150px]"></div>
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 xl:col-span-7">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-200/80 mb-7 animate-reveal">&gt; services / custom-ai-software</p>
            <h1 className="leading-[1.04] animate-reveal delay-100 text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight mb-8">
              Custom AI software
              <span className="text-white/30"> for the workflow you actually have.</span>
            </h1>
            <p className="text-base lg:text-lg text-white/60 font-light leading-relaxed max-w-xl mb-9 animate-reveal delay-200">
              When the tool you need does not exist off the shelf, we build it. Intelligence systems, custom agents with backend integration, and bespoke web apps, shipped to production in your own infrastructure.
            </p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider bg-white text-black py-4 px-6 rounded-sm transition-all duration-300 hover:shadow-[0_0_30px_-8px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 animate-reveal delay-300">
              <span>Book an intro call</span>
              <iconify-icon icon="solar:arrow-right-linear" class="text-base group-hover:translate-x-1 transition-transform duration-300"></iconify-icon>
            </a>
          </div>
          <div className="lg:col-span-6 xl:col-span-5 animate-reveal delay-200">
            <SystemDiagram />
          </div>
        </div>
      </section>

      <Section title="What we build" lede="Custom AI engineering for businesses that need it built right, not demoed well. Every build ships in your infrastructure with documentation and team training." beamDelay={0}>
        <Accordion items={build} />
      </Section>

      <Section title="When a custom build is the right call" lede="A custom build is not always the answer. If a smaller automation or an off-the-shelf tool would serve you better, we will say so. It is the right call when:" beamDelay={2}>
        <BulletList items={rightCall} />
      </Section>

      <Section title="Built for production, owned by you" beamDelay={1} glow>
        <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-3xl scroll-reveal">
          The bar is a system you can depend on from day one, built for real use, real data, and real teams. Code lives in your repository and deploys to your infrastructure, so you can modify, redeploy, or decommission without us. The people who scope your build are the ones who build and ship it.
        </p>
      </Section>

      <CtaBand heading="Need something built that does not exist yet?" sub="Bring the problem. A 30-minute call is enough to know if we are a fit." />

      <RelatedLinks
        title="Explore more"
        links={[
          { to: '/services/ai-automations', label: 'AI Automations' },
          { to: '/services/knowledge-systems', label: 'Knowledge Systems' },
          { to: '/approach', label: 'Our Approach' },
        ]}
      />
    </>
  )
}

export default CustomAiSoftware
