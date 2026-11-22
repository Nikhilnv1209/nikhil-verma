import { skillGroups } from '../data/portfolio'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Skills() {
  return (
    <Section id="skills" label="Skills">
      <h2 className="font-serif text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
        What I work with
      </h2>

      <div className="mt-8 grid gap-x-12 gap-y-6 sm:mt-9 sm:grid-cols-2 sm:gap-y-8">
        {skillGroups.map((group, index) => (
          <Reveal
            key={group.title}
            // Two columns read left to right, so the stagger follows the row.
            delay={(index % 2) * 70}
            className="border-t border-stone-200 pt-3.5 dark:border-stone-800"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                {group.title}
              </h3>
              <span
                aria-hidden="true"
                className="font-mono text-[10px] tabular-nums text-stone-400 dark:text-stone-500"
              >
                {String(group.skills.length).padStart(2, '0')}
              </span>
            </div>

            <ul className="mt-3 flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <li key={skill} data-size="md" className="tech-pill">
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
