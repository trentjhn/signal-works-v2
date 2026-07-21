import React, { useEffect, useRef, useState } from 'react'

// Animates a number from 0 to `value` when the element scrolls into view.
// Accepts optional prefix/suffix (e.g. suffix="d" for "30d", suffix="%" for "100%").
// Fires once per mount, respects prefers-reduced-motion.
const CountUp = ({ value, prefix = '', suffix = '', duration = 1400, className = '' }) => {
  const ref = useRef(null)
  // Initialize to the real value so the server prerender + first client paint show the
  // true number (correct content for crawlers, and hydration matches). The count-up
  // animation re-plays from 0 when the element scrolls into view on the client.
  const [display, setDisplay] = useState(value)
  // Masks the value->0 reset when the tween starts: the number dips out and fades back
  // in while counting, instead of visibly teleporting (e.g. 30 -> 0 -> 30).
  const [counting, setCounting] = useState(false)
  const startedRef = useRef(false)
  const rafRef = useRef(null)

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      setDisplay(value)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return
        startedRef.current = true
        observer.unobserve(entry.target)
        setCounting(true)

        const start = performance.now()
        const tick = (now) => {
          const elapsed = now - start
          const t = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
          setDisplay(Math.round(eased * value))
          if (t < 1) {
            rafRef.current = requestAnimationFrame(tick)
          } else {
            rafRef.current = null
            setCounting(false)
          }
        }
        rafRef.current = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [value, duration])

  return (
    <span
      ref={ref}
      className={`${className} transition-opacity duration-200 ${counting && display === 0 ? 'opacity-0' : 'opacity-100'}`}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

export default CountUp
