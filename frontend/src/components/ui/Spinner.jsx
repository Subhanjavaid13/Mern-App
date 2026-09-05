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

/** Full-width loading block. */
export function PageLoader({ label = 'Loading…', className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)} role="status">
      <Spinner size="lg" />
      <p className="mt-4 text-sm font-medium text-base-content/60">{label}</p>
    </div>
  )
}

export default Spinner
