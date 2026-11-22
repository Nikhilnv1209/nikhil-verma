import type { ComponentType } from 'react'

type RollingIconProps = {
  icon: ComponentType<{ className?: string }>
  className?: string
}

/**
 * On hover the icon leaves through the top and an identical copy rises from the
 * bottom into its place — one continuous turn, with the button's label never
 * shifting because both copies are the same size. Purely decorative: the link
 * text carries the meaning, so the whole thing is hidden from assistive tech.
 */
export function RollingIcon({ icon: Icon, className = 'size-4' }: RollingIconProps) {
  return (
    <span aria-hidden="true" className={`roll ${className}`}>
      <Icon className={className} />
      <Icon className={className} />
    </span>
  )
}
