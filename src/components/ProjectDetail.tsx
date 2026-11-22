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
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-700 dark:text-accent-400"
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

        <div className="mt-10 flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-700 sm:text-xs dark:text-accent-400">
            <span className="text-stone-400 dark:text-stone-500">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="mx-1.5 text-stone-300 dark:text-stone-600">/</span>
            {project.label}
          </p>
          {project.demo ? (
            <span className="shrink-0 rounded-full border border-accent-500/30 bg-accent-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent-700 dark:text-accent-300">
              Live
            </span>
          ) : null}
        </div>

        <h1 className="mt-3 font-serif text-4xl font-normal tracking-tight text-stone-900 sm:text-6xl dark:text-stone-100">
          {project.title}
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-pretty text-stone-600 dark:text-stone-400">
          {project.description}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Live demo
              <ArrowUpRightIcon className="size-4" />
            </a>
          ) : null}
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            Source code
            <ArrowUpRightIcon className="size-4" />
          </a>
        </div>

        {/* The hero media paints immediately: it is the page's main content, and
            hiding it behind a scroll observer costs the largest paint. */}
        <div className="mt-12">
          <div className="media-stage overflow-hidden rounded-[14px] ring-1 ring-stone-900/10 dark:ring-white/10">
            {project.phones ? (
              <div className="mx-auto grid max-w-md grid-cols-2 gap-3 p-4 sm:max-w-xl sm:gap-6 sm:p-8">
                {project.phones.map((source, phoneIndex) => (
                  <div
                    key={source}
                    style={{ aspectRatio: project.mediaAspect }}
                    className="overflow-hidden rounded-[14px] border border-white/10 shadow-[0_22px_60px_-16px_rgba(0,0,0,0.85)]"
                  >
                    <img
                      src={source}
                      alt={`${project.title} screen ${phoneIndex + 1}`}
                      loading={phoneIndex === 0 ? 'eager' : 'lazy'}
                      className="size-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative aspect-[16/10] w-full">
                <img
                  src={project.image}
                  alt={project.title}
                  fetchPriority="high"
                  className="absolute inset-0 size-full object-contain"
                />
              </div>
            )}
          </div>

          {project.gallery?.map((source) => (
            <div
              key={source}
              className="media-stage mt-5 overflow-hidden rounded-[14px] ring-1 ring-stone-900/10 dark:ring-white/10"
            >
              <div className="relative aspect-[16/10] w-full">
                <img
                  src={source}
                  alt={`${project.title} interface`}
                  loading="lazy"
                  className="absolute inset-0 size-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-10 border-t border-stone-200 pt-10 md:grid-cols-[1fr_1.6fr] md:gap-16 dark:border-stone-800">
          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 sm:text-xs dark:text-stone-400">
              Stack
            </h2>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <li key={tech} className="tech-pill">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 sm:text-xs dark:text-stone-400">
              Highlights
            </h2>
            <ol className="mt-4 space-y-3">
              {project.highlights.map((highlight, position) => (
                <li key={highlight} className="flex gap-3.5">
                  <span
                    aria-hidden="true"
                    className="mt-1 font-mono text-[11px] tabular-nums text-stone-400 dark:text-stone-500"
                  >
                    {String(position + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm leading-6 text-stone-600 dark:text-stone-400">
                    {highlight}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <Link
          to={`/projects/${next.slug}`}
          className="card-surface group mt-16 flex items-center gap-4 rounded-[14px] p-3 sm:gap-5 sm:p-4"
        >
          {/* The tile takes the shape of what it holds, so the preview is
              never cropped: portrait for device shots, 16:10 for screenshots. */}
          <span
            className={`media-stage relative shrink-0 overflow-hidden rounded-[10px] ${
              next.phones ? 'aspect-[3/4] w-14 sm:w-20' : 'aspect-[16/10] w-24 sm:w-36'
            }`}
          >
            <img
              src={next.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 size-full object-contain p-1.5"
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
              Next project
            </span>
            <span className="mt-1 block truncate font-serif text-xl text-stone-900 sm:text-2xl dark:text-stone-100">
              {next.title}
            </span>
          </span>
          <ArrowUpRightIcon className="mr-1 size-4 shrink-0 text-stone-400 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-700 dark:group-hover:text-accent-400" />
        </Link>
      </main>
    </>
  )
}
