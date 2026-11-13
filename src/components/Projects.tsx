import { projects } from '../data/portfolio'
import { ArrowUpRightIcon } from './Icons'
import { Link } from '../lib/router'
import { Section } from './Section'

export function Projects() {
  return (
    <Section id="projects" label="Projects">
      <h2 className="font-serif text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
        Selected work
      </h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="group overflow-hidden rounded-2xl border border-stone-200 bg-white/60 transition hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900/30 dark:hover:border-stone-700"
          >
            <Link
              to={`/projects/${project.slug}`}
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              aria-label={`View ${project.title}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-900">
                {project.phones ? (
                  <div className="absolute inset-0 flex items-center justify-center gap-5 bg-linear-to-br from-[#16302d] via-[#0e1a19] to-[#0b1416]">
                    {project.phones.map((source, index) => (
                      <div
                        key={source}
                        className={`w-[27%] overflow-hidden rounded-[16px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.55)] transition-transform duration-500 ${
                          index === 0
                            ? '-rotate-3 -translate-y-1 group-hover:-translate-y-2'
                            : 'rotate-2 translate-y-2 group-hover:translate-y-1'
                        }`}
                      >
                        <img
                          src={source}
                          alt={`${project.title} screen ${index + 1}`}
                          loading="lazy"
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                )}
              </div>
            </Link>

            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                  {project.label}
                </span>
                {project.demo ? (
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    Live
                  </span>
                ) : null}
              </div>

              <h3 className="mt-2 font-serif text-xl text-stone-900 dark:text-stone-100">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-slate-400">
                {project.summary}
              </p>

              <Link
                to={`/projects/${project.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 transition hover:text-emerald-700 dark:text-stone-100 dark:hover:text-emerald-400"
              >
                View project
                <ArrowUpRightIcon className="size-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
