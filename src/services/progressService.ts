import type { DashboardData } from '@/types'
import { apiFetch } from './api'

export const progressService = {
  async getProgress() {
    return { totalWords: 0, wordsThisWeek: 0, wordsThisMonth: 0, currentStreak: 0, longestStreak: 0, totalStudyTimeMinutes: 0, xp: 0, level: 1 }
  },

  async getDailyGoal() {
    return { target: 20, completed: 0, xpEarnedToday: 0 }
  },

  async getRecentActivity() {
    return []
  },

  async getDashboardStats() {
    return []
  },

  async getLearningPlan() {
    return []
  },

  async getContinueLearning() {
    return { courseId: '', courseTitle: '', lessonNumber: 0, lessonTitle: '', progress: 0, wordsCompleted: 0, wordsTotal: 0, color: '#6366f1' }
  },

  async getWordOfTheDay() {
    const words = await this.getDashboardData().then((data) => data.wordOfTheDay)
    return words
  },

  async getDashboardData(): Promise<DashboardData> {
    try {
      const data = await apiFetch<any>('/dashboard')
      const user = data.user ?? {}
      const wordOfTheDay = data.wordOfTheDay ?? null

      return {
        progress: {
          totalWords: Number(user.xp ?? 0),
          wordsThisWeek: 0,
          wordsThisMonth: 0,
          currentStreak: Number(user.streak ?? 0),
          longestStreak: Number(user.streak ?? 0),
          totalStudyTimeMinutes: 0,
          xp: Number(user.xp ?? 0),
          level: Number(user.level_number ?? 1),
        },
        dailyGoal: {
          target: Number(user.daily_goal ?? 20),
          completed: 0,
          xpEarnedToday: 0,
        },
        stats: [
          { id: 'words-learned', label: 'Words Learned', value: String(Number(user.xp ?? 0)), icon: 'book', trend: { value: 'Live', direction: 'up' } },
          { id: 'review-today', label: 'Review Today', value: '0', icon: 'refresh', trend: { value: 'Pending', direction: 'neutral' } },
          { id: 'current-streak', label: 'Current Streak', value: `🔥 ${Number(user.streak ?? 0)} days`, icon: 'flame', trend: { value: 'Live', direction: 'up' } },
          { id: 'study-time', label: 'Study Time', value: '0h 0m', icon: 'clock', trend: { value: 'Live', direction: 'neutral' } },
        ],
        continueLearning: {
          courseId: '',
          courseTitle: 'Business English',
          lessonNumber: 1,
          lessonTitle: 'Active course',
          progress: data.progress?.progress ?? 0,
          wordsCompleted: 0,
          wordsTotal: 0,
          color: '#6366f1',
        },
        learningPlan: [],
        wordOfTheDay: wordOfTheDay ? {
          id: wordOfTheDay.id,
          word: wordOfTheDay.word,
          phonetic: wordOfTheDay.phonetic || '',
          partOfSpeech: wordOfTheDay.part_of_speech,
          meaning: wordOfTheDay.meaning,
          meaningVi: wordOfTheDay.meaning_vi,
          example: wordOfTheDay.example_text,
          exampleVi: wordOfTheDay.example_vi || '',
          synonyms: Array.isArray(wordOfTheDay.synonyms) ? wordOfTheDay.synonyms : [],
          antonyms: Array.isArray(wordOfTheDay.antonyms) ? wordOfTheDay.antonyms : [],
          wordFamily: Array.isArray(wordOfTheDay.word_family) ? wordOfTheDay.word_family : [],
          collocations: Array.isArray(wordOfTheDay.collocations) ? wordOfTheDay.collocations : [],
          level: wordOfTheDay.level,
          topic: wordOfTheDay.topic,
          difficulty: wordOfTheDay.difficulty,
          isLearned: false,
          isFavorite: false,
        } : {
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
          type: item.activity_type || 'learn',
          description: item.description || 'Learned a new word',
          timestamp: item.created_at || new Date().toISOString(),
          xpEarned: item.xp_earned || 0,
        })) : [],
      }
    } catch {
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
}
