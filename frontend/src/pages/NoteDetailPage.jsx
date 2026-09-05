import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import toast from 'react-hot-toast'
import { CircleAlert, Copy, FileText, Home, PenLine, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { useHotkey } from '../hooks/useHotkey'
import * as notesApi from '../lib/notesApi'
import { formatDateTime } from '../utils/date'
import BackLink from '../components/ui/BackLink'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import EmptyState from '../components/ui/EmptyState'
import IconButton from '../components/ui/IconButton'
import PageHeader from '../components/ui/PageHeader'
import { Skeleton, SkeletonText } from '../components/ui/Skeleton'
import DeleteNoteDialog from '../components/notes/DeleteNoteDialog'
import NoteContent from '../components/notes/NoteContent'
import NoteForm from '../components/notes/NoteForm'
import NoteMeta from '../components/notes/NoteMeta'

function DetailSkeleton() {
  return (
    <div className="mt-6" aria-busy="true" aria-label="Loading note">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="mt-2 h-8 w-1/2" />
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Card padding="lg" className="mt-6">
        <SkeletonText lines={5} />
        <SkeletonText lines={4} className="mt-6" />
      </Card>
    </div>
  )
}

export default function NoteDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const editing = searchParams.get('edit') === '1'

  const [note, setNote] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ready | not-found | error
  const [errorText, setErrorText] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const [saving, setSaving] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    notesApi
      .getNote(id, { signal: controller.signal })
      .then((data) => {
        setNote(data)
        setStatus('ready')
      })
      .catch((error) => {
        if (notesApi.isCanceled(error)) return
        if (error.status === 404) {
          setStatus('not-found')
        } else {
          setErrorText(notesApi.errorMessage(error, "We couldn't load this note. Please try again."))
          setStatus('error')
        }
      })

    return () => controller.abort()
  }, [id, reloadKey])

  const retry = () => {
    setStatus('loading')
    setReloadKey((k) => k + 1)
  }

  const startEditing = () => setSearchParams({ edit: '1' })
  const stopEditing = () => setSearchParams({})

  useHotkey('e', startEditing, { enabled: status === 'ready' && !editing })

  const handleSave = async (data) => {
    setSaving(true)
    try {
      const updated = await notesApi.updateNote(id, data)
      setNote(updated)
      toast.success('Changes saved.')
      stopEditing()
      return true
    } catch (error) {
      toast.error(notesApi.errorMessage(error, 'Could not save your changes.'))
      return false
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await notesApi.deleteNote(id)
      toast.success('Note deleted.')
      navigate('/')
    } catch (error) {
      toast.error(notesApi.errorMessage(error, 'Could not delete the note.'))
      setDeleting(false)
    }
  }

  const handleCopy = async () => {
    if (!note) return
    try {
      await navigator.clipboard.writeText(`${note.title}\n\n${note.content}`)
      toast.success('Copied to clipboard.')
    } catch {
      toast.error('Copy is not available in this browser.')
    }
  }

  /* ------------------------------------------------ Non-ready states */
  if (status === 'not-found') {
    return (
      <Container className="py-10 sm:py-16">
        <EmptyState
          icon={FileText}
          title="Note not found"
          description="It may have been deleted, or the link might be broken."
          action={
            <Button to="/" leftIcon={Home}>
              Back to notes
            </Button>
          }
          secondaryAction={
            <Button variant="outline" to="/create" leftIcon={Plus}>
              New note
            </Button>
          }
        />
      </Container>
    )
  }

  if (status === 'error') {
    return (
      <Container className="py-10 sm:py-16">
        <EmptyState
          icon={CircleAlert}
          title="Something went wrong"
          description={errorText}
          action={
            <Button leftIcon={RefreshCw} onClick={retry}>
              Try again
            </Button>
          }
          secondaryAction={
            <Button variant="outline" to="/" leftIcon={Home}>
              Back to notes
            </Button>
          }
        />
      </Container>
    )
  }

  if (status === 'loading' || !note) {
    return (
      <Container width="md" className="pb-16 pt-6 sm:pt-8">
        <BackLink to="/">All notes</BackLink>
        <DetailSkeleton />
      </Container>
    )
  }

  /* ------------------------------------------------ Edit mode */
  if (editing) {
    return (
      <Container className="pb-16 pt-6 sm:pt-8">
        <BackLink onClick={stopEditing}>Back to note</BackLink>
        <PageHeader
          className="mt-4"
          eyebrow="Editing"
          title={note.title}
          description="Make your changes and save when you're done."
        />
        <NoteForm
          key={note._id}
          className="mt-6"
          initialValues={note}
          onSubmit={handleSave}
          onCancel={stopEditing}
          submitting={saving}
          submitLabel="Save changes"
        />
      </Container>
    )
  }

  /* ------------------------------------------------ Read mode */
  return (
    <>
      <Container width="md" className="pb-24 pt-6 sm:pb-16 sm:pt-8">
        <div className="flex items-center justify-between gap-4">
          <BackLink to="/">All notes</BackLink>
          <div className="hidden items-center gap-2 sm:flex">
            <Button variant="outline" size="sm" leftIcon={Copy} onClick={handleCopy}>
              Copy
            </Button>
            <Button variant="soft" size="sm" leftIcon={PenLine} onClick={startEditing}>
              Edit
            </Button>
            <Button
              variant="danger-soft"
              size="sm"
              leftIcon={Trash2}
              onClick={() => setDeleteOpen(true)}
            >
              Delete
            </Button>
          </div>
        </div>

        <article className="mt-6 animate-fade-up">
          <header>
            <h1 className="font-display text-2xl font-bold leading-tight tracking-tight text-balance sm:text-3xl lg:text-4xl">
              {note.title}
            </h1>
            <NoteMeta note={note} className="mt-3" />
          </header>

          <Card padding="lg" className="mt-6">
            <NoteContent content={note.content} />
          </Card>

          <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-base-content/50">
            <span>Created {formatDateTime(note.createdAt)}</span>
            <span>Last edited {formatDateTime(note.updatedAt)}</span>
          </footer>
        </article>
      </Container>

      {/* Sticky action bar on small screens */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-base-300/60 bg-base-100/95 p-3 backdrop-blur-xl sm:hidden"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" leftIcon={Copy} className="flex-1" onClick={handleCopy}>
            Copy
          </Button>
          <Button leftIcon={PenLine} className="flex-1" onClick={startEditing}>
            Edit
          </Button>
          <IconButton
            icon={Trash2}
            label="Delete note"
            variant="danger-soft"
            size="lg"
            tooltip={false}
            onClick={() => setDeleteOpen(true)}
          />
        </div>
      </div>

      <DeleteNoteDialog
        note={note}
        open={deleteOpen}
        onClose={() => {
          if (!deleting) setDeleteOpen(false)
        }}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </>
  )
}
