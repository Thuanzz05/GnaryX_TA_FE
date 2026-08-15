import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { BookOpen, Clock, Flame, TrendingUp, Trophy, Zap } from 'lucide-react'
import { Badge, Button, Card, Heading, ProgressBar, Text } from '@/components/common'
import { MOCK_PROGRESS, MOCK_ACHIEVEMENTS } from '@/data'

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

const quizData = [
  { week: 'Wk 1', score: 65 }, { week: 'Wk 2', score: 72 },
  { week: 'Wk 3', score: 68 }, { week: 'Wk 4', score: 80 },
  { week: 'Wk 5', score: 85 }, { week: 'Wk 6', score: 90 },
]

const XP_PER_LEVEL = 500
const currentLevelXP = MOCK_PROGRESS.xp % XP_PER_LEVEL
const xpProgress = Math.round((currentLevelXP / XP_PER_LEVEL) * 100)

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

      {/* Quiz performance */}
      <Card padding="lg">
        <Heading level="h3" className="mb-4">Quiz Performance</Heading>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={quizData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
            <Tooltip formatter={(v) => [`${v}%`, 'Score']} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#8b5cf6' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* XP & Level */}
      <Card padding="lg" className="border-primary-200 bg-gradient-to-br from-primary-50 to-white dark:border-primary-800/40 dark:from-primary-950/30 dark:to-surface-card-dark">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900/40">
              <Zap className="h-8 w-8 text-primary-600 dark:text-primary-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-caption font-semibold uppercase tracking-wide text-text-muted dark:text-slate-500">
                Current Level
              </p>
              <p className="text-heading-2 text-text-primary dark:text-slate-100">
                Level {MOCK_PROGRESS.level}
              </p>
              <p className="text-body-sm text-text-secondary dark:text-slate-400">
                {currentLevelXP} / {XP_PER_LEVEL} XP to next level
              </p>
            </div>
          </div>
          <div className="flex-1 sm:max-w-xs">
            <div className="mb-2 flex items-center justify-between text-caption">
              <span className="text-text-muted dark:text-slate-500">Level {MOCK_PROGRESS.level}</span>
              <span className="font-semibold text-primary-600 dark:text-primary-400">{xpProgress}%</span>
            </div>
            <ProgressBar value={xpProgress} />
            <p className="mt-2 text-caption text-text-muted dark:text-slate-500">
              Total XP: <span className="font-semibold text-text-primary dark:text-slate-200">{MOCK_PROGRESS.xp.toLocaleString()}</span>
            </p>
          </div>
        </div>
      </Card>

      {/* Achievements */}
      <Card padding="lg">
        <div className="mb-4 flex items-center justify-between">
          <Heading level="h3">Achievements</Heading>
          <Badge variant="primary">
            {MOCK_ACHIEVEMENTS.filter(a => a.unlocked).length} / {MOCK_ACHIEVEMENTS.length}
          </Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_ACHIEVEMENTS.map((ach, i) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${
                ach.unlocked
                  ? 'border-border bg-white dark:border-border-dark dark:bg-surface-card-dark'
                  : 'border-border bg-slate-50 opacity-50 dark:border-border-dark dark:bg-slate-800/40'
              }`}
            >
              <span className="text-2xl shrink-0" aria-hidden="true">{ach.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="text-body-sm font-semibold text-text-primary dark:text-slate-100 truncate">
                  {ach.title}
                </p>
                <p className="text-caption text-text-muted dark:text-slate-500 truncate">
                  {ach.unlocked ? `+${ach.xpReward} XP` : ach.description}
                </p>
              </div>
              {ach.unlocked && (
                <Trophy className="h-4 w-4 shrink-0 text-warning-500" aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </div>
        <div className="mt-4">
          <Link to="/profile">
            <Button variant="outline" size="sm">View all achievements</Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}
