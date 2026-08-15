import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle, BrainCircuit, ChevronRight, Clock, History, Play } from 'lucide-react'
import { Heading, Text } from '@/components/common'

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const CATEGORIES = [
  {
    id: 'due-today',
    title: 'Due Today',
    description: 'Words scheduled for review based on your learning curve.',
    count: 24,
    icon: BrainCircuit,
    color: 'text-primary-600 dark:text-primary-400',
    bg: 'bg-primary-100 dark:bg-primary-900/40',
    border: 'border-primary-100 hover:border-primary-300 dark:border-primary-900/60 dark:hover:border-primary-700',
  },
  {
    id: 'difficult',
    title: 'Difficult Words',
    description: 'Words you marked as "Hard" or got wrong in quizzes.',
    count: 12,
    icon: AlertTriangle,
    color: 'text-warning-600 dark:text-warning-400',
    bg: 'bg-warning-100 dark:bg-warning-900/40',
    border: 'border-warning-100 hover:border-warning-300 dark:border-warning-900/60 dark:hover:border-warning-700',
  },
  {
    id: 'recently-learned',
    title: 'Recently Learned',
    description: 'New vocabulary from the last 48 hours.',
    count: 18,
    icon: Clock,
    color: 'text-success-600 dark:text-success-400',
    bg: 'bg-success-100 dark:bg-success-900/40',
    border: 'border-success-100 hover:border-success-300 dark:border-success-900/60 dark:hover:border-success-700',
  },
  {
    id: 'forgotten',
    title: 'Frequently Forgotten',
    description: 'Words you keep forgetting during reviews.',
    count: 8,
    icon: History,
    color: 'text-error-600 dark:text-error-400',
    bg: 'bg-error-100 dark:bg-error-900/40',
    border: 'border-error-100 hover:border-error-300 dark:border-error-900/60 dark:hover:border-error-700',
  },
]

export default function ReviewPage() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <Heading level="h1">Review</Heading>
        <Text variant="body-sm" className="mt-1">
          Strengthen your memory with smart reviews.
        </Text>
      </header>

      <motion.div variants={container} initial="hidden" animate="visible" className="space-y-8">

        {/* ── Hero card ── */}
        <motion.div
          variants={item}
          className="relative overflow-hidden rounded-3xl p-8 text-white shadow-lg sm:p-10"
          style={{ background: 'linear-gradient(135deg, var(--color-accent) 0%, oklch(46% 0.145 175) 100%)' }}
        >
          {/* content */}
          <div className="relative z-10 md:w-2/3">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
              style={{ background: 'oklch(99% 0.005 175 / 0.15)' }}>
              <BrainCircuit className="h-4 w-4" />
              Spaced Repetition Active
            </div>

            <h2 className="mb-3 text-3xl font-bold leading-tight sm:text-4xl">
              24 words are ready<br className="hidden sm:block" /> for review today.
            </h2>
            <p className="mb-7 max-w-md text-lg" style={{ color: 'oklch(99% 0.005 175 / 0.8)' }}>
              Consistent daily review moves vocabulary from short-term to long-term memory.
            </p>

            <button
              type="button"
              onClick={() => navigate('/flashcards')}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-bold shadow transition-colors hover:bg-slate-50"
              style={{ color: 'var(--color-accent)' }}
            >
              <Play className="h-5 w-5 fill-current" />
              Start Review
            </button>
          </div>

          {/* decorative icon */}
          <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/3 opacity-10 md:block">
            <BrainCircuit className="h-full w-full scale-150" />
          </div>
        </motion.div>

        {/* ── Categories ── */}
        <div>
          <h3 className="mb-5 text-xl font-bold text-text-primary dark:text-slate-100">
            Review Categories
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              return (
                <motion.div
                  key={cat.id}
                  variants={item}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigate('/flashcards')}
                  className={`group flex cursor-pointer items-center justify-between rounded-2xl border-2 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:bg-surface-card-dark ${cat.border}`}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className={`shrink-0 rounded-2xl p-3.5 ${cat.bg} ${cat.color}`}>
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-text-primary dark:text-slate-100">{cat.title}</h4>
                      <p className="truncate text-sm text-text-secondary dark:text-slate-400">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="ml-4 flex shrink-0 items-center gap-3">
                    <div className="text-right">
                      <span className="block text-2xl font-bold text-text-primary dark:text-slate-100">
                        {cat.count}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-slate-500">
                        Words
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-text-muted transition-colors group-hover:text-text-secondary dark:text-slate-600" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

      </motion.div>
    </div>
  )
}
