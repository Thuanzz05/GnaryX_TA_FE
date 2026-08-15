import { useEffect, useRef, useState } from 'react'
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

export function MobileSearchSheet({ open, onClose }: MobileSearchSheetProps) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<VocabularyWord[]>([])

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults([])
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const q = query.toLowerCase()
    setResults(
      MOCK_VOCABULARY
        .filter(w => w.word.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q))
        .slice(0, 8),
    )
  }, [query])

  const handleSelect = (word: VocabularyWord) => {
    onClose()
    setQuery('')
    navigate(`/vocabulary/${word.id}`)
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col bg-surface-light dark:bg-surface-dark lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Search vocabulary"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3 dark:border-border-dark">
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-muted dark:text-slate-400 dark:hover:bg-slate-800"
              aria-label="Close search"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search vocabulary..."
                autoComplete="off"
                className="h-10 w-full rounded-xl border border-border bg-surface-muted pl-9 pr-9 text-body text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-border-dark dark:bg-slate-800 dark:text-slate-100"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                  aria-label="Clear"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto">
            {query && results.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-16 text-center">
                <Search className="h-10 w-10 text-slate-300 dark:text-slate-600" />
                <p className="text-body text-text-secondary dark:text-slate-400">
                  No results for &ldquo;{query}&rdquo;
                </p>
              </div>
            ) : results.length > 0 ? (
              <ul>
                {results.map((word) => (
                  <li key={word.id} className="border-b border-border-muted dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => handleSelect(word)}
                      className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-surface-muted dark:hover:bg-slate-800/50"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold capitalize text-text-primary dark:text-slate-100">
                            {word.word}
                          </span>
                          <span className="text-body-sm text-text-muted dark:text-slate-500">
                            {word.phonetic}
                          </span>
                        </div>
                        <p className="text-body-sm text-text-secondary dark:text-slate-400 truncate">
                          {word.meaning}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <Badge variant="primary" size="sm">{word.level}</Badge>
                        <button
                          type="button"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => { e.stopPropagation(); speakWord(word.word) }}
                          className="rounded-full p-1.5 text-text-muted transition-colors hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30"
                          aria-label={`Listen to ${word.word}`}
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-6">
                <p className="mb-3 text-caption font-semibold uppercase tracking-wide text-text-muted dark:text-slate-500">
                  Popular searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {['resilient', 'achieve', 'strategy', 'collaborate', 'flexible'].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setQuery(w)}
                      className="rounded-full border border-border px-3 py-1.5 text-body-sm capitalize text-text-secondary transition-colors hover:border-primary-400 hover:text-primary-600 dark:border-border-dark dark:text-slate-400"
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
