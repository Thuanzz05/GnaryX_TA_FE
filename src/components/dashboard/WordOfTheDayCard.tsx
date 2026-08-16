import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Sparkles, Volume2 } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Text,
  useToast,
} from '@/components/common'
import { speakWord } from '@/utils/speech'
import type { VocabularyWord } from '@/types'

interface WordOfTheDayCardProps {
  word: VocabularyWord
}

export function WordOfTheDayCard({ word }: WordOfTheDayCardProps) {
  const { toast } = useToast()
  const [isFavorite, setIsFavorite] = useState(word.isFavorite)

  const handleFavorite = () => {
    setIsFavorite((prev) => !prev)
    toast({
      type: 'success',
      title: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      description: `"${word.word}" ${isFavorite ? 'removed from' : 'added to'} your favorites.`,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <Card
        className="border-accent-purple/20 bg-linear-to-br from-violet-50/80 to-white dark:from-violet-950/20 dark:to-surface-card-dark"
        padding="md"
      >
        <CardHeader className="mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent-purple" aria-hidden="true" />
            <span className="text-caption font-semibold uppercase tracking-wider text-accent-purple">
              Word of the Day
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold capitalize text-text-primary dark:text-slate-100">
              {word.word}
            </h3>
            <p className="mt-1 text-body-sm text-text-secondary dark:text-slate-400">
              {word.phonetic}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="primary">{word.level}</Badge>
              <Badge variant="outline" className="capitalize">
                {word.partOfSpeech}
              </Badge>
            </div>
          </div>

          <div>
            <Text variant="body-sm">
              <span className="font-medium text-text-primary dark:text-slate-200">
                Meaning:{' '}
              </span>
              {word.meaning}
            </Text>
            <Text variant="body-sm" className="mt-1">
              <span className="font-medium text-text-primary dark:text-slate-200">
                Vietnamese:{' '}
              </span>
              {word.meaningVi}
            </Text>
          </div>

          <blockquote className="border-l-4 border-primary-300 pl-4 italic text-body-sm text-text-secondary dark:border-primary-600 dark:text-slate-300">
            &ldquo;{word.example}&rdquo;
          </blockquote>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Volume2 className="h-4 w-4" />}
              onClick={() => speakWord(word.word)}
              aria-label={`Listen to pronunciation of ${word.word}`}
            >
              Listen
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={
                <Heart
                  className={isFavorite ? 'h-4 w-4 fill-error-500 text-error-500' : 'h-4 w-4'}
                />
              }
              onClick={handleFavorite}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              Favorite
            </Button>
            <Link to={`/vocabulary/${word.id}`}>
              <Button variant="primary" size="sm">
                Learn More
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
