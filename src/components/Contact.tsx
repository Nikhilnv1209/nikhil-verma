import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio'
import { emailAddress, mailtoHref } from '../lib/contact'
import {
  CheckIcon,
  CopyIcon,
  DocumentIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from './Icons'
import { Section } from './Section'

const elsewhere = [
  { label: 'LinkedIn', note: 'Work history', href: profile.linkedin, icon: LinkedInIcon },
  { label: 'GitHub', note: 'Source', href: profile.github, icon: GitHubIcon },
  { label: 'Résumé', note: 'PDF', href: '/resume.pdf', icon: DocumentIcon },
]

type CopyState = 'idle' | 'copied' | 'blocked'

export function Contact() {
  const [state, setState] = useState<CopyState>('idle')

  // The confirmation times out on its own; a failed copy stays put, because
  // that state is the fallback for reading the address by hand.
  useEffect(() => {
    if (state !== 'copied') return
    const timer = setTimeout(() => setState('idle'), 2600)
    return () => clearTimeout(timer)
  }, [state])

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(emailAddress())
      setState('copied')
    } catch {
      setState('blocked')
    }
  }

  return (
    <Section id="contact" label="Contact">
      <h2 className="max-w-xl font-serif text-3xl font-normal tracking-tight text-balance text-stone-900 sm:text-4xl dark:text-stone-100">
        Let's build something together.
      </h2>

      <p className="mt-5 max-w-xl text-base leading-7 text-stone-600 dark:text-stone-400">
        I'm happy to talk about Android, AI tooling, full-stack products, or a
        role you have in mind. Email reaches me fastest.
      </p>

      <div className="card-surface mt-8 rounded-2xl p-5 sm:p-6">
        <div className="grid gap-6 sm:grid-cols-[1.1fr_1fr] sm:gap-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
              Email
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  window.location.href = mailtoHref()
                }}
                className="btn btn-primary"
              >
                <MailIcon className="size-4" />
                Email me
              </button>
              <button
                type="button"
                onClick={copyAddress}
                className="btn btn-ghost"
              >
                {state === 'copied' ? (
                  <CheckIcon className="size-4 text-accent-600 dark:text-accent-400" />
                ) : (
                  <CopyIcon className="size-4" />
                )}
                {state === 'copied' ? 'Copied' : 'Copy address'}
              </button>
            </div>

            <div aria-live="polite" className="mt-4">
              {state === 'blocked' ? (
                <p className="font-mono text-[11px] break-all text-stone-600 dark:text-stone-300">
                  {emailAddress()}
                </p>
              ) : (
                <p className="font-mono text-[11px] text-stone-500 dark:text-stone-400">
                  {state === 'copied'
                    ? 'Copied to clipboard'
                    : `${profile.location} · IST, UTC+5:30`}
                </p>
              )}
            </div>
          </div>

          <div className="sm:border-l sm:border-stone-200 sm:pl-8 sm:dark:border-stone-800">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
              Elsewhere
            </p>

            <ul className="mt-3 space-y-0.5">
              {elsewhere.map(({ label, note, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group -mx-2 flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-stone-100 dark:hover:bg-white/[0.05]"
                  >
                    <Icon className="size-4 shrink-0 text-stone-400 transition group-hover:text-stone-700 dark:text-stone-500 dark:group-hover:text-stone-200" />
                    <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                      {label}
                    </span>
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-stone-400 dark:text-stone-500">
                      {note}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
