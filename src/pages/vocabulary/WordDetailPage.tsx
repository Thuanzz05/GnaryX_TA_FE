import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Heart,
  Volume2,
} from 'lucide-react'
import { Badge, Button, Card, Heading, Text, useToast } from '@/components/common'
import { vocabularyService } from '@/services/vocabularyService'
import { speakWord } from '@/utils/speech'
import { cn } from '@/utils/cn'
import type { VocabularyWord } from '@/types'

export default function WordDetailPage() {
  const { wordId } = useParams<{ wordId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [word, setWord] = useState<VocabularyWord | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLearned, setIsLearned] = useState(false)
  const navigationState = location.state as { returnPath?: string } | null
  const returnPath = navigationState?.returnPath ?? (wordId?.startsWith('common-1000-') ? '/vocabulary/common-1000' : '/vocabulary')
  const hasListHistory = Boolean(navigationState?.returnPath)

  const handleBackToList = () => {
    if (hasListHistory || window.history.length > 1) {
      navigate(-1)
      return
    }
    navigate(returnPath, { replace: true })
  }

  const loadWord = useCallback(async () => {
    if (!wordId) return
    setIsLoading(true)
    setError(null)
    try {
      const data = await vocabularyService.getById(wordId)
      if (!data) { setError('Word not found'); return }
      setWord(data)
      setIsFavorite(data.isFavorite)
      setIsLearned(data.isLearned)
    } catch {
      setError('Failed to load word')
    } finally {
      setIsLoading(false)
    }
  }, [wordId])

  useEffect(() => { loadWord() }, [loadWord])

  const handleFavorite = async () => {
    if (!word) return
    try {
      await vocabularyService.toggleFavorite(word.id)
      setIsFavorite((prev) => !prev)
      toast({
        type: 'success',
        title: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      })
    } catch {
      toast({ type: 'error', title: 'Something went wrong' })
    }
  }

  const handleMarkLearned = async () => {
    if (!word || isLearned) return
    try {
      await vocabularyService.markAsLearned(word.id)
      setIsLearned(true)
      toast({ type: 'success', title: 'Marked as learned', description: `"${word.word}" added to your learned words.` })
    } catch {
      toast({ type: 'error', title: 'Something went wrong' })
    }
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="h-6 w-36 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <Card padding="lg">
          <div className="space-y-4">
            <div className="h-12 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-5 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-5 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        </Card>
      </div>
    )
  }

  if (error || !word) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-error-100 text-error-600 dark:bg-error-900/30 dark:text-error-500">
          <AlertCircle className="h-7 w-7" />
        </div>
        <Heading level="h2">Word Not Found</Heading>
        <Text variant="muted">{error ?? 'The word you are looking for does not exist.'}</Text>
        <Button onClick={handleBackToList}>Back to Vocabulary</Button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-3xl space-y-6"
    >
      <button
        type="button"
        onClick={handleBackToList}
        className="inline-flex items-center gap-2 text-body-sm font-medium text-text-secondary transition-colors hover:text-text-primary dark:text-slate-400 dark:hover:text-slate-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Vocabulary
      </button>

      {/* Word header card */}
      <Card padding="lg" className="border-t-4" style={{ borderTopColor: '#6366f1' }}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary">{word.level}</Badge>
              <Badge variant="outline" className="capitalize">{word.partOfSpeech}</Badge>
              {isLearned && <Badge variant="success">Learned</Badge>}
            </div>

            <div>
              <h1 className="text-display capitalize text-text-primary dark:text-slate-100">
                {word.word}
              </h1>
              <p className="mt-1 text-body text-text-secondary dark:text-slate-400">
                {word.phonetic}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Volume2 className="h-4 w-4" />}
                onClick={() => speakWord(word.word)}
                aria-label={`Listen to ${word.word}`}
              >
                Listen
              </Button>
              <Button
                variant={isFavorite ? 'primary' : 'outline'}
                size="sm"
                leftIcon={
                  <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
                }
                onClick={handleFavorite}
              >
                {isFavorite ? 'Favorited' : 'Favorite'}
              </Button>
              <Button
                variant={isLearned ? 'outline' : 'primary'}
                size="sm"
                leftIcon={isLearned ? <CheckCircle2 className="h-4 w-4" /> : undefined}
                onClick={handleMarkLearned}
                disabled={isLearned}
              >
                {isLearned ? 'Learned' : 'Mark as Learned'}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Meaning */}
      <Card padding="lg">
        <Heading level="h3" className="mb-4">Meaning</Heading>
        <div className="space-y-2">
          <p className="text-body text-text-primary dark:text-slate-200">{word.meaning}</p>
          <p className="text-body-sm text-text-secondary dark:text-slate-400">
            <span className="font-medium">Vietnamese:</span> {word.meaningVi}
          </p>
        </div>
      </Card>

      {/* Example sentences */}
      <Card padding="lg">
        <Heading level="h3" className="mb-4">Example Sentences</Heading>
        <div className="space-y-3">
          <blockquote className="border-l-4 border-primary-300 pl-4 dark:border-primary-600">
            <p className="italic text-body text-text-primary dark:text-slate-200">
              &ldquo;{word.example}&rdquo;
            </p>
            {word.exampleVi && (
              <p className="mt-1 text-body-sm text-text-secondary dark:text-slate-400">
                {word.exampleVi}
              </p>
            )}
          </blockquote>
        </div>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Synonyms & Antonyms */}
        <Card padding="lg">
          <Heading level="h3" className="mb-4">Synonyms</Heading>
          <div className="flex flex-wrap gap-2">
            {word.synonyms.length > 0 ? word.synonyms.map((s) => (
              <Badge key={s} variant="secondary">{s}</Badge>
            )) : <Text variant="muted">None available</Text>}
          </div>
        </Card>

        <Card padding="lg">
          <Heading level="h3" className="mb-4">Antonyms</Heading>
          <div className="flex flex-wrap gap-2">
            {word.antonyms.length > 0 ? word.antonyms.map((a) => (
              <Badge key={a} variant="warning">{a}</Badge>
            )) : <Text variant="muted">None available</Text>}
          </div>
        </Card>

        {/* Word Family */}
        <Card padding="lg">
          <Heading level="h3" className="mb-4">Word Family</Heading>
          <div className="flex flex-wrap gap-2">
            {word.wordFamily.length > 0 ? word.wordFamily.map((w) => (
              <Badge key={w} variant="outline">{w}</Badge>
            )) : <Text variant="muted">None available</Text>}
          </div>
        </Card>

        {/* Collocations */}
        <Card padding="lg">
          <Heading level="h3" className="mb-4">Collocations</Heading>
          <ul className="space-y-1.5">
            {word.collocations.length > 0 ? word.collocations.map((c) => (
              <li key={c} className="flex items-center gap-2 text-body-sm text-text-secondary dark:text-slate-400">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" aria-hidden="true" />
                {c}
              </li>
            )) : <Text variant="muted">None available</Text>}
          </ul>
        </Card>
      </div>

      {/* Practice CTA */}
      <Card
        className="bg-linear-to-br from-primary-50 to-white text-center dark:from-primary-950/30 dark:to-surface-card-dark"
        padding="lg"
      >
        <BookOpen className="mx-auto mb-3 h-8 w-8 text-primary-500" aria-hidden="true" />
        <Heading level="h3" className="mb-2">Ready to practice?</Heading>
        <Text variant="muted" className="mb-4">Reinforce your learning with flashcards and quizzes.</Text>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/flashcards"><Button variant="primary">Flashcards</Button></Link>
          <Link to="/practice"><Button variant="outline">Practice</Button></Link>
        </div>
      </Card>
    </motion.div>
  )
}
