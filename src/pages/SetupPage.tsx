import { motion } from 'framer-motion'
import { BookOpen, CheckCircle2, Sparkles } from 'lucide-react'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const chartData = [
  { day: 'Mon', words: 12 },
  { day: 'Tue', words: 18 },
  { day: 'Wed', words: 15 },
  { day: 'Thu', words: 22 },
  { day: 'Fri', words: 20 },
  { day: 'Sat', words: 28 },
  { day: 'Sun', words: 24 },
]

const stackItems = [
  'Vite + React + TypeScript',
  'Tailwind CSS v4',
  'React Router v7',
  'Lucide React',
  'Recharts',
  'Framer Motion',
]

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-surface-muted px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
            <Sparkles className="h-4 w-4" />
            Phase 1 Complete
          </div>
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white shadow-card">
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-text-primary">
              LexiLearn
            </h1>
          </div>
          <p className="text-lg text-text-secondary">
            English Vocabulary Learning Platform — Project Setup
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-card border border-slate-200 bg-surface-light p-6 shadow-card"
          >
            <h2 className="mb-4 text-lg font-semibold text-text-primary">
              Technology Stack
            </h2>
            <ul className="space-y-3">
              {stackItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  className="flex items-center gap-3 text-text-secondary"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-success-500" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-card border border-slate-200 bg-surface-light p-6 shadow-card"
          >
            <h2 className="mb-4 text-lg font-semibold text-text-primary">
              Recharts Preview
            </h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis
                    dataKey="day"
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.08)',
                    }}
                  />
                  <Bar
                    dataKey="words"
                    fill="#6366f1"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-center text-sm text-text-muted">
              Weekly words learned (mock data)
            </p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-sm text-text-muted"
        >
          Architecture folders, services, hooks, and full pages coming in next
          phases.
        </motion.p>
      </div>
    </div>
  )
}
