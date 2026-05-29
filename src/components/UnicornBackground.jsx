import React, { useEffect, useState } from 'react'

const UnicornBackground = () => {
  // unicornstudio-react drives a WebGL scene and touches the DOM, so it cannot run
  // during the server prerender. Load it only after mount on the client. The static
  // gradient below renders server-side and paints immediately, so the page still
  // looks finished even if the WebGL SDK is slow or fails to load.
  const [Scene, setScene] = useState(null)

  useEffect(() => {
    // Only load the WebGL scene where it earns its weight: desktop, motion allowed, not
    // data-saver. Mobile and constrained clients keep the static gradient above. The WebGL
    // is ~360KB of assets plus heavy GPU/CPU cost and was the main drag on mobile LCP/TBT.
    const desktop = window.matchMedia('(min-width: 768px)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = navigator.connection?.saveData === true
    if (!desktop || reduceMotion || saveData) return

    let active = true
    import('unicornstudio-react').then((mod) => {
      if (active) setScene(() => mod.default)
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0e0725] via-[#050211] to-black"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[600px] lg:w-[900px] h-[600px] lg:h-[900px] bg-purple-900/10 rounded-full blur-[80px] lg:blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] lg:w-[700px] h-[500px] lg:h-[700px] bg-indigo-900/10 rounded-full blur-[80px] lg:blur-[120px]"></div>
      </div>

      {/* Unicorn Studio Masked Background (client-only).
          On mobile, the scene's circular animation lives off the right edge of the viewport
          (the scene was composed for desktop aspect ratios). We scale the container 1.6x and
          shift it so the circle moves into the mobile frame. Desktop renders at natural size. */}
      <div
        className="aura-background-component top-0 w-full h-screen z-10 saturate-0 pointer-events-none mix-blend-screen fixed"
        data-alpha-mask="80"
        style={{ maskImage: "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)" }}
      >
        <div className="aura-background-component top-0 w-full -z-10 absolute h-full overflow-hidden">
          <div className="absolute inset-0 origin-center scale-[1.6] -translate-x-[18%] md:scale-100 md:translate-x-0">
            {Scene && (
              <Scene
                projectId="8G9qTlSBPboaCMb8UV64"
                sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js"
                className="absolute w-full h-full left-0 top-0 -z-10"
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default UnicornBackground
