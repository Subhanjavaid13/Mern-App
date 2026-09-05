import { forwardRef, useCallback, useId, useLayoutEffect, useRef } from 'react'
import { cn } from '../../utils/cn'

const VARIANTS = {
  bordered:
    'textarea textarea-bordered border-base-300 bg-base-100 focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/20',
  ghost: 'w-full border-0 bg-transparent px-0 focus:outline-none focus:ring-0',
}

/**
 * Textarea with label/hint/error, optional auto-grow, character counter and a
 * ruled-paper background (`lined`).
 *
 *   <Textarea value={v} onChange={…} autoGrow minRows={10} lined showCount maxLength={5000} />
 */
const Textarea = forwardRef(function Textarea(
  {
    label,
    hint,
    error,
    id,
    variant = 'bordered',
    autoGrow = false,
    minRows = 4,
    lined = false,
    showCount = false,
    maxLength,
    value,
    className,
    textareaClassName,
    ...props
  },
  ref,
) {
  const autoId = useId()
  const textareaId = id ?? autoId
  const messageId = `${textareaId}-message`
  const message = error || hint
  const innerRef = useRef(null)

  const setRefs = useCallback(
    (node) => {
      innerRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [ref],
  )

  useLayoutEffect(() => {
    if (!autoGrow) return
    const el = innerRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [value, autoGrow])

  const length = typeof value === 'string' ? value.length : 0
  const nearLimit = maxLength ? length > maxLength * 0.9 : false
  const overLimit = maxLength ? length > maxLength : false

  return (
    <div className={cn('form-control w-full', className)}>
      {(label || (showCount && maxLength)) && (
        <div className="mb-1.5 flex items-end justify-between gap-3">
          {label ? (
            <label htmlFor={textareaId} className="label p-0">
              <span className="label-text text-sm font-medium text-base-content/80">{label}</span>
            </label>
          ) : (
            <span />
          )}
        </div>
      )}

      <textarea
        ref={setRefs}
        id={textareaId}
        rows={minRows}
        value={value}
        maxLength={maxLength}
        className={cn(
          'w-full resize-none px-4 py-3 text-[0.9375rem] leading-8 text-base-content placeholder:text-base-content/40 transition-[border-color,box-shadow] duration-150',
          VARIANTS[variant] ?? VARIANTS.bordered,
          lined && 'paper-lines',
          autoGrow && 'overflow-hidden',
          error && 'border-error focus:border-error focus:ring-error/20',
          textareaClassName,
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        {...props}
      />

      {(message || (showCount && maxLength)) && (
        <div className="mt-1.5 flex items-start justify-between gap-3">
          {message ? (
            <p
              id={messageId}
              className={cn('text-xs', error ? 'text-error' : 'text-base-content/55')}
              role={error ? 'alert' : undefined}
            >
              {message}
            </p>
          ) : (
            <span />
          )}
          {showCount && maxLength && (
            <span
              className={cn(
                'tabular-nums text-xs',
                overLimit ? 'text-error' : nearLimit ? 'text-warning' : 'text-base-content/45',
              )}
              aria-live="polite"
            >
              {length.toLocaleString()} / {maxLength.toLocaleString()}
            </span>
          )}
        </div>
      )}
    </div>
  )
})

export default Textarea
