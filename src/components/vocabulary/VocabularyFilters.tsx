import { Select } from '@/components/common'
import type { CEFRLevel, PartOfSpeech, Difficulty } from '@/types'

interface VocabularyFiltersProps {
  level: CEFRLevel | 'All'
  topic: string
  partOfSpeech: PartOfSpeech | 'All'
  difficulty: Difficulty | 'All'
  learned: 'All' | 'Learned' | 'Not Learned'
  onFilterChange: (filters: {
    level?: CEFRLevel | 'All'
    topic?: string
    partOfSpeech?: PartOfSpeech | 'All'
    difficulty?: Difficulty | 'All'
    learned?: 'All' | 'Learned' | 'Not Learned'
  }) => void
}

const LEVEL_OPTIONS = (['All', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map((v) => ({
  value: v,
  label: v,
}))

const TOPIC_OPTIONS = [
  'All',
  'Daily Life',
  'Business',
  'Education',
  'Academic',
  'Health',
  'Technology',
].map((v) => ({ value: v, label: v }))

const POS_OPTIONS: { value: string; label: string }[] = [
  { value: 'All', label: 'All' },
  { value: 'noun', label: 'Noun' },
  { value: 'verb', label: 'Verb' },
  { value: 'adjective', label: 'Adjective' },
  { value: 'adverb', label: 'Adverb' },
]

const DIFFICULTY_OPTIONS: { value: string; label: string }[] = [
  { value: 'All', label: 'All' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: 'All', label: 'All' },
  { value: 'Learned', label: 'Learned' },
  { value: 'Not Learned', label: 'Not Learned' },
]

export function VocabularyFilters({
  level,
  topic,
  partOfSpeech,
  difficulty,
  learned,
  onFilterChange,
}: VocabularyFiltersProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <Select
        label="Level"
        value={level}
        options={LEVEL_OPTIONS}
        onChange={(e) => onFilterChange({ level: e.target.value as CEFRLevel | 'All' })}
      />
      <Select
        label="Topic"
        value={topic}
        options={TOPIC_OPTIONS}
        onChange={(e) => onFilterChange({ topic: e.target.value })}
      />
      <Select
        label="Part of Speech"
        value={partOfSpeech}
        options={POS_OPTIONS}
        onChange={(e) => onFilterChange({ partOfSpeech: e.target.value as PartOfSpeech | 'All' })}
      />
      <Select
        label="Difficulty"
        value={difficulty}
        options={DIFFICULTY_OPTIONS}
        onChange={(e) => onFilterChange({ difficulty: e.target.value as Difficulty | 'All' })}
      />
      <Select
        label="Status"
        value={learned}
        options={STATUS_OPTIONS}
        onChange={(e) =>
          onFilterChange({ learned: e.target.value as 'All' | 'Learned' | 'Not Learned' })
        }
      />
    </div>
  )
}
