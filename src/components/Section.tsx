import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  label: string
  children: ReactNode
}

export function Section({ id, label, children }: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-stone-200 dark:border-stone-800"
    >
      <div className="mx-auto grid max-w-5xl gap-5 px-6 py-16 sm:py-20 md:grid-cols-[8rem_1fr] md:items-baseline md:gap-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500 md:sticky md:top-24 md:h-fit dark:text-stone-400">
          {label}
        </p>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}
