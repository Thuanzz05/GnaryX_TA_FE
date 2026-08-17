import type { Course } from '@/types'
import { api } from './api'

function normalizeCourse(item: any): Course {
  const iconMap: Record<string, string> = {
    briefcase: '💼',
    'graduation-cap': '🎓',
    book: '📘',
    laptop: '💻',
    plane: '✈️',
    globe: '🌍',
    sparkles: '✨',
    target: '🎯',
    headphones: '🎧',
    chat: '💬',
    wallet: '💰',
  }

  const icon = item.icon ?? '📘'

  return {
    id: item.id,
    title: item.title,
    description: item.description,
    level: item.level,
    category: item.category,
    lessonCount: Number(item.lessonCount ?? item.lesson_count ?? 0),
    wordCount: Number(item.wordCount ?? item.word_count ?? 0),
    progress: Number(item.progress ?? item.userProgress ?? 0),
    icon: iconMap[String(icon)] ?? String(icon) ?? '📘',
    color: item.color ?? '#4F46E5',
  }
}

export const courseService = {
  async getAll(): Promise<Course[]> {
    try {
      const response = await api.get<any[]>('/courses')
      return (response.data || []).map(normalizeCourse)
    } catch (error) {
      console.error('Failed to fetch courses:', error)
      return []
    }
  },

  async getById(id: string): Promise<Course | null> {
    try {
      const response = await api.get<any>(`/courses/${id}`)
      return response.data ? normalizeCourse(response.data) : null
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
