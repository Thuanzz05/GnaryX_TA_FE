import type { LearningProgress, LearningActivity, DailyGoal } from '@/types'

export const progressService = {
  async getProgress(): Promise<LearningProgress> {
    return {
      totalWords: 0,
      wordsThisWeek: 0,
      wordsThisMonth: 0,
      currentStreak: 0,
      longestStreak: 0,
      totalStudyTimeMinutes: 0,
      xp: 0,
      level: 1,
    }
  },

  async getDailyGoal(): Promise<DailyGoal> {
    return { target: 20, completed: 0, xpEarnedToday: 0 }
  },

  async getRecentActivity(): Promise<LearningActivity[]> {
    return []
  },
}
