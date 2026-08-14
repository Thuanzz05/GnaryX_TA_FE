import type { Lesson } from '@/types'

export const lessonService = {
  async getByCourseId(_courseId: string): Promise<Lesson[]> {
    return []
  },

  async getById(_courseId: string, _lessonId: string): Promise<Lesson | null> {
    return null
  },
}
