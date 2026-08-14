import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Search, Volume2, Eye, BookOpen, Trash2 } from 'lucide-react'
import { Badge, Button, Card, Heading, Input, Select, Text, useToast } from '@/components/common'
import { vocabularyService } from '@/services/vocabularyService'
import { speakWord } from '@/utils/speech'
import type { CEFRLevel, VocabularyWord } from '@/types'

const LEVEL_OPTIONS = [
  { value: 'All', label: 'All Levels' },
  ...(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as CEFRLevel[]).map((l) => ({ value: l, label: l })),
]

export default function FavoritesPage() {
  const { toast } = useToast()
  const [words, setWords] = useState<VocabularyWord[]>([])
  const [filtered, setFiltered] = useState<VocabularyWord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState('All')

  const loadFavorites = useCallback(async () => {
    setIsLoading(true)
    const data = await vocabularyService.getAll({ favorite: true })
    setWords(data)
    setIsLoading(false)
  }, [])

  useEffect(() => { loadFavorites() }, [loadFavorites])

  useEffect(() => {
    let result = words
    if (search.trim()) {
      result = result.filter((w) => w.word.toLowerCase().includes(search.toLowerCase()))
    }
    if (level !== 'All') {
      result = result.filter((w) => w.level === level)
    }
    setFiltered(result)
  }, [words, search, level])

  const handleRemove = async (id: string, wordText: string) => {
    await vocabularyService.toggleFavorite(id)
    setWords((prev) => prev.filter((w) => w.id !== id))
    toast({ type: 'success', title: `"${wordText}" removed from favorites` })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-4xl space-y-6"
    >
      <header className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-error-100 dark:bg-error-900/30">
          <Heart className="h-6 w-6 fill-error-500 text-error-500" />
        </div>
        <div>
          <Heading level="h1">Favorite Words</Heading>
          <Text variant="muted">{words.length} saved words</Text>
        </div>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search favorites..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="h-4 w-4" />}
          className="sm:w-72"
        />
        <Select
          value={level}
          options={LEVEL_OPTIONS}
          onChange={(e) => setLevel(e.target.value)}
          className="sm:w-36"
        />
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 py-20 text-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <Heart className="h-10 w-10 text-slate-300 dark:text-slate-600" />
          </div>
          <Heading level="h3">
            {words.length === 0 ? 'No favorite words yet' : 'No words match your filters'}
          </Heading>
          <Text variant="muted">
            {words.length === 0
              ? 'Save words while learning and they\'ll appear here.'
              : 'Try adjusting your search or level filter.'}
          </Text>
          {words.length === 0 && (
            <Link to="/vocabulary">
              <Button leftIcon={<BookOpen className="h-4 w-4" />}>Explore Vocabulary</Button>
            </Link>
          )}
        </motion.div>
      ) : (
        <div className="space-y-4">
          {filtered.map((word, index) => (
            <motion.div
              key={word.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
            >
              <Card className="group transition-shadow hover:shadow-md" padding="md">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-heading-4 capitalize text-text-primary dark:text-slate-100">
                        {word.word}
                      </h3>
                      <Badge variant="primary" size="sm">{word.level}</Badge>
                      <Badge variant="outline" size="sm" className="capitalize">{word.partOfSpeech}</Badge>
                    </div>
                    <p className="text-body-sm text-text-secondary dark:text-slate-400">{word.phonetic}</p>
                    <p className="text-body text-text-primary dark:text-slate-200">{word.meaning}</p>
                    <p className="text-body-sm text-text-secondary dark:text-slate-400">{word.meaningVi}</p>
                    {word.example && (
                      <p className="text-body-sm italic text-text-muted dark:text-slate-500">
                        &ldquo;{word.example}&rdquo;
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 sm:flex-col sm:items-end">
                    <Button variant="ghost" size="sm" onClick={() => speakWord(word.word)} aria-label="Listen">
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <Link to={`/vocabulary/${word.id}`}>
                      <Button variant="outline" size="sm" aria-label="View details">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(word.id, word.word)}
                      className="text-error-500 hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-900/20"
                      aria-label="Remove from favorites"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
