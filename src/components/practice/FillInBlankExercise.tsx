import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'
import { Button, Card, ProgressBar } from '@/components/common'
import { MOCK_VOCABULARY } from '@/data'
import { cn } from '@/utils/cn'

interface Question {
  sentence: string
  answer: string
  hint: string
}

function buildQuestions(): Question[] {
  return MOCK_VOCABULARY
    .filter((w) => w.example)
    .sort(() => Math.random() - 0.5)
    .slice(0, 6)
    .map((w) => ({
      sentence: w.example.replace(new RegExp(w.word, 'i'), '_____'),
      answer: w.word.toLowerCase(),
      hint: w.meaningVi,
    }))
}

export function FillInBlankExercise() {
  const [questions] = useState<Question[]>(buildQuestions)
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const current = questions[index]
  const isCorrect = input.trim().toLowerCase() === current.answer

  const handleCheck = () => {
    if (!input.trim()) return
    setSubmitted(true)
    if (isCorrect) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (index + 1 >= questions.length) {
      setDone(true)
    } else {
      setInput('')
      setSubmitted(false)
      setIndex((i) => i + 1)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6 py-8 text-center"
      >
        <div className="text-6xl">{pct >= 70 ? '🎉' : '💪'}</div>
        <h2 className="text-heading-2 text-text-primary dark:text-slate-100">
          {pct >= 70 ? 'Excellent!' : 'Keep it up!'}
        </h2>
        <p className="text-body text-text-secondary dark:text-slate-400">
          Score: <span className="font-bold text-primary-600 dark:text-primary-400">{score}/{questions.length}</span> ({pct}%)
        </p>
        <Button onClick={() => { setIndex(0); setInput(''); setSubmitted(false); setScore(0); setDone(false) }}>
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

      <Card padding="lg" className="space-y-4">
        <p className="text-caption font-semibold uppercase tracking-wide text-text-muted dark:text-slate-500">
          Fill in the blank
        </p>
        <p className="text-lg leading-relaxed text-text-primary dark:text-slate-100">
          {current.sentence}
        </p>
        <p className="text-body-sm text-text-secondary dark:text-slate-400">
          Hint: <span className="italic">{current.hint}</span>
        </p>
      </Card>

      <div className="space-y-3">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submitted ? handleNext() : handleCheck() }}
          disabled={submitted}
          placeholder="Type your answer..."
          autoFocus
          className={cn(
            'h-12 w-full rounded-xl border px-4 text-body transition-colors',
            'focus:outline-none focus:ring-2',
            submitted && isCorrect
              ? 'border-success-500 bg-success-50 text-success-700 focus:ring-success-500/20 dark:bg-success-900/20 dark:text-success-400'
              : submitted && !isCorrect
                ? 'border-error-500 bg-error-50 text-error-700 focus:ring-error-500/20 dark:bg-error-900/20 dark:text-error-400'
                : 'border-border bg-white focus:border-primary-500 focus:ring-primary-500/20 dark:border-border-dark dark:bg-surface-card-dark dark:text-slate-100',
          )}
        />
        {!submitted ? (
          <Button fullWidth onClick={handleCheck} disabled={!input.trim()}>
            Check Answer
          </Button>
        ) : null}
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'flex items-center justify-between rounded-xl p-4',
              isCorrect
                ? 'bg-success-50 text-success-700 dark:bg-success-900/20 dark:text-success-400'
                : 'bg-error-50 text-error-700 dark:bg-error-900/20 dark:text-error-400',
            )}
          >
            <div className="flex items-center gap-2">
              {isCorrect ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
              <span className="font-medium">
                {isCorrect ? 'Correct!' : `Answer: "${current.answer}"`}
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
