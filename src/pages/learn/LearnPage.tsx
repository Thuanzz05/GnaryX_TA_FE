import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Search } from 'lucide-react'
import { Button, Heading, Input, Tabs, Text, type Tab } from '@/components/common'
import { CourseCard } from '@/components/courses'
import { courseService } from '@/services/courseService'
import type { Course } from '@/types'

const CATEGORY_TABS: Tab[] = [
  { id: 'All', label: 'All' },
  { id: 'Beginner', label: 'Beginner' },
  { id: 'Intermediate', label: 'Intermediate' },
  { id: 'Advanced', label: 'Advanced' },
  { id: 'IELTS', label: 'IELTS' },
  { id: 'TOEIC', label: 'TOEIC' },
  { id: 'Business', label: 'Business' },
  { id: 'Academic', label: 'Academic' },
  { id: 'Daily English', label: 'Daily English' },
  { id: 'Travel', label: 'Travel' },
  { id: 'Technology', label: 'Technology' },
]

export default function LearnPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadCourses = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await courseService.getAll()
      setCourses(data)
      setFilteredCourses(data)
    } catch {
      setError('Failed to load courses. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCourses()
  }, [loadCourses])

  useEffect(() => {
    let filtered = courses

    if (activeTab !== 'All') {
      filtered = filtered.filter((course) => course.category === activeTab)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query),
      )
    }

    setFilteredCourses(filtered)
  }, [activeTab, searchQuery, courses])

  if (error) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-error-100 text-error-600 dark:bg-error-900/30 dark:text-error-500">
          <AlertCircle className="h-7 w-7" aria-hidden="true" />
        </div>
        <Heading level="h2">Something went wrong</Heading>
        <Text variant="muted">{error}</Text>
        <Button onClick={loadCourses}>Try Again</Button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-7xl space-y-6"
    >
      <header className="space-y-2">
        <Heading level="h1">Learn English Vocabulary</Heading>
        <Text variant="body-sm">Choose a course and start learning.</Text>
      </header>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          type="search"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="h-4 w-4" />}
          className="sm:w-80"
        />
      </div>

      <Tabs tabs={CATEGORY_TABS} activeTab={activeTab} onChange={setActiveTab} />

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-80 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700"
            />
          ))}
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-body text-text-secondary dark:text-slate-400">
            No courses found. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

