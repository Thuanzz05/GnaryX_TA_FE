import type { User } from '@/types'
import { apiFetch } from './api'

const MOCK_USER: User = {
  id: '1',
  fullName: 'Thuấn',
  email: 'thuan@example.com',
  level: 'B1',
  xp: 4250,
  levelNumber: 12,
  streak: 7,
  dailyGoal: 20,
  preferredTopics: ['Business', 'Technology'],
}

function getToken(): string | null {
  return localStorage.getItem('gnarylex-auth-token') || null
}

export const userService = {
  async getProfile(userId?: string): Promise<User | null> {
    try {
      if (!userId) {
        return MOCK_USER
      }
      
      const token = getToken()
      const data = await apiFetch<User>(`/users/${userId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      return data || MOCK_USER
    } catch {
      return MOCK_USER
    }
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    try {
      const token = getToken()
      if (!token) throw new Error('Not authenticated')

      const data = await apiFetch<User>(`/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
        headers: { Authorization: `Bearer ${token}` },
      })
      return data || MOCK_USER
    } catch {
      return MOCK_USER
    }
  },

  async updateSettings(_settings: Record<string, unknown>): Promise<void> {
    return
  },

  async getProgress(userId: string): Promise<{
    totalWordsLearned: number
    totalQuizzes: number
    averageQuizScore: number
  }> {
    try {
      const token = getToken()
      const data = await apiFetch<{
        totalWordsLearned: number
        totalQuizzes: number
        averageQuizScore: number
      }>(`/users/${userId}/progress`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      return data || { totalWordsLearned: 0, totalQuizzes: 0, averageQuizScore: 0 }
    } catch {
      return { totalWordsLearned: 0, totalQuizzes: 0, averageQuizScore: 0 }
    }
  },

  async toggleWordFavorite(wordId: string, isFavorite: boolean): Promise<boolean> {
    try {
      const token = getToken()
      if (!token) return false
      
      await apiFetch<{ success: boolean; isFavorite: boolean }>(
        `/vocabulary/${wordId}/favorite`,
        {
          method: 'POST',
          body: JSON.stringify({ isFavorite }),
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      return isFavorite
    } catch {
      return false
    }
  },

  async markWordAsLearned(wordId: string, isLearned: boolean): Promise<boolean> {
    try {
      const token = getToken()
      if (!token) return false
      
      await apiFetch<{ success: boolean; isLearned: boolean }>(
        `/vocabulary/${wordId}/learned`,
        {
          method: 'POST',
          body: JSON.stringify({ isLearned }),
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      return isLearned
    } catch {
      return false
    }
  },

  async logLearningActivity(type: string, description: string, xpEarned?: number): Promise<boolean> {
    try {
      const token = getToken()
      if (!token) return false
      
      await apiFetch<{ id: string; success: boolean }>(
        '/learning-activities',
        {
          method: 'POST',
          body: JSON.stringify({ type, description, xpEarned }),
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      return true
    } catch {
      return false
    }
  },
}
