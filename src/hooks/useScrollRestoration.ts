import { useEffect } from 'react'

export function useScrollRestoration(storageKey: string, ready: boolean) {
  useEffect(() => {
    if (!ready) return

    const savedPosition = sessionStorage.getItem(storageKey)
    if (savedPosition === null) return

    const frame = requestAnimationFrame(() => {
      window.scrollTo(0, Number(savedPosition))
    })

    return () => cancelAnimationFrame(frame)
  }, [ready, storageKey])

  useEffect(() => {
    return () => {
      sessionStorage.setItem(storageKey, String(window.scrollY))
    }
  }, [storageKey])
}
