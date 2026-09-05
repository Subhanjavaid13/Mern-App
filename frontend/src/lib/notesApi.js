/**
 * ─────────────────────────────────────────────────────────────────────────
 *  MOCK DATA LAYER — swap the bodies of these functions for real API calls.
 *
 *  Each function mirrors one backend route so the pages never need to change:
 *
 *    getNotes()              → GET    /api/notes
 *    getNote(id)             → GET    /api/notes/:id   (add this route, or find the note in getNotes())
 *    createNote({title,content}) → POST   /api/notes
 *    updateNote(id, data)    → PUT    /api/notes/:id
 *    deleteNote(id)          → DELETE /api/notes/:id
 *
 *  Errors should be thrown with a `status` property (e.g. 404, 429) — the UI
 *  uses `error.status === 429` to show the rate-limit screen.
 *
 *  Demo state persists in localStorage so navigation and refreshes feel real.
 * ─────────────────────────────────────────────────────────────────────────
 */
import { mockNotes } from '../data/mockNotes'
import { STORAGE_KEYS } from '../utils/constants'

const NETWORK_DELAY = 450

export class ApiError extends Error {
  constructor(message, status = 500) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const makeId = () => {
  const raw =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`
  return raw.replace(/-/g, '').slice(0, 24)
}

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.NOTES)
    if (raw) return JSON.parse(raw)
  } catch {
    /* fall through to seed */
  }
  save(mockNotes)
  return [...mockNotes]
}

function save(notes) {
  try {
    window.localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes))
  } catch {
    /* ignore */
  }
}

export async function getNotes() {
  await wait(NETWORK_DELAY)
  return load().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export async function getNote(id) {
  await wait(NETWORK_DELAY)
  const note = load().find((n) => n._id === id)
  if (!note) throw new ApiError('Note not found', 404)
  return note
}

export async function createNote({ title, content }) {
  await wait(NETWORK_DELAY)
  const now = new Date().toISOString()
  const note = { _id: makeId(), title, content, createdAt: now, updatedAt: now }
  save([note, ...load()])
  return note
}

export async function updateNote(id, { title, content }) {
  await wait(NETWORK_DELAY)
  const notes = load()
  const index = notes.findIndex((n) => n._id === id)
  if (index === -1) throw new ApiError('Note not found', 404)
  const updated = { ...notes[index], title, content, updatedAt: new Date().toISOString() }
  notes[index] = updated
  save(notes)
  return updated
}

export async function deleteNote(id) {
  await wait(NETWORK_DELAY)
  const notes = load()
  const next = notes.filter((n) => n._id !== id)
  if (next.length === notes.length) throw new ApiError('Note not found', 404)
  save(next)
  return { message: 'Note Deleted Successfully' }
}

/** Reset demo data back to the seeded sample notes */
export function resetDemoNotes() {
  save(mockNotes)
}
