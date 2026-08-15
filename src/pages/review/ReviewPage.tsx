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
          className="bg-indigo-600 rounded-2xl sm:rounded-3xl p-5 sm:p-10 text-white relative overflow-hidden shadow-lg shadow-indigo-200"
          style={{ background: 'linear-gradient(135deg, var(--color-accent) 0%, oklch(46% 0.145 175) 100%)' }}
        >
          {/* content */}
          <div className="relative z-10 md:w-2/3">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <BrainCircuit size={16} className="sm:w-5 sm:h-5" />
              <span>Spaced Repetition</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              24 words are ready <br className="hidden sm:block" />for review today.
            </h2>
            <p className="text-indigo-100 mb-6 sm:mb-8 text-sm sm:text-lg max-w-md">
              Consistent daily review is the key to moving vocabulary from short-term to long-term memory.
            </p>
            <button 
              onClick={() => navigate('/flashcards')}
              className="inline-flex items-center justify-center w-full sm:w-auto bg-white text-indigo-600 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Play size={18} className="mr-2 sm:w-5 sm:h-5 fill-current" />
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
          <h3 className="text-xl font-bold text-gray-900 mb-4 sm:mb-6">Review Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  variants={item}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigate('/flashcards')}
                  className={`group bg-white p-4 sm:p-6 rounded-2xl border-2 ${category.border} transition-all cursor-pointer flex items-center justify-between shadow-sm hover:shadow-md`}
                >
                  <div className="flex items-center space-x-3 sm:space-x-5 flex-1 min-w-0">
                    <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl shrink-0 ${category.bg} ${category.color}`}>
                      <Icon size={24} className="sm:w-7 sm:h-7" />
                    </div>
                    <div className="min-w-0 pr-2">
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-0.5 sm:mb-1 truncate">{category.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 sm:line-clamp-1">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-4 pl-2 sm:pl-4 shrink-0">
                    <div className="text-right">
                      <span className="block text-xl sm:text-2xl font-bold text-gray-900">{category.count}</span>
                      <span className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Words</span>
                    </div>
                    <div className="text-gray-300 group-hover:text-gray-600 transition-colors hidden sm:block">
                      <ChevronRight size={24} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </motion.div>
    </div>
  )
}
