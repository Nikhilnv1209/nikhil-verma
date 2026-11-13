import { useEffect, useRef } from 'react'

type Petal = {
  x: number
  y: number
  size: number
  speed: number
  drift: number
  phase: number
  rotation: number
  spin: number
  opacity: number
}

type PetalsProps = {
  count?: number
  color?: string
}

export function Petals({ count = 34, color = 'rgba(250, 250, 249, 0.55)' }: PetalsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    let width = 0
    let height = 0
    let petals: Petal[] = []
    let frame = 0

    const createPetal = (): Petal => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 2 + Math.random() * 3.5,
      speed: 0.12 + Math.random() * 0.35,
      drift: 8 + Math.random() * 26,
      phase: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.02,
      opacity: 0.25 + Math.random() * 0.5,
    })

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)

      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      petals = Array.from({ length: count }, createPetal)
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)

      for (const petal of petals) {
        petal.y += petal.speed
        petal.phase += 0.015
        petal.rotation += petal.spin

        if (petal.y - petal.size > height) {
          Object.assign(petal, createPetal(), { y: -petal.size })
        }

        const x = petal.x + Math.sin(petal.phase) * petal.drift

        context.save()
        context.translate(x, petal.y)
        context.rotate(petal.rotation)
        context.globalAlpha = petal.opacity
        context.fillStyle = color
        context.beginPath()
        context.ellipse(0, 0, petal.size, petal.size * 0.55, 0, 0, Math.PI * 2)
        context.fill()
        context.restore()
      }

      frame = window.requestAnimationFrame(draw)
    }

    resize()

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduceMotion) {
      context.clearRect(0, 0, width, height)
      for (const petal of petals) {
        context.save()
        context.globalAlpha = petal.opacity
        context.fillStyle = color
        context.beginPath()
        context.ellipse(
          petal.x,
          petal.y,
          petal.size,
          petal.size * 0.55,
          petal.rotation,
          0,
          Math.PI * 2,
        )
        context.fill()
        context.restore()
      }
    } else {
      frame = window.requestAnimationFrame(draw)
    }

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [count, color])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
