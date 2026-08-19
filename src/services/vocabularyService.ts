import type { VocabularyWord, CEFRLevel, PartOfSpeech, Difficulty } from '@/types'
import { BACKEND_MOCK_VOCABULARY } from '@/data/backendVocabulary'

const STORAGE_KEY = 'gnarylex-local-vocabulary-backend-seed-v1'

export interface VocabularyFilters {
  search?: string
  level?: CEFRLevel | 'All'
  topic?: string
  partOfSpeech?: PartOfSpeech | 'All'
  difficulty?: Difficulty | 'All'
  learned?: 'All' | 'Learned' | 'Not Learned'
  favorite?: boolean
}

function readWords(): VocabularyWord[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as VocabularyWord[]
  } catch {
    // Fall back to bundled data when local storage is unavailable or corrupted.
  }

  return BACKEND_MOCK_VOCABULARY.map((word) => ({ ...word }))
}

function writeWords(words: VocabularyWord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words))
}

function matchesFilters(word: VocabularyWord, filters: VocabularyFilters = {}) {
  const query = filters.search?.trim().toLowerCase()
  return (
    (!query || [word.word, word.meaning, word.meaningVi].some((value) => value.toLowerCase().includes(query))) &&
    (!filters.level || filters.level === 'All' || word.level === filters.level) &&
    (!filters.topic || filters.topic === 'All' || word.topic === filters.topic) &&
    (!filters.partOfSpeech || filters.partOfSpeech === 'All' || word.partOfSpeech === filters.partOfSpeech) &&
    (!filters.difficulty || filters.difficulty === 'All' || word.difficulty === filters.difficulty) &&
    (!filters.learned || filters.learned === 'All' || (filters.learned === 'Learned' ? word.isLearned : !word.isLearned)) &&
    (!filters.favorite || word.isFavorite)
  )
}

export const vocabularyService = {
  async getAll(filters?: VocabularyFilters): Promise<VocabularyWord[]> {
    return readWords().filter((word) => matchesFilters(word, filters))
  },

  async getById(id: string): Promise<VocabularyWord | null> {
    return readWords().find((word) => word.id === id) ?? null
  },

  async search(query: string): Promise<VocabularyWord[]> {
    return this.getAll({ search: query })
  },

  async toggleFavorite(id: string): Promise<{ isFavorite: boolean }> {
    const words = readWords()
    const word = words.find((item) => item.id === id)
    if (!word) throw new Error('Word not found')
    word.isFavorite = !word.isFavorite
    writeWords(words)
    return { isFavorite: word.isFavorite }
  },

  async markAsLearned(id: string): Promise<VocabularyWord> {
    const words = readWords()
    const word = words.find((item) => item.id === id)
    if (!word) throw new Error('Word not found')
    word.isLearned = true
    writeWords(words)
    return { ...word }
  },
}
