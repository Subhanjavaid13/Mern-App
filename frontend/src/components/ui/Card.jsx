import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const PADDING = {
  none: '',
  sm: 'p-3.5',
  md: 'p-4 sm:p-5',
  lg: 'p-5 sm:p-6',
  xl: 'p-6 sm:p-8',
}

/**
 * Elevated surface. `hover` adds a subtle lift for clickable cards.
 *
 *   <Card padding="lg" hover>…</Card>
 */
const Card = forwardRef(function Card(
  { as: Component = 'div', hover = false, padding = 'md', className, children, ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn(
        'surface relative',
        hover &&
          'transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-base-content/20 hover:shadow-lift',
        PADDING[padding] ?? PADDING.md,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
})

export default Card
