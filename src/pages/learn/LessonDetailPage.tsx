import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Volume2,
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  Heading,
  ProgressBar,
  Text,
  useToast,
} from '@/components/common'
import { lessonService } from '@/services/lessonService'
import { courseService } from '@/services/courseService'
import { vocabularyService } from '@/services/vocabularyService'
import { speakWord } from '@/utils/speech'
import type { Course, Lesson, VocabularyWord } from '@/types'

export default function LessonDetailPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>()
  const { toast } = useToast()

  const [course, setCourse] = useState<Course | null>(null)
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [words, setWords] = useState<VocabularyWord[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)

  const loadData = useCallback(async () => {
    if (!courseId || !lessonId) return
    setIsLoading(true)
    setError(null)
    try {
      const [courseData, lessonData, allWords] = await Promise.all([
        courseService.getById(courseId),
        lessonService.getById(courseId, lessonId),
        vocabularyService.getAll(),
      ])
      if (!courseData || !lessonData) { setError('Lesson not found'); return }
      setCourse(courseData)
      setLesson(lessonData)
      // Use real vocab words, capped to lessonData.wordCount
      setWords(allWords.slice(0, lessonData.wordCount))
    } catch {
      setError('Failed to load lesson')
    } finally {
      setIsLoading(false)
    }
  }, [courseId, lessonId])

  useEffect(() => { loadData() }, [loadData])

  const current = words[currentIdx]
  const progress = words.length > 0 ? (learnedIds.size / words.length) * 100 : 0

  const handleMarkLearned = async () => {
    if (!current) return
    try {
      await vocabularyService.markAsLearned(current.id)
      setLearnedIds((prev) => new Set([...prev, current.id]))
      toast({ type: 'success', title: `"${current.word}" marked as learned`, description: '+5 XP' })
    } catch { /* silent */ }
  }

  const handleNext = () => {
    if (currentIdx + 1 >= words.length) {
      setFinished(true)
    } else {
      setCurrentIdx((i) => i + 1)
    }
  }

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx((i) => i - 1)
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="h-6 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-64 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700" />
      </div>
    )
  }

  if (error || !lesson || !course) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-error-100 text-error-600 dark:bg-error-900/30">
          <AlertCircle className="h-7 w-7" />
        </div>
        <Heading level="h2">Lesson Not Found</Heading>
        <Text variant="muted">{error}</Text>
        <Link to={`/learn/${courseId}`}><Button>Back to Course</Button></Link>
      </div>
    )
  }

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-lg space-y-6 py-8 text-center"
      >
        <div className="text-6xl">🎉</div>
        <Heading level="h2">Lesson Complete!</Heading>
        <Text variant="muted">
          You studied <span className="font-semibold text-text-primary dark:text-slate-100">{words.length} words</span> and
          learned <span className="font-semibold text-success-600">{learnedIds.size}</span> of them.
        </Text>
        <Card padding="lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-heading-3 text-primary-600 dark:text-primary-400">{words.length}</p>
              <p className="text-caption text-text-muted dark:text-slate-500">Words studied</p>
            </div>
            <div>
              <p className="text-heading-3 text-success-600 dark:text-success-400">{learnedIds.size}</p>
              <p className="text-caption text-text-muted dark:text-slate-500">Learned</p>
            </div>
            <div>
              <p className="text-heading-3 text-warning-600 dark:text-warning-400">+{learnedIds.size * 5}</p>
              <p className="text-caption text-text-muted dark:text-slate-500">XP earned</p>
            </div>
          </div>
        </Card>
        <div className="flex gap-3">
          <Link to={`/learn/${courseId}`} className="flex-1">
            <Button fullWidth variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Back to Course
            </Button>
          </Link>
          <Link to="/flashcards" className="flex-1">
            <Button fullWidth>Practice Flashcards</Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-3xl space-y-6"
    >
      <div className="flex items-center gap-3">
        <Link
          to={`/learn/${courseId}`}
          className="inline-flex items-center gap-1.5 text-body-sm font-medium text-text-secondary transition-colors hover:text-text-primary dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4" />
          {course.title}
        </Link>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-caption font-semibold uppercase tracking-wide text-text-muted dark:text-slate-500">
              Lesson {String(lesson.number).padStart(2, '0')}
            </p>
            <Heading level="h2">{lesson.title}</Heading>
          </div>
          <Badge variant="outline">{currentIdx + 1} / {words.length}</Badge>
        </div>
        <ProgressBar value={progress} />
        <Text variant="caption">
          {learnedIds.size} of {words.length} words learned
        </Text>
      </div>

      {current && (
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Card
            padding="lg"
            className="border-t-4"
            style={{ borderTopColor: course.color }}
          >
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-display capitalize text-text-primary dark:text-slate-100">
                      {current.word}
                    </h2>
                    {learnedIds.has(current.id) && (
                      <Badge variant="success">Learned</Badge>
                    )}
                  </div>
                  <p className="mt-1 text-body text-text-secondary dark:text-slate-400">
                    {current.phonetic}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant="primary">{current.level}</Badge>
                  <Badge variant="outline" className="capitalize">{current.partOfSpeech}</Badge>
                </div>
              </div>

              <div className="rounded-xl bg-surface-muted p-4 dark:bg-slate-800/50">
                <p className="text-body font-medium text-text-primary dark:text-slate-100">
                  {current.meaning}
                </p>
                <p className="mt-1 text-body-sm text-primary-600 dark:text-primary-400">
                  {current.meaningVi}
                </p>
              </div>

              <blockquote className="border-l-4 border-primary-300 pl-4 dark:border-primary-600">
                <p className="italic text-body text-text-secondary dark:text-slate-300">
                  &ldquo;{current.example}&rdquo;
                </p>
              </blockquote>

              {current.synonyms.length > 0 && (
                <div>
                  <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-text-muted dark:text-slate-500">
                    Synonyms
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {current.synonyms.map((s) => (
                      <Badge key={s} variant="secondary">{s}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Volume2 className="h-4 w-4" />}
                  onClick={() => speakWord(current.word)}
                >
                  Listen
                </Button>
                <Button
                  variant={learnedIds.has(current.id) ? 'outline' : 'primary'}
                  size="sm"
                  leftIcon={<CheckCircle2 className="h-4 w-4" />}
                  onClick={handleMarkLearned}
                  disabled={learnedIds.has(current.id)}
                >
                  {learnedIds.has(current.id) ? 'Learned' : 'Mark as Learned'}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          onClick={handlePrev}
          disabled={currentIdx === 0}
        >
          Previous
        </Button>

        <div className="flex gap-1.5">
          {words.slice(0, 8).map((w, i) => (
            <button
              key={w.id}
              type="button"
              onClick={() => setCurrentIdx(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === currentIdx
                  ? 'bg-primary-600 dark:bg-primary-400'
                  : learnedIds.has(w.id)
                    ? 'bg-success-400'
                    : 'bg-slate-200 dark:bg-slate-700'
              }`}
              aria-label={`Go to word ${i + 1}`}
            />
          ))}
          {words.length > 8 && (
            <span className="text-caption text-text-muted">+{words.length - 8}</span>
          )}
        </div>

        <Button
          rightIcon={<ArrowRight className="h-4 w-4" />}
          onClick={handleNext}
        >
          {currentIdx + 1 >= words.length ? 'Finish' : 'Next'}
        </Button>
      </div>

      <Card padding="md" className="bg-surface-muted dark:bg-slate-800/50">
        <div className="flex items-center gap-2 text-body-sm text-text-secondary dark:text-slate-400">
          <BookOpen className="h-4 w-4 shrink-0" />
          <span>
            Study each word carefully, then click <strong className="text-text-primary dark:text-slate-200">Mark as Learned</strong> to track your progress.
          </span>
        </div>
      </Card>
    </motion.div>
  )
}
