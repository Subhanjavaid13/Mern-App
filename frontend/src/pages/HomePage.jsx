import { useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { CircleAlert, Clock, Notebook, Plus, RefreshCw, Search, Type } from 'lucide-react'
import { useDebounce } from '../hooks/useDebounce'
import { useLocalStorage } from '../hooks/useLocalStorage'
import * as notesApi from '../lib/notesApi'
import { STORAGE_KEYS, VIEW_MODES } from '../utils/constants'
import { formatDateTime, formatLongDate, greetingFor, timeAgo } from '../utils/date'
import { filterNotes, sortNotes, summarizeNotes } from '../utils/notes'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import EmptyState from '../components/ui/EmptyState'
import SearchBar from '../components/ui/SearchBar'
import StatCard from '../components/ui/StatCard'
import DeleteNoteDialog from '../components/notes/DeleteNoteDialog'
import NotesEmpty from '../components/notes/NotesEmpty'
import NotesGrid from '../components/notes/NotesGrid'
import NotesSkeleton from '../components/notes/NotesSkeleton'
import NotesToolbar from '../components/notes/NotesToolbar'
import RateLimitBanner from '../components/notes/RateLimitBanner'

/** Hand-drawn underline under the hero's highlighted word */
function Squiggle() {
  return (
    <svg
      className="absolute -bottom-1.5 left-0 h-3 w-full text-secondary"
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2 8c30-6 60-6 90 0s60 6 106-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function HomePage() {
  const [notes, setNotes] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error | rate-limited
  const [errorText, setErrorText] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 200)
  const [sort, setSort] = useLocalStorage(STORAGE_KEYS.SORT, 'newest')
  const [view, setView] = useLocalStorage(STORAGE_KEYS.VIEW, VIEW_MODES.GRID)
  const [noteToDelete, setNoteToDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [today] = useState(() => new Date())
  const searchRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()

    notesApi
      .getNotes({ signal: controller.signal })
      .then((data) => {
        setNotes(data)
        setStatus('ready')
      })
      .catch((error) => {
        if (notesApi.isCanceled(error)) return
        if (error.status === 429) {
          setStatus('rate-limited')
        } else {
          setErrorText(notesApi.errorMessage(error, "We couldn't reach your notes. Please try again."))
          setStatus('error')
        }
      })

    return () => controller.abort()
  }, [reloadKey])

  const retry = () => {
    setStatus('loading')
    setReloadKey((k) => k + 1)
  }

  const visibleNotes = useMemo(
    () => sortNotes(filterNotes(notes, debouncedQuery), sort),
    [notes, debouncedQuery, sort],
  )
  const summary = useMemo(() => summarizeNotes(notes), [notes])
  const loading = status === 'loading'

  const confirmDelete = async () => {
    if (!noteToDelete) return
    setDeleting(true)
    try {
      await notesApi.deleteNote(noteToDelete._id)
      setNotes((prev) => prev.filter((n) => n._id !== noteToDelete._id))
      toast.success('Note deleted.')
      setNoteToDelete(null)
    } catch (error) {
      toast.error(notesApi.errorMessage(error, 'Could not delete the note.'))
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <Container className="pb-24 pt-8 sm:pt-12 lg:pt-16">
        {/* ------------------------------------------------ Hero */}
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              <span className="h-px w-6 bg-secondary/60" aria-hidden="true" />
              {greetingFor(today)} · {formatLongDate(today)}
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Your thoughts,{' '}
              <span className="relative inline-block font-medium italic text-primary">
                brewed
                <Squiggle />
              </span>{' '}
              fresh.
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-lg text-base-content/65">
              Capture ideas, plans and half-formed thoughts in one warm, quiet place. No folders, no
              fuss — just you and the page.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/create" size="lg" leftIcon={Plus}>
                New note
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={Search}
                onClick={() => searchRef.current?.focus()}
              >
                Search notes
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 animate-fade-up delay-2">
            <StatCard icon={Notebook} label="Notes" value={summary.count} loading={loading} />
            <StatCard
              icon={Type}
              label="Words written"
              value={summary.words.toLocaleString()}
              loading={loading}
            />
            <StatCard
              icon={Clock}
              label="Last edited"
              value={summary.lastEdited ? timeAgo(summary.lastEdited, today) : '—'}
              hint={summary.lastEdited ? formatDateTime(summary.lastEdited) : 'Nothing yet'}
              loading={loading}
            />
          </div>
        </section>

        {/* ------------------------------------------------ Toolbar */}
        <section className="z-30 mt-10 animate-fade-up delay-3 md:sticky md:top-[4.6rem]">
          <Card
            padding="sm"
            className="flex flex-col gap-3 bg-base-100/90 backdrop-blur-xl md:flex-row md:items-center"
          >
            <SearchBar
              ref={searchRef}
              value={query}
              onChange={setQuery}
              className="md:max-w-xs lg:max-w-md"
            />
            <NotesToolbar
              className="md:ml-auto"
              total={notes.length}
              shown={visibleNotes.length}
              query={debouncedQuery.trim()}
              sort={sort}
              onSortChange={setSort}
              view={view}
              onViewChange={setView}
            />
          </Card>
        </section>

        {/* ------------------------------------------------ Notes */}
        <section className="mt-6" aria-label="Notes">
          {loading && <NotesSkeleton view={view} />}

          {status === 'rate-limited' && <RateLimitBanner onRetry={retry} />}

          {status === 'error' && (
            <EmptyState
              icon={CircleAlert}
              title="Something went wrong"
              description={errorText}
              action={
                <Button leftIcon={RefreshCw} onClick={retry}>
                  Try again
                </Button>
              }
            />
          )}

          {status === 'ready' &&
            (visibleNotes.length ? (
              <NotesGrid notes={visibleNotes} view={view} onDelete={setNoteToDelete} />
            ) : (
              <NotesEmpty query={debouncedQuery.trim()} onClearSearch={() => setQuery('')} />
            ))}
        </section>
      </Container>

      <DeleteNoteDialog
        note={noteToDelete}
        open={Boolean(noteToDelete)}
        onClose={() => {
          if (!deleting) setNoteToDelete(null)
        }}
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </>
  )
}
