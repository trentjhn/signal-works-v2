import React, { useState, useEffect } from 'react'

// Before/after prompt demo for the AI Training hero — the training equivalent of
// TypedSearch on Knowledge Systems: it shows the product (the competence gap closing)
// instead of describing it. Same hydration contract as TypedSearch: the complete
// final state is the initial render, so prerendered HTML carries every word and
// reduced-motion visitors see the finished comparison. On mount it replays once:
// type the untrained prompt -> its generic answer -> type the trained prompt -> its
// answer. Phases: 4 = done (SSR initial), 0..3 = replay in progress.
const WEAK_PROMPT = 'write a follow up email'
const WEAK_ANSWER = 'Dear valued customer, I hope this email finds you well. I am reaching out to touch base regarding our previous correspondence...'
const TRAINED_PROMPT = "Follow up with Dana on Tuesday's proposal. Her worry is onboarding time. Under 100 words, plain tone, ask for a Thursday call."
const TRAINED_ANSWER = 'Dana, good news on the onboarding worry: setup is 45 minutes with your team on the call, not the weeks you were quoted. Free Thursday to walk through it?'

function PromptLift() {
  const [phase, setPhase] = useState(4)
  const [t1, setT1] = useState(WEAK_PROMPT)
  const [t2, setT2] = useState(TRAINED_PROMPT)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    let cancelled = false
    const timers = []
    const later = (fn, ms) => timers.push(setTimeout(() => { if (!cancelled) fn() }, ms))

    // Elapsed-time typing: characters shown are a function of wall-clock time, not
    // tick count, so a busy main thread (the WebGL background) slows the frame
    // rate but never stretches the total duration.
    const type = (full, set, msPerChar, onDone) => {
      const start = performance.now()
      const id = setInterval(() => {
        if (cancelled) return clearInterval(id)
        const n = Math.min(full.length, Math.floor((performance.now() - start) / msPerChar))
        set(full.slice(0, n))
        if (n >= full.length) {
          clearInterval(id)
          onDone()
        }
      }, 32)
      timers.push(id)
    }

    setT1(''); setT2(''); setPhase(0)
    type(WEAK_PROMPT, setT1, 34, () => {
      setPhase(1)                                    // weak answer appears
      later(() => {
        setPhase(2)                                  // trained prompt starts typing
        type(TRAINED_PROMPT, setT2, 16, () => {
          later(() => setPhase(4), 250)              // trained answer appears
        })
      }, 900)
    })

    return () => { cancelled = true; timers.forEach((id) => { clearTimeout(id); clearInterval(id) }) }
  }, [])

  const chip = 'inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full'
  const promptBox = 'flex items-start gap-3 border rounded-md px-4 py-3 bg-[#0a051e]/60 min-h-[72px]'
  const answerBox = 'mt-3 px-4 py-3 rounded-md transition-[opacity,transform] duration-400 ease-swift'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-stretch gap-4 lg:gap-5 max-w-4xl animate-reveal reveal-delay-400">

      {/* Before: the prompt everyone writes on day one */}
      <div className="card-surface rounded-md p-5 relative">
        <div className="relative z-10">
          <span className={`${chip} border border-white/10 bg-white/[0.04] text-white/40 mb-4`}>Before training</span>
          <div className={`${promptBox} border-white/10 mt-3`}>
            <iconify-icon icon="solar:user-linear" class="text-white/30 text-base shrink-0 mt-0.5"></iconify-icon>
            <span className="text-sm text-white/70 font-light">
              {t1}
              <span className={`inline-block w-px h-4 bg-white/40 align-middle ml-0.5 ${phase === 0 ? 'animate-pulse' : 'opacity-0'} transition-opacity duration-300`}></span>
            </span>
          </div>
          <div className={`${answerBox} bg-white/[0.03] border border-white/5 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'}`}>
            <p className="text-sm text-white/35 font-light leading-relaxed italic">{WEAK_ANSWER}</p>
            <p className="text-[11px] font-mono text-white/25 mt-2">no context · no constraints · sounds like everyone</p>
          </div>
        </div>
      </div>

      {/* Connector */}
      <div className="hidden lg:flex items-center" aria-hidden="true">
        <iconify-icon icon="solar:arrow-right-linear" class="text-2xl text-purple-300/60"></iconify-icon>
      </div>
      <div className="flex lg:hidden justify-center -my-1" aria-hidden="true">
        <iconify-icon icon="solar:arrow-down-linear" class="text-xl text-purple-300/60"></iconify-icon>
      </div>

      {/* After: the same ask from someone who has been trained */}
      <div className="card-surface rounded-md p-5 relative border border-purple-400/20">
        <div className="relative z-10">
          <span className={`${chip} border border-purple-400/25 bg-purple-400/[0.08] text-purple-200/90 mb-4`}>After training</span>
          <div className={`${promptBox} border-purple-400/20 mt-3`}>
            <iconify-icon icon="solar:user-check-rounded-linear" class="text-purple-300/70 text-base shrink-0 mt-0.5"></iconify-icon>
            <span className="text-sm text-white/85 font-light">
              {t2}
              <span className={`inline-block w-px h-4 bg-purple-400 align-middle ml-0.5 ${phase === 2 ? 'animate-pulse' : 'opacity-0'} transition-opacity duration-300`}></span>
            </span>
          </div>
          <div className={`${answerBox} bg-purple-500/[0.06] border border-purple-400/15 ${phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'}`}>
            <p className="text-sm text-white/80 font-light leading-relaxed">{TRAINED_ANSWER}</p>
            <p className="text-[11px] font-mono text-purple-200/50 mt-2">context · constraint · clear ask</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PromptLift
