import React, { useRef, useEffect } from 'react'

// FlashlightCard: tracks mouse position for the radial-gradient hover effect (--mouse-x/y),
// AND adds a subtle 3D tilt based on cursor position relative to card center.
// Tilt is small (max ~3deg) so it reads as polish, not gimmick. Eases back to flat on leave.
const FlashlightCard = ({ children, className = '', style = {}, tilt = true, ...props }) => {
  const cardRef = useRef(null)
  const frameRef = useRef(null)
  const lastEventRef = useRef(null)
  const enabledRef = useRef(false)

  useEffect(() => {
    // Decorative pointer-tracking: fine pointers that can hover, and no reduced-motion.
    enabledRef.current =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [])

  const applyFrame = () => {
    frameRef.current = null
    const e = lastEventRef.current
    if (!e || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
    if (tilt) {
      const nx = (x / rect.width - 0.5) * 2
      const ny = (y / rect.height - 0.5) * 2
      const maxTilt = 3
      cardRef.current.style.transform =
        `perspective(900px) rotateX(${-ny * maxTilt}deg) rotateY(${nx * maxTilt}deg) translateZ(0)`
    }
  }

  const handleMouseMove = (e) => {
    if (!enabledRef.current) return
    lastEventRef.current = e
    if (frameRef.current == null) frameRef.current = requestAnimationFrame(applyFrame)
  }

  const handleMouseLeave = () => {
    // Cancel any queued frame first — a mousemove scheduled just before leave would
    // otherwise re-apply an edge tilt AFTER this reset and leave the card skewed.
    if (frameRef.current != null) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
    lastEventRef.current = null
    if (!enabledRef.current || !cardRef.current || !tilt) return
    cardRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group ${className}`}
      style={{
        ...style,
        // Smooths the tilt (pseudo-spring) AND carries the hover surface-tint durations.
        // This inline shorthand overrides className transition utilities entirely, so any
        // property consumers animate on hover MUST be listed here — that's why
        // background-color/border-color are included (critical-pass finding: they were
        // snapping, never animating, because the old list was transform+opacity only).
        // Reveal opacity is animation-driven by .scroll-reveal (plan 001) — not needed here.
        transition: tilt
          ? 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1), background-color 500ms cubic-bezier(0.16, 1, 0.3, 1), border-color 500ms cubic-bezier(0.16, 1, 0.3, 1)'
          : style.transition,
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export default FlashlightCard
