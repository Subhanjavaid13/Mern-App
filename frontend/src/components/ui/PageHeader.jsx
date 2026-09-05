import { cn } from '../../utils/cn'

/**
 * Page title block with optional eyebrow, description and right-aligned actions.
 *
 *   <PageHeader eyebrow="Fresh page" title="Write a new note" description="…" actions={<Button/>} />
 */
export default function PageHeader({ eyebrow, title, description, actions, className }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between animate-fade-up',
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            <span className="h-px w-6 bg-secondary/60" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-pretty text-base-content/65 sm:text-lg">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}
