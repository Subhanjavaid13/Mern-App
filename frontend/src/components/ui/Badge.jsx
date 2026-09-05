import { cn } from '../../utils/cn'

const TONES = {
  neutral: 'border-base-300/80 bg-base-200/80 text-base-content/70',
  primary: 'border-primary/15 bg-primary/10 text-primary',
  secondary: 'border-secondary/25 bg-secondary/15 text-base-content/80',
  accent: 'border-accent/25 bg-accent/15 text-base-content/80',
  success: 'border-success/20 bg-success/10 text-success',
  warning: 'border-warning/25 bg-warning/15 text-warning-content dark:text-warning',
  error: 'border-error/20 bg-error/10 text-error',
  outline: 'border-base-300 bg-transparent text-base-content/70',
}

const SIZES = {
  sm: 'px-2 py-0.5 text-[0.6875rem] gap-1',
  md: 'px-2 py-[3px] text-xs gap-1.5',
  lg: 'px-3 py-1.5 text-sm gap-2',
}

/**
 * Small pill for metadata and status.
 *
 *   <Badge tone="primary" icon={Clock}>2 min read</Badge>
 */
export default function Badge({
  tone = 'neutral',
  size = 'md',
  icon: Icon,
  dot = false,
  className,
  children,
  ...props
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full border font-medium leading-none',
        TONES[tone] ?? TONES.neutral,
        SIZES[size] ?? SIZES.md,
        className,
      )}
      {...props}
    >
      {dot && <span className="size-1.5 rounded-full bg-current opacity-70" aria-hidden="true" />}
      {Icon && <Icon className="size-3.5 shrink-0" aria-hidden="true" />}
      {children}
    </span>
  )
}
