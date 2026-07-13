import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import UnicornBackground from './UnicornBackground'
import GlobalGrid from './GlobalGrid'
import Footer from './Footer'

// Global scroll-reveal observer: watches every .scroll-reveal element on the page
// and adds .is-visible when it enters the viewport. Each element fires its CSS
// transition exactly once. Re-runs on every route change (keyed on pathname) so
// content mounted via <Outlet/> after a client navigation gets observed too.
function useGlobalScrollReveal(pathname) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    )

    const elements = document.querySelectorAll('.scroll-reveal:not(.is-visible)')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [pathname])
}

// Reset scroll to top on client-side navigation (the browser only does this on full loads).
function useScrollToTop(pathname) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
}

// Shared chrome around every route. Background + navbar + footer stay mounted across
// client navigation; only the <Outlet/> body swaps. The wrapper divs/classes match the
// original single-page App exactly so the homepage DOM is unchanged.
function Layout() {
  const { pathname } = useLocation()
  useGlobalScrollReveal(pathname)
  useScrollToTop(pathname)

  return (
    <>
      <UnicornBackground />
      <GlobalGrid />

      <div className="relative z-10 flex flex-col w-full h-full">
        <Navbar />
        <main key={pathname} className="w-full route-fade">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
