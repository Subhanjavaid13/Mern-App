import { cn } from '../../utils/cn'

/**
 * Empty / not-found state with an icon, copy and actions.
 *
 *   <EmptyState icon={NotebookPen} title="No notes yet" description="…" action={<Button …/>} />
 */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  compact = false,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center px-6 text-center animate-fade-up',
        compact ? 'py-10' : 'py-14 sm:py-20',
        className,
      )}
    >
      {Icon && (
        <div className="mb-5 grid size-14 place-items-center rounded-2xl border border-base-300/80 bg-base-100 text-primary shadow-soft">
          <Icon className="size-7" strokeWidth={1.75} aria-hidden="true" />
        </div>
      )}

      <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-pretty text-sm text-base-content/65 sm:text-base">
          {description}
        </p>
      )}

      {(action || secondaryAction) && (
        <div className="mt-6 flex flex-col items-center gap-2.5 sm:flex-row">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  )
}
