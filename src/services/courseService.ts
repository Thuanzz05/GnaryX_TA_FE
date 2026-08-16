import type { Course } from '@/types'
import { apiFetch } from './api'

export const courseService = {
  async getAll(): Promise<Course[]> {
    try {
      return await apiFetch<Course[]>('/courses')
    } catch {
      return []
    }
  },

  async getById(id: string): Promise<Course | null> {
    const courses = await this.getAll()
    return courses.find((course) => course.id === id) ?? null
  },

  async getByCategory(category: string): Promise<Course[]> {
    const courses = await this.getAll()
    if (category === 'All') {
      return courses
    }
    return courses.filter((course) => course.category === category)
  },
}
