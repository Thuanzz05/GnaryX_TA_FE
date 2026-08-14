import type { Course } from '@/types'
import { MOCK_COURSES } from '@/data'

function delay(ms = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const courseService = {
  async getAll(): Promise<Course[]> {
    await delay()
    return [...MOCK_COURSES]
  },

  async getById(id: string): Promise<Course | null> {
    await delay()
    const course = MOCK_COURSES.find((c) => c.id === id)
    return course ? { ...course } : null
  },

  async getByCategory(category: string): Promise<Course[]> {
    await delay()
    if (category === 'All') {
      return [...MOCK_COURSES]
    }
    return MOCK_COURSES.filter((c) => c.category === category)
  },
}
