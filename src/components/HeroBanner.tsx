import { useState } from 'react'
import { quotes } from '../data/quotes'
import { useTimeOfDay } from '../hooks/useTimeOfDay'
import { Clock } from './Clock'
import { Petals } from './Petals'
import { Visits } from './Visits'

export function HeroBanner() {
  const timeOfDay = useTimeOfDay()
  const isDay = timeOfDay === 'day'
  const src = isDay ? '/banner-day.webp' : '/banner-night.webp'

  const [loadedSrc, setLoadedSrc] = useState<string | null>(null)
  const loaded = loadedSrc === src

  // One per visit, and left alone after that: a line that keeps changing would
  // pull attention back to the top of the page it is sitting on. Narrow screens
  // only draw from the lines that fit on one row, so the picture stays a
  // picture and the quote is just a footnote on it.
  const [quote] = useState(() => {
    const narrow =
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 639px)').matches
    const pool = narrow
      ? quotes.filter((item) => item.text.length <= 58)
      : quotes
    return pool[Math.floor(Math.random() * pool.length)]
  })

  return (
    <div id="top" className="relative">
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-[#12110d] sm:aspect-[4/1]">
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

        {/* Phones get a bare line, no plate: the picture still has to be the
            picture. From `sm` up there is room for a proper caption block. */}
        <figure className="pointer-events-none absolute inset-x-3 bottom-9 flex flex-wrap items-baseline gap-x-1.5 sm:inset-x-auto sm:bottom-3 sm:left-5 sm:block sm:max-w-sm sm:rounded-lg sm:bg-black/45 sm:px-3 sm:py-2 sm:backdrop-blur-sm">
          <blockquote className="font-serif text-xs leading-4 text-pretty text-stone-50 italic [text-shadow:0_1px_6px_rgba(0,0,0,0.75)] sm:text-[15px] sm:leading-6 sm:text-balance sm:[text-shadow:none]">
            “{quote.text}”
          </blockquote>
          <figcaption className="font-mono text-[10px] uppercase tracking-[0.14em] text-stone-200 [text-shadow:0_1px_6px_rgba(0,0,0,0.75)] sm:mt-0.5 sm:text-[11px] sm:text-stone-300 sm:[text-shadow:none]">
            <span className="hidden sm:inline">{quote.who} · </span>
            {quote.series}
          </figcaption>
        </figure>

        <div className="absolute bottom-2 right-3 flex items-center gap-2.5 rounded-md bg-black/30 px-2 py-1 font-mono text-xs text-stone-100 backdrop-blur-sm sm:bottom-3 sm:right-5 sm:text-sm">
          <span className="flex items-center gap-2 tracking-[0.15em]">
            <span
              className="size-1.5 rounded-full bg-accent-400"
              aria-hidden="true"
            />
            <Clock />
          </span>

          <Visits />
        </div>
      </div>
    </div>
  )
}
