import React from 'react'

const GlobalGrid = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none hidden lg:block h-screen">
      <div className="grid-line-v" style={{ left: 'var(--gx-1)' }}></div>
      <div className="grid-line-v" style={{ left: 'var(--gx-2)' }}>
          <div className="beam-v" style={{ animation: 'beam-v 6s infinite 1s' }}></div>
      </div>
      <div className="grid-line-v" style={{ left: 'var(--gx-3)' }}>
          <div className="beam-v" style={{ animation: 'beam-v 7s infinite 3s' }}></div>
      </div>
      <div className="grid-line-v" style={{ left: 'var(--gx-4)' }}></div>
      
      <div className="grid-line-h" style={{ top: 'var(--gy-1)' }}></div>
      <div className="grid-line-h" style={{ top: '35%' }}></div> 
      <div className="grid-line-h" style={{ top: '75%' }}></div>
    </div>
  )
}

export default GlobalGrid