import { projects } from '../data/portfolio'
import { ArrowUpRightIcon, GitHubIcon } from './Icons'
import { Link } from '../lib/router'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Projects() {
  return (
    <Section id="projects" label="Projects">
      <h2 className="font-serif text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
        Selected work
      </h2>

      <div className="mt-9 flex flex-col gap-5">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 70}>
            <article className="card-surface group flex h-full flex-col overflow-hidden rounded-[14px]">
              {/* One media stage for every card. It is fixed at 16:10, and the
                  contents are fitted inside it — landscape shots at their own
                  ratio (they are 16:10, so it is an exact fit), device shots as
                  height-fitted frames using their own ratio. Nothing is ever
                  scaled to fill, so nothing gets cropped or stretched. */}
              <Link
                to={`/projects/${project.slug}`}
                aria-label={`View ${project.title}`}
                className="media-stage relative block aspect-[16/10] w-full shrink-0 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
              >
                {project.phones ? (
                  <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
                    {project.phones.map((source, phoneIndex) => (
                      <div
                        key={source}
                        style={{ aspectRatio: project.mediaAspect }}
                        className={`shrink-0 overflow-hidden rounded-[14px] border border-white/10 shadow-[0_22px_60px_-16px_rgba(0,0,0,0.85)] transition-transform duration-500 ease-out ${
                          phoneIndex === 0
                            ? 'relative z-10 h-[94%] -translate-y-1 -rotate-3 group-hover:-translate-y-2.5'
                            : '-ml-2 h-[84%] translate-y-2 rotate-1 group-hover:translate-y-1'
                        }`}
                      >
                        <img
                          src={source}
                          alt={`${project.title} screen ${phoneIndex + 1}`}
                          loading="lazy"
                          className="size-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="absolute inset-0 size-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                  />
                )}
              </Link>

              <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                    <span className="text-stone-400 dark:text-stone-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="mx-1.5 text-stone-300 dark:text-stone-600">
                      /
                    </span>
                    {project.label}
                  </span>
                  {project.demo ? (
                    <span className="shrink-0 rounded-full border border-accent-500/30 bg-accent-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent-700 dark:text-accent-300">
                      Live
                    </span>
                  ) : null}
                </div>

                <div className="mt-3 grid flex-1 gap-4 sm:gap-5 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-8">
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl text-stone-900 sm:text-2xl dark:text-stone-100">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
                      {project.summary}
                    </p>

                    <ul className="mt-3.5 space-y-1.5 border-t border-stone-200/80 pt-3.5 dark:border-stone-800/80">
                      {project.highlights.slice(0, 2).map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-2 text-[13px] leading-5 text-stone-600 dark:text-stone-400"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[7px] size-1 shrink-0 rounded-full bg-stone-300 dark:bg-stone-600"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:pt-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
                      Stack
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 5).map((item) => (
                        <span key={item} className="tech-pill">
                          {item}
                        </span>
                      ))}
                      {project.tech.length > 5 ? (
                        <span className="tech-pill" data-muted="true">
                          +{project.tech.length - 5}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-stone-200/80 pt-3.5 dark:border-stone-800/80">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 transition-colors hover:text-accent-700 dark:text-stone-100 dark:hover:text-accent-400"
                  >
                    View project
                    <ArrowUpRightIcon className="size-3.5 transition-transform duration-300 ease-out group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </Link>

                  <div className="flex shrink-0 items-center gap-1.5">
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} source on GitHub`}
                        className="icon-button"
                      >
                        <GitHubIcon className="size-4" />
                      </a>
                    ) : null}
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} live site`}
                        className="icon-button"
                      >
                        <ArrowUpRightIcon className="size-4" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
