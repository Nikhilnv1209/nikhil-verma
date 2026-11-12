import bannerDark from '../assets/banner-dark.jpg?url'
import bannerLight from '../assets/banner-light.jpg?url'
import { Clock } from './Clock'
import { Petals } from './Petals'

export function HeroBanner() {
  return (
    <div id="top" className="relative">
      <div className="relative aspect-[21/9] w-full overflow-hidden sm:aspect-[4/1]">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcSet={bannerDark} />
          <img
            src={bannerLight}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[50%_60%] dark:hidden"
          />
          <img
            src={bannerDark}
            alt=""
            className="absolute inset-0 hidden h-full w-full object-cover object-[50%_30%] dark:block"
          />
        </picture>

        <Petals />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-stone-50 to-transparent dark:h-20 dark:from-stone-950" />

        <div className="absolute bottom-2 right-3 flex items-center gap-2 rounded-md bg-black/30 px-2 py-1 font-mono text-xs tracking-[0.15em] text-stone-100 backdrop-blur-sm sm:bottom-3 sm:right-5 sm:text-sm">
          <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          <Clock />
        </div>
      </div>
    </div>
  )
}
