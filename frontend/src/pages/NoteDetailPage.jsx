import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import toast from 'react-hot-toast'
import { CircleAlert, Copy, FileText, Home, PenLine, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { useHotkey } from '../hooks/useHotkey'
import * as notesApi from '../lib/notesApi'
import { cn } from '../utils/cn'
import { formatDateTime } from '../utils/date'
import { accentFor, initialOf } from '../utils/text'
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
    <div className="mt-8" aria-busy="true" aria-label="Loading note">
      <Skeleton className="h-1.5 w-20 rounded-full" />
      <Skeleton className="mt-5 h-10 w-3/4" />
      <Skeleton className="mt-2 h-10 w-1/2" />
      <div className="mt-5 flex gap-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Card padding="xl" className="mt-8">
        <SkeletonText lines={5} />
        <SkeletonText lines={4} className="mt-8" />
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
  const [reloadKey, setReloadKey] = useState(0)
  const [saving, setSaving] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let active = true
    notesApi
      .getNote(id)
      .then((data) => {
        if (!active) return
        setNote(data)
        setStatus('ready')
      })
      .catch((error) => {
        if (!active) return
        setStatus(error?.status === 404 ? 'not-found' : 'error')
      })
    return () => {
      active = false
    }
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
      toast.error(
        error?.status === 429
          ? 'Too many requests — take a breath and try again.'
          : 'Could not save your changes.',
      )
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
      toast.error(
        error?.status === 429
          ? 'Too many requests — take a breath and try again.'
          : 'Could not delete the note.',
      )
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
      <Container className="py-12 sm:py-20">
        <EmptyState
          icon={FileText}
          title="This note wandered off"
          description="It may have been deleted, or the link might be broken. Your other notes are safe and sound."
          action={
            <Button to="/" leftIcon={Home}>
              Back to notes
            </Button>
          }
          secondaryAction={
            <Button variant="outline" to="/create" leftIcon={Plus}>
              Write a new one
            </Button>
          }
        />
      </Container>
    )
  }

  if (status === 'error') {
    return (
      <Container className="py-12 sm:py-20">
        <EmptyState
          icon={CircleAlert}
          title="Something went wrong"
          description="We couldn't load this note. Check your connection and try again."
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
      <Container width="md" className="pb-16 pt-8 sm:pt-12">
        <BackLink to="/">All notes</BackLink>
        <DetailSkeleton />
      </Container>
    )
  }

  /* ------------------------------------------------ Edit mode */
  if (editing) {
    return (
      <Container className="pb-24 pt-8 sm:pt-12">
        <BackLink onClick={stopEditing}>Back to note</BackLink>
        <PageHeader
          className="mt-5"
          eyebrow="Editing"
          title={note.title}
          description="Make your changes and save when you're happy with them."
        />
        <NoteForm
          key={note._id}
          className="mt-8"
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
      <Container width="md" className="pb-28 pt-8 sm:pb-16 sm:pt-12">
        <div className="flex items-center justify-between gap-4">
          <BackLink to="/">All notes</BackLink>
          <div className="hidden items-center gap-2 sm:flex">
            <Button variant="outline" size="sm" leftIcon={Copy} onClick={handleCopy}>
              Copy
            </Button>
            <Button variant="soft" size="sm" leftIcon={PenLine} onClick={startEditing}>
              Edit
            </Button>
            <Button variant="danger-soft" size="sm" leftIcon={Trash2} onClick={() => setDeleteOpen(true)}>
              Delete
            </Button>
          </div>
        </div>

        <article className="mt-8 animate-fade-up">
          <header>
            <div className={cn('h-1.5 w-20 rounded-full', accentFor(note._id))} aria-hidden="true" />
            <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {note.title}
            </h1>
            <NoteMeta note={note} className="mt-5" />
          </header>

          <Card padding="xl" className="mt-8 overflow-hidden">
            <span
              className="pointer-events-none absolute -right-6 -top-10 select-none font-display text-[12rem] font-bold leading-none text-base-content/[0.035]"
              aria-hidden="true"
            >
              {initialOf(note.title)}
            </span>
            <NoteContent content={note.content} className="relative" />
          </Card>

          <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-base-content/50">
            <span>Created {formatDateTime(note.createdAt)}</span>
            <span>Last edited {formatDateTime(note.updatedAt)}</span>
          </footer>
        </article>
      </Container>

      {/* Sticky action bar on small screens */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-base-300/60 bg-base-100/90 p-3 backdrop-blur-xl sm:hidden"
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
