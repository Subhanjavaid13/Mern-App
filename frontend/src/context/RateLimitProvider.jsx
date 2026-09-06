import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { onRateLimited } from '../lib/http'
import { RateLimitContext } from './rateLimitContext'

/**
 * Tracks the API rate limit for the whole app.
 *
 * Whenever any request gets a 429, the HTTP layer broadcasts `retryAfter`
 * (seconds). This provider turns that into a live countdown that the global
 * notice, forms and pages can read, and notifies subscribers when the wait
 * is over so failed page loads can retry automatically.
 */
export default function RateLimitProvider({ children }) {
  const [until, setUntil] = useState(null) // ms timestamp when requests are allowed again
  const [total, setTotal] = useState(0) // seconds in the current wait (for the progress bar)
  const [now, setNow] = useState(0)
  const resetListeners = useRef(new Set())

  /* Listen for 429s from the HTTP layer */
  useEffect(
    () =>
      onRateLimited(({ retryAfter }) => {
        const current = Date.now()
        setNow(current)
        setTotal(retryAfter)
        setUntil(current + retryAfter * 1000)
      }),
    [],
  )

  /* Tick the countdown while limited; fire reset listeners when it ends */
  useEffect(() => {
    if (!until) return undefined
    const id = window.setInterval(() => {
      const current = Date.now()
      if (current >= until) {
        window.clearInterval(id)
        setUntil(null)
        resetListeners.current.forEach((listener) => listener())
      } else {
        setNow(current)
      }
    }, 250)
    return () => window.clearInterval(id)
  }, [until])

  /** Run `listener` once the current limit window ends. Returns an unsubscribe. */
  const subscribeReset = useCallback((listener) => {
    resetListeners.current.add(listener)
    return () => resetListeners.current.delete(listener)
  }, [])

  const dismiss = useCallback(() => setUntil(null), [])

  const secondsLeft = until ? Math.max(0, Math.ceil((until - now) / 1000)) : 0

  const value = useMemo(
    () => ({ limited: until !== null, secondsLeft, total, subscribeReset, dismiss }),
    [until, secondsLeft, total, subscribeReset, dismiss],
  )

  return <RateLimitContext.Provider value={value}>{children}</RateLimitContext.Provider>
}
