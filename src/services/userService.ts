import type { User } from '@/types'
import { vocabularyService } from './vocabularyService'
import { localData } from './localData'

const SETTINGS_KEY = 'gnarylex-local-settings'
type LocalSettings = {
  level?: User['level']
  preferredTopics?: string[]
  dailyGoal?: number
  theme?: string
  notifications?: boolean
}

export const userService = {
  async getProfile(): Promise<User> { return localData.getUser() },
  async updateProfile(updates: Partial<User>): Promise<User> {
    const user = { ...localData.getUser(), ...updates }
    localData.setUser(user)
    return user
  },
  async getSettings(): Promise<LocalSettings> { return localData.read<LocalSettings>(SETTINGS_KEY, {}) },
  async updateSettings(settings: Record<string, unknown>): Promise<void> {
    localData.write(SETTINGS_KEY, { ...localData.read(SETTINGS_KEY, {}), ...settings })
  },
  async getProgress() {
    const words = await vocabularyService.getAll()
    return { totalWordsLearned: words.filter((word) => word.isLearned).length, totalQuizzes: localData.getQuizAttempts().length, averageQuizScore: 0 }
  },
  async toggleWordFavorite(wordId: string): Promise<boolean> { return (await vocabularyService.toggleFavorite(wordId)).isFavorite },
  async markWordAsLearned(wordId: string): Promise<boolean> { await vocabularyService.markAsLearned(wordId); return true },
  async getFavorites(): Promise<any[]> { return vocabularyService.getAll({ favorite: true }) },
  async getActivity(): Promise<any[]> { return localData.getActivities() },
  async logLearningActivity(type: string, description: string, xpEarned = 0): Promise<boolean> {
    localData.addActivity({ id: `activity-${Date.now()}`, type, description, timestamp: new Date().toISOString(), xpEarned })
    return true
  },
}
