import { Coffee } from 'lucide-react'
import { cn } from '../../utils/cn'

const SIZES = { xs: 'loading-xs', sm: 'loading-sm', md: 'loading-md', lg: 'loading-lg' }

/** Inline spinner. */
export function Spinner({ size = 'md', className }) {
  return (
    <span
      className={cn('loading loading-spinner text-primary', SIZES[size] ?? SIZES.md, className)}
      role="status"
      aria-label="Loading"
    />
  )
}

/** Full-width loading block with a brewing-coffee illustration. */
export function PageLoader({ label = 'Brewing your notes…', className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-20 text-center', className)} role="status">
      <div className="relative">
        <span className="absolute -top-3 left-3 h-3 w-1 rounded-full bg-secondary/60 animate-steam" aria-hidden="true" />
        <span className="absolute -top-3 left-1/2 h-3 w-1 rounded-full bg-secondary/60 animate-steam [animation-delay:0.5s]" aria-hidden="true" />
        <span className="absolute -top-3 right-3 h-3 w-1 rounded-full bg-secondary/60 animate-steam [animation-delay:1s]" aria-hidden="true" />
        <div className="grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Coffee className="size-8" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-5 text-sm font-medium text-base-content/60">{label}</p>
    </div>
  )
}

export default Spinner
