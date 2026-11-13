import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

export const THEME_EVENT = 'themechange'

export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  useEffect(() => {
    function handleChange(event: Event) {
      setTheme((event as CustomEvent<Theme>).detail)
    }

    window.addEventListener(THEME_EVENT, handleChange)
    return () => window.removeEventListener(THEME_EVENT, handleChange)
  }, [])

  return theme
}
