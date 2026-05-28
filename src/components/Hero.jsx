import React, { useEffect, useRef, useState } from 'react'

// Hex-style scramble characters: narrow, near-uniform widths.
// Wide symbols (@ # & < > { } [ ] | /) caused the line to expand past the container
// during scramble, forcing a wrap on mobile and an ugly snap-back on resolve.
// Restricting to hex digits + lowercase keeps every glyph narrow enough that the
// scrambled string never exceeds the resolved string's width.
const SCRAMBLE_CHARS = '0123456789abcdef'
const CYCLE_MS = 90

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

const useScramble = (text, { duration = 700, delay = 0, enabled = true, trigger = 0 } = {}) => {
  // Initial render (server prerender + first client paint) is the real text, so the
  // prerendered HTML matches on hydrate and the H1 carries real words for SEO/AEO. The
  // scramble intro runs after mount via the effect below. Starting from the resolved text
  // also reserves the headline's full footprint immediately, so layout doesn't shift.
  const [output, setOutput] = useState(text)
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
  }, [text, duration, delay, enabled, trigger])

  return output
}

const marqueeLogos = ['Casa Mate Tequila', 'LA Metro', 'WriterBoyFilms', 'Gusdorf Marketing Group']

const Hero = () => {
  const revealRefs = useRef([])

  const [reduceMotion, setReduceMotion] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
  }, [])

  const enabled = !reduceMotion

  // Initial reveal: staggered scramble of all three lines (0 → 2.2s).
  // Ambient loop: "Automation that" stays still as the white anchor.
  // "actually" + "gets built." re-scramble together as a unit on a steady metronome.
  // Both fire on the same trigger, so the eye reads it as one synchronized motion, not two events.
  const [pairTrigger, setPairTrigger] = useState(0)

  useEffect(() => {
    if (!enabled) return
    const INITIAL_REVEAL_MS = 2400
    const LOOP_INTERVAL_MS = 10000 // 10s between each pair re-scramble

    let intervalId = null
    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        setPairTrigger((t) => t + 1)
      }, LOOP_INTERVAL_MS)
    }, INITIAL_REVEAL_MS + LOOP_INTERVAL_MS)

    return () => {
      clearTimeout(startTimeout)
      if (intervalId !== null) clearInterval(intervalId)
    }
  }, [enabled])

  // Initial reveal:  line1 @ 0ms,  line2 @ 600ms,  line3 @ 1300ms (staggered intro)
  // Re-trigger loop: line2 @ 0ms,  line3 @ 1100ms (sequential, line3 starts AFTER line2 fully resolves)
  const line1 = useScramble('Automation that', { duration: 700, delay: 0, enabled })
  const line2 = useScramble('actually', {
    duration: 1000,
    delay: pairTrigger === 0 ? 600 : 0,
    enabled,
    trigger: pairTrigger,
  })
  const line3 = useScramble('gets built.', {
    duration: 1200,
    delay: pairTrigger === 0 ? 1300 : 1100,
    enabled,
    trigger: pairTrigger,
  })

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
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-[120px] md:pt-[130px] pb-12 px-6 lg:px-[6%] overflow-hidden">
      {/* Top eyebrow */}
      <div className="animate-reveal flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-white/50">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Now accepting new engagements</span>
      </div>

      {/* Main stacked headline */}
      <div className="flex-1 flex items-center py-8 md:py-10">
        <h1 className="font-semibold tracking-tighter leading-[0.9] text-[12vw] sm:text-[10.5vw] md:text-[9vw] lg:text-[7.5vw] xl:text-[7vw] 2xl:text-[6.5vw]">
          <span aria-label="Automation that" className="block text-white whitespace-nowrap" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {line1}
          </span>
          <span aria-label="actually" className="block text-white/30 whitespace-nowrap" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {line2}
          </span>
          <span aria-label="gets built." className="block text-white whitespace-nowrap" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {line3}
          </span>
        </h1>
      </div>

      {/* Bottom row: paragraph + CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
        <div ref={addToRefs} className="scroll-reveal lg:col-span-5 xl:col-span-4">
          <p className="text-base md:text-lg text-white/60 leading-relaxed">
            <span className="text-white">SignalWorks is your AI department,</span> sized to how you want to work. We build the workflows you wish your AI tools did on their own.
          </p>
        </div>

        <div ref={addToRefs} className="scroll-reveal delay-200 lg:col-span-3 lg:col-start-9 xl:col-span-3 xl:col-start-10 flex lg:justify-end">
          <a
            href="https://calendly.com/hello-signalworks"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider bg-white text-black py-4 px-6 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_-8px_rgba(168,85,247,0.5)] hover:-translate-y-0.5"
          >
            {/* Sliding purple sheen on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-purple-200 via-purple-100 to-purple-200 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" aria-hidden="true"></span>
            <span className="relative">Book an intro call</span>
            <iconify-icon icon="solar:arrow-right-linear" class="relative text-base group-hover:translate-x-1 transition-transform duration-300"></iconify-icon>
          </a>
        </div>
      </div>

      {/* Trusted-by marquee — original placement, below paragraph + CTA */}
      <div ref={addToRefs} className="scroll-reveal delay-300 mt-16 lg:mt-20">
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30 mb-5 flex items-center gap-3">
          <span className="w-8 h-px bg-white/20"></span>
          Trusted by
        </div>
        <div className="relative max-w-md lg:max-w-lg overflow-hidden marquee-mask group/marq" style={{ height: '40px' }}>
          <div className="flex items-center w-max animate-marquee group-hover/marq:[animation-play-state:paused] gap-12" style={{ animationDuration: '60s' }}>
            {[...marqueeLogos, ...marqueeLogos, ...marqueeLogos, ...marqueeLogos].map((name, idx) => (
              <span
                key={idx}
                className="text-white/40 hover:text-white/80 transition-colors font-medium tracking-tight text-sm whitespace-nowrap shrink-0"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero