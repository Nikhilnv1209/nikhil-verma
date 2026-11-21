import { useEffect, useRef, useState } from 'react'

type RevealOptions = {
  /** How much of the element must be on screen before it counts as seen. */
  threshold?: number
  /** Shrinks the viewport so cards land after they clear the fold, not on it. */
  rootMargin?: string
}

/**
 * Flips once when an element scrolls into view, then stops observing. Content
 * above the fold is visible immediately, so this never delays first paint.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.2,
  rootMargin = '0px 0px -8% 0px',
}: RevealOptions = {}) {
  const ref = useRef<T>(null)
  // No observer (old browser, non-DOM runtime) means nothing will ever fire,
  // so start revealed instead of waiting for an event that cannot arrive.
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, visible }
}
