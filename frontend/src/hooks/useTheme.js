import { useContext } from 'react'
import { ThemeContext } from '../context/themeContext'

/** Access the current theme ("latte" | "espresso") and toggle helpers. */
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}

export default useTheme
