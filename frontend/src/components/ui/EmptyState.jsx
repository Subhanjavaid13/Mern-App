import { cn } from '../../utils/cn'

/**
 * Friendly empty / not-found state with an illustrated icon and actions.
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
        compact ? 'py-10' : 'py-16 sm:py-24',
        className,
      )}
    >
      {Icon && (
        <div className="relative mb-7">
          <div className="absolute inset-0 scale-150 rounded-full bg-secondary/25 blur-2xl" aria-hidden="true" />
          <div className="relative grid size-20 place-items-center rounded-[1.6rem] border border-base-300/80 bg-gradient-to-br from-base-100 to-base-200 shadow-soft animate-float">
            <Icon className="size-9 text-primary" strokeWidth={1.75} aria-hidden="true" />
          </div>
        </div>
      )}

      <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h3>
      {description && (
        <p className="mt-2.5 max-w-md text-pretty text-base-content/65">{description}</p>
      )}

      {(action || secondaryAction) && (
        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  )
}
