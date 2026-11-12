import { useEffect, useRef, useState } from 'react'
import { navItems, profile } from '../data/portfolio'
import {
  ArrowUpRightIcon,
  CrossIcon,
  DocumentIcon,
  GitHubIcon,
  GridDotsIcon,
  LinkedInIcon,
  MailIcon,
} from './Icons'

export function Menu() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    function handleScroll() {
      setOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="section-menu"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        className="relative grid size-10 place-items-center rounded-xl border border-stone-200 text-stone-600 transition hover:border-stone-300 hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:border-stone-800 dark:text-slate-400 dark:hover:border-stone-700 dark:hover:bg-stone-800/60 dark:hover:text-white"
      >
        <GridDotsIcon
          className={`absolute size-4 transition-all duration-200 ${
            open ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
          }`}
        />
        <CrossIcon
          className={`absolute size-4 transition-all duration-200 ${
            open ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
        />
      </button>

      {open ? (
        <div
          id="section-menu"
          style={{
            animation:
              'dropdown-in 170ms cubic-bezier(0.23, 1, 0.32, 1) both',
          }}
          className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-2xl border border-stone-200/80 bg-white/90 p-1.5 shadow-xl shadow-stone-900/5 backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/90 dark:shadow-black/40"
        >
          <ul>
            {navItems.map((item, index) => (
              <li
                key={item.href}
                style={{
                  animation:
                    'dropdown-item-in 220ms cubic-bezier(0.23, 1, 0.32, 1) both',
                  animationDelay: `${40 + index * 25}ms`,
                }}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-[15px] font-medium text-stone-700 transition hover:bg-stone-100 hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:text-slate-200 dark:hover:bg-stone-800 dark:hover:text-white"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] font-normal text-stone-400 dark:text-stone-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </span>
                  <ArrowUpRightIcon className="size-3.5 shrink-0 text-stone-300 opacity-0 transition group-hover:opacity-100 dark:text-stone-600" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-1.5 flex items-center gap-1 border-t border-stone-200 px-1 pt-1.5 dark:border-stone-800">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="grid size-8 place-items-center rounded-lg text-stone-500 transition hover:bg-stone-100 hover:text-stone-900 dark:hover:bg-stone-800 dark:hover:text-white"
            >
              <GitHubIcon className="size-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="grid size-8 place-items-center rounded-lg text-stone-500 transition hover:bg-stone-100 hover:text-stone-900 dark:hover:bg-stone-800 dark:hover:text-white"
            >
              <LinkedInIcon className="size-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email Nikhil"
              className="grid size-8 place-items-center rounded-lg text-stone-500 transition hover:bg-stone-100 hover:text-stone-900 dark:hover:bg-stone-800 dark:hover:text-white"
            >
              <MailIcon className="size-4" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="Résumé"
              className="grid size-8 place-items-center rounded-lg text-stone-500 transition hover:bg-stone-100 hover:text-stone-900 dark:hover:bg-stone-800 dark:hover:text-white"
            >
              <DocumentIcon className="size-4" />
            </a>
            <span className="ml-auto pr-1 font-mono text-[10px] text-stone-400 dark:text-stone-500">
              Noida, IN
            </span>
          </div>
        </div>
      ) : null}
    </div>
  )
}
