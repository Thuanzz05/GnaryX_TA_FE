import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  RotateCcw,
  Volume2,
} from 'lucide-react'
import { Badge, Button, Card, Heading, ProgressBar, Text } from '@/components/common'
import { vocabularyService } from '@/services/vocabularyService'
import { speakWord } from '@/utils/speech'
import { cn } from '@/utils/cn'
import type { VocabularyWord } from '@/types'

type Rating = 'again' | 'hard' | 'good' | 'easy'

const RATING_CONFIG: Record<Rating, { label: string; className: string }> = {
  again: { label: 'Again', className: 'border-error-300 bg-error-50 text-error-700 hover:bg-error-100 dark:border-error-800 dark:bg-error-900/20 dark:text-error-400' },
  hard:  { label: 'Hard',  className: 'border-warning-300 bg-warning-50 text-warning-700 hover:bg-warning-100 dark:border-warning-800 dark:bg-warning-900/20 dark:text-warning-400' },
  good:  { label: 'Good',  className: 'border-primary-300 bg-primary-50 text-primary-700 hover:bg-primary-100 dark:border-primary-800 dark:bg-primary-900/20 dark:text-primary-400' },
  easy:  { label: 'Easy',  className: 'border-success-300 bg-success-50 text-success-700 hover:bg-success-100 dark:border-success-800 dark:bg-success-900/20 dark:text-success-400' },
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
  const progress = cards.length > 0 ? ((currentIndex) / cards.length) * 100 : 0

  const handleFlip = () => setIsFlipped((p) => !p)

  const handleRate = useCallback((rating: Rating) => {
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
  }, [current, currentIndex, cards.length])

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

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-80 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700" />
      </div>
    )
  }

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
        <div className="text-6xl">🎉</div>
        <Heading level="h2">Session Complete!</Heading>
        <Text variant="muted">You reviewed all {cards.length} flashcards.</Text>

        <Card padding="md" className="text-left">
          <div className="grid grid-cols-2 gap-4">
            {(['easy', 'good', 'hard', 'again'] as Rating[]).map((r) => (
              <div key={r} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 dark:border-border-dark">
                <span className="text-body-sm capitalize text-text-secondary dark:text-slate-400">{r}</span>
                <span className="font-semibold text-text-primary dark:text-slate-100">{ratingCounts[r]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Button fullWidth onClick={handleRestart} leftIcon={<RotateCcw className="h-4 w-4" />}>
          Study Again
        </Button>
      </motion.div>
    )
  }

  if (!current) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-2xl space-y-6"
    >
      <header className="flex items-center justify-between">
        <div>
          <Heading level="h1">Flashcards</Heading>
          <Text variant="muted">Business English – Vocabulary</Text>
        </div>
        <Badge variant="outline">{currentIndex + 1} / {cards.length}</Badge>
      </header>

      <ProgressBar value={progress} size="sm" />

      {/* Card */}
      <div
        className="relative cursor-pointer"
        style={{ perspective: '1200px', height: 'clamp(260px, 45vw, 340px)' }}
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        aria-label={isFlipped ? 'Show front' : 'Show back'}
        onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? handleFlip() : undefined}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-2xl border border-border bg-white p-8 shadow-lg dark:border-border-dark dark:bg-surface-card-dark"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <Badge variant="primary">{current.level}</Badge>
              <h2 className="text-5xl font-bold uppercase tracking-wide text-text-primary dark:text-slate-100">
                {current.word}
              </h2>
              <p className="text-body text-text-secondary dark:text-slate-400">{current.phonetic}</p>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); speakWord(current.word) }}
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-body-sm text-text-secondary transition-colors hover:bg-surface-muted dark:border-border-dark dark:hover:bg-slate-800"
                aria-label="Listen"
              >
                <Volume2 className="h-4 w-4" /> Listen
              </button>
              <p className="mt-4 text-caption text-text-muted dark:text-slate-500">Click to reveal answer</p>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-8 shadow-lg dark:border-primary-800/40 dark:from-primary-950/30 dark:to-surface-card-dark"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Badge variant="primary">{current.level}</Badge>
                  <Badge variant="outline" className="capitalize">{current.partOfSpeech}</Badge>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); speakWord(current.word) }}
                  className="rounded-full p-2 text-text-muted transition-colors hover:bg-white/60 dark:text-slate-400"
                  aria-label="Listen"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 text-center">
                <p className="text-2xl font-bold capitalize text-text-primary dark:text-slate-100">{current.word}</p>
                <p className="text-body text-text-secondary dark:text-slate-300">{current.phonetic}</p>
                <p className="text-heading-4 text-text-primary dark:text-slate-100">{current.meaning}</p>
                <p className="text-body-sm text-primary-600 dark:text-primary-400">{current.meaningVi}</p>
              </div>

              <blockquote className="rounded-lg bg-white/60 px-4 py-3 text-center italic text-body-sm text-text-secondary dark:bg-slate-800/40 dark:text-slate-300">
                &ldquo;{current.example}&rdquo;
              </blockquote>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Rating buttons – only visible after flip */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-4 gap-3"
          >
            {(Object.entries(RATING_CONFIG) as [Rating, { label: string; className: string }][]).map(([r, cfg]) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRate(r)}
                className={cn(
                  'rounded-xl border py-3 text-body-sm font-semibold transition-all active:scale-95',
                  cfg.className,
                )}
              >
                {cfg.label}
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
        <div className="flex items-center gap-1 overflow-hidden max-w-[160px] sm:max-w-none">
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

      <Card padding="md" className="bg-surface-muted dark:bg-slate-800/50">
        <div className="flex items-center gap-2 text-body-sm text-text-secondary dark:text-slate-400">
          <BookOpen className="h-4 w-4 shrink-0" />
          <span>Rate each card to track your progress. Cards rated <strong className="text-text-primary dark:text-slate-200">Again</strong> or <strong className="text-text-primary dark:text-slate-200">Hard</strong> will appear more often.</span>
        </div>
      </Card>
    </motion.div>
  )
}
