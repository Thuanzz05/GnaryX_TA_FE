import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Brain, Clock, Flame, RotateCcw } from 'lucide-react'
import { Badge, Button, Card, Heading, Text } from '@/components/common'
import FlashcardsEmbed from '@/pages/flashcards/FlashcardsPage'

interface ReviewSection {
  id: string
  title: string
  subtitle: string
  icon: React.ElementType
  count: number
  color: string
  badgeVariant: 'error' | 'warning' | 'primary' | 'success'
}

const SECTIONS: ReviewSection[] = [
  {
    id: 'due',
    title: 'Due Today',
    subtitle: 'Words scheduled for review based on spaced repetition',
    icon: Clock,
    count: 24,
    color: 'bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400',
    badgeVariant: 'primary',
  },
  {
    id: 'difficult',
    title: 'Difficult Words',
    subtitle: 'Words you have struggled with most',
    icon: Brain,
    count: 8,
    color: 'bg-error-100 text-error-600 dark:bg-error-900/40 dark:text-error-400',
    badgeVariant: 'error',
  },
  {
    id: 'recent',
    title: 'Recently Learned',
    subtitle: 'Reinforce words you learned in the last 7 days',
    icon: BookOpen,
    count: 15,
    color: 'bg-success-100 text-success-600 dark:bg-success-900/40 dark:text-success-400',
    badgeVariant: 'success',
  },
  {
    id: 'forgotten',
    title: 'Frequently Forgotten',
    subtitle: 'Words you keep getting wrong',
    icon: RotateCcw,
    count: 6,
    color: 'bg-warning-100 text-warning-600 dark:bg-warning-900/40 dark:text-warning-400',
    badgeVariant: 'warning',
  },
]

export default function ReviewPage() {
  const [reviewing, setReviewing] = useState(false)

  if (reviewing) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <Heading level="h2">Review Session</Heading>
          <Button variant="ghost" size="sm" onClick={() => setReviewing(false)}>
            ← Back
          </Button>
        </div>
        <FlashcardsEmbed />
      </div>
    )
  }

  const totalDue = SECTIONS.reduce((sum, s) => sum + s.count, 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-4xl space-y-6"
    >
      <header className="space-y-2">
        <Heading level="h1">Review</Heading>
        <Text variant="body-sm">Strengthen your memory with smart reviews.</Text>
      </header>

      <Card
        className="border-primary-200 bg-gradient-to-br from-primary-50 to-white dark:border-primary-800/40 dark:from-primary-950/30 dark:to-surface-card-dark"
        padding="lg"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900/40">
              <Flame className="h-7 w-7 text-primary-600 dark:text-primary-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-heading-3 text-text-primary dark:text-slate-100">
                {totalDue} words ready for review
              </p>
              <p className="text-body-sm text-text-secondary dark:text-slate-400">
                Complete your review to maintain your streak
              </p>
            </div>
          </div>
          <Button size="lg" onClick={() => setReviewing(true)}>
            Start Review
          </Button>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((section, index) => {
          const Icon = section.icon
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.07 }}
            >
              <Card className="flex h-full flex-col transition-shadow hover:shadow-md" padding="lg">
                <div className="mb-4 flex items-start justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${section.color}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <Badge variant={section.badgeVariant}>{section.count} words</Badge>
                </div>
                <div className="flex-1">
                  <h3 className="text-heading-4 mb-1 text-text-primary dark:text-slate-100">
                    {section.title}
                  </h3>
                  <p className="text-body-sm text-text-secondary dark:text-slate-400">
                    {section.subtitle}
                  </p>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" fullWidth onClick={() => setReviewing(true)}>
                    Review Now
                  </Button>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Card padding="lg" className="text-center">
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success-100 dark:bg-success-900/30">
            <BookOpen className="h-7 w-7 text-success-600 dark:text-success-500" />
          </div>
          <div>
            <p className="text-body font-medium text-text-primary dark:text-slate-100">
              Looking for more to study?
            </p>
            <p className="text-body-sm text-text-secondary dark:text-slate-400">
              Explore the vocabulary dictionary to discover new words.
            </p>
          </div>
          <Link to="/vocabulary">
            <Button variant="outline" size="sm">Explore Vocabulary</Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}
