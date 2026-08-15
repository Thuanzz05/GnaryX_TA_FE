import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { QuizQuestion } from '@/components/quiz'

const MOCK_QUESTIONS = [
  {
    id: 1,
    question: "Which word means 'to leave someone or something completely'?",
    options: ['Improve', 'Abandon', 'Avoid', 'Reduce'],
    correctAnswer: 'Abandon',
  },
  {
    id: 2,
    question: "Which word means 'to make something more difficult to understand'?",
    options: ['Simplify', 'Complicate', 'Support', 'Collect'],
    correctAnswer: 'Complicate',
  },
  {
    id: 3,
    question: "Which word means 'to keep something from happening'?",
    options: ['Prevent', 'Accept', 'Borrow', 'Arrange'],
    correctAnswer: 'Prevent',
  },
  {
    id: 4,
    question: "Which word means 'to find the answer or reason'?",
    options: ['Ignore', 'Resolve', 'Delay', 'Murmur'],
    correctAnswer: 'Resolve',
  },
]

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const navigate = useNavigate()

  const handleAnswer = (isCorrect: boolean) => {
    const nextScore = isCorrect ? score + 1 : score
    if (isCorrect) setScore(nextScore)

    if (currentIndex < MOCK_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      navigate('/quiz/result', {
        state: { score: nextScore, total: MOCK_QUESTIONS.length },
      })
    }
  }

  const currentQuestion = MOCK_QUESTIONS[currentIndex]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-[80vh] flex-col items-center justify-center p-6"
    >
      <div className="mb-8 flex w-full max-w-2xl items-center justify-between text-sm font-medium text-gray-500 dark:text-gray-400">
        <span>
          Question {currentIndex + 1} of {MOCK_QUESTIONS.length}
        </span>
        <span>Score: {score}</span>
      </div>

      <QuizQuestion
        key={currentQuestion.id}
        question={currentQuestion.question}
        options={currentQuestion.options}
        correctAnswer={currentQuestion.correctAnswer}
        onAnswer={handleAnswer}
      />
    </motion.div>
  )
}
