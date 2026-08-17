import type { Achievement } from '@/types'
import { api } from './api'

const mapAchievement = (item: any): Achievement => ({
  id: item.id,
  title: item.title,
  description: item.description,
  icon: item.icon,
  unlocked: Boolean(item.isUnlocked),
  unlockedAt: item.unlockedAt || undefined,
  xpReward: Number(item.xp_reward ?? item.xpReward ?? 0),
})

export const achievementService = {
  async getAll(): Promise<Achievement[]> {
    try {
      const response = await api.get<any[]>('/achievements')
      return (response.data || []).map(mapAchievement)
    } catch (error) {
      console.error('Failed to fetch achievements:', error)
      return []
    }
  },
}
