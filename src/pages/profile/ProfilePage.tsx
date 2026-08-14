import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BookOpen, Clock, Flame, Settings, Trophy, Zap } from 'lucide-react'
import { Badge, Button, Card, Heading, Text } from '@/components/common'
import { UserAvatar } from '@/components/common'
import { useAuth } from '@/hooks/useAuth'
import { MOCK_PROGRESS } from '@/data'

const ACHIEVEMENTS = [
  { id: '1', icon: '🌱', title: 'First Steps', desc: 'Learned your first 10 words', unlocked: true },
  { id: '2', icon: '🔥', title: '7-Day Streak', desc: 'Studied 7 days in a row', unlocked: true },
  { id: '3', icon: '📚', title: '500 Words', desc: 'Learned 500 vocabulary words', unlocked: true },
  { id: '4', icon: '🏆', title: 'Quiz Master', desc: 'Scored 100% on a quiz', unlocked: true },
  { id: '5', icon: '⚡', title: '30-Day Streak', desc: 'Studied 30 days in a row', unlocked: false },
  { id: '6', icon: '🎓', title: '1000 Words', desc: 'Learned 1000 vocabulary words', unlocked: false },
]

const stats = [
  { label: 'Words Learned', value: '1,248', icon: BookOpen },
  { label: 'Study Time', value: '32h', icon: Clock },
  { label: 'Quizzes Done', value: '18', icon: Trophy },
  { label: 'Day Streak', value: '7', icon: Flame },
]

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-3xl space-y-6"
    >
      {/* Profile header */}
      <Card padding="lg">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="shrink-0">
            <UserAvatar user={user} size="xl" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <Heading level="h2">{user?.fullName ?? 'Learner'}</Heading>
            <Text variant="muted" className="mt-1">{user?.email}</Text>
            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
              <Badge variant="primary">{user?.level ?? 'B1'} Intermediate</Badge>
              <Badge variant="outline">
                <Zap className="h-3 w-3 mr-1" />
                {MOCK_PROGRESS.xp.toLocaleString()} XP
              </Badge>
              <Badge variant="warning">
                <Flame className="h-3 w-3 mr-1" />
                {user?.streak ?? 7} day streak
              </Badge>
            </div>
          </div>
          <Link to="/settings">
            <Button variant="outline" size="sm" leftIcon={<Settings className="h-4 w-4" />}>
              Edit Profile
            </Button>
          </Link>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} padding="md" className="text-center">
              <Icon className="mx-auto mb-2 h-6 w-6 text-primary-500" aria-hidden="true" />
              <p className="text-heading-3 text-text-primary dark:text-slate-100">{stat.value}</p>
              <p className="text-caption text-text-muted dark:text-slate-500">{stat.label}</p>
            </Card>
          )
        })}
      </div>

      {/* Achievements */}
      <Card padding="lg">
        <div className="mb-4 flex items-center justify-between">
          <Heading level="h3">Achievements</Heading>
          <Badge variant="primary">{ACHIEVEMENTS.filter((a) => a.unlocked).length} / {ACHIEVEMENTS.length}</Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-4 rounded-xl border p-4 transition-colors ${
                a.unlocked
                  ? 'border-border bg-white dark:border-border-dark dark:bg-surface-card-dark'
                  : 'border-border bg-slate-50 opacity-50 dark:border-border-dark dark:bg-slate-800/50'
              }`}
            >
              <span className="text-3xl" aria-hidden="true">{a.icon}</span>
              <div>
                <p className="font-semibold text-text-primary dark:text-slate-100">{a.title}</p>
                <p className="text-caption text-text-muted dark:text-slate-500">{a.desc}</p>
              </div>
              {a.unlocked && (
                <Trophy className="ml-auto h-5 w-5 shrink-0 text-warning-500" aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Learning goal */}
      <Card padding="lg">
        <div className="flex items-center justify-between mb-4">
          <Heading level="h3">Daily Goal</Heading>
          <Badge variant="success">Active</Badge>
        </div>
        <p className="text-body-sm text-text-secondary dark:text-slate-400">
          Current goal: <span className="font-semibold text-text-primary dark:text-slate-100">{user?.dailyGoal ?? 20} words per day</span>
        </p>
        <Link to="/settings">
          <Button variant="outline" size="sm" className="mt-4">Change Goal</Button>
        </Link>
      </Card>
    </motion.div>
  )
}
