import { cn } from '../../utils/cn'

const POSITIONS = {
  top: 'tooltip-top',
  bottom: 'tooltip-bottom',
  left: 'tooltip-left',
  right: 'tooltip-right',
}

/**
 * Lightweight CSS tooltip (daisyUI). Wraps a single child.
 *
 *   <Tooltip label="Copy"><IconButton … /></Tooltip>
 */
export default function Tooltip({ label, position = 'top', className, children }) {
  if (!label) return children
  return (
    <span
      className={cn(
        'tooltip inline-flex before:rounded-lg before:px-2.5 before:py-1.5 before:text-xs before:font-medium before:shadow-lift',
        POSITIONS[position] ?? POSITIONS.top,
        className,
      )}
      data-tip={label}
    >
      {children}
    </span>
  )
}
