import type { ComponentType } from 'react'

type RollingIconProps = {
  icon: ComponentType<{ className?: string }>
  className?: string
}

/**
 * Hover rolls the icon up and out of a one-icon window while an identical copy
 * rises from below into its place. The transition is declared only in the
 * hovered state, so un-hovering does not play it backwards — the window simply
 * snaps back to the copy it started on, which is the same icon, so nothing is
 * seen.
 *
 * Decorative: the button's label carries the meaning, so this is hidden from
 * assistive tech.
 */
export function RollingIcon({
  icon: Icon,
  className = 'size-4',
}: RollingIconProps) {
  return (
    <span aria-hidden="true" className={`roll ${className}`}>
      <Icon className={className} />
      <Icon className={className} />
    </span>
  )
}
