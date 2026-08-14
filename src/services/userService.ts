import type { User } from '@/types'

export const userService = {
  async getProfile(): Promise<User | null> {
    return null
  },

  async updateProfile(_data: Partial<User>): Promise<User> {
    throw new Error('Not implemented')
  },

  async updateSettings(_settings: Record<string, unknown>): Promise<void> {
    return
  },
}
