import { useEffect, useRef, useState } from 'react'

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, summary, [data-cursor="hover"]'

const TRAIL_LENGTH = 20
const TRAIL_SPACING = 6
const MAX_INTERPOLATED_STEPS = 10

function canUseCustomCursor() {
  if (typeof window === 'undefined') return false

  return (
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [enabled] = useState(canUseCustomCursor)

  useEffect(() => {
    if (!enabled) return

    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    document.documentElement.classList.add('cursor-custom')

    const trail: { x: number; y: number }[] = []

    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let hovering = false
    let frame = 0
    let width = 0
    let height = 0

    function resize() {
      const element = canvasRef.current
      const ctx = element?.getContext('2d')
      if (!element || !ctx) return

      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      element.width = Math.floor(width * ratio)
      element.height = Math.floor(height * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    function onPointerMove(event: PointerEvent) {
      pointerX = event.clientX
      pointerY = event.clientY
      dotRef.current?.style.setProperty('--x', `${pointerX}px`)
      dotRef.current?.style.setProperty('--y', `${pointerY}px`)
    }

    function onPointerOver(event: PointerEvent) {
      const target = event.target as Element | null
      const isInteractive = target?.closest(INTERACTIVE) != null

      if (isInteractive !== hovering) {
        hovering = isInteractive
        dotRef.current?.setAttribute('data-hover', String(hovering))
      }
    }

    function onPointerLeave() {
      dotRef.current?.setAttribute('data-hidden', 'true')
    }

    function onPointerEnter() {
      dotRef.current?.setAttribute('data-hidden', 'false')
    }

    function draw() {
      const ctx = context
      if (!ctx) return

      ctx.clearRect(0, 0, width, height)

      const last = trail[trail.length - 1]

      if (last) {
        const deltaX = pointerX - last.x
        const deltaY = pointerY - last.y
        const distance = Math.hypot(deltaX, deltaY)
        const steps = Math.min(
          Math.ceil(distance / TRAIL_SPACING),
          MAX_INTERPOLATED_STEPS,
        )

        for (let step = 1; step < steps; step += 1) {
          trail.push({
            x: last.x + (deltaX * step) / steps,
            y: last.y + (deltaY * step) / steps,
          })
        }
      }

      trail.push({ x: pointerX, y: pointerY })
      if (trail.length > TRAIL_LENGTH) {
        trail.splice(0, trail.length - TRAIL_LENGTH)
      }

      for (let index = 0; index < trail.length; index += 1) {
        const progress = (index + 1) / trail.length
        const point = trail[index]
        const radius = 0.6 + progress * (hovering ? 3.4 : 2.4)

        ctx.beginPath()
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(16, 185, 129, ${(progress * (hovering ? 0.5 : 0.32)).toFixed(3)})`
        ctx.fill()
      }

      frame = window.requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerover', onPointerOver, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('pointerenter', onPointerEnter)
    frame = window.requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerover', onPointerOver)
      document.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('pointerenter', onPointerEnter)
      window.cancelAnimationFrame(frame)
      document.documentElement.classList.remove('cursor-custom')
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[199] h-full w-full"
      />
      <div ref={dotRef} aria-hidden="true" className="cursor-dot">
        <span className="cursor-dot-core" />
      </div>
    </>
  )
}
