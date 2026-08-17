import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Volume2, XCircle } from 'lucide-react'
import { Button, Card, ProgressBar, Skeleton } from '@/components/common'
import { usePracticeWords } from '@/hooks'
import type { VocabularyWord } from '@/types'
import { speakWord } from '@/utils/speech'
import { cn } from '@/utils/cn'

interface Question { word: string; options: string[] }

function buildQuestions(words: VocabularyWord[]): Question[] {
  const pool = [...words].sort(() => Math.random() - 0.5).slice(0, 6)
  return pool.map((w) => {
    const distractors = words
      .filter((v) => v.id !== w.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((v) => v.word)
    return { word: w.word, options: [...distractors, w.word].sort(() => Math.random() - 0.5) }
  })
}

export function ListeningExercise() {
  const { words, isLoading, error } = usePracticeWords()
  const [questions, setQuestions] = useState<Question[]>([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [played, setPlayed] = useState(false)

  useEffect(() => {
    if (words.length >= 4) setQuestions(buildQuestions(words))
  }, [words])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    )
  }

  if (error || questions.length === 0) {
    return (
      <Card padding="lg" className="text-center text-body-sm text-text-secondary dark:text-slate-400">
        {error || 'Not enough vocabulary words to build this exercise yet.'}
      </Card>
    )
  }

  const current = questions[index]

  const handleListen = () => {
    speakWord(current.word)
    setPlayed(true)
  }

  const handleSelect = (option: string) => {
    if (selected || !played) return
    setSelected(option)
    if (option === current.word) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (index + 1 >= questions.length) { setDone(true) } 
    else { setSelected(null); setPlayed(false); setIndex((i) => i + 1) }
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6 py-8 text-center"
      >
        <div className="text-6xl">{pct >= 70 ? '🎧' : '💪'}</div>
        <h2 className="text-heading-2 text-text-primary dark:text-slate-100">
          {pct >= 70 ? 'Great listening!' : 'Keep practicing!'}
        </h2>
        <p className="text-body text-text-secondary dark:text-slate-400">
          Score: <span className="font-bold text-primary-600 dark:text-primary-400">{score}/{questions.length}</span> ({pct}%)
        </p>
        <Button onClick={() => { setIndex(0); setSelected(null); setPlayed(false); setScore(0); setDone(false) }}>
          Try Again
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-body-sm text-text-secondary dark:text-slate-400">
        <span>Question {index + 1} of {questions.length}</span>
        <span className="font-medium text-primary-600 dark:text-primary-400">{score} correct</span>
      </div>
      <ProgressBar value={(index / questions.length) * 100} />

      <Card padding="lg" className="text-center">
        <p className="mb-6 text-body text-text-secondary dark:text-slate-400">
          Listen and choose the correct word
        </p>
        <button
          type="button"
          onClick={handleListen}
          className={cn(
            'mx-auto flex h-20 w-20 items-center justify-center rounded-full transition-all',
            'bg-primary-100 text-primary-600 hover:bg-primary-200 active:scale-95',
            'dark:bg-primary-900/40 dark:text-primary-400 dark:hover:bg-primary-900/60',
          )}
          aria-label="Listen to pronunciation"
        >
          <Volume2 className="h-8 w-8" />
        </button>
        {!played && (
          <p className="mt-4 text-caption text-text-muted dark:text-slate-500">
            Press the button to listen
          </p>
        )}
      </Card>

      <div className="grid grid-cols-2 gap-3">
        {current.options.map((option) => {
          const isCorrect = option === current.word
          const isSelected = option === selected
          const revealed = !!selected
          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              disabled={!played || revealed}
              className={cn(
                'rounded-xl border p-4 text-center font-medium capitalize transition-all',
                !played && 'cursor-not-allowed opacity-40',
                played && !revealed && 'border-border hover:border-primary-400 hover:bg-primary-50 dark:border-border-dark dark:hover:bg-primary-900/20',
                revealed && isCorrect && 'border-success-500 bg-success-50 text-success-700 dark:bg-success-900/20 dark:text-success-400',
                revealed && isSelected && !isCorrect && 'border-error-500 bg-error-50 text-error-700 dark:bg-error-900/20 dark:text-error-400',
                revealed && !isSelected && !isCorrect && 'border-border opacity-50',
              )}
            >
              {option}
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'flex items-center justify-between rounded-xl p-4',
              selected === current.word
                ? 'bg-success-50 text-success-700 dark:bg-success-900/20 dark:text-success-400'
                : 'bg-error-50 text-error-700 dark:bg-error-900/20 dark:text-error-400',
            )}
          >
            <div className="flex items-center gap-2">
              {selected === current.word ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
              <span className="font-medium">
                {selected === current.word ? 'Correct!' : `The word was: "${current.word}"`}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={handleNext}>
              {index + 1 >= questions.length ? 'Finish' : 'Next'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
