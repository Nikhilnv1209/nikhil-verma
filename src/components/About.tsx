import { profile } from '../data/portfolio'
import { Section } from './Section'

const facts = [
  { label: 'Based in', value: profile.location },
  { label: 'Experience', value: '3+ years' },
  { label: 'Current role', value: 'SDE @ qikfox' },
  { label: 'Focus', value: 'Linux · Android · AI · Full-stack' },
]

export function About() {
  return (
    <Section id="about" label="About">
      <h2 className="max-w-xl font-serif text-3xl font-normal tracking-tight text-balance text-stone-900 sm:text-4xl dark:text-stone-100">
        Engineering across systems, mobile, and AI.
      </h2>

      <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-pretty text-stone-600 dark:text-stone-400">
        <p>
          I'm a Software Development Engineer at qikfox, where I own Android
          releases built on upstream Chromium and build AI-powered tools across
          the stack — including a native AI interface for Linux, agentic
          tooling, remote compute, billing, and audit systems.
        </p>
        <p>
          Over the last three years I've worked across C, Rust, Go, TypeScript,
          and Python — shipping more than five major Android versions and
          turning a Linux OS into an AI conversational interface with audited
          MCP tool calls. I've also led four-person teams across projects —
          giving guidance, unblocking work, and making sure their changes landed
          in live product paths. I enjoy owning problems end to end:
          architecture, implementation, release, and rollout.
        </p>
        <p>
          I care about clean systems, reliable releases, and developer
          experience. Whether it's a Chromium rebase, a RAG pipeline, or a
          billing ledger, I like making complex things feel simple.
        </p>
      </div>

      <dl className="mt-10 grid max-w-2xl gap-x-10 gap-y-4 text-sm sm:grid-cols-2">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="flex gap-4 border-t border-stone-200 pt-3 dark:border-stone-800"
          >
            <dt className="w-24 shrink-0 text-stone-500 dark:text-stone-400">
              {fact.label}
            </dt>
            <dd className="text-stone-900 dark:text-stone-200">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>

      <a
        href={`mailto:${profile.email}`}
        className="mt-8 inline-block text-sm font-medium text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 transition hover:decoration-emerald-700 dark:text-emerald-400 dark:decoration-emerald-400/30 dark:hover:decoration-emerald-400"
      >
        {profile.email}
      </a>
    </Section>
  )
}
