import { forwardRef, useId } from 'react'
import { cn } from '../../utils/cn'

const VARIANTS = {
  bordered:
    'input input-bordered h-10 min-h-0 rounded-btn border-base-300 bg-base-100 px-3.5 text-sm focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/15',
  ghost: 'w-full border-0 bg-transparent px-0 focus:outline-none focus:ring-0',
}

/**
 * Text input with label, hint, error, optional left icon and right slot.
 *
 *   <Input label="Title" placeholder="…" leftIcon={Type} error={errors.title} />
 */
const Input = forwardRef(function Input(
  {
    label,
    hint,
    error,
    leftIcon: LeftIcon,
    rightSlot,
    id,
    variant = 'bordered',
    className,
    inputClassName,
    ...props
  },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId
  const messageId = `${inputId}-message`
  const message = error || hint

  return (
    <div className={cn('form-control w-full', className)}>
      {label && (
        <label htmlFor={inputId} className="label pb-1 pt-0">
          <span className="label-text text-sm font-medium text-base-content/80">{label}</span>
        </label>
      )}

      <div className="relative">
        {LeftIcon && (
          <LeftIcon
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-base-content/40"
            aria-hidden="true"
          />
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full text-base-content placeholder:text-base-content/40 transition-[border-color,box-shadow] duration-150',
            VARIANTS[variant] ?? VARIANTS.bordered,
            LeftIcon && 'pl-9',
            rightSlot && 'pr-11',
            error && 'border-error focus:border-error focus:ring-error/15',
            inputClassName,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          {...props}
        />
        {rightSlot && (
          <div className="absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center gap-1">
            {rightSlot}
          </div>
        )}
      </div>

      {message && (
        <p
          id={messageId}
          className={cn('mt-1 text-xs', error ? 'text-error' : 'text-base-content/55')}
          role={error ? 'alert' : undefined}
        >
          {message}
        </p>
      )}
    </div>
  )
})

export default Input
