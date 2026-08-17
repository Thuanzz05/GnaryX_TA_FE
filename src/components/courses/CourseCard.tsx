import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, GraduationCap } from 'lucide-react'
import { Badge, Button, Card, ProgressBar } from '@/components/common'
import type { Course } from '@/types'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const title = String(course?.title ?? 'Untitled course')
  const description = String(course?.description ?? 'No description available.')
  const level = String(course?.level ?? 'A1')
  const lessonCount = Number(course?.lessonCount ?? 0)
  const wordCount = Number(course?.wordCount ?? 0)
  const progressValue = Number(course?.progress ?? 0)
  const isStarted = progressValue > 0

  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-lg" padding="md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl"
          style={{ backgroundColor: `${course?.color ?? '#4F46E5'}15` }}
        >
          {course?.icon ?? '📘'}
        </div>
        <Badge variant="outline" className="shrink-0">
          {level}
        </Badge>
      </div>

      <div className="mb-4 flex-1">
        <h3 className="text-heading-4 mb-2 text-text-primary dark:text-slate-100">
          {title}
        </h3>
        <p className="text-body-sm text-text-secondary dark:text-slate-400">
          {description}
        </p>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-3 text-body-sm text-text-secondary dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            <span>{lessonCount} lessons</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            <span>{wordCount} words</span>
          </div>
        </div>

        {isStarted && (
          <>
            <div className="flex items-center justify-between text-caption font-medium">
              <span className="text-text-secondary dark:text-slate-400">Progress</span>
              <span className="text-text-primary dark:text-slate-100">{progressValue}%</span>
            </div>
            <ProgressBar value={progressValue} size="sm" />
          </>
        )}
      </div>

      <Link to={`/learn/${course?.id ?? ''}`} className="mt-auto">
        <Button
          fullWidth
          variant={isStarted ? 'primary' : 'outline'}
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          {isStarted ? 'Continue' : 'Start Course'}
        </Button>
      </Link>
    </Card>
  )
}
