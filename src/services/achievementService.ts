import type { Achievement } from '@/types'
import { api } from './api'

const iconMap: Record<string, string> = {
  medal: '🥇',
  book: '📖',
  flame: '🔥',
  trophy: '🏆',
  star: '⭐',
  zap: '⚡',
  target: '🎯',
  heart: '❤️',
  bulb: '💡',
  rocket: '🚀',
  crown: '👑',
  gem: '💎',
}

const mapAchievement = (item: any): Achievement => ({
  id: item.id,
  title: item.title,
  description: item.description,
  icon: iconMap[String(item.icon)] ?? String(item.icon) ?? '🏆',
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
