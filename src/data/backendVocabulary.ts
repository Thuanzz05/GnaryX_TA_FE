import type { VocabularyWord } from '@/types'
import sqlVocabulary from './seed/sql-vocabulary.json'
import extendedVocabulary from './seed/extended-vocabulary.json'
import extendedVocabularyExtra from './seed/extended-vocabulary-extra.json'
import common1000Extra from './seed/common-1000-extra.json'

export const BACKEND_MOCK_VOCABULARY = [
	...(sqlVocabulary as VocabularyWord[]),
	...(extendedVocabulary as VocabularyWord[]),
	...(extendedVocabularyExtra as VocabularyWord[]),
	...(common1000Extra as VocabularyWord[]),
]

export const COMMON_1000_VOCABULARY = [...BACKEND_MOCK_VOCABULARY]
	.sort((left, right) => left.word.localeCompare(right.word))
