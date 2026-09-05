import { cn } from '../../utils/cn'
import { Skeleton } from './Skeleton'

/**
 * Compact metric tile used in the home hero.
 *
 *   <StatCard icon={Notebook} label="Notes" value={12} hint="+2 this week" />
 */
export default function StatCard({ icon: Icon, label, value, hint, loading = false, className }) {
  return (
    <div
      className={cn(
        'surface flex items-center gap-4 p-4 transition-colors hover:border-secondary/40',
        className,
      )}
    >
      {Icon && (
        <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-base-content/50">
          {label}
        </p>
        {loading ? (
          <Skeleton className="mt-1.5 h-6 w-20" />
        ) : (
          <p className="truncate font-display text-2xl font-semibold leading-tight tabular-nums">
            {value}
          </p>
        )}
        {hint && !loading && <p className="mt-0.5 truncate text-xs text-base-content/55">{hint}</p>}
      </div>
    </div>
  )
}
