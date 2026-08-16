import type { User } from '@/types'
import { api } from './api'

export const userService = {
  async getProfile(): Promise<User | null> {
    try {
      const response = await api.get<any>('/users/profile')
      return response.data || null
    } catch (error) {
      console.error('Failed to fetch profile:', error)
      return null
    }
  },

  async updateProfile(updates: Partial<User>): Promise<User | null> {
    try {
      const response = await api.put('/users/profile', updates)
      return response.data || null
    } catch (error) {
      console.error('Failed to update profile:', error)
      return null
    }
  },

  async getSettings(): Promise<any> {
    try {
      const response = await api.get('/users/settings')
      return response.data
    } catch (error) {
      console.error('Failed to fetch settings:', error)
      return null
    }
  },

  async updateSettings(settings: Record<string, unknown>): Promise<void> {
    try {
      await api.put('/users/settings', settings)
    } catch (error) {
      console.error('Failed to update settings:', error)
    }
  },

  async getProgress(): Promise<{
    totalWordsLearned: number
    totalQuizzes: number
    averageQuizScore: number
  }> {
    try {
      const response = await api.get('/progress')
      return {
        totalWordsLearned: response.data?.length || 0,
        totalQuizzes: 0,
        averageQuizScore: 0,
      }
    } catch (error) {
      console.error('Failed to fetch progress:', error)
      return { totalWordsLearned: 0, totalQuizzes: 0, averageQuizScore: 0 }
    }
  },

  async toggleWordFavorite(wordId: string): Promise<boolean> {
    try {
      const response = await api.post(`/vocabulary/${wordId}/toggle-favorite`, {})
      return response.data?.isFavorite || false
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
      return false
    }
  },

  async markWordAsLearned(wordId: string): Promise<boolean> {
    try {
      const response = await api.post(`/flashcards/${wordId}/learn`, {})
      return response.data?.success || false
    } catch (error) {
      console.error('Failed to mark as learned:', error)
      return false
    }
  },

  async getFavorites(): Promise<any[]> {
    try {
      const response = await api.get('/users/favorites')
      return response.data || []
    } catch (error) {
      console.error('Failed to fetch favorites:', error)
      return []
    }
  },

  async getActivity(): Promise<any[]> {
    try {
      const response = await api.get('/users/activity')
      return response.data || []
    } catch (error) {
      console.error('Failed to fetch activity:', error)
      return []
    }
  },

  async logLearningActivity(type: string, description: string, xpEarned?: number): Promise<boolean> {
    try {
      // This endpoint may need to be added to backend if needed
      console.log('Logging activity:', { type, description, xpEarned })
      return true
    } catch (error) {
      console.error('Failed to log activity:', error)
      return false
    }
  },
}
