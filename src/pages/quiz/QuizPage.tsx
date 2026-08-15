import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, CheckCircle2, Target, Timer, X, XCircle } from 'lucide-react'
import { Button, Card, Heading, ProgressBar, Text } from '@/components/common'
import { MOCK_VOCABULARY } from '@/data'
import { cn } from '@/utils/cn'

interface QuizQuestion {
  word: string
  question: string
  options: string[]
  correct: string
}

function buildQuiz(): QuizQuestion[] {
  const words = [...MOCK_VOCABULARY].sort(() => Math.random() - 0.5).slice(0, 10)
  return words.map((w) => {
    const distractors = MOCK_VOCABULARY
      .filter((v) => v.id !== w.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((v) => v.meaning)
    return {
      word: w.word,
      question: `Which word means "${w.meaning}"?`,
      options: [...distractors, w.meaning].sort(() => Math.random() - 0.5),
      correct: w.meaning,
    }
  })
}

function useTimer(active: boolean) {
  const [elapsed, setElapsed] = useState(0)
  const ref = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (active) {
      ref.current = setInterval(() => setElapsed((s) => s + 1), 1000)
    } else {
      if (ref.current) clearInterval(ref.current)
    }
    return () => { if (ref.current) clearInterval(ref.current) }
  }, [active])

  const formatted = `${String(Math.floor(elapsed / 60)).padStart(2, '0')}:${String(elapsed % 60).padStart(2, '0')}`
  return { elapsed, formatted }
}

// 10-minute countdown
const TIME_LIMIT = 600

