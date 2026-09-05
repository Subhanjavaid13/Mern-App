import { cn } from '../../utils/cn'
import { Skeleton } from './Skeleton'

/**
 * Compact metric tile.
 *
 *   <StatCard icon={Notebook} label="Notes" value={12} hint="Updated today" />
 */
export default function StatCard({ icon: Icon, label, value, hint, loading = false, className }) {
  return (
    <div className={cn('surface flex items-center gap-3 p-3.5', className)}>
      {Icon && (
        <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" aria-hidden="true" />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-base-content/50">
          {label}
        </p>
        {loading ? (
          <Skeleton className="mt-1 h-5 w-16" />
        ) : (
          <p className="truncate font-display text-xl font-bold leading-tight tabular-nums">{value}</p>
        )}
        {hint && !loading && <p className="mt-0.5 truncate text-xs text-base-content/55">{hint}</p>}
      </div>
    </div>
  )
}
