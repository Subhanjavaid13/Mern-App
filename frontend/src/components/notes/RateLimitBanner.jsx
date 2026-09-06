import { RefreshCw, ZapOff } from 'lucide-react'
import { useRateLimit } from '../../hooks/useRateLimit'
import Button from '../ui/Button'
import EmptyState from '../ui/EmptyState'

/**
 * Inline state for a page whose data could not load because of a 429.
 * The page retries automatically when the limit resets (see subscribeReset);
 * the button lets the user retry manually once the countdown is over.
 */
export default function RateLimitBanner({ onRetry, retrying = false }) {
  const { limited, secondsLeft } = useRateLimit()

  return (
    <EmptyState
      compact
      icon={ZapOff}
      title="Too many requests"
      description={
        limited
          ? `Your notes will load again automatically in ${secondsLeft}${secondsLeft === 1 ? ' second' : ' seconds'}.`
          : 'The limit has reset. You can load your notes again.'
      }
      action={
        <Button leftIcon={RefreshCw} onClick={onRetry} loading={retrying} disabled={limited}>
          {limited ? `Wait ${secondsLeft}s` : 'Try again'}
        </Button>
      }
    />
  )
}
