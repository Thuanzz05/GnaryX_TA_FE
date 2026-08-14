import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { BookOpen, Clock, Flame, TrendingUp, Trophy, Zap } from 'lucide-react'
import { Badge, Card, Heading, ProgressBar, Text } from '@/components/common'
import { MOCK_PROGRESS } from '@/data'

const wordsData = [
  { day: 'Mon', words: 12 }, { day: 'Tue', words: 18 },
  { day: 'Wed', words: 8 },  { day: 'Thu', words: 22 },
  { day: 'Fri', words: 15 }, { day: 'Sat', words: 25 },
  { day: 'Sun', words: 20 },
]

const studyTimeData = [
  { day: 'Mon', minutes: 25 }, { day: 'Tue', minutes: 40 },
  { day: 'Wed', minutes: 15 }, { day: 'Thu', minutes: 50 },
  { day: 'Fri', minutes: 35 }, { day: 'Sat', minutes: 60 },
  { day: 'Sun', minutes: 45 },
]

const levelData = [
  { name: 'A1', value: 100, color: '#22c55e' },
  { name: 'A2', value: 82, color: '#84cc16' },
  { name: 'B1', value: 54, color: '#6366f1' },
  { name: 'B2', value: 20, color: '#8b5cf6' },
  { name: 'C1', value: 5, color: '#f59e0b' },
  { name: 'C2', value: 0, color: '#e2e8f0' },
]

const CEFR_TOTAL = { A1: 200, A2: 300, B1: 400, B2: 500, C1: 600, C2: 700 }

const stats = [
  { label: 'Total Words', value: MOCK_PROGRESS.totalWords.toLocaleString(), icon: BookOpen, color: 'text-primary-600 bg-primary-100 dark:bg-primary-900/40 dark:text-primary-400' },
  { label: 'This Week', value: `+${MOCK_PROGRESS.wordsThisWeek}`, icon: TrendingUp, color: 'text-success-600 bg-success-100 dark:bg-success-900/40 dark:text-success-400' },
  { label: 'Study Time', value: `${Math.floor(MOCK_PROGRESS.totalStudyTimeMinutes / 60)}h`, icon: Clock, color: 'text-cyan-600 bg-cyan-100 dark:bg-cyan-900/40 dark:text-cyan-400' },
  { label: 'Current Streak', value: `${MOCK_PROGRESS.currentStreak}d`, icon: Flame, color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/40 dark:text-orange-400' },
  { label: 'XP Earned', value: MOCK_PROGRESS.xp.toLocaleString(), icon: Zap, color: 'text-violet-600 bg-violet-100 dark:bg-violet-900/40 dark:text-violet-400' },
  { label: 'Best Streak', value: `${MOCK_PROGRESS.longestStreak}d`, icon: Trophy, color: 'text-warning-600 bg-warning-100 dark:bg-warning-900/40 dark:text-warning-400' },
]

export default function ProgressPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-7xl space-y-6"
    >
      <header className="space-y-1">
        <Heading level="h1">Progress</Heading>
        <Text variant="body-sm">Track your learning journey and celebrate milestones.</Text>
      </header>

      {/* Stat cards */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card padding="md" className="text-center">
                <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-heading-3 text-text-primary dark:text-slate-100">{stat.value}</p>
                <p className="text-caption text-text-muted dark:text-slate-500">{stat.label}</p>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card padding="lg">
          <Heading level="h3" className="mb-4">Words Learned — This Week</Heading>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={wordsData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="wordsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="words" stroke="#6366f1" strokeWidth={2} fill="url(#wordsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card padding="lg">
          <Heading level="h3" className="mb-4">Weekly Study Time (min)</Heading>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={studyTimeData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="minutes" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* CEFR Progress */}
      <Card padding="lg">
        <Heading level="h3" className="mb-6">Vocabulary Level Progress (CEFR)</Heading>
        <div className="space-y-5">
          {levelData.map((level) => {
            const total = CEFR_TOTAL[level.name as keyof typeof CEFR_TOTAL]
            const learned = Math.round((level.value / 100) * total)
            const isLocked = level.value === 0
            return (
              <div key={level.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={isLocked ? 'default' : 'primary'}
                      style={!isLocked ? { backgroundColor: `${level.color}20`, color: level.color, border: 'none' } : undefined}
                    >
                      {level.name}
                    </Badge>
                    <span className="text-body-sm text-text-secondary dark:text-slate-400">
                      {isLocked ? 'Locked' : `${learned} / ${total} words`}
                    </span>
                  </div>
                  <span className="text-body-sm font-semibold text-text-primary dark:text-slate-100">
                    {level.value}%
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: isLocked ? '#e2e8f0' : level.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${level.value}%` }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Pie chart */}
      <Card padding="lg">
        <Heading level="h3" className="mb-4">Vocabulary Distribution</Heading>
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={levelData.filter(l => l.value > 0)} dataKey="value" cx="50%" cy="50%" outerRadius={90} innerRadius={50}>
                {levelData.filter(l => l.value > 0).map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, 'Progress']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  )
}
