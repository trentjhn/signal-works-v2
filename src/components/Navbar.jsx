import React, { useState, useEffect } from 'react'
import { X, Menu } from 'lucide-react'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Auto-close mobile menu if viewport grows past md breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <nav className="relative z-50 w-full h-[100px] flex items-center justify-between px-6 lg:px-[6%] border-b border-white/5 bg-[#0a051e]/80 backdrop-blur-md animate-reveal sticky top-0">
        <a href="/" className="flex items-center gap-3 h-[60px] md:h-[100px]">
          <iconify-icon icon="solar:atom-bold-duotone" class="text-purple-400 text-2xl w-[24px] h-[24px]" style={{ width: '24px', height: '24px' }}></iconify-icon>
          <span className="text-lg font-semibold tracking-tight text-white">SignalWorks.</span>
        </a>

        <div className="hidden md:flex uppercase text-sm font-medium text-white/60 gap-x-8 items-center">
          <a href="#process" className="hover:text-white transition-colors">Process</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#book" className="hover:text-white transition-colors">Book</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="#book" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white text-black py-2.5 px-5 rounded-sm hover:bg-purple-50 transition-colors">
            Book an intro call
          </a>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-white/70 hover:text-white transition-colors outline-none"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay — only mounted on small screens when open */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-[#0a051e]/95 backdrop-blur-xl flex flex-col pt-32 px-8 animate-reveal">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-8 right-6 text-white/70 hover:text-white outline-none"
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>
          <nav className="flex flex-col gap-8 text-2xl font-medium tracking-tight">
            <a href="#process" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors border-b border-white/10 pb-4">Process</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors border-b border-white/10 pb-4">About</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors border-b border-white/10 pb-4">Services</a>
            <a href="#book" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors border-b border-white/10 pb-4">Book</a>
          </nav>
          <div className="mt-auto mb-12">
            <a href="#book" onClick={() => setMobileMenuOpen(false)} className="flex w-full items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider bg-white text-black py-4 rounded-sm hover:bg-purple-50 transition-colors">
              Book an intro call
            </a>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar