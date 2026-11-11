import { projects } from '../data/portfolio'
import { ArrowUpRightIcon } from './Icons'
import { Section } from './Section'

export function Projects() {
  return (
    <Section id="projects" label="Projects">
      <h2 className="font-serif text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
        Selected work
      </h2>

      <div className="mt-8 space-y-10">
        {projects.map((project) => (
          <article
            key={project.title}
            className="border-t border-stone-200 pt-6 dark:border-stone-800"
          >
            {project.label ? (
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                {project.label}
              </p>
            ) : null}

            <div
              className={`flex flex-wrap items-baseline justify-between gap-3 ${
                project.label ? 'mt-2' : ''
              }`}
            >
              <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100">
                {project.title}
              </h3>
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 transition hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    Live demo
                    <ArrowUpRightIcon className="size-3.5" />
                  </a>
                ) : null}
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 transition hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100"
                >
                  GitHub
                  <ArrowUpRightIcon className="size-3.5" />
                </a>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600 dark:text-stone-400">
              {project.description}
            </p>

            <ul className="mt-5 max-w-2xl space-y-2.5 text-sm leading-6 text-stone-600 dark:text-stone-400">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span
                    className="mt-3 h-px w-3 shrink-0 bg-stone-300 dark:bg-stone-700"
                    aria-hidden="true"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 font-mono text-xs text-stone-500 dark:text-stone-400">
              {project.tech.join(' · ')}
            </p>
          </article>
        ))}
      </div>

      <a
        href="https://github.com/Nikhilnv1209"
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 transition hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100"
      >
        More on GitHub
        <ArrowUpRightIcon className="size-3.5" />
      </a>
    </Section>
  )
}
