import type { VocabularyWord, CEFRLevel, PartOfSpeech, Difficulty } from '@/types'
import { MOCK_VOCABULARY } from '@/data'

function delay(ms = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

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
    await delay()
    
    let filtered = [...MOCK_VOCABULARY]

    if (filters?.search) {
      const search = filters.search.toLowerCase()
      filtered = filtered.filter(
        (word) =>
          word.word.toLowerCase().includes(search) ||
          word.meaning.toLowerCase().includes(search) ||
          word.meaningVi.toLowerCase().includes(search),
      )
    }

    if (filters?.level && filters.level !== 'All') {
      filtered = filtered.filter((word) => word.level === filters.level)
    }

    if (filters?.topic && filters.topic !== 'All') {
      filtered = filtered.filter((word) => word.topic === filters.topic)
    }

    if (filters?.partOfSpeech && filters.partOfSpeech !== 'All') {
      filtered = filtered.filter((word) => word.partOfSpeech === filters.partOfSpeech)
    }

    if (filters?.difficulty && filters.difficulty !== 'All') {
      filtered = filtered.filter((word) => word.difficulty === filters.difficulty)
    }

    if (filters?.learned === 'Learned') {
      filtered = filtered.filter((word) => word.isLearned)
    } else if (filters?.learned === 'Not Learned') {
      filtered = filtered.filter((word) => !word.isLearned)
    }

    if (filters?.favorite) {
      filtered = filtered.filter((word) => word.isFavorite)
    }

    return filtered
  },

  async getById(id: string): Promise<VocabularyWord | null> {
    await delay()
    const word = MOCK_VOCABULARY.find((w) => w.id === id)
    return word ? { ...word } : null
  },

  async search(query: string): Promise<VocabularyWord[]> {
    await delay()
    const search = query.toLowerCase()
    return MOCK_VOCABULARY.filter(
      (word) =>
        word.word.toLowerCase().includes(search) ||
        word.meaning.toLowerCase().includes(search),
    )
  },

  async toggleFavorite(id: string): Promise<VocabularyWord> {
    await delay(300)
    const word = MOCK_VOCABULARY.find((w) => w.id === id)
    if (!word) throw new Error('Word not found')
    
    word.isFavorite = !word.isFavorite
    return { ...word }
  },

  async markAsLearned(id: string): Promise<VocabularyWord> {
    await delay(300)
    const word = MOCK_VOCABULARY.find((w) => w.id === id)
    if (!word) throw new Error('Word not found')
    
    word.isLearned = true
    return { ...word }
  },
}
