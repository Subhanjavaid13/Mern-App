import { cn } from '../../utils/cn'

/** Shimmering placeholder block. */
export function Skeleton({ className, ...props }) {
  return <div className={cn('skeleton rounded-lg bg-base-300/60', className)} aria-hidden="true" {...props} />
}

/** Several text-line placeholders with natural-looking widths. */
export function SkeletonText({ lines = 3, className }) {
  const widths = ['w-full', 'w-11/12', 'w-4/5', 'w-2/3', 'w-3/5']
  return (
    <div className={cn('space-y-2.5', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn('h-3.5', widths[i % widths.length])} />
      ))}
    </div>
  )
}

export default Skeleton
