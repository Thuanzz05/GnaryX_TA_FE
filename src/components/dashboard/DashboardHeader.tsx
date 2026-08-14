import { CalendarDays } from 'lucide-react'
import { Heading, Text } from '@/components/common'
import { formatTodayDate, getGreeting } from '@/utils/date'

interface DashboardHeaderProps {
  userName: string
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <header className="space-y-1">
      <Heading level="h1">
        {getGreeting()}, {userName} 👋
      </Heading>
      <Text variant="body-sm">
        Ready to improve your English vocabulary today?
      </Text>
      <div className="flex items-center gap-2 pt-1 text-body-sm text-text-muted dark:text-slate-400">
        <CalendarDays className="h-4 w-4" aria-hidden="true" />
        <time dateTime={new Date().toISOString().split('T')[0]}>
          {formatTodayDate()}
        </time>
      </div>
    </header>
  )
}
