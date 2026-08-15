import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react'
import { Badge, Button, Heading, ProgressBar, Text } from '@/components/common'
import { Flashcard } from '@/components/flashcards'
import { vocabularyService } from '@/services/vocabularyService'
import { cn } from '@/utils/cn'
import type { VocabularyWord } from '@/types'

type Rating = 'again' | 'hard' | 'good' | 'easy'

const RATING_CONFIG: Record<Rating, { label: string; sub: string; className: string }> = {
  again: {
    label: 'Again',
    sub: '< 1m',
    className:
      'border-2 border-error-100 bg-white text-error-600 hover:border-error-400 hover:bg-error-50 dark:border-error-900/60 dark:bg-surface-card-dark dark:text-error-400 dark:hover:border-error-700 dark:hover:bg-error-900/20',
  },
  hard: {
    label: 'Hard',
    sub: '6m',
    className:
      'border-2 border-warning-100 bg-white text-warning-600 hover:border-warning-400 hover:bg-warning-50 dark:border-warning-900/60 dark:bg-surface-card-dark dark:text-warning-400 dark:hover:border-warning-700 dark:hover:bg-warning-900/20',
  },
  good: {
    label: 'Good',
    sub: '10m',
    className:
      'border-2 border-success-100 bg-white text-success-600 hover:border-success-400 hover:bg-success-50 dark:border-success-900/60 dark:bg-surface-card-dark dark:text-success-400 dark:hover:border-success-700 dark:hover:bg-success-900/20',
  },
  easy: {
    label: 'Easy',
    sub: '4d',
    className:
      'border-2 border-primary-100 bg-white text-primary-600 hover:border-primary-400 hover:bg-primary-50 dark:border-primary-900/60 dark:bg-surface-card-dark dark:text-primary-400 dark:hover:border-primary-700 dark:hover:bg-primary-900/20',
  },
}

export default function FlashcardsPage() {
  const [cards, setCards] = useState<VocabularyWord[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [ratings, setRatings] = useState<Record<string, Rating>>({})

  useEffect(() => {
    vocabularyService.getAll().then((words) => {
      setCards(words)
      setIsLoading(false)
    })
  }, [])

  const current = cards[currentIndex]
  const progress = cards.length > 0 ? (currentIndex / cards.length) * 100 : 0

  const handleRate = useCallback(
    (rating: Rating) => {
      if (!current) return
      setRatings((prev) => ({ ...prev, [current.id]: rating }))
      setIsFlipped(false)
      setTimeout(() => {
        if (currentIndex + 1 >= cards.length) {
          setSessionComplete(true)
        } else {
          setCurrentIndex((i) => i + 1)
        }
      }, 200)
    },
    [current, currentIndex, cards.length],
  )

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false)
      setTimeout(() => setCurrentIndex((i) => i - 1), 150)
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 < cards.length) {
      setIsFlipped(false)
      setTimeout(() => setCurrentIndex((i) => i + 1), 150)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setSessionComplete(false)
    setRatings({})
  }

  // ── Loading ──────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-80 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-700" />
      </div>
    )
  }

  // ── Session complete ─────────────────────────────────────
  if (sessionComplete) {
    const ratingCounts = Object.values(ratings).reduce<Record<Rating, number>>(
      (acc, r) => { acc[r] = (acc[r] ?? 0) + 1; return acc },
      { again: 0, hard: 0, good: 0, easy: 0 },
    )
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-md space-y-6 py-8 text-center"
      >
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-success-100 text-success-600 dark:bg-success-900/30 dark:text-success-400">
          <CheckCircle2 size={48} />
        </div>
        <Heading level="h2">Great Job! 🎉</Heading>
        <Text variant="muted">
          You reviewed all {cards.length} flashcards. Come back tomorrow to strengthen your memory.
        </Text>

        <div className="rounded-xl border border-border p-4 dark:border-border-dark">
          <div className="grid grid-cols-2 gap-3">
            {(['easy', 'good', 'hard', 'again'] as Rating[]).map((r) => (
              <div
                key={r}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2 dark:border-border-dark"
              >
                <span className="text-body-sm capitalize text-text-secondary dark:text-slate-400">{r}</span>
                <span className="font-semibold text-text-primary dark:text-slate-100">{ratingCounts[r]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button fullWidth variant="outline" leftIcon={<RotateCcw className="h-4 w-4" />} onClick={handleRestart}>
            Study Again
          </Button>
          <Link to="/dashboard" className="flex-1">
            <Button fullWidth>Dashboard</Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  if (!current) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-2xl space-y-6 py-2"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Heading level="h1">Flashcards</Heading>
          <Text variant="muted">Business English – Vocabulary</Text>
        </div>
        <Badge variant="outline">{currentIndex + 1} / {cards.length}</Badge>
      </div>

      {/* Progress */}
      <ProgressBar value={progress} size="sm" />

      {/* Card */}
      <Flashcard
        word={current}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(true)}
      />

      {/* Rating buttons — appear after flip */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {(Object.entries(RATING_CONFIG) as [Rating, typeof RATING_CONFIG[Rating]][]).map(([r, cfg]) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRate(r)}
                className={cn(
                  'flex flex-col items-center justify-center rounded-2xl px-2 py-3 transition-all active:scale-95',
                  cfg.className,
                )}
              >
                <span className="font-semibold">{cfg.label}</span>
                <span className="mt-0.5 text-xs opacity-60">{cfg.sub}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <span className="hidden sm:inline">Previous</span>
        </Button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1">
          {cards.slice(0, 10).map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-2 shrink-0 rounded-full transition-all',
                i === currentIndex
                  ? 'w-5 bg-primary-600 dark:bg-primary-400'
                  : i < currentIndex
                    ? 'w-2 bg-primary-200 dark:bg-primary-800'
                    : 'w-2 bg-slate-200 dark:bg-slate-700',
              )}
            />
          ))}
          {cards.length > 10 && (
            <span className="ml-1 text-caption text-text-muted">+{cards.length - 10}</span>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          rightIcon={<ArrowRight className="h-4 w-4" />}
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
        >
          <span className="hidden sm:inline">Next</span>
        </Button>
      </div>
    </motion.div>
  )
}
