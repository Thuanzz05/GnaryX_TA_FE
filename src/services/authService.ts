import type { User } from '@/types'

const MOCK_USER: User = {
  id: '1',
  fullName: 'Thuấn',
  email: 'thuan@example.com',
  level: 'B1',
  xp: 2450,
  levelNumber: 8,
  streak: 7,
  dailyGoal: 20,
  preferredTopics: ['Business', 'Technology'],
}

export const authService = {
  async login(_email: string, _password: string): Promise<User> {
    return MOCK_USER
  },

  async register(_data: {
    fullName: string
    email: string
    password: string
  }): Promise<User> {
    return MOCK_USER
  },

  async forgotPassword(_email: string): Promise<void> {
    return
  },

  async getCurrentUser(): Promise<User | null> {
    return MOCK_USER
  },
}
