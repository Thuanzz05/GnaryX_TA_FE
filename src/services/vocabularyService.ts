import type { VocabularyWord, CEFRLevel, PartOfSpeech, Difficulty } from '@/types'
import { api } from './api'

export interface VocabularyFilters {
  search?: string
  level?: CEFRLevel | 'All'
  topic?: string
  partOfSpeech?: PartOfSpeech | 'All'
  difficulty?: Difficulty | 'All'
  learned?: 'All' | 'Learned' | 'Not Learned'
  favorite?: boolean
}

const mapWord = (item: any): VocabularyWord => ({
  id: item.id,
  word: item.word,
  phonetic: item.phonetic || '',
  partOfSpeech: item.part_of_speech || item.partOfSpeech || 'noun',
  meaning: item.meaning,
  meaningVi: item.meaning_vi || item.meaningVi || '',
  example: item.example_text || item.example || '',
  exampleVi: item.example_vi || item.exampleVi || '',
  synonyms: Array.isArray(item.synonyms) ? item.synonyms : [],
  antonyms: Array.isArray(item.antonyms) ? item.antonyms : [],
  wordFamily: Array.isArray(item.word_family) ? item.word_family : [],
  collocations: Array.isArray(item.collocations) ? item.collocations : [],
  level: item.level,
  topic: item.topic,
  difficulty: item.difficulty,
  isLearned: Boolean(item.is_learned ?? item.isLearned ?? false),
  isFavorite: Boolean(item.is_favorite ?? item.isFavorite ?? false),
})

export const vocabularyService = {
  async getAll(filters?: VocabularyFilters): Promise<VocabularyWord[]> {
    const params = new URLSearchParams()

    if (filters?.search) params.set('search', filters.search)
    if (filters?.level && filters.level !== 'All') params.set('level', filters.level)
    if (filters?.topic && filters.topic !== 'All') params.set('topic', filters.topic)
    if (filters?.partOfSpeech && filters.partOfSpeech !== 'All') params.set('partOfSpeech', filters.partOfSpeech)
    if (filters?.difficulty && filters.difficulty !== 'All') params.set('difficulty', filters.difficulty)
    if (filters?.learned && filters.learned !== 'All') params.set('learned', filters.learned)
    if (filters?.favorite) params.set('favorite', 'true')

    try {
      const response = await api.get(`/vocabulary${params.toString() ? `?${params.toString()}` : ''}`)
      return (response.data || []).map(mapWord)
    } catch {
      return []
    }
  },

  async getById(id: string): Promise<VocabularyWord | null> {
    try {
      const response = await api.get(`/vocabulary/${id}`)
      if (!response.data) return null
      return mapWord(response.data)
    } catch {
      return null
    }
  },

  async search(query: string): Promise<VocabularyWord[]> {
    return this.getAll({ search: query })
  },

  async toggleFavorite(id: string): Promise<{ isFavorite: boolean }> {
    const response = await api.post(`/vocabulary/${id}/toggle-favorite`)
    return response.data
  },

  async markAsLearned(id: string): Promise<VocabularyWord> {
    const word = await this.getById(id)
    if (!word) throw new Error('Word not found')
    return { ...word, isLearned: true }
  },
}
