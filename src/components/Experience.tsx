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

      <div className="mt-9 flex flex-col gap-5">
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
                  className="flex w-full flex-col gap-4 p-4 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:p-5"
                >
                  <div className="flex min-w-0 items-center gap-3.5">
                    <span className="logo-tile size-11 text-[13px] font-semibold sm:size-12">
                      {job.logo ? (
                        <img src={job.logo} alt="" aria-hidden="true" loading="lazy" />
                      ) : (
                        job.mark
                      )}
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-semibold tracking-tight text-stone-900 dark:text-stone-100">
                          {job.company}
                        </span>
                        <span className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[10.5px] font-medium text-stone-600 ring-1 ring-stone-900/5 dark:bg-stone-800 dark:text-stone-300 dark:ring-white/5">
                          {job.type}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-stone-600 dark:text-stone-400">
                        {job.role}
                      </p>
                      {job.note ? (
                        <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-500">
                          {job.note}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:shrink-0 sm:flex-col sm:items-end sm:gap-0.5">
                    <span className="flex items-center gap-1.5 text-[13px] font-medium tabular-nums text-stone-800 sm:text-sm dark:text-stone-100">
                      {current ? (
                        <span className="status-dot" aria-hidden="true" />
                      ) : null}
                      {job.period}
                    </span>
                    {job.location ? (
                      <span className="text-xs text-stone-500 sm:text-[13px] dark:text-stone-400">
                        {job.location}
                      </span>
                    ) : null}
                    <ChevronIcon
                      className={`size-[18px] shrink-0 text-stone-400 transition-transform duration-400 ease-out sm:mt-1 dark:text-stone-500 ${
                        open ? '' : 'rotate-180'
                      }`}
                    />
                  </div>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-hidden={!open}
                  inert={!open}
                  className="accordion"
                >
                  <div>
                    <div className="accordion-body border-t border-stone-200/80 px-4 pb-4 pt-3.5 sm:px-5 sm:pb-5 dark:border-stone-800/80">
                      <ul className="list-disc space-y-1.5 pl-4 text-sm leading-6 text-stone-600 marker:text-stone-400/70 dark:text-stone-400 dark:marker:text-stone-600">
                        {job.highlights.map((highlight) => (
                          <li key={highlight}>{renderHighlight(highlight)}</li>
                        ))}
                      </ul>

                      <div className="mt-3.5 flex flex-wrap gap-1.5">
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
