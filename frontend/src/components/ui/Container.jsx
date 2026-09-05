import { cn } from '../../utils/cn'

const WIDTHS = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
}

/** Horizontal page gutter + max width. */
export default function Container({ as: Component = 'div', width = 'lg', className, children, ...props }) {
  return (
    <Component className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', WIDTHS[width] ?? WIDTHS.lg, className)} {...props}>
      {children}
    </Component>
  )
}
