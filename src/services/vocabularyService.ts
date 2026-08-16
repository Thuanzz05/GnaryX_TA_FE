import type { VocabularyWord, CEFRLevel, PartOfSpeech, Difficulty } from '@/types'
import { apiFetch } from './api'

export interface VocabularyFilters {
  search?: string
  level?: CEFRLevel | 'All'
  topic?: string
  partOfSpeech?: PartOfSpeech | 'All'
  difficulty?: Difficulty | 'All'
  learned?: 'All' | 'Learned' | 'Not Learned'
  favorite?: boolean
}

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
      const data = await apiFetch<any[]>(`/vocabulary${params.toString() ? `?${params.toString()}` : ''}`)
      return data.map((item) => ({
        id: item.id,
        word: item.word,
        phonetic: item.phonetic || '',
        partOfSpeech: item.part_of_speech,
        meaning: item.meaning,
        meaningVi: item.meaning_vi,
        example: item.example_text,
        exampleVi: item.example_vi || '',
        synonyms: Array.isArray(item.synonyms) ? item.synonyms : [],
        antonyms: Array.isArray(item.antonyms) ? item.antonyms : [],
        wordFamily: Array.isArray(item.word_family) ? item.word_family : [],
        collocations: Array.isArray(item.collocations) ? item.collocations : [],
        level: item.level,
        topic: item.topic,
        difficulty: item.difficulty,
        isLearned: item.is_learned ?? false,
        isFavorite: item.is_favorite ?? false,
      }))
    } catch {
      return []
    }
  },

  async getById(id: string): Promise<VocabularyWord | null> {
    try {
      const item = await apiFetch<any>(`/vocabulary/${id}`)
      if (!item) return null

      return {
        id: item.id,
        word: item.word,
        phonetic: item.phonetic || '',
        partOfSpeech: item.part_of_speech,
        meaning: item.meaning,
        meaningVi: item.meaning_vi,
        example: item.example_text,
        exampleVi: item.example_vi || '',
        synonyms: Array.isArray(item.synonyms) ? item.synonyms : [],
        antonyms: Array.isArray(item.antonyms) ? item.antonyms : [],
        wordFamily: Array.isArray(item.word_family) ? item.word_family : [],
        collocations: Array.isArray(item.collocations) ? item.collocations : [],
        level: item.level,
        topic: item.topic,
        difficulty: item.difficulty,
        isLearned: item.is_learned ?? false,
        isFavorite: item.is_favorite ?? false,
      }
    } catch {
      return null
    }
  },

  async search(query: string): Promise<VocabularyWord[]> {
    return this.getAll({ search: query })
  },

  async toggleFavorite(id: string): Promise<VocabularyWord> {
    const word = await this.getById(id)
    if (!word) throw new Error('Word not found')
    return { ...word, isFavorite: !word.isFavorite }
  },

  async markAsLearned(id: string): Promise<VocabularyWord> {
    const word = await this.getById(id)
    if (!word) throw new Error('Word not found')
    return { ...word, isLearned: true }
  },
}
