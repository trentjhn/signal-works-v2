import React from 'react'
import FlashlightCard from './ui/FlashlightCard'
import BrandImage from './ui/BrandImage'
import laSkyline from '../assets/img/la-skyline-night.webp'
import sfFog from '../assets/img/sf-fog-night.webp'

const founders = [
  {
    initials: 'TJ',
    photo: '/trent.jpg',
    name: 'Trenton Johnson',
    role: 'Co-founder',
    bio: "Former Product Manager at PayPal. Yale Computer Science. Left PayPal to build AI systems that run in production. That is still the bar. Systems a business can depend on from day one, built for real use, real data, and real teams."
  },
  {
    initials: 'JH',
    photo: '/jahleel.jpg',
    name: 'Jahleel Heath',
    role: 'Co-founder',
    bio: 'Built and led product strategy for an enterprise K-12 SaaS platform, from architecture to launch. Background in NIL marketing, brand activation, and nonprofit operations. Finds where AI creates real value inside a business, then builds the systems that make it land.'
  }
]

const TestimonialsMarquee = () => {
  return (
    <section id="about" className="relative w-full py-24 lg:py-40 overflow-hidden z-20 border-t border-white/5">
      {/* Ambient backdrop */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute left-[6%] right-[6%] top-0 bottom-0 border-l border-r border-white/5 hidden lg:block"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 px-6 lg:px-[6%] max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8 scroll-reveal">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">The team</span>
          </div>
          <h2 className="leading-[1.0] scroll-reveal reveal-delay-100 lg:text-7xl text-4xl font-medium text-white tracking-tighter">
            Who you work
            <span className="text-white/30"> with.</span>
          </h2>
        </div>

        {/* Founder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12 items-stretch">
          {founders.map((f, idx) => (
            <FlashlightCard
              key={idx}
              className="hover:bg-white/[0.04] border border-white/5 hover:border-white/10 rounded-sm backdrop-blur-lg p-8 lg:p-10 relative overflow-hidden flex flex-col scroll-reveal h-full"
              style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
            >
              <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)', zIndex: 0 }}></div>
              <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.4), transparent 40%)', zIndex: 0, WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1px' }}></div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Headshot */}
                <div className="w-[200px] h-[200px] rounded-sm border border-white/10 relative overflow-hidden mb-8">
                  {f.photo ? (
                    <img
                      src={f.photo}
                      alt={f.name}
                      className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-[filter] duration-300 ease-swift"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-white/[0.02]"></div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.08),transparent_60%)]"></div>
                      <span className="relative text-5xl font-medium text-white/40 tracking-tight flex items-center justify-center w-full h-full">{f.initials}</span>
                    </>
                  )}
                  {/* Subtle dark overlay so border + grayscale-to-color hover transition reads */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                </div>

                {/* Role label */}
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">{f.role}</span>

                {/* Name */}
                <h3 className="text-2xl lg:text-3xl font-medium text-white tracking-tight mb-5">{f.name}</h3>

                {/* Bio */}
                <p className="text-sm lg:text-base text-white/60 font-light leading-[1.7] max-w-[65ch]">
                  {f.bio}
                </p>
              </div>
            </FlashlightCard>
          ))}
        </div>

        {/* Where the founders work from — same treatment as the About diptych. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mb-12">
          <BrandImage
            src={laSkyline}
            alt="The Los Angeles skyline and city lights at night"
            label="Los Angeles"
            className="h-36 lg:h-44 scroll-reveal"
          />
          <BrandImage
            src={sfFog}
            alt="The San Francisco skyline rising above the fog at night"
            label="San Francisco Bay Area"
            className="h-36 lg:h-44 scroll-reveal reveal-delay-100"
            imgClassName="brightness-[0.68]"
          />
        </div>

        {/* Single closing line */}
        <p className="text-base lg:text-lg text-white/50 font-light text-center max-w-3xl mx-auto scroll-reveal reveal-delay-500">
          The senior people on the sales call are the ones building your system.
        </p>
      </div>
    </section>
  )
}

export default TestimonialsMarquee