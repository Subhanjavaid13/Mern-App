import { useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { AlignLeft, CircleCheck, Clock, Eye, Keyboard, PenLine, Save, Type, WholeWord } from 'lucide-react'
import { useDebounce } from '../../hooks/useDebounce'
import { MOD_KEY, useHotkey } from '../../hooks/useHotkey'
import { useRateLimit } from '../../hooks/useRateLimit'
import { cn } from '../../utils/cn'
import { LIMITS } from '../../utils/constants'
import { validateNote } from '../../utils/notes'
import { countCharacters, countSentences, countWords, readingTime } from '../../utils/text'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Kbd from '../ui/Kbd'
import SegmentedControl from '../ui/SegmentedControl'
import Textarea from '../ui/Textarea'
import NoteContent from './NoteContent'

const MODE_OPTIONS = [
  { value: 'write', label: 'Write', icon: PenLine },
  { value: 'preview', label: 'Preview', icon: Eye },
]

function readInitialState(initialValues, autosaveKey) {
  const base = {
    title: initialValues?.title ?? '',
    content: initialValues?.content ?? '',
  }
  if (autosaveKey && !base.title && !base.content) {
    try {
      const raw = window.localStorage.getItem(autosaveKey)
      if (raw) {
        const draft = JSON.parse(raw)
        if (draft?.title || draft?.content) {
          return {
            values: { title: draft.title ?? '', content: draft.content ?? '' },
            restored: true,
          }
        }
      }
    } catch {
      /* ignore */
    }
  }
  return { values: base, restored: false }
}

/**
 * Create / edit form for a note.
 *
 * - Validates title & content with inline errors
 * - Autosaves a draft to localStorage when `autosaveKey` is given
 * - ⌘/Ctrl+S and ⌘/Ctrl+Enter submit
 * - Write / Preview toggle, live word count & reading time
 *
 * `onSubmit({ title, content })` may return a promise; resolve to `false`
 * (or throw) to keep the draft around.
 */
export default function NoteForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = 'Save note',
  submitting = false,
  autosaveKey,
  showSidebar = true,
  className,
}) {
  const [init] = useState(() => readInitialState(initialValues, autosaveKey))
  const [values, setValues] = useState(init.values)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [mode, setMode] = useState('write')

  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const { limited, secondsLeft } = useRateLimit()

  const debouncedValues = useDebounce(values, 600)
  const hasContent = Boolean(values.title.trim() || values.content.trim())
  const draftPending =
    values.title !== debouncedValues.title || values.content !== debouncedValues.content

  /* Persist the debounced draft */
  useEffect(() => {
    if (!autosaveKey) return
    try {
      const { title, content } = debouncedValues
      if (!title && !content) window.localStorage.removeItem(autosaveKey)
      else window.localStorage.setItem(autosaveKey, JSON.stringify({ title, content }))
    } catch {
      /* ignore */
    }
  }, [debouncedValues, autosaveKey])

  /* Let the user know we picked up where they left off */
  useEffect(() => {
    if (init.restored) toast('Draft restored.', { id: 'draft-restored' })
  }, [init.restored])

  const stats = useMemo(
    () => ({
      words: countWords(values.content),
      characters: countCharacters(values.content),
      sentences: countSentences(values.content),
      minutes: readingTime(values.content),
    }),
    [values.content],
  )

  const update = (field) => (event) => {
    const next = event.target.value
    setValues((v) => ({ ...v, [field]: next }))
    if (errors[field]) {
      setErrors((e) => {
        const copy = { ...e }
        delete copy[field]
        return copy
      })
    }
  }

  const blur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }))
    const fieldErrors = validateNote(values, LIMITS)
    setErrors((e) => ({ ...e, [field]: fieldErrors[field] }))
  }

  const handleSubmit = async (event) => {
    event?.preventDefault()
    if (submitting || limited) return

    const nextErrors = validateNote(values, LIMITS)
    setErrors(nextErrors)
    setTouched({ title: true, content: true })

    if (Object.keys(nextErrors).length) {
      setMode('write')
      const target = nextErrors.title ? titleRef.current : contentRef.current
      window.requestAnimationFrame(() => target?.focus())
      return
    }

    try {
      const result = await onSubmit?.({
        title: values.title.trim(),
        content: values.content.trim(),
      })
      if (result !== false && autosaveKey) {
        try {
          window.localStorage.removeItem(autosaveKey)
        } catch {
          /* ignore */
        }
      }
    } catch {
      /* the parent surfaces the error; keep the draft */
    }
  }

  useHotkey('mod+s', handleSubmit, { allowInInputs: true })
  useHotkey('mod+enter', handleSubmit, { allowInInputs: true })

  const showError = (field) => (touched[field] ? errors[field] : undefined)

  const draftLabel = !autosaveKey
    ? null
    : !hasContent
      ? 'Autosave on'
      : draftPending
        ? 'Saving draft…'
        : 'Draft saved'

  const details = [
    { icon: WholeWord, label: 'Words', value: stats.words.toLocaleString() },
    { icon: Type, label: 'Characters', value: stats.characters.toLocaleString() },
    { icon: AlignLeft, label: 'Sentences', value: stats.sentences.toLocaleString() },
    { icon: Clock, label: 'Reading time', value: `${stats.minutes} min` },
  ]

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        'grid gap-4 animate-fade-up lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start',
        className,
      )}
    >
      {/* ------------------------------------------------ Editor */}
      <Card padding="none" className="overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-base-300/60 bg-base-200/40 px-4 py-2">
          <div className="flex min-w-0 items-center gap-1.5 text-xs font-medium text-base-content/55">
            {draftLabel ? (
              <>
                {draftPending && hasContent ? (
                  <span className="size-1.5 shrink-0 rounded-full bg-primary animate-pulse-soft" aria-hidden="true" />
                ) : (
                  <CircleCheck
                    className={cn('size-3.5 shrink-0', hasContent ? 'text-success' : 'text-base-content/40')}
                    aria-hidden="true"
                  />
                )}
                <span className="truncate" aria-live="polite">
                  {draftLabel}
                </span>
              </>
            ) : (
              <>
                <PenLine className="size-3.5 shrink-0" aria-hidden="true" />
                <span>Editing</span>
              </>
            )}
          </div>
          <SegmentedControl size="sm" label="Editor mode" value={mode} onChange={setMode} options={MODE_OPTIONS} />
        </div>

        <div className="p-4 sm:p-6">
          {mode === 'write' ? (
            <>
              <label htmlFor="note-title" className="sr-only">
                Title
              </label>
              <input
                ref={titleRef}
                id="note-title"
                type="text"
                value={values.title}
                onChange={update('title')}
                onBlur={blur('title')}
                maxLength={LIMITS.TITLE_MAX + 20}
                placeholder="Title"
                autoFocus={!values.title}
                autoComplete="off"
                aria-invalid={showError('title') ? true : undefined}
                aria-describedby={showError('title') ? 'note-title-error' : undefined}
                className="w-full bg-transparent font-display text-xl font-bold tracking-tight placeholder:text-base-content/35 focus:outline-none sm:text-2xl"
              />
              <div className="mt-1 flex items-start justify-between gap-3 text-xs">
                {showError('title') ? (
                  <p id="note-title-error" className="text-error" role="alert">
                    {showError('title')}
                  </p>
                ) : (
                  <span />
                )}
                <span
                  className={cn(
                    'tabular-nums',
                    values.title.length > LIMITS.TITLE_MAX ? 'text-error' : 'text-base-content/40',
                  )}
                >
                  {values.title.length} / {LIMITS.TITLE_MAX}
                </span>
              </div>

              <div className="my-4 h-px bg-base-300/70" aria-hidden="true" />

              <Textarea
                ref={contentRef}
                id="note-content"
                aria-label="Content"
                variant="ghost"
                lined
                autoGrow
                minRows={10}
                value={values.content}
                onChange={update('content')}
                onBlur={blur('content')}
                placeholder="Write your note…"
                error={showError('content')}
                showCount
                maxLength={LIMITS.CONTENT_MAX}
              />
            </>
          ) : (
            <div className="min-h-[20rem] animate-fade-in">
              <h2 className="font-display text-xl font-bold tracking-tight text-balance sm:text-2xl">
                {values.title.trim() || <span className="text-base-content/35">Untitled note</span>}
              </h2>
              <div className="my-4 h-px bg-base-300/70" aria-hidden="true" />
              <NoteContent content={values.content} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-base-300/60 bg-base-200/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-base-content/55">
            <span className="inline-flex items-center gap-1.5">
              <WholeWord className="size-3.5" aria-hidden="true" />
              {stats.words.toLocaleString()} {stats.words === 1 ? 'word' : 'words'}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden="true" />
              {stats.minutes} min read
            </span>
            <span className="hidden items-center gap-1 sm:inline-flex">
              <Kbd>{MOD_KEY}</Kbd>
              <Kbd>S</Kbd>
              <span className="ml-0.5">to save</span>
            </span>
          </div>
          <div className="flex items-center justify-end gap-2">
            {onCancel && (
              <Button variant="ghost" size="sm" onClick={onCancel} disabled={submitting}>
                Cancel
              </Button>
            )}
            <Button type="submit" size="sm" leftIcon={Save} loading={submitting} disabled={limited}>
              {limited ? `Wait ${secondsLeft}s` : submitLabel}
            </Button>
          </div>
        </div>
      </Card>

      {/* ------------------------------------------------ Sidebar */}
      {showSidebar && (
        <aside className="space-y-3 lg:sticky lg:top-[4.25rem]">
          <Card padding="sm">
            <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-base-content/50">
              Details
            </h3>
            <dl className="mt-2.5 space-y-2 text-sm">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <dt className="inline-flex items-center gap-2 text-base-content/65">
                    <Icon className="size-4 text-base-content/40" aria-hidden="true" />
                    {label}
                  </dt>
                  <dd className="font-semibold tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card padding="sm">
            <h3 className="inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-base-content/50">
              <Keyboard className="size-3.5" aria-hidden="true" />
              Shortcuts
            </h3>
            <ul className="mt-2.5 space-y-2 text-sm text-base-content/70">
              <li className="flex items-center justify-between gap-3">
                <span>Save</span>
                <span className="flex gap-1">
                  <Kbd>{MOD_KEY}</Kbd>
                  <Kbd>S</Kbd>
                </span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span>Search notes</span>
                <span className="flex gap-1">
                  <Kbd>{MOD_KEY}</Kbd>
                  <Kbd>K</Kbd>
                </span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span>New note</span>
                <Kbd>N</Kbd>
              </li>
            </ul>
          </Card>
        </aside>
      )}
    </form>
  )
}
