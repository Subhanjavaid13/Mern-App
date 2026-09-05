import { countWords } from './text'

const time = (value) => new Date(value).getTime() || 0

/** Sort a list of notes by one of the SORT_OPTIONS values. Returns a new array. */
export function sortNotes(notes, sort = 'newest') {
  const list = [...notes]
  switch (sort) {
    case 'oldest':
      return list.sort((a, b) => time(a.createdAt) - time(b.createdAt))
    case 'updated':
      return list.sort((a, b) => time(b.updatedAt) - time(a.updatedAt))
    case 'az':
      return list.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }))
    case 'longest':
      return list.sort((a, b) => countWords(b.content) - countWords(a.content))
    case 'newest':
    default:
      return list.sort((a, b) => time(b.createdAt) - time(a.createdAt))
  }
}

/** Case-insensitive match against title and content */
export function filterNotes(notes, query = '') {
  const q = query.trim().toLowerCase()
  if (!q) return notes
  return notes.filter(
    (n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q),
  )
}

/** Aggregate numbers for the home page hero */
export function summarizeNotes(notes) {
  let words = 0
  let lastEdited = null
  for (const note of notes) {
    words += countWords(note.content)
    const edited = time(note.updatedAt || note.createdAt)
    if (!lastEdited || edited > lastEdited) lastEdited = edited
  }
  return {
    count: notes.length,
    words,
    lastEdited: lastEdited ? new Date(lastEdited) : null,
  }
}

/** Validate a note payload; returns an object of field errors (empty when valid) */
export function validateNote({ title = '', content = '' }, limits) {
  const errors = {}
  const t = title.trim()
  const c = content.trim()

  if (!t) errors.title = 'Give your note a title.'
  else if (t.length > limits.TITLE_MAX) errors.title = `Keep the title under ${limits.TITLE_MAX} characters.`

  if (!c) errors.content = 'Write something first — even a sentence.'
  else if (c.length > limits.CONTENT_MAX) errors.content = `That's a lot! Keep it under ${limits.CONTENT_MAX.toLocaleString()} characters.`

  return errors
}
