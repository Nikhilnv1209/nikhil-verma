import { projects } from '../data/portfolio'
import { ArrowUpRightIcon } from './Icons'
import { Link } from '../lib/router'
import { Menu } from './Menu'
import { ThemeToggle } from './ThemeToggle'

export function ProjectDetail({ slug }: { slug: string }) {
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return (
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500">
          404
        </p>
        <h1 className="mt-3 font-serif text-4xl text-stone-900 dark:text-stone-100">
          Project not found
        </h1>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400"
        >
          Back to home
          <ArrowUpRightIcon className="size-3.5" />
        </Link>
      </div>
    )
  }

  const index = projects.findIndex((item) => item.slug === slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-stone-50/85 backdrop-blur-md dark:border-stone-800/70 dark:bg-stone-950/85">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
          <Link
            to="/"
            className="font-serif text-lg tracking-tight text-stone-900 dark:text-stone-100"
          >
            Nikhil Verma
          </Link>
          <div className="flex items-center gap-2">
            <Menu />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:pt-14">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-stone-500 transition hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
      >
        <ArrowUpRightIcon className="size-3.5 rotate-[-135deg]" />
        Back to home
      </Link>

      <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
        {project.label}
      </p>

      <h1 className="mt-3 font-serif text-4xl font-normal tracking-tight text-stone-900 sm:text-6xl dark:text-stone-100">
        {project.title}
      </h1>

      <p className="mt-5 max-w-2xl text-lg leading-8 text-pretty text-stone-600 dark:text-slate-400">
        {project.description}
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-700 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200"
          >
            Live demo
            <ArrowUpRightIcon className="size-4" />
          </a>
        ) : null}
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-100 dark:border-stone-700 dark:text-slate-200 dark:hover:bg-stone-800/60"
        >
          Source code
          <ArrowUpRightIcon className="size-4" />
        </a>
      </div>

      {project.phones ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {project.phones.map((source, index) => (
            <div
              key={source}
              className="overflow-hidden rounded-[20px] border border-stone-200 bg-stone-900 shadow-xl shadow-stone-900/20 dark:border-stone-800"
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
        <>
          <img
            src={project.image}
            alt={project.title}
            className="mt-12 w-full rounded-2xl border border-stone-200 object-cover dark:border-stone-800"
          />

          {project.gallery?.map((source) => (
            <img
              key={source}
              src={source}
              alt={`${project.title} interface`}
              loading="lazy"
              className="mt-6 w-full rounded-2xl border border-stone-200 object-cover dark:border-stone-800"
            />
          ))}
        </>
      )}

      <div className="mt-16 grid gap-10 border-t border-stone-200 pt-10 md:grid-cols-[1fr_1.4fr] md:gap-16 dark:border-stone-800">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
            Stack
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-lg bg-stone-100 px-2.5 py-1.5 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
            Highlights
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm leading-6 text-stone-600 dark:text-slate-400">
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
        </div>
      </div>

      <Link
        to={`/projects/${next.slug}`}
        className="group mt-16 flex items-center justify-between gap-6 border-t border-stone-200 pt-8 dark:border-stone-800"
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
          Next project
        </span>
        <span className="inline-flex items-center gap-2 font-serif text-2xl text-stone-900 transition group-hover:text-emerald-700 dark:text-stone-100 dark:group-hover:text-emerald-400">
          {next.title}
          <ArrowUpRightIcon className="size-5" />
        </span>
      </Link>
      </main>
    </>
  )
}
