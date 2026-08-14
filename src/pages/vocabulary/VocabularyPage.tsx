import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Search, Star } from 'lucide-react'
import { Button, Heading, Input, Text } from '@/components/common'
import { VocabularyFilters, VocabularyListItem } from '@/components/vocabulary'
import { vocabularyService, type VocabularyFilters as Filters } from '@/services/vocabularyService'
import type { CEFRLevel, PartOfSpeech, Difficulty, VocabularyWord } from '@/types'

export default function VocabularyPage() {
  const [words, setWords] = useState<VocabularyWord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    level: 'All',
    topic: 'All',
    partOfSpeech: 'All',
    difficulty: 'All',
    learned: 'All',
  })

  const loadWords = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await vocabularyService.getAll({
        ...filters,
        search: searchQuery,
        favorite: showFavoritesOnly,
      })
      setWords(data)
    } catch {
      setError('Failed to load vocabulary')
    } finally {
      setIsLoading(false)
    }
  }, [filters, searchQuery, showFavoritesOnly])

  useEffect(() => {
    loadWords()
  }, [loadWords])

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const handleFavoriteToggle = async (id: string) => {
    try {
      await vocabularyService.toggleFavorite(id)
      loadWords()
    } catch {
      // Error handled silently
    }
  }

  if (error) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-error-100 text-error-600 dark:bg-error-900/30 dark:text-error-500">
          <AlertCircle className="h-7 w-7" aria-hidden="true" />
        </div>
        <Heading level="h2">Something went wrong</Heading>
        <Text variant="muted">{error}</Text>
        <Button onClick={loadWords}>Try Again</Button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-7xl space-y-6"
    >
      <header className="space-y-2">
        <Heading level="h1">Vocabulary</Heading>
        <Text variant="body-sm">
          Explore and master thousands of English words.
        </Text>
      </header>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          type="search"
          placeholder="Search for a word..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="h-4 w-4" />}
          className="sm:w-96"
        />
        <Button
          variant={showFavoritesOnly ? 'primary' : 'outline'}
          leftIcon={<Star className="h-4 w-4" />}
          onClick={() => setShowFavoritesOnly((prev) => !prev)}
        >
          {showFavoritesOnly ? 'Show All' : 'Favorites'}
        </Button>
      </div>

      <VocabularyFilters
        level={filters.level as CEFRLevel | 'All'}
        topic={filters.topic ?? 'All'}
        partOfSpeech={filters.partOfSpeech as PartOfSpeech | 'All'}
        difficulty={filters.difficulty as Difficulty | 'All'}
        learned={filters.learned ?? 'All'}
        onFilterChange={handleFilterChange}
      />

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700"
            />
          ))}
        </div>
      ) : words.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-body text-text-secondary dark:text-slate-400">
            No words found. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <Text variant="body-sm">
              Showing {words.length} {words.length === 1 ? 'word' : 'words'}
            </Text>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {words.map((word, index) => (
              <motion.div
                key={word.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <VocabularyListItem
                  word={word}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </motion.div>
  )
}
