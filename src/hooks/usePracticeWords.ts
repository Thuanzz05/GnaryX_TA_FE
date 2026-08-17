import { useCallback, useEffect, useState } from 'react'
import type { VocabularyWord } from '@/types'
import { vocabularyService } from '@/services/vocabularyService'

interface UsePracticeWordsResult {
  words: VocabularyWord[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

/**
 * Loads the real vocabulary bank from the API for use by practice exercises
 * (multiple choice, fill-in-the-blank, matching, listening, spelling, word
 * meaning). Each exercise is responsible for sampling/shuffling from the
 * returned list itself.
 */
export function usePracticeWords(): UsePracticeWordsResult {
  const [words, setWords] = useState<VocabularyWord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWords = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await vocabularyService.getAll()
      setWords(data)
      if (data.length === 0) {
        setError('No vocabulary words are available yet.')
      }
    } catch {
      setError('Something went wrong while loading vocabulary.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWords()
  }, [fetchWords])

  return { words, isLoading, error, refetch: fetchWords }
}
