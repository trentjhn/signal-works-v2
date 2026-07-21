import React from 'react'

// House treatment for photography, matching the testimonial headshots: grayscale at
// rest, color on hover, plus a navy scrim so photos sit inside the site's dark world
// instead of tearing a bright hole in it. Callers size the frame via className.
// Responds to its own hover (group/img) and to a parent `group` (card media).
// On touch devices (no hover) the color reveal fires on scroll-into-view instead —
// see the `.brand-img` rules in index.css. bordered=false for media bands that live
// inside an already-bordered card.
function BrandImage({ src, alt, label, className = '', imgClassName = '', bordered = true }) {
  return (
    <div className={`brand-img group/img relative overflow-hidden ${bordered ? 'rounded-sm border border-white/10' : ''} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover grayscale group-hover/img:grayscale-0 group-hover:grayscale-0 transition-[filter] duration-500 ease-swift ${imgClassName}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a051e]/70 via-[#0a051e]/15 to-transparent pointer-events-none"></div>
      {label && (
        <span className="absolute bottom-3 left-4 text-[10px] font-mono uppercase tracking-widest text-white/70 pointer-events-none">
          {label}
        </span>
      )}
    </div>
  )
}

export default BrandImage
