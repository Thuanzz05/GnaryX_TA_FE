import type { VocabularyWord } from '@/types'
import sqlVocabulary from './seed/sql-vocabulary.json'
import extendedVocabulary from './seed/extended-vocabulary.json'

export const BACKEND_MOCK_VOCABULARY = [
	...(sqlVocabulary as VocabularyWord[]),
	...(extendedVocabulary as VocabularyWord[]),
]
