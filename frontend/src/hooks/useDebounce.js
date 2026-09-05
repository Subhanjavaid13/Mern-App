import { useEffect, useState } from 'react'

/** Returns `value` after it has stopped changing for `delay` ms. */
export function useDebounce(value, delay = 250) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(id)
  }, [value, delay])

  return debounced
}

export default useDebounce
