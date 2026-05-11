import React, { useEffect, useRef, useState } from 'react'

// Splits a heading into individual words and reveals each with a staggered scroll-triggered
// transition (translateY + opacity). Used for section headings to add SAKURA-style entrance.
// Pass `accentWords` (array of word indices) to render those words in the muted-gray treatment.
const SplitHeading = ({
  text,
  as: Tag = 'h2',
  accentWords = [],
  className = '',
  wordStagger = 70,
}) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, idx) => (
        <React.Fragment key={idx}>
          <span
            className="inline-block transition-all duration-700"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${idx * wordStagger}ms`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
              color: accentWords.includes(idx) ? 'rgba(255,255,255,0.3)' : undefined,
            }}
          >
            {word}
          </span>
          {idx < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </Tag>
  )
}

export default SplitHeading
