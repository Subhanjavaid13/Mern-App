import { useEffect, useState } from 'react'

/**
 * useState that mirrors its value into localStorage.
 * Safe in private windows and SSR (falls back to in-memory state).
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw !== null ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage unavailable — keep in-memory state only */
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
