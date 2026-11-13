import { useEffect, useRef } from 'react'
import { useRouter } from '../lib/router-context'

export function TopProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const { path } = useRouter()

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let cancelled = false
    let hideTimer = 0
    let finishTimer = 0

    bar.style.transition = 'none'
    bar.style.opacity = '1'
    bar.style.transform = 'translate3d(-25%, 0, 0) scaleX(0.35)'
    void bar.offsetWidth

    bar.style.transition = 'transform 420ms cubic-bezier(0.23, 1, 0.32, 1), opacity 220ms ease'
    bar.style.transform = 'translate3d(0, 0, 0) scaleX(0.72)'

    function finish() {
      const element = barRef.current
      if (cancelled || !element) return

      element.style.transition =
        'transform 260ms cubic-bezier(0.23, 1, 0.32, 1), opacity 220ms ease'
      element.style.transform = 'translate3d(0, 0, 0) scaleX(1)'

      hideTimer = window.setTimeout(() => {
        const hidden = barRef.current
        if (cancelled || !hidden) return
        hidden.style.opacity = '0'
        hidden.style.transform = 'translate3d(0, -100%, 0) scaleX(0.4)'
      }, 220)
    }

    if (document.readyState === 'complete') {
      finishTimer = window.setTimeout(finish, 420)
    } else {
      window.addEventListener('load', finish, { once: true })
      finishTimer = window.setTimeout(finish, 5000)
    }

    return () => {
      cancelled = true
      window.clearTimeout(hideTimer)
      window.clearTimeout(finishTimer)
      window.removeEventListener('load', finish)
    }
  }, [path])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[300] h-[3px]"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]"
      />
    </div>
  )
}
