import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import AeoFeature from '../components/AeoFeature'
import Validation from '../components/Validation'
import TestimonialsMarquee from '../components/TestimonialsMarquee'
import ClientReview from '../components/ClientReview'
import FaqSection from '../components/FaqSection'
import FinalCta from '../components/FinalCta'
import SectionDivider from '../components/ui/SectionDivider'
import AeoCallout from '../components/AeoCallout'

// The homepage. Extracted verbatim from the original single-page App so its rendered
// output (and prerendered HTML) is unchanged. Layout supplies the background, navbar,
// <main> wrapper, and footer around this.
function Home() {
  return (
    <>
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
      {/* 5.5 Verified client review — proof right before the ask */}
      <ClientReview />
      <SectionDivider delay={0.5} duration={10} />
      {/* 6. Final CTA — Book nav target */}
      <div id="book" className="scroll-mt-[100px]">
        <FinalCta />
      </div>
    </>
  )
}

export default Home
