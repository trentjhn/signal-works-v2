import React from 'react'

// Subtle horizontal beam that travels across a section's top border every few seconds.
// Uses the existing `beam-h` keyframe in index.css (purple gradient sweep).
// Drop between sections to add ambient motion without distracting content.
const SectionDivider = ({ delay = 0, duration = 8 }) => (
  <div className="relative w-full h-px bg-white/5 overflow-hidden" data-motion-scope="">
    <div
      className="beam-h"
      style={{
        animation: `beam-h ${duration}s ${delay}s infinite linear`,
      }}
    />
  </div>
)

export default SectionDivider
