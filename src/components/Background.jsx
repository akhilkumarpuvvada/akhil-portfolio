import { useEffect, useRef } from 'react'

export default function Background() {
  const spotRef = useRef(null)

  useEffect(() => {
    const el = spotRef.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return

    let raf = 0
    const move = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--x', `${e.clientX}px`)
        el.style.setProperty('--y', `${e.clientY}px`)
      })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-navy-950">
      <div className="absolute left-[-10%] top-[-15%] h-[55vmax] w-[55vmax] animate-aurora-1 rounded-full bg-accent-600/30 blur-[120px]" />
      <div className="absolute right-[-15%] top-[10%] h-[45vmax] w-[45vmax] animate-aurora-2 rounded-full bg-flare-500/25 blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[20%] h-[50vmax] w-[50vmax] animate-aurora-3 rounded-full bg-glow-500/20 blur-[120px]" />

      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />

      <div
        ref={spotRef}
        className="absolute inset-0 opacity-70 transition-opacity"
        style={{
          background:
            'radial-gradient(400px circle at var(--x, 50%) var(--y, 20%), rgba(139,92,246,0.14), transparent 70%)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/0 via-navy-950/30 to-navy-950" />
    </div>
  )
}
