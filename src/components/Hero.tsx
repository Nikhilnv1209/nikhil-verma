import { profile } from '../data/portfolio'
import { ArrowDownIcon, ArrowUpRightIcon } from './Icons'

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto max-w-5xl px-6 pb-16 pt-20 sm:pb-24 sm:pt-28"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
        Software Development Engineer
      </p>

      <h1 className="mt-4 font-serif text-5xl font-normal tracking-tight text-stone-900 sm:text-7xl dark:text-stone-100">
        Nikhil Verma
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-8 text-pretty text-stone-600 dark:text-stone-400">
        {profile.tagline}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium">
        <a
          href="#projects"
          className="inline-flex items-center gap-1.5 text-stone-900 underline decoration-stone-300 underline-offset-4 transition hover:decoration-emerald-600 dark:text-stone-100 dark:decoration-stone-700 dark:hover:decoration-emerald-400"
        >
          Selected work
          <ArrowDownIcon className="size-3.5" />
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="text-stone-600 transition hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100"
        >
          GitHub
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="text-stone-600 transition hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-1.5 text-stone-600 transition hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100"
        >
          Email
          <ArrowUpRightIcon className="size-3.5" />
        </a>
      </div>

      <p className="mt-12 flex items-center gap-3 font-mono text-xs text-stone-500 dark:text-stone-400">
        <span
          className="h-px w-8 bg-stone-300 dark:bg-stone-700"
          aria-hidden="true"
        />
        Based in Noida, India · Currently at qikfox
      </p>
    </section>
  )
}
