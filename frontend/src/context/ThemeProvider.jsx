import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './themeContext'
import { STORAGE_KEYS, THEMES } from '../utils/constants'

const VALID = new Set(Object.values(THEMES))

function readInitialTheme() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEYS.THEME)
    if (VALID.has(saved)) return saved
  } catch {
    /* ignore */
  }
  const fromDocument = document.documentElement.getAttribute('data-theme')
  if (VALID.has(fromDocument)) return fromDocument
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT
}

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      window.localStorage.setItem(STORAGE_KEYS.THEME, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const setTheme = useCallback((next) => {
    if (VALID.has(next)) setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((t) => (t === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK))
  }, [])

  const value = useMemo(
    () => ({ theme, isDark: theme === THEMES.DARK, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
