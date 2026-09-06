import { useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { CircleAlert, Clock, Notebook, Plus, RefreshCw, Search, Type } from 'lucide-react'
import { useDebounce } from '../hooks/useDebounce'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useRateLimit } from '../hooks/useRateLimit'
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
  const { subscribeReset } = useRateLimit()

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

  /* When the list failed with 429, reload it as soon as the limit resets */
  useEffect(() => {
    if (status !== 'rate-limited') return undefined
    return subscribeReset(() => {
      setStatus('loading')
      setReloadKey((k) => k + 1)
    })
  }, [status, subscribeReset])

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
      <Container className="pb-16 pt-6 sm:pt-8 lg:pt-10">
        {/* ------------------------------------------------ Header */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center">
          <div className="animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-base-content/50">
              {greetingFor(today)} · {formatLongDate(today)}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Your notes, all in one place.
            </h1>
            <p className="mt-2.5 max-w-xl text-pretty text-base-content/65 sm:text-lg">
              Capture ideas, plans and quick thoughts. Search, sort and edit them from anywhere.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Button to="/create" leftIcon={Plus}>
                New note
              </Button>
              <Button variant="outline" leftIcon={Search} onClick={() => searchRef.current?.focus()}>
                Search notes
              </Button>
            </div>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1 animate-fade-up delay-1">
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
        <section className="z-30 mt-8 animate-fade-up delay-2 md:sticky md:top-[3.75rem]">
          <Card
            padding="none"
            className="flex flex-col gap-2.5 bg-base-100/95 p-2.5 backdrop-blur-xl md:flex-row md:items-center"
          >
            <SearchBar
              ref={searchRef}
              value={query}
              onChange={setQuery}
              className="md:max-w-xs lg:max-w-sm"
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
        <section className="mt-5" aria-label="Notes">
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
