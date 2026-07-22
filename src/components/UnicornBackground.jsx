import React, { useEffect, useState } from 'react'

const UnicornBackground = () => {
  // unicornstudio-react drives a WebGL scene and touches the DOM, so it cannot run
  // during the server prerender. Load it only after mount on the client. The static
  // gradient below renders server-side and paints immediately, so the page still
  // looks finished even if the WebGL SDK is slow or fails to load.
  const [Scene, setScene] = useState(null)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    // Motion-off and data-saver clients keep the static gradient. Desktop loads the
    // scene immediately. Mobile gets the scene too (it was the biggest desktop/mobile
    // experience gap) but deferred until after the load event + a beat of idle so the
    // ~360KB of WebGL never competes with LCP/TBT, and at reduced dpi/fps/scale
    // (see the <Scene> props) so the GPU cost stays a fraction of desktop's.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = navigator.connection?.saveData === true
    // Low-memory devices keep the static gradient — Save-Data catches metered intent,
    // deviceMemory catches weak hardware (reports 4GB or less on constrained phones).
    const lowEnd = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory < 4
    if (reduceMotion || saveData || lowEnd) return

    const desktop = window.matchMedia('(min-width: 768px)').matches
    setMobile(!desktop)

    let active = true
    let timer = null
    const load = () =>
      import('unicornstudio-react').then((mod) => {
        if (active) setScene(() => mod.default)
      })

    if (desktop) {
      load()
    } else {
      // Load at the first idle moment after hydration rather than waiting for the full
      // load event — the scene appears within ~a second of first paint instead of
      // popping in seconds later, while still yielding to the critical render path.
      if (typeof window.requestIdleCallback === 'function') {
        const idleId = window.requestIdleCallback(load, { timeout: 600 })
        timer = { cancel: () => window.cancelIdleCallback(idleId) }
      } else {
        const t = setTimeout(load, 400)
        timer = { cancel: () => clearTimeout(t) }
      }
    }
    return () => {
      active = false
      if (timer) timer.cancel()
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
                scale={1}
                dpi={mobile ? Math.min(window.devicePixelRatio || 1, 2) : 1.5}
                fps={mobile ? 30 : 60}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default UnicornBackground
