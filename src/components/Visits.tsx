import { useLiveStats } from '../lib/use-live-stats'
import { EyeIcon } from './Icons'

const numberFormat = new Intl.NumberFormat('en-US')

/** Quiet readout that sits beside the clock: a hairline, a glyph, a number. */
export function Visits() {
  const { visits } = useLiveStats()

  if (visits === null) return null

  return (
    <>
      <span className="h-3 w-px bg-white/25" aria-hidden="true" />

      <span
        className="flex items-center gap-1.5"
        title={`${numberFormat.format(visits)} ${visits === 1 ? 'visit' : 'visits'}`}
      >
        <EyeIcon className="size-3.5 text-stone-300/60" />
        <span className="tabular-nums text-stone-200">
          {numberFormat.format(visits)}
        </span>
        <span className="sr-only">{visits === 1 ? 'visit' : 'visits'}</span>
      </span>
    </>
  )
}
