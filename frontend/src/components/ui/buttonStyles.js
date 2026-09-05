/** Shared class maps for <Button> and <IconButton>. */
export const BUTTON_VARIANTS = {
  primary: 'btn-primary border-primary text-primary-content hover:border-primary',
  secondary: 'btn-secondary border-secondary',
  soft: 'border-transparent bg-primary/15 text-base-content hover:border-transparent hover:bg-primary/25',
  outline:
    'border-base-300 bg-base-100 text-base-content hover:border-base-content/25 hover:bg-base-200/70',
  ghost: 'btn-ghost text-base-content/75 hover:bg-base-content/[0.06] hover:text-base-content',
  danger: 'btn-error border-error text-error-content hover:border-error',
  'danger-soft':
    'border-transparent bg-error/10 text-error hover:border-transparent hover:bg-error/[0.16]',
  link: 'btn-link h-auto min-h-0 px-0 text-primary no-underline hover:underline',
}

/** Compact heights: 32 / 36 / 40 / 44 px */
export const BUTTON_SIZES = {
  xs: 'h-8 min-h-0 px-2.5 text-xs',
  sm: 'h-9 min-h-0 px-3 text-sm',
  md: 'h-10 min-h-0 px-4 text-sm',
  lg: 'h-11 min-h-0 px-5 text-[0.9375rem]',
}
