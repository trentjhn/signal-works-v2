import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { X, Menu, ChevronDown } from 'lucide-react'
import { CALENDLY } from '../lib/constants'

const services = [
  { to: '/services/ai-automations', label: 'AI Automations', desc: 'Workflows that run themselves' },
  { to: '/services/custom-ai-software', label: 'Custom AI Software', desc: 'Bespoke apps and agents' },
  { to: '/services/knowledge-systems', label: 'Knowledge Systems', desc: 'Internal AI search' },
  { to: '/services/ai-search-visibility', label: 'AI Search Visibility', desc: 'Answer engine optimization' },
  { to: '/services/ai-security-governance', label: 'AI Security & Governance', desc: 'Audits and compliance' },
  { to: '/services/ai-training', label: 'AI Training', desc: 'Hands-on team workshops' },
]

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesState, setServicesState] = useState('closed') // 'closed' | 'open' | 'closing'
  const servicesOpen = servicesState !== 'closed'          // keeps aria-expanded + solid nav logic working
  const [scrolled, setScrolled] = useState(false)
  const [menuPos, setMenuPos] = useState(null)
  const { pathname } = useLocation()
  const servicesRef = useRef(null)
  const btnRef = useRef(null)
  const panelRef = useRef(null)

  // Anchor the dropdown under the Services button. The panel is portaled to <body> to
  // escape the nav's stacking context (an absolute descendant of the fixed nav gets
  // painted under page content; a fixed element on body does not — same reason the mobile
  // overlay works). The button lives in the fixed navbar, so its position is stable on scroll.
  const openServices = () => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect()
      setMenuPos({ left: r.left + r.width / 2, top: r.bottom + 14 })
    }
    setServicesState('open')
  }

  // Pure updater — safe under StrictMode double-invocation AND under the stale closures
  // in the []-dep outside-click/Escape effect (no current-state read needed here).
  const closeServices = () => {
    setServicesState((s) => (s === 'open' ? 'closing' : s))
  }

  // The exit timer lives in an effect keyed on the state itself: entering 'closing'
  // schedules it, leaving 'closing' (reopen mid-close) cleans it up — no orphan timers.
  useEffect(() => {
    if (servicesState !== 'closing') return
    const t = setTimeout(() => {
      setServicesState((s) => (s === 'closing' ? 'closed' : s))
    }, 160)
    return () => clearTimeout(t)
  }, [servicesState])

  const toggleServices = () => (servicesState === 'open' ? closeServices() : openServices())

  // Detect scroll past hero threshold so navbar can transition transparent -> solid
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-close mobile menu if viewport grows past md breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close the desktop services dropdown on outside click (button or portaled panel) + Escape
  useEffect(() => {
    const onClick = (e) => {
      const inBtn = servicesRef.current && servicesRef.current.contains(e.target)
      const inPanel = panelRef.current && panelRef.current.contains(e.target)
      if (!inBtn && !inPanel) closeServices()
    }
    const onKey = (e) => {
      if (e.key === 'Escape') closeServices()
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])
  useEffect(() => {
    closeServices()
    setMobileMenuOpen(false)
  }, [pathname])

  const solid = scrolled || mobileMenuOpen || servicesOpen || pathname !== '/'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] w-full h-[100px] flex items-center justify-between px-6 lg:px-[6%] animate-reveal transition-[background-color,border-color,backdrop-filter] duration-300 ${
          solid
            ? 'border-b border-white/5 bg-[#0a051e]/80 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent backdrop-blur-0'
        }`}
      >
        <Link to="/" className="flex items-center gap-3 h-[60px] md:h-[100px]">
          <iconify-icon icon="solar:atom-bold-duotone" class="text-purple-400 text-2xl w-[24px] h-[24px]" style={{ width: '24px', height: '24px' }}></iconify-icon>
          <span className="text-lg font-semibold tracking-tight text-white">SignalWorks.</span>
        </Link>

        <div className="hidden md:flex uppercase text-sm font-medium text-white/60 gap-x-8 items-center">
          {/* Services dropdown (panel is portaled to <body>; see toggleServices) */}
          <div className="relative" ref={servicesRef}>
            <button
              ref={btnRef}
              onClick={toggleServices}
              className="flex items-center gap-1.5 uppercase hover:text-white transition-colors outline-none"
              aria-expanded={servicesState === 'open'}
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ease-swift ${servicesState === 'open' ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <Link to="/work" className="hover:text-white transition-colors">Work</Link>
          <Link to="/approach" className="hover:text-white transition-colors">Approach</Link>
          <Link to="/about" className="hover:text-white transition-colors">About</Link>
        </div>

        <div className="flex items-center gap-4">
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="group relative hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white text-black py-2.5 px-5 rounded-sm overflow-hidden transition-[transform,box-shadow] duration-300 active:duration-150 ease-swift hover:shadow-[0_0_24px_-6px_rgba(168,85,247,0.6)] hover:-translate-y-0.5 active:scale-[0.97]">
            <span className="absolute inset-0 bg-gradient-to-r from-purple-200 via-purple-100 to-purple-200 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-swift" aria-hidden="true"></span>
            <span className="relative">Book an intro call</span>
          </a>
          {/* Toggles (not just opens): the nav sits at z-[100] above the z-[60] overlay, so a
              close button inside the overlay is unreachable under the nav strip — this button
              is the one control that is always tappable, so it owns both states. */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden text-white/70 hover:text-white transition-colors outline-none"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {/* Crossfade + quarter-turn between the two icons instead of a hard swap */}
            <span className="relative block w-6 h-6" aria-hidden="true">
              <Menu className={`absolute inset-0 w-6 h-6 transition-[opacity,transform] duration-200 ease-swift motion-reduce:transition-none ${mobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`} />
              <X className={`absolute inset-0 w-6 h-6 transition-[opacity,transform] duration-200 ease-swift motion-reduce:transition-none ${mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`} />
            </span>
          </button>
        </div>
      </nav>

      {/* Desktop Services dropdown panel — portaled to <body> to sit above all page content */}
      {servicesOpen && menuPos && typeof document !== 'undefined' &&
        createPortal(
          <div style={{ position: 'fixed', left: menuPos.left, top: menuPos.top, transform: 'translateX(-50%)' }} className="z-[9999]">
            <div
              ref={panelRef}
              data-state={servicesState}
              className="dropdown-panel w-[320px] rounded-md border border-white/15 bg-[#140b35] shadow-2xl shadow-purple-950/60 ring-1 ring-black/40 p-2"
            >
              {services.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="group flex flex-col gap-0.5 rounded-sm px-4 py-3 hover:bg-white/[0.06] transition-[color,background-color,transform] duration-150 ease-swift active:scale-[0.98]"
                >
                  <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">{s.label}</span>
                  <span className="text-[11px] font-light text-white/40">{s.desc}</span>
                </Link>
              ))}
            </div>
          </div>,
          document.body
        )}

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[60] bg-[#0a051e]/95 backdrop-blur-xl flex flex-col pt-28 px-8 overflow-y-auto
          transition-[opacity,transform,visibility] ease-swift
          motion-reduce:transition-none motion-reduce:translate-y-0
          ${mobileMenuOpen ? 'visible opacity-100 translate-y-0 duration-300' : 'invisible opacity-0 -translate-y-3 duration-200'}`}
      >
          <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-4">Services</p>
          <nav className="flex flex-col gap-4 mb-8">
            {services.map((s, i) => (
              <Link
                key={s.to}
                to={s.to}
                className={`text-xl font-medium tracking-tight text-white/90 hover:text-purple-400 active:scale-[0.98] transition-[color,opacity,transform] duration-300 ease-swift motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                style={{ transitionDelay: mobileMenuOpen ? `${60 + i * 40}ms` : '0ms' }}
              >
                {s.label}
              </Link>
            ))}
          </nav>

          <div className="h-px bg-white/10 mb-8" />
          <nav className="flex flex-col gap-5 text-xl font-medium tracking-tight">
            {[
              { to: '/work', label: 'Work' },
              { to: '/approach', label: 'Approach' },
              { to: '/about', label: 'About' },
            ].map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                className={`hover:text-purple-400 active:scale-[0.98] transition-[color,opacity,transform] duration-300 ease-swift motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                style={{ transitionDelay: mobileMenuOpen ? `${60 + (services.length + i) * 40}ms` : '0ms' }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto py-12">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider bg-white text-black py-4 rounded-sm hover:bg-purple-50 transition-[color,background-color,transform] duration-150 ease-swift active:scale-[0.97]">
              Book an intro call
            </a>
          </div>
        </div>
    </>
  )
}

export default Navbar
