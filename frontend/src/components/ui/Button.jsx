import { forwardRef } from 'react'
import { Link } from 'react-router'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'
import { BUTTON_SIZES, BUTTON_VARIANTS } from './buttonStyles'

const ICON_SIZES = {
  xs: 'size-3.5',
  sm: 'size-4',
  md: 'size-[1.125rem]',
  lg: 'size-5',
}

/**
 * Polymorphic button. Renders a <Link> when `to` is given, an <a> when `href`
 * is given, otherwise a <button>.
 *
 *   <Button leftIcon={Plus}>New note</Button>
 *   <Button variant="outline" to="/">Back</Button>
 *   <Button loading>Saving…</Button>
 */
const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    to,
    href,
    loading = false,
    disabled = false,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    fullWidth = false,
    className,
    children,
    type,
    ...props
  },
  ref,
) {
  const classes = cn(
    'btn gap-2 rounded-btn font-semibold normal-case tracking-[0.01em] transition-all duration-200',
    'active:scale-[0.98] disabled:opacity-60',
    BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.primary,
    BUTTON_SIZES[size] ?? BUTTON_SIZES.md,
    fullWidth && 'w-full',
    loading && 'pointer-events-none',
    !children && 'px-0 aspect-square',
    className,
  )

  const iconClass = cn(ICON_SIZES[size] ?? ICON_SIZES.md, 'shrink-0')

  const content = (
    <>
      {loading ? (
        <Loader2 className={cn(iconClass, 'animate-spin')} aria-hidden="true" />
      ) : (
        LeftIcon && <LeftIcon className={iconClass} aria-hidden="true" />
      )}
      {children != null && children !== false && <span>{children}</span>}
      {!loading && RightIcon && <RightIcon className={iconClass} aria-hidden="true" />}
    </>
  )

  if (to) {
    return (
      <Link
        ref={ref}
        to={to}
        className={cn(classes, disabled && 'btn-disabled pointer-events-none')}
        aria-disabled={disabled || loading || undefined}
        {...props}
      >
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {content}
    </button>
  )
})

export default Button
