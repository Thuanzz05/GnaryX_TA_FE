import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { ProgressBar } from '@/components/common'
import type { ContinueLearning } from '@/types'

interface ContinueLearningCardProps {
  data: ContinueLearning
}

export function ContinueLearningCard({ data }: ContinueLearningCardProps) {
  const lessonLabel = `Lesson ${String(data.lessonNumber).padStart(2, '0')} – ${data.lessonTitle}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div
        className="overflow-hidden rounded-card shadow-raised"
        style={{ background: 'linear-gradient(135deg, var(--color-accent) 0%, oklch(46% 0.145 175) 100%)' }}
      >
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-1 flex-col justify-between p-6 lg:p-8">
            {/* Header */}
            <div className="mb-4">
              <span
                className="inline-flex items-center rounded-badge border px-2.5 py-0.5 text-xs font-medium"
                style={{ borderColor: 'oklch(99% 0.005 175 / 0.3)', color: 'var(--color-accent-ink)', background: 'oklch(99% 0.005 175 / 0.1)' }}
              >
                Continue Learning
              </span>
              <h3
                className="mt-3 font-display text-xl font-semibold"
                style={{ color: 'var(--color-accent-ink)' }}
              >
                {data.courseTitle}
              </h3>
              <p className="mt-1 text-sm" style={{ color: 'oklch(99% 0.005 175 / 0.8)' }}>
                {lessonLabel}
              </p>
            </div>

            {/* Progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm" style={{ color: 'oklch(99% 0.005 175 / 0.8)' }}>
                <span>Progress</span>
                <span className="font-semibold" style={{ color: 'var(--color-accent-ink)' }}>
                  {data.progress}%
                </span>
              </div>
              <ProgressBar value={data.progress} variant="inverse" />
              <p className="text-sm" style={{ color: 'oklch(99% 0.005 175 / 0.8)' }}>
                {data.wordsCompleted} / {data.wordsTotal} words
              </p>
              <Link
                to={`/learn/${data.courseId}`}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-button border px-4 py-2 text-sm font-medium transition-colors"
                style={{
                  borderColor: 'oklch(99% 0.005 175 / 0.4)',
                  color: 'var(--color-accent-ink)',
                  background: 'oklch(99% 0.005 175 / 0.1)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'oklch(99% 0.005 175 / 0.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'oklch(99% 0.005 175 / 0.1)')}
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Icon */}
          <div
            className="hidden items-center justify-center px-12 lg:flex"
            style={{ background: 'oklch(99% 0.005 175 / 0.05)' }}
          >
            <div
              className="flex h-28 w-28 items-center justify-center rounded-2xl"
              style={{ background: 'oklch(99% 0.005 175 / 0.1)' }}
            >
              <BookOpen className="h-14 w-14" style={{ color: 'oklch(99% 0.005 175 / 0.8)' }} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
