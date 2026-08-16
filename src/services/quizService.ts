import type { Quiz } from '@/types'
import { apiFetch } from './api'

function getToken(): string | null {
  return localStorage.getItem('gnarylex-auth-token') || null
}

export const quizService = {
  async getAll(): Promise<Quiz[]> {
    try {
      const data = await apiFetch<Quiz[]>('/quizzes')
      return data || []
    } catch {
      return []
    }
  },

  async getById(id: string): Promise<Quiz | null> {
    try {
      const data = await apiFetch<Quiz>(`/quizzes/${id}`)
      return data || null
    } catch {
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
      const token = getToken()
      if (!token) {
        throw new Error('Not authenticated')
      }

      const data = await apiFetch<{
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
      }>(`/quizzes/${quizId}/submit`, {
        method: 'POST',
        body: JSON.stringify({ answers, timeSpent }),
        headers: { Authorization: `Bearer ${token}` },
      })

      return (
        data || {
          score: 0,
          correctCount: 0,
          totalQuestions: answers.length,
          xpEarned: 0,
          results: [],
        }
      )
    } catch {
      return {
        score: 0,
        correctCount: 0,
        totalQuestions: answers.length,
        xpEarned: 0,
        results: [],
      }
    }
  },
}
