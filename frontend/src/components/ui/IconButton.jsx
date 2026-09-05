import { forwardRef } from 'react'
import { Link } from 'react-router'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'
import { BUTTON_VARIANTS } from './buttonStyles'
import Tooltip from './Tooltip'

const SIZES = {
  xs: { btn: 'btn-xs size-7 min-h-0', icon: 'size-3.5' },
  sm: { btn: 'btn-sm size-9 min-h-0', icon: 'size-4' },
  md: { btn: 'size-11 min-h-0', icon: 'size-5' },
  lg: { btn: 'size-14 min-h-0', icon: 'size-6' },
}

/**
 * Circular icon-only button with an accessible label and optional tooltip.
 *
 *   <IconButton icon={Trash2} label="Delete note" variant="danger-soft" />
 */
const IconButton = forwardRef(function IconButton(
  {
    icon: Icon,
    label,
    size = 'md',
    variant = 'ghost',
    to,
    loading = false,
    tooltip = true,
    tooltipPosition = 'bottom',
    className,
    ...props
  },
  ref,
) {
  const s = SIZES[size] ?? SIZES.md
  const classes = cn(
    'btn btn-circle shrink-0 border transition-all duration-200 active:scale-95',
    BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.ghost,
    s.btn,
    className,
  )

  const inner = loading ? (
    <Loader2 className={cn(s.icon, 'animate-spin')} aria-hidden="true" />
  ) : (
    <Icon className={s.icon} aria-hidden="true" />
  )

  const element = to ? (
    <Link ref={ref} to={to} className={classes} aria-label={label} {...props}>
      {inner}
    </Link>
  ) : (
    <button
      ref={ref}
      type="button"
      className={classes}
      aria-label={label}
      disabled={loading || props.disabled}
      {...props}
    >
      {inner}
    </button>
  )

  if (!tooltip || !label) return element
  return (
    <Tooltip label={label} position={tooltipPosition}>
      {element}
    </Tooltip>
  )
})

export default IconButton
