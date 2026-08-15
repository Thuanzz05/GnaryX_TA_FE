import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  CheckSquare,
  Ear,
  PenLine,
  Shuffle,
  SpellCheck,
  X,
} from 'lucide-react'
import { Badge, Button, Card, Heading, Text } from '@/components/common'
import { MultipleChoiceExercise } from '@/components/practice/MultipleChoiceExercise'
import { FillInBlankExercise } from '@/components/practice/FillInBlankExercise'
import { MatchingExercise } from '@/components/practice/MatchingExercise'
import { ListeningExercise } from '@/components/practice/ListeningExercise'
import { SpellingExercise } from '@/components/practice/SpellingExercise'
import { WordMeaningExercise } from '@/components/practice/WordMeaningExercise'

type ExerciseType = 'multiple-choice' | 'fill-blank' | 'matching' | 'listening' | 'spelling' | 'word-meaning'

interface ExerciseMode {
  id: ExerciseType
  title: string
  description: string
  icon: React.ElementType
  difficulty: string
  time: string
  color: string
}

const EXERCISE_MODES: ExerciseMode[] = [
  {
    id: 'multiple-choice',
    title: 'Multiple Choice',
    description: 'Choose the correct meaning from four options',
    icon: CheckSquare,
    difficulty: 'Easy',
    time: '5 min',
    color: 'bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400',
  },
  {
    id: 'word-meaning',
    title: 'Word Meaning',
    description: 'Choose the correct Vietnamese meaning for each word',
    icon: BookOpen,
    difficulty: 'Easy',
    time: '5 min',
    color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400',
  },
  {
    id: 'fill-blank',
    title: 'Fill in the Blank',
    description: 'Complete the sentence with the correct word',
    icon: PenLine,
    difficulty: 'Medium',
    time: '5 min',
    color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-400',
  },
  {
    id: 'matching',
    title: 'Matching',
    description: 'Match words to their correct meanings',
    icon: Shuffle,
    difficulty: 'Medium',
    time: '3 min',
    color: 'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400',
  },
  {
    id: 'spelling',
    title: 'Spelling',
    description: 'Listen and type the correct spelling of each word',
    icon: SpellCheck,
    difficulty: 'Hard',
    time: '5 min',
    color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400',
  },
  {
    id: 'listening',
    title: 'Listening',
    description: 'Listen and identify the correct word',
    icon: Ear,
    difficulty: 'Hard',
    time: '5 min',
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400',
  },
]

const DIFFICULTY_VARIANT: Record<string, 'success' | 'warning' | 'error'> = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'error',
}

export default function PracticePage() {
  const [activeExercise, setActiveExercise] = useState<ExerciseType | null>(null)

  if (activeExercise) {
    const mode = EXERCISE_MODES.find((m) => m.id === activeExercise)
    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <Heading level="h2">{mode?.title}</Heading>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveExercise(null)}
            leftIcon={<X className="h-4 w-4" />}
          >
            Exit
          </Button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExercise}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            {activeExercise === 'multiple-choice' && <MultipleChoiceExercise />}
            {activeExercise === 'fill-blank' && <FillInBlankExercise />}
            {activeExercise === 'matching' && <MatchingExercise />}
            {activeExercise === 'listening' && <ListeningExercise />}
            {activeExercise === 'spelling' && <SpellingExercise />}
            {activeExercise === 'word-meaning' && <WordMeaningExercise />}
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-4xl space-y-6"
    >
      <header className="space-y-2">
        <Heading level="h1">Practice</Heading>
        <Text variant="body-sm">Sharpen your vocabulary with targeted exercises.</Text>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EXERCISE_MODES.map((mode, index) => {
          const Icon = mode.icon
          return (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
            >
              <Card
                className="flex h-full flex-col cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5"
                padding="lg"
                onClick={() => setActiveExercise(mode.id)}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${mode.color}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <Badge variant={DIFFICULTY_VARIANT[mode.difficulty]} size="sm">
                    {mode.difficulty}
                  </Badge>
                </div>
                <div className="flex-1">
                  <h3 className="text-heading-4 mb-1 text-text-primary dark:text-slate-100">
                    {mode.title}
                  </h3>
                  <p className="text-body-sm text-text-secondary dark:text-slate-400">
                    {mode.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-caption text-text-muted dark:text-slate-500">~{mode.time}</span>
                  <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); setActiveExercise(mode.id) }}>
                    Start
                  </Button>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
