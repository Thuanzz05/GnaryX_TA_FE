import type { Course } from '@/types'
import { api } from './api'

export const courseService = {
  async getAll(): Promise<Course[]> {
    try {
      const response = await api.get<Course[]>('/api/courses')
      return response.data || []
    } catch (error) {
      console.error('Failed to fetch courses:', error)
      return []
    }
  },

  async getById(id: string): Promise<Course | null> {
    try {
      const response = await api.get<any>(`/api/courses/${id}`)
      return response.data || null
    } catch (error) {
      console.error('Failed to fetch course:', error)
      return null
    }
  },

  async getByCategory(category: string): Promise<Course[]> {
    try {
      const courses = await this.getAll()
      if (category === 'All') {
        return courses
      }
      return courses.filter((course) => course.category === category)
    } catch (error) {
      console.error('Failed to filter courses:', error)
      return []
    }
  },
}
