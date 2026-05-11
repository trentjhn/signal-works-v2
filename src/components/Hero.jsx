import React, { useEffect, useRef, useState } from 'react'

// Letters-only scramble, resolves left-to-right with ease-out
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const CYCLE_MS = 70 // char swap rate

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

const useScramble = (text, { duration = 700, delay = 0, enabled = true } = {}) => {
  const [output, setOutput] = useState(enabled ? '' : text)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!enabled) {
      setOutput(text)
      return
    }

    let cancelled = false
    let startTime = null
    let lastSwap = 0
    let scrambleBuffer = ''

    const buildScramble = (len) => {
      let s = ''
      for (let i = 0; i < len; i++) {
        s += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      }
      return s
    }

    const tick = (now) => {
      if (cancelled) return
      if (startTime === null) startTime = now
      const elapsed = now - startTime
      const rawProgress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(rawProgress)
      const resolvedCount = Math.floor(eased * text.length)

      // Only swap scrambled chars at the cycle rate so it reads as decryption, not flicker
      if (now - lastSwap >= CYCLE_MS || scrambleBuffer.length !== text.length) {
        scrambleBuffer = buildScramble(text.length)
        lastSwap = now
      }

      let next = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (i < resolvedCount || ch === ' ' || ch === '.' || ch === ',') {
          next += ch
        } else {
          next += scrambleBuffer[i]
        }
      }

      setOutput(next)

      if (rawProgress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setOutput(text)
      }
    }

    const timeoutId = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick)
    }, delay)

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, duration, delay, enabled])

  return output
}

const marqueeLogos = ['Casa Mate', 'MyHR Specialist', 'Gusdorf Marketing Group']

const Hero = () => {
  const revealRefs = useRef([])

  const [reduceMotion, setReduceMotion] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
  }, [])

  const enabled = !reduceMotion

  // Staggered timing per spec:
  // line 1: 0   -> 0.7s
  // line 2: 0.6 -> 1.4s
  // line 3: 1.3 -> 2.2s
  const line1 = useScramble('Automation that', { duration: 700, delay: 0, enabled })
  const line2 = useScramble('actually', { duration: 800, delay: 600, enabled })
  const line3 = useScramble('gets built.', { duration: 900, delay: 1300, enabled })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }

  return (
    <section className="relative w-full min-h-[calc(100vh-100px)] flex flex-col justify-between pt-16 md:pt-24 pb-12 px-6 lg:px-[6%] overflow-hidden">
      {/* Top eyebrow */}
      <div className="animate-reveal flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-white/50">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Now accepting new engagements</span>
      </div>

      {/* Main stacked headline */}
      <div className="flex-1 flex items-center py-12 md:py-16">
        <h1 className="font-semibold tracking-tighter leading-[0.9] text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw] xl:text-[8.5vw] 2xl:text-[8vw]">
          <span aria-label="Automation that" className="block text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {line1}
          </span>
          <span aria-label="actually" className="block text-white/30" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {line2}
          </span>
          <span aria-label="gets built." className="block text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {line3}
          </span>
        </h1>
      </div>

      {/* Bottom supporting content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
        <div ref={addToRefs} className="scroll-reveal lg:col-span-5 xl:col-span-4">
          <p className="text-base md:text-lg text-white/60 leading-relaxed">
            <span className="text-white">SignalWorks is your AI department,</span> sized to how you want to work. Two senior operators with backgrounds in PayPal infrastructure engineering and enterprise SaaS product strategy. We build the workflows you wish your AI tools did on their own.
          </p>
        </div>

        <div ref={addToRefs} className="scroll-reveal delay-200 lg:col-span-3 lg:col-start-9 xl:col-span-3 xl:col-start-10 flex lg:justify-end">
          <a
            href="#book"
            className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider bg-white text-black py-4 px-6 rounded-sm hover:bg-purple-50 transition-colors"
          >
            Book an intro call
            <iconify-icon icon="solar:arrow-right-linear" class="text-base group-hover:translate-x-1 transition-transform"></iconify-icon>
          </a>
        </div>
      </div>

      {/* Trusted-by marquee */}
      <div ref={addToRefs} className="scroll-reveal delay-300 mt-16 lg:mt-20">
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-5 flex items-center gap-3">
          <span className="w-8 h-px bg-white/20"></span>
          Trusted by
        </div>
        <div
          className="relative overflow-hidden marquee-mask group/marq"
        >
          <div className="flex w-max animate-marquee group-hover/marq:[animation-play-state:paused]" style={{ animationDuration: '35s' }}>
            {[...marqueeLogos, ...marqueeLogos, ...marqueeLogos, ...marqueeLogos].map((name, idx) => (
              <div
                key={idx}
                className="flex items-center shrink-0 px-10 lg:px-14"
                style={{ height: '40px' }}
              >
                <span className="text-white/55 hover:text-white/90 transition-colors font-medium tracking-tight text-lg lg:text-xl whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero