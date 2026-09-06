import { X, ZapOff } from 'lucide-react'
import { useRateLimit } from '../../hooks/useRateLimit'
import Container from '../ui/Container'
import IconButton from '../ui/IconButton'

/**
 * Slim app-wide strip shown under the navbar whenever any request was rate
 * limited. Counts down until requests are allowed again, then disappears.
 */
export default function RateLimitNotice() {
  const { limited, secondsLeft, total, dismiss } = useRateLimit()
  if (!limited) return null

  const progress = total ? Math.max(0, Math.min(100, (secondsLeft / total) * 100)) : 0

  return (
    <div
      role="status"
      aria-live="polite"
      className="sticky top-14 z-30 border-b border-warning/40 bg-warning/15 backdrop-blur-xl animate-fade-in"
    >
      <Container className="flex items-center gap-3 py-2 text-sm">
        <ZapOff className="size-4 shrink-0 text-warning-content dark:text-warning" aria-hidden="true" />
        <p className="min-w-0 flex-1 truncate">
          <span className="font-semibold">Too many requests.</span>{' '}
          <span className="text-base-content/70">
            You can try again in {secondsLeft}
            {secondsLeft === 1 ? ' second' : ' seconds'}.
          </span>
        </p>
        <IconButton icon={X} label="Dismiss" size="xs" tooltip={false} onClick={dismiss} />
      </Container>
      <div className="h-0.5 w-full bg-warning/20" aria-hidden="true">
        <div
          className="h-full bg-warning transition-[width] duration-300 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
