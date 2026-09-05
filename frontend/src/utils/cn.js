/**
 * Tiny classnames helper.
 * Accepts strings, arrays, nested arrays, falsy values and `{ className: boolean }` objects.
 *
 *   cn('btn', isActive && 'btn-primary', { 'btn-sm': small })
 */
export function cn(...args) {
  const out = []

  const push = (value) => {
    if (!value) return
    if (typeof value === 'string' || typeof value === 'number') {
      out.push(String(value))
    } else if (Array.isArray(value)) {
      value.forEach(push)
    } else if (typeof value === 'object') {
      for (const key of Object.keys(value)) {
        if (value[key]) out.push(key)
      }
    }
  }

  args.forEach(push)
  return out.join(' ')
}

export default cn
