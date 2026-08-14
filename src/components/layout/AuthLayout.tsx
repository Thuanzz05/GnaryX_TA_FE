import { motion } from 'framer-motion'
import {
  BookOpen,
  Brain,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'
import { Outlet } from 'react-router-dom'
import { Logo } from '@/components/common'
import { BRAND } from '@/constants/brand'
import { useTheme } from '@/hooks/useTheme'

const features = [
  {
    icon: Brain,
    title: 'Smart Learning',
    description: 'Adaptive vocabulary paths tailored to your level',
  },
  {
    icon: Target,
    title: 'Daily Goals',
    description: 'Build consistent habits with streaks and XP',
  },
  {
    icon: TrendingUp,
    title: 'Track Progress',
    description: 'Visual analytics to monitor your growth',
  },
]

export function AuthLayout() {
  const { isDark } = useTheme()

  return (
    <div className="flex min-h-screen bg-surface-muted dark:bg-surface-dark">
      {/* Brand panel — desktop only */}
      <aside className="relative hidden w-[45%] overflow-hidden lg:flex lg:flex-col lg:justify-between">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14">
          <Logo size="lg" className="[&_span:first-of-type]:text-white [&_span:last-of-type]:text-primary-200" />

          <div className="my-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-primary-100 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Master English vocabulary
              </div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-white xl:text-4xl">
                Learn smarter.
                <br />
                Remember longer.
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-primary-100">
                {BRAND.name} helps Vietnamese learners build real English vocabulary
                through flashcards, quizzes, and spaced repetition — designed for
                university students and adult learners.
              </p>
            </motion.div>

            <motion.div
              className="mt-10 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
                    <feature.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{feature.title}</p>
                    <p className="mt-0.5 text-sm text-primary-200">{feature.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex items-center gap-3 text-sm text-primary-200">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            <span>Trusted by learners preparing for IELTS, TOEIC &amp; more</span>
          </div>
        </div>
      </aside>

      {/* Form panel */}
      <main className="flex flex-1 flex-col">
        <div className="flex items-center justify-between px-6 py-5 lg:justify-end lg:px-10">
          <div className="lg:hidden">
            <Logo size="sm" />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-10 lg:px-10">
          <motion.div
            key={isDark ? 'dark' : 'light'}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-md"
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  )
}
