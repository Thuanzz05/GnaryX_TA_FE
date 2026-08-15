import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { Button, StatCard } from '@/components/common'
import {
  ContinueLearningCard,
  DailyGoalCard,
  DashboardHeader,
  DashboardSkeleton,
  RecentActivityList,
  TodaysLearningPlan,
  WordOfTheDayCard,
} from '@/components/dashboard'
import { useAuth } from '@/hooks/useAuth'
import { useDashboard } from '@/hooks/useDashboard'

export default function DashboardPage() {
  const { user } = useAuth()
  const { data, isLoading, error, refetch } = useDashboard()

  if (isLoading) {
    return <DashboardSkeleton />
  }

  if (error || !data) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-error-100 text-error-600 dark:bg-error-900/30 dark:text-error-500">
          <AlertCircle className="h-7 w-7" aria-hidden="true" />
        </div>
        <h2 className="text-heading-3 text-text-primary dark:text-slate-100">
          Something went wrong
        </h2>
        <p className="text-body-sm text-text-secondary dark:text-slate-400">
          {error ?? 'Please try again.'}
        </p>
        <Button onClick={refetch}>Retry</Button>
      </div>
    )
  }

  const firstName = user?.fullName.split(' ')[0] ?? 'Learner'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-7xl space-y-8"
    >
      <DashboardHeader userName={firstName} />

      <DailyGoalCard goal={data.dailyGoal} />

      <section aria-label="Statistics">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <StatCard stat={stat} />
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ContinueLearningCard data={data.continueLearning} />
          <TodaysLearningPlan items={data.learningPlan} />
        </div>

        <aside className="space-y-6 lg:order-last">
          <WordOfTheDayCard word={data.wordOfTheDay} />
          <RecentActivityList activities={data.recentActivity} />
        </aside>
      </div>
    </motion.div>
  )
}
