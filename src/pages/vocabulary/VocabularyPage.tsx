import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertCircle, BookOpen, Search, Star } from 'lucide-react'
import { Button, Heading, Input, SkeletonWordItem, Text } from '@/components/common'
import { VocabularyFilters, VocabularyListItem } from '@/components/vocabulary'
import { vocabularyService, type VocabularyFilters as Filters } from '@/services/vocabularyService'
import { useScrollRestoration } from '@/hooks/useScrollRestoration'
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

  useScrollRestoration('vocabulary-list-scroll', !isLoading && words.length > 0)

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const handleFavoriteToggle = async (id: string) => {
    try {
      const { isFavorite } = await vocabularyService.toggleFavorite(id)
      setWords((currentWords) => {
        const updatedWords = currentWords.map((word) => (
          word.id === id ? { ...word, isFavorite } : word
        ))
        return showFavoritesOnly ? updatedWords.filter((word) => word.isFavorite) : updatedWords
      })
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
        <Link to="/vocabulary/common-1000" className="inline-block pt-2">
          <Button variant="outline">Open 1000 Common Words</Button>
        </Link>
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
            <SkeletonWordItem key={i} />
          ))}
        </div>
      ) : words.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 py-20 text-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <BookOpen className="h-10 w-10 text-slate-300 dark:text-slate-600" />
          </div>
          <Heading level="h3">No words found</Heading>
          <Text variant="muted">
            {showFavoritesOnly
              ? 'You have no favorite words yet. Save words while learning!'
              : 'Try adjusting your search or filters.'}
          </Text>
          {showFavoritesOnly ? (
            <Button onClick={() => setShowFavoritesOnly(false)}>Browse All Words</Button>
          ) : (
            <Button variant="outline" onClick={() => { setSearchQuery(''); setFilters({ level: 'All', topic: 'All', partOfSpeech: 'All', difficulty: 'All', learned: 'All' }) }}>
              Clear Filters
            </Button>
          )}
        </motion.div>
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
                key={`${word.id}-${word.isFavorite}`}
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
