/** Shared class maps for <Button> and <IconButton>. */
export const BUTTON_VARIANTS = {
  primary:
    'btn-primary border-primary shadow-soft hover:shadow-lift hover:brightness-105',
  secondary: 'btn-secondary border-secondary shadow-soft hover:brightness-105',
  soft: 'border-transparent bg-primary/10 text-primary hover:border-transparent hover:bg-primary/[0.16]',
  outline:
    'border-base-300 bg-base-100 text-base-content hover:border-secondary/60 hover:bg-base-200/70',
  ghost: 'btn-ghost text-base-content/80 hover:bg-base-content/[0.06] hover:text-base-content',
  danger: 'btn-error border-error text-error-content shadow-soft',
  'danger-soft':
    'border-transparent bg-error/10 text-error hover:border-transparent hover:bg-error/[0.16]',
  link: 'btn-link h-auto min-h-0 px-0 text-primary no-underline hover:underline',
}

export const BUTTON_SIZES = {
  xs: 'btn-xs text-xs',
  sm: 'btn-sm text-sm',
  md: 'text-sm',
  lg: 'btn-lg text-base',
}
