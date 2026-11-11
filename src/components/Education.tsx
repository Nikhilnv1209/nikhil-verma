import { education } from '../data/portfolio'
import { Section } from './Section'

export function Education() {
  return (
    <Section id="education" label="Education">
      <h2 className="font-serif text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
        Academic background
      </h2>

      <div className="mt-8 max-w-2xl space-y-6">
        {education.map((item) => (
          <article
            key={item.degree}
            className="grid gap-2 border-t border-stone-200 pt-5 sm:grid-cols-[8rem_1fr] sm:gap-8 dark:border-stone-800"
          >
            <p className="font-mono text-xs leading-5 text-stone-500 dark:text-stone-400">
              {item.period}
            </p>
            <div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                {item.degree}
              </h3>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                {item.school}
              </p>
              <p className="mt-1 font-mono text-xs text-stone-500 dark:text-stone-400">
                {item.score}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
