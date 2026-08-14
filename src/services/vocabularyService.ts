import type { VocabularyWord } from '@/types'

export const vocabularyService = {
  async getAll(): Promise<VocabularyWord[]> {
    return []
  },

  async getById(_id: string): Promise<VocabularyWord | null> {
    return null
  },

  async search(_query: string): Promise<VocabularyWord[]> {
    return []
  },

  async toggleFavorite(_id: string): Promise<boolean> {
    return true
  },

  async markAsLearned(_id: string): Promise<boolean> {
    return true
  },
}
