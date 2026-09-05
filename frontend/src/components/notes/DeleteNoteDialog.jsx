import { Trash2 } from 'lucide-react'
import { excerpt } from '../../utils/text'
import ConfirmDialog from '../ui/ConfirmDialog'

/** Confirmation dialog for deleting a note. */
export default function DeleteNoteDialog({ note, open, onClose, onConfirm, loading = false }) {
  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      loading={loading}
      tone="danger"
      icon={Trash2}
      title="Delete this note?"
      description="This can't be undone. The note will be gone for good."
      confirmLabel="Delete note"
    >
      {note && (
        <div className="rounded-lg border border-base-300/80 bg-base-200/60 px-3.5 py-2.5">
          <p className="line-clamp-1 font-semibold">{note.title}</p>
          <p className="mt-0.5 line-clamp-2 text-sm text-base-content/60">{excerpt(note.content, 120)}</p>
        </div>
      )}
    </ConfirmDialog>
  )
}
