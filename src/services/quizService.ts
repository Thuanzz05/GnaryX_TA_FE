import type { Quiz } from '@/types'

export const quizService = {
  async getAll(): Promise<Quiz[]> {
    return []
  },

  async getById(_id: string): Promise<Quiz | null> {
    return null
  },

  async submit(_quizId: string, _answers: Record<string, string>) {
    return { score: 0, correct: 0, wrong: 0, xp: 0 }
  },
}
