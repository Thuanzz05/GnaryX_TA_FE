import type { DashboardData, VocabularyWord, LearningPlanItem } from '@/types'
import { api } from './api'

const mapWord = (item: any): VocabularyWord => ({
  id: item.id,
  word: item.word,
  phonetic: item.phonetic || '',
  partOfSpeech: item.part_of_speech || item.partOfSpeech || 'noun',
  meaning: item.meaning,
  meaningVi: item.meaning_vi || item.meaningVi || '',
  example: item.example_text || item.example || '',
  exampleVi: item.example_vi || item.exampleVi || '',
  synonyms: Array.isArray(item.synonyms) ? item.synonyms : [],
  antonyms: Array.isArray(item.antonyms) ? item.antonyms : [],
  wordFamily: Array.isArray(item.word_family) ? item.word_family : Array.isArray(item.wordFamily) ? item.wordFamily : [],
  collocations: Array.isArray(item.collocations) ? item.collocations : [],
  level: item.level,
  topic: item.topic,
  difficulty: item.difficulty,
  isLearned: Boolean(item.is_learned ?? item.isLearned ?? false),
  isFavorite: Boolean(item.is_favorite ?? item.isFavorite ?? false),
})

const PLAN_ICONS: Record<string, LearningPlanItem['icon']> = {
  'learn-new-words': 'book-open',
  'review-words': 'refresh-cw',
  'complete-quiz': 'clipboard-check',
  'practice-difficult': 'target',
}

const PLAN_ACTIONS: Record<string, string> = {
  'learn-new-words': 'Start',
  'review-words': 'Review',
  'complete-quiz': 'Take Quiz',
  'practice-difficult': 'Practice',
}

const mapLearningPlan = (items: any[]): LearningPlanItem[] =>
  (items || []).map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    icon: PLAN_ICONS[item.id] || 'book-open',
    completed: Boolean(item.isCompleted),
    actionLabel: PLAN_ACTIONS[item.id] || 'Go',
    actionHref: item.actionUrl || '/dashboard',
  }))

export const progressService = {
  async getProgress() {
    try {
      const response = await api.get('/progress')
      return response.data || []
    } catch (error) {
      console.error('Failed to fetch progress:', error)
      return []
    }
  },

  async getDashboardData(): Promise<DashboardData> {
    try {
      const response = await api.get<any>('/progress/dashboard')
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
          { id: 'words-learned', label: 'Words Learned', value: String(data.stats?.wordsLearned || 0), icon: 'book', trend: { value: 'Live', direction: 'up' } },
          { id: 'review-today', label: 'Review Today', value: String(data.stats?.reviewDueToday || 0), icon: 'refresh', trend: { value: data.stats?.reviewDueToday > 0 ? 'Due' : 'All clear', direction: 'neutral' } },
          { id: 'current-streak', label: 'Current Streak', value: `🔥 ${Number(user.streak || 0)} days`, icon: 'flame', trend: { value: 'Live', direction: 'up' } },
          { id: 'study-time', label: 'Lessons Completed', value: String(data.stats?.lessonsCompleted || 0), icon: 'clock', trend: { value: 'Live', direction: 'neutral' } },
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
        learningPlan: mapLearningPlan(data.learningPlan),
        wordOfTheDay: data.wordOfTheDay ? mapWord(data.wordOfTheDay) : {
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
      const response = await api.get('/users/activity')
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
