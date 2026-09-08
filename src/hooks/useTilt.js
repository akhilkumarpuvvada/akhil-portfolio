import { useEffect, useRef } from 'react'

export function useTilt({ max = 12, scale = 1, perspective = 900 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(${perspective}px) rotateX(${-py * max}deg) rotateY(${px * max}deg) scale(${scale})`
      })
    }

    const reset = () => {
      cancelAnimationFrame(raf)
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', reset)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', reset)
    }
  }, [max, scale, perspective])

  return ref
}
