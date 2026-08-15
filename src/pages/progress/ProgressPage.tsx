import { motion } from 'framer-motion'
import { CEFRProgress, WordsLearnedChart } from '@/components/progress'
import { StatCard } from '@/components/common'
import type { DashboardStat } from '@/types'

const stats: DashboardStat[] = [
  {
    id: 'total-words',
    label: 'Total Words',
    value: '1,248',
    icon: 'book',
    trend: { value: '+5% this week', direction: 'up' },
  },
  {
    id: 'goal-accuracy',
    label: 'Goal Accuracy',
    value: '92%',
    icon: 'refresh',
    trend: { value: '+5% this week', direction: 'up' },
  },
  {
    id: 'longest-streak',
    label: 'Longest Streak',
    value: '14 days',
    icon: 'flame',
    trend: { value: 'Steady', direction: 'neutral' },
  },
  {
    id: 'study-time',
    label: 'Total Study Time',
    value: '32h 15m',
    icon: 'clock',
    trend: { value: '+2h', direction: 'up' },
  },
]

export default function ProgressPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8"
    >
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Learning Progress</h1>
        <p className="text-gray-500 dark:text-gray-400">Track your vocabulary journey and analytics.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <WordsLearnedChart />
        <CEFRProgress />
      </div>
    </motion.div>
  )
}
