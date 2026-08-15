import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/common'
import { MOCK_VOCABULARY } from '@/data'
import { cn } from '@/utils/cn'

interface Pair { id: string; word: string; meaning: string }

function buildPairs(): Pair[] {
  return MOCK_VOCABULARY
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)
    .map((w) => ({ id: w.id, word: w.word, meaning: w.meaning }))
}

export function MatchingExercise() {
  const [pairs] = useState<Pair[]>(buildPairs)
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null)
  const [matched, setMatched] = useState<string[]>([])
  const [wrong, setWrong] = useState<string[]>([])
  const [done, setDone] = useState(false)

  const shuffledMeanings = useState(() => [...pairs].sort(() => Math.random() - 0.5))[0]

  const handleWordClick = (id: string) => {
    if (matched.includes(id)) return
    setWrong([])
    setSelectedWord(id)
    if (selectedMeaning) checkMatch(id, selectedMeaning)
  }

  const handleMeaningClick = (id: string) => {
    if (matched.includes(id)) return
    setWrong([])
    setSelectedMeaning(id)
    if (selectedWord) checkMatch(selectedWord, id)
  }

  const checkMatch = (wordId: string, meaningId: string) => {
    if (wordId === meaningId) {
      const next = [...matched, wordId]
      setMatched(next)
      if (next.length === pairs.length) setDone(true)
    } else {
      setWrong([wordId, meaningId])
      setTimeout(() => setWrong([]), 600)
    }
    setSelectedWord(null)
    setSelectedMeaning(null)
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6 py-8 text-center"
      >
        <div className="text-6xl">🎉</div>
        <h2 className="text-heading-2 text-text-primary dark:text-slate-100">All matched!</h2>
        <p className="text-body text-text-secondary dark:text-slate-400">
          You matched all {pairs.length} pairs correctly.
        </p>
        <Button onClick={() => window.location.reload()}>Play Again</Button>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <p className="text-body-sm text-text-secondary dark:text-slate-400">
        Select a word on the left and its matching meaning on the right.
        <span className="ml-2 font-medium text-primary-600 dark:text-primary-400">
          {matched.length}/{pairs.length} matched
        </span>
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-3">
          {pairs.map((pair) => {
            const isMatched = matched.includes(pair.id)
            const isSelected = selectedWord === pair.id
            const isWrong = wrong.includes(pair.id)
            return (
              <motion.button
                key={pair.id}
                type="button"
                onClick={() => handleWordClick(pair.id)}
                disabled={isMatched}
                animate={isWrong ? { x: [-6, 6, -4, 4, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={cn(
                  'w-full rounded-xl border px-4 py-3 text-left text-body font-semibold capitalize transition-all',
                  isMatched && 'border-success-400 bg-success-50 text-success-700 opacity-80 dark:border-success-700 dark:bg-success-900/20 dark:text-success-400',
                  isSelected && !isMatched && 'border-primary-500 bg-primary-50 text-primary-700 ring-2 ring-primary-500/30 dark:bg-primary-900/20 dark:text-primary-400',
                  isWrong && 'border-error-400 bg-error-50 text-error-700 dark:bg-error-900/20 dark:text-error-400',
                  !isMatched && !isSelected && !isWrong && 'border-border bg-white hover:border-primary-300 hover:bg-primary-50 dark:border-border-dark dark:bg-surface-card-dark dark:hover:bg-slate-800',
                )}
              >
                <span className="flex items-center gap-2">
                  {isMatched && <CheckCircle2 className="h-4 w-4 shrink-0" />}
                  {pair.word}
                </span>
              </motion.button>
            )
          })}
        </div>

        <div className="space-y-3">
          {shuffledMeanings.map((pair) => {
            const isMatched = matched.includes(pair.id)
            const isSelected = selectedMeaning === pair.id
            const isWrong = wrong.includes(pair.id)
            return (
              <motion.button
                key={pair.id}
                type="button"
                onClick={() => handleMeaningClick(pair.id)}
                disabled={isMatched}
                animate={isWrong ? { x: [-6, 6, -4, 4, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={cn(
                  'w-full rounded-xl border px-4 py-3 text-left text-body-sm transition-all',
                  isMatched && 'border-success-400 bg-success-50 text-success-700 opacity-80 dark:border-success-700 dark:bg-success-900/20 dark:text-success-400',
                  isSelected && !isMatched && 'border-primary-500 bg-primary-50 text-primary-700 ring-2 ring-primary-500/30 dark:bg-primary-900/20 dark:text-primary-400',
                  isWrong && 'border-error-400 bg-error-50 text-error-700 dark:bg-error-900/20 dark:text-error-400',
                  !isMatched && !isSelected && !isWrong && 'border-border bg-white hover:border-primary-300 hover:bg-primary-50 dark:border-border-dark dark:bg-surface-card-dark dark:hover:bg-slate-800',
                )}
              >
                {pair.meaning}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
