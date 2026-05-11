import React, { useRef } from 'react'

// FlashlightCard: tracks mouse position for the radial-gradient hover effect (--mouse-x/y),
// AND adds a subtle 3D tilt based on cursor position relative to card center.
// Tilt is small (max ~3deg) so it reads as polish, not gimmick. Eases back to flat on leave.
const FlashlightCard = ({ children, className = '', style = {}, tilt = true, ...props }) => {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)

    if (tilt) {
      // Normalize to -1..1 range from card center
      const nx = (x / rect.width - 0.5) * 2
      const ny = (y / rect.height - 0.5) * 2
      const maxTilt = 3 // degrees
      const rotX = -ny * maxTilt
      const rotY = nx * maxTilt
      cardRef.current.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`
    }
  }

  const handleMouseLeave = () => {
    if (cardRef.current && tilt) {
      cardRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)'
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group ${className}`}
      style={{
        ...style,
        transition: tilt ? 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)' : style.transition,
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export default FlashlightCard
