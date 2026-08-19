import type { VocabularyWord } from '@/types'
import sqlVocabulary from './seed/sql-vocabulary.json'

export const BACKEND_MOCK_VOCABULARY = sqlVocabulary as VocabularyWord[]
