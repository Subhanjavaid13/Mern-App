import { useContext } from 'react'
import { RateLimitContext } from '../context/rateLimitContext'

/**
 * Global API rate-limit state.
 *
 *   const { limited, secondsLeft, total, subscribeReset, dismiss } = useRateLimit()
 */
export function useRateLimit() {
  const ctx = useContext(RateLimitContext)
  if (!ctx) throw new Error('useRateLimit must be used inside <RateLimitProvider>')
  return ctx
}

export default useRateLimit
