import { useState } from 'react'
import { navItems, profile } from '../data/portfolio'
import { GitHubIcon, LinkedInIcon, MenuIcon, XIcon } from './Icons'
import { ThemeToggle } from './ThemeToggle'

const iconLink =
  'grid size-9 place-items-center rounded-md text-stone-500 transition hover:bg-stone-200/60 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:text-stone-400 dark:hover:bg-stone-800/60 dark:hover:text-stone-100'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-stone-50/85 backdrop-blur-md dark:border-stone-800/70 dark:bg-stone-950/85">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
        <a
          href="#top"
          aria-label="Nikhil Verma — home"
          className="font-serif text-lg tracking-tight text-stone-900 dark:text-stone-100"
        >
          Nikhil Verma
        </a>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-stone-600 transition hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className={`${iconLink} hidden sm:grid`}
          >
            <GitHubIcon className="size-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className={`${iconLink} hidden sm:grid`}
          >
            <LinkedInIcon className="size-4" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className={`${iconLink} md:hidden`}
          >
            {menuOpen ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-stone-200 md:hidden dark:border-stone-800"
        >
          <nav
            className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-3"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-stone-600 transition hover:bg-stone-200/60 hover:text-stone-950 dark:text-stone-400 dark:hover:bg-stone-800/60 dark:hover:text-stone-100"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-1 border-t border-stone-200 pt-3 dark:border-stone-800">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className={iconLink}
              >
                <GitHubIcon className="size-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className={iconLink}
              >
                <LinkedInIcon className="size-4" />
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
