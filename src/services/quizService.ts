import type { Quiz } from '@/types'
import { api } from './api'

export const quizService = {
  async getAll(): Promise<Quiz[]> {
    try {
      const response = await api.get<Quiz[]>('/api/quizzes')
      return response.data || []
    } catch (error) {
      console.error('Failed to fetch quizzes:', error)
      return []
    }
  },

  async getById(id: string): Promise<(Quiz & { questions: any[] }) | null> {
    try {
      const response = await api.get<any>(`/api/quizzes/${id}`)
      return response.data || null
    } catch (error) {
      console.error('Failed to fetch quiz:', error)
      return null
    }
  },

  async submit(
    quizId: string,
    answers: Array<{ questionId: string; selectedAnswer: string }>,
    timeSpent?: number,
  ): Promise<{
    score: number
    correctCount: number
    totalQuestions: number
    xpEarned: number
    results: Array<{
      questionId: string
      selectedAnswer: string
      correctAnswer: string
      isCorrect: boolean
    }>
  }> {
    try {
      const response = await api.post<any>(`/api/quizzes/${quizId}/submit`, {
        answers,
        timeSpent,
      })

      return {
        score: response.data?.score || 0,
        correctCount: response.data?.correctAnswers || 0,
        totalQuestions: answers.length,
        xpEarned: response.data?.xpEarned || 0,
        results: [],
      }
    } catch (error) {
      console.error('Failed to submit quiz:', error)
      return {
        score: 0,
        correctCount: 0,
        totalQuestions: answers.length,
        xpEarned: 0,
        results: [],
      }
    }
  },

  async getAttempts(): Promise<any[]> {
    try {
      const response = await api.get('/api/quizzes/attempts')
      return response.data || []
    } catch (error) {
      console.error('Failed to fetch quiz attempts:', error)
      return []
    }
  },
}
