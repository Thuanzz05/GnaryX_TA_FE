import {
  BookOpen,
  CheckCircle2,
  Flame,
  GraduationCap,
  Trophy,
  type LucideIcon,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common'
import { formatRelativeTime } from '@/utils/date'
import type { LearningActivity } from '@/types'

const activityIcons: Record<string, LucideIcon> = {
  learn: BookOpen,
  lesson: GraduationCap,
  flashcard: BookOpen,
  quiz: Trophy,
  streak: Flame,
}

interface RecentActivityListProps {
  activities: LearningActivity[]
}

export function RecentActivityList({ activities }: RecentActivityListProps) {
  return (
    <Card padding="md">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type] ?? CheckCircle2
            return (
              <li
                key={activity.id}
                className="flex items-start gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-surface-muted dark:hover:bg-slate-800/50"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success-100 text-success-600 dark:bg-success-900/30 dark:text-success-500">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-body-sm font-medium text-text-primary dark:text-slate-200">
                    {activity.description}
                  </p>
                  <div className="mt-0.5 flex items-center gap-2 text-caption text-text-muted">
                    <span>{formatRelativeTime(activity.timestamp)}</span>
                    {activity.xpEarned != null && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-primary-600 dark:text-primary-400">
                          +{activity.xpEarned} XP
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
