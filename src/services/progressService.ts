import type { DashboardData } from '@/types'
import { api } from './api'

export const progressService = {
  async getProgress() {
    try {
      const response = await api.get('/api/progress')
      return response.data || []
    } catch (error) {
      console.error('Failed to fetch progress:', error)
      return []
    }
  },

  async getDashboardData(): Promise<DashboardData> {
    try {
      const response = await api.get<any>('/api/progress/dashboard')
      const data = response.data
      const user = data.user || {}

      return {
        progress: {
          totalWords: Number(data.stats?.lessonsCompleted || 0),
          wordsThisWeek: 0,
          wordsThisMonth: 0,
          currentStreak: Number(user.streak || 0),
          longestStreak: Number(user.streak || 0),
          totalStudyTimeMinutes: 0,
          xp: Number(user.xp || 0),
          level: Number(user.level_number || 1),
        },
        dailyGoal: {
          target: Number(user.daily_goal || 20),
          completed: 0,
          xpEarnedToday: 0,
        },
        stats: [
          { id: 'words-learned', label: 'Lessons Completed', value: String(data.stats?.lessonsCompleted || 0), icon: 'book', trend: { value: 'Live', direction: 'up' } },
          { id: 'review-today', label: 'In Progress', value: String(data.stats?.inProgressCourses || 0), icon: 'refresh', trend: { value: 'Pending', direction: 'neutral' } },
          { id: 'current-streak', label: 'Current Streak', value: `🔥 ${Number(user.streak || 0)} days`, icon: 'flame', trend: { value: 'Live', direction: 'up' } },
          { id: 'study-time', label: 'Total Courses', value: String(data.stats?.totalCourses || 0), icon: 'clock', trend: { value: 'Live', direction: 'neutral' } },
        ],
        continueLearning: data.activeCourses?.[0] ? {
          courseId: data.activeCourses[0].id,
          courseTitle: data.activeCourses[0].title,
          lessonNumber: 1,
          lessonTitle: data.activeCourses[0].title,
          progress: Number(data.activeCourses[0].progress || 0),
          wordsCompleted: 0,
          wordsTotal: Number(data.activeCourses[0].lesson_count || 0),
          color: data.activeCourses[0].color || '#6366f1',
        } : {
          courseId: '',
          courseTitle: 'Start Learning',
          lessonNumber: 0,
          lessonTitle: 'No active course',
          progress: 0,
          wordsCompleted: 0,
          wordsTotal: 0,
          color: '#6366f1',
        },
        learningPlan: [],
        wordOfTheDay: {
          id: 'demo-word',
          word: 'resilient',
          phonetic: '/rɪˈzɪliənt/',
          partOfSpeech: 'adjective',
          meaning: 'able to recover quickly from difficulties',
          meaningVi: 'kiên cường, có khả năng phục hồi',
          example: 'She remained resilient despite many challenges.',
          exampleVi: 'Cô ấy vẫn kiên cường dù gặp nhiều thử thách.',
          synonyms: ['tough', 'strong', 'adaptable'],
          antonyms: ['fragile', 'weak'],
          wordFamily: ['resilience', 'resiliently'],
          collocations: ['resilient spirit', 'resilient economy'],
          level: 'B2',
          topic: 'Daily Life',
          difficulty: 'medium',
          isLearned: false,
          isFavorite: false,
        },
        recentActivity: Array.isArray(data.recentActivity) ? data.recentActivity.map((item: any, index: number) => ({
          id: item.id || `activity-${index}`,
          type: item.status === 'completed' ? 'complete' : 'learn',
          description: item.lesson_title || 'Completed lesson',
          timestamp: item.completed_at || new Date().toISOString(),
          xpEarned: 0,
        })) : [],
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      return {
        progress: { totalWords: 0, wordsThisWeek: 0, wordsThisMonth: 0, currentStreak: 0, longestStreak: 0, totalStudyTimeMinutes: 0, xp: 0, level: 1 },
        dailyGoal: { target: 20, completed: 0, xpEarnedToday: 0 },
        stats: [],
        continueLearning: { courseId: '', courseTitle: '', lessonNumber: 0, lessonTitle: '', progress: 0, wordsCompleted: 0, wordsTotal: 0, color: '#6366f1' },
        learningPlan: [],
        wordOfTheDay: { id: 'demo-word', word: 'resilient', phonetic: '/rɪˈzɪliənt/', partOfSpeech: 'adjective', meaning: 'able to recover quickly from difficulties', meaningVi: 'kiên cường, có khả năng phục hồi', example: 'She remained resilient despite many challenges.', exampleVi: 'Cô ấy vẫn kiên cường dù gặp nhiều thử thách.', synonyms: ['tough', 'strong', 'adaptable'], antonyms: ['fragile', 'weak'], wordFamily: ['resilience', 'resiliently'], collocations: ['resilient spirit', 'resilient economy'], level: 'B2', topic: 'Daily Life', difficulty: 'medium', isLearned: false, isFavorite: false },
        recentActivity: [],
      }
    }
  },

  async getDailyGoal() {
    try {
      const data = await this.getDashboardData()
      return data.dailyGoal
    } catch {
      return { target: 20, completed: 0, xpEarnedToday: 0 }
    }
  },

  async getRecentActivity() {
    try {
      const response = await api.get('/api/users/activity')
      return response.data || []
    } catch (error) {
      console.error('Failed to fetch activity:', error)
      return []
    }
  },

  async getContinueLearning() {
    try {
      const data = await this.getDashboardData()
      return data.continueLearning
    } catch {
      return { courseId: '', courseTitle: '', lessonNumber: 0, lessonTitle: '', progress: 0, wordsCompleted: 0, wordsTotal: 0, color: '#6366f1' }
    }
  },

  async getWordOfTheDay() {
    try {
      const data = await this.getDashboardData()
      return data.wordOfTheDay
    } catch {
      return null
    }
  },
}
