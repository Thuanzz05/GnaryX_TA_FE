import { api } from './api'

export interface Flashcard {
  id: string
  word: string
  phonetic: string
  partOfSpeech: string
  meaning: string
  meaningVi: string
  example: string
  exampleVi: string
  level: string
  topic: string
  difficulty: string
  synonyms: string[]
  antonyms: string[]
  wordFamily: string[]
  collocations: string[]
  isLearned: boolean
  reviewCount?: number
  easeFactor?: number
  nextReviewDate?: string
  lastReviewedAt?: string
}

export const flashcardService = {
  async getAll(): Promise<Flashcard[]> {
    try {
      const response = await api.get<Flashcard[]>('/api/flashcards')
      return response.data || []
    } catch (error) {
      console.error('Failed to fetch flashcards:', error)
      return []
    }
  },

  async getTodayReview(): Promise<Flashcard[]> {
    try {
      const response = await api.get<Flashcard[]>('/api/flashcards/review/today')
      return response.data || []
    } catch (error) {
      console.error('Failed to fetch today review cards:', error)
      return []
    }
  },

  async submitReview(wordId: string, quality: number): Promise<{ success: boolean; nextReviewDate: string } | null> {
    try {
      if (quality < 0 || quality > 5) {
        throw new Error('Quality must be between 0 and 5')
      }

      const response = await api.post<any>(`/api/flashcards/${wordId}/review`, {
        quality,
      })
      return response.data || null
    } catch (error) {
      console.error('Failed to submit flashcard review:', error)
      return null
    }
  },

  async markAsLearned(wordId: string): Promise<boolean> {
    try {
      const response = await api.post(`/api/flashcards/${wordId}/learn`, {})
      return response.data?.success || false
    } catch (error) {
      console.error('Failed to mark flashcard as learned:', error)
      return false
    }
  },
}
