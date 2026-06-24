import React from 'react'

// A pure-CSS system flow: Your data -> Agent layer -> Your systems. The recurring visual
// motif for the Custom AI Software page. Stacks vertically on mobile, flows left-to-right on md+.
const nodes = [
  { label: 'Your data', sub: 'CRM, docs, APIs', icon: 'solar:database-bold-duotone' },
  { label: 'Agent layer', sub: 'reasoning + tools', icon: 'solar:cpu-bolt-bold-duotone' },
  { label: 'Your systems', sub: 'where the work lands', icon: 'solar:server-square-bold-duotone' },
]

function Arrow() {
  return (
    <div className="flex items-center justify-center text-purple-300/50 rotate-90 md:rotate-0 py-1 md:py-0 md:px-1">
      <iconify-icon icon="solar:arrow-right-linear" class="text-2xl"></iconify-icon>
    </div>
  )
}

function SystemDiagram() {
  return (
    <div className="flex flex-col md:flex-row md:items-stretch gap-1 md:gap-0">
      {nodes.map((n, i) => (
        <React.Fragment key={n.label}>
          <div className="card-surface rounded-sm p-6 lg:p-7 flex-1 flex flex-col items-center text-center justify-center min-h-[150px] scroll-reveal" style={{ transitionDelay: `${i * 120}ms` }}>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-md bg-purple-500/12 border border-purple-400/20 flex items-center justify-center mb-4 mx-auto">
                <iconify-icon icon={n.icon} class="text-purple-300 text-2xl"></iconify-icon>
              </div>
              <p className="text-base font-medium text-white tracking-tight">{n.label}</p>
              <p className="text-xs text-white/45 font-mono mt-1">{n.sub}</p>
            </div>
          </div>
          {i < nodes.length - 1 && <Arrow />}
        </React.Fragment>
      ))}
    </div>
  )
}

export default SystemDiagram
