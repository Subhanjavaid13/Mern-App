import axios from 'axios'

/**
 * Normalised error thrown for every failed request.
 * `status` is the HTTP status (0 when the server could not be reached).
 */
export class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

/**
 * Shared axios instance.
 * - In development, `/api` is proxied to the backend by Vite (see vite.config.js).
 * - In production, set VITE_API_URL (e.g. https://api.example.com/api).
 */
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    // Let cancelled requests (AbortController) pass through untouched
    if (axios.isCancel(error)) return Promise.reject(error)

    const status = error.response?.status ?? 0
    const serverMessage = error.response?.data?.message
    const message =
      serverMessage ||
      (status === 0 ? "Can't reach the server. Is the backend running?" : error.message) ||
      'Something went wrong.'

    return Promise.reject(new ApiError(message, status, error.response?.data ?? null))
  },
)

/** True when the request was aborted via an AbortController signal. */
export const isCanceled = (error) => axios.isCancel(error)

/** Friendly toast text for a failed request. */
export function errorMessage(error, fallback = 'Something went wrong. Please try again.') {
  if (error?.status === 429) return 'Too many requests — take a breath and try again.'
  if (error?.status === 0) return "Can't reach the server. Is the backend running?"
  return fallback
}

export default http
