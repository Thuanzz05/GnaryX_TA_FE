import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Volume2, XCircle } from 'lucide-react'
import { Badge, Button, Card, ProgressBar } from '@/components/common'
import { MOCK_VOCABULARY } from '@/data'
import { speakWord } from '@/utils/speech'
import { cn } from '@/utils/cn'

interface Question {
  word: string
  phonetic: string
  level: string
  partOfSpeech: string
  correct: string
  options: string[]
  example: string
}

function buildQuestions(): Question[] {
  const words = [...MOCK_VOCABULARY].sort(() => Math.random() - 0.5).slice(0, 8)
  return words.map((w) => {
    const distractors = MOCK_VOCABULARY
      .filter((v) => v.id !== w.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((v) => v.meaningVi)
    return {
      word: w.word,
      phonetic: w.phonetic,
      level: w.level,
      partOfSpeech: w.partOfSpeech,
      correct: w.meaningVi,
      options: [...distractors, w.meaningVi].sort(() => Math.random() - 0.5),
      example: w.example,
    }
  })
}

export function WordMeaningExercise() {
  const [questions] = useState<Question[]>(buildQuestions)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const current = questions[index]
  const progress = (index / questions.length) * 100

  const handleSelect = (option: string) => {
    if (selected) return
    setSelected(option)
    if (option === current.correct) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (index + 1 >= questions.length) { setDone(true); return }
    setSelected(null)
    setIndex((i) => i + 1)
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="space-y-6 py-8 text-center">
        <div className="text-6xl">{pct >= 70 ? '🎉' : '💪'}</div>
        <h2 className="text-heading-2 text-text-primary dark:text-slate-100">
          {pct >= 70 ? 'Well done!' : 'Keep studying!'}
        </h2>
        <p className="text-body text-text-secondary dark:text-slate-400">
          Score: <span className="font-bold text-primary-600 dark:text-primary-400">{score}/{questions.length}</span> ({pct}%)
        </p>
        <Button onClick={() => { setIndex(0); setSelected(null); setScore(0); setDone(false) }}>
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
      <ProgressBar value={progress} />

      <Card padding="lg">
        <p className="mb-3 text-caption font-semibold uppercase tracking-wide text-text-muted dark:text-slate-500">
          What is the Vietnamese meaning?
        </p>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="primary">{current.level}</Badge>
          <Badge variant="outline" className="capitalize">{current.partOfSpeech}</Badge>
        </div>
        <h3 className="text-3xl font-bold capitalize text-text-primary dark:text-slate-100">
          {current.word}
        </h3>
        <p className="mt-1 text-body text-text-secondary dark:text-slate-400">{current.phonetic}</p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => speakWord(current.word)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-body-sm text-text-secondary transition-colors hover:bg-surface-muted dark:border-border-dark dark:hover:bg-slate-800"
          >
            <Volume2 className="h-3.5 w-3.5" /> Listen
          </button>
        </div>
        {current.example && (
          <p className="mt-3 text-body-sm italic text-text-muted dark:text-slate-500 border-l-2 border-border pl-3 dark:border-border-dark">
            &ldquo;{current.example}&rdquo;
          </p>
        )}
      </Card>

      <div className="space-y-3">
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
                'flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all',
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
              <span className="flex-1 text-body text-text-primary dark:text-slate-200">{option}</span>
              {revealed && isCorrect && <CheckCircle2 className="h-5 w-5 shrink-0 text-success-500" />}
              {revealed && isSelected && !isCorrect && <XCircle className="h-5 w-5 shrink-0 text-error-500" />}
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={cn(
              'flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between',
              selected === current.correct
                ? 'bg-success-50 text-success-700 dark:bg-success-900/20 dark:text-success-400'
                : 'bg-error-50 text-error-700 dark:bg-error-900/20 dark:text-error-400',
            )}
          >
            <div className="flex items-center gap-2">
              {selected === current.correct
                ? <CheckCircle2 className="h-5 w-5 shrink-0" />
                : <XCircle className="h-5 w-5 shrink-0" />}
              <span className="font-medium text-sm">
                {selected === current.correct ? 'Correct!' : `Answer: "${current.correct}"`}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={handleNext} className="w-full sm:w-auto">
              {index + 1 >= questions.length ? 'Finish' : 'Next'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
