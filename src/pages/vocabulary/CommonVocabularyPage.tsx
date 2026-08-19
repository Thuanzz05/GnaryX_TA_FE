import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Button, Heading, Input, Text } from '@/components/common'
import { VocabularyListItem } from '@/components/vocabulary'
import { vocabularyService } from '@/services/vocabularyService'
import { useScrollRestoration } from '@/hooks/useScrollRestoration'
import type { VocabularyWord } from '@/types'

const PAGE_SIZE = 50
const LETTERS = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')]

export default function CommonVocabularyPage() {
  const [words, setWords] = useState<VocabularyWord[]>([])
  const [query, setQuery] = useState('')
  const [letter, setLetter] = useState('All')
  const [page, setPage] = useState(1)

  useEffect(() => {
    vocabularyService.getCommon1000().then(setWords)
  }, [])

  useScrollRestoration('common-vocabulary-scroll', words.length > 0)

  const filteredWords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return words.filter((word) => {
      const matchesLetter = letter === 'All' || word.word.toUpperCase().startsWith(letter)
      const matchesQuery = !normalizedQuery || [word.word, word.meaning, word.meaningVi].some((value) => value.toLowerCase().includes(normalizedQuery))
      return matchesLetter && matchesQuery
    })
  }, [letter, query, words])

  const pageCount = Math.max(1, Math.ceil(filteredWords.length / PAGE_SIZE))
  const visibleWords = filteredWords.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const updateQuery = (value: string) => { setQuery(value); setPage(1) }
  const updateLetter = (value: string) => { setLetter(value); setPage(1) }
  const toggleFavorite = async (id: string) => {
    const { isFavorite } = await vocabularyService.toggleFavorite(id)
    setWords((currentWords) => currentWords.map((word) => (
      word.id === id ? { ...word, isFavorite } : word
    )))
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="space-y-3">
        <Link to="/vocabulary" className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700">
          <ArrowLeft className="h-4 w-4" /> Back to Vocabulary
        </Link>
        <div>
          <Heading level="h1">1000 Common English Words</Heading>
          <Text variant="body-sm">Everyday vocabulary arranged alphabetically for steady practice.</Text>
        </div>
      </header>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Input type="search" placeholder="Search the 1000 common words..." value={query} onChange={(event) => updateQuery(event.target.value)} leftIcon={<Search className="h-4 w-4" />} className="sm:w-96" />
        <Text variant="body-sm">{filteredWords.length} of {words.length} words</Text>
      </div>

      <div className="flex flex-wrap gap-2" aria-label="Filter by first letter">
        {LETTERS.map((item) => (
          <Button key={item} variant={letter === item ? 'primary' : 'outline'} size="sm" onClick={() => updateLetter(item)}>
            {item}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {visibleWords.map((word) => <VocabularyListItem key={`${word.id}-${word.isFavorite}`} word={word} onFavoriteToggle={toggleFavorite} />)}
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
        <Text variant="body-sm">Page {page} of {pageCount}</Text>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((current) => current - 1)} leftIcon={<ChevronLeft className="h-4 w-4" />}>Previous</Button>
          <Button variant="outline" size="sm" disabled={page === pageCount} onClick={() => setPage((current) => current + 1)} rightIcon={<ChevronRight className="h-4 w-4" />}>Next</Button>
        </div>
      </div>
    </div>
  )
}
