import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger, in ms. Cards in a list read as a sequence, not a block. */
  delay?: number
  style?: CSSProperties
}

export function Reveal({ children, className, delay = 0, style }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      data-visible={visible}
      className={className ? `reveal ${className}` : 'reveal'}
      style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  )
}
