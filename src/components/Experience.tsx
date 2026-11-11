import { experience } from '../data/portfolio'
import { Section } from './Section'

export function Experience() {
  return (
    <Section id="experience" label="Experience">
      <h2 className="font-serif text-3xl font-normal tracking-tight text-balance text-stone-900 sm:text-4xl dark:text-stone-100">
        From Linux agents to Android releases.
      </h2>

      <div className="mt-10 space-y-10">
        {experience.map((job) => (
          <article
            key={`${job.company}-${job.period}-${job.role}`}
            className="grid gap-3 border-t border-stone-200 pt-6 sm:grid-cols-[8rem_1fr] sm:gap-8 dark:border-stone-800"
          >
            <p className="font-mono text-xs leading-5 text-stone-500 dark:text-stone-400">
              {job.period}
            </p>

            <div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                {job.role}
              </h3>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                {job.company}
                {job.note ? (
                  <span className="text-stone-400 dark:text-stone-500">
                    {' '}
                    — {job.note}
                  </span>
                ) : null}
              </p>

              <ul className="mt-4 max-w-2xl space-y-2.5 text-sm leading-6 text-stone-600 dark:text-stone-400">
                {job.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span
                      className="mt-3 h-px w-3 shrink-0 bg-stone-300 dark:bg-stone-700"
                      aria-hidden="true"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 font-mono text-xs text-stone-500 dark:text-stone-400">
                {job.tech.join(' · ')}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
