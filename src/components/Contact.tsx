import { profile } from '../data/portfolio'
import { ArrowUpRightIcon } from './Icons'
import { Section } from './Section'

export function Contact() {
  return (
    <Section id="contact" label="Contact">
      <h2 className="max-w-xl font-serif text-3xl font-normal tracking-tight text-balance text-stone-900 sm:text-4xl dark:text-stone-100">
        Let's build something together.
      </h2>

      <p className="mt-5 max-w-xl text-base leading-7 text-stone-600 dark:text-stone-400">
        I'm always happy to talk about Android, AI tooling, full-stack products,
        or a role you have in mind.
      </p>

      <a
        href={`mailto:${profile.email}`}
        className="mt-8 inline-flex items-baseline gap-2 border-b border-stone-300 pb-1 font-serif text-lg text-stone-900 transition hover:border-emerald-600 sm:text-2xl dark:border-stone-700 dark:text-stone-100 dark:hover:border-emerald-400"
      >
        <span className="break-all">{profile.email}</span>
        <ArrowUpRightIcon className="size-4 shrink-0" />
      </a>

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600 dark:text-stone-400">
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-stone-950 dark:hover:text-stone-100"
        >
          LinkedIn
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-stone-950 dark:hover:text-stone-100"
        >
          GitHub
        </a>
        <span>{profile.location}</span>
      </div>
    </Section>
  )
}
