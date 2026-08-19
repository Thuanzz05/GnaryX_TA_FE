import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Volume2, Eye } from 'lucide-react'
import { Badge, Button, Card, useToast } from '@/components/common'
import { speakWord } from '@/utils/speech'
import { cn } from '@/utils/cn'
import type { VocabularyWord } from '@/types'

interface VocabularyListItemProps {
  word: VocabularyWord
  onFavoriteToggle?: (id: string) => void
}

export function VocabularyListItem({ word, onFavoriteToggle }: VocabularyListItemProps) {
  const { toast } = useToast()
  const [isFavorite, setIsFavorite] = useState(word.isFavorite)

  useEffect(() => {
    setIsFavorite(word.isFavorite)
  }, [word.isFavorite])

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorite((prev) => !prev)
    onFavoriteToggle?.(word.id)
    toast({
      type: 'success',
      title: isFavorite ? 'Removed from favorites' : 'Added to favorites',
    })
  }

  return (
    <Card className="transition-shadow hover:shadow-md" padding="md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-heading-3 capitalize text-text-primary dark:text-slate-100">
                  {word.word}
                </h3>
                {word.isLearned && (
                  <Badge variant="success" size="sm">
                    Learned
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-body-sm text-text-secondary dark:text-slate-400">
                {word.phonetic}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="primary" size="sm">
                {word.level}
              </Badge>
              <Badge variant="outline" size="sm" className="capitalize">
                {word.partOfSpeech}
              </Badge>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-body text-text-primary dark:text-slate-200">
              <span className="font-medium">Meaning:</span> {word.meaning}
            </p>
            <p className="text-body-sm text-text-secondary dark:text-slate-400">
              <span className="font-medium">Vietnamese:</span> {word.meaningVi}
            </p>
          </div>
        </div>

        <div className="flex gap-2 sm:flex-col sm:items-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => speakWord(word.word)}
            aria-label={`Listen to pronunciation of ${word.word}`}
            className="shrink-0"
          >
            <Volume2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="shrink-0"
          >
            <Heart
              className={cn(
                'h-4 w-4',
                isFavorite && 'fill-error-500 text-error-500',
              )}
            />
          </Button>
          <Link to={`/vocabulary/${word.id}`}>
            <Button variant="outline" size="sm" className="shrink-0">
              <Eye className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">View</span>
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
