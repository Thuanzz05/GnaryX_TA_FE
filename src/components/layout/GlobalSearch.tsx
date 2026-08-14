import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Volume2, X } from 'lucide-react'
import { Badge } from '@/components/common'
import { MOCK_VOCABULARY } from '@/data'
import { speakWord } from '@/utils/speech'
import { cn } from '@/utils/cn'
import type { VocabularyWord } from '@/types'

interface GlobalSearchProps {
  className?: string
}

export function GlobalSearch({ className }: GlobalSearchProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<VocabularyWord[]>([])
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([])
      setOpen(false)
      return
    }
    const q = query.toLowerCase()
    const matches = MOCK_VOCABULARY
      .filter((w) => w.word.toLowerCase().startsWith(q) || w.word.toLowerCase().includes(q))
      .slice(0, 6)
    setSuggestions(matches)
    setOpen(matches.length > 0)
    setHighlighted(-1)
  }, [query])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (word: VocabularyWord) => {
    setQuery('')
    setOpen(false)
    navigate(`/vocabulary/${word.id}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted((h) => Math.max(h - 1, -1))
    } else if (e.key === 'Enter' && highlighted >= 0) {
      e.preventDefault()
      handleSelect(suggestions[highlighted])
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  const handleClear = () => {
    setQuery('')
    setSuggestions([])
    setOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div className="relative flex items-center">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls="search-suggestions"
          aria-activedescendant={highlighted >= 0 ? `suggestion-${highlighted}` : undefined}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && suggestions.length > 0 && setOpen(true)}
          placeholder="Search vocabulary..."
          className="h-9 w-full rounded-lg border border-border bg-surface-muted pl-9 pr-8 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-primary-500 focus:bg-surface-light focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-border-dark dark:bg-slate-800/50 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-primary-400 dark:focus:bg-slate-800"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-text-muted transition-colors hover:text-text-primary dark:hover:text-slate-200"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="search-suggestions"
            role="listbox"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-border bg-surface-light shadow-modal dark:border-border-dark dark:bg-surface-card-dark"
          >
            {suggestions.map((word, i) => (
              <li
                key={word.id}
                id={`suggestion-${i}`}
                role="option"
                aria-selected={highlighted === i}
                className={cn(
                  'flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors',
                  highlighted === i
                    ? 'bg-primary-50 dark:bg-primary-900/20'
                    : 'hover:bg-surface-muted dark:hover:bg-slate-800',
                  i < suggestions.length - 1 && 'border-b border-border-muted dark:border-slate-700/50',
                )}
                onMouseEnter={() => setHighlighted(i)}
                onMouseLeave={() => setHighlighted(-1)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(word)}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold capitalize text-text-primary dark:text-slate-100">
                      {word.word}
                    </span>
                    <span className="text-xs text-text-muted dark:text-slate-500">
                      {word.phonetic}
                    </span>
                  </div>
                  <p className="truncate text-xs text-text-secondary dark:text-slate-400">
                    {word.meaning}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge variant="primary" size="sm">{word.level}</Badge>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => { e.stopPropagation(); speakWord(word.word) }}
                    className="rounded p-1 text-text-muted transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Listen to ${word.word}`}
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
