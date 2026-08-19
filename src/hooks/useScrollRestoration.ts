import { useEffect } from 'react'

export function useScrollRestoration(storageKey: string, ready: boolean) {
  useEffect(() => {
    if (!ready) return

    const savedPosition = sessionStorage.getItem(storageKey)
    if (savedPosition === null) return

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: Number(savedPosition), left: 0, behavior: 'auto' })
      })
    })
    const timeout = window.setTimeout(() => {
      window.scrollTo({ top: Number(savedPosition), left: 0, behavior: 'auto' })
    }, 80)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timeout)
    }
  }, [ready, storageKey])

  useEffect(() => {
    return () => {
      sessionStorage.setItem(storageKey, String(window.scrollY))
    }
  }, [storageKey])
}

export function saveScrollPosition(storageKey: string) {
  sessionStorage.setItem(storageKey, String(window.scrollY))
}
