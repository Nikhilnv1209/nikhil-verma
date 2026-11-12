import avatar from '../assets/avatar.svg?url'
import { profile } from '../data/portfolio'
import {
  ArrowUpRightIcon,
  ChatIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from './Icons'
import { StackIcons } from './StackIcons'

const stats = [
  { value: '283', label: 'contributions in the past year' },
  { value: '5+', label: 'Android major releases' },
  { value: '3+', label: 'years shipping software' },
]

const socials = [
  { label: 'GitHub', href: profile.github, icon: GitHubIcon },
  { label: 'LinkedIn', href: profile.linkedin, icon: LinkedInIcon },
  {
    label: 'Portfolio',
    href: 'https://nikhil-verma-in.vercel.app',
    icon: ArrowUpRightIcon,
  },
]

export function Hero() {
  return (
    <section className="border-b border-stone-200 dark:border-stone-800">
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-10 sm:pt-14">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
          <img
            src={avatar}
            alt=""
            className="size-24 shrink-0 rounded-2xl border border-stone-200 shadow-sm dark:border-stone-800"
          />
          <div>
            <h1 className="font-serif text-4xl font-normal tracking-tight text-stone-900 sm:text-5xl dark:text-stone-100">
              Nikhil Verma
            </h1>
            <p className="mt-1.5 text-base text-stone-600 dark:text-stone-400">
              Software Development Engineer at qikfox · Noida, India
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

        <ul className="mt-9 space-y-2 text-base leading-7 text-stone-600 dark:text-stone-400">
          <li>
            I build{' '}
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              native AI interfaces for Linux
            </span>{' '}
            and agent tooling with audited MCP calls.
          </li>
          <li>
            Currently owning{' '}
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              Android releases on Chromium
            </span>{' '}
            and shipping{' '}
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              full-stack developer tools
            </span>
            .
          </li>
        </ul>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200"
          >
            <ChatIcon className="size-4" />
            Let's talk
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:border-stone-700 dark:text-slate-200 dark:hover:bg-stone-800/60"
          >
            <MailIcon className="size-4" />
            Email me
          </a>
        </div>

        <p className="mt-10 text-sm text-stone-500 dark:text-stone-400">
          Here are my socials and work
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-1.5 text-sm font-medium text-stone-600 transition hover:border-stone-300 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:border-stone-800 dark:text-slate-300 dark:hover:border-stone-700 dark:hover:text-white"
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
