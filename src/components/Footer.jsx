import React from 'react'
import { Link } from 'react-router-dom'

const serviceLinks = [
  { to: '/services/ai-automations', label: 'AI Automations' },
  { to: '/services/custom-ai-software', label: 'Custom AI Software' },
  { to: '/services/knowledge-systems', label: 'Knowledge Systems' },
  { to: '/services/ai-search-visibility', label: 'AI Search Visibility' },
  { to: '/services/ai-security-governance', label: 'AI Security and Governance' },
]

const Footer = () => {
  return (
    <footer className="relative w-full border-t border-white/5 bg-[#0a051e] z-20 pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-[6%]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-20">

          {/* LEFT: Brand + tagline */}
          <div>
            <div className="flex items-center gap-2 text-white mb-5">
              <iconify-icon icon="solar:atom-bold-duotone" class="text-purple-400 text-2xl w-[24px] h-[24px]"></iconify-icon>
              <span className="font-semibold tracking-tight">SignalWorks.</span>
            </div>
            <p className="text-sm text-white/50 font-light leading-relaxed max-w-xs">
              AI engineering by the project, by the month, or behind your brand.
            </p>
          </div>

          {/* MIDDLE: Services */}
          <div>
            <h4 className="text-xs font-mono text-white/40 uppercase mb-6 tracking-widest">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s.to}>
                  <Link to={s.to} className="text-sm text-white/70 hover:text-white transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Contact */}
          <div>
            <h4 className="text-xs font-mono text-white/40 uppercase mb-6 tracking-widest">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@signalworks.live" className="text-sm text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 underline underline-offset-4 decoration-white/30 hover:decoration-white/70">
                  <iconify-icon icon="solar:letter-linear" class="text-base text-white/40"></iconify-icon>
                  hello@signalworks.live
                </a>
              </li>
              <li>
                <a href="https://signalworks.live" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors inline-flex items-center gap-2">
                  <iconify-icon icon="solar:global-linear" class="text-base text-white/40"></iconify-icon>
                  signalworks.live
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-xs text-white/30">© 2026 SignalWorks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer