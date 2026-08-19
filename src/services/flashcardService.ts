import { localData } from './localData'

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
  async getAll(): Promise<Flashcard[]> { return localData.getFlashcards() },
  async getTodayReview(): Promise<Flashcard[]> {
    return localData.getFlashcards().filter((card) => !card.nextReviewDate || card.nextReviewDate <= new Date().toISOString())
  },
  async submitReview(wordId: string, quality: number): Promise<{ success: boolean; nextReviewDate: string } | null> {
    if (quality < 0 || quality > 5) throw new Error('Quality must be between 0 and 5')
    const cards = localData.getFlashcards()
    const card = cards.find((item) => item.id === wordId)
    if (!card) return null
    const nextReviewDate = new Date(Date.now() + Math.max(1, quality) * 86400000).toISOString()
    Object.assign(card, { reviewCount: (card.reviewCount || 0) + 1, lastReviewedAt: new Date().toISOString(), nextReviewDate })
    localData.setFlashcards(cards)
    return { success: true, nextReviewDate }
  },
  async markAsLearned(wordId: string): Promise<boolean> {
    const cards = localData.getFlashcards()
    const card = cards.find((item) => item.id === wordId)
    if (!card) return false
    card.isLearned = true
    localData.setFlashcards(cards)
    return true
  },
}
