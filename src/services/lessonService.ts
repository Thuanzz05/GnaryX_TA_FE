import type { Lesson } from '@/types'
import { api } from './api'

export const lessonService = {
  async getByCourseId(courseId: string): Promise<Lesson[]> {
    try {
      const response = await api.get<any>(`/courses/${courseId}`)
      return response.data?.lessons || []
    } catch (error) {
      console.error('Failed to fetch lessons:', error)
      return []
    }
  },

  async getById(lessonId: string): Promise<Lesson | null> {
    try {
      const response = await api.get<any>(`/lessons/${lessonId}`)
      return response.data || null
    } catch (error) {
      console.error('Failed to fetch lesson:', error)
      return null
    }
  },

  async updateProgress(lessonId: string, progress: number, status: string) {
    try {
      const response = await api.post(`/lessons/${lessonId}/progress`, {
        progress,
        status,
      })
      return response.data
    } catch (error) {
      console.error('Failed to update lesson progress:', error)
      return null
    }
  },
}
