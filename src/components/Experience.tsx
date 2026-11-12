import { Fragment, useState } from 'react'
import { experience } from '../data/portfolio'
import { ChevronIcon } from './Icons'
import { Section } from './Section'

function renderHighlight(text: string) {
  return text.split('**').map((part, index) =>
    index % 2 === 1 ? (
      <strong
        key={index}
        className="font-semibold text-stone-900 dark:text-stone-100"
      >
        {part}
      </strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  )
}

export function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <Section id="experience" label="Experience">
      <h2 className="font-serif text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
        From Linux agents to Android releases.
      </h2>

      <div className="mt-10 flex flex-col gap-4">
        {experience.map((job, index) => {
          const open = openIndex === index

          return (
            <article
              key={`${job.company}-${job.period}-${job.role}`}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white/60 transition-colors hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900/30 dark:hover:border-stone-700"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : index)}
                aria-expanded={open}
                className="flex w-full flex-col gap-4 p-5 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-stone-200 bg-stone-100 text-sm font-semibold text-stone-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200">
                    {job.mark}
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-stone-900 dark:text-stone-100">
                        {job.company}
                      </span>
                      <span className="rounded-md border border-stone-200 px-2 py-0.5 text-xs font-medium text-stone-500 dark:border-stone-700 dark:text-stone-400">
                        {job.type}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                      {job.role}
                    </p>
                    {job.note ? (
                      <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-500">
                        {job.note}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 text-xs text-stone-500 sm:flex-col sm:items-end sm:gap-1 sm:text-sm">
                  <span className="font-medium text-stone-700 dark:text-stone-200">
                    {job.period}
                  </span>
                  {job.location ? <span>{job.location}</span> : null}
                  <ChevronIcon
                    className={`size-4 shrink-0 transition-transform duration-300 ${
                      open ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-stone-200 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 dark:border-stone-800">
                    <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-stone-600 dark:text-stone-400">
                      {job.highlights.map((highlight) => (
                        <li key={highlight}>{renderHighlight(highlight)}</li>
                      ))}
                    </ul>
                    <p className="mt-4 font-mono text-xs text-stone-500 dark:text-stone-400">
                      {job.tech.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
