import { RefreshCw, ZapOff } from 'lucide-react'
import Alert from '../ui/Alert'
import Button from '../ui/Button'

/** Shown when the API answers 429 Too Many Requests. */
export default function RateLimitBanner({ onRetry, retrying = false }) {
  return (
    <Alert
      tone="warning"
      icon={ZapOff}
      title="Too many requests"
      action={
        <Button size="sm" variant="outline" leftIcon={RefreshCw} onClick={onRetry} loading={retrying}>
          Try again
        </Button>
      }
    >
      You have sent a lot of requests in a short time. Wait a moment, then try again.
    </Alert>
  )
}
