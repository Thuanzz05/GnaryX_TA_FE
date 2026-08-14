import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Clock, Target, Trophy, XCircle } from 'lucide-react'
import { Badge, Button, Card, Heading, ProgressBar, Text } from '@/components/common'
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

export default function QuizPage() {
  const [questions] = useState<QuizQuestion[]>(buildQuiz)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [done, setDone] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)

  const { formatted: time, elapsed } = useTimer(quizStarted && !done)

  const current = questions[index]
  const progress = ((index + (selected ? 1 : 0)) / questions.length) * 100

  const handleSelect = (option: string) => {
    if (selected) return
    setSelected(option)
    setAnswers((prev) => ({ ...prev, [index]: option }))
  }

  const handleNext = useCallback(() => {
    if (index + 1 >= questions.length) {
      setDone(true)
    } else {
      setSelected(null)
      setIndex((i) => i + 1)
    }
  }, [index, questions.length])

  const correct = Object.entries(answers).filter(([i, ans]) => ans === questions[Number(i)].correct).length
  const score = Math.round((correct / questions.length) * 100)
  const xp = correct * 10 + (score >= 80 ? 50 : 0)

  if (!quizStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-lg space-y-6 py-8 text-center"
      >
        <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900/40">
          <Target className="h-10 w-10 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <Heading level="h2">Vocabulary Quiz</Heading>
          <Text variant="muted" className="mt-2">Test your knowledge with {questions.length} questions</Text>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: 'Questions', value: `${questions.length}` },
            { label: 'Time', value: 'Untimed' },
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

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-lg space-y-6 py-8"
      >
        <div className="text-center space-y-3">
          <div className="text-5xl">{score >= 80 ? '🎉' : score >= 50 ? '👍' : '💪'}</div>
          <Heading level="h2">{score >= 80 ? 'Great Job!' : score >= 50 ? 'Good Effort!' : 'Keep Practicing!'}</Heading>
        </div>

        <Card padding="lg">
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{score}%</p>
              <p className="text-body-sm text-text-muted dark:text-slate-500">Score</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-success-600 dark:text-success-400">+{xp}</p>
              <p className="text-body-sm text-text-muted dark:text-slate-500">XP Earned</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-text-primary dark:text-slate-100">{correct}/{questions.length}</p>
              <p className="text-body-sm text-text-muted dark:text-slate-500">Correct</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-text-primary dark:text-slate-100">{time}</p>
              <p className="text-body-sm text-text-muted dark:text-slate-500">Time</p>
            </div>
          </div>
        </Card>

        <div className="space-y-2">
          <h3 className="text-heading-4 text-text-primary dark:text-slate-100">Review Answers</h3>
          {questions.map((q, i) => {
            const userAnswer = answers[i]
            const isCorrect = userAnswer === q.correct
            return (
              <div key={i} className={cn(
                'flex items-start gap-3 rounded-xl p-3',
                isCorrect ? 'bg-success-50 dark:bg-success-900/20' : 'bg-error-50 dark:bg-error-900/20',
              )}>
                {isCorrect
                  ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success-500" />
                  : <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-error-500" />}
                <div>
                  <p className="text-body-sm font-semibold capitalize text-text-primary dark:text-slate-100">{q.word}</p>
                  {!isCorrect && (
                    <p className="text-caption text-text-secondary dark:text-slate-400">
                      Correct: {q.correct}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex gap-3">
          <Button fullWidth variant="outline" onClick={() => { setDone(false); setIndex(0); setSelected(null); setAnswers({}) }}>
            Try Again
          </Button>
          <Link to="/dashboard" className="flex-1">
            <Button fullWidth>Dashboard</Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-2xl space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-caption font-semibold uppercase tracking-wide text-text-muted dark:text-slate-500">
            Vocabulary Quiz
          </p>
          <p className="text-body-sm text-text-secondary dark:text-slate-400">
            Question {index + 1} of {questions.length}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-body-sm dark:border-border-dark">
            <Clock className="h-4 w-4 text-text-muted" />
            <span className="font-mono font-medium text-text-primary dark:text-slate-100">{time}</span>
          </div>
          <Badge variant="primary">{correct} / {index} correct</Badge>
        </div>
      </div>

      <ProgressBar value={progress} />

      <Card padding="lg">
        <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-text-muted dark:text-slate-500">
          Which word means...
        </p>
        <h2 className="text-heading-2 text-text-primary dark:text-slate-100">
          &ldquo;{current.correct}&rdquo;
        </h2>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        {current.options.map((option, i) => {
          const isCorrect = option === current.correct
          const isSelected = option === selected
          const revealed = !!selected
          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              disabled={revealed}
              className={cn(
                'flex items-start gap-3 rounded-xl border p-4 text-left transition-all',
                !revealed && 'border-border hover:border-primary-400 hover:bg-primary-50 dark:border-border-dark dark:hover:bg-primary-900/20',
                revealed && isCorrect && 'border-success-500 bg-success-50 dark:bg-success-900/20',
                revealed && isSelected && !isCorrect && 'border-error-500 bg-error-50 dark:bg-error-900/20',
                revealed && !isSelected && !isCorrect && 'border-border opacity-50 dark:border-border-dark',
              )}
            >
              <span className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-caption font-bold',
                revealed && isCorrect ? 'bg-success-500 text-white' :
                revealed && isSelected && !isCorrect ? 'bg-error-500 text-white' :
                'bg-slate-100 text-text-secondary dark:bg-slate-800',
              )}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 text-body capitalize text-text-primary dark:text-slate-200">{option}</span>
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
              selected === current.correct
                ? 'bg-success-50 text-success-700 dark:bg-success-900/20 dark:text-success-400'
                : 'bg-error-50 text-error-700 dark:bg-error-900/20 dark:text-error-400',
            )}
          >
            <div className="flex items-center gap-2">
              {selected === current.correct ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
              <span className="font-medium">
                {selected === current.correct ? 'Correct! +10 XP' : `Correct answer: "${current.correct}"`}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={handleNext}>
              {index + 1 >= questions.length ? 'See Results' : 'Next'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
