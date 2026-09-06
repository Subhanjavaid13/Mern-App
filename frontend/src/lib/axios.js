import axios from 'axios'

/** Seconds to wait when the server does not say how long the limit lasts */
const DEFAULT_RETRY_AFTER = 10

/**
 * Normalised error thrown for every failed request.
 * `status` is the HTTP status (0 when the server could not be reached).
 * `retryAfter` is set (in seconds) for 429 responses.
 */
export class ApiError extends Error {
  constructor(message, status = 0, data = null, retryAfter = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
    this.retryAfter = retryAfter
  }
}

/* ------------------------------------------------------------------ */
/*  Rate-limit broadcast                                               */
/*  Any 429 from ANY request notifies subscribers, so the app can show */
/*  one global notice regardless of which page or action triggered it. */
/* ------------------------------------------------------------------ */
const rateLimitListeners = new Set()

/** Subscribe to rate-limit hits. Returns an unsubscribe function. */
export function onRateLimited(listener) {
  rateLimitListeners.add(listener)
  return () => rateLimitListeners.delete(listener)
}

function parseRetryAfter(response) {
  const fromBody = Number(response?.data?.retryAfter)
  if (Number.isFinite(fromBody) && fromBody > 0) return Math.ceil(fromBody)
  const fromHeader = Number(response?.headers?.['retry-after'])
  if (Number.isFinite(fromHeader) && fromHeader > 0) return Math.ceil(fromHeader)
  return DEFAULT_RETRY_AFTER
}

/**
 * Shared axios instance used for every API call.
 * - In development, `/api` is proxied to the backend by Vite (see vite.config.js).
 * - In production, set VITE_API_URL (e.g. https://api.example.com/api).
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
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

    let retryAfter = null
    if (status === 429) {
      retryAfter = parseRetryAfter(error.response)
      rateLimitListeners.forEach((listener) => listener({ retryAfter }))
    }

    return Promise.reject(new ApiError(message, status, error.response?.data ?? null, retryAfter))
  },
)

/** True when the request was aborted via an AbortController signal. */
export const isCanceled = (error) => axios.isCancel(error)

/** Friendly toast text for a failed request. */
export function errorMessage(error, fallback = 'Something went wrong. Please try again.') {
  if (error?.status === 429) {
    return `Too many requests. Try again in ${error.retryAfter ?? DEFAULT_RETRY_AFTER}s.`
  }
  if (error?.status === 0) return "Can't reach the server. Is the backend running?"
  return fallback
}

export default api
