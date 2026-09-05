import { useEffect, useRef } from 'react'

export const isMac =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent)

/** Human label for the platform modifier key: "⌘" on Apple devices, "Ctrl" elsewhere */
export const MOD_KEY = isMac ? '⌘' : 'Ctrl'

const isTypingTarget = (el) =>
  !!el &&
  (el.tagName === 'INPUT' ||
    el.tagName === 'TEXTAREA' ||
    el.tagName === 'SELECT' ||
    el.isContentEditable)

/**
 * Global keyboard shortcut.
 *
 *   useHotkey('mod+k', () => focusSearch())
 *   useHotkey('escape', close, { allowInInputs: true })
 *
 * "mod" maps to ⌘ on macOS and Ctrl elsewhere.
 */
export function useHotkey(combo, handler, { enabled = true, allowInInputs = false } = {}) {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    if (!enabled || !combo) return undefined

    const parts = combo.toLowerCase().split('+')
    const key = parts.pop()
    const wantMod = parts.includes('mod')
    const wantShift = parts.includes('shift')
    const wantAlt = parts.includes('alt')

    const onKeyDown = (event) => {
      if (!allowInInputs && isTypingTarget(event.target)) return

      const hasMod = event.metaKey || event.ctrlKey
      if (wantMod !== hasMod) return
      if (wantShift !== event.shiftKey) return
      if (wantAlt !== event.altKey) return

      const pressed = event.key.toLowerCase()
      const matches = pressed === key || (key === 'escape' && pressed === 'esc')
      if (!matches) return

      event.preventDefault()
      handlerRef.current?.(event)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [combo, enabled, allowInInputs])
}

export default useHotkey
