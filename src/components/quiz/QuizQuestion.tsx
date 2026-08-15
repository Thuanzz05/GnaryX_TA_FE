import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'

interface QuizQuestionProps {
  question: string
  options: string[]
  correctAnswer: string
  onAnswer: (isCorrect: boolean) => void
}

export function QuizQuestion({ question, options, correctAnswer, onAnswer }: QuizQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const handleSelect = (option: string) => {
    if (isAnswered) return

    setSelected(option)
    setIsAnswered(true)

    const isCorrect = option === correctAnswer
    setTimeout(() => {
      onAnswer(isCorrect)
      setSelected(null)
      setIsAnswered(false)
    }, 1500)
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
        {question}
      </h2>

      <div className="space-y-4">
        {options.map((option, index) => {
          const isSelected = selected === option
          const isCorrect = option === correctAnswer

          let stateClass = 'border-gray-200 bg-white hover:border-indigo-500 hover:bg-indigo-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'

          if (isAnswered) {
            if (isCorrect) {
              stateClass = 'border-green-500 bg-green-50 text-green-700 dark:border-green-500 dark:bg-green-900/30 dark:text-green-400'
            } else if (isSelected && !isCorrect) {
              stateClass = 'border-red-500 bg-red-50 text-red-700 dark:border-red-500 dark:bg-red-900/30 dark:text-red-400'
            } else {
              stateClass = 'border-gray-200 bg-white opacity-50 dark:border-gray-700 dark:bg-gray-800'
            }
          }

          return (
            <motion.button
              key={option}
              whileHover={!isAnswered ? { scale: 1.02 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(option)}
              className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left font-medium transition-all ${stateClass}`}
            >
              <div className="flex items-center gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 font-bold text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-lg">{option}</span>
              </div>

              {isAnswered && isCorrect && <CheckCircle2 className="text-green-500" />}
              {isAnswered && isSelected && !isCorrect && <XCircle className="text-red-500" />}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
