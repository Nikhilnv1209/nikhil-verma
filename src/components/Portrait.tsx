import { useEffect, useRef } from 'react'
import avatar from '../assets/avatar.webp?url'

const TILT_X = 12
const TILT_Y = 9

export function Portrait() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fine = window.matchMedia('(pointer: fine)')
    if (reduced.matches || !fine.matches) return

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height

      root.style.setProperty('--tilt-x', `${((px - 0.5) * 2 * TILT_X).toFixed(2)}deg`)
      root.style.setProperty('--tilt-y', `${((py - 0.5) * 2 * TILT_Y).toFixed(2)}deg`)
      root.style.setProperty('--glow-x', `${(px * 100).toFixed(1)}%`)
      root.style.setProperty('--glow-y', `${(py * 100).toFixed(1)}%`)
      root.dataset.active = 'true'
    }

    const onLeave = () => {
      root.style.setProperty('--tilt-x', '0deg')
      root.style.setProperty('--tilt-y', '0deg')
      root.dataset.active = 'false'
    }

    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerleave', onLeave)

    return () => {
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={rootRef} className="portrait shrink-0" data-active="false">
      <div className="portrait-tilt size-24">
        <div className="portrait-frame size-full">
          <img
            src={avatar}
            alt="Nikhil Verma"
            width={800}
            height={800}
            draggable={false}
            className="size-full object-cover"
          />
          <span className="portrait-glare" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
