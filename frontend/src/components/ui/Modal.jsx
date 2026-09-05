import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'
import IconButton from './IconButton'

const SIZES = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
}

const ICON_TONES = {
  primary: 'bg-primary/10 text-primary',
  danger: 'bg-error/10 text-error',
  warning: 'bg-warning/15 text-warning-content dark:text-warning',
  success: 'bg-success/10 text-success',
  info: 'bg-info/15 text-info',
}

/**
 * Accessible modal built on the native <dialog> element (daisyUI styles).
 * Bottom-sheet on mobile, centered card on larger screens.
 * `dismissible={false}` blocks Escape / backdrop / close-button while busy.
 *
 *   <Modal open={open} onClose={() => setOpen(false)} title="…" actions={<>…</>}>body</Modal>
 */
export default function Modal({
  open,
  onClose,
  title,
  description,
  icon: Icon,
  iconTone = 'primary',
  size = 'md',
  actions,
  dismissible = true,
  showClose = true,
  className,
  children,
}) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    else if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined
    const handleClose = () => onClose?.()
    const handleCancel = (event) => {
      if (!dismissible) event.preventDefault()
    }
    dialog.addEventListener('close', handleClose)
    dialog.addEventListener('cancel', handleCancel)
    return () => {
      dialog.removeEventListener('close', handleClose)
      dialog.removeEventListener('cancel', handleCancel)
    }
  }, [onClose, dismissible])

  return (
    <dialog
      ref={dialogRef}
      className="modal modal-bottom sm:modal-middle"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className={cn(
          'modal-box w-full overflow-hidden rounded-t-box border border-base-300/70 bg-base-100 p-0 shadow-lift sm:rounded-box',
          SIZES[size] ?? SIZES.md,
          className,
        )}
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-start gap-4">
            {Icon && (
              <div
                className={cn(
                  'grid size-12 shrink-0 place-items-center rounded-2xl',
                  ICON_TONES[iconTone] ?? ICON_TONES.primary,
                )}
              >
                <Icon className="size-6" aria-hidden="true" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              {title && (
                <h3
                  id="modal-title"
                  className="font-display text-2xl font-semibold leading-tight tracking-tight"
                >
                  {title}
                </h3>
              )}
              {description && (
                <p className="mt-1.5 text-sm leading-relaxed text-base-content/65">{description}</p>
              )}
            </div>
            {showClose && (
              <IconButton
                icon={X}
                label="Close"
                size="sm"
                tooltip={false}
                className="-mr-2 -mt-2"
                disabled={!dismissible}
                onClick={() => dialogRef.current?.close()}
              />
            )}
          </div>
          {children && <div className="mt-5">{children}</div>}
        </div>

        {actions && (
          <div className="flex flex-col-reverse gap-2 border-t border-base-300/60 bg-base-200/60 px-6 py-4 sm:flex-row sm:justify-end">
            {actions}
          </div>
        )}
      </div>

      {dismissible && (
        <form method="dialog" className="modal-backdrop bg-black/50 backdrop-blur-sm">
          <button type="submit" aria-label="Close dialog">
            close
          </button>
        </form>
      )}
    </dialog>
  )
}
