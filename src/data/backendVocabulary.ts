import type { CEFRLevel, Difficulty, PartOfSpeech, VocabularyWord } from '@/types'
import batch01 from './seed/batch-01-daily-life-business.json'
import batch02 from './seed/batch-02-education-technology.json'
import batch03 from './seed/batch-03-travel-food.json'
import batch04 from './seed/batch-04-health-environment.json'
import batch05 from './seed/batch-05-science-communication.json'

type SeedWord = {
  word: string
  phonetic?: string
  partOfSpeech: string
  meaning: string
  meaningVi: string
  example: string
  exampleVi?: string
  synonyms?: string[]
  antonyms?: string[]
  wordFamily?: string[]
  collocations?: string[]
  level: string
  topic: string
  difficulty: string
}

function toVocabularyWord(word: SeedWord, batch: string, index: number): VocabularyWord {
  return {
    id: `seed-${batch}-${index}-${word.word.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    word: word.word,
    phonetic: word.phonetic || '',
    partOfSpeech: word.partOfSpeech as PartOfSpeech,
    meaning: word.meaning,
    meaningVi: word.meaningVi,
    example: word.example,
    exampleVi: word.exampleVi || '',
    synonyms: word.synonyms || [],
    antonyms: word.antonyms || [],
    wordFamily: word.wordFamily || [],
    collocations: word.collocations || [],
    level: word.level as CEFRLevel,
    topic: word.topic,
    difficulty: word.difficulty as Difficulty,
    isLearned: false,
    isFavorite: false,
  }
}

const batches: [string, SeedWord[]][] = [
  ['01', batch01 as SeedWord[]],
  ['02', batch02 as SeedWord[]],
  ['03', batch03 as SeedWord[]],
  ['04', batch04 as SeedWord[]],
  ['05', batch05 as SeedWord[]],
]

export const BACKEND_MOCK_VOCABULARY: VocabularyWord[] = batches.flatMap(([batch, words]) =>
  words.map((word, index) => toVocabularyWord(word, batch, index)),
)
