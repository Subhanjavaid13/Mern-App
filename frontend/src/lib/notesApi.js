import http from './http'

export { ApiError, errorMessage, isCanceled } from './http'

/**
 * Notes API — one function per backend route.
 * Every function resolves with the JSON body and rejects with an ApiError.
 * Pass `{ signal }` from an AbortController to cancel in-flight requests.
 */

/** GET /api/notes */
export async function getNotes(config) {
  const { data } = await http.get('/notes', config)
  return data
}

/** GET /api/notes/:id */
export async function getNote(id, config) {
  const { data } = await http.get(`/notes/${id}`, config)
  return data
}

/** POST /api/notes */
export async function createNote({ title, content }) {
  const { data } = await http.post('/notes', { title, content })
  return data
}

/** PUT /api/notes/:id */
export async function updateNote(id, { title, content }) {
  const { data } = await http.put(`/notes/${id}`, { title, content })
  return data
}

/** DELETE /api/notes/:id */
export async function deleteNote(id) {
  const { data } = await http.delete(`/notes/${id}`)
  return data
}
