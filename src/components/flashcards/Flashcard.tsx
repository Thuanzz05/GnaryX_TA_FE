import { motion } from 'framer-motion'
import { Volume2 } from 'lucide-react'
import { Badge } from '@/components/common'
import { speakWord } from '@/utils/speech'
import type { VocabularyWord } from '@/types'

interface FlashcardProps {
  word: VocabularyWord
  isFlipped: boolean
  onFlip: () => void
}

export function Flashcard({ word, isFlipped, onFlip }: FlashcardProps) {
  const handleAudio = (e: React.MouseEvent) => {
    e.stopPropagation()
    speakWord(word.word)
  }

  return (
    <div
      className="relative mx-auto w-full max-w-2xl cursor-pointer"
      style={{ perspective: '1000px', height: 'clamp(260px, 45vw, 384px)' }}
      onClick={onFlip}
      role="button"
      tabIndex={0}
      aria-label={isFlipped ? 'Show front' : 'Flip card to reveal answer'}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onFlip()}
    >
      <motion.div
        className="relative h-full w-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, type: 'spring', stiffness: 260, damping: 22 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ── Front ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-border bg-white p-5 shadow-lg sm:p-8 dark:border-border-dark dark:bg-surface-card-dark"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted dark:text-slate-500">
            Click to flip
          </span>
          <h2 className="mb-5 w-full break-words px-2 text-center text-3xl font-bold capitalize text-text-primary sm:text-5xl dark:text-slate-100">
            {word.word}
          </h2>
          <button
            type="button"
            onClick={handleAudio}
            className="rounded-full bg-primary-50 p-3 text-primary-600 transition-colors hover:bg-primary-100 sm:p-4 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-900/50"
            aria-label={`Listen to ${word.word}`}
          >
            <Volume2 size={24} className="sm:h-7 sm:w-7" />
          </button>
        </div>

        {/* ── Back ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-primary-200 bg-linear-to-br from-primary-50 to-white p-5 shadow-lg sm:p-6 dark:border-primary-800/40 dark:from-primary-950/30 dark:to-surface-card-dark"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex h-full w-full flex-col items-center overflow-y-auto text-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* Word + meta */}
            <h2 className="mb-1 w-full break-words text-2xl font-bold capitalize text-primary-900 sm:text-3xl dark:text-slate-100">
              {word.word}
            </h2>
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <span className="font-mono text-sm text-text-secondary sm:text-base dark:text-slate-400">
                {word.phonetic}
              </span>
              <Badge variant="outline" className="capitalize">{word.partOfSpeech}</Badge>
            </div>

            <div className="my-3 h-px w-full bg-border dark:bg-border-dark" />

            {/* Meaning */}
            <p className="mb-1 text-base font-semibold text-text-primary sm:text-lg dark:text-slate-100">
              {word.meaning}
            </p>
            <p className="mb-4 text-sm text-primary-600 sm:mb-5 sm:text-base dark:text-primary-400">{word.meaningVi}</p>

            {/* Example */}
            <div className="mt-auto w-full rounded-2xl bg-white/70 p-3 sm:p-4 dark:bg-slate-800/40">
              <p className="text-sm italic text-text-primary sm:text-base dark:text-slate-200">&ldquo;{word.example}&rdquo;</p>
              {word.exampleVi && (
                <p className="mt-1 text-xs text-text-secondary sm:text-sm dark:text-slate-400">{word.exampleVi}</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
