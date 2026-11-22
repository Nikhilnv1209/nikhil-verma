import { profile } from '../data/portfolio'
import { mailtoHref } from '../lib/contact'
import { useLiveStats } from '../lib/use-live-stats'
import {
  ChatIcon,
  DocumentIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from './Icons'
import { Menu } from './Menu'
import { Portrait } from './Portrait'
import { RollingIcon } from './RollingIcon'
import { StackIcons } from './StackIcons'
import { ThemeToggle } from './ThemeToggle'

// Used only until the live count arrives, or if the stats endpoint is down.
const FALLBACK_CONTRIBUTIONS = '295'

const socials = [
  { label: 'GitHub', href: profile.github, icon: GitHubIcon },
  { label: 'LinkedIn', href: profile.linkedin, icon: LinkedInIcon },
  { label: 'Résumé', href: '/resume.pdf', icon: DocumentIcon },
]

export function Hero() {
  const { contributions } = useLiveStats()

  const stats = [
    {
      value:
        contributions === null ? FALLBACK_CONTRIBUTIONS : String(contributions),
      label: 'contributions in the past year',
    },
    { value: '5+', label: 'major Android releases' },
    { value: '3+', label: 'years shipping software' },
  ]

  return (
    <section className="border-b border-stone-200 dark:border-stone-800">
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-10 sm:pt-14">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            <Portrait />
            <div>
              <h1 className="font-serif text-4xl font-normal tracking-tight text-stone-900 sm:text-5xl dark:text-stone-100">
                Nikhil Verma
              </h1>
              <p className="mt-1.5 text-base text-stone-600 dark:text-stone-400">
                Software Development Engineer at qikfox Cybersecurity Systems, Inc.
                · Noida, India
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-stone-500 dark:text-stone-400">
                {stats.map((stat) => (
                  <li key={stat.label}>
                    <span className="text-stone-900 dark:text-stone-100">
                      {stat.value}
                    </span>{' '}
                    {stat.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Menu />
            <ThemeToggle />
          </div>
        </div>

        <ul className="mt-9 space-y-2 text-base leading-7 text-stone-600 dark:text-stone-400">
          <li>
            I build{' '}
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              native AI interfaces for Linux
            </span>{' '}
            and agent tooling backed by audited MCP calls.
          </li>
          <li>
            I currently own{' '}
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              Android releases built on Chromium
            </span>{' '}
            and ship{' '}
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              full-stack developer tools
            </span>
            .
          </li>
        </ul>

        <p className="mt-7 max-w-xl font-serif text-xl leading-snug tracking-tight text-stone-700 dark:text-stone-300">
          “I care about clean systems, reliable releases, and developer
          experience.”
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="btn btn-primary"
          >
            <RollingIcon icon={ChatIcon} />
            Let's talk
          </a>
          <a
            href={mailtoHref()}
            className="btn btn-ghost"
          >
            <RollingIcon icon={MailIcon} />
            Email me
          </a>
        </div>

        <p className="mt-10 text-sm text-stone-500 dark:text-stone-400">
          Find me online
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-1.5 text-sm font-medium text-stone-600 transition hover:border-stone-300 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 dark:border-stone-800 dark:text-stone-300 dark:hover:border-stone-700 dark:hover:text-white"
            >
              <Icon className="size-4" />
              {label}
            </a>
          ))}
        </div>

        <p className="mt-12 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
          Tech stack
        </p>
        <div className="mt-4">
          <StackIcons />
        </div>
      </div>
    </section>
  )
}
