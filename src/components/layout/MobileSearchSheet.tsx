import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Search, Volume2, X } from 'lucide-react'
import { Badge } from '@/components/common'
import { MOCK_VOCABULARY } from '@/data'
import { speakWord } from '@/utils/speech'
import type { VocabularyWord } from '@/types'

interface MobileSearchSheetProps {
  open: boolean
  onClose: () => void
}

const POPULAR_SEARCHES = ['resilient', 'achieve', 'strategy', 'collaborate', 'flexible']

export function MobileSearchSheet({ open, onClose }: MobileSearchSheetProps) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []

    const q = query.toLowerCase()
    return MOCK_VOCABULARY.filter(
      (word) =>
        word.word.toLowerCase().includes(q) || word.meaning.toLowerCase().includes(q),
    ).slice(0, 8)
  }, [query])

  useEffect(() => {
    if (!open) return

    setQuery('')
    const timer = window.setTimeout(() => inputRef.current?.focus(), 120)
    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => {
    if (!open) return

    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  const handleSelect = (word: VocabularyWord) => {
    onClose()
    setQuery('')
    navigate(`/vocabulary/${word.id}`)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 z-60 flex flex-col bg-paper/95 backdrop-blur-sm dark:bg-paper/95 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Search vocabulary"
        >
          <div className="flex items-center gap-3 border-b border-border bg-paper-2/95 px-4 py-3 dark:border-border-dark dark:bg-paper-2/95">
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              aria-label="Close search"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted dark:text-slate-400" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search vocabulary..."
                autoComplete="off"
                className="h-11 w-full rounded-input border border-border bg-surface-muted pl-9 pr-11 text-sm text-text-primary placeholder:text-text-muted transition-colors duration-150 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-border-dark dark:bg-surface-card-dark dark:text-slate-100 dark:placeholder:text-slate-500"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-text-muted transition-colors hover:bg-surface-muted hover:text-text-primary dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-paper-2 dark:bg-paper">
            {!query ? (
              <div className="p-4">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted dark:text-slate-500">
                  Popular searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="rounded-full border border-border bg-surface-light px-3 py-1.5 text-sm font-medium capitalize text-text-secondary transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 dark:border-border-dark dark:bg-surface-card-dark dark:text-slate-300 dark:hover:border-primary-700 dark:hover:bg-primary-950/30 dark:hover:text-primary-300"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-text-secondary dark:bg-surface-card-dark dark:text-slate-400">
                  <Search className="h-5 w-5" />
                </div>
                <p className="text-sm text-text-secondary dark:text-slate-400">
                  No results for <span className="font-semibold text-text-primary dark:text-slate-200">“{query}”</span>
                </p>
              </div>
            ) : (
              <ul className="space-y-2 p-3">
                {results.map((word) => (
                  <li key={word.id}>
                    <div className="flex items-center gap-3 rounded-card border border-border bg-paper px-3 py-3 shadow-(--shadow-xs) transition-colors hover:border-(--color-accent)/30 hover:bg-paper-2 dark:border-border-dark dark:bg-surface-card-dark dark:hover:border-primary-700 dark:hover:bg-slate-800/90">
                      <button
                        type="button"
                        onClick={() => handleSelect(word)}
                        className="flex min-w-0 flex-1 items-center gap-3 text-left"
                      >
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex min-w-0 items-center gap-2">
                            <span className="truncate text-[1rem] font-semibold capitalize leading-5 text-ink dark:text-slate-100">
                              {word.word}
                            </span>
                            <span className="shrink-0 text-[10px] font-medium tracking-[0.06em] text-ink-3 dark:text-slate-500">
                              {word.phonetic}
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-ink-2 dark:text-slate-400">
                            {word.meaning}
                          </p>
                        </div>

                        <Badge variant="primary" size="sm" className="shrink-0 font-semibold text-[11px]">
                          {word.level}
                        </Badge>
                      </button>

                      <button
                        type="button"
                        onClick={() => speakWord(word.word)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface-light text-text-secondary transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 dark:border-border-dark dark:bg-slate-800 dark:text-slate-300 dark:hover:border-primary-700 dark:hover:bg-primary-950/30 dark:hover:text-primary-300"
                        aria-label={`Listen to ${word.word}`}
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
