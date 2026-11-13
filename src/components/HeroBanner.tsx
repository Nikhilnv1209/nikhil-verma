import { useState } from 'react'
import { useTimeOfDay } from '../hooks/useTimeOfDay'
import { Clock } from './Clock'
import { Petals } from './Petals'

export function HeroBanner() {
  const timeOfDay = useTimeOfDay()
  const isDay = timeOfDay === 'day'
  const src = isDay ? '/banner-day.webp' : '/banner-night.webp'

  const [loadedSrc, setLoadedSrc] = useState<string | null>(null)
  const loaded = loadedSrc === src

  return (
    <div id="top" className="relative">
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-[#0b1416] sm:aspect-[4/1]">
        <img
          src={src}
          alt=""
          fetchPriority="high"
          decoding="async"
          onLoad={() => setLoadedSrc(src)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${isDay ? 'object-[50%_55%]' : 'object-[50%_30%]'}`}
        />

        <Petals />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/40 via-black/10 to-transparent sm:h-28"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-stone-50 via-stone-50/40 to-transparent sm:h-12 dark:h-14 dark:from-stone-950 dark:via-stone-950/40 dark:sm:h-20"
          aria-hidden="true"
        />

        <div className="absolute bottom-2 right-3 flex items-center gap-2 rounded-md bg-black/30 px-2 py-1 font-mono text-xs tracking-[0.15em] text-stone-100 backdrop-blur-sm sm:bottom-3 sm:right-5 sm:text-sm">
          <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          <Clock />
        </div>
      </div>
    </div>
  )
}
