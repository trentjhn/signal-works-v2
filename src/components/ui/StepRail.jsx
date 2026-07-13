import React from 'react'

// A horizontal rail of connected, numbered steps. Process shown as a process, not a list.
// On md+ a gradient connector links each node to the next; stacks vertically on mobile.
function StepRail({ steps }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
      {steps.map((s, i) => (
        <div key={s.n} className="relative scroll-reveal" style={{ animationDelay: `${i * 100}ms` }}>
          {i < steps.length - 1 && (
            <div className="hidden lg:block absolute top-5 left-[52px] right-[-24px] h-px bg-gradient-to-r from-purple-400/40 via-purple-400/15 to-transparent"></div>
          )}
          <div className="w-10 h-10 rounded-full border border-purple-400/30 bg-purple-500/12 flex items-center justify-center text-purple-200 font-mono text-sm mb-5 relative z-10">
            {s.n}
          </div>
          <h3 className="text-base lg:text-lg font-medium text-white tracking-tight mb-2">{s.title}</h3>
          <p className="text-sm text-white/55 font-light leading-relaxed">{s.body}</p>
        </div>
      ))}
    </div>
  )
}

export default StepRail
