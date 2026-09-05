import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const PADDING = {
  none: '',
  sm: 'p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
  xl: 'p-8 sm:p-10',
}

/**
 * Elevated surface. `hover` adds a lift-on-hover effect for clickable cards.
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
          'transition-all duration-300 ease-out hover:-translate-y-1 hover:border-secondary/50 hover:shadow-lift',
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
