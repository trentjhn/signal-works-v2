import React, { useEffect, useRef, useState } from 'react'

// Mention-rate board with confidence-interval bands. The bar grows from 0 when scrolled
// into view and a lighter band shows the 95% CI range, making the methodological
// differentiator visible. Illustrative numbers, labelled as such.
const data = [
  { name: 'ChatGPT', pct: 82, lo: 75, hi: 88 },
  { name: 'Perplexity', pct: 68, lo: 60, hi: 75 },
  { name: 'Google AI Overviews', pct: 73, lo: 66, hi: 79 },
  { name: 'Claude', pct: 57, lo: 49, hi: 64 },
  { name: 'Gemini', pct: 41, lo: 33, hi: 49 },
]

function MentionBars() {
  const ref = useRef(null)
  const [grown, setGrown] = useState(false)

  // Same in-view one-shot pattern as CountUp.jsx
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGrown(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="card-surface rounded-sm p-6 lg:p-8 scroll-reveal">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Mention rate / category queries</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300/70">Illustrative · 95% CI</span>
        </div>
        <div className="space-y-4">
          {data.map((e, i) => (
            <div key={e.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-white/70 font-light">{e.name}</span>
                <span className="text-xs font-mono text-white/45 tabular-nums">{e.pct}% <span className="text-white/30">± {Math.round((e.hi - e.lo) / 2)}</span></span>
              </div>
              <div className="relative h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="absolute top-0 bottom-0 bg-purple-300/15" style={{ left: `${e.lo}%`, width: `${e.hi - e.lo}%` }}></div>
                <div
                  className={`bar-grow absolute top-0 bottom-0 left-0 bg-gradient-to-r from-purple-500/70 to-purple-400 rounded-full ${grown ? 'is-grown' : ''}`}
                  style={{ width: `${e.pct}%`, animationDelay: `${i * 110}ms` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 pt-5 border-t border-white/5 text-xs text-white/40 font-light leading-relaxed">
          58% of shoppers now use AI tools to research products. If you are not cited, you are not considered.
        </p>
        <p className="mt-2 text-[10px] font-mono uppercase tracking-widest text-white/25">ChannelEngine, 2025</p>
      </div>
    </div>
  )
}

export default MentionBars
