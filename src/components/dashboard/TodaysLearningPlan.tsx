import { Link } from 'react-router-dom'
import {
  BookOpen,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  RefreshCw,
  Target,
  type LucideIcon,
} from 'lucide-react'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Text,
} from '@/components/common'
import { cn } from '@/utils/cn'
import type { LearningPlanItem } from '@/types'

const iconMap: Record<LearningPlanItem['icon'], LucideIcon> = {
  'book-open': BookOpen,
  'refresh-cw': RefreshCw,
  'clipboard-check': ClipboardCheck,
  target: Target,
}

interface TodaysLearningPlanProps {
  items: LearningPlanItem[]
}

export function TodaysLearningPlan({ items }: TodaysLearningPlanProps) {
  const completedCount = items.filter((item) => item.completed).length

  return (
    <Card padding="md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Today&apos;s Learning Plan</CardTitle>
          <Text variant="caption">
            {completedCount}/{items.length} completed
          </Text>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <li
                key={item.id}
                className={cn(
                  'flex items-start gap-4 rounded-xl border p-4 transition-colors',
                  item.completed
                    ? 'border-success-200 bg-success-50/50 dark:border-success-800/40 dark:bg-success-900/10'
                    : 'border-border bg-surface-muted/50 dark:border-border-dark dark:bg-slate-800/30',
                )}
              >
                <div
                  className={cn(
                    'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                    item.completed
                      ? 'bg-success-100 text-success-600 dark:bg-success-900/40 dark:text-success-500'
                      : 'bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400',
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-2">
                    {item.completed ? (
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-success-500"
                        aria-label="Completed"
                      />
                    ) : (
                      <Circle
                        className="mt-0.5 h-4 w-4 shrink-0 text-text-muted"
                        aria-label="Not completed"
                      />
                    )}
                    <div>
                      <p
                        className={cn(
                          'font-medium text-text-primary dark:text-slate-100',
                          item.completed && 'line-through opacity-70',
                        )}
                      >
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-body-sm text-text-secondary dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
                <Link to={item.actionHref}>
                  <Button
                    variant={item.completed ? 'ghost' : 'outline'}
                    size="sm"
                    className="shrink-0"
                  >
                    {item.actionLabel}
                  </Button>
                </Link>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
