import {
  BookOpen,
  Clock,
  Flame,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Minus,
  type LucideIcon,
} from 'lucide-react'
import { Card } from './Card'
import { cn } from '@/utils/cn'
import type { DashboardStat } from '@/types'

const iconMap: Record<DashboardStat['icon'], LucideIcon> = {
  book: BookOpen,
  refresh: RefreshCw,
  flame: Flame,
  clock: Clock,
}

const iconColors: Record<DashboardStat['icon'], string> = {
  book: 'bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400',
  refresh: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-400',
  flame: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400',
  clock: 'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400',
}

export interface StatCardProps {
  stat: DashboardStat
  className?: string
}

export function StatCard({ stat, className }: StatCardProps) {
  const Icon = iconMap[stat.icon]
  const TrendIcon =
    stat.trend.direction === 'up'
      ? TrendingUp
      : stat.trend.direction === 'down'
        ? TrendingDown
        : Minus

  const trendColor =
    stat.trend.direction === 'up'
      ? 'text-success-600 dark:text-success-500'
      : stat.trend.direction === 'down'
        ? 'text-error-600 dark:text-error-500'
        : 'text-text-muted dark:text-slate-400'

  return (
    <Card className={cn('flex flex-col gap-4', className)} padding="md">
      <div className="flex items-start justify-between">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl',
            iconColors[stat.icon],
          )}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold tracking-tight text-text-primary dark:text-slate-100">
          {stat.value}
        </p>
        <p className="mt-0.5 text-body-sm text-text-secondary dark:text-slate-400">
          {stat.label}
        </p>
      </div>
      <div className={cn('flex items-center gap-1 text-caption', trendColor)}>
        <TrendIcon className="h-3.5 w-3.5" aria-hidden="true" />
        <span>{stat.trend.value}</span>
      </div>
    </Card>
  )
}
