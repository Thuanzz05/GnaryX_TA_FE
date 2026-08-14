import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ProgressBar,
  Text,
} from '@/components/common'
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
      <Card
        className="overflow-hidden border-0 bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg dark:from-primary-700 dark:to-primary-900"
        padding="none"
      >
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-1 flex-col justify-between p-6 lg:p-8">
            <CardHeader className="mb-0">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white"
                >
                  Continue Learning
                </Badge>
              </div>
              <CardTitle className="mt-3 text-white">{data.courseTitle}</CardTitle>
              <Text className="text-primary-100">{lessonLabel}</Text>
            </CardHeader>
            <CardContent className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-sm text-primary-100">
                <span>Progress</span>
                <span className="font-semibold text-white">{data.progress}%</span>
              </div>
              <ProgressBar value={data.progress} variant="inverse" />
              <p className="text-sm text-primary-100">
                {data.wordsCompleted} / {data.wordsTotal} words
              </p>
              <Link to={`/learn/${data.courseId}`}>
                <Button
                  variant="outline"
                  className="mt-2 w-fit border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Continue
                </Button>
              </Link>
            </CardContent>
          </div>
          <div className="hidden items-center justify-center bg-white/5 px-12 lg:flex">
            <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-white/10">
              <BookOpen className="h-14 w-14 text-white/80" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
