import type { Lesson } from '@/types'
import { MOCK_LESSONS } from '@/data/mockCourses'
import { localData } from './localData'

export const lessonService = {
  async getByCourseId(courseId: string): Promise<Lesson[]> {
    return localData.getLessons(courseId)
  },

  async getById(lessonId: string): Promise<Lesson | null> {
    return Object.values(MOCK_LESSONS).flat().find((lesson) => lesson.id === lessonId) ?? null
  },

  async updateProgress(lessonId: string, progress: number, status: string) {
    const values = localData.read<Record<string, { progress: number; status: string }>>('gnarylex-local-lesson-progress', {})
    values[lessonId] = { progress, status }
    localData.write('gnarylex-local-lesson-progress', values)
    return values[lessonId]
  },
}
