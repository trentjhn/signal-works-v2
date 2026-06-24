import React from 'react'

// A risk-assessment table that reads as a professional deliverable preview, not a card grid.
// Responsive: a real 3-column table on md+, stacked labelled rows on mobile.
function RiskTable({ rows }) {
  return (
    <div className="card-surface rounded-sm overflow-hidden scroll-reveal">
      <div className="relative z-10 divide-y divide-white/10">
        <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr] gap-6 px-6 lg:px-8 py-4 text-[10px] font-mono uppercase tracking-widest text-white/40">
          <span>What we assess</span>
          <span>What we look for</span>
          <span>Held to</span>
        </div>
        {rows.map((r) => (
          <div key={r.assess} className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] gap-1.5 md:gap-6 px-6 lg:px-8 py-5 lg:py-6">
            <div className="text-sm lg:text-base font-medium text-white">{r.assess}</div>
            <div className="text-sm text-white/60 font-light leading-relaxed">{r.look}</div>
            <div className="text-xs font-mono text-purple-300/70 leading-relaxed">{r.std}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RiskTable
