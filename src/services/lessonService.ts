import type { Lesson } from '@/types'
import { MOCK_LESSONS } from '@/data'

function delay(ms = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const lessonService = {
  async getByCourseId(courseId: string): Promise<Lesson[]> {
    await delay()
    return MOCK_LESSONS[courseId] ?? []
  },

  async getById(courseId: string, lessonId: string): Promise<Lesson | null> {
    await delay()
    const lessons = MOCK_LESSONS[courseId] ?? []
    const lesson = lessons.find((l) => l.id === lessonId)
    return lesson ? { ...lesson } : null
  },
}
