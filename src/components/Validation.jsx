import React from 'react'
import FlashlightCard from './ui/FlashlightCard'

const deliverables = [
  {
    tag: 'Deliverable',
    icon: 'solar:monitor-bold-duotone',
    title: 'A working dashboard you actually use',
    body: 'No command-line handoffs. Every build ships with a web interface a non-technical user can operate.'
  },
  {
    tag: 'Deliverable',
    icon: 'solar:server-square-bold-duotone',
    title: 'Code in your infrastructure',
    body: 'Your AWS, GCP, or Azure account. Infrastructure-as-code with Terraform or docker-compose. You can redeploy, modify, or decommission without us.'
  },
  {
    tag: 'Deliverable',
    icon: 'solar:notebook-bookmark-bold-duotone',
    title: 'Walkthrough video, runbook, and live training',
    body: '5 to 10 minute Loom walkthrough, one-page runbook covering operation and troubleshooting, plus a 60 to 90 minute live training session for the team using the system.'
  },
  {
    tag: 'Deliverable',
    icon: 'solar:shield-check-bold-duotone',
    title: '30 days of post-handoff support',
    body: 'We stay on call for 30 days after handoff to fix anything that breaks and answer team questions. After that, you can stay on with a retainer or take it from here. Either way, you keep everything.'
  }
]

const Validation = ({ showCta = true }) => {
  return (
    <section className="overflow-hidden lg:py-32 text-white w-full z-20 pt-24 pb-24 relative">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block">
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/5 left-[6%]"></div>
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/5 left-[28%]">
          <div className="absolute w-[1px] h-[200px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent beam-v" style={{ animation: 'beam-v 7s infinite' }}></div>
        </div>
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/5 left-[62%]">
          <div className="absolute w-[1px] h-[200px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent beam-v" style={{ animation: 'beam-v 5s infinite 2s' }}></div>
        </div>
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/5 right-[6%]"></div>
        <div className="absolute left-0 right-0 h-[1px] bg-white/5 top-0"></div>
        <div className="absolute left-0 right-0 h-[1px] bg-white/5 bottom-0"></div>
      </div>

      <div className="lg:px-[6%] z-10 max-w-[1600px] mr-auto ml-auto pr-6 pl-6 relative">

        {/* Section Header */}
        <div className="max-w-4xl mb-16 lg:mb-20">
          <h2 className="leading-[0.95] lg:text-7xl text-4xl font-medium text-white tracking-tighter scroll-reveal">
            What every engagement
            <span className="text-white/30"> includes.</span>
          </h2>
        </div>

        {/* 4-Card Deliverable Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {deliverables.map((d, idx) => (
            <FlashlightCard
              key={idx}
              className={`hover:bg-white/[0.04] border border-white/5 hover:border-white/10 rounded-sm backdrop-blur-lg p-8 lg:p-10 relative overflow-hidden flex flex-col min-h-[320px] scroll-reveal`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)', zIndex: 0 }}></div>
              <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.4), transparent 40%)', zIndex: 0, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1px' }}></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <iconify-icon icon={d.icon} class="text-purple-400 text-xl"></iconify-icon>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">{d.tag}</span>
                </div>
                <h3 className="text-xl font-medium text-white tracking-tight mb-4 leading-tight">{d.title}</h3>
                <p className="text-sm font-light leading-relaxed text-white/60">{d.body}</p>
              </div>
            </FlashlightCard>
          ))}
        </div>

        {/* Security Methodology Ribbon */}
        <div className="border border-white/5 rounded-sm bg-white/[0.02] backdrop-blur-sm px-6 py-4 flex items-center justify-center gap-3 mb-16">
          <iconify-icon icon="solar:shield-keyhole-linear" class="text-white/30 text-base"></iconify-icon>
          <p className="text-xs lg:text-sm font-light text-white/50 text-center tracking-wide">
            Every build is shipped with security-first methodology grounded in NIST AI RMF and the OWASP LLM Top 10.
          </p>
        </div>

        {/* Bottom Banner CTA — render only when requested */}
        {showCta && (
          <div id="book" className="hover:bg-white/[0.04] rounded-sm p-8 lg:px-12 lg:py-10 flex flex-col items-center justify-center gap-6 relative overflow-hidden group border border-white/5 hover:border-white/10 backdrop-blur-lg transition-colors duration-400 ease-swift">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,33,128,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:0_0,0_0] transition-[background-position] duration-150 group-hover:duration-[600ms] ease-swift group-hover:bg-[position:100%_100%,0_0]"></div>

            <div className="relative z-10 text-center max-w-2xl">
              <h3 className="text-3xl lg:text-4xl font-medium text-white tracking-tight mb-2">Ready to scope your engagement?</h3>
              <p className="text-white/50 text-base font-light">A 30-minute call is enough to know if we are a fit.</p>
            </div>

            <a href="https://calendly.com/hello-signalworks" target="_blank" rel="noopener noreferrer" className="relative z-10 bg-white text-black pl-8 pr-6 py-4 rounded-sm font-semibold text-xs uppercase tracking-widest hover:bg-purple-50 transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-swift active:scale-[0.97] flex items-center gap-4 group/btn">
              Book an intro call
              <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                <iconify-icon icon="solar:arrow-right-bold-duotone" class="text-sm"></iconify-icon>
              </div>
            </a>

            <p className="relative z-10 text-sm text-white/50 font-light">
              Or send us a note at{' '}
              <a href="mailto:hello@signalworks.live" className="text-white/80 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/70 transition-colors">
                hello@signalworks.live
              </a>
            </p>
          </div>
        )}

      </div>
    </section>
  )
}

export default Validation