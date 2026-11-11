import { profile } from '../data/portfolio'

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-stone-200 dark:border-stone-800">
      <div className="mx-auto max-w-5xl px-6 py-8 text-xs text-stone-500 dark:text-stone-400">
        <p>
          © {currentYear} {profile.name}
        </p>
      </div>
    </footer>
  )
}
