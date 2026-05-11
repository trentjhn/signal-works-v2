import React, { useRef } from 'react'

const FlashlightCard = ({ children, className = '', style = {}, ...props }) => {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div 
      ref={cardRef} 
      onMouseMove={handleMouseMove} 
      className={`group ${className}`} 
      style={style}
      {...props}
    >
      {/* Interactive masks applied by children relying on --mouse-x/y */}
      {children}
    </div>
  )
}

export default FlashlightCard