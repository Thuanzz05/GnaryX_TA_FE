import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Lock,
  PlayCircle,
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  CardContent,
  Heading,
  ProgressBar,
  Text,
} from '@/components/common'
import { courseService } from '@/services/courseService'
import { lessonService } from '@/services/lessonService'
import { cn } from '@/utils/cn'
import type { Course, Lesson } from '@/types'

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    if (!courseId) return

    setIsLoading(true)
    setError(null)
    try {
      const [courseData, lessonsData] = await Promise.all([
        courseService.getById(courseId),
        lessonService.getByCourseId(courseId),
      ])

      if (!courseData) {
        setError('Course not found')
        return
      }

      setCourse(courseData)
      setLessons(lessonsData)
    } catch {
      setError('Failed to load course details')
    } finally {
      setIsLoading(false)
    }
  }, [courseId])

  useEffect(() => {
    loadData()
  }, [loadData])

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <Card padding="lg">
          <div className="space-y-4">
            <div className="h-10 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-6 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        </Card>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700"
            />
          ))}
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-error-100 text-error-600 dark:bg-error-900/30 dark:text-error-500">
          <AlertCircle className="h-7 w-7" aria-hidden="true" />
        </div>
        <Heading level="h2">Course Not Found</Heading>
        <Text variant="muted">{error ?? 'The course you are looking for does not exist.'}</Text>
        <Link to="/learn">
          <Button>Back to Courses</Button>
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-4xl space-y-6"
    >
      <Link
        to="/learn"
        className="inline-flex items-center gap-2 text-body-sm font-medium text-text-secondary transition-colors hover:text-text-primary dark:text-slate-400 dark:hover:text-slate-200"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Courses
      </Link>

      <Card
        className="overflow-hidden"
        style={{ borderTopColor: course.color, borderTopWidth: '4px' }}
        padding="lg"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-4xl"
            style={{ backgroundColor: `${course.color}15` }}
          >
            {course.icon}
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge variant="primary">{course.level}</Badge>
                <Badge variant="outline">{course.category}</Badge>
              </div>
              <Heading level="h1" className="mb-2">
                {course.title}
              </Heading>
              <Text variant="body">{course.description}</Text>
            </div>

            <div className="flex flex-wrap gap-6 text-body-sm">
              <div className="flex items-center gap-2 text-text-secondary dark:text-slate-400">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-text-primary dark:text-slate-100">
                    {course.lessonCount}
                  </strong>{' '}
                  Lessons
                </span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary dark:text-slate-400">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-text-primary dark:text-slate-100">
                    {course.wordCount}
                  </strong>{' '}
                  Words
                </span>
              </div>
            </div>

            {course.progress > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-caption font-medium">
                  <span className="text-text-secondary dark:text-slate-400">
                    Overall Progress
                  </span>
                  <span className="text-text-primary dark:text-slate-100">{course.progress}%</span>
                </div>
                <ProgressBar value={course.progress} />
              </div>
            )}
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <Heading level="h2" className="mb-4">
          Lessons
        </Heading>

        {lessons.length === 0 ? (
          <Card padding="lg">
            <Text variant="muted" className="text-center">
              No lessons available yet.
            </Text>
          </Card>
        ) : (
          lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <LessonCard lesson={lesson} courseColor={course.color} />
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )
}

interface LessonCardProps {
  lesson: Lesson
  courseColor: string
}

function LessonCard({ lesson, courseColor }: LessonCardProps) {
  const Icon =
    lesson.status === 'completed'
      ? CheckCircle2
      : lesson.status === 'in-progress'
        ? PlayCircle
        : Lock

  const iconColor =
    lesson.status === 'completed'
      ? 'bg-success-100 text-success-600 dark:bg-success-900/40 dark:text-success-500'
      : lesson.status === 'in-progress'
        ? 'text-white'
        : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'

  return (
    <Card
      className={cn(
        'transition-all hover:shadow-md',
        lesson.status === 'locked' && 'opacity-60',
      )}
      padding="md"
    >
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
              lesson.status === 'in-progress'
                ? 'text-white'
                : iconColor,
            )}
            style={
              lesson.status === 'in-progress'
                ? { backgroundColor: courseColor }
                : undefined
            }
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-caption font-semibold uppercase tracking-wide text-text-muted dark:text-slate-400">
                Lesson {String(lesson.number).padStart(2, '0')}
              </span>
              {lesson.status === 'completed' && (
                <Badge variant="success" className="text-caption">
                  Completed
                </Badge>
              )}
              {lesson.status === 'locked' && (
                <Badge variant="outline" className="text-caption">
                  Locked
                </Badge>
              )}
            </div>
            <h3 className="text-heading-4 text-text-primary dark:text-slate-100">
              {lesson.title}
            </h3>
            <p className="text-body-sm text-text-secondary dark:text-slate-400">
              {lesson.description}
            </p>
            <p className="text-caption text-text-muted dark:text-slate-500">
              {lesson.wordCount} words
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:flex-col sm:items-end">
          {lesson.status !== 'locked' && lesson.progress > 0 && (
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${lesson.progress}%`,
                    backgroundColor: courseColor,
                  }}
                />
              </div>
              <span className="text-caption font-medium text-text-muted dark:text-slate-400">
                {lesson.progress}%
              </span>
            </div>
          )}
          <Button
            variant={lesson.status === 'in-progress' ? 'primary' : 'outline'}
            size="sm"
            disabled={lesson.status === 'locked'}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            {lesson.status === 'completed' ? 'Review' : lesson.status === 'locked' ? 'Locked' : 'Start'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
