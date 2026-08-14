import type { DashboardData } from '@/types'
import {
  MOCK_CONTINUE_LEARNING,
  MOCK_DAILY_GOAL,
  MOCK_DASHBOARD_STATS,
  MOCK_LEARNING_PLAN,
  MOCK_PROGRESS,
  MOCK_RECENT_ACTIVITY,
  WORD_OF_THE_DAY,
} from '@/data'

function delay(ms = 600): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const progressService = {
  async getProgress() {
    await delay()
    return { ...MOCK_PROGRESS }
  },

  async getDailyGoal() {
    await delay()
    return { ...MOCK_DAILY_GOAL }
  },

  async getRecentActivity() {
    await delay()
    return [...MOCK_RECENT_ACTIVITY]
  },

  async getDashboardStats() {
    await delay()
    return [...MOCK_DASHBOARD_STATS]
  },

  async getLearningPlan() {
    await delay()
    return [...MOCK_LEARNING_PLAN]
  },

  async getContinueLearning() {
    await delay()
    return { ...MOCK_CONTINUE_LEARNING }
  },

  async getWordOfTheDay() {
    await delay()
    return { ...WORD_OF_THE_DAY }
  },

  async getDashboardData(): Promise<DashboardData> {
    await delay(800)
    return {
      progress: { ...MOCK_PROGRESS },
      dailyGoal: { ...MOCK_DAILY_GOAL },
      stats: [...MOCK_DASHBOARD_STATS],
      continueLearning: { ...MOCK_CONTINUE_LEARNING },
      learningPlan: [...MOCK_LEARNING_PLAN],
      wordOfTheDay: { ...WORD_OF_THE_DAY },
      recentActivity: [...MOCK_RECENT_ACTIVITY],
    }
  },
}
