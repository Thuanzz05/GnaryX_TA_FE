import type { Quiz } from '@/types'
import { BACKEND_MOCK_VOCABULARY } from '@/data/backendVocabulary'
import { localData } from './localData'

function getQuizzes(): Quiz[] {
  return ['Daily Vocabulary', 'Business English', 'Travel & Communication'].map((title, quizIndex) => ({
    id: `local-quiz-${quizIndex + 1}`, title, description: 'Practice with local vocabulary', questionCount: 5, timeLimit: 10,
    questions: BACKEND_MOCK_VOCABULARY.slice(quizIndex * 5, quizIndex * 5 + 5).map((word, index) => ({
      id: `question-${quizIndex}-${index}`, question: `What does "${word.word}" mean?`, options: [word.meaning, ...BACKEND_MOCK_VOCABULARY.slice(quizIndex * 5 + 5, quizIndex * 5 + 8).map((item) => item.meaning)], correctAnswer: word.meaning, explanation: word.meaningVi, wordId: word.id,
    })),
  }))
}

export const quizService = {
  async getAll(): Promise<Quiz[]> { return getQuizzes() },
  async getById(id: string): Promise<(Quiz & { questions: any[] }) | null> { return getQuizzes().find((quiz) => quiz.id === id) ?? null },
  async submit(quizId: string, answers: Array<{ questionId: string; selectedAnswer: string }>, timeSpent = 0) {
    const quiz = getQuizzes().find((item) => item.id === quizId)
    const results = answers.map((answer) => {
      const question = quiz?.questions.find((item) => item.id === answer.questionId)
      return { questionId: answer.questionId, selectedAnswer: answer.selectedAnswer, correctAnswer: question?.correctAnswer || '', isCorrect: answer.selectedAnswer === question?.correctAnswer }
    })
    const correctCount = results.filter((result) => result.isCorrect).length
    const score = answers.length ? Math.round((correctCount / answers.length) * 100) : 0
    const attempt = { id: `attempt-${Date.now()}`, quizId, score, correctCount, timeSpent, submittedAt: new Date().toISOString() }
    localData.setQuizAttempts([attempt, ...localData.getQuizAttempts()])
    return { score, correctCount, totalQuestions: answers.length, xpEarned: correctCount * 10, results }
  },
  async getAttempts(): Promise<any[]> { return localData.getQuizAttempts() },
}
