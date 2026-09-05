import { cn } from '../../utils/cn'

/**
 * Page title block with optional eyebrow, description and right-aligned actions.
 *
 *   <PageHeader eyebrow="New" title="Write a new note" description="…" actions={<Button/>} />
 */
export default function PageHeader({ eyebrow, title, description, actions, className }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-fade-up',
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary/80">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-pretty text-sm text-base-content/65 sm:text-base">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}
