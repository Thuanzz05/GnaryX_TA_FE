import type { User } from '@/types'

export const MOCK_USER: User = {
  id: '1',
  fullName: 'Thuấn',
  email: 'thuan@example.com',
  level: 'B1',
  xp: 4250,
  levelNumber: 12,
  streak: 7,
  dailyGoal: 20,
  preferredTopics: ['Business', 'Technology'],
}

export const userService = {
  async getProfile(): Promise<User | null> {
    return MOCK_USER
  },

  async updateProfile(_data: Partial<User>): Promise<User> {
    throw new Error('Not implemented')
  },

  async updateSettings(_settings: Record<string, unknown>): Promise<void> {
    return
  },
}
