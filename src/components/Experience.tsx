import { Fragment, useState } from 'react'
import { experience } from '../data/portfolio'
import { ChevronIcon } from './Icons'
import { Reveal } from './Reveal'
import { Section } from './Section'

function renderHighlight(text: string) {
  return text.split('**').map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="highlight">
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

      <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:gap-5">
        {experience.map((job, index) => {
          const open = openIndex === index
          const current = job.period.includes('Present')
          const panelId = `experience-panel-${index}`

          return (
            <Reveal key={`${job.company}-${job.period}-${job.role}`} delay={index * 70}>
              <article
                data-open={open}
                className="card-surface overflow-hidden rounded-[14px]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="relative flex w-full items-start gap-3 p-3.5 text-left sm:items-center sm:gap-5 sm:p-5"
                >
                  <span className="logo-tile size-10 text-xs font-semibold sm:size-12 sm:text-[13px]">
                    {job.logo ? (
                      <img src={job.logo} alt="" aria-hidden="true" loading="lazy" />
                    ) : (
                      job.mark
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pr-7 sm:pr-0">
                      <span className="text-[15px] font-semibold tracking-tight text-stone-900 sm:text-base dark:text-stone-100">
                        {job.company}
                      </span>
                      <span className="hidden rounded-md bg-stone-100 px-1.5 py-0.5 text-[10.5px] font-medium text-stone-600 ring-1 ring-stone-900/5 sm:inline-block dark:bg-stone-800 dark:text-stone-300 dark:ring-white/5">
                        {job.type}
                      </span>
                    </div>

                    <p className="mt-0.5 text-[13px] leading-5 text-stone-600 sm:text-sm dark:text-stone-400">
                      {job.role}
                    </p>

                    {/* On phones the period, place and employment share one
                        line instead of each taking a row of its own. */}
                    <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs leading-4 text-stone-500 sm:hidden dark:text-stone-400">
                      <span className="flex items-center gap-1.5 font-medium tabular-nums text-stone-700 dark:text-stone-200">
                        {current ? (
                          <span className="status-dot" aria-hidden="true" />
                        ) : null}
                        {job.period}
                      </span>
                      {job.location ? (
                        <>
                          <span
                            aria-hidden="true"
                            className="text-stone-300 dark:text-stone-600"
                          >
                            ·
                          </span>
                          <span>{job.location}</span>
                        </>
                      ) : null}
                      {job.type ? (
                        <>
                          <span
                            aria-hidden="true"
                            className="text-stone-300 dark:text-stone-600"
                          >
                            ·
                          </span>
                          <span>{job.type}</span>
                        </>
                      ) : null}
                    </div>

                    {job.note ? (
                      <p className="mt-0.5 hidden text-xs text-stone-500 sm:block dark:text-stone-500">
                        {job.note}
                      </p>
                    ) : null}
                  </div>

                  <div className="hidden shrink-0 flex-col items-end gap-0.5 sm:flex">
                    <span className="flex items-center gap-1.5 text-sm font-medium tabular-nums text-stone-800 dark:text-stone-100">
                      {current ? (
                        <span className="status-dot" aria-hidden="true" />
                      ) : null}
                      {job.period}
                    </span>
                    {job.location ? (
                      <span className="text-[13px] text-stone-500 dark:text-stone-400">
                        {job.location}
                      </span>
                    ) : null}
                    <ChevronIcon
                      className={`mt-1 size-[18px] shrink-0 text-stone-400 transition-transform duration-400 ease-out dark:text-stone-500 ${
                        open ? '' : 'rotate-180'
                      }`}
                    />
                  </div>

                  <ChevronIcon
                    className={`absolute right-3.5 top-4 size-4 shrink-0 text-stone-400 transition-transform duration-400 ease-out sm:hidden dark:text-stone-500 ${
                      open ? '' : 'rotate-180'
                    }`}
                  />
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-hidden={!open}
                  inert={!open}
                  className="accordion"
                >
                  <div>
                    <div className="accordion-body border-t border-stone-200/80 px-3.5 pt-3 pb-3.5 sm:px-5 sm:pt-4 sm:pb-5 dark:border-stone-800/80">
                      {job.note ? (
                        <p className="mb-2.5 text-xs text-stone-500 sm:hidden dark:text-stone-500">
                          {job.note}
                        </p>
                      ) : null}

                      <ul className="list-disc space-y-1.5 pl-4 text-[13px] leading-[1.4rem] text-stone-600 marker:text-stone-400/70 sm:text-sm sm:leading-6 dark:text-stone-400 dark:marker:text-stone-600">
                        {job.highlights.map((highlight) => (
                          <li key={highlight}>{renderHighlight(highlight)}</li>
                        ))}
                      </ul>

                      <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-3.5">
                        {job.tech.map((item) => (
                          <span key={item} className="tech-pill">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
