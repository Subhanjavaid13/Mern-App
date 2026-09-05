import { RefreshCw, ZapOff } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'

/** Shown when the API answers 429 Too Many Requests. */
export default function RateLimitBanner({ onRetry, retrying = false }) {
  return (
    <Card padding="lg" className="overflow-hidden animate-fade-up">
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-warning/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-full bg-warning/30 blur-2xl" aria-hidden="true" />
          <div className="relative grid size-20 place-items-center rounded-[1.6rem] bg-warning/15 text-warning-content animate-float dark:text-warning">
            <ZapOff className="size-9" strokeWidth={1.75} aria-hidden="true" />
          </div>
        </div>

        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-warning-content/80 dark:text-warning">
            Easy there
          </p>
          <h3 className="mt-1.5 font-display text-2xl font-semibold tracking-tight">
            Slow down — the kettle's still boiling.
          </h3>
          <p className="mt-2 text-pretty text-base-content/65">
            You've made too many requests in a short time. Take a sip, wait a few seconds, then try
            again.
          </p>
        </div>

        <Button variant="outline" leftIcon={RefreshCw} onClick={onRetry} loading={retrying} className="shrink-0">
          Try again
        </Button>
      </div>
    </Card>
  )
}
