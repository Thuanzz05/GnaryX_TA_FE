import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CEFRProgress, WordsLearnedChart } from '@/components/progress'
import { Skeleton, StatCard } from '@/components/common'
import { progressService } from '@/services/progressService'
import type { DashboardStat } from '@/types'

type Analytics = Awaited<ReturnType<typeof progressService.getAnalytics>>

export default function ProgressPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setIsLoading(true)
      const data = await progressService.getAnalytics()
      if (!cancelled) {
        setAnalytics(data)
        setIsLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const totals = analytics?.totals
  const stats: DashboardStat[] = [
    {
      id: 'total-words',
      label: 'Words Learned',
      value: String(totals?.totalWords ?? 0),
      icon: 'book',
      trend: { value: 'Live', direction: 'up' },
    },
    {
      id: 'avg-quiz-score',
      label: 'Avg Quiz Score',
      value: `${totals?.avgQuizScore ?? 0}%`,
      icon: 'refresh',
      trend: { value: 'Live', direction: 'neutral' },
    },
    {
      id: 'current-streak',
      label: 'Current Streak',
      value: `${totals?.currentStreak ?? 0} days`,
      icon: 'flame',
      trend: { value: 'Live', direction: 'up' },
    },
    {
      id: 'quizzes-taken',
      label: 'Quizzes Taken',
      value: String(totals?.quizzesTaken ?? 0),
      icon: 'clock',
      trend: { value: 'Live', direction: 'neutral' },
    },
  ]

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
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 w-full" />)
        ) : (
          stats.map((stat) => <StatCard key={stat.id} stat={stat} />)
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {isLoading ? (
          <>
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
          </>
        ) : (
          <>
            <WordsLearnedChart data={analytics?.wordsLearnedByDay ?? []} />
            <CEFRProgress data={analytics?.cefrProgress ?? []} />
          </>
        )}
      </div>
    </motion.div>
  )
}
