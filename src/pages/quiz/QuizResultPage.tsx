import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, CheckCircle2, Clock, Home, RotateCcw, XCircle, Zap } from 'lucide-react'
import { Button } from '@/components/common'

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function QuizResultPage() {
  const location = useLocation()
  const navigate = useNavigate()

  const { score = 17, total = 20, timeSpent = 402 } = (location.state as {
    score: number
    total: number
    timeSpent: number
  }) || {}

  const percentage = Math.round((score / total) * 100)
  const wrongAnswers = total - score
  const xpEarned = score * 10 + (percentage >= 80 ? 50 : 0)

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const emoji = percentage >= 80 ? '🎉' : percentage >= 50 ? '👍' : '💪'
  const headline =
    percentage >= 80 ? 'Great Job!' : percentage >= 50 ? 'Good Effort!' : 'Keep Practicing!'

  const stats = [
    { icon: CheckCircle2, label: 'Correct', value: String(score), color: 'text-success-600 dark:text-success-400', bg: 'bg-success-50 dark:bg-success-900/20' },
    { icon: XCircle, label: 'Wrong', value: String(wrongAnswers), color: 'text-error-600 dark:text-error-400', bg: 'bg-error-50 dark:bg-error-900/20' },
    { icon: Clock, label: 'Time', value: formatTime(timeSpent), color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-50 dark:bg-primary-900/20' },
    { icon: Zap, label: 'XP Earned', value: `+${xpEarned}`, color: 'text-warning-600 dark:text-warning-400', bg: 'bg-warning-50 dark:bg-warning-900/20' },
  ]

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-white shadow-xl dark:border-border-dark dark:bg-surface-card-dark"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        {/* Hero banner */}
        <div
          className="relative overflow-hidden px-8 py-12 text-center"
          style={{ background: 'linear-gradient(135deg, var(--color-accent) 0%, oklch(46% 0.145 175) 100%)' }}
        >
          {/* Decorative circles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white" />
            <div className="absolute -right-20 top-20 h-60 w-60 rounded-full bg-white" />
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
            className="relative z-10 mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg"
          >
            <span className="text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>
              {percentage}%
            </span>
          </motion.div>

          <motion.div variants={item} className="relative z-10">
            <p className="text-4xl">{emoji}</p>
            <h1 className="mt-2 text-4xl font-bold text-white">{headline}</h1>
            <p className="mt-1 text-lg" style={{ color: 'oklch(99% 0.005 175 / 0.8)' }}>
              You&apos;ve completed the Vocabulary Quiz.
            </p>
          </motion.div>
        </div>

        {/* Stats + actions */}
        <div className="p-6 sm:p-8">
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map(({ icon: Icon, label, value, color, bg }) => (
              <motion.div
                key={label}
                variants={item}
                className={`flex flex-col items-center rounded-2xl p-4 ${bg}`}
              >
                <Icon className={`mb-2 h-7 w-7 ${color}`} aria-hidden="true" />
                <span className="text-2xl font-bold text-text-primary dark:text-slate-100">{value}</span>
                <span className="text-sm font-medium text-text-muted dark:text-slate-500">{label}</span>
              </motion.div>
            ))}
          </div>

          {/* Action buttons */}
          <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              fullWidth
              leftIcon={<RotateCcw className="h-4 w-4" />}
              onClick={() => navigate('/quiz')}
            >
              Try Again
            </Button>
            <Button
              fullWidth
              leftIcon={<BookOpen className="h-4 w-4" />}
              onClick={() => navigate('/review')}
            >
              Review Mistakes
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 text-body-sm font-medium text-text-muted transition-colors hover:text-primary-600 dark:text-slate-500 dark:hover:text-primary-400"
            >
              <Home className="h-4 w-4" />
              Back to Dashboard
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
