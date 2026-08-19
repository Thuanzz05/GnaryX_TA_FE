import type { Achievement } from '@/types'
import { localData } from './localData'

export const achievementService = {
  async getAll(): Promise<Achievement[]> { return localData.getAchievements() },
}
