import React, { useEffect, useRef } from 'react'

// SwipeableMarquee: horizontally scrolls children at a steady pace, but lets users
// pause and swipe/scroll/arrow-key through manually. After interaction stops for
// `resumeDelay` ms, auto-scroll resumes from the current position.
//
// Why JS-driven instead of CSS keyframe: CSS animation can't be paused-and-resumed
// from the user's manual scroll position. Driving scrollLeft via requestAnimationFrame
// keeps state in one place — the DOM scrollLeft — which both auto and manual update.
//
// Children render twice (passed in once, duplicated internally) for the seamless wrap.
const SwipeableMarquee = ({ children, speed = 0.3, mobileSpeed = null, briefPauseMs = 800, className = '' }) => {
  const scrollRef = useRef(null)
  const rafRef = useRef(null)
  const lastTimestampRef = useRef(null)
  // Auto-scroll runs continuously. We only pause it BRIEFLY during active user input
  // (touch drag, arrow click animation) so manual scroll doesn't fight auto-scroll.
  // No hover pause — wall keeps moving even when cursor is over it.
  const interactingRef = useRef(false)
  const resumeTimeoutRef = useRef(null)

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) return

    // Mobile devices need a higher px/ms speed to read as "moving" — small viewports mean
    // visible-pixel distance per second feels slower at the same speed value.
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const effectiveSpeed = isMobile && mobileSpeed !== null ? mobileSpeed : speed

    const tick = (timestamp) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp
      const delta = timestamp - lastTimestampRef.current
      lastTimestampRef.current = timestamp

      const el = scrollRef.current
      if (el && !interactingRef.current) {
        const halfWidth = el.scrollWidth / 2
        let next = el.scrollLeft + effectiveSpeed * delta
        if (next >= halfWidth) next -= halfWidth
        el.scrollLeft = next
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    // Only run the rAF loop while the marquee is on-screen — rAF pauses on hidden
    // tabs but not for scrolled-past elements, so gate it ourselves.
    const startLoop = () => {
      if (rafRef.current == null) {
        lastTimestampRef.current = null
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    const stopLoop = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? startLoop() : stopLoop()),
      { rootMargin: '80px 0px' }
    )
    if (scrollRef.current) io.observe(scrollRef.current)
    return () => {
      io.disconnect()
      stopLoop()
      lastTimestampRef.current = null
    }
  }, [speed, mobileSpeed])

  const markInteracting = () => {
    interactingRef.current = true
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
  }

  const scheduleResume = (delay = briefPauseMs) => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      interactingRef.current = false
    }, delay)
  }

  // Loop wrap on user-driven scroll: if user pushes past halfWidth, snap back invisibly.
  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const halfWidth = el.scrollWidth / 2
    if (el.scrollLeft >= halfWidth) {
      el.scrollLeft = el.scrollLeft - halfWidth
    } else if (el.scrollLeft < 0) {
      el.scrollLeft = el.scrollLeft + halfWidth
    }
  }

  const scrollByAmount = (delta) => {
    const el = scrollRef.current
    if (!el) return
    markInteracting()
    el.scrollTo({ left: el.scrollLeft + delta, behavior: 'smooth' })
    // Resume auto-scroll after the smooth-scroll animation completes (~600ms)
    scheduleResume(700)
  }

  return (
    <div className={`relative ${className}`}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onTouchStart={markInteracting}
        onTouchEnd={() => scheduleResume()}
        onPointerDown={(e) => { if (e.pointerType !== 'mouse') markInteracting() }}
        onPointerUp={(e) => { if (e.pointerType !== 'mouse') scheduleResume() }}
        className="overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <style>{`.scrollbar-none::-webkit-scrollbar { display: none; }`}</style>
        <div className="flex w-max gap-6 items-start">
          {children}
          {/* Duplicate set for seamless wrap */}
          {children}
        </div>
      </div>

      {/* Prev / next controls */}
      <div className="flex justify-center gap-3 mt-8">
        <button
          type="button"
          onClick={() => scrollByAmount(-340)}
          className="group flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-[color,background-color,border-color,transform] duration-300 active:scale-95 backdrop-blur-sm"
          aria-label="Scroll cards left"
        >
          <iconify-icon icon="solar:arrow-left-linear" class="text-white/60 group-hover:text-white text-base"></iconify-icon>
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount(340)}
          className="group flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-[color,background-color,border-color,transform] duration-300 active:scale-95 backdrop-blur-sm"
          aria-label="Scroll cards right"
        >
          <iconify-icon icon="solar:arrow-right-linear" class="text-white/60 group-hover:text-white text-base"></iconify-icon>
        </button>
      </div>
    </div>
  )
}

export default SwipeableMarquee
