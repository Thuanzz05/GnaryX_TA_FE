import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CircularProgress,
  ProgressBar,
  Text,
} from '@/components/common'
import type { DailyGoal } from '@/types'

interface DailyGoalCardProps {
  goal: DailyGoal
}

export function DailyGoalCard({ goal }: DailyGoalCardProps) {
  return (
    <Card
      className="relative overflow-hidden border-primary-200 bg-gradient-to-br from-primary-50 to-white dark:border-primary-800/50 dark:from-primary-950/30 dark:to-surface-card-dark"
      padding="lg"
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary-100/50 dark:bg-primary-900/20" />
      <CardHeader className="relative">
        <CardTitle>Daily Goal</CardTitle>
        <Text variant="muted">Keep your streak alive by reaching today&apos;s target</Text>
      </CardHeader>
      <CardContent className="relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <CircularProgress
            value={goal.completed}
            max={goal.target}
            size={100}
            label="Daily goal progress"
          />
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-3xl font-bold text-text-primary dark:text-slate-100">
                {goal.completed}{' '}
                <span className="text-lg font-normal text-text-secondary dark:text-slate-400">
                  / {goal.target} words
                </span>
              </p>
              <ProgressBar
                value={goal.completed}
                max={goal.target}
                size="lg"
                className="mt-3"
              />
            </div>
            <div className="flex items-center gap-2 text-body-sm font-medium text-primary-600 dark:text-primary-400">
              <Zap className="h-4 w-4" aria-hidden="true" />
              <span>+{goal.xpEarnedToday} XP today</span>
            </div>
            <Link to="/learn">
              <Button>Continue Learning</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
