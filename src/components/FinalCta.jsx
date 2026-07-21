import React from 'react'
import silkDark from '../assets/img/silk-dark.webp'

const FinalCta = () => {
  return (
    <section className="relative w-full pt-24 pb-32 lg:pt-32 lg:pb-40 z-20 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-purple-900/[0.08] rounded-full blur-[140px]"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-[6%] relative z-10">
        <div
          id="book"
          className="hover:bg-white/[0.04] rounded-sm p-8 lg:px-12 lg:py-14 flex flex-col items-center justify-center gap-6 relative overflow-hidden group border border-white/5 hover:border-white/10 backdrop-blur-lg transition-colors duration-400 ease-swift"
        >
          {/* Silk texture, barely-there: matches the CtaBand panels on the inner pages. */}
          <img src={silkDark} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-[0.22] grayscale pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,33,128,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:0_0,0_0] transition-[background-position] duration-150 group-hover:duration-[600ms] ease-swift group-hover:bg-[position:100%_100%,0_0]"></div>

          <div className="relative z-10 text-center max-w-2xl">
            <h3 className="text-3xl lg:text-5xl font-medium text-white tracking-tighter mb-3">Ready to scope your engagement?</h3>
            <p className="text-white/50 text-base lg:text-lg font-light">A 30-minute call is enough to know if we are a fit.</p>
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
      </div>
    </section>
  )
}

export default FinalCta