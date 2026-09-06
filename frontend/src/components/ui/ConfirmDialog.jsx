import { TriangleAlert } from 'lucide-react'
import Button from './Button'
import Modal from './Modal'

/**
 * Yes/no confirmation built on <Modal>.
 *
 *   <ConfirmDialog open={!!target} onClose={…} onConfirm={…} tone="danger" title="Delete note?" />
 */
export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  confirmDisabled = false,
  cancelLabel = 'Cancel',
  tone = 'primary',
  icon = TriangleAlert,
  loading = false,
  children,
}) {
  const confirmVariant = tone === 'danger' ? 'danger' : 'primary'

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      icon={icon}
      iconTone={tone}
      size="sm"
      dismissible={!loading}
      actions={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            loading={loading}
            disabled={confirmDisabled}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      {children}
    </Modal>
  )
}
