import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import UnicornBackground from './components/UnicornBackground'
import GlobalGrid from './components/GlobalGrid'
import Hero from './components/Hero'
import Features from './components/Features'
import AeoFeature from './components/AeoFeature'
import Validation from './components/Validation'
import TestimonialsMarquee from './components/TestimonialsMarquee'
import FaqSection from './components/FaqSection'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import SectionDivider from './components/ui/SectionDivider'
import AeoCallout from './components/AeoCallout'

// Global scroll-reveal observer: watches every .scroll-reveal element on the page
// and adds .is-visible when it enters the viewport. Each element fires its CSS
// transition exactly once. Lets us put scroll-triggered animations on any element
// without re-implementing the IntersectionObserver per-component.
function useGlobalScrollReveal() {
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
  }, [])
}

function App() {
  useGlobalScrollReveal()

  return (
    <>
      <UnicornBackground />
      <GlobalGrid />
      
      <div className="relative z-10 flex flex-col w-full h-full">
        <Navbar />
        <main className="w-full">
          {/* 1. Hero with marquee */}
          <Hero />
          <SectionDivider duration={9} />
          {/* 1.5 AEO interlude — strongest line from the old site, breakout treatment */}
          <AeoCallout />
          <SectionDivider delay={1.5} duration={10} />
          {/* 2. Featured offering: AI Search Visibility — Services nav target */}
          <div id="services" className="scroll-mt-[100px]">
            <AeoFeature />
          </div>
          <SectionDivider delay={0.5} duration={10} />
          {/* 2.5 Bento menu — everything else (AEO card swapped for Knowledge Systems) */}
          <Features />
          <SectionDivider delay={2} duration={11} />
          {/* Bento carries the full menu; AEO is featured separately above. */}
          {/* 3. What every engagement includes — Process nav target */}
          <div id="process" className="scroll-mt-[100px]">
            <Validation showCta={false} />
          </div>
          <SectionDivider delay={1} duration={10} />
          {/* 4. Who you work with — About nav target (TestimonialsMarquee section already has id="about" but we wrap defensively) */}
          <TestimonialsMarquee />
          <SectionDivider delay={3} duration={12} />
          {/* 5. What we believe (floating wall) */}
          <FaqSection />
          <SectionDivider delay={1.5} duration={9} />
          {/* 6. Final CTA — Book nav target */}
          <div id="book" className="scroll-mt-[100px]">
            <FinalCta />
          </div>
        </main>
        {/* 7. Footer */}
        <Footer />
      </div>
    </>
  )
}

export default App