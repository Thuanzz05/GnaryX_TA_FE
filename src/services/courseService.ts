import type { Course } from '@/types'
import { localData } from './localData'

export const courseService = {
  async getAll(): Promise<Course[]> {
    return localData.getCourses()
  },

  async getById(id: string): Promise<Course | null> {
    return localData.getCourses().find((course) => course.id === id) ?? null
  },

  async getByCategory(category: string): Promise<Course[]> {
    const courses = localData.getCourses()
    return category === 'All' ? courses : courses.filter((course) => course.category === category)
  },
}
