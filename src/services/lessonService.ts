import type { Lesson } from '@/types'
import { apiFetch } from './api'

export const lessonService = {
  async getByCourseId(courseId: string): Promise<Lesson[]> {
    try {
      return await apiFetch<Lesson[]>(`/lessons/${courseId}`)
    } catch {
      return []
    }
  },

  async getById(courseId: string, lessonId: string): Promise<Lesson | null> {
    const lessons = await this.getByCourseId(courseId)
    return lessons.find((lesson) => lesson.id === lessonId) ?? null
  },
}
