import type { Course } from '@/types'

export const courseService = {
  async getAll(): Promise<Course[]> {
    return []
  },

  async getById(_id: string): Promise<Course | null> {
    return null
  },
}
