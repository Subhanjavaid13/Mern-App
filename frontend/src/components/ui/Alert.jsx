import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react'
import { cn } from '../../utils/cn'
import IconButton from './IconButton'

const TONES = {
  info: { icon: Info, box: 'border-info/30 bg-info/10', icon_: 'bg-info/15 text-info' },
  success: { icon: CircleCheck, box: 'border-success/30 bg-success/10', icon_: 'bg-success/15 text-success' },
  warning: {
    icon: TriangleAlert,
    box: 'border-warning/40 bg-warning/10',
    icon_: 'bg-warning/20 text-warning-content dark:text-warning',
  },
  error: { icon: CircleAlert, box: 'border-error/30 bg-error/10', icon_: 'bg-error/15 text-error' },
}

/**
 * Inline notice with icon, title, body and optional action / dismiss.
 *
 *   <Alert tone="warning" title="Slow down" action={<Button size="sm">Retry</Button>}>…</Alert>
 */
export default function Alert({
  tone = 'info',
  icon,
  title,
  action,
  onDismiss,
  className,
  children,
}) {
  const t = TONES[tone] ?? TONES.info
  const Icon = icon ?? t.icon

  return (
    <div
      role={tone === 'error' || tone === 'warning' ? 'alert' : 'status'}
      className={cn(
        'flex items-start gap-4 rounded-2xl border p-4 sm:p-5 animate-fade-up',
        t.box,
        className,
      )}
    >
      <div className={cn('grid size-10 shrink-0 place-items-center rounded-xl', t.icon_)}>
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold leading-snug">{title}</p>}
        {children && <div className="mt-1 text-sm leading-relaxed text-base-content/70">{children}</div>}
        {action && <div className="mt-3">{action}</div>}
      </div>
      {onDismiss && (
        <IconButton icon={X} label="Dismiss" size="sm" tooltip={false} onClick={onDismiss} className="-mr-1 -mt-1" />
      )}
    </div>
  )
}
