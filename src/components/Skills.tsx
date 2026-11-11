import { skillGroups } from '../data/portfolio'
import { Section } from './Section'

export function Skills() {
  return (
    <Section id="skills" label="Skills">
      <h2 className="font-serif text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
        What I work with
      </h2>

      <dl className="mt-8 max-w-2xl divide-y divide-stone-200 border-t border-stone-200 dark:divide-stone-800 dark:border-stone-800">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-8"
          >
            <dt className="text-sm font-medium text-stone-900 dark:text-stone-200">
              {group.title}
            </dt>
            <dd className="text-sm leading-6 text-stone-600 dark:text-stone-400">
              {group.skills.join(', ')}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
