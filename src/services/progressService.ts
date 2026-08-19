import type { DashboardData } from '@/types'
import { MOCK_DASHBOARD_STATS, MOCK_CONTINUE_LEARNING, MOCK_LEARNING_PLAN, WORD_OF_THE_DAY } from '@/data/mockDashboard'
import { vocabularyService } from './vocabularyService'
import { localData } from './localData'

const emptyAnalytics = {
  wordsLearnedByDay: [],
  cefrProgress: [],
  quizPerformance: [],
  totals: { totalWords: 0, currentStreak: localData.getUser().streak, quizzesTaken: 0, avgQuizScore: 0 },
}

export const progressService = {
  async getProgress() {
    const words = await vocabularyService.getAll()
    return words.filter((word) => word.isLearned)
  },
  async getDashboardData(): Promise<DashboardData> {
    const words = await vocabularyService.getAll()
    const learned = words.filter((word) => word.isLearned).length
    const user = localData.getUser()
    return {
      progress: { totalWords: learned, wordsThisWeek: learned, wordsThisMonth: learned, currentStreak: user.streak, longestStreak: user.streak, totalStudyTimeMinutes: learned * 3, xp: user.xp, level: user.levelNumber },
      dailyGoal: { target: user.dailyGoal, completed: Math.min(learned, user.dailyGoal), xpEarnedToday: Math.min(learned, user.dailyGoal) * 10 },
      stats: MOCK_DASHBOARD_STATS.map((stat) => stat.id === 'words-learned' ? { ...stat, value: String(learned) } : stat),
      continueLearning: { ...MOCK_CONTINUE_LEARNING },
      learningPlan: MOCK_LEARNING_PLAN.map((item) => ({ ...item })),
      wordOfTheDay: words.find((word) => word.word === WORD_OF_THE_DAY.word) || WORD_OF_THE_DAY,
      recentActivity: localData.getActivities() as DashboardData['recentActivity'],
    }
  },
  async getDailyGoal() { return (await this.getDashboardData()).dailyGoal },
  async getRecentActivity() { return localData.getActivities() },
  async getContinueLearning() { return (await this.getDashboardData()).continueLearning },
  async getWordOfTheDay() { return (await this.getDashboardData()).wordOfTheDay },
  async getAnalytics() {
    const attempts = localData.getQuizAttempts()
    const words = await vocabularyService.getAll()
    return {
      ...emptyAnalytics,
      cefrProgress: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((level) => {
        const total = words.filter((word) => word.level === level).length
        const learned = words.filter((word) => word.level === level && word.isLearned).length
        return { level, learned, total, progress: total ? Math.round((learned / total) * 100) : 0 }
      }),
      totals: { totalWords: words.filter((word) => word.isLearned).length, currentStreak: localData.getUser().streak, quizzesTaken: attempts.length, avgQuizScore: attempts.length ? Math.round(attempts.reduce((sum, item) => sum + item.score, 0) / attempts.length) : 0 },
      quizPerformance: attempts.map((item) => ({ title: 'Local Quiz', score: item.score, correct_answers: item.correctCount, wrong_answers: item.totalQuestions - item.correctCount, submitted_at: item.submittedAt })),
    }
  },
}
