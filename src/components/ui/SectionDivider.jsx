import React from 'react'

// Subtle horizontal beam that travels across a section's top border every few seconds.
// Uses the existing `beam-h` keyframe in index.css (purple gradient sweep).
// Drop between sections to add SAKURA-style ambient motion without distracting content.
const SectionDivider = ({ delay = 0, duration = 8 }) => (
  <div className="relative w-full h-px bg-white/5 overflow-hidden">
    <div
      className="beam-h"
      style={{
        animation: `beam-h ${duration}s ${delay}s infinite`,
      }}
    />
  </div>
)

export default SectionDivider
