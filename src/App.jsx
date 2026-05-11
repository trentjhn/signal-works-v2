import React from 'react'
import Navbar from './components/Navbar'
import UnicornBackground from './components/UnicornBackground'
import GlobalGrid from './components/GlobalGrid'
import Hero from './components/Hero'
import Features from './components/Features'
import Validation from './components/Validation'
import TestimonialsMarquee from './components/TestimonialsMarquee'
import FaqSection from './components/FaqSection'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <UnicornBackground />
      <GlobalGrid />
      
      <div className="relative z-10 flex flex-col w-full h-full">
        <Navbar />
        <main className="w-full">
          {/* 1. Hero with marquee */}
          <Hero />
          {/* 2. Services bento */}
          <Features />
          {/* 3. What every engagement includes (CTA hidden — it lives at the bottom) */}
          <Validation showCta={false} />
          {/* 4. Who you work with */}
          <TestimonialsMarquee />
          {/* 5. What we believe (floating wall) */}
          <FaqSection />
          {/* 6. Final CTA */}
          <FinalCta />
        </main>
        {/* 7. Footer */}
        <Footer />
      </div>
    </>
  )
}

export default App