export default function QuizPage() {
  const navigate = useNavigate()
  const [questions] = useState<QuizQuestion[]>(buildQuiz)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [quizStarted, setQuizStarted] = useState(false)
  const { elapsed } = useTimer(quizStarted)

  const current = questions[index]
  const progress = (index / questions.length) * 100
  const timeLeft = TIME_LIMIT - elapsed
  const timeFormatted = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(Math.max(timeLeft % 60, 0)).padStart(2, '0')}`

  const correct = Object.entries(answers).filter(
    ([i, ans]) => ans === questions[Number(i)].correct,
  ).length

  const finishQuiz = useCallback(() => {
    navigate('/quiz/result', {
      state: { score: correct, total: questions.length, timeSpent: elapsed },
    })
  }, [correct, elapsed, navigate, questions.length])

  // Auto-finish on timeout
  useEffect(() => {
    if (quizStarted && timeLeft <= 0) finishQuiz()
  }, [quizStarted, timeLeft, finishQuiz])

  const handleSelect = (option: string) => {
    if (isChecked) return
    setSelected(option)
  }

  const handleCheck = () => {
    if (!selected) return
    setIsChecked(true)
    setAnswers((prev) => ({ ...prev, [index]: selected }))
  }

  const handleNext = useCallback(() => {
    if (index + 1 >= questions.length) {
      finishQuiz()
    } else {
      setSelected(null)
      setIsChecked(false)
      setIndex((i) => i + 1)
    }
  }, [index, questions.length, finishQuiz])

  // ── Pre-quiz lobby ───────────────────────────────────────
  if (!quizStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-lg space-y-6 py-8 text-center"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900/40">
          <Target className="h-10 w-10 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <Heading level="h2">Vocabulary Quiz</Heading>
          <Text variant="muted" className="mt-2">
            Test your knowledge with {questions.length} questions
          </Text>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: 'Questions', value: `${questions.length}` },
            { label: 'Time Limit', value: '10 min' },
            { label: 'XP Reward', value: `Up to ${questions.length * 10 + 50}` },
          ].map((item) => (
            <Card key={item.label} padding="md">
              <p className="text-heading-3 text-primary-600 dark:text-primary-400">{item.value}</p>
              <p className="text-caption text-text-muted dark:text-slate-500">{item.label}</p>
            </Card>
          ))}
        </div>
        <Button size="lg" fullWidth onClick={() => setQuizStarted(true)}>
          Start Quiz
        </Button>
      </motion.div>
    )
  }

  // ── Quiz ─────────────────────────────────────────────────
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Sticky header */}
      <header className="sticky top-16 z-10 border-b border-border bg-surface-light/95 px-4 py-3 backdrop-blur-sm dark:border-border-dark dark:bg-surface-card-dark/95 lg:top-0">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-muted dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Exit quiz"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex-1">
            <div className="mb-1.5 flex items-center justify-between text-body-sm">
              <span className="font-semibold uppercase tracking-wide text-text-muted dark:text-slate-500">
                Question {index + 1} of {questions.length}
              </span>
              <div className="flex items-center gap-1.5 font-mono font-medium text-primary-600 dark:text-primary-400">
                <Timer className="h-4 w-4" />
                {timeFormatted}
              </div>
            </div>
            <ProgressBar value={progress} size="sm" />
          </div>

          <div className="w-9" aria-hidden="true" />
        </div>
      </header>

      {/* Question */}
      <main className="flex flex-1 flex-col justify-center py-8">
        <div className="mx-auto w-full max-w-3xl px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="mb-8 text-center text-2xl font-bold leading-snug text-text-primary dark:text-slate-100 sm:text-3xl">
                {current.question}
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {current.options.map((option) => {
                  const isSelected = selected === option
                  const isCorrect = option === current.correct
                  let cls = 'border-border bg-white text-text-primary hover:border-primary-400 hover:bg-primary-50 dark:border-border-dark dark:bg-surface-card-dark dark:text-slate-200 dark:hover:bg-primary-900/20'

                  if (isChecked) {
                    if (isCorrect) {
                      cls = 'border-success-500 bg-success-50 text-success-800 ring-1 ring-success-500 dark:bg-success-900/20 dark:text-success-300'
                    } else if (isSelected) {
                      cls = 'border-error-500 bg-error-50 text-error-800 ring-1 ring-error-500 dark:bg-error-900/20 dark:text-error-300'
                    } else {
                      cls = 'border-border bg-slate-50 text-text-muted opacity-60 dark:border-border-dark dark:bg-slate-800/40'
                    }
                  } else if (isSelected) {
                    cls = 'border-primary-600 bg-primary-50 text-primary-800 ring-1 ring-primary-600 dark:border-primary-500 dark:bg-primary-900/20 dark:text-primary-200'
                  }

                  return (
                    <motion.button
                      key={option}
                      type="button"
                      whileHover={{ scale: isChecked ? 1 : 1.015 }}
                      whileTap={{ scale: isChecked ? 1 : 0.98 }}
                      onClick={() => handleSelect(option)}
                      disabled={isChecked}
                      className={cn(
                        'rounded-2xl border-2 p-5 text-left text-base font-medium transition-all duration-150',
                        cls,
                      )}
                    >
                      {option}
                    </motion.button>
                  )
                })}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {isChecked && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'mt-6 flex items-center gap-2 rounded-xl p-4 text-base font-medium',
                      selected === current.correct
                        ? 'bg-success-50 text-success-800 dark:bg-success-900/20 dark:text-success-300'
                        : 'bg-error-50 text-error-800 dark:bg-error-900/20 dark:text-error-300',
                    )}
                  >
                    {selected === current.correct
                      ? <CheckCircle2 className="h-5 w-5 shrink-0" />
                      : <XCircle className="h-5 w-5 shrink-0" />}
                    {selected === current.correct ? '✓ Correct! Great job.' : '✕ Not quite right.'}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer actions */}
      <footer className="border-t border-border bg-surface-light px-4 py-4 dark:border-border-dark dark:bg-surface-card-dark">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <button
            type="button"
            className="flex items-center gap-2 text-body-sm font-medium text-text-muted transition-colors hover:text-text-secondary dark:text-slate-500"
          >
            <AlertCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Report Issue</span>
          </button>

          {!isChecked ? (
            <Button
              size="lg"
              onClick={handleCheck}
              disabled={!selected}
              className="min-w-[160px]"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={handleNext}
              className="min-w-[160px]"
            >
              {index + 1 >= questions.length ? 'View Results' : 'Next Question →'}
            </Button>
          )}
        </div>
      </footer>
    </div>
  )
}
